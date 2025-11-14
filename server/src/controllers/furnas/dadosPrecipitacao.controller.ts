import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

// Mapeamento
const mapRowToDadosPrecipitacao = (row: any) => ({
    idDadosPrecipitacao: row.iddadosprecipitacao,
    dataMedida: row.datamedida,
    precipitacao: row.precipitacao,
    
    // Objeto Aninhado para o Reservatório
    reservatorio: row.idreservatorio ? {
        idreservatorio: row.idreservatorio,
        nome: row.reservatorio_nome,
        lat: row.latreservatorio,
        lng: row.lngreservatorio,
    } : undefined,
});

// getAll
export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || PAGE_SIZE;
        const offset = (page - 1) * limit;

        const result = await furnasPool.query(
            `
            SELECT 
                a.idDadosPrecipitacao,
                a.dataMedida,
                a.precipitacao,
                b.idreservatorio,
                b.nome AS reservatorio_nome
            FROM tbdadosprecipitacao a
            LEFT JOIN tbreservatorio b ON a.idReservatorio = b.idReservatorio
            ORDER BY a.dataMedida DESC, a.idDadosPrecipitacao DESC
            LIMIT $1 OFFSET $2;
            `, [limit, offset],
        );

        const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbdadosprecipitacao");
        const total = Number(countResult.rows[0].count);

        // Mapeia o resultado para o padrão aninhado, mantendo a listagem concisa
        const data = result.rows.map((row: any) => ({
            ...mapRowToDadosPrecipitacao(row),
            reservatorio: row.idreservatorio ? { idreservatorio: row.idreservatorio, nome: row.reservatorio_nome } : undefined,
        }));

        res.status(200).json({
            success: true,
            page, limit, total,
            totalPages: Math.ceil(total / limit),
            data,
        });

    }   catch(error:any){
        logger.error(`Erro ao buscar dados de precipitação:`, 
            {message: error.message, stack: error.stack,});

        res.status(500).json({success: false, error:"Erro ao realizar operação.",});
    }
};

// getById
export const getById = async (req: Request, res: Response): Promise<void> => {
    try{
        const idDadosP = Number(req.params.idDadosPrecipitacao);
        if(isNaN(idDadosP)){
            res.status(400).json({success: false, error:`ID ${req.params.idDadosPrecipitacao} inválido.`,});
            return;
        }

        const result = await furnasPool.query(
            `
            SELECT
                a.*,
                b.idreservatorio,
                b.nome AS reservatorio_nome,
                b.lat As latReservatorio,
                b.lng AS lngReservatorio
            FROM tbdadosprecipitacao a
            LEFT JOIN tbreservatorio b ON a.idReservatorio = b.idReservatorio
            WHERE a.idDadosPrecipitacao = $1;
            `, [idDadosP],
        );

        if(result.rows.length === 0){
            res.status(404).json({success: false, error:"Registro de precipitação não encontrado.",});
            return;
        }

        // Mapeia o resultado único para o padrão aninhado
        const data = mapRowToDadosPrecipitacao(result.rows[0]);

        res.status(200).json({success: true, data,});

    }   catch(error:any){
        logger.error(`Erro ao buscar registro do ID ${req.params.idDadosPrecipitacao} na tabela de dados de precipitação`, 
            {message: error.message, stack: error.stack,});

        res.status(500).json({success: false, error:"Erro ao realizar operação.",});
    }
};