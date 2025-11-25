//src/controllers/furnas/bioticoColuna.controller.ts
import { Request, Response } from 'express';
import { logger } from '../../configs/logger';
// 1. Importa os Serviços (formatação e exportação)
import { DataFormatterService } from '../../services/dataFormatterService';
import { ExportService, ExportFileOptions } from '../../services/exportService';
// 2. Importa o NOVO Model
import { BioticoColunaModel } from '../../models/furnas/bioticoColuna.model';

const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

// --- ENDPOINTS ---

/**
 * Endpoint: getAll
 * Retorna uma lista paginada de registros com filtros.
 */
export const getAll = async (req: Request, res: Response): Promise<void> => {
  	try {
  	  const page = parseInt(req.query.page as string) || 1;
  	  const limit = parseInt(req.query.limit as string) || PAGE_SIZE;

  	  // 1. Pede os dados paginados ao Model (passando os filtros)
  	  const { data: rawData, total } =
  	    await BioticoColunaModel.findPaginated({
  	      filters: req.query, // Filtros agora são aplicados
  	      page,
  	      limit,
  	    });

  	  // 2. Formata os dados "crus" usando o Service (formato de lista genérico)
  	  const data = rawData.map(DataFormatterService.formatListRow);

  	  // 3. Envia a resposta (agora com contagem correta)
  	  res.status(200).json({
  	    success: true,
  	    page,
  	    limit,
  	    total, // Total agora respeita os filtros
  	    totalPages: Math.ceil(total / limit),
  	    data,
  	  });
  	} catch (error: any) {
  	  logger.error('Erro ao consultar tbbioticocoluna', {
  	    message: error.message,
  	    stack: error.stack,
  	  });
  	  res.status(500).json({
  	    success: false,
  	    error: 'Erro ao realizar operação.',
  	  });
  	}
};

/**
 * Endpoint: getById
 * Retorna um registro único com dados aninhados.
 */
export const getById = async (req: Request, res: Response): Promise<void> => {
  	try {
  	  const id = Number(req.params.id); // Pega 'id' dos params

  	  if (isNaN(id)) {
  	    res.status(400).json({
  	      success: false,
  	      error: `ID ${req.params.id} inválido.`,
  	    });
  	    return;
  	  }

  	  // 1. Pede o dado ao Model
  	  const rawData = await BioticoColunaModel.findById(id);

  	  // 2. Verifica se foi encontrado
  	  if (!rawData) {
  	    res.status(404).json({
  	      success: false,
  	      error: `Registro não encontrado.`, // Mensagem genérica
  	    });
  	    return;
  	  }

  	  // 3. Envia a resposta (sem formatação, como solicitado)
  	  res.status(200).json({
  	    success: true,
  	    data: rawData, // Retorna os dados crus completos do model
  	  });
  	} catch (error: any) {
  	  logger.error(
  	    `Erro ao consultar tbbioticocoluna por ID ${req.params.id}`,
  	    {
  	      message: error.message,
  	      stack: error.stack,
  	    },
  	  );
  	  res.status(500).json({
  	    success: false,
  	    error: 'Erro ao realizar operação.',
  	  });
  	}
};

/**
 * Endpoint: exportData (ADICIONADO)
 * Gera e envia um arquivo (CSV ou XLSX) com base nos filtros e opções.
 */
export const exportData = async (req: Request, res: Response): Promise<void> => {
  	try {
  	  // 1. Extrai opções do body
  	  const {
  	    format,
  	    range,
  	    includeHeaders,
  	    delimiter,
  	    encoding,
  	    filters, 
  	    page, 
  	    limit,
  	  } = req.body as ExportFileOptions & {
  	    range: 'page' | 'all';
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
  	  if (range === 'page') {
  	    const { data } = await BioticoColunaModel.findPaginated({
  	      filters: filters || {},
  	      page: page || 1,
  	      limit: limit || PAGE_SIZE,
  	    });
  	    rawData = data;
  	  } else {
  	    // range === 'all'
  	    rawData = await BioticoColunaModel.findAll({
  	      filters: filters || {},
  	    });
  	  }

  	  // 3. Formata os dados para "lista" (formato genérico)
  	  const formattedData = rawData.map(
  	    DataFormatterService.formatListRow,
  	  );

  	  // 4. Gera o buffer do arquivo
  	  const fileBuffer = await ExportService.generateExportFile(
  	    formattedData,
  	    exportOptions,
  	  );

  	  // 5. Define os headers da resposta
  	  const fileName = `export_biotico_coluna_${new Date()
  	    .toISOString()
  	    .slice(0, 10)}.${format}`;

  	  if (format === 'xlsx') {
  	    res.setHeader(
  	      'Content-Type',
  	      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  	    );
  	  } else {
  	    res.setHeader(
  	      'Content-Type',
  	      'text/csv; charset=' + (encoding || 'utf-8'),
  	    );
  	  }
  	    res.setHeader(
  	    'Content-Disposition',
  	    `attachment; filename="${fileName}"`,
  	  );

  	  // 6. Envia o buffer como resposta
  	  res.send(fileBuffer);
  	} catch (error: any) {
  	  logger.error('Erro ao exportar dados de tbbioticocoluna', {
  	    message: error.message,
  	    stack: error.stack,
  	  });
  	  res.status(500).json({
  	    success: false,
  	    error: 'Erro ao gerar exportação.',
  	  });
  	}
};