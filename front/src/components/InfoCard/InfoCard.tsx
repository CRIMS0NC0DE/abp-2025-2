import { Link } from 'react-router-dom';
import styles from './InfoCard.module.css';

interface InfoCardProps {
  title: string;
  text: string;
  imageSrc: string;
  linkTo: string;
}

export default function InfoCard({ title, text, imageSrc, linkTo }: InfoCardProps) {
  return (
    <Link to={linkTo} className={styles.card}>
      <div className={styles.cardImageContainer}>
        <img src={imageSrc} alt={`Ícone para ${title}`} className={styles.cardImage} />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardText}>{text}</p>
      </div>
    </Link>
  );
}