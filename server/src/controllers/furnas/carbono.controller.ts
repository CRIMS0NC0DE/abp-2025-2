import { Request, Response } from 'express';
import { furnasPool } from '../../configs/db';
import { logger } from '../../configs/logger';

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

// Mapeamento
const mapRowToCarbono = (row: any) => ({
    idCarbono: row.idcarbono,
    dataMedida: row.datamedida,
    horaMedida: row.horamedida,
    dc: row.dc,
    doc: row.doc,
    poc: row.poc,
    toc: row.toc,
    dic: row.dic,
    tc: row.tc,
    
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
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || PAGE_SIZE;
        const offset = (page - 1) * limit;

        const result = await furnasPool.query(
            `
            SELECT 
                a.idCarbono,
                a.dataMedida,
                a.horaMedida,
                a.dc,
                a.doc,
                a.poc,
                a.toc,
                a.dic,
                a.tc,
                b.idsitio,
                b.nome AS sitio_nome,
                c.idcampanha,
                c.nroCampanha
            FROM tbcarbono a
            LEFT JOIN tbsitio b ON a.idSitio = b.idSitio
            LEFT JOIN tbcampanha c ON a.idCampanha = c.idCampanha
            ORDER BY a.dataMedida DESC, a.horaMedida DESC
            LIMIT $1 OFFSET $2;
            `, [limit, offset],
        );

        const countResult = await furnasPool.query("SELECT COUNT(*) FROM tbcarbono");
        const total = Number(countResult.rows[0].count);

        // Mapeia o resultado para o padrão aninhado, mantendo a listagem concisa
        const data = result.rows.map((row: any) => ({
            ...mapRowToCarbono(row),
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

    } catch(error:any){
        logger.error("Erro ao consultar a tabela carbono", {message: error.message, stack:error.stack,});
        res.status(500).json({success: false, error:"Erro ao realizar operação.",});
    };
}

// getById
export const getById = async (req: Request, res: Response): Promise<void> => {
    try{
        const idCarbono = Number(req.params.idCarbono);
        if(isNaN(idCarbono)){
            res.status(400).json({success: false, error:`ID ${req.params.idCarbono} inválido.`});
            return;
        }

        const result = await furnasPool.query(
            `
            SELECT 
                a.*,
                b.idsitio,
                b.nome AS sitio_nome,
                b.descricao AS sitio_descricao,
                b.lat AS sitio_lat,
                b.lng AS sitio_lng,
                c.idcampanha,
                c.nroCampanha,
                c.dataInicio AS campanha_datainicio,
                c.dataFim AS campanha_datafim,
                d.idreservatorio,
                d.nome AS reservatorio_nome
            FROM tbcarbono a
            LEFT JOIN tbsitio b ON a.idSitio = b.idSitio
            LEFT JOIN tbcampanha c ON a.idCampanha = c.idCampanha
            LEFT JOIN tbreservatorio d ON c.idReservatorio = d.idReservatorio
            WHERE a.idCarbono = $1;
            `, [idCarbono],
        );

        if(result.rows.length === 0){
            res.status(404).json({success: false, error:"Registro de carbono não encontrado.",});
            return;   
        }

        // Mapeia o resultado único para o padrão aninhado
        const data = mapRowToCarbono(result.rows[0]);

        res.status(200).json({success: true, data,});

    } catch(error:any){
        logger.error(`Erro ao consultar registro por ID na tabela tbcarbono: ${req.params.idCarbono}`, {
            message: error.message, stack: error.stack,});
        res.status(500).json({success: false, error:"Erro ao realizar operação.",});
    }
};