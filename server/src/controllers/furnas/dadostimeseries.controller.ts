import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

/**
 * Controller para listar dados de precipitação com paginação e join em tbreservatorio
 */
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // Consulta principal com JOIN em tbreservatorio
    const result = await furnasPool.query(
      `
      SELECT 
        p.iddadosprecipitacao,
        p.datamedida,
        p.precipitacao,
        r.idreservatorio,
        r.nome AS reservatorio_nome,
        r.capacidade AS reservatorio_capacidade,
        r.localizacao AS reservatorio_localizacao
      FROM tbdadosprecipitacao AS p
      LEFT JOIN tbreservatorio AS r
        ON p.idreservatorio = r.idreservatorio
      ORDER BY p.datamedida DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // Conta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbdadosprecipitacao");
    const total = Number(countResult.rows[0].count);

    // Formatação dos dados
    const data = result.rows.map((row: any) => ({
      idDadosPrecipitacao: row.iddadosprecipitacao,
      dataMedida: row.datamedida,
      precipitacao: row.precipitacao,
      reservatorio: row.idreservatorio
        ? {
            idReservatorio: row.idreservatorio,
            nome: row.reservatorio_nome,
            capacidade: row.reservatorio_capacidade,
            localizacao: row.reservatorio_localizacao,
          }
        : undefined,
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
    logger.error("Erro ao consultar tbdadosprecipitacao", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
