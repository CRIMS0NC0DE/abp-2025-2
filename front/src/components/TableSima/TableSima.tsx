import React from 'react';
import './TableSima.css';

// Define uma interface genérica para os dados da linha
// 'Record<string, any>' significa "um objeto com chaves string e valores de qualquer tipo"
interface RowData {
  [key: string]: any;
}

interface TabelaSimaProps {
  data: RowData[];
  isLoading?: boolean; // Opcional: para mostrar um feedback de carregamento
}

export const TabelaSima: React.FC<TabelaSimaProps> = ({ data, isLoading }) => {
  // Se estiver carregando, mostre uma mensagem
  if (isLoading) {
    return (
      <div className="tabela-container loading">
        <p>Buscando dados...</p>
      </div>
    );
  }

  // Se não houver dados (array vazio), mostre uma mensagem amigável
  if (!data || data.length === 0) {
    return (
      <div className="tabela-container empty">
        <p>Nenhum dado encontrado. Tente aplicar filtros diferentes.</p>
      </div>
    );
  }

  // Pega os cabeçalhos dinamicamente do PRIMEIRO item dos dados
  // Isso torna a tabela reutilizável para qualquer tipo de dado
  const headers = Object.keys(data[0]);

  return (
    // Este 'div' container é crucial para a barra de rolagem horizontal
    <div className="tabela-container">
      <table className="tabela-sima">
        <thead>
          <tr>
            {/* Mapeia os nomes das colunas para o cabeçalho */}
            {headers.map((header) => (
              <th key={header}>{header.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Mapeia cada item do array de dados para uma linha <tr> */}
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* Mapeia cada valor da linha para uma célula <td> */}
              {headers.map((header) => (
                <td key={`${rowIndex}-${header}`}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
