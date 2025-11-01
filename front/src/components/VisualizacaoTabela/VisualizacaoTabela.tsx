// src/components/VisualizacaoTabelas.tsx
import React from 'react';
import styles from '../VisualizacaoGrafico/Placeholder.module.css'; // Usaremos um CSS genérico

/**
 * Componente para exibir dados em formato de tabela.
 */
export default function VisualizacaoTabelas() {
  return (
    <div className={styles.placeholderContainer}>
      <h2>Visualização de Tabelas</h2>
      <p>Aqui é onde os componentes de tabela serão renderizados.</p>
      {/* Exemplo de tabela simples */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Item A</td>
            <td>100</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Item B</td>
            <td>200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}