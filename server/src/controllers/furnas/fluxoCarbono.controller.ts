import { Request, Response } from "express";
import { logger } from "../../configs/logger";
// 1. Importa os Serviços (formatação e exportação)
import { DataFormatterService } from "../../services/dataFormatterService";
import { ExportService, ExportFileOptions } from "../../services/exportService";
// 2. Importa o novo Model
import { FluxoCarbonoModel } from "../../models/furnas/fluxoCarbono.model";

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
    // ✅ MUDANÇA AQUI: Passa req.query para o model aplicar os filtros
    const { data: rawData, total } = await FluxoCarbonoModel.findPaginated({
      filters: req.query,
      page,
      limit,
    });

    // 2. Formata os dados "crus" usando o Service global
    // ✅ MUDANÇA AQUI: Usa o DataFormatterService
    const data = rawData.map(DataFormatterService.formatListRow);

    // 3. Envia a resposta (sem mudança na estrutura)
    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data,
    });
  } catch (error: any) {
    logger.error(`Erro ao buscar dados de fluxo de carbono:`, {
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
 * Busca um registro único por ID.
 */
export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const idFCarbono = Number(req.params.idFluxoCarbono);

    if (isNaN(idFCarbono)) {
      res.status(400).json({
        success: false,
        error: `ID ${req.params.idFluxoCarbono} inválido.`,
      });
      return;
    }

    // 1. Pede o dado ao Model
    const rawData = await FluxoCarbonoModel.findById(idFCarbono);

    // 2. Verifica se foi encontrado
    if (!rawData) {
      res.status(404).json({
        success: false,
        error: "Registro de dados de fluxo de carbono não encontrado.",
      });
      return;
    }

    // 3. Formata o dado "cru"
    // ✅ MUDANÇA AQUI: Conforme o exemplo, o getById retorna os dados crus do model
    const data = rawData; 

    // 4. Envia a resposta
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    logger.error(
      `Erro ao buscar registro por ID ${req.params.idFluxoCarbono} na tabela de fluxo de carbono.`,
      { message: error.message, stack: error.stack },
    );
    res.status(500).json({
      success: false,
      error: "Erro ao realizar operação.",
    });
  }
};

/**
 * Endpoint: exportData
 * Exporta dados em CSV ou XLSX com base nos filtros.
 * ✅ NOVO ENDPOINT ADICIONADO
 */
export const exportData = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Extrai opções do body (igual ao exemplo)
    const { format, range, includeHeaders, delimiter, encoding, filters, page, limit } =
      req.body as ExportFileOptions & {
        range: 'page' | 'all';
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
    // ✅ MUDANÇA AQUI: Usa FluxoCarbonoModel
    if (range === 'page') {
      const { data } = await FluxoCarbonoModel.findPaginated({
        filters: filters || {},
        page: page || 1,
        limit: limit || PAGE_SIZE,
      });
      rawData = data;
    } else {
      // range === 'all'
      rawData = await FluxoCarbonoModel.findAll({
        filters: filters || {},
      });
    }

    // 3. Formata os dados para "lista"
    // ✅ MUDANÇA AQUI: Usa o DataFormatterService
    const formattedData = rawData.map(DataFormatterService.formatListRow);

    // 4. Gera o buffer do arquivo (igual ao exemplo)
    const fileBuffer = await ExportService.generateExportFile(formattedData, exportOptions);

    // 5. Define os headers da resposta
    // ✅ MUDANÇA AQUI: Altera o nome do arquivo
    const fileName = `export_fluxo_carbono_${new Date().toISOString().slice(0, 10)}.${format}`;

    if (format === 'xlsx') {
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
    } else {
      res.setHeader('Content-Type', 'text/csv; charset=' + (encoding || 'utf-8'));
    }
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    // 6. Envia o buffer como resposta (igual ao exemplo)
    res.send(fileBuffer);
  } catch (error: any) {
    logger.error('Erro ao exportar dados de tbfluxocarbono', {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      error: 'Erro ao gerar exportação.',
    });
  }
};