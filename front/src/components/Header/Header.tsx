import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

// --- asset imports
import govLogo from '../../assets/govLogo.png';
import inpeLogo from '../../assets/LogoInpe.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- nav link data
  const topNavLinks = [
    { label: 'Simplifique!', href: '#' },
    { label: 'Comunica BR', href: '#' },
    { label: 'Participe', href: '#' },
    { label: 'Acesso à informação', href: '#' },
    { label: 'Legislação', href: '#' },
    { label: 'Canais', href: '#' },
  ];


  // --- event handlers
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };


  return (
    <header className={styles.header}>
      {/* Top bar for desktop (Esta parte já estava correta) */}
      <nav className={styles.topNav}>
        <div className={styles.logoContainer}>
          <a href="#"><img src={govLogo} alt="gov.br logo" className={styles.govLogo} /></a>
        </div>
        <ul className={styles.topNavLinks}>
          {topNavLinks.map(link => (
            <li key={link.label}><a href={link.href} className={styles.topLink}>{link.label}</a></li>
          ))}
        </ul>
      </nav>

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
          <ul>
            {/* External links for mobile */}
            {topNavLinks.map(link => (
              <li key={link.label} className={styles.externalLinkItem}>
                <a href={link.href} onClick={handleLinkClick}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}