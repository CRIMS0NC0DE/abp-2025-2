// src/pages/Map/MapPage.tsx
import styles from './MapPage.module.css';
import MapaInterativo from '../../components/MapaInterativo'; // 1. Importando o mapa

export default function MapPage() {
  return (
    <div className={styles.container}>
      {/* 2. Removendo o título e parágrafo que não são mais necessários */}
      
      {/* 3. Renderizando o componente do mapa */}
      <MapaInterativo />

      <div className={styles.buttonContainer}>
        <button className={styles.queryButton}>Poços de Petróleo</button>
        <button className={styles.queryButton}>Áreas de Conservação</button>
        <button className={styles.queryButton}>Reservas Indígenas</button>
        <button className={styles.queryButton}>Malha Municipal</button>
      </div>
    </div>
  );
}