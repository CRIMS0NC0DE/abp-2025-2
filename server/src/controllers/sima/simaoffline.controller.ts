import { Request, Response } from "express";
import { simaPool } from "../../configs/db"; // assumindo pool separado para SIMA
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
        idsimaoffline,
        idestacao,
        datahora,
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
        fonteradiometro,
        sonda_temp,
        sonda_cond,
        sonda_do,
        sonda_ph,
        sonda_nh4,
        sonda_no3,
        sonda_turb,
        sonda_chl,
        sonda_bateria,
        corr_norte,
        corr_leste,
        bateriapainel
      FROM tbsimaoffline
      ORDER BY datahora DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // total de registros
    const countResult = await simaPool.query("SELECT COUNT(*) FROM tbsimaoffline");
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
    logger.error("Erro ao consultar tbsimaoffline", {
      message: error.message,
      stack: error.stack,
    });

    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
