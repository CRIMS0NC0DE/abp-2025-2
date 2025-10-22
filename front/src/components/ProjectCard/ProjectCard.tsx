// src/components/ProjectCard/ProjectCard.tsx
import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  logoSrc: string;
  logoAlt: string;
  description: string;
  to: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ logoSrc, logoAlt, description, to }) => {
  return (
    <Link to={to} className={styles.cardLink}>
      <div className={styles.cardContainer}>
        <img src={logoSrc} alt={logoAlt} className={styles.logo} />
        <p className={styles.description}>
          {description}
        </p>
        <span className={styles.accessButton}>
          Acessar
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;