import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { describe, it, expect } from 'vitest';

describe('Componente Footer', () => {
  it('deve renderizar as seções de parceiros (INPE, SIMA, etc)', () => {
    render(<Footer />);
    
    expect(screen.getByText('INPE')).toBeInTheDocument();
    expect(screen.getByText('SIMA')).toBeInTheDocument();
    expect(screen.getByText('CRIMS0NC0DE')).toBeInTheDocument();
  });

  it('deve conter o link correto para o GitHub', () => {
    render(<Footer />);
    
    const githubLink = screen.getByAltText('GitHub').closest('a');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/CRIMS0NC0DE/abp-2025-2');
  });

  it('deve exibir o ano atual no copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText((content) => content.includes(currentYear))).toBeInTheDocument();
  });
});