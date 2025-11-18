import { Request, Response } from "express";
import { simaPool } from "../../configs/db";
import { queryWithRetry } from "../../utils/dbRetry";
import { logger } from "../../configs/logger";

// Função auxiliar para somar 1 dia à data no formato YYYY-MM-DD
function addOneDay(dateStr: string): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10); // retorna só YYYY-MM-DD
}

export const getAllSimple = async (req: Request, res: Response): Promise<void> => {
  try {
    // Consulta simples para obter todas as estações
    const result = await queryWithRetry(
      simaPool,
      `SELECT idestacao, rotulo FROM tbestacao ORDER BY rotulo ASC`,
      [],
      { retries: 6, delayMs: 800 },
    );

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbestacao simples", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro interno ao consultar as estações.",
    });
  }
};

export const getAllForMap = async (req: Request, res: Response): Promise<void> => {
  try {
    // Consulta para obter todas as estações com coordenadas para o mapa
    const result = await queryWithRetry(
      simaPool,
      `SELECT idestacao, idhexadecimal, rotulo, lat, lng, inicio, fim FROM tbestacao 
       WHERE lat IS NOT NULL AND lng IS NOT NULL
       ORDER BY rotulo ASC`,
      [],
      { retries: 6, delayMs: 800 },
    );

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbestacao para mapa", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro interno ao consultar as estações para o mapa.",
    });
  }
};

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10);
    const limit = parseInt(req.query.limit as string, 10);
    const startDate = req.query.startDate as string;
    const endDate = req.query.endDate as string;

    // Validações
    if (!page || page < 1) {
      res.status(400).json({
        success: false,
        error: "Parâmetro 'page' inválido.",
      });
      return;
    }

    if (!limit || limit < 1) {
      res.status(400).json({
        success: false,
        error: "Parâmetro 'limit' inválido.",
      });
      return;
    }

    if (!startDate || !endDate) {
      res.status(400).json({
        success: false,
        error: "Parâmetros 'startDate' e 'endDate' são obrigatórios.",
      });
      return;
    }

    const offset = (page - 1) * limit;

    // Ajuste do range de datas para a coluna 'inicio'
    const startDateTime = `${startDate} 00:00:00`;
    const endDateTime = `${addOneDay(endDate)} 00:00:00`;

    // Consulta paginada na tabela tbestacao com filtro por data de 'inicio'
    const result = await queryWithRetry(
      simaPool,
      `SELECT * FROM tbestacao
       WHERE inicio >= $3 AND inicio < $4
       ORDER BY inicio DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset, startDateTime, endDateTime],
      { retries: 6, delayMs: 800 },
    );

    // Total de registros dentro do filtro
    const countResult = await queryWithRetry(
      simaPool,
      `SELECT COUNT(*) FROM tbestacao
       WHERE inicio >= $1 AND inicio < $2`,
      [startDateTime, endDateTime],
      { retries: 6, delayMs: 800 },
    );

    const total = parseInt(countResult.rows[0].count, 10);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages,
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbestacao", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro interno ao consultar os dados da estação.",
    });
  }
};
