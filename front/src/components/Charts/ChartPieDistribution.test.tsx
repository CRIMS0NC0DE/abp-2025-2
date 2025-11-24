import { render, screen } from '@testing-library/react';
import { ChartPieDistribution } from './ChartPieDistribution';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

vi.mock('recharts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('recharts')>();
  return {
    ...actual,
    ResponsiveContainer: ({ children }: React.PropsWithChildren<unknown>) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    PieChart: ({ children }: React.PropsWithChildren<unknown>) => (
      <div data-testid="pie-chart">{children}</div>
    ),
    Pie: ({ children }: React.PropsWithChildren<unknown>) => (
      <div data-testid="pie">{children}</div>
    ),
    Cell: () => <div data-testid="cell" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Legend: () => <div data-testid="legend" />,
  };
});

describe('Componente ChartPieDistribution', () => {
  it('deve renderizar o gráfico de pizza corretamente', () => {
    const mockData = [
      { name: 'Grupo A', value: 400 },
      { name: 'Grupo B', value: 300 },
    ];

    render(<ChartPieDistribution data={mockData} />);

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    // Verifica se o Pie renderizou os filhos (Cells) mockados se necessário, 
    // ou apenas a presença do container principal
  });
});