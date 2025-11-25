// src/models/bioticoSuperficie.model.ts
import { furnasPool } from "../../configs/db";
import { FilterService } from "../../services/filterService";

// Mapeia as chaves do frontend (vistas pelo formatListRow)
// para as colunas reais do banco de dados (com seus aliases).
const bioticoSuperficieColumnMap = {
  // Chaves de Range (type: 'number' ou 'date' no frontend)
  idBioticoSuperficie: "a.idBioticoSuperficie",
  dataMedida: "a.dataMedida",
  doc: "a.doc",
  toc: "a.toc",
  poc: "a.poc",
  densidadeBacteria: "a.densidadeBacteria",
  biomassaBacteria: "a.biomassaBacteria",
  clorofilaA: "a.clorofilaA",
  biomassaCarbonoTotalFito: "a.biomassaCarbonoTotalFito",
  densidadeTotalFito: "a.densidadeTotalFito",
  biomassaZoo: "a.biomassaZoo",
  densidadeTotalZoo: "a.densidadeTotalZoo",

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
	  a.idBioticoSuperficie,
	  a.idCampanha,
	  a.idSitio,
	  a.dataMedida,
	  a.horaMedida,
	  a.doc,
	  a.toc,
	  a.poc,
	  a.densidadeBacteria,
	  a.biomassaBacteria,
	  a.clorofilaA,
	  a.biomassaCarbonoTotalFito,
	  a.densidadeTotalFito,
	  a.biomassaZoo,
	  a.densidadeTotalZoo,
	  b.nrocampanha,
	  c.nome AS sitio_nome
	FROM tbbioticosuperficie AS a
	LEFT JOIN tbcampanha AS b
	  ON a.idCampanha = b.idcampanha
	LEFT JOIN tbsitio AS c
	  ON a.idSitio = c.idsitio
`;

  // Query base para contagem
  const countQuery = `
	SELECT COUNT(a.idBioticoSuperficie)
	FROM tbbioticosuperficie AS a
	LEFT JOIN tbcampanha AS b
	  ON a.idCampanha = b.idcampanha
	LEFT JOIN tbsitio AS c
	  ON a.idSitio = c.idsitio
`;

  // Usa o FilterService para construir a cláusula WHERE
  const { whereClause, params, nextIndex } = FilterService.buildFilter(
    filters,
    bioticoSuperficieColumnMap,
    1,
  );

  const whereString = whereClause;
  const values = params;
  const paramIndex = nextIndex;

  const orderBy = "ORDER BY c.nome, b.nrocampanha";

  const mainQuery = `${baseQuery} ${whereString} ${orderBy}`;
  const countText = `${countQuery} ${whereString}`;

  return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbbioticosuperficie.
 */
export class BioticoSuperficieModel {
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
	      FROM tbbioticosuperficie AS a
	      LEFT JOIN tbcampanha AS b
	        ON a.idCampanha = b.idcampanha
	      LEFT JOIN tbsitio AS c
	        ON a.idSitio = c.idsitio
	      LEFT JOIN tbreservatorio AS d
	        ON b.idreservatorio = d.idreservatorio
	      WHERE a.idBioticoSuperficie = $1
	    `,
      [id],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  }
}
