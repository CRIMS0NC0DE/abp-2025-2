import { render, screen } from '@testing-library/react';
import { ChartLineTemporal } from './ChartLineTemporal';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Mock do Recharts (mesmo padrão do ChartBarEvents)
vi.mock('recharts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('recharts')>();
  return {
    ...actual,
    ResponsiveContainer: ({ children }: React.PropsWithChildren<unknown>) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    LineChart: ({ children }: React.PropsWithChildren<unknown>) => (
      <div data-testid="line-chart">{children}</div>
    ),
    Line: () => <div data-testid="line" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Legend: () => <div data-testid="legend" />,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
  };
});

describe('Componente ChartLineTemporal', () => {
  it('deve renderizar o gráfico de linhas corretamente', () => {
    const mockData = [
      { name: 'Jan', focos: 10, alertas: 5 },
      { name: 'Fev', focos: 20, alertas: 8 },
    ];

    render(<ChartLineTemporal data={mockData} />);

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('deve renderizar mesmo sem dados (array vazio)', () => {
    render(<ChartLineTemporal data={[]} />);
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });
});