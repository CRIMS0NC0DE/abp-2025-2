import Card from '../../components/Card/Card';
import styles from './HomePage.module.css';

// Importação dos ícones
import mapIcon from '../../assets/map-icon.png';
import tableIcon from '../../assets/table-icon.png';
import simaIcon from '../../assets/sima-icon.png';
import downloadIcon from '../../assets/download-logo_card.png';

// Definição dos dados para os cards, facilitando a manutenção.
const cardData = [
  { icon: mapIcon, label: 'MAPA', to: '/mapa' },
  { icon: tableIcon, label: 'TABELA', to: '/tabelas' },
  { icon: simaIcon, label: 'SIMA', to: '/sima' },
  { icon: downloadIcon, label: 'DOWNLOAD', to: '/exportar-csv' }
];

// Página inicial que exibe a grade de cards de navegação.
export default function HomePage() {
  return (
    <div className={styles.homepageContainer}>
      <div className={styles.cardsGrid}>
        {cardData.map((card) => (
          <Card
            key={card.label}
            iconSrc={card.icon}
            label={card.label}
            to={card.to}
          />
        ))}
      </div>
    </div>
  );
}