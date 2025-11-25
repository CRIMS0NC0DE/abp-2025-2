import { furnasPool } from '../../configs/db';
import { FilterService } from '../../services/filterService';

/**
 * Mapeia as chaves do frontend (filtros em req.query)
 * para as colunas reais do banco de dados (com seus aliases).
 */
const gasesEmBolhasColumnMap = {
  // Chaves de Range (type: 'number' ou 'date' no frontend)
  idGasesEmBolhas: 'a.idgasesembolhas',
  dataMedida: 'a.datamedida',
  profundidade: 'a.profundidade',
  co2: 'a.co2',
  o2: 'a.o2',
  n2: 'a.n2',
  ch4: 'a.ch4',
  n2o: 'a.n2o',

  // Chaves de Igualdade (type: 'string' no frontend)
  sitio: 'b.nome', // Traduz 'sitio' (do filtro) para 'b.nome' (na query)
  campanha: 'c.nrocampanha', // Traduz 'campanha' (do filtro) para 'c.nrocampanha'
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 * Esta função é privada e serve de base para os métodos públicos.
 * @param filters Um objeto (ex: req.query) com os filtros.
 */
const buildGasesEmBolhasQuery = (filters: any) => {
  // Query base para selecionar os dados (para listagem)
  // Baseada na query 'getAll' do controller antigo
  const baseQuery = `
    SELECT
        a.idGasesEmBolhas, a.dataMedida, a.profundidade,
        a.co2, a.o2, a.n2, a.ch4, a.n2o,
        b.idsitio, b.nome AS sitio_nome,
        c.idcampanha, c.nroCampanha
    FROM tbgasesembolhas a
    LEFT JOIN tbsitio b ON a.idSitio = b.idSitio
    LEFT JOIN tbcampanha c ON a.idCampanha = c.idCampanha
  `;

  // Query base para contagem (para paginação)
  // Deve ter os mesmos JOINs da baseQuery para filtros funcionarem
  const countQuery = `
    SELECT COUNT(a.idgasesembolhas)
    FROM tbgasesembolhas a
    LEFT JOIN tbsitio b ON a.idSitio = b.idSitio
    LEFT JOIN tbcampanha c ON a.idCampanha = c.idCampanha
  `;

  // Usa o FilterService para construir a cláusula WHERE
  const { whereClause, params, nextIndex } = FilterService.buildFilter(
    filters,
    gasesEmBolhasColumnMap,
    1, // Começa a contagem de parâmetros em $1
  );

  const whereString = whereClause;
  const values = params;
  const paramIndex = nextIndex;

  // Query principal com ordenação (do controller antigo)
  const mainQuery = `${baseQuery} ${whereString} ORDER BY a.dataMedida DESC, a.profundidade ASC`;
  // Query de contagem (sem ordenação)
  const countText = `${countQuery} ${whereString}`;

  return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbgasesembolhas.
 */
export class GasesEmBolhasModel {
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
      buildGasesEmBolhasQuery(filters);

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
    const { mainQuery, values } = buildGasesEmBolhasQuery(filters);
    
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
          b.lat AS sitio_lat,
          b.lng AS sitio_lng,
          b.descricao AS sitio_descricao,
          c.idcampanha,
          c.nroCampanha,
          c.dataInicio AS campanha_datainicio,
          c.dataFim AS campanha_datafim,
          d.idreservatorio,
          d.nome AS reservatorio_nome
      FROM tbgasesembolhas a
      LEFT JOIN tbsitio b ON a.idSitio = b.idSitio
      LEFT JOIN tbcampanha c ON a.idCampanha = c.idCampanha
      LEFT JOIN tbreservatorio d ON c.idReservatorio = d.idreservatorio
      WHERE a.idGasesEmBolhas = $1;
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return null;
    }
    
    // Retorna o primeiro registro "cru"
    return result.rows[0];
  }
}