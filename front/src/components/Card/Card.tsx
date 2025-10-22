import { Link } from 'react-router-dom';
import styles from './Card.module.css';

// Interface ajustada para refletir a necessidade do componente
interface CardProps {
  title: string;  // Usado tanto para o alt da imagem quanto para o label
  text: string;   // O texto descritivo do card
  imageSrc: string;
  linkTo: string;
}

export default function Card({ title, text, imageSrc, linkTo }: CardProps) {
  return (
    // Aplicando a classe 'cardLink' para o elemento Link
    <Link to={linkTo} className={styles.cardLink}>
      {/* Aplicando a classe 'cardContainer' para o container principal */}
      <div className={styles.cardContainer}>
        {/* Aplicando a classe 'cardIcon' para a imagem */}
        <img src={imageSrc} alt={`Ícone para ${title}`} className={styles.cardIcon} />
        {/* Aplicando a classe 'cardLabel' para o título/label */}
        <h3 className={styles.cardLabel}>{title}</h3>
        {/* O texto descritivo não tinha uma classe específica no seu CSS, 
            então o renderizamos sem uma classe modular por enquanto, 
            permitindo que herde estilos globais se houver. */}
        <p>{text}</p>
      </div>
    </Link>
  );
}