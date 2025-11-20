import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getCampoporTabela = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // consulta na tabela tbcampoportabela com paginação
    const result = await furnasPool.query(
      `
      SELECT
        idcampoportabela,
        idtabela,
        nome,
        rotulo,
        unidade,
        descricao,
        principal,
        ordem,
        tipo
      FROM tbcampoportabela
      ORDER BY ordem NULLS LAST, idcampoportabela
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // consulta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbcampoportabela");
    const total = Number(countResult.rows[0].count);

    // dados formatados
    const data = result.rows.map((row: any) => ({
      idCampoPorTabela: row.idcampoportabela,
      idTabela: row.idtabela,
      nome: row.nome,
      rotulo: row.rotulo,
      unidade: row.unidade,
      descricao: row.descricao,
      principal: row.principal,
      ordem: row.ordem,
      tipo: row.tipo,
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
    logger.error("Erro ao consultar tbcampoportabela", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
