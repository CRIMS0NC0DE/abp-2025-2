// src/components/commons/Filters/FilterBar.tsx
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
import type { FilterParams, ColumnInfo, ColumnType } from "../../types/types"; // Ajuste o caminho

// --- Interfaces ---

interface FilterBarProps {
  // ✅ NOVO: Prop para receber o nome da tabela
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
  <div className={`relative flex-1 ${className}`}>
     {" "}
    {icon && (
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon} {" "}
      </div>
    )}
     {" "}
    <input
      {...props}
      className={`form-input w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm 
focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 
${icon ? "pl-9" : ""} ${props.disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
    />
     {" "}
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
          icon={<IconType size={14} className="text-gray-400" />}
        />
      );
    case "number":
      return (
        <>
           {" "}
          <StyledInput
            type="number"
            name="value"
            value={value}
            onChange={handleChange}
            placeholder="Min"
            icon={<Hash size={14} className="text-gray-400" />}
          />
            <span className="text-gray-500 font-medium">-</span>
           {" "}
          <StyledInput
            type="number"
            name="valueEnd"
            value={valueEnd ?? ""}
            onChange={handleChange}
            placeholder="Max"
            icon={<Hash size={14} className="text-gray-400" />}
          />
           {" "}
        </>
      );
    case "date":
      return (
        <>
           {" "}
          <StyledInput
            type="date"
            name="value"
            value={value}
            onChange={handleChange}
            placeholder="Data Início"
            icon={<Calendar size={14} className="text-gray-400" />}
          />
            <span className="text-gray-500 text-sm">até</span>
           {" "}
          <StyledInput
            type="date"
            name="valueEnd"
            value={valueEnd ?? ""}
            onChange={handleChange}
            placeholder="Data Fim"
            icon={<Calendar size={14} className="text-gray-400" />}
          />
           {" "}
        </>
      );
    case "time":
      return (
        <>
           {" "}
          <StyledInput
            type="time"
            name="value"
            value={value}
            onChange={handleChange}
            placeholder="Hora Início"
            icon={<Clock size={14} className="text-gray-400" />}
          />
            <span className="text-gray-500 text-sm">até</span>
           {" "}
          <StyledInput
            type="time"
            name="valueEnd"
            value={valueEnd ?? ""}
            onChange={handleChange}
            placeholder="Hora Fim"
            icon={<Clock size={14} className="text-gray-400" />}
          />
           {" "}
        </>
      );
    default:
      return <StyledInput type="text" placeholder="Selecione uma coluna..." disabled />;
  }
}

// --- ✅ Sub-componentes Didáticos ---

// 1. Cabeçalho da Barra de Filtro
interface FilterBarHeaderProps {
  tableName: string;
  onExportClick: () => void;
  onAddFilterRow: () => void;
}

function FilterBarHeader({ tableName, onExportClick, onAddFilterRow }: FilterBarHeaderProps) {
  // Formata o nome da tabela (ex: "abiotico-coluna" -> "Abiotico Coluna")
  const friendlyTableName = tableName.replace(/-/g, " ");

  return (
    <header className="flex justify-between items-center mb-4">
      {/* Título e Subtítulo */}
      <div>
        <h3 className="text-xl font-semibold text-sky-900">Filtros</h3>
        <p className="text-sm font-medium text-cyan-700 capitalize">{friendlyTableName}</p>
      </div>

      {/* Botões de Ação Principais */}
      <div className="flex items-center gap-3">
        <button
          onClick={onExportClick}
          className="flex items-center py-2 px-4 text-sm font-medium text-cyan-700 bg-white border border-cyan-600 rounded-lg shadow-sm 
          transition-all transform hover:scale-105 hover:bg-cyan-50 
          focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
        >
          <Download size={16} className="mr-1.5" />
          Exportar Dados
        </button>
        <button
          onClick={onAddFilterRow}
          className="flex items-center py-2 px-4 text-sm font-medium text-white bg-cyan-600 rounded-lg shadow-sm 
          transition-all transform hover:scale-105 hover:bg-cyan-700 
          focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50"
        >
          <Plus size={18} className="mr-1" />
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
    <div className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Seletor de Coluna */}
      <select
        value={row.column}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onColumnChange(row.id, e.target.value)
        }
        className="form-select w-1/3 px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm 
        focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
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
        className="p-2 text-red-500 rounded-full 
        transition-all transform hover:scale-110 hover:bg-red-600 hover:text-white"
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
    <div className="flex gap-3">
      <button
        onClick={onApply}
        className="flex items-center py-2 px-4 text-sm font-medium text-white bg-green-600 rounded-lg shadow-md 
        transition-all transform hover:scale-105 hover:bg-green-700 
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      >
        <Search size={16} className="mr-1.5" />
        Aplicar Filtros
      </button>
      <button
        onClick={onClear}
        className="flex items-center py-2 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md 
        transition-all transform hover:scale-105 hover:bg-gray-50 
        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
      >
        <X size={16} className="mr-1.5" />
        Limpar
      </button>
    </div>
  );
}

// --- Componente Principal (Agora muito mais limpo) ---

export function FilterBar({
  tableName, // ✅ Prop recebida
  onApplyFilters,
  onClearFilters,
  onExportClick,
  colunasDisponiveis,
}: FilterBarProps) {
  const [filterRows, setFilterRows] = useState<FilterRow[]>([]);
  const getNextId = useUniqueId(); // --- Lógica de Handlers (Estado fica aqui) ---

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
          : row,
      ),
    );
  };

  const handleValueChange = (id: number, field: "value" | "valueEnd", newValue: string) => {
    setFilterRows((currentRows) =>
      currentRows.map((row) => (row.id === id ? { ...row, [field]: newValue } : row)),
    );
  };

  const handleApply = () => {
    const formattedFilters = filterRows.reduce((acc: FilterParams, row) => {
      if (!row.column || row.type === "unknown") return acc;
      if (row.type === "string") {
        if (row.value) acc[row.column] = row.value;
      } else if (row.type === "number" || row.type === "date" || row.type === "time") {
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
  }; // --- Renderização Didática ---

  return (
    <div className="p-5 bg-sky-50 border-b border-gray-200 shadow-lg font-sans">
      {/* 1. Renderiza o Cabeçalho */}
      <FilterBarHeader
        tableName={tableName}
        onExportClick={onExportClick}
        onAddFilterRow={addFilterRow}
      />
      {/* 2. Renderiza a Lista de Filtros */} {" "}
      <section className="space-y-3">
         {" "}
        {filterRows.length === 0 && ( // Placeholder de "Nenhum filtro"
          <div className="text-center p-4 border border-dashed border-sky-300 rounded-lg bg-white">
              <Info size={18} className="mx-auto text-sky-500 mb-2" /> {" "}
            <p className="font-medium text-sky-800">Nenhum filtro aplicado</p> {" "}
            <p className="text-sm text-sky-600">
                Clique em "Adicionar Filtro" acima para começar a refinar seus dados.  {" "}
            </p>
             {" "}
          </div>
        )}
        {/* Mapeia cada linha de filtro para seu componente */} {" "}
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
         {" "}
      </section>
      {/* 3. Renderiza as Ações (Aplicar/Limpar) se houver filtros */} {" "}
      {filterRows.length > 0 && (
        <footer className="mt-4">
          <FilterBarActions onApply={handleApply} onClear={handleClear} />
        </footer>
      )}
       {" "}
    </div>
  );
}
