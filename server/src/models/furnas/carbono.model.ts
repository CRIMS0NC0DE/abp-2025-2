//src/models/furnas/carbono.model.ts
import { furnasPool } from '../../configs/db';
import { FilterService } from '../../services/filterService';

/**
 * Mapeia as chaves do frontend (filtros em req.query)
 * para as colunas reais do banco de dados (com seus aliases).
 */
const carbonoColumnMap = {
  // Chaves de Range (type: 'number' ou 'date' no frontend)
  idCarbono: 'a.idcarbono',
  dataMedida: 'a.datamedida',
  dc: 'a.dc',
  doc: 'a.doc',
  poc: 'a.poc',
  toc: 'a.toc',
  dic: 'a.dic',
  tc: 'a.tc',

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
const buildCarbonoQuery = (filters: any) => {
  // Query base para selecionar os dados (para listagem)
  const baseQuery = `
    SELECT 
        a.idCarbono, a.dataMedida, a.horaMedida,
        a.dc, a.doc, a.poc, a.toc, a.dic, a.tc,
        b.idsitio, b.nome AS sitio_nome,
        c.idcampanha, c.nrocampanha
    FROM tbcarbono AS a
    LEFT JOIN tbsitio AS b ON a.idSitio = b.idSitio
    LEFT JOIN tbcampanha AS c ON a.idCampanha = c.idCampanha
  `;

  // Query base para contagem (para paginação)
  const countQuery = `
    SELECT COUNT(a.idcarbono)
    FROM tbcarbono AS a
    LEFT JOIN tbsitio AS b ON a.idSitio = b.idSitio
    LEFT JOIN tbcampanha AS c ON a.idCampanha = c.idCampanha
  `;

  // Usa o FilterService para construir a cláusula WHERE
  const { whereClause, params, nextIndex } = FilterService.buildFilter(
    filters,
    carbonoColumnMap,
    1, // Começa a contagem de parâmetros em $1
  );

  const whereString = whereClause;
  const values = params;
  const paramIndex = nextIndex;

  // Query principal com ordenação
  const mainQuery = `${baseQuery} ${whereString} ORDER BY a.dataMedida DESC, a.horaMedida DESC`;
  // Query de contagem (sem ordenação)
  const countText = `${countQuery} ${whereString}`;

  return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbcarbono.
 */
export class CarbonoModel {
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
      buildCarbonoQuery(filters);

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
    const { mainQuery, values } = buildCarbonoQuery(filters);
    
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
    // Esta query não usa filtros e busca todos os detalhes (como no controller antigo)
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
          c.dataFim AS campanha_datafim,
          d.idreservatorio,
          d.nome AS reservatorio_nome
      FROM tbcarbono a
      LEFT JOIN tbsitio b ON a.idSitio = b.idSitio
      LEFT JOIN tbcampanha c ON a.idCampanha = c.idCampanha
      LEFT JOIN tbreservatorio d ON c.idReservatorio = d.idReservatorio
      WHERE a.idCarbono = $1;
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