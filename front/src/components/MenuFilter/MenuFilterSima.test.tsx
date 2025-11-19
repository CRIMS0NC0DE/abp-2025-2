import { render, screen, fireEvent } from '@testing-library/react';
import { FilterMenu } from './MenuFilterSima';
import { describe, it, expect, vi } from 'vitest';

describe('Componente FilterMenu', () => {
  it('deve permitir selecionar opções e aplicar filtros básicos', () => {
    const handleApply = vi.fn();
    render(<FilterMenu onApplyFilters={handleApply} />);

    fireEvent.change(screen.getByLabelText(/Reservatório/i), { target: { value: 'tucurui' } });
    fireEvent.click(screen.getByText('Aplicar Filtros'));

    expect(handleApply).toHaveBeenCalledWith(expect.objectContaining({
      reservatorio: 'tucurui'
    }));
  });

  it('deve permitir preencher e submeter o formulário de gráficos', () => {
    // Espiona o console.log pois a função original apenas imprime no console
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<FilterMenu />);

    // Seleciona sensor e período
    fireEvent.change(screen.getByLabelText(/Sensor de/i), { target: { value: 'ph' } });
    fireEvent.change(screen.getByLabelText(/Período/i), { target: { value: 'mensal' } });

    // Clica em gerar gráfico
    fireEvent.click(screen.getByText('Gerar Gráfico'));

    // Verifica se a lógica foi executada
    expect(consoleSpy).toHaveBeenCalledWith('Gerar gráfico com:', expect.objectContaining({
      sensor: 'ph',
      periodo: 'mensal'
    }));

    consoleSpy.mockRestore();
  });

  it('deve acionar a lógica do mapa interativo', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<FilterMenu />);

    fireEvent.click(screen.getByText('Mapa Interativo'));

    expect(consoleSpy).toHaveBeenCalledWith('Abrir mapa interativo');
    
    consoleSpy.mockRestore();
  });
});