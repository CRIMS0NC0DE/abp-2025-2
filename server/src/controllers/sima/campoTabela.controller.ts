import { Request, Response } from "express";
import { simaPool} from "../../configs/db";
import { logger } from "../../configs/logger";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

// Mapeamento
const mapRowToCampoTabela = (row: any) => ({
    idcampotabela: row.idcampotabela,
    nomecampo: row.nomecampo,
    rotulo: row.rotulo,
    unidademedida: row.unidademedida,
    ordem: row.ordem,
    // Objeto aninhado para o Sensor
    sensor: row.idsensor
        ? {
            idSensor: row.idsensor,
            nome: row.nome_sensor,
          }
        : undefined,
});

//  getAll
export const getAll = async (req: Request, res: Response): Promise<void> => {
    try{
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || PAGE_SIZE;
        const offset = (page - 1) * limit;

        // consulta com paginação
        const result = await simaPool.query(
            `
            SELECT
                a.idcampotabela,
                a.idSensor AS idSensor, -- Alias idSensor para ser usado no mapeamento
                b.nome AS nome_sensor,
                a.nomecampo,
                a.rotulo,
                a.unidademedida,
                a.ordem
            FROM tbcampotabela a
            LEFT JOIN tbsensor b ON a.idSensor = b.idSensor
            ORDER BY a.nomecampo
            LIMIT $1 OFFSET $2;
            `,
            [limit, offset],
        );

        // total de registros
        const countResult = await simaPool.query("SELECT COUNT(*) FROM tbcampotabela");
        const total = Number(countResult.rows[0].count);

        const data = result.rows.map(mapRowToCampoTabela);

        res.status(200).json({success: true, page, limit, total, totalPages: Math.ceil(total / limit), data,});

    } catch(error:any){
        logger.error("Erro ao consultar tbcampotabela", {message: error.message, stack: error.stack,});

        res.status(500).json({success: false, error: "Erro ao realizar operação.",});
    }
};

// getById
export const getById = async (req: Request, res: Response): Promise<void> => {
    try{
        const idcampotabela = Number(req.params.idcampotabela);
        if(isNaN(idcampotabela)){

            res.status(400).json({success: false, error: `ID ${req.params.idcampotabela} inválido.`});
            return;
        }

        const result = await simaPool.query(
            `
            SELECT
                a.idcampotabela,
                a.idSensor AS idSensor, -- Alias idSensor para ser usado no mapeamento
                b.nome AS nome_sensor,
                a.nomecampo,
                a.rotulo,
                a.unidademedida,
                a.ordem
            FROM tbcampotabela a
            LEFT JOIN tbsensor b ON a.idSensor = b.idSensor
            WHERE a.idcampotabela = $1;
            `, [idcampotabela],
        );

        if(result.rows.length === 0){
            res.status(404).json({success: false, error: "Registro de campo por tabela não encontrado.",});
            return;
        }

        const data = mapRowToCampoTabela(result.rows[0]);

        res.status(200).json({success: true, data,});

    } catch (error:any){
        logger.error(`Erro ao consultar registro por ID na tabela tbcampotabela: ${req.params.idcampotabela}`, {
            message: error.message, stack: error.stack,});

        res.status(500).json({success: false, error:"Erro ao realizar operação.",});
    }
};