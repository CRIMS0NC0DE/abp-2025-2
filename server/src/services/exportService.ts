// src/services/exportService.ts
import * as exceljs from 'exceljs';
import * as iconv from 'iconv-lite';
import { logger } from '../configs/logger';

// Tipos do frontend
type ExportFormat = 'csv' | 'xlsx';
type ExportEncoding = 'utf-8' | 'iso-8859-1';
type ExportDelimiter = ',' | ';';

/**
 * Opções para a geração do arquivo de exportação.
 */
export interface ExportFileOptions {
	format: ExportFormat;
	encoding?: ExportEncoding; // Opcional, só para CSV
	delimiter?: ExportDelimiter; // Opcional, só para CSV
	includeHeaders: boolean;
}

/**
 * Serviço para gerar arquivos de exportação (CSV, XLSX) a partir de dados.
 * Este serviço não acessa o banco; ele apenas formata os dados recebidos.
 */
export class ExportService {
	/**
	 * Ponto de entrada principal. Gera um buffer de arquivo (CSV ou XLSX).
	 * @param data Array de objetos JSON. Os dados já devem estar "achatados" (ex: "sitio.nome" deve ser só "sitio").
	 * @param options Opções de formatação do arquivo.
	 * @returns Um Buffer com o conteúdo do arquivo.
	 */
	public static async generateExportFile(
		data: any[],
		options: ExportFileOptions,
	): Promise<Buffer> { // Este 'Buffer' agora usa o tipo global do Node.js
		try {
			if (options.format === 'xlsx') {
				// Gera um Buffer de arquivo XLSX
				return ExportService.generateXLSX(data, options.includeHeaders);
			} else {
				// Gera um Buffer de arquivo CSV
				return ExportService.generateCSV(data, {
					includeHeaders: options.includeHeaders,
					delimiter: options.delimiter || ';', // Padrão ';'
					encoding: options.encoding || 'utf-8', // Padrão 'utf-8'
				});
			}
		} catch (error: any) {
			logger.error('Erro ao gerar arquivo de exportação', {
				message: error.message,
				stack: error.stack,
			});
			throw new Error('Falha ao gerar o arquivo.');
		}
	}

	// --- Geradores Privados ---

	/**
	 * Gera um Buffer XLSX usando exceljs.
	 */
	private static async generateXLSX(
		data: any[],
		includeHeaders: boolean,
	): Promise<Buffer> { // Este 'Buffer' agora usa o tipo global do Node.js
		const workbook = new exceljs.Workbook();
		const worksheet = workbook.addWorksheet('Dados');

		if (data.length === 0) {
			if (includeHeaders) {
				worksheet.addRow(['Nenhum dado encontrado para exportar.']);
			}
			// GERA O BUFFER DO EXCELJS (QUE É UM ARRAYBUFFER)
			const excelBuffer = await workbook.xlsx.writeBuffer();
			// CONVERTE PARA O BUFFER DO NODE.JS
			return Buffer.from(excelBuffer);
		}

		// Pega as chaves do primeiro objeto como cabeçalhos
		const keys = Object.keys(data[0]);

		// 1. Adiciona o Cabeçalho
		if (includeHeaders) {
			const headerRow = worksheet.addRow(keys);
			// Aplica negrito ao cabeçalho
			headerRow.font = { bold: true };
		}

		// 2. Adiciona os Dados
		for (const row of data) {
			// Mapeia os valores na ordem correta das chaves
			const values = keys.map((key) => row[key]);
			worksheet.addRow(values);
		}

		// 3. Ajusta a largura das colunas (opcional, mas melhora a usabilidade)
		worksheet.columns.forEach((column) => {
			let maxLen = 0;
			// Garante que 'column' e 'column.eachCell' existam antes de chamar
			if (column && typeof column.eachCell === 'function') {
				column.eachCell({ includeEmpty: true }, (cell) => {
					const len = cell.value ? String(cell.value).length : 0;
					if (len > maxLen) {
						maxLen = len;
					}
				});
				// Define a largura (mínimo de 10, máximo de 50)
				column.width = Math.min(Math.max(maxLen + 2, 10), 50);
			}
		});

		// 4. Gera o buffer
		// GERA O BUFFER DO EXCELJS (QUE É UM ARRAYBUFFER)
		const excelBuffer = await workbook.xlsx.writeBuffer();
		// *** CORREÇÃO: CONVERTE O ArrayBuffer do exceljs PARA UM Buffer do Node.js ***
		return Buffer.from(excelBuffer);
	}

	/**
	 * Gera um Buffer CSV.
	 */
	private static async generateCSV(
		data: any[],
		options: {
			includeHeaders: boolean;
			delimiter: ExportDelimiter;
			encoding: ExportEncoding;
		},
	): Promise<Buffer> { // Este 'Buffer' agora usa o tipo global do Node.js
		const { delimiter, includeHeaders, encoding } = options;

		if (data.length === 0) {
			if (includeHeaders) {
				return ExportService.encodeBuffer('Nenhum dado encontrado', encoding);
			}
			return ExportService.encodeBuffer('', encoding);
		}

		const keys = Object.keys(data[0]);
		const csvRows: string[] = [];

		// 1. Adiciona o Cabeçalho
		if (includeHeaders) {
			csvRows.push(keys.join(delimiter));
		}

		// 2. Adiciona os Dados
		for (const row of data) {
			const values = keys.map((key) => {
				return ExportService.escapeCsvValue(row[key], delimiter);
			});
			csvRows.push(values.join(delimiter));
		}

		const csvString = csvRows.join('\n');

		// 3. Codifica o Buffer na codificação correta
		return ExportService.encodeBuffer(csvString, encoding);
	}

	/**
	 * Escapa valores para o formato CSV.
	 */
	private static escapeCsvValue(value: any, delimiter: string): string {
		if (value == null) return ''; // Trata null/undefined como string vazia

		let str = String(value);

		// Regex para checar se precisa escapar
		const needsQuotes =
			str.includes(delimiter) || str.includes('"') || str.includes('\n');

		if (needsQuotes) {
			// 1. Escapa aspas duplas internas (ex: " -> "")
			str = str.replace(/"/g, '""');
			// 2. Encapsula o valor em aspas duplas
			str = `"${str}"`;
		}

		return str;
	}

	/**
	 * Converte a string final para um Buffer com a codificação correta.
	 */
	private static encodeBuffer(
		content: string,
		encoding: ExportEncoding,
	): Buffer { // Este 'Buffer' agora usa o tipo global do Node.js
		if (encoding === 'iso-8859-1') {
			// Usa iconv-lite para codificar em Latin1
			return iconv.encode(content, 'ISO-8859-1');
		}
		// 'utf-8' é o padrão do Buffer.from
		// Usa o 'Buffer' global
		return Buffer.from(content, 'utf-8');
	}
}

