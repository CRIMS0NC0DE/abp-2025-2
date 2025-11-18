import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';
import { describe, it, expect, vi } from 'vitest';

describe('Componente SearchBar', () => {
  it('deve renderizar com o placeholder padrão', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
  });

  it('deve aceitar um placeholder customizado', () => {
    render(<SearchBar placeholder="Pesquisar boia..." />);
    expect(screen.getByPlaceholderText('Pesquisar boia...')).toBeInTheDocument();
  });

  it('deve permitir digitar no input', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText('Buscar...') as HTMLInputElement;
    
    // Simula o usuário digitando
    fireEvent.change(input, { target: { value: 'Furnas' } });
    
    expect(input.value).toBe('Furnas');
  });
});