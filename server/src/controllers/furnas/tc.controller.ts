import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    const result = await furnasPool.query(
      `
      SELECT 
        a.idtc,
        a.dataMedida,
        a.profundidade,
        a.tc,
        b.idCampanha,
        b.nroCampanha,
        c.idSitio,
        c.nome AS sitio_nome,
        c.lat AS sitio_lat,
        c.lng AS sitio_lng
      FROM tbtc AS a
      LEFT JOIN tbcampanha AS b ON a.idCampanha = b.idCampanha
      LEFT JOIN tbsitio AS c ON a.idSitio = c.idSitio
      ORDER BY a.dataMedida
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbtc");
    const total = Number(countResult.rows[0].count);

    const data = result.rows.map((row: any) => ({
      idtc: row.idtc,
      campanha: row.idCampanha
        ? { idCampanha: row.idCampanha, nroCampanha: row.nroCampanha }
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
      profundidade: row.profundidade,
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
    logger.error("Erro ao consultar tbtc", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await furnasPool.query(
      `
      SELECT 
        a.idtc,
        a.dataMedida,
        a.profundidade,
        a.tc,
        b.idCampanha,
        b.nroCampanha,
        c.idSitio,
        c.nome AS sitio_nome,
        c.lat AS sitio_lat,
        c.lng AS sitio_lng
      FROM tbtc AS a
      LEFT JOIN tbcampanha AS b ON a.idCampanha = b.idCampanha
      LEFT JOIN tbsitio AS c ON a.idSitio = c.idSitio
      WHERE a.idtc = $1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: `O ID ${id} não foi encontrado.`,
      });
      return;
    }

    const data = result.rows.map((row: any) => ({
      idtc: row.idtc,
      campanha: row.idCampanha
        ? { idCampanha: row.idCampanha, nroCampanha: row.nroCampanha }
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
      profundidade: row.profundidade,
      tc: row.tc,
    }));

    res.status(200).json({
      success: true,
      data: data[0],
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbtc por ID", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
