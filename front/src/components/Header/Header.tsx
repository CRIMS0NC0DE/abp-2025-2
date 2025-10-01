import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

// Importação dos logos
import govLogo from '../../assets/govLogo.png';
import inpeLogo from '../../assets/LogoInpe.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
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

      <div className={styles.subNav}>
        <div className={styles.leftContent}>
          <Link to="/" onClick={handleLinkClick}>
            <img src={inpeLogo} alt="INPE logo" className={styles.inpeLogo} />
          </Link>
          <span className={styles.inpeText}>INPE</span>
        </div>

        {/* Botão com classe condicional para animar o ícone */}
        <button 
          className={`${styles.hamburgerButton} ${isMenuOpen ? styles.open : ''}`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Abrir menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`${styles.mainNav} ${isMenuOpen ? styles.menuOpen : ''}`}>
          <ul>
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
          </ul>
        </nav>
      </div>
    </header>
  );
}