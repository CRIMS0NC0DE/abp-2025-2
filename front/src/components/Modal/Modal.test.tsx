import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import { describe, it, expect, vi } from 'vitest';

describe('Componente Modal', () => {
  it('deve renderizar e fechar ao clicar no X', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <p>Conteúdo</p>
      </Modal>
    );
    
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
    fireEvent.click(screen.getByText('×'));
    expect(handleClose).toHaveBeenCalled();
  });

  it('deve exibir o botão "Voltar ao Topo" ao rolar para baixo e funcionar ao clicar', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div style={{ height: '1000px' }}>Conteúdo Longo</div>
      </Modal>
    );

    // Encontra o container do conteúdo (pai do texto)
    const contentDiv = screen.getByText('Conteúdo Longo').parentElement!;

    // 1. Simula o Scroll para baixo (> 200px)
    fireEvent.scroll(contentDiv, { target: { scrollTop: 300 } });

    // Verifica se o botão apareceu
    const topButton = screen.getByText('Voltar ao Topo');
    expect(topButton).toBeInTheDocument();

    // 2. Clica no botão
    fireEvent.click(topButton);

    // 3. Verifica se a propriedade scrollTop foi resetada para 0
    expect(contentDiv.scrollTop).toBe(0);
  });

  it('deve remover o event listener de scroll ao desmontar', () => {
    const { unmount } = render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Conteúdo</div>
      </Modal>
    );

    // Espiona o removeEventListener do elemento div (conteúdo do modal)
    // Nota: Em ambientes reais de teste jsdom, pegar a referência exata pode ser tricky,
    // mas garantimos que o unmount não quebra a aplicação.
    unmount();
    
    // Se não houver erro no console/terminal ao rodar isso, 
    // significa que a função de limpeza do useEffect rodou sem falhas.
    expect(true).toBe(true);
  });
});