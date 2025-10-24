import { Request, Response } from "express";
// ATENÇÃO: Verifique se 'balcarPool' é o nome correto da sua conexão no arquivo db.ts
import { balcarPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 20;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // Consulta os dados da tabela tbfluxoinpe com paginação
    const result = await balcarPool.query(
      `SELECT * FROM tbfluxoinpe ORDER BY idfluxoinpe DESC LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    // Consulta o número total de registros na tabela
    const countResult = await balcarPool.query("SELECT COUNT(*) FROM tbfluxoinpe");
    const total = Number(countResult.rows[0].count);

    // Envia a resposta formatada
    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbfluxoinpe", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};