import React, { useState, type FormEvent } from "react";
import "../MenuFilter/FilterMenu.css"; // ← usa o mesmo CSS do SIMA

interface MenuFilterFurnasProps {
  onApplyFilters?: (filters: Record<string, any>) => void;
}

export const MenuFilterFurnas: React.FC<MenuFilterFurnasProps> = ({
  onApplyFilters,
}) => {
  // Campos principais do FURNAS
  const [tabela, setTabela] = useState("");
  const [campanha, setCampanha] = useState("");
  const [sitio, setSitio] = useState("");

  const [dataInicial, setDataInicial] = useState("2004-01-18");
  const [dataFinal, setDataFinal] = useState("2025-01-18");

  const handleApplyFilters = (e: FormEvent) => {
    e.preventDefault();

    const filters = {
      tabela,
      campanha,
      sitio,
      dataInicial,
      dataFinal,
    };

    console.log("Filtros FURNAS aplicados:", filters);

    if (onApplyFilters) onApplyFilters(filters);
  };

  const handleInteractiveMap = () => {
    console.log("Abrir mapa interativo FURNAS");
  };

  return (
    <aside className="filter-menu">
      <h2>FURNAS</h2>

      <form onSubmit={handleApplyFilters}>
        {/* Tabela */}
        <div className="form-group">
          <label htmlFor="tabela">Tabela:</label>
          <select
            id="tabela"
            value={tabela}
            onChange={(e) => setTabela(e.target.value)}
          >
          </select>
        </div>

        {/* Campanha */}
        <div className="form-group">
          <label htmlFor="campanha">Campanha:</label>
          <select
            id="campanha"
            value={campanha}
            onChange={(e) => setCampanha(e.target.value)}
          >
            <option value="">Selecione</option>
          </select>
        </div>

        {/* Sítio */}
        <div className="form-group">
          <label htmlFor="sitio">Sítio:</label>
          <select
            id="sitio"
            value={sitio}
            onChange={(e) => setSitio(e.target.value)}
          >
          </select>
        </div>

        {/* Datas */}
        <div className="date-group">
          <div className="form-group">
            <label htmlFor="data-inicial">Data Inicial:</label>
            <input
              type="date"
              id="data-inicial"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="data-final">Data Final:</label>
            <input
              type="date"
              id="data-final"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-apply">
          Aplicar Filtros
        </button>
      </form>

      <button type="button" className="btn btn-map" onClick={handleInteractiveMap}>
        Mapa Interativo
      </button>
    </aside>
  );
};
