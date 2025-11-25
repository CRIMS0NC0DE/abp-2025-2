import { furnasPool } from '../../configs/db';
import { FilterService } from '../../services/filterService';

/**
 * Mapeia as chaves do frontend (filtros em req.query)
 * para as colunas reais do banco de dados (com seus aliases).
 */
const parametrosColumnMap = {
  // Chaves de Range (type: 'number' ou 'date' no frontend)
  idParametrosBiologicosFisicosAgua: 'a.idparametrosbiologicosfisicosagua',
  dataMedida: 'a.datamedida',
  profundidade: 'a.profundidade',
  secchi: 'a.secchi',
  tempagua: 'a.tempagua',
  condutividade: 'a.condutividade',
  _do: 'a._do',
  ph: 'a.ph',
  turbidez: 'a.turbidez',
  materialemsuspensao: 'a.materialemsuspensao',
  doc: 'a.doc',
  toc: 'a.toc',
  poc: 'a.poc',
  dic: 'a.dic',
  nt: 'a.nt',
  pt: 'a.pt',
  densidadebacteria: 'a.densidadebacteria',
  biomassabacteria: 'a.biomassabacteria',
  clorofilaa: 'a.clorofilaa',
  biomassacarbonototalfito: 'a.biomassacarbonototalfito',
  densidadetotalfito: 'a.densidadetotalfito',
  biomassazoo: 'a.biomassazoo',
  densidadetotalzoo: 'a.densidadetotalzoo',
  producaofitoplanctonica: 'a.producaofitoplanctonica',
  carbonoorganicoexcretado: 'a.carbonoorganicoexcretado',
  respiracaofito: 'a.respiracaofito',
  producaobacteriana: 'a.producaobacteriana',
  respiracaobacteriana: 'a.respiracaobacteriana',
  taxasedimentacao: 'a.taxasedimentacao',
  delta13c: 'a.delta13c',
  delta15n: 'a.delta15n',
  intensidadeluminosa: 'a.intensidadeluminosa',

  // Chaves de Igualdade (type: 'string' no frontend)
  horaMedida: 'a.horamedida', // Tratada como string
  sitio: 'c.nome', // Traduz 'sitio' (do filtro) para 'c.nome'
  campanha: 'b.nrocampanha', // Traduz 'campanha' (do filtro) para 'b.nrocampanha'
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 * Esta função é privada e serve de base para os métodos públicos.
 * @param filters Um objeto (ex: req.query) com os filtros.
 */
const buildParametrosQuery = (filters: any) => {
  // Query base para selecionar os dados (para listagem)
  // Baseada na query 'getAll' do controller antigo
  const baseQuery = `
    SELECT
        a.idParametrosBiologicosFisicosAgua,
        a.dataMedida,
        a.horaMedida,
        a.profundidade,
        a.secchi,
        a.tempagua,
        a.condutividade,
        a._do,
        a.ph,
        a.turbidez,
        a.materialemsuspensao,
        a.doc,
        a.toc,
        a.poc,
        a.dic,
        a.nt,
        a.pt,
        a.densidadebacteria,
        a.biomassabacteria,
        a.clorofilaa,
        a.biomassacarbonototalfito,
        a.densidadetotalfito,
        a.biomassazoo,
        a.densidadetotalzoo,
        a.producaofitoplanctonica,
        a.carbonoorganicoexcretado,
        a.respiracaofito,
        a.producaobacteriana,
        a.respiracaobacteriana,
        a.taxasedimentacao,
        a.delta13c,
        a.delta15n,
        a.intensidadeluminosa,
        b.idCampanha,
        b.nroCampanha,
        c.idSitio,
        c.nome AS sitio_nome,
        c.lat AS sitio_lat,
        c.lng AS sitio_lng
    FROM tbparametrosbiologicosfisicosagua AS a
    LEFT JOIN tbcampanha AS b
        ON a.idCampanha = b.idCampanha
    LEFT JOIN tbsitio AS c
        ON a.idSitio = c.idSitio
  `;

  // Query base para contagem (para paginação)
  // Deve ter os mesmos JOINs da baseQuery para filtros funcionarem
  const countQuery = `
    SELECT COUNT(a.idparametrosbiologicosfisicosagua)
    FROM tbparametrosbiologicosfisicosagua AS a
    LEFT JOIN tbcampanha AS b ON a.idCampanha = b.idCampanha
    LEFT JOIN tbsitio AS c ON a.idSitio = c.idSitio
  `;

  // Usa o FilterService para construir a cláusula WHERE
  const { whereClause, params, nextIndex } = FilterService.buildFilter(
    filters,
    parametrosColumnMap,
    1, // Começa a contagem de parâmetros em $1
  );

  const whereString = whereClause;
  const values = params;
  const paramIndex = nextIndex;

  // Query principal com ordenação (do controller antigo)
  const mainQuery = `${baseQuery} ${whereString} ORDER BY a.dataMedida DESC`;
  // Query de contagem (sem ordenação)
  const countText = `${countQuery} ${whereString}`;

  return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbparametrosbiologicosfisicosagua.
 */
export class ParametrosBiologicosFisicosAguaModel {
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
      buildParametrosQuery(filters);

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
    const { mainQuery, values } = buildParametrosQuery(filters);
    
    // 2. Executa a query
    const result = await furnasPool.query(mainQuery, values);
    
    // Retorna os dados "crus"
    return result.rows;
  }

  /**
   * Busca um único registro pelo ID, com todos os joins necessários
   * para a visualização de detalhe (seguindo o padrão do exemplo).
   */
  public static async findById(id: number): Promise<any | null> {
    // Esta query segue o padrão do EXEMPO, buscando mais detalhes
    // (incluindo tbreservatorio, que não estava no controller antigo)
    const result = await furnasPool.query(
      `
      SELECT 
          a.*, -- Todos os campos da tabela principal
          b.idcampanha, b.nrocampanha,
          b.datainicio AS campanha_datainicio,
          b.datafim AS campanha_datafim,
          b.idreservatorio,
          c.idsitio, c.nome AS sitio_nome,
          c.descricao AS sitio_descricao,
          c.lat AS sitio_lat, c.lng AS sitio_lng,
          d.nome AS reservatorio_nome
      FROM tbparametrosbiologicosfisicosagua AS a
      LEFT JOIN tbcampanha AS b ON a.idcampanha = b.idcampanha
      LEFT JOIN tbsitio AS c ON a.idsitio = c.idsitio
      LEFT JOIN tbreservatorio AS d ON b.idreservatorio = d.idreservatorio
      WHERE a.idparametrosbiologicosfisicosagua = $1
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