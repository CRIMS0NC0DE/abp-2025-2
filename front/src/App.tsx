// front/src/App.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. Importando as páginas REAIS do projeto
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Home/HomePage';
import MapPage from './pages/Map/MapPage';
import SimaPage from './pages/Sima/SimaPage';
import ExportCSV from './pages/ExportCSV/ExportCSV';
import TableView from './pages/TableView/TableView'; // A sua página que criamos
import MapaInterativo from './components/MapaInterativo';
import "leaflet/dist/leaflet.css";
import './styles/global.css';


// 2. As páginas de exemplo foram removidas

export default function App() {
  return (
    <>
      <Header />
      <main>
        {/* 3. Conectando as rotas às páginas corretas */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/tabelas" element={<TableView />} />
          <Route path="/sima" element={<SimaPage />} />
          <Route path="/exportar-csv" element={<ExportCSV />} />
          <Route path="/Mapa-Interativo" element={<MapaInterativo />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}