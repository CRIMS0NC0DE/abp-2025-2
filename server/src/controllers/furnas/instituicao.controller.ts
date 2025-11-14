import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

// getAll
export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        // Padronizando leitura de query params
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || PAGE_SIZE;
        const offset = (page - 1) * limit;

        // consulta com paginação
        const result = await furnasPool.query(
            `
            SELECT 
                idinstituicao,
                nome
            FROM tbinstituicao
            ORDER BY nome
            LIMIT $1 OFFSET $2
            `,
            [limit, offset],
        );

        // consulta total de registros
        const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbinstituicao");
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
        logger.error("Erro ao consultar tbinstituicao", {
            message: error.message,
            stack: error.stack,
        });

        res.status(500).json({
            success: false,
            error: "Erro ao realizar operação.", 
        });
    }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
    try {
        // Leitura e conversão padronizada, esperando o nome da coluna no parâmetro de rota
        const idInstituicao = Number(req.params.idinstituicao);

        // Validação de ID
        if (isNaN(idInstituicao)) {
            res.status(400).json({
                success: false,
                error: `ID ${req.params.idinstituicao} inválido.`, 
            });
            return;
        }

        const result = await furnasPool.query(
            `
            SELECT 
                idinstituicao,
                nome
            FROM tbinstituicao
            WHERE idinstituicao = $1
            `,
            [idInstituicao]
        );

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                error: `Registro de instituição não encontrado.`, 
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: result.rows[0],
        });
    } catch (error: any) {
        logger.error(`Erro ao consultar tbinstituicao por ID ${req.params.idinstituicao}`, {
            message: error.message,
            stack: error.stack,
        });

        res.status(500).json({
            success: false,
            error: "Erro ao realizar operação."
        });
    }
};