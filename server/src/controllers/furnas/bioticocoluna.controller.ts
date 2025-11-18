import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // Consulta com JOINs
    const result = await furnasPool.query(
      `
      SELECT 
        a.idbioticocoluna,
        a.datamedida,
        a.horamedida,
        a.profundidade,
        a.doc,
        a.toc,
        a.poc,
        a.densidadebacteria,
        a.biomassabacteria,
        a.clorofilaA,
        a.biomassacarbonototalfito,
        a.densidadetotalfito,
        a.biomassazoo,
        a.densidadetotalzoo,
        b.idcampanha,
        b.nrocampanha,
        c.idsitio,
        c.nome AS sitio_nome,
        c.lat AS sitio_lat,
        c.lng AS sitio_lng
      FROM tbbioticocoluna AS a
      LEFT JOIN tbcampanha AS b ON a.idcampanha = b.idcampanha
      LEFT JOIN tbsitio AS c ON a.idsitio = c.idsitio
      ORDER BY a.datamedida DESC, a.horamedida DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // Consulta para total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbbioticocoluna");
    const total = Number(countResult.rows[0].count);

    // Formatação dos dados
    const data = result.rows.map((row: any) => ({
      idbioticocoluna: row.idbioticocoluna,
      campanha: row.idcampanha
        ? {
            idcampanha: row.idcampanha,
            nrocampanha: row.nrocampanha,
          }
        : undefined,
      sitio: row.idsitio
        ? {
            idsitio: row.idsitio,
            nome: row.sitio_nome,
            lat: row.sitio_lat,
            lng: row.sitio_lng,
          }
        : undefined,
      datamedida: row.datamedida,
      horamedida: row.horamedida,
      profundidade: row.profundidade,
      doc: row.doc,
      toc: row.toc,
      poc: row.poc,
      densidadebacteria: row.densidadebacteria,
      biomassabacteria: row.biomassabacteria,
      clorofilaA: row.clorofilaA,
      biomassacarbonototalfito: row.biomassacarbonototalfito,
      densidadetotalfito: row.densidadetotalfito,
      biomassazoo: row.biomassazoo,
      densidadetotalzoo: row.densidadetotalzoo,
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
    logger.error("Erro ao consultar tbbioticocoluna", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
