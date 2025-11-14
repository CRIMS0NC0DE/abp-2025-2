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
            a.idParametrosBiologicosFisicosAgua,
            a.dataMedida,
            a.profundidade,
            a.secchi,
            a.tempagua,
            a.condutividade,
            a._do,
            a.ph,
            a.turbidez,
            a.materialemsuspensao,
            a.doc,
            a.toc,
            a.poc,
            a.dic,
            a.nt,
            a.pt,
            a.densidadebacteria,
            a.biomassabacteria,
            a.clorofilaa,
            a.biomassacarbonototalfito,
            a.densidadetotalfito,
            a.biomassazoo,
            a.densidadetotalzoo,
            a.producaofitoplanctonica,
            a.carbonoorganicoexcretado,
            a.respiracaofito,
            a.producaobacteriana,
            a.respiracaobacteriana,
            a.taxasedimentacao,
            a.delta13c,
            a.delta15n,
            a.intensidadeluminosa,
            b.idCampanha,
            b.nroCampanha,
            c.idSitio,
            c.nome AS sitio_nome,
            c.lat AS sitio_lat,
            c.lng AS sitio_lng
        FROM tbparametrosbiologicosfisicosagua AS a
        LEFT JOIN tbcampanha AS b
            ON a.idCampanha = b.idCampanha
        LEFT JOIN tbsitio AS c
            ON a.idSitio = c.idSitio
        ORDER BY a.dataMedida DESC
        LIMIT $1 OFFSET $2
            `,
      [limit, offset],
    );

    const countResult = await furnasPool.query(
      "SELECT COUNT(*) FROM tbparametrosbiologicosfisicosagua",
    );
    const total = Number(countResult.rows[0].count);

    const data = result.rows.map((row: any) => ({
      idParametrosBiologicosFisicosAgua: row.idParametrosBiologicosFisicosAgua,
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
      profundidade: row.profundidade,
      secchi: row.secchi,
      tempagua: row.tempagua,
      condutividade: row.condutividade,
      do: row._do,
      ph: row._ph,
      turbidez: row.turbidez,
      materialemsuspensao: row.materialemsuspensao,
      doc: row.doc,
      toc: row.toc,
      poc: row.poc,
      dic: row.dic,
      nt: row.nt,
      pt: row.pt,
      densidadebacteria: row.densidadebacteria,
      biomassabacteria: row.biomassabacteria,
      clorofilaa: row.clorofilaa,
      biomassacarbonototalfito: row.biomassacarbonototalfito,
      densidadetotalfito: row.densidadetotalfito,
      biomassazoo: row.biomassazoo,
      densidadetotalzoo: row.densidadetotalzoo,
      producaofitoplanctonica: row.producaofitoplanctonica,
      carbonoorganicoexcretado: row.carbonoorganicoexcretado,
      respiracaofito: row.respiracaofito,
      producaobacteriana: row.producaobacteriana,
      respiracaobacteriana: row.respiracaobacteriana,
      taxasedimentacao: row.taxasedimentacao,
      delta13c: row.delta13c,
      delta15n: row.delta15n,
      intensidadeluminosa: row.intensidadeluminosa,
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
    logger.error("Erro ao consultar tbparametrosbiologicosfisicosagua", {
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
            a.idParametrosBiologicosFisicosAgua,
            a.idCampanha,
            a.idSitio,
            a.dataMedida,
            a.profundidade,
            a.secchi,
            a.tempagua,
            a.condutividade,
            a._do,
            a.ph,
            a.turbidez,
            a.materialemsuspensao,
            a.doc,
            a.toc,
            a.poc,
            a.dic,
            a.nt,
            a.pt,
            a.densidadebacteria,
            a.biomassabacteria,
            a.clorofilaa,
            a.biomassacarbonototalfito,
            a.densidadetotalfito,
            a.biomassazoo,
            a.densidadetotalzoo,
            a.producaofitoplanctonica,
            a.carbonoorganicoexcretado,
            a.respiracaofito,
            a.producaobacteriana,
            a.respiracaobacteriana,
            a.taxasedimentacao,
            a.delta13c,
            a.delta15n,
            a.intensidadeluminosa,
            b.idCampanha,
            b.nroCampanha,
            c.idSitio,
            c.nome AS sitio_nome,
            c.lat AS sitio_lat,
            c.lng AS sitio_lng
            FROM tbparametrosbiologicosfisicosagua AS a
            LEFT JOIN tbcampanha AS b
            ON a.idCampanha = b.idCampanha
            LEFT JOIN tbsitio AS c
            ON a.idSitio = c.idSitio
            WHERE a.idParametrosBiologicosFisicosAgua = $1
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
      idParametrosBiologicosFisicosAgua: row.idParametrosBiologicosFisicosAgua,
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
      profundidade: row.profundidade,
      secchi: row.secchi,
      tempagua: row.tempagua,
      condutividade: row.condutividade,
      do: row._do,
      ph: row._ph,
      turbidez: row.turbidez,
      materialemsuspensao: row.materialemsuspensao,
      doc: row.doc,
      toc: row.toc,
      poc: row.poc,
      dic: row.dic,
      nt: row.nt,
      pt: row.pt,
      densidadebacteria: row.densidadebacteria,
      biomassabacteria: row.biomassabacteria,
      clorofilaa: row.clorofilaa,
      biomassacarbonototalfito: row.biomassacarbonototalfito,
      densidadetotalfito: row.densidadetotalfito,
      biomassazoo: row.biomassazoo,
      densidadetotalzoo: row.densidadetotalzoo,
      producaofitoplanctonica: row.producaofitoplanctonica,
      carbonoorganicoexcretado: row.carbonoorganicoexcretado,
      respiracaofito: row.respiracaofito,
      producaobacteriana: row.producaobacteriana,
      respiracaobacteriana: row.respiracaobacteriana,
      taxasedimentacao: row.taxasedimentacao,
      delta13c: row.delta13c,
      delta15n: row.delta15n,
      intensidadeluminosa: row.intensidadeluminosa,
    }));

    res.status(200).json({
      success: true,
      data: data[0],
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbparametrosbiologicosfisicosagua por id", {
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