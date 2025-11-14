import { Request, Response } from "express";
import { furnasPool } from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

// Mapeamento
const mapRowToGasesEmBolhas = (row: any) => ({
    idGasesEmBolhas: row.idgasesembolhas,
    dataMedida: row.datamedida,
    profundidade: row.profundidade,
    co2: row.co2,
    o2: row.o2,
    n2: row.n2,
    ch4: row.ch4,
    n2o: row.n2o,

    // Objeto Aninhado para o Sítio
    sitio: row.idsitio ? {
        idsitio: row.idsitio,
        nome: row.sitio_nome,
        lat: row.sitio_lat,
        lng: row.sitio_lng,
        descricao: row.sitio_descricao,
    } : undefined,
    
    // Objeto Aninhado para a Campanha
    campanha: row.idcampanha ? {
        idcampanha: row.idcampanha,
        nroCampanha: row.nrocampanha,
        dataInicio: row.campanha_datainicio,
        dataFim: row.campanha_datafim,
    } : undefined,

    // Objeto Aninhado para o Reservatório
    reservatorio: row.idreservatorio ? {
        idreservatorio: row.idreservatorio,
        nome: row.reservatorio_nome,
    } : undefined,
});

// getAll
export const getAll = async (req: Request, res: Response): Promise<void> => {
    try{
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || PAGE_SIZE;
        const offset = (page - 1) * limit;

        const result = await furnasPool.query(
            `
            SELECT
                a.idGasesEmBolhas,
                a.dataMedida,
                a.profundidade,
                a.co2,
                a.o2,
                a.n2,
                a.ch4,
                a.n2o,
                b.idsitio,
                b.nome AS sitio_nome,
                c.idcampanha,
                c.nroCampanha
            FROM tbgasesembolhas a
            LEFT JOIN tbsitio b ON a.idSitio = b.idSitio
            LEFT JOIN tbcampanha c ON a.idCampanha = c.idCampanha
            ORDER BY a.dataMedida DESC, a.profundidade ASC
            LIMIT $1 OFFSET $2;
            `, [limit, offset],
        );

        const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbgasesembolhas",);
        const total = Number(countResult.rows[0].count);

        // Mapeia o resultado para o padrão aninhado, mantendo a listagem concisa
        const data = result.rows.map((row: any) => ({
            ...mapRowToGasesEmBolhas(row),
            sitio: row.idsitio ? { idsitio: row.idsitio, nome: row.sitio_nome } : undefined,
            campanha: row.idcampanha ? { idcampanha: row.idcampanha, nroCampanha: row.nrocampanha } : undefined,
            reservatorio: undefined,
        }));

        res.status(200).json({
            success: true,
            page, limit, total,
            totalPages: Math.ceil(total / limit),
            data,
        });

    }   catch(error:any){
        logger.error(`Erro ao buscar dados de gases em bolhas:`,
            {message: error.message, stack: error.stack,});

        res.status(500).json({success: false, error:"Erro ao realizar operação.",}); 
    }
};

// getById
export const getById = async (req: Request, res:Response): Promise<void> => {
    try{
        const idGEBolhas = Number(req.params.idGasesEmBolhas);
        if(isNaN(idGEBolhas)){
            res.status(400).json({success: false, error: `ID ${req.params.idGasesEmBolhas} inválido.`,}); 
            return;
        }

        const result = await furnasPool.query(
            `
            SELECT 
                a.*,
                b.idsitio,
                b.nome AS sitio_nome,
                b.lat AS sitio_lat,
                b.lng AS sitio_lng,
                b.descricao AS sitio_descricao,
                c.idcampanha,
                c.nroCampanha,
                c.dataInicio AS campanha_datainicio,
                c.dataFim AS campanha_datafim,
                d.idreservatorio,
                d.nome AS reservatorio_nome
            FROM tbgasesembolhas a
            LEFT JOIN tbsitio b ON a.idSitio = b.idSitio
            LEFT JOIN tbcampanha c ON a.idCampanha = c.idCampanha
            LEFT JOIN tbreservatorio d ON c.idReservatorio = d.idreservatorio
            WHERE a.idGasesEmBolhas = $1;
            `, [idGEBolhas],
        );

        if(result.rows.length === 0){
            res.status(404).json({success: false, error:"Registro de gases em bolhas não encontrado.",}); 
            return;
        }

        // Mapeia o resultado único para o padrão aninhado
        const data = mapRowToGasesEmBolhas(result.rows[0]);

        res.status(200).json({success: true, data,});

    }   catch(error:any){
        logger.error(`Erro ao buscar registro por ID ${req.params.idGasesEmBolhas} na tabela de gases em bolhas.`, 
            {message: error.message, stack: error.stack,});

        res.status(500).json({success: false, error:"Erro ao realizar operação.",}); 
    }
};