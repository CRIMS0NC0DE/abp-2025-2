import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = Number(page - 1) * limit;

    const result = await furnasPool.query(
      `
            SELECT
            a.idPFQ,
            a.dataMedida,
            a.horaMedida,
            a.profundidade,
            a.batimetria,
            a.tempar,
            a.tempagua,
            a._do,
            a.ph,
            a.redox,
            a.vento,
            b.idCampanha,
            b.nroCampanha,
            c.idSitio
            FROM tbpfq AS a
            LEFT JOIN tbcampanha AS b
            ON a.idCampanha = b.idCampanha
            LEFT JOIN tbsitio AS c
            ON a.idSitio = c.idSitio
            ORDER BY a.dataMedida DESC, a.horaMedida DESC
            LIMIT $1 OFFSET $2
            `,
      [limit, offset],
    );

    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbpfq");
    const total = Number(countResult.rows[0].count);

    const data = result.rows.map((row: any) => ({
      idPFQ: row.idPFQ,
      campanha: row.idCampanha
        ? {
            idCampanha: row.idCampanha,
            nroCampanha: row.nroCampanha,
          }
        : undefined,
      sitio: row.idSitio
        ? {
            idSitio: row.idSitio,
            nome: row.sitio_nome,
            lat: row.sitio_lat,
            lng: row.sitio_lng,
          }
        : undefined,
      dataMedida: row.dataMedida,
      horaMedida: row.horaMedida,
      profundidade: row.profundidade,
      batimetria: row.batimetria,
      tempar: row.tempar,
      tempagua: row.tempagua,
      do: row.do,
      ph: row.ph,
      redox: row.redox,
      vento: row.vento,
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
    logger.error("Erro ao consultar tbpfq", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação",
    });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await furnasPool.query(
      `
            SELECT
            a.idPFQ,
            a.dataMedida,
            a.horaMedida,
            a.profundidade,
            a.batimetria,
            a.tempar,
            a.tempagua,
            a._do,
            a.ph,
            a.redox,
            a.vento,
            b.idCampanha,
            b.nroCampanha,
            c.idSitio
            FROM tbpfq AS a
            LEFT JOIN tbcampanha AS b
            ON a.idCampanha = b.idCampanha
            LEFT JOIN tbsitio AS c
            ON a.idSitio = c.idSitio
            WHERE a.idPFQ = $1
            `,
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: `O ID ${id} não encontrado.`,
      });
      return;
    }

    const data = result.rows.map((row: any) => ({
      idPFQ: row.idPFQ,
      idCampanha: row.idCampanha
        ? {
            idCampanha: row.idCampanha,
            nroCampanha: row.nroCampanha,
          }
        : undefined,
      sitio: row.idSitio
        ? {
            idSitio: row.idSitio,
            nome: row.sitio_nome,
            lat: row.sitio_lat,
            lng: row.sitio_lng,
          }
        : undefined,
      dataMedida: row.dataMedida,
      horaMedida: row.horaMedida,
      profundidade: row.profundidade,
      batimetria: row.batimetria,
      tempar: row.tempar,
      tempagua: row.tempagua,
      do: row.do,
      ph: row.ph,
      redox: row.redox,
      vento: row.vento,
    }));

    res.status(200).json({
      success: true,
      data: data[0],
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbpfq por ID.", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};

// feito
