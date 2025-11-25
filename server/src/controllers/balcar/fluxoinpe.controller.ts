import { Request, Response } from "express";
import { logger } from "../../configs/logger";
import { DataFormatterService } from "../../services/dataFormatterService";
import { ExportService, ExportFileOptions } from "../../services/exportService";
import { FluxoInpeModel } from "../../models/balcar/fluxoInpe.model";

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

        const { data: rawData, total } = await FluxoInpeModel.findPaginated({
            filters: req.query,
            page,
            limit,
        });

        const data = rawData.map(DataFormatterService.formatListRow);

        res.status(200).json({
            success: true,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data,
        });
    } catch (error: any) {
        logger.error("Erro ao consultar tbfluxoinpe", {
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
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(400).json({ success: false, error: "ID inválido" });
            return;
        }

        const rawData = await FluxoInpeModel.findById(id);

        if (!rawData) {
            res.status(404).json({ success: false, error: "Registro não encontrado" });
            return;
        }

        res.status(200).json({
            success: true,
            data: rawData,
        });
    } catch (error: any) {
        logger.error("Erro ao consultar tbfluxoinpe por idfluxoinpe", {
            message: error.message,
            stack: error.stack,
        });
        res.status(500).json({
            success: false,
            error: "Erro ao realizar a operação.",
        });
    }
};

/**
 * Endpoint: exportData
 * Exporta dados para CSV ou XLSX.
 */
export const exportData = async (req: Request, res: Response): Promise<void> => {
    try {
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

        if (range === "page") {
            const { data } = await FluxoInpeModel.findPaginated({
                filters: filters || {},
                page: page || 1,
                limit: limit || PAGE_SIZE,
            });
            rawData = data;
        } else {
            rawData = await FluxoInpeModel.findAll({
                filters: filters || {},
            });
        }

        const formattedData = rawData.map(DataFormatterService.formatListRow);
        const fileBuffer = await ExportService.generateExportFile(formattedData, exportOptions);
        const fileName = `export_fluxo_inpe_${new Date().toISOString().slice(0, 10)}.${format}`;

        if (format === "xlsx") {
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            );
        } else {
            res.setHeader("Content-Type", "text/csv; charset=" + (encoding || "utf-8"));
        }
        res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
        res.send(fileBuffer);

    } catch (error: any) {
        logger.error("Erro ao exportar dados de tbfluxoinpe", {
            message: error.message,
            stack: error.stack,
        });
        res.status(500).json({
            success: false,
            error: "Erro ao gerar exportação.",
        });
    }
};

/**
 * Endpoint: getAnalytics
 * Retorna estatísticas agrupadas para gráficos.
 * Suporta Drill-down (Reservatório -> Sítios).
 */
export const getAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
        const { metric, groupBy, filterReservatorioId, campanhaId } = req.query;

        // Validações
        if (!metric) {
            res.status(400).json({ success: false, error: "Parâmetro 'metric' é obrigatório." });
            return;
        }

        if (groupBy !== 'reservatorio' && groupBy !== 'sitio') {
            res.status(400).json({ success: false, error: "Parâmetro 'groupBy' deve ser 'reservatorio' ou 'sitio'." });
            return;
        }

        // Chama o Model
        const data = await FluxoInpeModel.getAnalyticsData({
            metric: metric as string,
            groupBy: groupBy as 'reservatorio' | 'sitio',
            filterReservatorioId: filterReservatorioId ? Number(filterReservatorioId) : undefined,
            campanhaId: campanhaId ? Number(campanhaId) : undefined
        });

        res.status(200).json({
            success: true,
            groupBy,
            metric,
            totalGroups: data.length,
            data
        });

    } catch (error: any) {
        logger.error("Erro ao gerar analytics do Balcar", {
            message: error.message,
            stack: error.stack,
            query: req.query
        });

        // Tratamento específico para erro de métrica inválida (lançado pelo Model)
        if (error.message && error.message.includes("Métrica inválida")) {
            res.status(400).json({ success: false, error: error.message });
            return;
        }

        res.status(500).json({
            success: false,
            error: "Erro ao processar dados analíticos.",
        });
    }
};