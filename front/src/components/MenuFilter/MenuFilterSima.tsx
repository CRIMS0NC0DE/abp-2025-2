import React, { useState, type FormEvent } from 'react';
import './FilterMenu.css';

interface FilterMenuProps {
  onApplyFilters?: (filters: Record<string, any>) => void;
}

export const FilterMenu: React.FC<FilterMenuProps> = ({ onApplyFilters }) => {
  // === Estado para Parâmetros Básicos ===
  const [reservatorio, setReservatorio] = useState('serraDaMesa');
  const [dataInicial, setDataInicial] = useState('2004-01-18');
  const [dataFinal, setDataFinal] = useState('2025-01-18');
  const [filtro, setFiltro] = useState('');

  // === Estado para Gráficos ===
  const [sensor, setSensor] = useState('');
  const [periodo, setPeriodo] = useState('');

  // === Funções de Submissão ===
  const handleApplyFilters = (e: FormEvent) => {
    e.preventDefault();

    const appliedFilters = {
      reservatorio,
      dataInicial,
      dataFinal,
      filtro,
    };

    console.log('Filtros aplicados:', appliedFilters);

    if (onApplyFilters) {
      onApplyFilters(appliedFilters);
    }
  };

  const handleGenerateGraph = (e: FormEvent) => {
    e.preventDefault();
    console.log('Gerar gráfico com:', {
      sensor,
      periodo,
    });
    // Aqui você chamaria a função para gerar o gráfico
  };

  const handleInteractiveMap = () => {
    console.log('Abrir mapa interativo');
    // Lógica para o mapa
  };

  return (
    <aside className="filter-menu">
      {/* Seção de Parâmetros Básicos */}
      <section className="menu-section">
        <h2>Parâmetros Básicos</h2>
        <form onSubmit={handleApplyFilters}>
          <div className="form-group">
            <label htmlFor="reservatorio">Reservatório:</label>
            <select
              id="reservatorio"
              value={reservatorio}
              onChange={(e) => setReservatorio(e.target.value)}
            >
              <option value="serraDaMesa">Serra da Mesa</option>
              <option value="manso">Manso</option>
              <option value="tucurui">Tucuruí</option>
              <option value="curuai">Curuai</option>
              <option value="corumba">Corumbá</option>
              <option value="itumbiara">Itumbiara</option>
            </select>
          </div>

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

          <div className="form-group">
            <label htmlFor="filtro">Filtro:</label>
            <select
              id="filtro"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            >
              <option value="">Selecione um filtro</option>
              <option value="filtroTemperaturaDaAgua">Temperatura da Água</option>
              <option value="filtroTemperaturaDaAgua1m">Temperatura da Água 1m</option>
              <option value="filtroTemperaturaDaAgua2m">Temperatura da Água 2m</option>
              <option value="filtroTemperaturaDaAgua3m">Temperatura da Água 3m</option>
              <option value="filtroTemperaturaDaAgua4m">Temperatura da Água 4m</option>
              <option value="filtroUmidadeRelativa">Umidade Relativa</option>
              <option value="filtroTemperaturaDoAr">Temperatura do Ar</option>
              <option value="filtroPressaoAtmosferica">Pressão Atmosférica</option>
              <option value="filtroDirecaoDoVento">Direção do Vento</option>
              <option value="filtroIntensidadeDoVento">Intensidade do Vento</option>
              <option value="filtroRadiacaoIncidente">Radiação Incidente</option>
              <option value="filtroRadiacaoRefletida">Radiação Refletida</option>
              <option value="filtroCondutividade">Condutividade</option>
              <option value="filtroPh">pH</option>
            </select>
          </div>

          <button type="submit" className="btn btn-apply">
            Aplicar Filtros
          </button>
        </form>
      </section>

      {/* Seção de Gráficos */}
      <section className="menu-section">
        <h2>Gráficos</h2>
        <form onSubmit={handleGenerateGraph}>
          <div className="form-group">
            <label htmlFor="sensor">Sensor de:</label>
            <select
              id="sensor"
              value={sensor}
              onChange={(e) => setSensor(e.target.value)}
            >
              <option value="">Selecione um sensor</option>
              <option value="temperaturaDaAgua">Temperatura da Água</option>
              <option value="temperaturaDaAgua1m">Temperatura da Água 1m</option>
              <option value="temperaturaDaAgua2m">Temperatura da Água 2m</option>
              <option value="temperaturaDaAgua3m">Temperatura da Água 3m</option>
              <option value="temperaturaDaAgua4m">Temperatura da Água 4m</option>
              <option value="umidadeRelativa">Umidade Relativa</option>
              <option value="temperaturaDoAr">Temperatura do Ar</option>
              <option value="pressaoAtmosferica">Pressão Atmosférica</option>
              <option value="direcaoDoVento">Direção do Vento</option>
              <option value="intensidadeDoVento">Intensidade do Vento</option>
              <option value="radiacaoIncidente">Radiação Incidente</option>
              <option value="radiacaoRefletida">Radiação Refletida</option>
              <option value="condutividade">Condutividade</option>
              <option value="ph">pH</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="periodo">Período:</label>
            <select
              id="periodo"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
            >
              <option value="">Selecione um período</option>
              <option value="diario">Diário</option>
              <option value="semanal">Semanal</option>
              <option value="mensal">Mensal</option>
              <option value="anual">Anual</option>
            </select>
          </div>

          <button type="submit" className="btn btn-generate">
            Gerar Gráfico
          </button>
        </form>
      </section>

      <button
        type="button"
        className="btn btn-map"
        onClick={handleInteractiveMap}
      >
        Mapa Interativo
      </button>
    </aside>
  );
};
