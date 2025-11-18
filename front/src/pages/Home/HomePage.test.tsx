import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';

// Mockamos o ProjectCard para manter o foco na Home
vi.mock('../../components/ProjectCard/ProjectCard', () => ({
  default: ({ logoAlt }: any) => <div data-testid="project-card">{logoAlt}</div>
}));

describe('Página Home', () => {
  // Habilita o controle do tempo antes dos testes
  beforeEach(() => {
    vi.useFakeTimers();
  });

  // Restaura o tempo normal depois dos testes para não bugar outros arquivos
  afterEach(() => {
    vi.useRealTimers();
  });

  it('deve alternar os slides do carrossel automaticamente a cada 4 segundos', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    // 1. Verifica o Primeiro Slide (Estado Inicial)
    expect(screen.getByText('Inovação')).toBeInTheDocument();
    expect(screen.queryByText('Tecnologia Nacional')).not.toBeInTheDocument();

    // 2. Avança o tempo em 4 segundos (4000ms)
    // Usamos 'act' porque a mudança de tempo causa atualização de estado no React
    act(() => {
      vi.advanceTimersByTime(4000);
    });

    // 3. Verifica se mudou para o Segundo Slide
    expect(screen.getByText('Tecnologia Nacional')).toBeInTheDocument();

    // 4. Avança mais 4 segundos
    act(() => {
      vi.advanceTimersByTime(4000);
    });

    // 5. Verifica o Terceiro Slide
    expect(screen.getByText('Cooperação')).toBeInTheDocument();
  });

  it('deve renderizar os cards estáticos corretamente', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    expect(screen.getByText('Logo SIMA')).toBeInTheDocument();
  });
});