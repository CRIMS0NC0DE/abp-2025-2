import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Importa os estilos CSS
import "./mapstyles.css";

// --- Interfaces de Dados (Mantidas) ---

interface Reservatorio {
  idreservatorio: number;
  nome: string;
  lat: number | null;
  lng: number | null;
}

interface Sitio {
  nome: string;
  lat: number | null;
  lng: number | null;
  descricao: string;
  idreservatorio: number;
}

interface ApiResponse<T> {
  success: boolean;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: T[];
}

// --- Tipos da Sidebar (Mantidos) ---

type DataItemBalcar = (Reservatorio & { type: "reservatorio" }) | (Sitio & { type: "sitio" });

// Funções getIcon e getIconBgStyle REMOVIDAS

// --- Componente: SidebarItem (REFATORADO) ---
const SidebarItemBalcar: React.FC<{
  item: DataItemBalcar;
  onSelect: () => void;
  isSelected: boolean;
}> = ({ item, onSelect, isSelected }) => {
  return (
    <div
      className={`map-sidebar-item ${isSelected ? "selected" : ""}`}
      onClick={onSelect}
    >
      {/* Ícone REMOVIDO */}
      <div className="flex-1">
        <h4 className="map-sidebar-item-title">{item.nome}</h4>
      </div>
    </div>
  );
};

// --- Componente: Sidebar (REFATORADO) ---

interface SidebarPropsBalcar {
  searchText: string;
  setSearchText: (text: string) => void;
  reservatorios: DataItemBalcar[];
  sitios: DataItemBalcar[];
  selectedReservatorioId: number | null;
  isShowingSitios: boolean;
  selectedSitioId: string | "all";
  onReservatorioClick: (id: number) => void;
  onShowSitios: () => void;
  onCloseSitios: () => void;
  onSitioClick: (id: string) => void;
}

