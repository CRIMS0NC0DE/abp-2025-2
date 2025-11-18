import { Request, Response } from "express";
import { balcarPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // Consulta na tabela tbsitio
    const result = await balcarPool.query(
      `
      SELECT 
        s.idsitio,
        s.idreservatorio,
        s.nome,
        s.lat,
        s.lng,
        s.descricao,
        r.nome AS nome_reservatorio
      FROM tbsitio s
      LEFT JOIN tbreservatorio r ON s.idreservatorio = r.idreservatorio
      ORDER BY s.idsitio ASC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // Total de registros
    const countResult = await balcarPool.query("SELECT COUNT(*) FROM tbsitio");
    const total = Number(countResult.rows[0].count);

    // Formata a resposta
    const data = result.rows.map((row: any) => ({
      idsitio: row.idsitio,
      idreservatorio: row.idreservatorio,
      nome: row.nome,
      lat: row.lat,
      lng: row.lng,
      descricao: row.descricao,
      nome_reservatorio: row.nome_reservatorio,
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
    logger.error("Erro ao consultar tbsitio", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
