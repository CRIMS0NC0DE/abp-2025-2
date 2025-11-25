import { Request, Response } from "express";
import { logger } from "../../configs/logger";
// 1. Importa os Serviços (formatação e exportação)
import { DataFormatterService } from "../../services/dataFormatterService";
import { ExportService, ExportFileOptions } from "../../services/exportService";
// 2. Importa o Model
import { CampoPorTabelaModel } from "../../models/furnas/campoPorTabela.model";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

// --- ENDPOINTS ---

/**
 * Endpoint: getAll
 */
export const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || PAGE_SIZE;

        // 1. Pede os dados paginados ao Model (agora com filtros)
        const { data: rawData, total } = await CampoPorTabelaModel.findPaginated({
            filters: req.query, // Passa todos os query params como filtros
            page,
            limit,
        });

        // 2. Formata os dados "crus" usando o Service
        //    (Substitui o mapRowToCampoPorTabela)
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
        logger.error("Erro ao buscar campos por tabela:", {
            message: error.message,
            stack: error.stack,
        });
        res.status(500).json({ success: false, error: "Erro ao realizar operação." });
    }
};

/**
 * Endpoint: getById
 */
export const getById = async (req: Request, res: Response): Promise<void> => {
    try {
        const idCampoPorTabela = Number(req.params.idCampoPorTabela);
        
        if (isNaN(idCampoPorTabela)) {
            res.status(400).json({
                success: false,
                error: `ID ${req.params.idCampoPorTabela} inválido.`,
            });
            return;
        }

        // 1. Pede o dado ao Model
        const rawData = await CampoPorTabelaModel.findById(idCampoPorTabela);

        // 2. Verifica se foi encontrado
        if (!rawData) {
            res.status(404).json({
                success: false,
                error: "Registro de campo por tabela não encontrado.",
            });
            return;
        }

        // 3. Formata o dado "cru" (seguindo o padrão, não formatamos detalhes)
        const data = rawData; // Retorna os dados crus do model

        // 4. Envia a resposta
        res.status(200).json({ success: true, data });
    } catch (error: any) {
        logger.error(
            `Erro ao buscar registro por ID na tabela campoportabela: ${req.params.idCampoPorTabela}`,
            {
                message: error.message,
                stack: error.stack,
            },
        );
        res.status(500).json({ success: false, error: "Erro ao realizar operação." });
    }
};

/**
 * Endpoint: exportData (NOVO)
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

        const exportOptions: ExportFileOptions = {
            format,
            includeHeaders,
            delimiter,
            encoding,
        };

        let rawData: any[];

        // 2. Busca os dados no Model com base no 'range'
        if (range === "page") {
            const { data } = await CampoPorTabelaModel.findPaginated({
                filters: filters || {},
                page: page || 1,
                limit: limit || PAGE_SIZE,
            });
            rawData = data;
        } else {
            // range === 'all'
            rawData = await CampoPorTabelaModel.findAll({
                filters: filters || {},
            });
        }

        // 3. Formata os dados para "lista"
        const formattedData = rawData.map(DataFormatterService.formatListRow);

        // 4. Gera o buffer do arquivo
        const fileBuffer = await ExportService.generateExportFile(formattedData, exportOptions);

        // 5. Define os headers da resposta
        const fileName = `export_campo_por_tabela_${new Date().toISOString().slice(0, 10)}.${format}`;

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
        logger.error("Erro ao exportar dados de tbcampoportabela", {
            message: error.message,
            stack: error.stack,
        });
        res.status(500).json({
            success: false,
            error: "Erro ao gerar exportação.",
        });
    }
};