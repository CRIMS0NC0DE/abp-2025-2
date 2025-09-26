import React from 'react';
// Caminho corrigido e nome do arquivo ajustado para minúsculo
import '../styles/card.css';

// Define as propriedades que o componente Card vai receber
interface CardProps {
  iconSrc: string;
  label: string;
  onClick?: () => void; // Opcional: para adicionar uma ação de clique
}

const Card: React.FC<CardProps> = ({ iconSrc, label, onClick }) => {
  return (
    <div className="card-container" onClick={onClick}>
      <img src={iconSrc} alt={`${label} icon`} className="card-icon" />
      <p className="card-label">{label}</p>
    </div>
  );
};

export default Card;