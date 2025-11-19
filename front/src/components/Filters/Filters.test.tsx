import { render, screen, fireEvent } from '@testing-library/react';
import Filters from './Filters';
import { describe, it, expect, vi } from 'vitest';

describe('Componente Filters', () => {
  it('deve atualizar os inputs ao digitar', () => {
    const handleChange = vi.fn();
    render(<Filters onChange={handleChange} />);

    const instInput = screen.getByPlaceholderText('Instituição');
    fireEvent.change(instInput, { target: { value: 'INPE' } });
    
    expect(instInput).toHaveValue('INPE');
  });

  it('deve enviar os dados ao clicar em Filtrar', () => {
    const handleChange = vi.fn();
    render(<Filters onChange={handleChange} />);

    fireEvent.click(screen.getByText('Filtrar'));
    expect(handleChange).toHaveBeenCalled();
  });

  // Este é o teste novo que cobre as linhas 31-33
  it('deve limpar os campos e resetar o filtro ao clicar em Limpar', () => {
    const handleChange = vi.fn();
    render(<Filters onChange={handleChange} />);

    const input = screen.getByPlaceholderText('Instituição');
    
    // Suja o input
    fireEvent.change(input, { target: { value: 'Teste' } });
    expect(input).toHaveValue('Teste');

    // Clica em Limpar
    fireEvent.click(screen.getByText('Limpar'));

    // Verifica limpeza
    expect(input).toHaveValue('');
    expect(handleChange).toHaveBeenCalledWith({});
  });
});