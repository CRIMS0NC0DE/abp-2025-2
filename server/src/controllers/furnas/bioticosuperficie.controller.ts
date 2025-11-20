import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // consulta com joins
    const result = await furnasPool.query(
      `
      SELECT 
        a.idBioticoSuperficie,
        a.dataMedida,
        a.horaMedida,
        a.doc,
        a.toc,
        a.poc,
        a.densidadeBacteria,
        a.biomassaBacteria,
        a.clorofilaA,
        a.biomassaCarbonoTotalFito,
        a.densidadeTotalFito,
        a.biomassaZoo,
        a.densidadeTotalZoo,
        b.idCampanha,
        b.nrocampanha,
        c.idSitio,
        c.nome AS sitio_nome,
        c.lat AS sitio_lat,
        c.lng AS sitio_lng
      FROM tbbioticosuperficie AS a
      LEFT JOIN tbcampanha AS b
        ON a.idCampanha = b.idCampanha
      LEFT JOIN tbsitio AS c
        ON a.idSitio = c.idSitio
      ORDER BY a.dataMedida DESC, a.horaMedida DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // consulta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbbioticosuperficie");
    const total = Number(countResult.rows[0].count);

    // dados formatados
    const data = result.rows.map((row: any) => ({
      idBioticoSuperficie: row.idbioticosuperficie,
      campanha: row.idcampanha
        ? {
            idCampanha: row.idcampanha,
            nrocampanha: row.nrocampanha,
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
      doc: row.doc,
      toc: row.toc,
      poc: row.poc,
      densidadeBacteria: row.densidadebacteria,
      biomassaBacteria: row.biomassabacteria,
      clorofilaA: row.clorofilaa,
      biomassaCarbonoTotalFito: row.biomassacarbonototalfito,
      densidadeTotalFito: row.densidadetotalfito,
      biomassaZoo: row.biomassazoo,
      densidadeTotalZoo: row.densidadetotalzoo,
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
    logger.error("Erro ao consultar tbbioticosuperficie", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
