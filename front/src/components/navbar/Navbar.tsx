import React from 'react';
import govLogo from "../../../../assets/govLogo.png";

const Navbar: React.FC = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logoContainer}>
        <img
          src={govLogo} 
          alt="gov.br logo"
          style={styles.logo}
        />
      </div>
      <ul style={styles.navLinks}>
        <li><a href="#simplifique" style={styles.link}>Simplifique!</a></li>
        <li><a href="#comunica-br" style={styles.link}>Comunica BR</a></li>
        <li><a href="#participe" style={styles.link}>Participe</a></li>
        <li><a href="#acesso-informacao" style={styles.link}>Acesso à informação</a></li>
        <li><a href="#legislacao" style={styles.link}>Legislação</a></li>
        <li><a href="#canais" style={styles.link}>Canais</a></li>
      </ul>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    height: 50,
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
    fontFamily: 'Arial, sans-serif',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '100px',
    height: 'auto',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: 20,
    margin: 0,
    padding: 0,
  },
  link: {
    color: '#0072bc',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 'bold',
  }
};

export default Navbar;