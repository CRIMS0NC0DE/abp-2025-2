import { furnasPool } from '../../configs/db';
import { FilterService } from '../../services/filterService';

/**
 * Mapeia as chaves do frontend (filtros em req.query)
 * para as colunas reais do banco de dados (com seus aliases).
 */
const ionsColumnMap = {
  // Chaves de Range (type: 'number' ou 'date' no frontend)
  idIonsNaAguaIntersticialDoSedimento: 'a.idionsnaaguaintersticialdosedimento',
  dataMedida: 'a.datamedida',
  profundidade: 'a.profundidade',
  batimetria: 'a.batimetria',
  f: 'a.f',
  cl: 'a.cl',
  no2: 'a.no2',
  br: 'a.br',
  no3: 'a.no3',
  po4: 'a.po4',
  so4: 'a.so4',
  na: 'a.na',
  nh4: 'a.nh4',
  k: 'a.k',
  mg: 'a.mg',
  ca: 'a.ca',
  acetato: 'a.acetato',

  // Chaves de Igualdade (type: 'string' no frontend)
  sitio: 'c.nome', // Traduz 'sitio' (do filtro) para 'c.nome'
  campanha: 'b.nrocampanha', // Traduz 'campanha' (do filtro) para 'b.nrocampanha'
  horaMedida: 'a.horamedida', // Tratada como string
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 * Esta função é privada e serve de base para os métodos públicos.
 * @param filters Um objeto (ex: req.query) com os filtros.
 */
const buildIonsQuery = (filters: any) => {
  // Query base para selecionar os dados (para listagem)
  // Baseada na query 'getAll' do controller antigo
  const baseQuery = `
    SELECT
        a.idIonsNaAguaIntersticialDoSedimento,
        a.dataMedida, a.horaMedida, a.profundidade, a.batimetria,
        a.f, a.cl, a.no2, a.br, a.no3, a.po4, a.so4,
        a.na, a.nh4, a.k, a.mg, a.ca, a.acetato,
        b.idCampanha, b.nroCampanha,
        c.idSitio, c.nome AS sitio_nome,
        c.lat AS sitio_lat, c.lng AS sitio_lng
    FROM tbionsnaaguaintersticialdosedimento AS a
    LEFT JOIN tbcampanha AS b ON a.idCampanha = b.idCampanha
    LEFT JOIN tbsitio AS c ON a.idSitio = c.idSitio
  `;

  // Query base para contagem (para paginação)
  // Deve ter os mesmos JOINs da baseQuery para filtros funcionarem
  const countQuery = `
    SELECT COUNT(a.idionsnaaguaintersticialdosedimento)
    FROM tbionsnaaguaintersticialdosedimento AS a
    LEFT JOIN tbcampanha AS b ON a.idCampanha = b.idCampanha
    LEFT JOIN tbsitio AS c ON a.idSitio = c.idSitio
  `;

  // Usa o FilterService para construir a cláusula WHERE
  const { whereClause, params, nextIndex } = FilterService.buildFilter(
    filters,
    ionsColumnMap,
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
 * Classe Model para encapsular o acesso a dados da tbionsnaaguaintersticialdosedimento.
 */
export class IonsNaAguaIntersticialDoSedimentoModel {
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
      buildIonsQuery(filters);

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
    const { mainQuery, values } = buildIonsQuery(filters);
    
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
        a.idIonsNaAguaIntersticialDoSedimento,
        a.dataMedida, a.horaMedida, a.profundidade, a.batimetria,
        a.f, a.cl, a.no2, a.br, a.no3, a.po4, a.so4,
        a.na, a.nh4, a.k, a.mg, a.ca, a.acetato,
        b.idCampanha, b.nroCampanha,
        c.idSitio, c.nome AS sitio_nome,
        c.lat AS sitio_lat, c.lng AS sitio_lng
      FROM tbionsnaaguaintersticialdosedimento AS a
      LEFT JOIN tbcampanha AS b
        ON a.idCampanha = b.idCampanha
      LEFT JOIN tbsitio AS c
        ON a.idSitio = c.idSitio
      WHERE a.idIonsNaAguaIntersticialDoSedimento = $1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return null;
    }
    
    // Retorna o primeiro registro "cru"
    // O controller antigo mapeava aqui, mas o padrão é retornar cru
    return result.rows[0];
  }
}