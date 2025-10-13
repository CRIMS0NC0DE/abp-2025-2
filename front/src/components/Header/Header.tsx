import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
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

  const mainNavLinks = [
    { label: 'Home', to: '/' },
    { label: 'Mapa', to: '/mapa' },
    { label: 'Tabela', to: '/tabelas' },
    { label: 'SIMA', to: '/sima' },
    { label: 'Download', to: '/exportar-csv' },
  ];

  // --- event handlers
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className={styles.header}>
      {/* Top bar for desktop */}
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

      {/* Main navigation bar (blue) */}
      <div className={styles.subNav}>
        <div className={styles.leftContent}>
          <Link to="/" onClick={handleLinkClick}>
            <img src={inpeLogo} alt="INPE logo" className={styles.inpeLogo} />
          </Link>
          <span className={styles.inpeText}>INPE</span>
        </div>

        <button
          className={`${styles.hamburgerButton} ${isMenuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Navigation container */}
        <nav className={`${styles.mainNav} ${isMenuOpen ? styles.menuOpen : ''}`}>
          <ul>
            {/* Internal app navigation */}
            {mainNavLinks.map(link => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => isActive ? styles.active : ''}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}

            
            
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