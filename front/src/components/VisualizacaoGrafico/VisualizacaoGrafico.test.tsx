import { render, screen } from '@testing-library/react';
import VisualizacaoGraficos from './VisualizacaoGrafico';
import { describe, it, expect } from 'vitest';

describe('Componente VisualizacaoGraficos', () => {
  it('deve renderizar o placeholder de gráfico', () => {
    render(<VisualizacaoGraficos />);
    
    expect(screen.getByText('Visualização de Gráficos')).toBeInTheDocument();
    expect(screen.getByText(/Aqui é onde os componentes/i)).toBeInTheDocument();
  });
});