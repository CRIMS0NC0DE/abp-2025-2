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
                idreservatorio,
                nome,
                lat,
                lng
            FROM tbreservatorio
            ORDER BY nome
            LIMIT $1 OFFSET $2
            `,
            [limit, offset],
        );

        // consulta total de registros
        const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbreservatorio");
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
        logger.error("Erro ao consultar tbreservatorio", {
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
        const idReservatorio = Number(req.params.idreservatorio);

        if (isNaN(idReservatorio)) {
            res.status(400).json({
                success: false,
                error: `ID ${req.params.idreservatorio} inválido.`, 
            });
            return;
        }

        const result = await furnasPool.query(
            `
            SELECT 
                idreservatorio,
                nome,
                lat,
                lng
            FROM tbreservatorio
            WHERE idreservatorio = $1
            `,
            [idReservatorio]
        );

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                error: `Registro de reservatório não encontrado.`,});
            return;
        }

        res.status(200).json({
            success: true,
            data: result.rows[0],
        });
    } catch (error: any) {
        logger.error(`Erro ao consultar tbreservatorio por ID ${req.params.idreservatorio}`, {
            message: error.message,
            stack: error.stack,
        });

        res.status(500).json({
            success: false,
            error: "Erro ao realizar operação.", 
        });
    }
};