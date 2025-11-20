import { Request, Response } from "express";
import { balcarPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getReservatorioBalcar = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // consulta simples na tabela tbreservatorio
    const result = await balcarPool.query(
      `
      SELECT 
        idreservatorio,
        nome,
        lat,
        lng
      FROM tbreservatorio
      ORDER BY idreservatorio ASC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // total de registros
    const countResult = await balcarPool.query("SELECT COUNT(*) FROM tbreservatorio");
    const total = Number(countResult.rows[0].count);

    // resposta formatada
    const data = result.rows.map((row: any) => ({
      idreservatorio: row.idreservatorio,
      nome: row.nome,
      lat: row.lat,
      lng: row.lng,
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
    logger.error("Erro ao consultar tbreservatorio", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
