import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

// Mapeamento
const mapRowToSitio = (row: any) => ({
    idsitio: row.idsitio,
    nome: row.sitio_nome,
    lat: row.sitio_lat,
    lng: row.sitio_lng,
    descricao: row.descricao,
    
    // Objeto Aninhado para o Reservatório
    reservatorio: row.idreservatorio
        ? {
            idreservatorio: row.idreservatorio,
            nome: row.reservatorio_nome,
            lat: row.reservatorio_lat,
            lng: row.reservatorio_lng,
          }
        : undefined,
});

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
                a.idsitio,
                a.nome AS sitio_nome,
                a.lat AS sitio_lat,
                a.lng AS sitio_lng,
                a.descricao,
                b.idreservatorio,
                b.nome AS reservatorio_nome,
                b.lat AS reservatorio_lat,
                b.lng AS reservatorio_lng
            FROM tbsitio AS a
            LEFT JOIN tbreservatorio AS b 
                ON a.idreservatorio = b.idreservatorio
            ORDER BY a.nome
            LIMIT $1 OFFSET $2
            `,
            [limit, offset],
        );

        // consulta total de registros
        const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbsitio");
        const total = Number(countResult.rows[0].count);

        // aplica o mapeamento
        const data = result.rows.map(mapRowToSitio);

        res.status(200).json({
            success: true,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data,
        });
    } catch (error: any) {
        logger.error("Erro ao consultar tbsitio", {
            message: error.message,
            stack: error.stack,
        });
        res.status(500).json({ success: false, error: "Erro ao realizar operação." }); 
    }
};

// getById
export const getById = async (req: Request, res: Response): Promise<void> => {
    try {
        const idSitio = Number(req.params.idsitio); 

        if (isNaN(idSitio)) {
            res.status(400).json({ success: false, error: `ID ${req.params.idsitio} inválido.` }); 
            return;
        }
        
        const result = await furnasPool.query(
            `
            SELECT 
                a.idsitio,
                a.nome AS sitio_nome,
                a.lat AS sitio_lat,
                a.lng AS sitio_lng,
                a.descricao,
                b.idreservatorio,
                b.nome AS reservatorio_nome,
                b.lat AS reservatorio_lat,
                b.lng AS reservatorio_lng
            FROM tbsitio AS a
            LEFT JOIN tbreservatorio AS b 
                ON a.idreservatorio = b.idreservatorio
            WHERE a.idsitio = $1
            `,
            [idSitio]
        );

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                error: `Registro de sítio não encontrado.`,
            });
            return;
        }

        // Mapeia o resultado único
        const data = mapRowToSitio(result.rows[0]);

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error: any) {
        logger.error(`Erro ao consultar tbsitio por ID ${req.params.idsitio}`, {
            message: error.message,
            stack: error.stack,
        });

        res.status(500).json({
            success: false,
            error: "Erro ao realizar operação.",
        });
    }
};