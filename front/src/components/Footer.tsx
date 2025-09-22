import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <p>
        © 2025 FATEC Jacareí – Desenvolvido por 
        <a 
          href="https://github.com/CRIMS0NC0DE" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          CrimsonCode
        </a>
         – Todos os direitos reservados
      </p>
    </footer>
  );
};

export default Footer;