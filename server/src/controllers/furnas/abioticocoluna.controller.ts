import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 20;

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // Consulta inteligente com JOINs para buscar nomes e dados relacionados
    const result = await furnasPool.query(
      `
      SELECT 
        a.*,
        b.nrocampanha,
        c.nome AS sitio_nome,
        c.lat AS sitio_lat,
        c.lng AS sitio_lng
      FROM tbabioticocoluna AS a
      LEFT JOIN tbcampanha AS b ON a.idcampanha = b.idcampanha
      LEFT JOIN tbsitio AS c ON a.idsitio = c.idsitio
      ORDER BY a.datamedida DESC, a.horamedida DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    );

    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbabioticocoluna");
    const total = Number(countResult.rows[0].count);

    // Formata a resposta para criar os objetos aninhados que o frontend espera
    const data = result.rows.map((row: any) => {
      // Separa os dados principais dos dados aninhados
      const { idcampanha, nrocampanha, idsitio, sitio_nome, sitio_lat, sitio_lng, ...mainData } = row;
      return {
        ...mainData, // Retorna todas as colunas de tbabioticocoluna
        campanha: row.idcampanha ? { idcampanha, nrocampanha } : undefined,
        sitio: row.idsitio ? { idsitio, nome: sitio_nome, lat: sitio_lat, lng: sitio_lng } : undefined,
      };
    });

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbabioticocoluna", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};