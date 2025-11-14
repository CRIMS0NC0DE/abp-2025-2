import { useState } from 'react';
import { X, Sheet, FileText, ChevronDown, Download, Loader2, AlertCircle } from 'lucide-react';
import type { DatabaseName, FilterParams } from '../../types/types'; // Ajuste o caminho
import { exportTableData, type ExportOptions } from '../../api/api';
import styles from './ModalExport.module.css'; // ✅ ARQUIVO CSS IMPORTADO

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Falha na exportação:', err);
      setError(err.message || 'Ocorreu um erro desconhecido.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    // Backdrop
    <div
      onClick={handleClose}
      className={styles.modalBackdrop}
    >
      {/* ModalCard */}
      <div
        onClick={handleModalClick}
        className={styles.modalCard}
      >
        {/* Cabeçalho */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Exportar Dados</h2>
          <button
            onClick={handleClose}
            disabled={isExporting}
            className={styles.btnClose}
          >
            <X size={20} />
          </button>
        </div>

        {/* Corpo (Formulário) */}
        <div className={styles.modalBody}>
          {/* 1. Formato do Arquivo */}
          <div>
            <label className={styles.formLabel}>
              Formato
            </label>
            <div className={styles.btnGroup}>
              <button
                onClick={() => setFormat('xlsx')}
                disabled={isExporting}
                className={`${styles.btnGroupItem} ${styles.btnGroupItemLeft} ${
                  format === 'xlsx'
                    ? styles.btnGroupItemActive
                    : styles.btnGroupItemInactive
                }`}
              >
                <Sheet size={16} />
                Excel (.xlsx)
              </button>
              <button
                onClick={() => setFormat('csv')}
                disabled={isExporting}
                className={`${styles.btnGroupItem} ${styles.btnGroupItemRight} ${
                  format === 'csv'
                    ? styles.btnGroupItemActive
                    : styles.btnGroupItemInactive
                }`}
              >
                <FileText size={16} />
                CSV (.csv)
              </button>
            </div>
          </div>

          {/* 2. Opções de CSV (Condicional) */}
          {format === 'csv' && (
            <div className={styles.optionsBox}>
              <h4 className={styles.optionsTitle}>Opções de CSV</h4>
              <div className={styles.grid2Cols}>
                {/* Delimitador */}
                <div>
                  <label htmlFor="delimiter" className={`${styles.formLabel} ${styles.formLabel_mb1}`}>
                    Delimitador
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="delimiter"
                      value={delimiter}
                      onChange={(e) => setDelimiter(e.target.value as ExportDelimiter)}
                      className={styles.selectInput}
                      disabled={isExporting}
                    >
                      <option value=";">Ponto e vírgula (;)</option>
                      <option value=",">Vírgula (,)</option>
                    </select>
                    <div className={styles.selectIcon}>
                      <ChevronDown size={18} />
                    </div>
                  </div>
                  <p className={styles.helperText}>Use (;) para Excel.</p>
                </div>
                {/* Codificação */}
                <div>
                  <label htmlFor="encoding" className={`${styles.formLabel} ${styles.formLabel_mb1}`}>
                    Codificação
                  </label>
                  <div className={styles.selectWrapper}>
                    <select
                      id="encoding"
                      value={encoding}
                      onChange={(e) => setEncoding(e.target.value as ExportEncoding)}
                      className={styles.selectInput}
                      disabled={isExporting}
                    >
                      <option value="utf-8">UTF-8 (Padrão)</option>
                      <option value="iso-8859-1">ISO-8859-1 (Latin1)</option>
                    </select>
                    <div className={styles.selectIcon}>
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Intervalo de Dados */}
          <div>
            <label htmlFor="range" className={`${styles.formLabel} ${styles.formLabel_mb1}`}>
              Intervalo de Dados
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="range"
                value={range}
                onChange={(e) => setRange(e.target.value as ExportRange)}
                className={styles.selectInput}
                disabled={isExporting}
              >
                <option value="page">Página atual ({pageRecords} registros)</option>
                <option value="all">Todos os dados ({totalRecords} registros)</option>
              </select>
              <div className={styles.selectIcon}>
                <ChevronDown size={18} />
              </div>
            </div>
            <p className={styles.helperText}>
              "Todos" aplica os filtros atuais a todo o banco de dados.
            </p>
          </div>

          {/* 4. Incluir Cabeçalho (Checkbox) */}
          <div className={styles.checkboxWrapper}>
            <input
              id="includeHeaders"
              type="checkbox"
              checked={includeHeaders}
              onChange={(e) => setIncludeHeaders(e.target.checked)}
              className={styles.checkboxInput}
              disabled={isExporting}
            />
            <label htmlFor="includeHeaders" className={styles.checkboxLabel}>
              Incluir cabeçalhos (nomes das colunas)
            </label>
          </div>

          {/* Feedback de Erro */}
          {error && (
            <div className={styles.errorBox}>
              <AlertCircle size={18} />
              <span className={styles.errorText}>{error}</span>
            </div>
          )}
        </div>

        {/* Rodapé (Ações) */}
        <div className={styles.modalFooter}>
          <button
            onClick={handleClose}
            disabled={isExporting}
            className={`${styles.btn} ${styles.btnSecondary}`}
          >
            Cancelar
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            {isExporting ? (
              <>
                <Loader2 size={16} className={styles.spinner} />
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
    </div>
  );
}