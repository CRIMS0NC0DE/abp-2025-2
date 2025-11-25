// src/models/aguaMateriaOrganicaSedimento.model.ts
import { furnasPool } from "../../configs/db";
import { FilterService } from "../../services/filterService";

// Mapeia as chaves do frontend (vistas pelo useMemo/formatListRow)
// para as colunas reais do banco de dados (com seus aliases).
const aguaMateriaOrganicaSedimentoColumnMap = {
  // Chaves de Range (type: 'number' ou 'date' no frontend)
  idaguamateriaorganicasedimento: "a.idaguamateriaorganicasedimento",
  datamedida: "a.datamedida",
  profundidade: "a.profundidade",
  batimetria: "a.batimetria",
  agua: "a.agua",
  materiaOrganica: "a.materiaOrganica", // O frontend envia 'materiaOrganica'

  // Chaves de Igualdade/ILIKE (type: 'string' no frontend)
  sitio: "c.nome", // Traduz 'sitio' (visto no frontend) para 'c.nome'
  campanha: "b.nrocampanha", // Traduz 'campanha' para 'b.nrocampanha'
  horamedida: "a.horamedida",
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 */
const buildQuery = (filters: any) => {
  // Query base para selecionar os dados (para a listagem)
  // Traz todos os campos que o formatListRow genérico precisa
  const baseQuery = `
SELECT 
a.idaguamateriaorganicasedimento,
a.idcampanha,
a.idsitio,
a.datamedida,
a.horamedida,
a.profundidade,
a.batimetria,
a.agua,
a.materiaOrganica,
b.nrocampanha,
c.nome AS sitio_nome
FROM tbaguamateriaorganicasedimento AS a
LEFT JOIN tbcampanha AS b ON a.idcampanha = b.idcampanha
LEFT JOIN tbsitio AS c ON a.idsitio = c.idsitio
`;

  // Query base para contagem (deve ter os mesmos JOINS e FILTROS)
  const countQuery = `
SELECT COUNT(a.idaguamateriaorganicasedimento)
FROM tbaguamateriaorganicasedimento AS a
LEFT JOIN tbcampanha AS b ON a.idcampanha = b.idcampanha
	LEFT JOIN tbsitio AS c ON a.idsitio = c.idsitio
`;

  // Usa o FilterService para construir a cláusula WHERE
  const { whereClause, params, nextIndex } = FilterService.buildFilter(
    filters,
    aguaMateriaOrganicaSedimentoColumnMap,
    1, // Começa a contagem de parâmetros em $1
  );

  const whereString = whereClause;
  const values = params;
  const paramIndex = nextIndex;

  // Ordenação (vinda do controller original)
  const orderBy = "ORDER BY c.nome, b.nrocampanha";

  // Query principal com filtros e ordenação
  const mainQuery = `${baseQuery} ${whereString} ${orderBy}`;
  // Query de contagem com filtros (sem ordenação)
  const countText = `${countQuery} ${whereString}`;

  return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbaguamateriaorganicasedimento.
 */
export class AguaMateriaOrganicaSedimentoModel {
  /**
   * Busca uma lista paginada de registros, aplicando filtros.
   */
  public static async findPaginated(options: { filters: any; page: number; limit: number }) {
    const { filters, page, limit } = options;
    const offset = (page - 1) * limit;

    // 1. Constrói a query base com filtros
    const { mainQuery, countText, values, paramIndex } = buildQuery(filters);

    // 2. Adiciona paginação à query
    const paginatedQuery = `${mainQuery} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    const paginatedValues = [...values, limit, offset];

    // 3. Executa a query de dados e a de contagem em paralelo
    //    (Corrigido: a contagem agora usa os 'values' dos filtros)
    const [result, countResult] = await Promise.all([
      furnasPool.query(paginatedQuery, paginatedValues),
      furnasPool.query(countText, values), // Contagem total com filtros
    ]);

    const total = Number(countResult.rows[0].count);

    return { data: result.rows, total };
  }

  /**
   * Busca TODOS os registros que correspondem aos filtros, sem paginação.
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
    // Query de detalhe completa (padrão abioticoColuna)
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
	    FROM tbaguamateriaorganicasedimento AS a
	    LEFT JOIN tbcampanha AS b
	      ON a.idcampanha = b.idcampanha
	    LEFT JOIN tbsitio AS c
	      ON a.idsitio = c.idsitio
	        LEFT JOIN tbreservatorio AS d
	      ON b.idreservatorio = d.idreservatorio
	    WHERE a.idaguamateriaorganicasedimento = $1
	  `,
      [id],
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  }
}
