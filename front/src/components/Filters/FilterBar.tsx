// src/components/commons/Filters/FilterBar.tsx
import styles from "./Filters.module.css"; // ✅ IMPORTADO
import { useState } from "react";
import {
  Plus,
  Trash,
  Search,
  X,
  Download,
  Calendar,
  Clock,
  Hash,
  Type as IconType,
  Info,
} from "lucide-react";
import type { FilterParams, ColumnInfo, ColumnType } from "../../types/types";

// --- Interfaces ---

interface FilterBarProps {
  tableName: string;
  onApplyFilters: (filters: FilterParams) => void;
  onClearFilters: () => void;
  onExportClick: () => void;
  colunasDisponiveis: ColumnInfo[];
}

interface FilterRow {
  id: number;
  column: string;
  type: ColumnType;
  value: string;
  valueEnd?: string;
}

let filterIdCounter = 0;
const useUniqueId = () => {
  return () => filterIdCounter++;
};

// --- Componentes Movidos (Correto) ---

const StyledInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ReactNode }
> = ({ icon, className, ...props }) => (
  // ✅ Usa styles.inputWrapper e permite classes extras
  <div className={`${styles.inputWrapper} ${className || ""}`}>
    {icon && (
      // ✅ Usa styles.inputIcon
      <div className={styles.inputIcon}>{icon}</div>
    )}
    <input
      {...props}
      // ✅ Usa styles.styledInput e a classe condicional
      className={`${styles.styledInput} ${icon ? styles.inputWithIcon : ""}`}
    />
  </div>
);

interface RenderValorInputsProps {
  row: FilterRow;
  onChange: (id: number, field: "value" | "valueEnd", newValue: string) => void;
}

function RenderValorInputs({ row, onChange }: RenderValorInputsProps) {
  const { id, type, value, valueEnd } = row;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value: newValue } = e.target;
    onChange(id, name as "value" | "valueEnd", newValue);
  };

  switch (type) {
    case "string":
      return (
        <StyledInput
          type="text"
          name="value"
          value={value}
          onChange={handleChange}
          placeholder="Valor (ex: Ponto 1)"
          // ✅ Classe de ícone do Tailwind removida
          icon={<IconType size={14} />}
        />
      );
    case "number":
      return (
        <>
          <StyledInput
            type="number"
            name="value"
            value={value}
            onChange={handleChange}
            placeholder="Min"
            icon={<Hash size={14} />}
          />
          {/* ✅ Usa styles.rangeSeparator */}
          <span className={styles.rangeSeparator}>-</span>
          <StyledInput
            type="number"
            name="valueEnd"
            value={valueEnd ?? ""}
            onChange={handleChange}
            placeholder="Max"
            icon={<Hash size={14} />}
          />
        </>
      );
    case "date":
      return (
        <>
          <StyledInput
            type="date"
            name="value"
            value={value}
            onChange={handleChange}
            placeholder="Data Início"
            icon={<Calendar size={14} />}
          />
          {/* ✅ Usa styles.rangeSeparatorSmall */}
          <span className={styles.rangeSeparatorSmall}>até</span>
          <StyledInput
            type="date"
            name="valueEnd"
            value={valueEnd ?? ""}
            onChange={handleChange}
            placeholder="Data Fim"
            icon={<Calendar size={14} />}
          />
        </>
      );
    case "time":
      return (
        <>
          <StyledInput
            type="time"
            name="value"
            value={value}
            onChange={handleChange}
            placeholder="Hora Início"
            icon={<Clock size={14} />}
          />
          {/* ✅ Usa styles.rangeSeparatorSmall */}
          <span className={styles.rangeSeparatorSmall}>até</span>
          <StyledInput
            type="time"
            name="valueEnd"
            value={valueEnd ?? ""}
            onChange={handleChange}
            placeholder="Hora Fim"
            icon={<Clock size={14} />}
          />
        </>
      );
    default:
      return (
        <StyledInput type="text" placeholder="Selecione uma coluna..." disabled />
      );
  }
}

// --- ✅ Sub-componentes Didáticos ---

// 1. Cabeçalho da Barra de Filtro
interface FilterBarHeaderProps {
  tableName: string;
  onExportClick: () => void;
  onAddFilterRow: () => void;
}

function FilterBarHeader({
  tableName,
  onExportClick,
  onAddFilterRow,
}: FilterBarHeaderProps) {
  const friendlyTableName = tableName.replace(/-/g, " ");

  return (
    // ✅ Usa styles.header
    <header className={styles.header}>
      {/* Título e Subtítulo */}
      <div>
        <h3 className={styles.headerTitle}>Filtros</h3>
        <p className={styles.headerSubtitle}>{friendlyTableName}</p>
      </div>

      {/* Botões de Ação Principais */}
      {/* ✅ Usa styles.headerActions */}
      <div className={styles.headerActions}>
        <button
          onClick={onExportClick}
          // ✅ Combina classes do módulo
          className={`${styles.btn} ${styles.btnExport}`}
        >
          {/* ✅ Usa styles.btnIcon */}
          <Download size={16} className={styles.btnIcon} />
          Exportar Dados
        </button>
        <button
          onClick={onAddFilterRow}
          className={`${styles.btn} ${styles.btnAdd}`}
        >
          {/* ✅ Usa styles.btnIconAdd */}
          <Plus size={18} className={styles.btnIconAdd} />
          Adicionar Filtro
        </button>
      </div>
    </header>
  );
}

