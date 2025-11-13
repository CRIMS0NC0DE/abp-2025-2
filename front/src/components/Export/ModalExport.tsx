// src/components/Export/ModalExport.tsx
import { useState } from 'react';
import { X, Sheet, FileText, ChevronDown, Download, Loader2, AlertCircle } from 'lucide-react';
import type { DatabaseName, FilterParams } from '../../types/types'; // Ajuste o caminho
import { exportTableData, type ExportOptions } from '../../api/api'; 

// Tipos (sem mudança)
type ExportFormat = 'csv' | 'xlsx';
type ExportEncoding = 'utf-8' | 'iso-8859-1';
type ExportDelimiter = ',' | ';';
type ExportRange = 'page' | 'all';

interface ModalExportProps {
  isOpen: boolean;
  onClose: () => void;
  database: DatabaseName;
  tableName: string;
  currentFilters: FilterParams;
  totalRecords: number; 
  pageRecords: number;
  currentPage?: number;
  currentLimit?: number;
}

export function ModalExport({
  isOpen,
  onClose,
  database,
  tableName,
  currentFilters,
  totalRecords,
  pageRecords,
  currentPage = 1, 
  currentLimit = 10,
}: ModalExportProps) {
  const [format, setFormat] = useState<ExportFormat>('csv');
  const [encoding, setEncoding] = useState<ExportEncoding>('utf-8');
  const [delimiter, setDelimiter] = useState<ExportDelimiter>(';');
  const [range, setRange] = useState<ExportRange>('all');
  const [includeHeaders, setIncludeHeaders] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    if (isExporting) return;
    onClose();
    setTimeout(() => setError(null), 300); 
  };

  const handleExport = async () => {
    setIsExporting(true);
    setError(null);
    
    const exportOptions: ExportOptions = {
      format,
      range,
      includeHeaders,
      filters: currentFilters,
      ...(format === 'csv' && {
        encoding,
        delimiter,
      }),
      ...(range === 'page' && {
        page: currentPage,
        limit: currentLimit,
      }),
    };

    console.log('Iniciando exportação com:', { database, tableName, ...exportOptions });

    try {
      await exportTableData(database, tableName, exportOptions);
      console.log('Exportação concluída e download iniciado!');
      handleClose();

    } catch (err: any) {
      console.error('Falha na exportação:', err);
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsExporting(false);
    }
  };

  // ✅ CSS Helper: Classes base para os inputs <select>
  const selectWrapperClass = "relative";
  const selectIconClass = "absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500";
  const selectInputClass = `
    w-full block appearance-none rounded-lg border border-gray-300 bg-white
    px-3 py-2 pr-10 text-sm text-gray-900
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-70
  `;

  return (
    // Backdrop
    <div
      onClick={handleClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4 transition-opacity duration-300"
    >
      {/* Modal Card: 'max-w-lg' é o que centraliza e limita o tamanho */}
      <div
        onClick={handleModalClick}
        className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4"
      >
        {/* Cabeçalho */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Exportar Dados</h2>
          <button
            onClick={handleClose}
            disabled={isExporting}
            className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Corpo (Formulário) */}
        <div className="p-6 space-y-6">
          {/* 1. Formato do Arquivo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Formato
            </label>
            <div className="flex w-full rounded-md border border-gray-300">
              <button
                onClick={() => setFormat('xlsx')}
                disabled={isExporting}
            	  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-l-md transition-colors ${
                  format === 'xlsx'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } disabled:opacity-50`}
              >
                <Sheet size={16} />
                Excel (.xlsx)
              </button>
              <button
                onClick={() => setFormat('csv')}
                disabled={isExporting}
            	  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-r-md transition-colors border-l border-gray-300 ${
            	    format === 'csv'
              	    ? 'bg-blue-600 text-white'
              	    : 'bg-white text-gray-700 hover:bg-gray-50'
            	  } disabled:opacity-50`}
          	  >
            	  <FileText size={16} />
            	  CSV (.csv)
          	  </button>
        	  </div>
      	  </div>

      	  {/* 2. Opções de CSV (Condicional) */}
      	  {format === 'csv' && (
      	    <div className="p-4 bg-gray-50 rounded-md border border-gray-200 space-y-4">
      	      <h4 className="text-sm font-medium text-gray-600">Opções de CSV</h4>
      	      <div className="grid grid-cols-2 gap-4">
      	        {/* Delimitador */}
      	        <div>
      	          <label htmlFor="delimiter" className="block text-sm font-medium text-gray-700 mb-1">
      	            Delimitador
      	          </label>
                  {/* ✅ Início: Select em Tailwind */}
      	          <div className={selectWrapperClass}>
      	            <select
      	              id="delimiter"
      	              value={delimiter}
      	              onChange={(e) => setDelimiter(e.target.value as ExportDelimiter)}
      	              className={selectInputClass}
                      disabled={isExporting}
      	            >
      	              <option value=";">Ponto e vírgula (;)</option>
      	              <option value=",">Vírgula (,)</option>
      	            </select>
      	            <div className={selectIconClass}>
      	              <ChevronDown size={18} />
      	            </div>
      	          </div>
                  {/* ✅ Fim: Select em Tailwind */}
      	          <p className="text-xs text-gray-500 mt-1">Use (;) para Excel.</p>
      	        </div>
      	        {/* Codificação */}
  	            <div>
    	              <label htmlFor="encoding" className="block text-sm font-medium text-gray-700 mb-1">
    	                Codificação
    	              </label>
    	              <div className={selectWrapperClass}>
    	                <select
    	                  id="encoding"
    	                  value={encoding}
    	                  onChange={(e) => setEncoding(e.target.value as ExportEncoding)}
    	                  className={selectInputClass}
                          disabled={isExporting}
    	                >
    	                  <option value="utf-8">UTF-8 (Padrão)</option>
  	                  <option value="iso-8859-1">ISO-8859-1 (Latin1)</option>
  	                </select>
  	                <div className={selectIconClass}>
    	                  <ChevronDown size={18} />
    	                </div>
    	              </div>
    	            </div>
    	          </div>
    	        </div>
    	      )}

    	      {/* 3. Intervalo de Dados */}
    	      <div>
    	        <label htmlFor="range" className="block text-sm font-medium text-gray-700 mb-1">
    	          Intervalo de Dados
    	        </label>
    	        <div className={selectWrapperClass}>
    	          <select
    	            id="range"
    	            value={range}
    	            onChange={(e) => setRange(e.target.value as ExportRange)}
    	            className={selectInputClass}
                  disabled={isExporting}
    	          >
    	            <option value="page">Página atual ({pageRecords} registros)</option>
    	            <option value="all">Todos os dados ({totalRecords} registros)</option>
    	          </select>
    	          <div className={selectIconClass}>
    	            <ChevronDown size={18} />
    	          </div>
    	        </div>
    	        <p className="text-xs text-gray-500 mt-1">
    	          "Todos" aplica os filtros atuais a todo o banco de dados.
    	        </p>
    	      </div>

    	      {/* 4. Incluir Cabeçalho (Checkbox) */}
    	      <div className="flex items-center">
    	        <input
    	          id="includeHeaders"
    	          type="checkbox"
    	          checked={includeHeaders}
  	          onChange={(e) => setIncludeHeaders(e.target.checked)}
    	          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                disabled={isExporting}
    	        />
    	        <label htmlFor="includeHeaders" className="ml-2 block text-sm text-gray-900">
    	          Incluir cabeçalhos (nomes das colunas)
    	        </label>
    	      </div>

          {/* Feedback de Erro */}
          {error && (
            <div className="flex items-center gap-2 p-3 text-sm text-red-800 bg-red-100 border border-red-300 rounded-md">
              <AlertCircle size={18} className="flex-shrink-0" />
              <span className="truncate">{error}</span>
            </div>
          )}
  	    </div>

  	    {/* Rodapé (Ações) */}
  	    <div className="flex justify-end gap-3 p-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
  	      <button
  	        onClick={handleClose}
  	        disabled={isExporting}
  	        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:opacity-50"
  	      >
  	        Cancelar
  	      </button>
  	      <button
  	        onClick={handleExport}
  	        disabled={isExporting}
  	        className="relative flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
  	      >
  	        {isExporting ? (
  	          <>
  	            <Loader2 size={16} className="animate-spin" />
  	            Exportando...
  	          </>
  	        ) : (
  	          <>
  	            <Download size={16} />
  	            Exportar
  	          </>
  	        )}
  	      </button>
  	    </div>
  	  </div>

      {/* ❌ REMOVIDO: A tag <style> e o SelectWrapper não são mais necessários ❌ */}
  	</div>
  );
}