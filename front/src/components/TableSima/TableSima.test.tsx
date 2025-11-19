import { render, screen } from '@testing-library/react';
import { TabelaSima } from './TableSima';
import { describe, it, expect } from 'vitest';

describe('Componente TabelaSima', () => {
  it('deve exibir loading quando isLoading for true', () => {
    render(<TabelaSima data={[]} isLoading={true} />);
    expect(screen.getByText('Buscando dados...')).toBeInTheDocument();
  });

  it('deve exibir mensagem de vazio quando não houver dados', () => {
    render(<TabelaSima data={[]} isLoading={false} />);
    expect(screen.getByText(/Nenhum dado encontrado/i)).toBeInTheDocument();
  });

  it('deve renderizar cabeçalhos e linhas dinamicamente', () => {
    const mockData = [
      { nome: 'Rio A', nivel: 100 },
      { nome: 'Rio B', nivel: 200 }
    ];
    render(<TabelaSima data={mockData} />);

    // Cabeçalhos (em maiúsculo conforme componente)
    expect(screen.getByText('NOME')).toBeInTheDocument();
    expect(screen.getByText('NIVEL')).toBeInTheDocument();

    // Dados
    expect(screen.getByText('Rio A')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
  });
});