const SidebarBalcar: React.FC<SidebarPropsBalcar> = ({
  searchText,
  setSearchText,
  reservatorios,
  sitios,
  selectedReservatorioId,
  isShowingSitios,
  selectedSitioId,
  onReservatorioClick,
  onShowSitios,
  onCloseSitios,
  onSitioClick,
}) => {
  const totalCount = isShowingSitios ? sitios.length : reservatorios.length;
  const title = isShowingSitios ? "Sítios" : "Reservatórios";
  const placeholder = isShowingSitios ? "Buscar sítio..." : "Buscar reservatório...";

  return (
    <div className="map-sidebar">
      <h2 className="map-sidebar-header">{title}</h2>
      <p className="map-sidebar-subheader">
        {totalCount} {isShowingSitios ? "sítios encontrados" : "reservatórios encontrados"}
      </p>

      {/* Barra de Busca */}
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
          placeholder={placeholder}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="map-search-input"
        />
      </div>

      {/* Lista de Itens */}
      <div className="map-sidebar-list">
        {reservatorios.length === 0 && !isShowingSitios && (
          <p className="map-sidebar-no-results">
            Nenhum reservatório encontrado.
          </p>
        )}

        {isShowingSitios && (
          <button
            onClick={onCloseSitios}
            className="map-sidebar-button map-sidebar-button-secondary"
          >
            <span>&larr;</span>
            <span>Voltar para Reservatórios</span>
          </button>
        )}

        {isShowingSitios ? (
          // --- MODO SÍTIOS ---
          <div className="map-sidebar-list">
            {sitios.length > 0 ? (
              sitios.map((item) => {
                const sitio = item as Sitio & { type: "sitio" };
                const uniqueKey = `sitio-${sitio.idreservatorio}-${sitio.nome}`;

                return (
                  <SidebarItemBalcar
                    key={uniqueKey}
                    item={item}
                    onSelect={() => onSitioClick(uniqueKey)}
                    isSelected={selectedSitioId === uniqueKey}
                  />
                );
              })
            ) : (
              <p className="map-sidebar-no-results">
                Nenhum sítio encontrado.
              </p>
            )}
          </div>
        ) : (
          // --- MODO RESERVATÓRIOS ---
          <div className="map-sidebar-list">
            {reservatorios.map((item) => {
              const reservatorio = item as Reservatorio & { type: "reservatorio" };
              const isSelected =
                reservatorio.idreservatorio === selectedReservatorioId;

              return (
                <div key={reservatorio.idreservatorio}>
                  <SidebarItemBalcar
                    item={reservatorio}
                    onSelect={() =>
                      onReservatorioClick(reservatorio.idreservatorio)
                    }
                    isSelected={isSelected}
                  />
                  {isSelected && (
                    <button
                      onClick={onShowSitios}
                      className="map-sidebar-button map-sidebar-button-primary"
                    >
                      Ver Sítios &rarr;
                    </button>
                  )}
                </div>
              );
            })}
          </div>
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

// const siteIcon REMOVIDO

const INITIAL_CENTER: [number, number] = [-14.235, -51.9253];
const INITIAL_ZOOM = 4;

// --- Componente Principal: BalcarMap (REFATORADO) ---

const BalcarMap: React.FC = () => {
  // --- Estados de Dados ---
  const [reservatorios, setReservatorios] = useState<Reservatorio[]>([]);
  const [sitios, setSitios] = useState<Sitio[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Estados de UI ---
  const [searchText, setSearchText] = useState("");
  const [selectedReservatorioId, setSelectedReservatorioId] = useState<
    number | null
  >(null);
  const [isShowingSitios, setIsShowingSitios] = useState(false);
  const [selectedSitioId, setSelectedSitioId] = useState<string | "all">("all");

  // --- LÓGICA DE DADOS (Fetch) ---
  useEffect(() => {
    const fetchData = async () => {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      try {
        const [reservatoriosResponse, sitiosResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/balcar/reservatorio/all?limit=10000`),
          fetch(`${API_BASE_URL}/api/balcar/sitio/all?limit=10000`),
        ]);
        const reservatoriosData: ApiResponse<Reservatorio> =
          await reservatoriosResponse.json();
        const sitiosData: ApiResponse<Sitio> = await sitiosResponse.json();
        setReservatorios(reservatoriosData.data || []);
        setSitios(sitiosData.data || []);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Handlers de UI (Sem alterações) ---

  const handleReservatorioClick = (id: number) => {
    setSelectedReservatorioId(id);
    setIsShowingSitios(false);
    setSelectedSitioId("all");
  };

  const handleShowSitiosClick = () => {
    setIsShowingSitios(true);
    setSearchText("");
  };

  const handleCloseSitiosClick = () => {
    setIsShowingSitios(false);
    setSelectedReservatorioId(null);
    setSelectedSitioId("all");
    setSearchText("");
  };

  const handleSitioClick = (id: string) => {
    setSelectedSitioId((prev) => (prev === id ? "all" : id));
  };

  // --- LÓGICA DE DADOS (Listas Memoizadas - Sem alterações) ---

  const reservatorioNameMap: Record<number, string> = useMemo(() => {
    return reservatorios.reduce(
      (acc, res) => {
        acc[res.idreservatorio] = res.nome;
        return acc;
      },
      {} as Record<number, string>,
    );
  }, [reservatorios]);

  const listaDeReservatoriosBase = useMemo(
    () =>
      reservatorios
        .filter((r) => r.lat && r.lng)
        .map((r) => ({ ...r, type: "reservatorio" as const })),
    [reservatorios],
  );

  const listaDeSitiosBase = useMemo(
    () =>
      sitios
        .filter((s) => s.lat && s.lng)
        .map((s) => ({ ...s, type: "sitio" as const })),
    [sitios],
  );

  // --- LÓGICA DE RENDERIZAÇÃO (Listas Filtradas - Sem alterações) ---

  const reservatoriosParaSidebar = useMemo(() => {
    if (isShowingSitios) return [];
    if (!searchText) return listaDeReservatoriosBase;
    const lowerCaseSearch = searchText.toLowerCase();
    return listaDeReservatoriosBase.filter((item) =>
      item.nome.toLowerCase().includes(lowerCaseSearch),
    );
  }, [listaDeReservatoriosBase, searchText, isShowingSitios]);

  const sitiosParaSidebar = useMemo(() => {
    if (!isShowingSitios || selectedReservatorioId === null) return [];
    let baseList = listaDeSitiosBase.filter(
      (s) => s.idreservatorio === selectedReservatorioId,
    );
    if (searchText) {
      const lowerCaseSearch = searchText.toLowerCase();
      baseList = baseList.filter(
        (item) =>
          item.nome.toLowerCase().includes(lowerCaseSearch) ||
          (item.descricao || "").toLowerCase().includes(lowerCaseSearch),
      );
    }
    return baseList;
  }, [listaDeSitiosBase, isShowingSitios, selectedReservatorioId, searchText]);

  const itemsParaMapa = useMemo(() => {
    if (isShowingSitios) {
      const baseSitios = listaDeSitiosBase.filter(
        (s) => s.idreservatorio === selectedReservatorioId,
      );
      if (selectedSitioId === "all") {
        return baseSitios;
      }
      return baseSitios.filter(
        (s) => `sitio-${s.idreservatorio}-${s.nome}` === selectedSitioId,
      );
    } else {
      if (selectedReservatorioId === null) {
        return reservatoriosParaSidebar;
      } else {
        return reservatoriosParaSidebar.filter(
          (r) => (r as Reservatorio).idreservatorio === selectedReservatorioId,
        );
      }
    }
  }, [
    isShowingSitios,
    selectedReservatorioId,
    selectedSitioId,
    listaDeSitiosBase,
    reservatoriosParaSidebar,
  ]);

  const filteredMapReservatorios = itemsParaMapa.filter(
    (item) => item.type === "reservatorio",
  ) as Reservatorio[];
  const filteredMapSitios = itemsParaMapa.filter(
    (item) => item.type === "sitio",
  ) as Sitio[];

  // Configurações de zoom e centro do mapa (Sem alterações)
  const mapSettings = useMemo(() => {
    if (selectedSitioId !== "all") {
      const item = sitios.find(
        (s) => `sitio-${s.idreservatorio}-${s.nome}` === selectedSitioId,
      );
      if (item && item.lat && item.lng) {
        return { center: [item.lat, item.lng] as [number, number], zoom: 12 };
      }
    }
    if (selectedReservatorioId !== null) {
      const item = reservatorios.find(
        (r) => r.idreservatorio === selectedReservatorioId,
      );
      if (item && item.lat && item.lng) {
        return { center: [item.lat, item.lng] as [number, number], zoom: 9 };
      }
    }
    return { center: INITIAL_CENTER, zoom: INITIAL_ZOOM };
  }, [selectedSitioId, selectedReservatorioId, reservatorios, sitios]);

  // --- RENDER ---

  // const popupStyles REMOVIDA

  if (loading) {
    return <div style={{ padding: "1rem" }}>Carregando mapa BALCAR...</div>;
  }

  return (
    <div className="map-layout-container">
      {/* <style> tag REMOVIDA */}

      <SidebarBalcar
        searchText={searchText}
        setSearchText={setSearchText}
        reservatorios={reservatoriosParaSidebar}
        sitios={sitiosParaSidebar}
        selectedReservatorioId={selectedReservatorioId}
        isShowingSitios={isShowingSitios}
        selectedSitioId={selectedSitioId}
        onReservatorioClick={handleReservatorioClick}
        onShowSitios={handleShowSitiosClick}
        onCloseSitios={handleCloseSitiosClick}
        onSitioClick={handleSitioClick}
      />

      <div className="map-main-area">
        <h1 className="map-main-title">
          Mapa de Localizações - Projeto BALCAR
        </h1>
        <MapContainer
          key={mapSettings.center.toString()}
          center={mapSettings.center}
          zoom={mapSettings.zoom}
          scrollWheelZoom={true}
          className="map-container-wrapper"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Marcadores de Reservatórios */}
          {filteredMapReservatorios.map((reservatorio) => {
            if (!reservatorio.lat || !reservatorio.lng) return null;
            // Lógica de imagem REMOVIDA
            return (
              <Marker
                key={reservatorio.idreservatorio}
                position={[reservatorio.lat, reservatorio.lng]}
              >
                <Popup className="custom-map-popup">
                  {/* Imagem REMOVIDA */}
                  <h3>Reservatório: {reservatorio.nome}</h3>
                  <p>ID: {reservatorio.idreservatorio}</p>
                  <p>Lat: {reservatorio.lat.toFixed(4)}</p>
                  <p>Lng: {reservatorio.lng.toFixed(4)}</p>
                </Popup>
              </Marker>
            );
          })}

          {/* Marcadores de Sítios */}
          {filteredMapSitios.map((sitio) => {
            const reservatorioNome =
              reservatorioNameMap[sitio.idreservatorio] || "Desconhecido";
            const markerKey = `sitio-${sitio.idreservatorio}-${sitio.nome}`;
            return sitio.lat && sitio.lng ? (
              <Marker
                key={markerKey}
                position={[sitio.lat, sitio.lng]}
                // prop 'icon' REMOVIDA
              >
                <Popup className="custom-map-popup">
                  <h3>Sítio: {sitio.nome}</h3>
                  <p>
                    Reservatório: {reservatorioNome} (ID: {sitio.idreservatorio})
                  </p>
                  <p>Lat: {sitio.lat.toFixed(4)}</p>
                  <p>Lng: {sitio.lng.toFixed(4)}</p>
                </Popup>
              </Marker>
            ) : null;
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default BalcarMap;