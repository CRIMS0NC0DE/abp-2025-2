import { render, screen, fireEvent } from '@testing-library/react';
import { FilterMenu } from './MenuFilterSima';
import { describe, it, expect, vi } from 'vitest';

describe('Componente FilterMenu', () => {
  // Teste 1: Garante que tudo (incluindo a parte de gráficos) foi renderizado
  it('deve renderizar todas as seções (Parâmetros, Gráficos, Mapa)', () => {
    render(<FilterMenu />);
    expect(screen.getByText('Parâmetros Básicos')).toBeInTheDocument();
    expect(screen.getByText('Gráficos')).toBeInTheDocument();
    expect(screen.getByText('Mapa Interativo')).toBeInTheDocument();
  });

  // Teste 2: Testa a primeira aba (Filtros Básicos)
  it('deve permitir selecionar opções e aplicar filtros básicos', () => {
    const handleApply = vi.fn();
    render(<FilterMenu onApplyFilters={handleApply} />);

    fireEvent.change(screen.getByLabelText(/Reservatório/i), { target: { value: 'tucurui' } });
    fireEvent.click(screen.getByText('Aplicar Filtros'));

    expect(handleApply).toHaveBeenCalledWith(expect.objectContaining({
      reservatorio: 'tucurui'
    }));
  });

  // Teste 3: Testa a segunda aba (Gráficos) - AQUI ESTAVA O BURACO
  it('deve processar o formulário de gráficos', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<FilterMenu />);

    fireEvent.change(screen.getByLabelText(/Sensor de/i), { target: { value: 'ph' } });
    fireEvent.change(screen.getByLabelText(/Período/i), { target: { value: 'mensal' } });
    
    fireEvent.click(screen.getByText('Gerar Gráfico'));

    expect(consoleSpy).toHaveBeenCalledWith('Gerar gráfico com:', expect.objectContaining({
      sensor: 'ph',
      periodo: 'mensal'
    }));
    
    consoleSpy.mockRestore();
  });

  // Teste 4: Testa o botão isolado do Mapa
  it('deve acionar a lógica do mapa interativo', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<FilterMenu />);

    fireEvent.click(screen.getByText('Mapa Interativo'));

    expect(consoleSpy).toHaveBeenCalledWith('Abrir mapa interativo');
    consoleSpy.mockRestore();
  });
});