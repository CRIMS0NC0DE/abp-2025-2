import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Importa os novos estilos CSS
import "./mapstyles.css";

// --- Interfaces de Dados (Mantidas) ---

interface ApiResponse<T> {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: T[];
}

interface Estacao {
  idestacao: string;
  rotulo: string;
  lat: number | null;
  lng: number | null;
  inicio: string;
  fim: string | null;
}

// Função getIconBgStyle REMOVIDA

// --- Componente: SidebarItem (REFATORADO) ---

const SidebarItem: React.FC<{
  estacao: Estacao;
  onSelect: (id: string) => void;
  isSelected: boolean;
}> = ({ estacao, onSelect, isSelected }) => {
  // Lógica de imagem e ícone REMOVIDA

  return (
    <div
      // Classes CSS substituíram o Tailwind e os estilos inline
      className={`map-sidebar-item ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(estacao.idestacao)}
    >
      {/* Ícone REMOVIDO */}
      <h4 className="map-sidebar-item-title">{estacao.rotulo}</h4>
    </div>
  );
};

// --- Componente: Sidebar (REFATORADO) ---

interface SidebarProps {
  searchText: string;
  setSearchText: (text: string) => void;
  filteredEstacoes: Estacao[];
  selectedEstacaoId: string | "all";
  onSelectEstacao: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  searchText,
  setSearchText,
  filteredEstacoes,
  selectedEstacaoId,
  onSelectEstacao,
}) => {
  return (
    <div className="map-sidebar">
      <h2 className="map-sidebar-header">Localizações</h2>
      <p className="map-sidebar-subheader">
        {filteredEstacoes.length} pontos encontrados
      </p>

      {/* Barra de Busca com classes CSS */}
      <div className="map-search-container">
        <svg
          className="map-search-icon"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="map-search-input"
        />
      </div>

      <div className="map-sidebar-list">
        {/* === BOTÃO "TODOS" REFATORADO E SEM ÍCONE === */}
        <div
          className={`map-sidebar-item ${
            selectedEstacaoId === "all" ? "selected" : ""
          }`}
          onClick={() => onSelectEstacao("all")}
        >
          {/* Ícone REMOVIDO */}
          <h4 className="map-sidebar-item-title">Todos os Pontos</h4>
        </div>
        {/* ======================================= */}

        {filteredEstacoes.length > 0 ? (
          filteredEstacoes.map((estacao) => (
            <SidebarItem
              key={estacao.idestacao}
              estacao={estacao}
              onSelect={onSelectEstacao}
              isSelected={selectedEstacaoId === estacao.idestacao}
            />
          ))
        ) : (
          <p className="map-sidebar-no-results">
            Nenhuma localização encontrada.
          </p>
        )}
      </div>
    </div>
  );
};

// --- Configurações do Leaflet (Mantidas) ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const INITIAL_CENTER: [number, number] = [-13.5, -50.0];
const INITIAL_ZOOM = 5;

// --- Componente Principal: SimaMap (REFATORADO) ---

const SimaMap: React.FC = () => {
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedEstacaoId, setSelectedEstacaoId] = useState<string | "all">(
    "all",
  );

  const formatDate = (dateString: string) =>
    dateString ? new Date(dateString).toLocaleDateString("pt-BR") : "N/A";

  // --- Busca de dados da API (Sem alterações) ---
  useEffect(() => {
    const fetchData = async () => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      try {
        const estacoesResponse = await fetch(
          `${API_BASE_URL}/api/sima/estacao/all?limit=10000`,
        );
        if (!estacoesResponse.ok) throw new Error("Erro ao carregar dados");
        const estacoesData: ApiResponse<Estacao> =
          await estacoesResponse.json();
        if (estacoesData.success) {
          setEstacoes(estacoesData.data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Filtros (Sem alterações) ---
  const filteredEstacoesBase = useMemo(() => {
    let list = estacoes.filter((e) => e.lat && e.lng);
    if (searchText) {
      const q = searchText.toLowerCase();
      list = list.filter(
        (e) =>
          e.rotulo.toLowerCase().includes(q) ||
          e.idestacao.toLowerCase().includes(q),
      );
    }
    return list;
  }, [estacoes, searchText]);

  const filteredEstacoes = useMemo(() => {
    if (selectedEstacaoId === "all") return filteredEstacoesBase;
    const selected = filteredEstacoesBase.filter(
      (e) => e.idestacao === selectedEstacaoId,
    );
    return selected.length > 0 ? selected : filteredEstacoesBase;
  }, [selectedEstacaoId, filteredEstacoesBase]);

  // --- Centralização dinâmica (Sem alterações) ---
  const mapSettings = useMemo(() => {
    if (selectedEstacaoId !== "all") {
      const estacao = estacoes.find((e) => e.idestacao === selectedEstacaoId);
      if (estacao && estacao.lat && estacao.lng) {
        return {
          center: [estacao.lat, estacao.lng] as [number, number],
          zoom: 12,
        };
      }
    }
    return { center: INITIAL_CENTER, zoom: INITIAL_ZOOM };
  }, [selectedEstacaoId, estacoes]);

  // Variavel popupStyles REMOVIDA (agora está no CSS)

  // --- Renderização ---
  if (loading)
    return (
      <div style={{ padding: "1rem" }}>Carregando mapa...</div>
    );

  return (
    <div className="map-layout-container">
      {/* Tag <style> REMOVIDA */}

      <Sidebar
        searchText={searchText}
        setSearchText={setSearchText}
        filteredEstacoes={filteredEstacoesBase}
        selectedEstacaoId={selectedEstacaoId}
        onSelectEstacao={setSelectedEstacaoId}
      />

      {/* O fundo do mapa permanece claro */}
      <div className="map-main-area">
        <h1 className="map-main-title">Mapa de Monitoramento</h1>

        <MapContainer
          key={mapSettings.center.toString()} // Força o recenter
          center={mapSettings.center}
          zoom={mapSettings.zoom}
          scrollWheelZoom
          className="map-container-wrapper" // Usa classe CSS
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marcadores */}
          {filteredEstacoes.map(
            (estacao) =>
              estacao.lat &&
              estacao.lng && (
                <Marker
                  key={estacao.idestacao}
                  position={[estacao.lat, estacao.lng]}
                >
                  <Popup
                    className="custom-map-popup" // Usa o estilo do CSS
                  >
                    {/* Lógica de imagem REMOVIDA */}
                    {/* Estilos inline REMOVIDOS */}
                    
                    <h3>Estação: {estacao.rotulo}</h3>
                    <p>ID: {estacao.idestacao}</p>
                    <p>Início: {formatDate(estacao.inicio)}</p>
                    <p>
                      Fim:{" "}
                      {estacao.fim ? formatDate(estacao.fim) : "Em operação"}
                    </p>
                    <p>Lat: {estacao.lat.toFixed(4)}</p>
                    <p>Lng: {estacao.lng.toFixed(4)}</p>
                  </Popup>
                </Marker>
              ),
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default SimaMap;