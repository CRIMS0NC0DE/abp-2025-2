<<<<<<< HEAD
import React from 'react';
import govLogo from "../../../../assets/govLogo.png";
import inpeLogo from "../../../../assets/inpeLogo.png";

const Header: React.FC = () => {
  return (
    <header>
      {/* NAVBAR SUPERIOR (branca) */}
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
      <div style={styles.subNav}>
        <div style={styles.leftContent}>
          <img
            src={inpeLogo}
            alt="gov.br INPE"
            style={styles.inpeLogo}
          />
          <span style={styles.text}>INPE</span>
        </div>

        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar localidade ou dados..."
            style={styles.searchInput}
          />
          <button style={styles.searchButton}>
            🔍
          </button>
        </div>
      </div>
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    height: 50,
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
    fontFamily: "Arial, sans-serif",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "100px",
    height: "auto",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: 20,
    margin: 0,
    padding: 0,
  },
  link: {
    color: "#0072bc",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: "bold",
  },

  subNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2d6ab1",
    padding: "10px 20px",
    color: "#fff",
  },
  leftContent: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  inpeLogo: {
    width: "35px",
    height: "auto",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    overflow: "hidden",
    width: "280px",
  },
  searchInput: {
    flex: 1,
    border: "none",
    padding: "8px 12px",
    outline: "none",
    fontSize: 14,
  },
  searchButton: {
    border: "none",
    backgroundColor: "transparent",
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: 16,
  },
};

=======
import React from 'react';
// Caminhos corrigidos para as imagens
import govLogo from "../assets/govLogo.png";
import inpeLogo from "../assets/LogoInpe.png"; // Corrigido para o nome de arquivo correto

const Header: React.FC = () => {
  // O restante do seu código permanece o mesmo...
  return (
    <header>
      {/* NAVBAR SUPERIOR (branca) */}
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
      <div style={styles.subNav}>
        <div style={styles.leftContent}>
          <img
            src={inpeLogo}
            alt="gov.br INPE"
            style={styles.inpeLogo}
          />
          <span style={styles.text}>INPE</span>
        </div>

        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar localidade ou dados..."
            style={styles.searchInput}
          />
          <button style={styles.searchButton}>
            🔍
          </button>
        </div>
      </div>
    </header>
  );
};

// ... (seus estilos aqui)

const styles: { [key: string]: React.CSSProperties } = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    height: 50,
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
    fontFamily: "Arial, sans-serif",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "100px",
    height: "auto",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: 20,
    margin: 0,
    padding: 0,
  },
  link: {
    color: "#0072bc",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: "bold",
  },

  subNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2d6ab1",
    padding: "10px 20px",
    color: "#fff",
  },
  leftContent: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  inpeLogo: {
    width: "35px",
    height: "auto",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    overflow: "hidden",
    width: "280px",
  },
  searchInput: {
    flex: 1,
    border: "none",
    padding: "8px 12px",
    outline: "none",
    fontSize: 14,
  },
  searchButton: {
    border: "none",
    backgroundColor: "transparent",
    padding: "8px 12px",
    cursor: "pointer",
    fontSize: 16,
  },
};


>>>>>>> 82bad15 (feat: initialize front-end project with React, Vite, and TypeScript)
export default Header;