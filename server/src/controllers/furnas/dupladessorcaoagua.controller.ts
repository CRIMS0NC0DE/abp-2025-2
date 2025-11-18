import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // Consulta com JOINs em tbsitio e tbcampanha
    const result = await furnasPool.query(
      `
      SELECT 
        a.iddupladessorcaoagua,
        a.datamedida,
        a.horamedida,
        a.profundidade,
        a.co2,
        a.o2,
        a.n2,
        a.ch4,
        a.n2o,
        b.idsitio,
        b.nome AS sitio_nome,
        c.idcampanha,
        c.nome AS campanha_nome
      FROM tbdupladessorcaoagua AS a
      LEFT JOIN tbsitio AS b ON a.idsitio = b.idsitio
      LEFT JOIN tbcampanha AS c ON a.idcampanha = c.idcampanha
      ORDER BY a.datamedida DESC, a.horamedida DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // Consulta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbdupladessorcaoagua");
    const total = Number(countResult.rows[0].count);

    // Mapeamento dos dados
    const data = result.rows.map((row: any) => ({
      idDuplaDessorcaoAgua: row.iddupladessorcaoagua,
      dataMedida: row.datamedida,
      horaMedida: row.horamedida,
      profundidade: row.profundidade,
      co2: row.co2,
      o2: row.o2,
      n2: row.n2,
      ch4: row.ch4,
      n2o: row.n2o,
      sitio: row.idsitio
        ? {
            idSitio: row.idsitio,
            nome: row.sitio_nome,
          }
        : undefined,
      campanha: row.idcampanha
        ? {
            idCampanha: row.idcampanha,
            nome: row.campanha_nome,
          }
        : undefined,
    }));

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbdupladessorcaoagua", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
