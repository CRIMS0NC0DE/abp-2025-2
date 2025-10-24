import React from 'react';
import { Link } from 'react-router-dom';
import styles from './QuickNav.module.css';

// Importando imagens de exemplo do seu projeto.
// Troque 'simaIcon' pela imagem correta da "Página Inicial" se for diferente.
import homeIcon from '../../assets/sima-icon.png';
import mapIcon from '../../assets/map-icon.png';

const QuickNav: React.FC = () => {
  return (
    <nav className={styles.quickNavContainer}>
      <Link to="/" className={styles.navLink} title="Página Inicial">
        <img src={homeIcon} alt="Página Inicial" className={styles.navIcon} />
        <span className={styles.navLabel}>Página Inicial</span>
      </Link>
      <Link to="/map" className={styles.navLink} title="Mapa Interativo">
        <img src={mapIcon} alt="Mapa Interativo" className={styles.navIcon} />
        <span className={styles.navLabel}>Mapa Interativo</span>
      </Link>
    </nav>
  );
};

export default QuickNav;