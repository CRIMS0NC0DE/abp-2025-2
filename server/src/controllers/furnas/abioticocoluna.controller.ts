// src/controllers/furnas/abioticoColuna.controller.ts
import { Request, Response } from "express";
import { logger } from "../../configs/logger";
// 1. Importa os Serviços (formatação e exportação)
import { DataFormatterService } from "../../services/dataFormatterService";
import { ExportService, ExportFileOptions } from "../../services/exportService";
// 2. Importa o Model (sem mudança)
import { AbioticoColunaModel } from "../../models/abioticoColuna.model";

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

// --- ENDPOINTS ---

/**
 * Endpoint: getAll
 */
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || PAGE_SIZE;

    // 1. Pede os dados paginados ao Model (sem mudança)
    const { data: rawData, total } = await AbioticoColunaModel.findPaginated({
      filters: req.query,
      page,
      limit,
    });

    // 2. Formata os dados "crus" usando o Service
    // ✅ MUDANÇA AQUI: Usa o novo método genérico
    const data = rawData.map(DataFormatterService.formatListRow);

    // 3. Envia a resposta (sem mudança)
    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (error: any) {
    logger.error("Erro ao consultar tbabioticocoluna", {
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
 */
export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const idAbioticoColuna = Number(req.params.idabioticocoluna);

    if (isNaN(idAbioticoColuna)) {
      res.status(400).json({
        success: false,
        error: `ID ${req.params.idabioticocoluna} inválido.`,
      });
      return;
    }

    // 1. Pede o dado ao Model (sem mudança)
    const rawData = await AbioticoColunaModel.findById(idAbioticoColuna);

    // 2. Verifica se foi encontrado (sem mudança)
    if (!rawData) {
      res.status(404).json({
        success: false,
        error: `Registro abiótico em coluna não encontrado.`,
      });
      return;
    }

    // 3. Formata o dado "cru"
    // ✅ MUDANÇA AQUI: Removemos a formatação de detalhe
    const data = rawData; // Retorna os dados crus do model

    // 4. Envia a resposta (sem mudança)
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    logger.error(`Erro ao consultar tbabioticocoluna por ID ${req.params.idabioticocoluna}`, {
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
 */
export const exportData = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Extrai opções do body (sem mudança)
    const { format, range, includeHeaders, delimiter, encoding, filters, page, limit } =
      req.body as ExportFileOptions & {
        range: "page" | "all";
        filters: any;
        page?: number;
        limit?: number;
      };

    // Opções para o ExportService (sem mudança)
    const exportOptions: ExportFileOptions = {
      format,
      includeHeaders,
      delimiter,
      encoding,
    };

    let rawData: any[];

    // 2. Busca os dados no Model com base no 'range' (sem mudança)
    if (range === "page") {
      const { data } = await AbioticoColunaModel.findPaginated({
        filters: filters || {},
        page: page || 1,
        limit: limit || PAGE_SIZE,
      });
      rawData = data;
    } else {
      // range === 'all'
      rawData = await AbioticoColunaModel.findAll({
        filters: filters || {},
      });
    }

    // 3. Formata os dados para "lista"
    // ✅ MUDANÇA AQUI: Usa o novo método genérico
    const formattedData = rawData.map(DataFormatterService.formatListRow);

    // 4. Gera o buffer do arquivo (sem mudança)
    const fileBuffer = await ExportService.generateExportFile(formattedData, exportOptions);

    // 5. Define os headers da resposta (sem mudança)
    const fileName = `export_abiotico_coluna_${new Date().toISOString().slice(0, 10)}.${format}`;

    if (format === "xlsx") {
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      );
    } else {
      res.setHeader("Content-Type", "text/csv; charset=" + (encoding || "utf-8"));
    }
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    // 6. Envia o buffer como resposta (sem mudança)
    res.send(fileBuffer);
  } catch (error: any) {
    logger.error("Erro ao exportar dados de tbabioticocoluna", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      error: "Erro ao gerar exportação.",
    });
  }
};
