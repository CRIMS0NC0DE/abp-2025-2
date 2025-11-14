import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // Consulta com paginação e joins
    const result = await furnasPool.query(
      `
      SELECT 
        a.idVariaveisFisicasQuimicasDaAgua,
        a.idCampanha,
        a.idSitio,
        a.dataMedida,
        a.horaMedida,
        a.profundidade,
        a.secchi,
        a.batimetria,
        a.f,
        a.cl,
        a.nno3,
        a.ppo43,
        a.sso42,
        a.li,
        a.na,
        a.nnh4,
        a.k,
        a.mg,
        a.ca,
        a.clorofila,
        a.feofitina,
        a.turbidez,
        a.nt,
        a.pt,
        a.tdc,
        b.idCampanha,
        b.nroCampanha,
        c.idSitio,
        c.nome AS sitio_nome,
        c.lat AS sitio_lat,
        c.lng AS sitio_lng
      FROM tbvariaveisfisicasquimicasdaagua AS a
      LEFT JOIN tbcampanha AS b
        ON a.idCampanha = b.idCampanha
      LEFT JOIN tbsitio AS c
        ON a.idSitio = c.idSitio
      ORDER BY a.idVariaveisFisicasQuimicasDaAgua
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    const countResult = await furnasPool.query(
      "SELECT COUNT(*) FROM tbvariaveisfisicasquimicasdaagua",
    );
    const total = Number(countResult.rows[0].count);

    const data = result.rows.map((row: any) => ({
      idVariaveisFisicasQuimicasDaAgua: row.idVariaveisFisicasQuimicasDaAgua,
      campanha: row.idCampanha
        ? {
            idCampanha: row.idCampanha,
            nroCampanha: row.nroCampanha,
          }
        : undefined,
      sitio: row.idSitio
        ? {
            idSitio: row.idSitio,
            nome: row.sitio_nome,
            lat: row.sitio_lat,
            lng: row.sitio_lng,
          }
        : undefined,
        dataMedida: row.dataMedida,
        horaMedida: row.horaMedida,
        profundidade: row.profundidade,
        secchi: row.secchi,
        batimetria: row.batimetria,
        f: row.f,
        cl: row.cl,
        nno3: row.nno3,
        ppo43: row.ppo43,
        sso42: row.sso42,
        li: row.li,
        na: row.na,
        nnh4: row.nnh4,
        k: row.k,
        mg: row.mg,
        ca: row.ca,
        clorofila: row.clorofila,
        feofitina: row.feofitina,
        turbidez: row.turbidez,
        nt: row.nt,
        pt: row.pt,
        tdc: row.tdc,
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
    logger.error("Erro ao consultar tbvariaveisfisicasquimicasdaagua", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const result = await furnasPool.query(
      `
      SELECT 
        a.idVariaveisFisicasQuimicasDaAgua,
        a.idCampanha,
        a.idSitio,
        a.dataMedida,
        a.horaMedida,
        a.profundidade,
        a.secchi,
        a.batimetria,
        a.f,
        a.cl,
        a.nno3,
        a.ppo43,
        a.sso42,
        a.li,
        a.na,
        a.nnh4,
        a.k,
        a.mg,
        a.ca,
        a.clorofila,
        a.feofitina,
        a.turbidez,
        a.nt,
        a.pt,
        a.tdc,
        b.idCampanha,
        b.nroCampanha,
        c.idSitio,
        c.nome AS sitio_nome,
        c.lat AS sitio_lat,
        c.lng AS sitio_lng
      FROM tbvariaveisfisicasquimicasdaagua AS a
      LEFT JOIN tbcampanha AS b
        ON a.idCampanha = b.idCampanha
      LEFT JOIN tbsitio AS c
        ON a.idSitio = c.idSitio
      WHERE a.idVariaveisFisicasQuimicasDaAgua = $1
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
      idVariaveisFisicasQuimicasDaAgua: row.idVariaveisFisicasQuimicasDaAgua,
      campanha: row.idCampanha
        ? {
            idCampanha: row.idCampanha,
            nroCampanha: row.nroCampanha,
          }
        : undefined,
      sitio: row.idSitio
        ? {
            idSitio: row.idSitio,
            nome: row.sitio_nome,
            lat: row.sitio_lat,
            lng: row.sitio_lng,
          }
        : undefined,
        dataMedida: row.dataMedida,
        horaMedida: row.horaMedida,
        profundidade: row.profundidade,
        secchi: row.secchi,
        batimetria: row.batimetria,
        f: row.f,
        cl: row.cl,
        nno3: row.nno3,
        ppo43: row.ppo43,
        sso42: row.sso42,
        li: row.li,
        na: row.na,
        nnh4: row.nnh4,
        k: row.k,
        mg: row.mg,
        ca: row.ca,
        clorofila: row.clorofila,
        feofitina: row.feofitina,
        turbidez: row.turbidez,
        nt: row.nt,
        pt: row.pt,
        tdc: row.tdc,
    }));

    res.status(200).json({
      success: true,
      data: data[0],
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbvariaveisfisicasquimicasdaagua por ID", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
