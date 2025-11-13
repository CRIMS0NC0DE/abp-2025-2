import { Table2 } from 'lucide-react';

// Importe o arquivo CSS
import './styles.css';

export function Placeholder() {
  return (
    <div className="placeholder-container">
      <div className="placeholder-content">
        <Table2 className="placeholder-icon" />
        <h2 className="placeholder-title">Nenhuma tabela selecionada</h2>
        <p className="placeholder-text">Selecione uma tabela no menu ao lado para começar a visualizar os dados.</p>
      </div>
    </div>
  );
}