import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

// Mapeamento
const mapRowToDadosRepresa = (row: any) => ({
    idDadosRepresa: row.iddadosrepresa,
    dataMedida: row.datamedida,
    nivelReservatorio: row.nivelreservatorio,
    volUtilReservatorio: row.volutilreservatorio,
    porVolUtilReservatorio: row.porvolutilreservatorio,
    geracao: row.geracao,
    vazaoAfluente: row.vazaoafluente,
    vazaoDefluente: row.vazaodefluente,
    produtividade: row.produtividade,
    vazaoTurbinada: row.vazaoturbinada,
    vazaoVertida: row.vazaovertida,
    vazaoTurbinadaVazio: row.vazaoturbinadavazio,
    
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
                a.idDadosRepresa,
                a.dataMedida,
                a.nivelReservatorio,
                a.volUtilReservatorio,
                a.geracao,
                a.vazaoAfluente,
                a.vazaoDefluente,
                b.idreservatorio,
                b.nome AS reservatorio_nome
            FROM tbdadosrepresa a
            LEFT JOIN tbreservatorio b ON a.idReservatorio = b.idReservatorio
            ORDER BY a.dataMedida DESC, a.idDadosRepresa DESC
            LIMIT $1 OFFSET $2;
            `, [limit, offset],
        );

        const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbdadosrepresa",);
        const total = Number(countResult.rows[0].count);

        // Mapeia o resultado para o padrão aninhado, mantendo a listagem concisa
        const data = result.rows.map((row: any) => ({
            ...mapRowToDadosRepresa(row),
            reservatorio: row.idreservatorio ? { idreservatorio: row.idreservatorio, nome: row.reservatorio_nome } : undefined,
        }));

        res.status(200).json({
            success: true,
            page, limit, total,
            totalPages: Math.ceil(total / limit),
            data,
        });

    }   catch(error:any){
        logger.error(`Erro ao buscar dados da represa:`,
            {message: error.message, stack: error.stack,});
            
        res.status(500).json({success: false, error:"Erro ao realizar operação.",});
    }
};

// getById
export const getById = async (req: Request, res: Response): Promise<void> => {
    try{
        const idDadosRepresa = Number(req.params.idDadosRepresa);
        if(isNaN(idDadosRepresa)){
            res.status(400).json({success: false, error:`ID ${req.params.idDadosRepresa} inválido.`,});
            return;
        }

        const result = await furnasPool.query(
            `
            SELECT
                a.*,
                b.idreservatorio,
                b.nome AS reservatorio_nome,
                b.lat AS latReservatorio,
                b.lng As lngReservatorio
            FROM tbdadosrepresa a
            LEFT JOIN tbreservatorio b ON a.idReservatorio = b.idReservatorio
            WHERE a.idDadosRepresa = $1;
            `, [idDadosRepresa],
        );

        if(result.rows.length === 0){
            res.status(404).json({success: false, error:"Registro de dados de represa não encontrado.",});
            return;
        }

        // Mapeia o resultado único para o padrão aninhado
        const data = mapRowToDadosRepresa(result.rows[0]);

        res.status(200).json({success: true, data,});

    }   catch(error:any){
        logger.error(`Erro ao buscar registro por ID ${req.params.idDadosRepresa} na tabela de dados de represa.`,
            {message: error.message, stack: error.stack,});

        res.status(500).json({success: false, error:"Erro ao realizar operação.",});
    }
};