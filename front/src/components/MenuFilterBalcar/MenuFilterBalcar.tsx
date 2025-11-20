import React, { useState, type FormEvent } from "react";
import "../MenuFilter/FilterMenu.css"; // Ajuste o caminho conforme seu projeto

interface MenuFilterBalcarProps {
  onApplyFilters?: (filters: Record<string, any>) => void;
}

export const MenuFilterBalcar: React.FC<MenuFilterBalcarProps> = ({
  onApplyFilters,
}) => {
  const [tabela, setTabela] = useState("");
  const [campanha, setCampanha] = useState("");
  const [reservatorio, setReservatorio] = useState("");
  const [dataInicial, setDataInicial] = useState("2004-01-18");
  const [dataFinal, setDataFinal] = useState("2025-01-18");

  const handleApplyFilters = (e: FormEvent) => {
    e.preventDefault();

    const filters = {
      tabela,
      campanha,
      reservatorio,
      dataInicial,
      dataFinal,
    };

    console.log("Filtros BALCAR aplicados:", filters);

    onApplyFilters?.(filters);
  };

  const handleInteractiveMap = () => {
    console.log("Abrir mapa interativo BALCAR");
  };

  return (
    <aside className="filter-menu">
      <h2 style={{ textAlign: "center", color: "#FF9D00" }}>BALCAR</h2>

      <form onSubmit={handleApplyFilters}>
        {/* Tabela */}
        <div className="form-group">
          <label htmlFor="tabela">Tabela:</label>
          <select
            id="tabela"
            value={tabela}
            onChange={(e) => setTabela(e.target.value)}
          >
            <option value="">Selecione</option>
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

        {/* Reservatório */}
        <div className="form-group">
          <label htmlFor="reservatorio">Reservatório:</label>
          <select
            id="reservatorio"
            value={reservatorio}
            onChange={(e) => setReservatorio(e.target.value)}
          >
            <option value="">Selecione</option>
          </select>
        </div>

        {/* Datas lado a lado */}
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
