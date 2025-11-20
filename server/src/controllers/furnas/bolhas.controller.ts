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
        a.idbolhas,
        a.datamedida,
        a.horamedida,
        a.profundidade,
        a.nrodefunis,
        a.volumecoletado,
        a.co2,
        a.o2,
        a.n2,
        a.ch4,
        a.n2o,
        b.idcampanha,
        b.nrocampanha,
        c.idsitio,
        c.nome AS sitio_nome,
        c.lat AS sitio_lat,
        c.lng AS sitio_lng
      FROM tbbolhas AS a
      LEFT JOIN tbcampanha AS b
        ON a.idcampanha = b.idcampanha
      LEFT JOIN tbsitio AS c
        ON a.idsitio = c.idsitio
      ORDER BY a.datamedida DESC, a.horamedida DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // consulta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbbolhas");
    const total = Number(countResult.rows[0].count);

    // dados formatados
    const data = result.rows.map((row: any) => ({
      idbolhas: row.idbolhas,
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
      nrodefunis: row.nrodefunis,
      volumecoletado: row.volumecoletado,
      co2: row.co2,
      o2: row.o2,
      n2: row.n2,
      ch4: row.ch4,
      n2o: row.n2o,
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
    logger.error("Erro ao consultar tbbolhas", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
