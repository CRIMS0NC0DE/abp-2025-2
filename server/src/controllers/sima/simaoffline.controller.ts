import { Request, Response } from "express";
import { logger } from "../../configs/logger";

// 1. Importa os Serviços
import { DataFormatterService } from "../../services/dataFormatterService";
import { ExportService, ExportFileOptions } from "../../services/exportService";

// 2. Importa o Model
import { SimaOfflineModel } from "../../models/sima/simaOffline.model";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

// --- ENDPOINTS ---

/**
 * Endpoint: getAll
 * Busca dados paginados e filtrados.
 */
export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || PAGE_SIZE;

        // 1. Pede os dados paginados ao Model, passando os filtros
        const { data: rawData, total } = await SimaOfflineModel.findPaginated({
            filters: req.query, // O FilterService é aplicado dentro do Model
            page,
            limit,
        });

        // 2. Formata os dados "crus" usando o Service
        //    (O map manual 'mapRowToSimaOffline' foi removido)
        const data = rawData.map(DataFormatterService.formatListRow);

        // 3. Envia a resposta
        res.status(200).json({
            success: true,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data,
        });
    } catch (error: any) {
        logger.error("Erro ao consultar tbsimaoffline", {
            message: error.message,
            stack: error.stack,
        });
        res.status(500).json({
            success: false,
            error: "Erro ao realizar operação.",
        });
    }
};

/**
 * Endpoint: getById
 * Busca um único registro por ID.
 */
export const getById = async (req: Request, res: Response): Promise<void> => {
    try {
        const idsimaoffline = Number(req.params.idsimaoffline);
        if (isNaN(idsimaoffline)) {
            res.status(400).json({ success: false, error: `ID ${req.params.idsimaoffline} inválido.` });
            return;
        }

        // 1. Pede o dado ao Model
        const rawData = await SimaOfflineModel.findById(idsimaoffline);

        // 2. Verifica se foi encontrado
        if (!rawData) {
            res.status(404).json({ success: false, error: "Registro de dados SIMA Offline não encontrado." });
            return;
        }

        // 3. Retorna os dados crus (conforme exemplo)
        //    (O 'mapRowToSimaOffline' foi removido, seguindo o padrão)
        const data = rawData;

        // 4. Envia a resposta
        res.status(200).json({
            success: true,
            data,
        });
    } catch (error: any) {
        logger.error(`Erro ao consultar registro por ID na tabela tbsimaoffline: ${req.params.idsimaoffline}`, {
            message: error.message,
            stack: error.stack,
        });
        res.status(500).json({
            success: false,
            error: "Erro ao realizar operação.",
        });
    }
};

/**
 * Endpoint: exportData
 * Exporta dados para CSV ou XLSX, com base nos filtros.
 * (Adicionado com base no exemplo)
 */
export const exportData = async (req: Request, res: Response): Promise<void> => {
    try {
        // 1. Extrai opções do body
        const { format, range, includeHeaders, delimiter, encoding, filters, page, limit } =
            req.body as ExportFileOptions & {
                range: "page" | "all";
                filters: any;
                page?: number;
                limit?: number;
            };

        // Opções para o ExportService
        const exportOptions: ExportFileOptions = {
            format,
            includeHeaders,
            delimiter,
            encoding,
        };

        let rawData: any[];

        // 2. Busca os dados no Model com base no 'range'
        if (range === "page") {
            const { data } = await SimaOfflineModel.findPaginated({
                filters: filters || {},
                page: page || 1,
                limit: limit || PAGE_SIZE,
            });
            rawData = data;
        } else {
            // range === 'all'
            rawData = await SimaOfflineModel.findAll({
                filters: filters || {},
            });
        }

        // 3. Formata os dados para "lista"
        const formattedData = rawData.map(DataFormatterService.formatListRow);

        // 4. Gera o buffer do arquivo
        const fileBuffer = await ExportService.generateExportFile(formattedData, exportOptions);

        // 5. Define os headers da resposta
        const fileName = `export_sima_offline_${new Date().toISOString().slice(0, 10)}.${format}`;

        if (format === "xlsx") {
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            );
        } else {
            res.setHeader("Content-Type", "text/csv; charset=" + (encoding || "utf-8"));
        }
        res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

        // 6. Envia o buffer como resposta
        res.send(fileBuffer);
    } catch (error: any) {
        logger.error("Erro ao exportar dados de tbsimaoffline", {
            message: error.message,
            stack: error.stack,
        });
        res.status(500).json({
            success: false,
            error: "Erro ao gerar exportação.",
        });
    }
};