// 2. Item da Lista de Filtros (Uma Linha)
interface FilterRowItemProps {
  row: FilterRow;
  colunasDisponiveis: ColumnInfo[];
  onColumnChange: (id: number, value: string) => void;
  onValueChange: (id: number, field: "value" | "valueEnd", value: string) => void;
  onRemoveRow: (id: number) => void;
}

function FilterRowItem({
  row,
  colunasDisponiveis,
  onColumnChange,
  onValueChange,
  onRemoveRow,
}: FilterRowItemProps) {
  return (
    // ✅ Usa styles.filterRow
    <div className={styles.filterRow}>
      {/* Seletor de Coluna */}
      <select
        value={row.column}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onColumnChange(row.id, e.target.value)
        }
        // ✅ Usa styles.filterSelect
        className={styles.filterSelect}
      >
        <option value="" disabled>
          Selecione uma coluna...
        </option>
        {colunasDisponiveis.map((col) => (
          <option key={col.name} value={col.name}>
            {col.name.toUpperCase()}
          </option>
        ))}
      </select>

      {/* Inputs de Valor (Min/Max, Texto, etc.) */}
      <RenderValorInputs row={row} onChange={onValueChange} />

      {/* Botão de Remover Linha */}
      <button
        onClick={() => onRemoveRow(row.id)}
        // ✅ Usa styles.btnRemove
        className={styles.btnRemove}
        aria-label="Remover filtro"
      >
        <Trash size={18} />
      </button>
    </div>
  );
}

// 3. Ações da Barra de Filtro (Aplicar/Limpar)
interface FilterBarActionsProps {
  onApply: () => void;
  onClear: () => void;
}

function FilterBarActions({ onApply, onClear }: FilterBarActionsProps) {
  return (
    // ✅ Usa styles.footerActions
    <div className={styles.footerActions}>
      <button
        onClick={onApply}
        // ✅ Combina classes
        className={`${styles.btn} ${styles.btnApply}`}
      >
        <Search size={16} className={styles.btnIcon} />
        Aplicar Filtros
      </button>
      <button
        onClick={onClear}
        className={`${styles.btn} ${styles.btnClear}`}
      >
        <X size={16} className={styles.btnIcon} />
        Limpar
      </button>
    </div>
  );
}

// --- Componente Principal (Agora muito mais limpo) ---

export function FilterBar({
  tableName,
  onApplyFilters,
  onClearFilters,
  onExportClick,
  colunasDisponiveis,
}: FilterBarProps) {
  const [filterRows, setFilterRows] = useState<FilterRow[]>([]);
  const getNextId = useUniqueId();

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
    setFilterRows(
      filterRows.map((row) =>
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

  const handleApply = () => {
    const formattedFilters = filterRows.reduce((acc: FilterParams, row) => {
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
    onApplyFilters(formattedFilters);
  };

  const handleClear = () => {
    setFilterRows([]);
    onClearFilters();
  };

  return (
    // ✅ Usa styles.filterBar
    <div className={styles.filterBar}>
      {/* 1. Renderiza o Cabeçalho */}
      <FilterBarHeader
        tableName={tableName}
        onExportClick={onExportClick}
        onAddFilterRow={addFilterRow}
      />
      {/* 2. Renderiza a Lista de Filtros */}
      {/* ✅ Usa styles.filterList */}
      <section className={styles.filterList}>
        {filterRows.length === 0 && (
          // ✅ Usa styles.placeholder
          <div className={styles.placeholder}>
            {/* ✅ Usa styles.placeholderIcon */}
            <Info size={18} className={styles.placeholderIcon} />
            <p className={styles.placeholderTitle}>Nenhum filtro aplicado</p>
            <p className={styles.placeholderText}>
              Clique em "Adicionar Filtro" acima para começar a refinar seus
              dados.
            </p>
          </div>
        )}
        {/* Mapeia cada linha de filtro para seu componente */}
        {filterRows.map((row) => (
          <FilterRowItem
            key={row.id}
            row={row}
            colunasDisponiveis={colunasDisponiveis}
            onColumnChange={handleColumnChange}
            onValueChange={handleValueChange}
            onRemoveRow={removeFilterRow}
          />
        ))}
      </section>
      {/* 3. Renderiza as Ações (Aplicar/Limpar) se houver filtros */}
      {filterRows.length > 0 && (
        // ✅ Usa styles.footer
        <footer className={styles.footer}>
          <FilterBarActions onApply={handleApply} onClear={handleClear} />
        </footer>
      )}
    </div>
  );
}