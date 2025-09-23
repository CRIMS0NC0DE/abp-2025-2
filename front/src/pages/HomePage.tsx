import React from 'react';
import Card from '../components/Card';
import '../styles/HomePage.css'

// Caminhos corrigidos para os ícones
import mapIcon from '../assets/map-icon.png';
import tableIcon from '../assets/table-icon.png';
import simaIcon from '../assets/sima-icon.png';
import downloadIcon from '../assets/download-logo.png';

const HomePage: React.FC = () => {
  const cardData = [
    { icon: mapIcon, label: 'MAPA' },
    { icon: tableIcon, label: 'TABELA' },
    { icon: simaIcon, label: 'SIMA' },
    { icon: downloadIcon, label: 'DOWNLOAD' }
  ];

  return (
    <main className="homepage-container">
      <div className="cards-grid">
        {cardData.map((card, index) => (
          <Card
            key={index}
            iconSrc={card.icon}
            label={card.label}
          />
        ))}
      </div>
    </main>
  );
};

export default HomePage;