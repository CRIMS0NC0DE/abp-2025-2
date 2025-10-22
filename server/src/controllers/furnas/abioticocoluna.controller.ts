import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 20;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // Apenas mude a consulta SQL aqui
    const result = await furnasPool.query(
      `SELECT * FROM tbabioticocoluna LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    // E a consulta de contagem
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbabioticocoluna");
    const total = Number(countResult.rows[0].count);

    // A resposta é a mesma
    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: result.rows, // Retornamos os dados brutos, sem formatação complexa por enquanto
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbabioticocoluna", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};