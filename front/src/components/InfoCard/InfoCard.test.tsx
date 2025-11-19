import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import InfoCard from './InfoCard';
import { describe, it, expect } from 'vitest';

describe('Componente InfoCard', () => {
  it('deve renderizar conteúdo e link corretamente', () => {
    render(
      <MemoryRouter>
        <InfoCard 
          title="Informação Importante" 
          text="Detalhes aqui" 
          imageSrc="img.png" 
          linkTo="/detalhes" 
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Informação Importante')).toBeInTheDocument();
    expect(screen.getByText('Detalhes aqui')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/detalhes');
  });
});