import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

// Importação dos logos
import govLogo from '../../assets/govLogo.png';
import inpeLogo from '../../assets/LogoInpe.png';

// Header refatorado com layout de duas barras e navegação principal integrada.
export default function Header() {
  // Links para a barra superior (links externos/institucionais)
  const topNavLinks = [
    { label: 'Simplifique!', href: '#' },
    { label: 'Comunica BR', href: '#' },
    { label: 'Participe', href: '#' },
    { label: 'Acesso à informação', href: '#' },
    { label: 'Legislação', href: '#' },
    { label: 'Canais', href: '#' },
  ];

  // Links para a navegação principal da aplicação
  const mainNavLinks = [
    { label: 'Home', to: '/' },
    { label: 'Mapa', to: '/mapa' },
    { label: 'Tabela', to: '/tabelas' },
    { label: 'SIMA', to: '/sima' },
    { label: 'Download', to: '/exportar-csv' },
  ];

  return (
    <header className={styles.header}>
      {/* Barra de navegação superior (branca) */}
      <nav className={styles.topNav}>
        <div className={styles.logoContainer}>
          <a href="#">
            <img src={govLogo} alt="gov.br logo" className={styles.govLogo} />
          </a>
        </div>
        <ul className={styles.topNavLinks}>
          {topNavLinks.map(link => (
            <li key={link.label}><a href={link.href} className={styles.topLink}>{link.label}</a></li>
          ))}
        </ul>
      </nav>

      {/* Barra de navegação inferior (azul) - Principal */}
      <div className={styles.subNav}>
        <div className={styles.leftContent}>
          <Link to="/">
            <img src={inpeLogo} alt="INPE logo" className={styles.inpeLogo} />
          </Link>
          <span className={styles.inpeText}>INPE</span>
        </div>

        {/* Navegação principal da aplicação */}
        <nav className={styles.mainNav}>
          <ul>
            {mainNavLinks.map(link => (
              <li key={link.label}>
                <NavLink 
                  to={link.to} 
                  className={({ isActive }) => isActive ? styles.active : ''}
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