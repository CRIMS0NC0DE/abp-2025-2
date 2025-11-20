import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getDadosRepresa = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // Consulta com JOIN
    const result = await furnasPool.query(
      `
      SELECT 
        a.iddadosrepresa,
        a.datamedida,
        a.nivelreservatorio,
        a.volutilreservatorio,
        a.porvolutilreservatorio,
        a.geracao,
        a.vazaoafluente,
        a.vazaodefluente,
        a.produtividade,
        a.vazaoturbinada,
        a.vazaovertida,
        a.vazaoturbinadavazio,
        b.idreservatorio,
        b.nome AS reservatorio_nome
      FROM tbdadosrepresa AS a
      LEFT JOIN tbreservatorio AS b
        ON a.idreservatorio = b.idreservatorio
      ORDER BY a.datamedida DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // Consulta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbdadosrepresa");
    const total = Number(countResult.rows[0].count);

    // Dados formatados
    const data = result.rows.map((row: any) => ({
      iddadosrepresa: row.iddadosrepresa,
      reservatorio: row.idreservatorio
        ? {
            idreservatorio: row.idreservatorio,
            nome: row.reservatorio_nome,
          }
        : undefined,
      datamedida: row.datamedida,
      nivelReservatorio: row.nivelreservatorio,
      volUtilReservatorio: row.volutilreservatorio,
      porVolUtilReservatorio: row.porvolutilreservatorio,
      geracao: row.geracao,
      vazaoAfluente: row.vazaoafluente,
      vazaoDefluente: row.vazaodefluente,
      produtividade: row.produtividade,
      vazaoTurbinada: row.vazaoturbinada,
      vazaoVertida: row.vazaovertida,
      vazaoTurbinadaVazio: row.vazaoturbinadavazio,
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
    logger.error("Erro ao consultar tbdadosrepresa", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
