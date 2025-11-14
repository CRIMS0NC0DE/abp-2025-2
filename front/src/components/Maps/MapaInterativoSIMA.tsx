// src/components/InteractiveMap.tsx

import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet'; // Importa o 'L' para corrigir o ícone padrão

// --- Configuração para corrigir o ícone padrão do Leaflet no React ---
// (O React-Leaflet v4 às vezes tem problemas com os caminhos de ícone padrão)
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl,
  iconUrl: iconUrl,
  shadowUrl: shadowUrl,
});
// --- Fim da correção do ícone ---


// 1. Definição do Tipo de Dados
// Este 'interface' deve corresponder à estrutura dos dados
// que vêm do seu banco de dados PostgreSQL.
interface LocationPoint {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  status: 'ativa' | 'inativa';
  state: string; // Ex: 'SP', 'RJ', 'MG'
  project: 'SIMA' | 'Furnas' | 'Balcar';
}

// 2. Dados Fictícios (Mock Data)
// Substitua esta variável pelos dados buscados da sua API.
const API_URLS = {
  balcar: 'http://localhost:3001/api/mapa/balcar',
  furnas: 'http://localhost:3001/api/mapa/furnas',
  sima: 'http://localhost:3001/api/mapa/sima',
};


/**
 * Componente de Mapa Interativo
 */
const InteractiveMap: React.FC = () => {

  // 3. Estados do Componente
  const [allLocations, setAllLocations] = useState<LocationPoint[]>([]);
  const [filterState, setFilterState] = useState<string>('todos'); // 'todos', 'SP', 'RJ', 'MG'
  const [filterStatus, setFilterStatus] = useState<string>('todos'); // 'todos', 'ativa', 'inativa'

  // 4. Carregamento dos Dados (Simulação de API)
  useEffect(() => {
    fetch('http://localhost:3001/api/mapa/sima')
       .then(res => res.json())
        .then(data => setAllLocations(data));
  }, []); // O array vazio [] faz com que isso rode apenas uma vez (na montagem)

  
  // 5. Lógica de Filtragem
  // 'useMemo' otimiza o desempenho, recalculando os filtros
  // apenas quando os dados ou os filtros mudarem.
  const filteredLocations = useMemo(() => {
    return allLocations.filter(location => {
      const stateMatch = filterState === 'todos' || location.state === filterState;
      const statusMatch = filterStatus === 'todos' || location.status === filterStatus;
      return stateMatch && statusMatch;
    });
  }, [allLocations, filterState, filterStatus]);

  // Helper para obter listas únicas para os filtros (dropdowns)
  const uniqueStates = useMemo(() => {
    // Cria um Set (que só permite valores únicos) e depois converte para Array
    const states = new Set(allLocations.map(loc => loc.state));
    return Array.from(states);
  }, [allLocations]);


  // 6. Renderização (JSX)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      
      {/* --- Painel de Filtros --- */}
      <div className="filters-panel" style={{ padding: '10px', backgroundColor: '#f0f0f0', display: 'flex', gap: '20px' }}>
        <div>
          <label htmlFor="state-filter" style={{ marginRight: '5px' }}>Filtrar por Estado: </label>
          <select 
            id="state-filter"
            value={filterState} 
            onChange={(e) => setFilterState(e.target.value)}
          >
            <option value="todos">Todos os Estados</option>
            {uniqueStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status-filter" style={{ marginRight: '5px' }}>Filtrar por Status: </label>
          <select 
            id="status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="todos">Todos os Status</option>
            <option value="ativa">Ativa</option>
            <option value="inativa">Inativa</option>
          </select>
        </div>
      </div>

      {/* --- Contêiner do Mapa --- */}
      <MapContainer 
        center={[-22.0, -47.0]} // Centro inicial (ajuste para o centro do Brasil/seus dados)
        zoom={6} // Zoom inicial
        style={{ height: '100%', width: '70%' }} // Ocupa o espaço restante
      >
        {/* Camada de blocos (o mapa base). Usamos o OpenStreetMap (gratuito) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 7. Renderização dos Marcadores */}
        {filteredLocations.map(location => (
          <Marker 
            key={location.id} 
            position={[location.latitude, location.longitude]}
          >
            <Popup>
              <strong>{location.name}</strong><br />
              Projeto: {location.project}<br />
              Status: {location.status === 'ativa' ? 'Ativa' : 'Inativa'}<br />
              Estado: {location.state}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;