import { render, screen, fireEvent } from '@testing-library/react';
import ListaBoiasCard, { TipoBoia } from './ListaSitiosFurnas';
import { describe, it, expect, vi } from 'vitest';

const mockBoias: TipoBoia[] = [
  { id: '1', nome: 'Boia Alpha', latitude: 0, longitude: 0 },
  { id: '2', nome: 'Boia Beta', latitude: 0, longitude: 0 }
];

describe('Componente ListaSitiosFurnas', () => {
  it('deve renderizar a lista de boias', () => {
    render(
      <ListaBoiasCard 
        boias={mockBoias} 
        onBuoySelect={() => {}} 
        selectedBuoyId={null} 
      />
    );

    expect(screen.getByText('Boia Alpha')).toBeInTheDocument();
    expect(screen.getByText('Boia Beta')).toBeInTheDocument();
  });

  it('deve chamar onBuoySelect ao clicar em um item', () => {
    const handleSelect = vi.fn();
    render(
      <ListaBoiasCard 
        boias={mockBoias} 
        onBuoySelect={handleSelect} 
        selectedBuoyId={null} 
      />
    );

    fireEvent.click(screen.getByText('Boia Beta'));
    expect(handleSelect).toHaveBeenCalledWith('2');
  });
});