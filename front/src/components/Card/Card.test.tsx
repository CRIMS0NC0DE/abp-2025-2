import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';
import { describe, it, expect } from 'vitest';

describe('Componente Card', () => {
  it('deve renderizar o título, texto e imagem corretamente', () => {
    const props = {
      title: 'Monitoramento',
      text: 'Dados em tempo real',
      imageSrc: '/img/icon.png',
      linkTo: '/dashboard'
    };

    // Usamos MemoryRouter porque o Card contém um <Link>
    render(
      <MemoryRouter>
        <Card {...props} />
      </MemoryRouter>
    );

    // Verifica se o título está visível
    expect(screen.getByText('Monitoramento')).toBeInTheDocument();
    
    // Verifica se a descrição está visível
    expect(screen.getByText('Dados em tempo real')).toBeInTheDocument();

    // Verifica a imagem e seu atributo alt
    const img = screen.getByAltText('Ícone para Monitoramento');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/img/icon.png');
  });

  it('deve manter o layout visual inalterado (Snapshot)', () => {
    const { container } = render(
      <MemoryRouter>
        <Card title="Snapshot" text="Teste Visual" imageSrc="img.png" linkTo="#" />
      </MemoryRouter>
    );
    // Isso cria um arquivo __snapshots__ na pasta. 
    // Se alguém mudar o CSS ou HTML do Card no futuro, esse teste falha!
    expect(container).toMatchSnapshot(); 
  });

  it('deve manter a estrutura visual inalterada (Snapshot)', () => {
    const { container } = render(
      <MemoryRouter>
        <Card 
          title="Snapshot Test" 
          text="Verificando layout" 
          imageSrc="img.png" 
          linkTo="/test" 
        />
      </MemoryRouter>
    );
    // Cria um arquivo de "foto" do componente na pasta __snapshots__
    expect(container).toMatchSnapshot();
  });
});