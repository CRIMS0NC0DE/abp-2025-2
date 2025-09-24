import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // consulta com paginação
    const result = await furnasPool.query(
      `
      SELECT 
        a.idsitio,
        a.nome AS sitio_nome,
        a.lat AS sitio_lat,
        a.lng AS sitio_lng,
        a.descricao,
        b.idreservatorio,
        b.nome AS reservatorio_nome,
        b.lat AS reservatorio_lat,
        b.lng AS reservatorio_lng
      FROM tbsitio AS a
      LEFT JOIN tbreservatorio AS b 
        ON a.idreservatorio = b.idreservatorio
      ORDER BY a.nome
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // consulta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbsitio");
    const total = Number(countResult.rows[0].count);

    // dados formatados
    const data = result.rows.map((row: any) => ({
      idsitio: row.idsitio,
      reservatorio: row.idreservatorio
        ? {
            idreservatorio: row.idreservatorio,
            nome: row.reservatorio_nome,
            lat: row.reservatorio_lat,
            lng: row.reservatorio_lng,
          }
        : undefined,
      nome: row.sitio_nome,
      lat: row.sitio_lat,
      lng: row.sitio_lng,
      descricao: row.descricao,
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
    res.status(500).json({ success: false, error: "Erro ao realizar a operação." });
  }
};
