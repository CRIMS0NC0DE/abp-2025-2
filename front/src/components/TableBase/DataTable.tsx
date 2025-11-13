// src/components/commons/DataTable.tsx 
import { Loader2, AlertCircle, Table2 } from 'lucide-react';
import type { 
  DataType, 
  PaginacaoState, 
  DatabaseName 
} from '../../types/types'; // Ajuste o caminho

// Importe o arquivo CSS
import './styles.css';

interface DataTableProps {
  database: DatabaseName;
  tableName: string;
  dados: DataType;
  colunas: string[];
  loading: boolean;
  error: string | null;
  paginacao: PaginacaoState;
  onPageChange: (newPage: number) => void;
}

export default function DataTable({
  tableName,
  dados,
  colunas,
  loading,
  error,
  paginacao,
  onPageChange
}: DataTableProps) {

  // --- Estados de Feedback (Estilizados) ---

  if (loading) {
    return (
      <div className="data-table-padding">
        <div className="feedback-box loading-box">
          <Loader2 className="loading-icon" size={40} />
          <p className="feedback-text-title loading-text">Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="data-table-padding">
        <div className="feedback-box error-box">
          <AlertCircle size={40} />
          <p className="feedback-text-title error-text-title">Erro ao carregar dados</p>
          <p className="feedback-text-details">{error}</p>
        </div>
      </div>
    );
  }

  if (!dados || dados.length === 0) {
    return (
      <div className="data-table-padding">
        <div className="feedback-box empty-box">
          <Table2 size={40} />
          <p className="feedback-text-title empty-text-title">Nenhum dado encontrado</p>
          <p className="feedback-text-details">Nenhum registro corresponde aos filtros para a tabela "{tableName}".</p>
        </div>
      </div>
    );
  }

  // --- Renderização da Tabela (Estilizada) ---
  return (
    <div className="data-table-padding">
      {/* 1. Wrapper com cantos arredondados e overflow hidden */}
      <div className="table-container-wrapper">
        <div className="table-overflow-x">
          <table className="data-table">
            
            {/* 2. Cabeçalho azul-mar com texto branco */}
            <thead className="table-header">
              <tr>
                {colunas.map((coluna) => (
                  <th
                    key={coluna}
                    scope="col"
                    className="table-header-cell"
                  >
                    {coluna.replace(/_/g, ' ')}
                  </th>
                ))}
              </tr>
            </thead>

            {/* 3. Corpo com linhas "zebra" (cor sim, cor não) */}
            <tbody className="table-body">
              {dados.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className="table-row"
                >
                  {colunas.map((coluna) => (
                    <td 
                      key={`${rowIndex}-${coluna}`} 
                      className="table-cell"
                    >
                      {String(row[coluna] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Paginação com cantos arredondados */}
      <Pagination 
        paginacao={paginacao}
        onPageChange={onPageChange}
      />
    </div>
  );
}

// --- Componente de Paginação (Estilizado) ---

interface PaginationProps {
  paginacao: PaginacaoState;
  onPageChange: (newPage: number) => void;
}

function Pagination({ paginacao, onPageChange }: PaginationProps) {
  const { page, totalPages, total } = paginacao;

  const handlePrevious = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <div className="pagination-info">
        Total de <span className="pagination-info-count">{total}</span> registros
      </div>
      <div className="pagination-controls">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className="pagination-button"
        >
          Anterior
        </button>
        <span className="pagination-page-count">
          Página <span className="pagination-page-count-number">{page}</span> de <span className="pagination-page-count-number">{totalPages}</span>
        </span>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="pagination-button"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}