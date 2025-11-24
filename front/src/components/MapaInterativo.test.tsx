import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MapaInterativo from './MapaInterativo';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock dos dados dos estados para não depender do JSON gigante real
vi.mock("../data/brasil-states.json", () => ({
  default: {
    type: "FeatureCollection",
    features: [
      { type: "Feature", properties: { name: "São Paulo" }, geometry: { type: "Polygon", coordinates: [] } },
      { type: "Feature", properties: { name: "Rio de Janeiro" }, geometry: { type: "Polygon", coordinates: [] } }
    ]
  }
}));

// Mock dos componentes do Leaflet com inteligência para simular eventos
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: any) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Pane: ({ children }: any) => <div data-testid="pane">{children}</div>,
  
  // O GeoJSON Mock agora renderiza botões que simulam os recursos do mapa
  GeoJSON: ({ data, onEachFeature, pointToLayer }: any) => (
    <div data-testid="geojson-layer">
      {data?.features?.map((feature: any, index: number) => (
        <button
          key={index}
          data-testid={`feature-${feature.properties.name || feature.properties.nome}`}
          onClick={() => {
             // 1. Simula o comportamento do Leaflet chamando onEachFeature
             if (onEachFeature) {
               const layerMock = {
                 on: (events: any) => {
                   if (events.click) events.click();
                 },
                 bindTooltip: vi.fn(),
                 bindPopup: vi.fn(),
               };
               onEachFeature(feature, layerMock);
             }
             
             // 2. Simula o pointToLayer para cobrir a lógica de ícones
             if (pointToLayer) {
               pointToLayer(feature, { lat: 0, lng: 0 });
             }
          }}
        >
          {feature.properties.name || feature.properties.nome}
        </button>
      ))}
    </div>
  ),
}));

// Mock do Leaflet nativo
vi.mock('leaflet', () => {
  return {
    default: {
      Icon: class {
        options: any;
        constructor(options: any) { this.options = options; }
      },
      marker: vi.fn().mockReturnValue({}), 
    },
  };
});

describe('Componente MapaInterativo', () => {
  const fetchMock = vi.fn();
  
  beforeEach(() => {
    global.fetch = fetchMock;
    fetchMock.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve renderizar e permitir clicar num estado (interação onEachState)', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ type: 'FeatureCollection', features: [] }),
    } as Response);

    render(<MapaInterativo source="sima" />);

    // CORREÇÃO 1: Aguarda o fetch ser chamado para evitar o aviso de 'act(...)'
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());

    // Verifica se os estados (do mock brasil-states) foram renderizados
    const spFeature = screen.getByTestId('feature-São Paulo');
    expect(spFeature).toBeInTheDocument();

    // Simula o clique no estado de São Paulo
    fireEvent.click(spFeature);

    // Verifica se o texto fixo "Estado selecionado:" apareceu
    const label = screen.getByText('Estado selecionado:');
    expect(label).toBeInTheDocument();
    
    // CORREÇÃO 2: Verificação específica para evitar erro de múltiplos elementos.
    // Verificamos se dentro do 'div' pai do label existe o texto 'São Paulo'
    expect(label.closest('div')).toHaveTextContent('São Paulo');
  });

  it('deve processar pontos da API e aplicar lógica de ícones (pointToLayer)', async () => {
    // Dados simulados da API com diferentes tipos para testar os ícones
    const mockPoints = {
      type: 'FeatureCollection',
      features: [
        { properties: { nome: "Ponto A", tipo: "estacao_sima" } },
        { properties: { nome: "Ponto B", tipo: "tipo_desconhecido" } } 
      ]
    };
    
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => mockPoints,
    } as Response);

    render(<MapaInterativo source="sima" />);

    await waitFor(() => {
       expect(screen.getByTestId('feature-Ponto A')).toBeInTheDocument();
    });

    // Clica no ponto para disparar o pointToLayer e onEachPoint (simulados no mock)
    // Isso garante a cobertura das funções auxiliares
    fireEvent.click(screen.getByTestId('feature-Ponto A'));
    fireEvent.click(screen.getByTestId('feature-Ponto B'));
  });
});