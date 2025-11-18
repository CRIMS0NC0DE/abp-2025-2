import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { describe, it, expect } from 'vitest';

describe('Componente ProjectCard', () => {
  it('deve renderizar as informações do projeto', () => {
    render(
      <MemoryRouter>
        <ProjectCard 
          logoSrc="logo.png" 
          logoAlt="Logo Projeto" 
          description="Descrição do Projeto X" 
          to="/projeto-x"
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Descrição do Projeto X')).toBeInTheDocument();
    expect(screen.getByAltText('Logo Projeto')).toBeInTheDocument();
    // Verifica se o botão de acessar está presente
    expect(screen.getByText('Acessar')).toBeInTheDocument();
  });
});