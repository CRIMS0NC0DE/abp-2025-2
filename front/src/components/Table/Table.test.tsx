import { render, screen } from '@testing-library/react';
import Table from './Table';
import { describe, it, expect } from 'vitest';

describe('Componente Table', () => {
  it('deve exibir mensagem de carregando', () => {
    render(<Table data={[]} loading={true} />);
    expect(screen.getByText(/Carregando/i)).toBeInTheDocument();
  });

  it('deve exibir mensagem quando não há registros', () => {
    render(<Table data={[]} loading={false} />);
    expect(screen.getByText('Nenhum registro encontrado')).toBeInTheDocument();
  });

  it('deve renderizar os dados corretamente', () => {
    // Mock de dados compatível com a interface Measurement
    const mockData = [
      {
        id: 1,
        station: 'Estação Teste',
        parameter: 'Temperatura',
        measured_at: '2025-01-01T12:00:00Z',
        value: 25.5,
        unit: '°C'
      }
    ];

    render(<Table data={mockData} loading={false} />);

    expect(screen.getByText('Estação Teste')).toBeInTheDocument();
    expect(screen.getByText('25.5')).toBeInTheDocument();
    expect(screen.getByText('°C')).toBeInTheDocument();
  });
});