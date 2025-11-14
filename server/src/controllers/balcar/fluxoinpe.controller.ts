
import { Request, Response } from "express";
import { balcarPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // consulta com left join em campanha e sítio
    const result = await balcarPool.query(
      `
      SELECT 
        a.idfluxoinpe,
        a.datamedida,
        a.ch4,
        a.batimetria,
        a.tempar,
        a.tempcupula,
        a.tempaguasubsuperficie,
        a.tempaguameio,
        a.tempaguafundo,
        a.phsubsuperficie,
        a.phmeio,
        a.phfundo,
        a.orpsubsuperficie,
        a.orpmeio,
        a.orpfundo,
        a.condutividadesubsuperficie,
        a.condutividademeio,
        a.condutividadefundo,
        a.odsubsuperficie,
        a.odmeio,
        a.odfundo,
        a.tsdsubsuperficie,
        a.tsdmeio,
        a.tsdfundo,
        b.idcampanha,
        b.nrocampanha,
        c.idsitio,
        c.nome AS sitio_nome,
        c.lat AS sitio_lat,
        c.lng AS sitio_lng
      FROM tbfluxoinpe AS a
      LEFT JOIN tbcampanha AS b
        ON a.idcampanha = b.idcampanha
      LEFT JOIN tbsitio AS c
        ON a.idsitio = c.idsitio
      ORDER BY a.datamedida DESC, a.idfluxoinpe DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // total de registros
    const countResult = await balcarPool.query("SELECT COUNT(*) FROM tbfluxoinpe");
    const total = Number(countResult.rows[0].count);

    // resposta formatada
    const data = result.rows.map((row: any) => ({
      idfluxoinpe: row.idfluxoinpe,
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
      ch4: row.ch4,
      batimetria: row.batimetria,
      tempar: row.tempar,
      tempcupula: row.tempcupula,
      tempaguasubsuperficie: row.tempaguasubsuperficie,
      tempaguameio: row.tempaguameio,
      tempaguafundo: row.tempaguafundo,
      phsubsuperficie: row.phsubsuperficie,
      phmeio: row.phmeio,
      phfundo: row.phfundo,
      orpsubsuperficie: row.orpsubsuperficie,
      orpmeio: row.orpmeio,
      orpfundo: row.orpfundo,
      condutividadesubsuperficie: row.condutividadesubsuperficie,
      condutividademeio: row.condutividademeio,
      condutividadefundo: row.condutividadefundo,
      odsubsuperficie: row.odsubsuperficie,
      odmeio: row.odmeio,
      odfundo: row.odfundo,
      tsdsubsuperficie: row.tsdsubsuperficie,
      tsdmeio: row.tsdmeio,
      tsdfundo: row.tsdfundo,
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
    logger.error("Erro ao consultar tbfluxoinpe", {
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
    // Captura o idfluxoinpe do parâmetro da URL
    const id = Number(req.params.id);

    // Verifica se o ID é válido
    if (isNaN(id)) {
      res.status(400).json({
        success: false,
        error: "ID inválido",
      });
      return;
    }

    // Query para buscar um único registro com base no idfluxoinpe
    const result = await balcarPool.query(
      `
      SELECT 
        a.idfluxoinpe,
        a.datamedida,
        a.ch4,
        a.batimetria,
        a.tempar,
        a.tempcupula,
        a.tempaguasubsuperficie,
        a.tempaguameio,
        a.tempaguafundo,
        a.phsubsuperficie,
        a.phmeio,
        a.phfundo,
        a.orpsubsuperficie,
        a.orpmeio,
        a.orpfundo,
        a.condutividadesubsuperficie,
        a.condutividademeio,
        a.condutividadefundo,
        a.odsubsuperficie,
        a.odmeio,
        a.odfundo,
        a.tsdsubsuperficie,
        a.tsdmeio,
        a.tsdfundo,
        b.idcampanha,
        b.nrocampanha,
        c.idsitio,
        c.nome AS sitio_nome,
        c.lat AS sitio_lat,
        c.lng AS sitio_lng
      FROM tbfluxoinpe AS a
      LEFT JOIN tbcampanha AS b ON a.idcampanha = b.idcampanha
      LEFT JOIN tbsitio AS c ON a.idsitio = c.idsitio
      WHERE a.idfluxoinpe = $1
      `,
      [id]
    );

    // Se não encontrar nenhum registro com o id
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: "Registro não encontrado",
      });
      return;
    }

    // O primeiro (e único) registro encontrado
    const row = result.rows[0];

    const data = {
      idfluxoinpe: row.idfluxoinpe,
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
      ch4: row.ch4,
      batimetria: row.batimetria,
      tempar: row.tempar,
      tempcupula: row.tempcupula,
      tempaguasubsuperficie: row.tempaguasubsuperficie,
      tempaguameio: row.tempaguameio,
      tempaguafundo: row.tempaguafundo,
      phsubsuperficie: row.phsubsuperficie,
      phmeio: row.phmeio,
      phfundo: row.phfundo,
      orpsubsuperficie: row.orpsubsuperficie,
      orpmeio: row.orpmeio,
      orpfundo: row.orpfundo,
      condutividadesubsuperficie: row.condutividadesubsuperficie,
      condutividademeio: row.condutividademeio,
      condutividadefundo: row.condutividadefundo,
      odsubsuperficie: row.odsubsuperficie,
      odmeio: row.odmeio,
      odfundo: row.odfundo,
      tsdsubsuperficie: row.tsdsubsuperficie,
      tsdmeio: row.tsdmeio,
      tsdfundo: row.tsdfundo,
    };

    // Retorna a resposta com o registro encontrado
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    // Erro no processo de consulta
    logger.error("Erro ao consultar tbfluxoinpe por idfluxoinpe", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
