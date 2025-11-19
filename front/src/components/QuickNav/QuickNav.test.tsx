import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import QuickNav from './QuickNav';
import { describe, it, expect } from 'vitest';

describe('Componente QuickNav', () => {
  it('deve renderizar quando a rota for /sima', () => {
    render(
      <MemoryRouter initialEntries={['/sima']}>
        <QuickNav />
      </MemoryRouter>
    );
    expect(screen.getByText('Página Inicial')).toBeInTheDocument();
    expect(screen.getByText('Mapa Interativo')).toBeInTheDocument();
  });

  it('NÃO deve renderizar quando a rota for outra (ex: /)', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <QuickNav />
      </MemoryRouter>
    );
    // queryByText retorna null se não achar (ao contrário de getByText que dá erro)
    expect(screen.queryByText('Página Inicial')).not.toBeInTheDocument();
  });
});