import { Link } from 'react-router-dom';
import styles from './Card.module.css';

// Props para o componente Card
interface CardProps {
  iconSrc: string;
  label: string;
  to: string; // URL de destino do card
}

// Componente reutilizável para os cards da homepage.
// Envolvido por um Link para navegação.
const Card: React.FC<CardProps> = ({ iconSrc, label, to }) => {
  return (
    <Link to={to} className={styles.cardLink}>
      <div className={styles.cardContainer}>
        <img src={iconSrc} alt={`${label} icon`} className={styles.cardIcon} />
        <p className={styles.cardLabel}>{label}</p>
      </div>
    </Link>
  );
};

export default Card;