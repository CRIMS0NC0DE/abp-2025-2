import Card from '../../components/Card/Card';
import { Link, NavLink } from 'react-router-dom';
import styles from './Balcar.module.css';
import { useState } from 'react';

import logoBalcar from '../../assets/LogoBalcar.png';
import logoFurnas from '../../assets/LogoFurnas.png';
import logoSima from '../../assets/LogoSIMA.png';
import logoGov from '../../assets/govLogo.png';
import logoInpe from '../../assets/LogoInpe.png';


export default function Balcar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainNavLinks = [
    { label: 'Home', to: '/' },
    { label: 'Início', to: '/Balcar' },
    { label: 'Banco de Dados', to: '/MapaInterativo' },
    { label: 'Publicações', to: '/' },
    { label: 'SIMA', to: '/' },
    { label: 'FURNAS', to: '/Furnas' },
  ];

  // --- MUDANÇA ---
  // Adicionei a propriedade 'imgSrc' em cada objeto.
  const gridCards = [
    { text: 'Objetivos Gerais', to: '/objetivos'},
    { text: 'Introdução', to: '/introducao'},
    { text: 'Metodologia', to: '/metodologia'},
    { text: 'Resultados Esperados', to: '/resultados'},
    { text: 'Panorama', to: '/panorama'},
    { text: 'Usinas Hidrelétricas', to: '/usinas'},
    { text: 'Pesquisas Correlatadas', to: '/pesquisas'},
    { text: 'Links', to: '/links',},
  ];


  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      {/* SEU CÓDIGO DO CABEÇALHO (NAV) */}
      <div className={styles.subHead}>
        <button
          className={`${styles.hamburgerButton} ${isMenuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
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

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className={styles.contentArea}>
        
        {/* Título da Página */}
        <header className={styles.pageHeader}>
          <div className={styles.headerLogoLeft}>
            <img src={logoBalcar} alt="Logo Projeto Balcar" /> 
          </div>
          <h1>O Balanço de Carbono nos Reservatórios<br />de FURNAS Centrais Elétricas S.A.</h1>
          <div className={styles.headerLogoRight}>
           <Link to="/sima" aria-label="Ir para a página SIMA">
              <img className={styles.headerLogoRight1} src={logoSima} alt="Logo SIMA" />
            </Link>
            <Link to="/furnas" aria-label="Ir para a página FURNAS">
              <img className={styles.headerLogoRight2} src={logoFurnas} alt='Logo Furnas' />
            </Link>
            </div>
        </header>

        {/* Seção dos Cards */}
        <section className={styles.cardSection}>
          
          {/* Coluna da Esquerda (Grid 8) */}
          <div className={styles.iconGrid}>
            {gridCards.map((card) => (
              <Card key={card.text} to={card.to} className={styles.gridCardItem}>
                
                {/* --- MUDANÇA --- */}
                {/* Trocado o 'div' por uma 'img' e usado 'card.imgSrc' */}
                <img 
                  alt={card.text} 
                  className={styles.cardIconImage} 
                />
                <span className={styles.cardText}>{card.text}</span>
              </Card>
            ))}
          </div>

          {/* Coluna da Direita (Card Grande) */}
          <div className={styles.featuredCardContainer}>
            <Card to="/banco-de-dados" className={styles.featuredCard}>
              <img alt="Consultar Banco de Dados" className={styles.featuredCardImage} />
              <span className={styles.featuredCardText}>Consultar no Banco de Dados</span>
            </Card>
          </div>

        </section>
      </main>
    </>
  );
}