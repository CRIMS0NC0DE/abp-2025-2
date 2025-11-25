import { useState } from "react";
import { Link } from "react-router-dom"; // Assumindo react-router-dom
import { Menu, X, Home } from "lucide-react"; // Adicionei Waves para o ícone de marca

// Importe o arquivo CSS
import './styles.css';

/**
 * Componente de Menu de Navegação Superior.
 * Utiliza CSS tradicional para styling e é totalmente responsivo (desktop/mobile).
 */
function MenuBar() {
  const [isOpen, setIsOpen] = useState(false);

  // Função para fechar o menu mobile
  const handleLinkClick = () => setIsOpen(false);

  return (
    // Nav principal: Primary Blue e Sombra
    <nav className="menu-bar">
      <div className="menu-bar-container">
        <div className="menu-bar-flex">
          
          {/* Logo / Título Principal */}
          <Link to="/" className="menu-bar-logo">
            <Home className="logo-icon" />
            <span>Página Inicial</span>
          </Link>

          {/* Menu Desktop */}
          <div className="desktop-menu">
            <Link to="/balcar" className="base-link">Balcar</Link>
            <Link to="/furnas" className="base-link">Furnas</Link>
            <Link to="/sima" className="base-link">Sima</Link>
            
            {/* Separador e links secundários */}
            <div className="separator"></div>
            <Link to="/about" className="base-link special-link">Informações Sobre os Projetos</Link>
          </div>

          {/* Botão Mobile (Hamburger/Close) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-toggle-button"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile Dropdown */}
      <div 
        className={`mobile-dropdown ${isOpen ? 'mobile-dropdown-open' : 'mobile-dropdown-closed'}`}
      >
        <div className="mobile-links-container">
          <Link 
            to="/balcar" 
            onClick={handleLinkClick} 
            className="base-link mobile-link"
          >
            Balcar
          </Link>
          <Link 
            to="/furnas" 
            onClick={handleLinkClick} 
            className="base-link mobile-link"
          >
            Furnas
          </Link>
          <Link 
            to="/sima" 
            onClick={handleLinkClick} 
            className="base-link mobile-link"
          >
            Sima
          </Link>
          <Link 
            to="/about" 
            onClick={handleLinkClick} 
            className="base-link mobile-link"
          >
            Sobre
          </Link>
          <Link 
            to="/about" // TODO: O link original apontava para /about, mude se necessário
            onClick={handleLinkClick} 
            className="base-link mobile-link mobile-special-link"
          >
            Contato
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default MenuBar;