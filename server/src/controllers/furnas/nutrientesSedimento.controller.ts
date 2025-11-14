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
        a.idNutrientesSedimento,
        a.idCampanha,
        a.dataMedida,
        a.horaMedida,
        a.profundidade,
        a.batimetria,
        a.n2,
        a.pt,
        a.tc,
        b.idCampanha,
        b.nroCampanha,
        c.idSitio,
        c.nome AS sitio_nome,
        c.lat AS sitio_lat,
        c.lng AS sitio_lng
      FROM tbnutrientessedimento AS a
      LEFT JOIN tbcampanha AS b
        ON a.idCampanha = b.idCampanha
      LEFT JOIN tbsitio AS c
        ON a.idSitio = c.idSitio
      ORDER BY a.dataMedida DESC, a.horaMedida DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // Consulta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbnutrientessedimento");
    const total = Number(countResult.rows[0].count);

    // Dados formatados
    const data = result.rows.map((row: any) => ({
      idNutrientesSedimento: row.idNutrientesSedimento,
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
      batimetria: row.batimetria,
      n2: row.n2,
      pt: row.pt,
      tc: row.tc,
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
    logger.error("Erro ao consultar tbnutrientessedimento", {
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
        a.idNutrientesSedimento,
        a.idCampanha,
        a.dataMedida,
        a.horaMedida,
        a.profundidade,
        a.batimetria,
        a.n2,
        a.pt,
        a.tc,
        b.idCampanha,
        b.nroCampanha,
        c.idSitio,
        c.nome AS sitio_nome,
        c.lat AS sitio_lat,
        c.lng AS sitio_lng
      FROM tbnutrientessedimento AS a
      LEFT JOIN tbcampanha AS b
        ON a.idCampanha = b.idCampanha
      LEFT JOIN tbsitio AS c
        ON a.idSitio = c.idSitio
      WHERE a.idNutrientesSedimento = $1
      `,
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: `O ID ${id} não foi encontrado.`,
      });
      return;
    }

    const data = result.rows.map((row: any) => ({
      idNutrientesSedimento: row.idNutrientesSedimento,
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
      batimetria: row.batimetria,
      n2: row.n2,
      pt: row.pt,
      tc: row.tc,
    }));

    res.status(200).json({
      success: true,
      data: data[0],
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbnutrientessedimento por ID", {
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