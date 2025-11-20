import { Request, Response } from "express";
import { balcarPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getTabelaCampo = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // consulta na tabela tbtabelacampo
    const result = await balcarPool.query(
      `
      SELECT 
        idtabelacampo,
        nome,
        rotulo,
        unidade,
        descricao,
        ordem
      FROM tbtabelacampo
      ORDER BY idtabelacampo ASC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // total de registros
    const countResult = await balcarPool.query("SELECT COUNT(*) FROM tbtabelacampo");
    const total = Number(countResult.rows[0].count);

    // resposta formatada
    const data = result.rows.map((row: any) => ({
      idtabelacampo: row.idtabelacampo,
      nome: row.nome,
      rotulo: row.rotulo,
      unidade: row.unidade,
      descricao: row.descricao,
      ordem: row.ordem,
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
    logger.error("Erro ao consultar tbtabelacampo", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
