import { Request, Response } from "express";
import { balcarPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // Query para buscar campanhas na tabela tbcampanha
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
      ORDER BY datainicio DESC, idcampanha DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // Contagem total de campanhas
    const countResult = await balcarPool.query("SELECT COUNT(*) FROM tbcampanha");
    const total = Number(countResult.rows[0].count);

    // Resposta formatada
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

export const getById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = Number(req.params.idcampanha);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: "ID inválido." });
    }

    const result = await balcarPool.query(
      `
      SELECT
        c.idcampanha,
        c.nrocampanha,
        c.datainicio,
        c.datafim,
        r.idreservatorio,
        r.nome AS reservatorio_nome,
        i.idinstituicao,
        i.nome AS instituicao_nome
      FROM tbcampanha c
      JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
      JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
      WHERE c.idcampanha = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Campanha não encontrada.",
      });
    }

    const row = result.rows[0];

    return res.status(200).json({
      success: true,
      data: {
        idcampanha: row.idcampanha,
        nrocampanha: row.nrocampanha,
        datainicio: row.datainicio,
        datafim: row.datafim,
        reservatorio: {
          idreservatorio: row.idreservatorio,
          nome: row.reservatorio_nome,
        },
        instituicao: {
          idinstituicao: row.idinstituicao,
          nome: row.instituicao_nome,
        },
      },
    });
  } catch (error: any) {
    logger.error("Erro ao consultar campanha por ID", {
      message: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      success: false,
      error: "Erro ao consultar campanha.",
    });
  }
};
