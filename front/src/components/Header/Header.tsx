import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

// --- asset imports
import govLogo from '../../assets/govLogo.png';
import inpeLogo from '../../assets/LogoInpe.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- event handlers
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };


  return (
    <header className={styles.header}>
      {/* Main navigation bar (blue) - ATUALIZADA */}
      <div className={styles.subNav}>
        <div className={styles.leftContent}>
          
          {/* LOGO INPE */}
          <Link to="/" onClick={handleLinkClick}>
            <img src={inpeLogo} alt="INPE logo" className={styles.inpeLogo} />
          </Link>

          {/* TÍTULO DO PORTAL ATUALIZADO */}
          <span className={styles.portalTitle}>
            Portal para Visualização e Disseminação de Dados Limnológicos
          </span>
        </div>

        {/* Navigation container (Mantido) */}
        <nav className={`${styles.mainNav} ${isMenuOpen ? styles.menuOpen : ''}`}>
        </nav>
      </div>
    </header>
  );
}