import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getCarbono = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // Consulta na tabela tbcarbono com paginação
    const result = await furnasPool.query(
      `
      SELECT
        idcarbono,
        idcampanha,
        idsitio,
        datamedida,
        horamedida,
        dc,
        doc,
        poc,
        toc,
        dic,
        tc
      FROM tbcarbono
      ORDER BY idcarbono
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // Consulta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbcarbono");
    const total = Number(countResult.rows[0].count);

    // Dados formatados
    const data = result.rows.map((row: any) => ({
      idCarbono: row.idcarbono,
      idCampanha: row.idcampanha,
      idSitio: row.idsitio,
      dataMedida: row.datamedida,
      horaMedida: row.horamedida,
      dc: row.dc,
      doc: row.doc,
      poc: row.poc,
      toc: row.toc,
      dic: row.dic,
      tc: row.tc,
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
    logger.error("Erro ao consultar tbcarbono", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
