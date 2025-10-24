import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 20;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  // O nome da tabela agora é definido dinamicamente e corretamente
  const tableName = "tbcampanha";

  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    const result = await furnasPool.query(
      `SELECT * FROM ${tableName} ORDER BY 1 DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    const countResult = await furnasPool.query(`SELECT COUNT(*) FROM ${tableName}`);
    const total = Number(countResult.rows[0].count);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: result.rows,
    });
  } catch (error: any) {
    logger.error(`Erro ao consultar a tabela ${tableName}`, {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
