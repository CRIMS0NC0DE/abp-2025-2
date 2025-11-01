// src/pages/Map/MapPage.tsx
import { useState } from 'react';
import styles from './MapPage.module.css';

// Componentes de visualização
import MapaInterativo from '../../components/MapaInterativo';
import VisualizacaoGraficos from '../../components/VisualizacaoGrafico/VisualizacaoGrafico.tsx';
import TableView from '../../pages/TableView/TableView.tsx';

// Define os tipos de visualização possíveis
type ViewMode = 'map' | 'tables' | 'charts';

export default function MapPage() {
  // Estado para controlar qual visualização está ativa.
  const [activeView, setActiveView] = useState<ViewMode>('map');

  /**
   * Função para renderizar o componente de conteúdo principal
   * com base no estado de 'activeView'.
   */
  const renderContent = () => {
    switch (activeView) {
      case 'map':
        return <MapaInterativo source={'balcar'} />;
      case 'tables':
        return <TableView />;
      case 'charts':
        return <VisualizacaoGraficos />;
      default:
        // Caso padrão, retorna o mapa
        return <MapaInterativo source={'balcar'} />;
    }
  };

  /**
   * Função auxiliar para criar botões de navegação.
   * Retorna 'styles.activeButton' se for a view ativa.
   */
  const getButtonClass = (view: ViewMode) => {
    return view === activeView 
      ? `${styles.navButton} ${styles.activeButton}` 
      : styles.navButton;
  };

  return (
    <div className={styles.container}>
      {/* Container da Navegação */}
      <div className={styles.navigation}>
        <button
          className={getButtonClass('map')}
          onClick={() => setActiveView('map')}
        >
          Mapa
        </button>
        <button
          className={getButtonClass('tables')}
          onClick={() => setActiveView('tables')}
        >
          Tabelas
        </button>
        <button
          className={getButtonClass('charts')}
          onClick={() => setActiveView('charts')}
        >
          Gráficos
        </button>
      </div>

      {/* Container do Conteúdo Principal */}
      <div className={styles.contentArea}>
        {renderContent()}
      </div>
    </div>
  );
}