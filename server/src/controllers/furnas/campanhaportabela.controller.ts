import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const getCampanhaporTabela = async (req: Request, res: Response): Promise<Response> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || PAGE_SIZE;
    const offset = (page - 1) * limit;

    // Validação dos parâmetros 'page' e 'limit'
    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        error: "Parâmetros 'page' e 'limit' devem ser maiores que 0.",
      });
    }

    const result = await furnasPool.query(
      `
      SELECT 
        a.idcampanha,
        a.nrocampanha,
        b.idtabela,
        c.nome AS tabela_nome
      FROM tbcampanhaportabela AS a
      LEFT JOIN tbcampanha AS b
        ON a.idcampanha = b.idcampanha
      LEFT JOIN tbtabela AS c
        ON a.idtabela = c.idtabela
      ORDER BY a.idcampanha ASC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset],
    );

    // Consulta total de registros
    const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbcampanhaportabela");
    const total = Number(countResult.rows[0].count);

    // Dados formatados
    const data = result.rows.map((row: any) => ({
      idcampanha: row.idcampanha,
      nrocampanha: row.nrocampanha,
      tabelas: row.idtabela
        ? [
            {
              idtabela: row.idtabela,
              nome: row.tabela_nome,
            },
          ]
        : [],
    }));

    return res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbcampanhaportabela", {
      message: error.message,
      stack: error.stack,
    });

    return res.status(500).json({
      success: false,
      error: "Erro ao realizar a operação.",
    });
  }
};
