import { render, screen } from '@testing-library/react';
import { ChartBarEvents } from './ChartBarEvents'; // Corrigido: Importação nomeada com {}
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Mock do Recharts com tipagem correta para evitar o erro 'Unexpected any'
vi.mock('recharts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('recharts')>();
  return {
    ...actual,
    // Substitui 'any' por tipos genéricos de React
    ResponsiveContainer: ({ children }: React.PropsWithChildren<unknown>) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    BarChart: ({ children }: React.PropsWithChildren<unknown>) => (
      <div data-testid="bar-chart">{children}</div>
    ),
    // Componentes simples podem retornar null ou divs vazias
    Bar: () => <div data-testid="bar" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Legend: () => <div data-testid="legend" />,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
  };
});

describe('Componente ChartBarEvents', () => {
  it('deve renderizar o gráfico com os dados fornecidos', () => {
    const mockData = [
      { name: 'Jan', uv: 4000, pv: 2400 },
      { name: 'Fev', uv: 3000, pv: 1398 },
    ];

    render(<ChartBarEvents data={mockData} />);

    // Verifica se o container responsivo e o gráfico foram renderizados
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
  });
});