import { Request, Response } from "express";
import { simaPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // consulta com paginação
    const result = await simaPool.query(
      `
      SELECT 
        idsima,
        idestacao,
        datahora,
        regno,
        nofsamples,
        proamag,
        dirvt,
        intensvt,
        u_vel,
        v_vel,
        tempag1,
        tempag2,
        tempag3,
        tempag4,
        tempar,
        ur,
        tempar_r,
        pressatm,
        radincid,
        radrefl,
        bateria,
        sonda_temp,
        sonda_cond,
        sonda_DOsat,
        sonda_DO,
        sonda_pH,
        sonda_NH4,
        sonda_NO3,
        sonda_turb,
        sonda_chl,
        sonda_bateria,
        corr_norte,
        corr_leste,
        co2_low,
        co2_high,
        precipitacao
      FROM tbsima
      ORDER BY datahora DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // total de registros
    const countResult = await simaPool.query("SELECT COUNT(*) FROM tbsima");
    const total = Number(countResult.rows[0].count);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbsima", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};

export const getEstacoes = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await simaPool.query(
      `
      SELECT 
        idestacao,
        rotulo,
        lat,
        lng,
        inicio,
        fim
      FROM tbestacao
      ORDER BY rotulo
      `,
    );

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbsima", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};

export const getByEstacao = async (req: Request, res: Response): Promise<void> => {
  try {
    const idestacao = Number(req.query.idestacao) || "32445";
    const inicio = req.query.inicio || "2000-01-01";
    const fim = req.query.fim || "2020-01-01";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // consulta com paginação
    const result = await simaPool.query(
      `
      SELECT 
        idsima,
        idestacao,
        datahora,
        regno,
        nofsamples,
        proamag,
        dirvt,
        intensvt,
        u_vel,
        v_vel,
        tempag1,
        tempag2,
        tempag3,
        tempag4,
        tempar,
        ur,
        tempar_r,
        pressatm,
        radincid,
        radrefl,
        bateria,
        sonda_temp,
        sonda_cond,
        sonda_DOsat,
        sonda_DO,
        sonda_pH,
        sonda_NH4,
        sonda_NO3,
        sonda_turb,
        sonda_chl,
        sonda_bateria,
        corr_norte,
        corr_leste,
        co2_low,
        co2_high,
        precipitacao
      FROM tbsima
      WHERE idestacao = $1 AND datahora >= $2 AND datahora <= $3
      ORDER BY datahora DESC
      LIMIT $4 OFFSET $5
      `,
      [idestacao, inicio, fim, limit, offset],
    );

    // total de registros
    const countResult = await simaPool.query(
      "SELECT COUNT(*) FROM tbsima WHERE idestacao = $1 AND datahora >= $2 AND datahora <= $3",
      [idestacao, inicio, fim],
    );
    const total = Number(countResult.rows[0].count);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      inicio,
      fim,
      totalPages: Math.ceil(total / limit),
      data: result.rows,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbsima", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
