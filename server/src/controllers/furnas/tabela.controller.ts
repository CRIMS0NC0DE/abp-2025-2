import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = Number(page - 1) * limit;

    const result = await furnasPool.query(
      `
         SELECT
          a.idTabela,
          a.idInstituicao,
          a.nome,
          a.rotulo,
          a.excecao,
          a.sitio,
          a.campanha,
          b.idInstituicao,
          b.nome AS nomeInstituicao
        FROM tbtabela AS a
        LEFT JOIN tbinstituicao AS b
          ON a.idInstituicao = b.idInstituicao
        LIMIT $1 OFFSET $2
        `,
      [limit, offset],
    );

    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbtabela");
    const total = Number(countResult.rows[0].count);

      const data = result.rows.map((row: any) => ({
      idTabela: row.idTabela,
      instituicao: row.idInstituicao
        ? {
            idInstituicao: row.idInstituicao,
            nome: row.nomeInstituicao,
          }
        : undefined,
      nome: row.nome,
      rotulo: row.rotulo,
      excecao: row.excecao,
      sitio: row.sitio,
      campanha: row.campanha,
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
    logger.error("Erro ao consultar tbtabela", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação",
    });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await furnasPool.query(
      `
        SELECT
          a.idTabela,
          a.idInstituicao,
          a.nome,
          a.rotulo,
          a.excecao,
          a.sitio,
          a.campanha,
          b.idInstituicao,
          b.nome AS nomeInstituicao
        FROM tbtabela AS a
        LEFT JOIN tbinstituicao AS b
          ON a.idInstituicao = b.idInstituicao
        WHERE a.idTabela = $1
        `,
      [id],
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: `O ID ${id} não foi encontrado.`,
      });
      return;
    }

    const data = result.rows.map((row: any) => ({
      idTabela: row.idTabela,
      instituicao: row.idInstituicao
        ? {
            idInstituicao: row.idInstituicao,
            nome: row.nomeInstituicao,
          }
        : undefined,
      nome: row.nome,
      rotulo: row.rotulo,
      excecao: row.excecao,
      sitio: row.sitio,
      campanha: row.campanha,
    }));

    res.status(200).json({
      success: true,
      data: data[0],
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbtabela por ID.", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};

// feito
