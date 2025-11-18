import { useState } from 'react';
import styles from './MapPage.module.css';

import MapaInterativo from '../../components/MapaInterativo';

export interface TipoBoia {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
}


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
            />
            <ListaBoiasCard 
              selectedBuoyId={selectedBuoyId}
              onBuoySelect={handleBuoySelect} 
            />
          </>
        );
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