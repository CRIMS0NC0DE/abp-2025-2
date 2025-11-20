import React, { useState, type FormEvent } from 'react';
import './FilterMenu.css'; // Reutilizando o mesmo CSS (deve conter os estilos da imagem)

interface MenuFilterBalcarProps {
  onApplyFilters?: (filters: Record<string, any>) => void;
}

export const MenuFilterBalcar: React.FC<MenuFilterBalcarProps> = ({
  onApplyFilters,
}) => {
  // === Estados para os filtros da imagem ===
  const [tabela, setTabela] = useState('');
  const [campanha, setCampanha] = useState('');
  const [reservatorio, setReservatorio] = useState('serraDaMesa'); // Valor padrão
  const [filtro, setFiltro] = useState('');
  const [dataInicial, setDataInicial] = useState('2004-01-18'); // Valor da imagem
  const [dataFinal, setDataFinal] = useState('2025-01-18'); // Valor da imagem

  // === Função de Submissão ===
  const handleApplyFilters = (e: FormEvent) => {
    e.preventDefault();

    const appliedFilters = {
      tabela,
      campanha,
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

  const handleInteractiveMap = () => {
    console.log('Abrir mapa interativo');
    // Lógica para o mapa
  };

  return (
    <aside className="filter-menu">
      {/* Título da imagem */}
      <h2>BALCAR</h2>

      {/* Formulário principal com os filtros da imagem */}
      <form onSubmit={handleApplyFilters}>
        {/* Campo Tabela (NOVO) */}
        <div className="form-group">
          <label htmlFor="tabela">Tabela:</label>
          <select
            id="tabela"
            value={tabela}
            onChange={(e) => setTabela(e.target.value)}
          >
            <option value="">Selecione a tabela</option>
            {/* Adicione suas opções de tabela aqui */}
          </select>
        </div>

        {/* Campo Campanha (NOVO) */}
        <div className="form-group">
          <label htmlFor="campanha">Campanha:</label>
          <select
            id="campanha"
            value={campanha}
            onChange={(e) => setCampanha(e.target.value)}
          >
            <option value="">Selecione a campanha</option>
            {/* Adicione suas opções de campanha aqui */}
          </select>
        </div>

        {/* Campo Reservatório (EXISTENTE) */}
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

        {/* Campo Filtro (EXISTENTE) */}
        <div className="form-group">
          <label htmlFor="filtro">Filtro:</label>
          <select
            id="filtro"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="">Selecione um filtro</option>
            <option value="filtroTemperaturaDaAgua">Temperatura da Água</option>
            <option value="filtroTemperaturaDaAgua1m">
              Temperatura da Água 1m
            </option>
            {/* ... (outras opções mantidas) ... */}
            <option value="filtroPh">pH</option>
          </select>
        </div>

        {/* Grupo de Datas (EXISTENTE) */}
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

        {/* Botão Aplicar Filtros (EXISTENTE) */}
        {/* O CSS .btn-apply deve definir o fundo laranja */}
        <button type="submit" className="btn btn-apply">
          Aplicar Filtros
        </button>
      </form>

      {/* Botão Mapa Interativo (MOVido para fora do form) */}
      {/* O CSS .btn-map deve definir o fundo verde */}
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