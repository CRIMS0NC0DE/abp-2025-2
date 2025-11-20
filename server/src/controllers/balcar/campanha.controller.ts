import { Request, Response } from "express";
import { balcarPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // consulta natabela tb campanha
    const result = await balcarPool.query(
      `
      SELECT 
        idcampanha,
        idreservatorio,
        idinstituicao,
        nrocampanha,
        datainicio,
        datafim
      FROM tbcampanha
      ORDER BY idcampanha ASC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // total de registros
    const countResult = await balcarPool.query("SELECT COUNT(*) FROM tbcampanha");
    const total = Number(countResult.rows[0].count);

    // resposta formatada
    const data = result.rows.map((row: any) => ({
      idcampanha: row.idcampanha,
      idreservatorio: row.idreservatorio,
      idinstituicao: row.idinstituicao,
      nrocampanha: row.nrocampanha,
      datainicio: row.datainicio,
      datafim: row.datafim,
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
    logger.error("Erro ao consultar tbcampanha", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
