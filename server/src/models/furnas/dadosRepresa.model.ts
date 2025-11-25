import { furnasPool } from '../../configs/db';
import { FilterService } from '../../services/filterService';

/**
 * Mapeia as chaves do frontend (filtros em req.query)
 * para as colunas reais do banco de dados (com seus aliases).
 */
const dadosRepresaColumnMap = {
  // Chaves de Range (type: 'number' ou 'date' no frontend)
  idDadosRepresa: 'a.iddadosrepresa',
  dataMedida: 'a.datamedida',
  nivelReservatorio: 'a.nivelreservatorio',
  volUtilReservatorio: 'a.volutilreservatorio',
  porVolUtilReservatorio: 'a.porvolutilreservatorio',
  geracao: 'a.geracao',
  vazaoAfluente: 'a.vazaoafluente',
  vazaoDefluente: 'a.vazaodefluente',
  produtividade: 'a.produtividade',
  vazaoTurbinada: 'a.vazaoturbinada',
  vazaoVertida: 'a.vazaovertida',
  vazaoTurbinadaVazio: 'a.vazaoturbinadavazio',

  // Chaves de Igualdade (type: 'string' no frontend)
  reservatorio: 'b.nome', // Traduz 'reservatorio' (do filtro) para 'b.nome' (na query)
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 * Esta função é privada e serve de base para os métodos públicos.
 * @param filters Um objeto (ex: req.query) com os filtros.
 */
const buildDadosRepresaQuery = (filters: any) => {
  // Query base para selecionar os dados (para listagem)
  // Baseada na query 'getAll' do controller antigo
  const baseQuery = `
    SELECT
        a.idDadosRepresa,
        a.dataMedida,
        a.nivelReservatorio,
        a.volUtilReservatorio,
        a.geracao,
        a.vazaoAfluente,
        a.vazaoDefluente,
        b.idreservatorio,
        b.nome AS reservatorio_nome
    FROM tbdadosrepresa a
    LEFT JOIN tbreservatorio b ON a.idReservatorio = b.idReservatorio
  `;

  // Query base para contagem (para paginação)
  // Deve ter os mesmos JOINs da baseQuery para filtros funcionarem
  const countQuery = `
    SELECT COUNT(a.iddadosrepresa)
    FROM tbdadosrepresa a
    LEFT JOIN tbreservatorio b ON a.idReservatorio = b.idReservatorio
  `;

  // Usa o FilterService para construir a cláusula WHERE
  const { whereClause, params, nextIndex } = FilterService.buildFilter(
    filters,
    dadosRepresaColumnMap,
    1, // Começa a contagem de parâmetros em $1
  );

  const whereString = whereClause;
  const values = params;
  const paramIndex = nextIndex;

  // Query principal com ordenação (do controller antigo)
  const mainQuery = `${baseQuery} ${whereString} ORDER BY a.dataMedida DESC, a.idDadosRepresa DESC`;
  // Query de contagem (sem ordenação)
  const countText = `${countQuery} ${whereString}`;

  return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbdadosrepresa.
 */
export class DadosRepresaModel {
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
      buildDadosRepresaQuery(filters);

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
    const { mainQuery, values } = buildDadosRepresaQuery(filters);
    
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
          b.idreservatorio,
          b.nome AS reservatorio_nome,
          b.lat AS latReservatorio,
          b.lng As lngReservatorio
      FROM tbdadosrepresa a
      LEFT JOIN tbreservatorio b ON a.idReservatorio = b.idReservatorio
      WHERE a.idDadosRepresa = $1;
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