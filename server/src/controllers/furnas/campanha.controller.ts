import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // consulta com paginação
    const result = await furnasPool.query(
      `
      SELECT 
        a.idcampanha,
        a.nrocampanha,
        a.datainicio,
        a.datafim,
        b.idinstituicao,
        b.nome AS instituicao_nome,
        c.idreservatorio,
        c.nome AS reservatorio_nome,
        c.lat AS reservatorio_lat,
        c.lng AS reservatorio_lng
      FROM tbcampanha AS a
      LEFT JOIN tbinstituicao AS b 
        ON a.idinstituicao = b.idinstituicao
      LEFT JOIN tbreservatorio AS c 
        ON a.idreservatorio = c.idreservatorio
      ORDER BY c.nome, a.nrocampanha
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // consulta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbcampanha");
    const total = Number(countResult.rows[0].count);

    // dados formatados
    const data = result.rows.map((row: any) => ({
      idcampanha: row.idcampanha,
      instituicao: row.idinstituicao
        ? {
            idinstituicao: row.idinstituicao,
            nome: row.instituicao_nome,
          }
        : undefined,
      reservatorio: row.idreservatorio
        ? {
            idreservatorio: row.idreservatorio,
            nome: row.reservatorio_nome,
            lat: row.reservatorio_lat,
            lng: row.reservatorio_lng,
          }
        : undefined,
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
