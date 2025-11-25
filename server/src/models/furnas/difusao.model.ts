import { furnasPool } from '../../configs/db';
import { FilterService } from '../../services/filterService';

/**
 * Mapeia as chaves do frontend (filtros em req.query)
 * para as colunas reais do banco de dados (com seus aliases).
 */
const difusaoColumnMap = {
  // Chaves de Range (type: 'number' ou 'date' no frontend)
  idDifusao: 'a.iddifusao',
  dataMedida: 'a.datamedida',
  ch4: 'a.ch4',
  co2: 'a.co2',
  n2o: 'a.n2o',
  ph: 'a.ph',
  tempagua: 'a.tempagua',
  tempar: 'a.tempar',
  profundidade: 'a.profundidade',
  altitude: 'a.altitude',
  vento: 'a.vento',

  // Chaves de Igualdade (type: 'string' no frontend)
  sitio: 'b.nome', // Traduz 'sitio' (do filtro) para 'b.nome' (na query)
  campanha: 'c.nrocampanha', // Traduz 'campanha' (do filtro) para 'c.nrocampanha'
  horaMedida: 'a.horamedida', // Tratado como string
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 * Esta função é privada e serve de base para os métodos públicos.
 * @param filters Um objeto (ex: req.query) com os filtros.
 */
const buildDifusaoQuery = (filters: any) => {
  // Query base para selecionar os dados (para listagem)
  // Baseada na query 'getAll' do controller antigo
  const baseQuery = `
    SELECT
        a.idDifusao, a.dataMedida, a.horaMedida,
        a.ch4, a.co2, a.n2o, a.ph, a.tempagua,
        b.idsitio, b.nome AS sitio_nome,
        c.idcampanha, c.nroCampanha
    FROM tbdifusao a
    LEFT JOIN tbsitio b ON a.idSitio = b.idSitio
    LEFT JOIN tbcampanha c ON a.idCampanha = c.idCampanha
  `;

  // Query base para contagem (para paginação)
  // Deve ter os mesmos JOINs da baseQuery para filtros funcionarem
  const countQuery = `
    SELECT COUNT(a.iddifusao)
    FROM tbdifusao a
    LEFT JOIN tbsitio b ON a.idSitio = b.idSitio
    LEFT JOIN tbcampanha c ON a.idCampanha = c.idCampanha
  `;

  // Usa o FilterService para construir a cláusula WHERE
  const { whereClause, params, nextIndex } = FilterService.buildFilter(
    filters,
    difusaoColumnMap,
    1, // Começa a contagem de parâmetros em $1
  );

  const whereString = whereClause;
  const values = params;
  const paramIndex = nextIndex;

  // Query principal com ordenação (do controller antigo)
  const mainQuery = `${baseQuery} ${whereString} ORDER BY a.dataMedida DESC, a.horaMedida DESC`;
  // Query de contagem (sem ordenação)
  const countText = `${countQuery} ${whereString}`;

  return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbdifusao.
 */
export class DifusaoModel {
  /**
   * Busca uma lista paginada de registros, aplicando filtros.
   * Retorna tanto os dados da página quanto a contagem total de registros.
   */
  public static async findPaginated(options: {
    filters: any;
    page: number;
    limit: number;
  }) {
    const { filters, page, limit } = options;
    const offset = (page - 1) * limit;

    // 1. Constrói a query base com filtros
    const { mainQuery, countText, values, paramIndex } =
      buildDifusaoQuery(filters);

    // 2. Adiciona paginação à query
    const paginatedQuery = `${mainQuery} LIMIT $${paramIndex} OFFSET $${
      paramIndex + 1
    }`;
    const paginatedValues = [...values, limit, offset];

    // 3. Executa a query de dados e a de contagem em paralelo
    const [result, countResult] = await Promise.all([
      furnasPool.query(paginatedQuery, paginatedValues),
      furnasPool.query(countText, values), // Contagem total com filtros
    ]);

    const total = Number(countResult.rows[0].count);
    
    // Retorna os dados "crus" e a contagem
    return { data: result.rows, total };
  }

  /**
   * Busca TODOS os registros que correspondem aos filtros, sem paginação.
   * Ideal para exportações (range = 'all').
   */
  public static async findAll(options: { filters: any }): Promise<any[]> {
    const { filters } = options;
    
    // 1. Constrói a query base (ignora contagem e paginação)
    const { mainQuery, values } = buildDifusaoQuery(filters);
    
    // 2. Executa a query
    const result = await furnasPool.query(mainQuery, values);
    
    // Retorna os dados "crus"
    return result.rows;
  }

  /**
   * Busca um único registro pelo ID, com todos os joins necessários
   * para a visualização de detalhe.
   */
  public static async findById(id: number): Promise<any | null> {
    // Esta query é a mesma do 'getById' do controller antigo
    const result = await furnasPool.query(
      `
      SELECT 
          a.*,
          b.idsitio,
          b.nome AS sitio_nome,
          b.descricao AS sitio_descricao,
          b.lat AS sitio_lat,
          b.lng AS sitio_lng,
          c.idcampanha,
          c.nroCampanha,
          c.dataInicio AS campanha_datainicio,
          c.dataFim As campanha_datafim,
          d.idreservatorio,
          d.nome AS reservatorio_nome
      FROM tbdifusao a
      LEFT JOIN tbsitio b ON a.idSitio = b.idSitio
      LEFT JOIN tbcampanha c ON a.idCampanha = c.idCampanha
      LEFT JOIN tbreservatorio d ON c.idReservatorio = d.idReservatorio
      WHERE a.idDifusao = $1;
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return null;
    }
    
    // Retorna o primeiro registro "cru"
    return result.rows[0];
  }

  /**
   * --- NOVO MÉTODO PARA ANALYTICS (GRÁFICOS) ---
   * Calcula estatísticas (Média, Min, Max, Desvio Padrão) agrupadas por Reservatório ou Sítio.
   */
  public static async getAnalyticsData(options: {
    metric: string;
    groupBy: 'reservatorio' | 'sitio';
    filterReservatorioId?: number;
  }) {
    const { metric, groupBy, filterReservatorioId } = options;

    // 1. Whitelist de métricas permitidas (Segurança contra SQL Injection)
    const allowedMetrics = [
        'ch4', 'co2', 'n2o', 
        'ph', 'tempagua', 'tempar', 
        'profundidade', 'vento', 'altitude'
    ];
    
    if (!allowedMetrics.includes(metric)) {
        throw new Error(`Métrica inválida ou não permitida para análise: ${metric}`);
    }

    // 2. Construção da Query Dinâmica
    let selectLabel = '';
    let groupByClause = '';
    let whereClauses: string[] = [];
    let params: any[] = [];
    let paramCounter = 1;

    // Joins necessários para conectar Difusão -> Sítio, Campanha -> Reservatório
    // a: tbdifusao
    // b: tbsitio
    // c: tbcampanha
    // d: tbreservatorio
    const joinClause = `
        LEFT JOIN tbsitio b ON a.idSitio = b.idSitio
        LEFT JOIN tbcampanha c ON a.idCampanha = c.idCampanha
        LEFT JOIN tbreservatorio d ON c.idReservatorio = d.idReservatorio
    `;

    if (groupBy === 'reservatorio') {
        // Agrupar por Reservatório (Visão Macro)
        selectLabel = 'd.nome AS label, d.idreservatorio AS id';
        groupByClause = 'GROUP BY d.idreservatorio, d.nome';
    } else {
        // Agrupar por Sítio (Visão Micro/Drill-down)
        selectLabel = 'b.nome AS label, b.idsitio AS id';
        groupByClause = 'GROUP BY b.idsitio, b.nome';
    }

    // 3. Filtros
    
    // Filtro de Drill-down (Ex: ver apenas sítios de um reservatório específico)
    if (filterReservatorioId) {
        whereClauses.push(`d.idreservatorio = $${paramCounter++}`);
        params.push(filterReservatorioId);
    }

    // Filtro essencial: Ignorar nulos na métrica escolhida para não distorcer a média
    whereClauses.push(`a.${metric} IS NOT NULL`);

    const whereString = whereClauses.length > 0 
        ? 'WHERE ' + whereClauses.join(' AND ') 
        : '';

    // 4. Montagem Final da Query
    const query = `
        SELECT 
            ${selectLabel},
            ROUND(AVG(a.${metric})::numeric, 2) as media,
            ROUND(STDDEV(a.${metric})::numeric, 2) as desvio_padrao,
            MIN(a.${metric}) as minimo,
            MAX(a.${metric}) as maximo,
            COUNT(a.${metric}) as contagem
        FROM tbdifusao a
        ${joinClause}
        ${whereString}
        ${groupByClause}
        ORDER BY label ASC
    `;

    const result = await furnasPool.query(query, params);
    return result.rows;
  }
}