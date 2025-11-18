import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './Filters';
import { describe, it, expect, vi } from 'vitest';

describe('Componente Filters', () => {
  it('deve permitir preencher os campos e aplicar o filtro', () => {
    const handleChange = vi.fn();
    render(<Filters onChange={handleChange} />);

    // Simula digitação nos inputs
    fireEvent.change(screen.getByPlaceholderText('Instituição'), { target: { value: 'INPE' } });
    fireEvent.change(screen.getByPlaceholderText('Reservatório'), { target: { value: 'Furnas' } });

    // Clica em Filtrar
    fireEvent.click(screen.getByText('Filtrar'));

    // Verifica se a função foi chamada com os dados corretos
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
      institution: 'INPE',
      reservoir: 'Furnas'
    }));
  });

  it('deve limpar os campos ao clicar em Limpar', () => {
    const handleChange = vi.fn();
    render(<Filters onChange={handleChange} />);

    const inputInst = screen.getByPlaceholderText('Instituição') as HTMLInputElement;
    fireEvent.change(inputInst, { target: { value: 'Teste' } });

    // Clica em Limpar
    fireEvent.click(screen.getByText('Limpar'));

    // Verifica se o input limpou e a função foi chamada vazia
    expect(inputInst.value).toBe('');
    expect(handleChange).toHaveBeenCalledWith({});
  });
});