// src/components/TableBase/FilterSidebar.tsx
import React, { useState, type FormEvent } from 'react';
import { 
  Plus, 
  Trash, 
  Search, 
  Calendar, 
  Hash, 
  Type as IconType, 
  Clock,
  BarChart3, 
  Map,      
  Download  
} from 'lucide-react';
import type { ColumnInfo, ColumnType } from '../../types/types'; 
import './FilterMenu.css';

// === Interfaces Locais ===
interface FilterRow {
  id: number;
  column: string;
  type: ColumnType | 'unknown';
  value: string;
  valueEnd?: string;
}

interface TabelaDisponivel {
  label: string;
  value: string;
}

interface FilterSidebarProps {
  tabelas: TabelaDisponivel[];
  tabelaAtiva: string | null;
  colunasDisponiveis: ColumnInfo[];
  onSelectTabela: (value: string) => void;
  onApplyFilters: (filters: Record<string, any>) => void;
  
  // Novos Handlers Opcionais
  onOpenGraph?: () => void;
  onOpenMap?: () => void;
  onExport?: () => void;

  // === NOVO: Props para identidade visual do projeto ===
  logoSrc?: string;
  projectTitle?: string;
}

// === Gerador de ID Único ===
let filterIdCounter = 0;
const getNextId = () => filterIdCounter++;

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  tabelas, 
  tabelaAtiva, 
  colunasDisponiveis,
  onSelectTabela,
  onApplyFilters,
  onOpenGraph,
  onOpenMap,
  onExport,
  logoSrc,       // Recebe o logo
  projectTitle   // Recebe o nome do projeto
}) => {
  
  // === Estado dos Filtros Dinâmicos ===
  const [filterRows, setFilterRows] = useState<FilterRow[]>([]);

  const addFilterRow = () => {
    setFilterRows([
      ...filterRows,
      { id: getNextId(), column: "", type: "unknown", value: "", valueEnd: "" },
    ]);
  };

  const removeFilterRow = (id: number) => {
    setFilterRows(filterRows.filter((row) => row.id !== id));
  };

  const handleColumnChange = (id: number, selectedColumn: string) => {
    const colInfo = colunasDisponiveis.find((c) => c.name === selectedColumn);
    const newType = colInfo?.type || "unknown";
    
    setFilterRows((currentRows) =>
      currentRows.map((row) =>
        row.id === id
          ? { ...row, column: selectedColumn, type: newType, value: "", valueEnd: "" }
          : row
      )
    );
  };

  const handleValueChange = (
    id: number,
    field: "value" | "valueEnd",
    newValue: string
  ) => {
    setFilterRows((currentRows) =>
      currentRows.map((row) =>
        row.id === id ? { ...row, [field]: newValue } : row
      )
    );
  };

  // --- Função de Aplicar ---
  const handleApplyFilters = (e: FormEvent) => {
    e.preventDefault();
    const formattedFilters = filterRows.reduce((acc: Record<string, any>, row) => {
      if (!row.column || row.type === "unknown") return acc;
      
      if (row.type === "string") {
        if (row.value) acc[row.column] = row.value;
      } else if (
        row.type === "number" ||
        row.type === "date" ||
        row.type === "time"
      ) {
        if (row.value) acc[`${row.column}_gte`] = row.value;
        if (row.valueEnd) acc[`${row.column}_lte`] = row.valueEnd;
      }
      return acc;
    }, {});

    console.log('Filtros Sidebar Aplicados:', formattedFilters);
    onApplyFilters(formattedFilters);
  };

  // --- Helper para Renderizar Input com Ícone ---
  const renderIconInput = (
    icon: React.ReactNode, 
    value: string, 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, 
    placeholder: string,
    type: string = "text"
  ) => (
    <div className="input-with-icon-wrapper">
      <div className="input-icon-overlay">
        {icon}
      </div>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder}
        className="input-with-padding"
      />
    </div>
  );

  // --- Renderização dos Inputs ---
  const renderInputs = (row: FilterRow) => {
    const handleChange = (field: "value" | "valueEnd") => (e: React.ChangeEvent<HTMLInputElement>) => 
      handleValueChange(row.id, field, e.target.value);

    switch (row.type) {
      case "string":
        return (
           <div className="filter-inputs-stack">
              {renderIconInput(<IconType size={14} />, row.value, handleChange('value'), 'Texto')}
           </div>
        );
      case "number":
        return (
          <div className="filter-inputs-stack">
            {renderIconInput(<Hash size={14} />, row.value, handleChange('value'), 'Mínimo', 'number')}
            {renderIconInput(<Hash size={14} />, row.valueEnd || '', handleChange('valueEnd'), 'Máximo', 'number')}
          </div>
        );
      case "date":
        return (
          <div className="filter-inputs-stack">
            <label style={{fontSize: '0.8rem', color: '#ccc', marginLeft: '2px'}}>De:</label>
            {renderIconInput(<Calendar size={14} />, row.value, handleChange('value'), '', 'date')}
            <label style={{fontSize: '0.8rem', color: '#ccc', marginLeft: '2px'}}>Até:</label>
            {renderIconInput(<Calendar size={14} />, row.valueEnd || '', handleChange('valueEnd'), '', 'date')}
          </div>
        );
      case "time":
        return (
          <div className="filter-inputs-stack">
            {renderIconInput(<Clock size={14} />, row.value, handleChange('value'), 'Início', 'time')}
            {renderIconInput(<Clock size={14} />, row.valueEnd || '', handleChange('valueEnd'), 'Fim', 'time')}
          </div>
        );
      default:
        return <div style={{fontSize: '0.8rem', color: '#888', fontStyle: 'italic', marginTop: '5px'}}>Selecione uma coluna acima</div>;
    }
  };

  return (
    <aside className="filter-menu">
      
      {/* === NOVO: Header do Projeto (Logo e Nome) === */}
      {(logoSrc || projectTitle) && (
        <div style={{ 
            paddingBottom: '20px', 
            marginBottom: '20px', 
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            {logoSrc && (
                <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    backgroundColor: '#fff', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '10px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                    padding: '10px'
                }}>
                    <img 
                        src={logoSrc} 
                        alt={projectTitle || "Logo"} 
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                </div>
            )}
            {projectTitle && (
                <h2 style={{ 
                    margin: 0, 
                    color: '#fff', 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold',
                    letterSpacing: '1px'
                }}>
                    {projectTitle}
                </h2>
            )}
        </div>
      )}

      {/* 1. Seleção da Tabela */}
      <section className="menu-section">
        <h2>Dados</h2>
        <div className="form-group">
          <label htmlFor="tabela-select" style={{color: '#FF9D00'}}>Tabela:</label>
          <select
            id="tabela-select"
            value={tabelaAtiva || ""}
            onChange={(e) => onSelectTabela(e.target.value)}
            style={{ fontWeight: 'bold', border: '2px solid #f5961d' }}
          >
            <option value="" disabled>Selecione...</option>
            {tabelas.map((tab) => (
              <option key={tab.value} value={tab.value}>
                {tab.label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* 2. Filtros Dinâmicos */}
      <section className="menu-section">
        <h2>Filtros</h2>
        
        <form onSubmit={handleApplyFilters}>
          <button type="button" onClick={addFilterRow} className="btn btn-add">
            <Plus size={16} /> Adicionar Filtro
          </button>

          <div className="filters-list">
            {filterRows.length === 0 && (
              <div className="filters-placeholder">
                Nenhum filtro ativo.
              </div>
            )}

            {filterRows.map((row) => (
              <div key={row.id} className="filter-row-container">
                <div className="filter-row-header">
                    <div className="filter-column-select">
                        <select
                            value={row.column}
                            onChange={(e) => handleColumnChange(row.id, e.target.value)}
                            style={{ width: '100%' }}
                        >
                            <option value="" disabled>Coluna...</option>
                            {colunasDisponiveis.map((col) => (
                                <option key={col.name} value={col.name}>
                                    {col.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button 
                        type="button" 
                        className="btn-remove-filter" 
                        onClick={() => removeFilterRow(row.id)}
                        title="Remover filtro"
                    >
                        <Trash size={16} />
                    </button>
                </div>
                {renderInputs(row)}
              </div>
            ))}
          </div>

          {filterRows.length > 0 && (
            <button type="submit" className="btn btn-apply">
                <Search size={16} /> Aplicar
            </button>
          )}
        </form>
      </section>

      {/* 3. Nova Seção de Ferramentas */}
      <section className="menu-section" style={{ marginTop: 'auto' }}>
        <h2>Ferramentas</h2>
        
        <button type="button" className="btn btn-graph" onClick={onOpenGraph}>
           <BarChart3 size={20} /> Análise Gráfica
        </button>

        <button type="button" className="btn btn-map" onClick={onOpenMap}>
           <Map size={20} /> Mapa Interativo
        </button>

        <button type="button" className="btn btn-export" onClick={onExport}>
           <Download size={20} /> Exportar Dados
        </button>
      </section>

    </aside>
  );
};