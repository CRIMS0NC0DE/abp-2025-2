import { Request, Response } from "express";
import { balcarPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<Response> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    const result = await balcarPool.query(
      `
      SELECT 
        idsitio,
        idreservatorio,
        nome,
        lat,
        lng,
        descricao
      FROM tbsitio
      ORDER BY nome ASC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    );

    const countResult = await balcarPool.query("SELECT COUNT(*) FROM tbsitio");
    const total = Number(countResult.rows[0].count);

    return res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao buscar sítios", {
      message: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      success: false,
      error: "Erro ao buscar sítios.",
    });
  }
};
export const getById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { idsitio } = req.params;

    const result = await balcarPool.query(
      `
      SELECT 
        idsitio,
        idreservatorio,
        nome,
        lat,
        lng,
        descricao
      FROM tbsitio
      WHERE idsitio = $1
      `,
      [idsitio]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Sítio não encontrado.",
      });
    }

    return res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error: any) {
    logger.error("Erro ao buscar sítio por ID", {
      message: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      success: false,
      error: "Erro ao buscar sítio.",
    });
  }
};
