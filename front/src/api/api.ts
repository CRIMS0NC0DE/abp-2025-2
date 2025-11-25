// src/api/api.t
// 1. Importar os tipos centralizados (ApiResponse, DatabaseName, FilterParams)
import type { ApiResponse, DatabaseName, FilterParams } from '../types/types'; // Verifique o caminho dos seus tipos

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Busca dados paginados de uma tabela específica em um banco de dados.
 * @param database O nome do banco de dados ('furnas', 'balcar', ou 'sima').
 * @param tableName O nome da tabela para consultar.
 * @param page O número da página.
 * @param limit A quantidade de itens por página.
 * @param filters Um objeto com os parâmetros de filtro.
 * @returns Uma promessa que resolve com os dados da API.
 */
export const fetchTableData = async (
  database: DatabaseName, // Agora usa o tipo importado
  tableName: string,
  page: number,
  limit: number = 10,
  filters: FilterParams = {} // Agora usa o tipo importado
): Promise<ApiResponse> => { // Agora usa o tipo importado
  
  // A URL agora é construída dinamicamente com o nome do banco
  const baseUrl = `${API_BASE_URL}/api/${database}/${tableName}/all`;

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  const url = `${baseUrl}?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const resultado = await response.json();
  return resultado as ApiResponse;
};


/**
 * Interface para as opções enviadas ao endpoint de exportação do backend.
 * (Corresponde ao req.body esperado pelo controller 'exportData')
 */
export interface ExportOptions {
  format: 'csv' | 'xlsx';
  range: 'page' | 'all';
  includeHeaders: boolean;
  filters: FilterParams;
  // Opções de CSV
  delimiter?: ',' | ';';
  encoding?: 'utf-8' | 'iso-8859-1';
  // Opções de paginação (para range='page')
  page?: number;
  limit?: number;
}

/**
 * Helper para extrair o nome do arquivo do header 'Content-Disposition'.
 * O backend envia: "attachment; filename="export_xyz.csv""
 */
function getFileNameFromHeader(header: string | null): string {
  if (header && header.includes('filename=')) {
    const parts = header.split('filename=');
    // Pega o valor entre aspas
    const fileName = parts[1].split('"')[1]; 
    if (fileName) {
      return fileName;
    }
  }
  return 'export.bin'; // Fallback
}

/**
 * Helper para acionar o download do arquivo no navegador.
 */
function downloadFileFromBlob(blob: Blob, filename: string) {
  // Cria um link temporário
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);

  // Aciona o download
  document.body.appendChild(link);
  link.click();

  // Limpa
  link.parentNode?.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Chama o endpoint de exportação da API e aciona o download.
 * @param database O nome do banco ('furnas', 'balcar', etc.)
 * @param tableName O nome da tabela (ex: 'abiotico-coluna')
 * @param options O objeto de configuração da exportação (body da requisição)
 */
export const exportTableData = async (
  database: DatabaseName,
  tableName: string,
  options: ExportOptions,
): Promise<void> => {
  // O endpoint de exportação (ex: /api/furnas/abiotico-coluna/export)
  const url = `${API_BASE_URL}/api/${database}/${tableName}/export`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      // Tenta ler o erro como JSON (enviado pelo res.status(500).json(...) do backend)
      try {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ${response.status} ao exportar`);
      } catch (e) {
        // Se a resposta de erro não for JSON
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
    }

    // Pega o arquivo (blob) e o nome do arquivo (do header)
    const blob = await response.blob();
    const filename = getFileNameFromHeader(response.headers.get('Content-Disposition'));

    // Aciona o download
    downloadFileFromBlob(blob, filename);

  } catch (error: any) {
    console.error('Falha na API de exportação:', error);
    // Lança o erro para o ModalExport poder tratá-lo
    throw new Error(error.message || 'Falha ao conectar com a API.');
  }
};
