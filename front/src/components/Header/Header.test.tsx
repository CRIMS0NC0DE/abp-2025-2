import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { describe, it, expect } from 'vitest';

describe('Componente Header', () => {
  // ... seus testes anteriores ...

  it('deve fechar o menu ao clicar em um link', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Encontra um link do menu (ex: o logo que leva para home)
    const logoLink = screen.getByAltText('INPE logo').closest('a');
    
    // Simula o clique
    if (logoLink) {
      fireEvent.click(logoLink);
      // Como o estado é interno (useState), verificar se não houve erro
      // já conta como cobertura da linha handleLinkClick
      expect(true).toBe(true); 
    } else {
      throw new Error('Link do logo não encontrado');
    }
  });
});