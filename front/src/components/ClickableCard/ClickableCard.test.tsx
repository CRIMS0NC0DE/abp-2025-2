import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ClickableCard from './ClickableCard';
import { describe, it, expect, vi } from 'vitest';

// Mock Atualizado: Renderiza botões separados para simular o ciclo de vida da animação
vi.mock('../Modal/Modal', () => ({
  default: ({ isOpen, children, onClose, onTransitionEnd }: any) => (
    <div data-testid="modal-mock">
      {/* Mostra o estado atual para debug e verificação */}
      <span data-testid="modal-state">{isOpen ? 'ABERTO' : 'FECHANDO'}</span>
      
      <button onClick={onClose}>Fechar Modal</button>
      
      {/* Simula o fim da animação CSS */}
      <button onClick={onTransitionEnd}>Fim da Transição</button>
      
      {children}
    </div>
  )
}));

describe('Componente ClickableCard', () => {
  it('deve desmontar o modal somente após o fim da transição', async () => {
    render(
      <ClickableCard 
        title="Card Teste" 
        iconSrc="icon.png" 
        modalContent={<p>Conteúdo Secreto</p>} 
      />
    );

    // 1. Abre o modal
    fireEvent.click(screen.getByText('Card Teste'));
    await waitFor(() => {
      expect(screen.getByTestId('modal-mock')).toBeInTheDocument();
      expect(screen.getByTestId('modal-state')).toHaveTextContent('ABERTO');
    });

    // 2. Inicia o fechamento (Isso seta isModalOpen = false, mas isModalMounted ainda é true)
    fireEvent.click(screen.getByText('Fechar Modal'));

    // Aguarda o componente reagir à mudança de estado (Modal deve receber isOpen=false)
    await waitFor(() => {
      expect(screen.getByTestId('modal-state')).toHaveTextContent('FECHANDO');
    });

    // 3. Dispara o fim da transição. 
    // Agora handleTransitionEnd vai ler isModalOpen como false e desmontar o componente.
    fireEvent.click(screen.getByText('Fim da Transição'));

    // 4. Verifica se sumiu da DOM completamente
    await waitFor(() => {
      expect(screen.queryByTestId('modal-mock')).not.toBeInTheDocument();
    });
  });
});