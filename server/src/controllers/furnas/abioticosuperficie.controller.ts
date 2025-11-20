import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;
const MAX_PAGE_SIZE = Number(process.env.MAX_PAGE_SIZE) || 100;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const pageRaw = req.query.page as string | undefined;
    const limitRaw = req.query.limit as string | undefined;

    const page = pageRaw ? parseInt(pageRaw, 10) : 1;
    const limitInput = limitRaw ? parseInt(limitRaw, 10) : PAGE_SIZE;

    if (Number.isNaN(page) || page < 1) {
      res.status(400).json({
        success: false,
        error: "Parâmetro 'page' inválido. Use inteiro >= 1.",
      });
      return;
    }

    if (Number.isNaN(limitInput) || limitInput < 1) {
      res.status(400).json({
        success: false,
        error: "Parâmetro 'limit' inválido. Use inteiro >= 1.",
      });
      return;
    }

    const limit = Math.min(limitInput, MAX_PAGE_SIZE);
    const offset = (page - 1) * limit;

    // consulta com joins
    const result = await furnasPool.query(
      `
      SELECT 
        a.idAbioticoSuperficie,
        a.dataMedida,
        a.horaMedida,
        a.dic,
        a.nt,
        a.pt,
        a.delta13c,
        a.delta15n,
        b.idCampanha,
        b.nroCampanha,
        c.idSitio,
        c.nome AS sitio_nome,
        c.lat AS sitio_lat,
        c.lng AS sitio_lng
      FROM tbAbioticoSuperficie AS a
      LEFT JOIN tbCampanha AS b
        ON a.idCampanha = b.idCampanha
      LEFT JOIN tbSitio AS c
        ON a.idSitio = c.idSitio
      ORDER BY a.dataMedida DESC, a.horaMedida DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbAbioticoSuperficie");
    const total = Number(countResult.rows[0].count);

    // formatação dos dados
    const data = result.rows.map((row: any) => ({
      idAbioticoSuperficie: row.idabioticosuperficie,
      campanha: row.idcampanha
        ? {
            idCampanha: row.idcampanha,
            nroCampanha: row.nrocampanha,
          }
        : undefined,
      sitio: row.idsitio
        ? {
            idSitio: row.idsitio,
            nome: row.sitio_nome,
            lat: row.sitio_lat,
            lng: row.sitio_lng,
          }
        : undefined,
      dataMedida: row.datamedida,
      horaMedida: row.horamedida,
      dic: row.dic,
      nt: row.nt,
      pt: row.pt,
      delta13c: row.delta13c,
      delta15n: row.delta15n,
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
    logger.error("Erro ao consultar tbAbioticoSuperficie", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
