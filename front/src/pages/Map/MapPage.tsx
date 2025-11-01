import { useState } from 'react';
import styles from './MapPage.module.css';

import MapaInterativo from '../../components/MapaInterativo';
import VisualizacaoTabelas from '../../pages/TableView/TableView';
import VisualizacaoGraficos from '../../components/VisualizacaoGrafico/VisualizacaoGrafico';
import ListaBoiasCard from '../../components/ListaBoias/ListaSitiosFurnas'; // 1. Importar o novo Card

export interface TipoBoia {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
}

const mockBoias: TipoBoia[] = [
  { id: 'b-001', nome: 'Bóia Santos 01', latitude: -24.0084, longitude: -46.3082 },
  { id: 'b-002', nome: 'Bóia Guarujá 03', latitude: -23.9875, longitude: -46.2520 },
  { id: 'b-003', nome: 'Bóia Litoral Norte 02', latitude: -23.7951, longitude: -45.3929 },
];


type ViewMode = 'map' | 'tables' | 'charts';

export default function MapPage() {
  const [activeView, setActiveView] = useState<ViewMode>('map');
  
  const [selectedBuoyId, setSelectedBuoyId] = useState<string | null>(null);

  const handleBuoySelect = (id: string) => {
    if (selectedBuoyId === id) {
      setSelectedBuoyId(null);
    } else {
      setSelectedBuoyId(id);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'map':
        return (
          <>
            <MapaInterativo 
              selectedBuoyId={selectedBuoyId} 
              boias={mockBoias} 
            />
            <ListaBoiasCard 
              boias={mockBoias}
              selectedBuoyId={selectedBuoyId}
              onBuoySelect={handleBuoySelect} 
            />
          </>
        );
      case 'tables':
        return <VisualizacaoTabelas />;
      case 'charts':
        return <VisualizacaoGraficos />;
      default:
        return <MapaInterativo selectedBuoyId={null} boias={mockBoias} />;
    }
  };

  // ... (O restante do seu código de navegação) ...

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