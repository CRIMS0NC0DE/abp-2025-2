import { render, screen } from '@testing-library/react';
import { ChartMapOccurrence } from './ChartMapOccurrence';
import { describe, it, expect, vi } from 'vitest';

// Mock do React Leaflet
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: any) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }: any) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }: any) => <div data-testid="popup">{children}</div>,
}));

describe('Componente ChartMapOccurrence', () => {
  it('deve renderizar o mapa e os marcadores', () => {
    render(<ChartMapOccurrence />);

    // Verifica se o container do mapa está presente
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    
    // Verifica se o TileLayer foi renderizado
    expect(screen.getByTestId('tile-layer')).toBeInTheDocument();

    // Como há 5 ocorrências fixas no código (mockadas no componente), esperamos 5 marcadores
    const markers = screen.getAllByTestId('marker');
    expect(markers).toHaveLength(5);
  });
});