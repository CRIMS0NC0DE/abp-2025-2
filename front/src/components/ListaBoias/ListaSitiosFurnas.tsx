import React from 'react';
import styles from './ListaBoiasCard.module.css';

export interface TipoBoia {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
}

interface Props {
  boias: TipoBoia[]; // A lista de bóias que vem do "banco de dados"
  onBuoySelect: (id: string) => void; // Função para executar quando clicamos
  selectedBuoyId: string | null; // O ID da bóia que está selecionada
}

/**
 * Um card que exibe uma lista de bóias interativas.
 */
export default function ListaBoiasCard({ boias, onBuoySelect, selectedBuoyId }: Props) {
  return (
    <div className={styles.cardContainer}>
      <h3 className={styles.title}>Lista de Sítios</h3>
      <ul className={styles.list}>
        {/* 2. Renderização da Lista */}
        {boias.map((boia) => {
          // Verifica se esta bóia é a que está selecionada
          const isSelected = boia.id === selectedBuoyId;
          
          // Aplica uma classe CSS diferente se estiver selecionada
          const itemClassName = isSelected 
            ? `${styles.listItem} ${styles.selectedItem}` 
            : styles.listItem;

          return (
            <li
              key={boia.id}
              className={itemClassName}
              onClick={() => onBuoySelect(boia.id)}
            >
              {boia.nome}
            </li>
          );
        })}
      </ul>
    </div>
  );
}