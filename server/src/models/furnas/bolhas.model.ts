import { furnasPool } from "../../configs/db";
import { FilterService } from "../../services/filterService";

// Mapeia as chaves do frontend (vistas pelo formatListRow)
// para as colunas reais do banco de dados (com seus aliases).
const bolhasColumnMap = {
  // Chaves de Range (type: 'number' ou 'date' no frontend)
  idBolhas: "a.idBolhas",
  dataMedida: "a.dataMedida",
  profundidade: "a.profundidade",
  nroDeFunis: "a.nroDeFunis",
  volumeColetado: "a.volumeColetado",
  co2: "a.co2",
  o2: "a.o2",
  n2: "a.n2",
  ch4: "a.ch4",
  n2o: "a.n2o",

  // Chaves de Igualdade/ILIKE (type: 'string' no frontend)
  sitio: "c.nome", // Traduz 'sitio'
  campanha: "b.nrocampanha", // Traduz 'campanha'
  horaMedida: "a.horaMedida",
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 */
const buildQuery = (filters: any) => {
  // Query base para selecionar os dados (para a listagem)
  const baseQuery = `
	SELECT 
	  a.idBolhas,
	  a.idCampanha,
	  a.idSitio,
	  a.dataMedida,
	  a.horaMedida,
	  a.profundidade,
	  a.nroDeFunis,
	  a.volumeColetado,
	  a.co2,
	  a.o2,
	  a.n2,
	  a.ch4,
	  a.n2o,
	  b.nrocampanha,
	  c.nome AS sitio_nome,
	  c.lat AS sitio_lat,
	  c.lng AS sitio_lng
	FROM tbbolhas AS a
	LEFT JOIN tbcampanha AS b
	  ON a.idCampanha = b.idcampanha
	  LEFT JOIN tbsitio AS c
	    ON a.idSitio = c.idsitio
`;

  // Query base para contagem
  const countQuery = `
	SELECT COUNT(a.idBolhas)
	FROM tbbolhas AS a
	LEFT JOIN tbcampanha AS b
	  ON a.idCampanha = b.idcampanha
	LEFT JOIN tbsitio AS c
	  ON a.idSitio = c.idsitio
`;

  // Usa o FilterService para construir a cláusula WHERE
  const { whereClause, params, nextIndex } = FilterService.buildFilter(filters, bolhasColumnMap, 1);

  const whereString = whereClause;
  const values = params;
  const paramIndex = nextIndex;

  // Ordenação (vinda do controller original)
  const orderBy = "ORDER BY a.dataMedida DESC, a.horaMedida DESC";

  const mainQuery = `${baseQuery} ${whereString} ${orderBy}`;
  const countText = `${countQuery} ${whereString}`;

  return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbbolhas.
 */
export class BolhasModel {
  /**
   * Busca uma lista paginada de registros, aplicando filtros.
   */
  public static async findPaginated(options: { filters: any; page: number; limit: number }) {
    const { filters, page, limit } = options;
    const offset = (page - 1) * limit;

    const { mainQuery, countText, values, paramIndex } = buildQuery(filters);

    const paginatedQuery = `${mainQuery} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    const paginatedValues = [...values, limit, offset];

    const [result, countResult] = await Promise.all([
      furnasPool.query(paginatedQuery, paginatedValues),
      furnasPool.query(countText, values), // Contagem com filtros
    ]);

    const total = Number(countResult.rows[0].count);

    return { data: result.rows, total };
  }

  /**
   * Busca TODOS os registros que correspondem aos filtros.
   */
  public static async findAll(options: { filters: any }): Promise<any[]> {
    const { filters } = options;
    const { mainQuery, values } = buildQuery(filters);
    const result = await furnasPool.query(mainQuery, values);
    return result.rows;
  }

  /**
   * Busca um único registro pelo ID, com todos os joins necessários.
   */
  public static async findById(id: number): Promise<any | null> {
    // Esta query é mais completa que a do controller original,
    // pois busca também o reservatório (seguindo o padrão)
    const result = await furnasPool.query(
      `
	      SELECT 
	        a.*,
	        b.idcampanha,
	        b.nrocampanha,
	        b.datainicio AS campanha_datainicio,
	        b.datafim AS campanha_datafim,
	        b.idreservatorio,
	        c.idsitio,
	        c.nome AS sitio_nome,
	        c.descricao AS sitio_descricao,
	        c.lat AS sitio_lat,
	        c.lng AS sitio_lng,
	        d.nome AS reservatorio_nome
	      FROM tbbolhas AS a
	      LEFT JOIN tbcampanha AS b
	        ON a.idCampanha = b.idcampanha
	      LEFT JOIN tbsitio AS c
	        ON a.idSitio = c.idsitio
	      LEFT JOIN tbreservatorio AS d
	        ON b.idreservatorio = d.idreservatorio
	      WHERE a.idBolhas = $1
	    `,
      [id],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  }
}
