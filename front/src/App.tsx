// front/src/App.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// 1. Importando as páginas REAIS do projeto
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Home/HomePage';
import MapPage from './pages/Map/MapPage'; // A página correta do mapa
import SimaPage from './pages/Sima/SimaPage';
import ExportCSV from './pages/ExportCSV/ExportCSV';
import TableView from './pages/TableView/TableView';
// O MapaInterativo não é mais necessário aqui, pois será usado dentro da MapPage se precisar.
import "leaflet/dist/leaflet.css";
import './styles/global.css';


export default function App() {
  return (
    <>
      <Header />
      <main>
        {/* 2. Corrigindo a rota para a página do mapa */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* AQUI ESTÁ A CORREÇÃO: trocamos MapaInterativo por MapPage */}
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/tabelas" element={<TableView />} />
          <Route path="/sima" element={<SimaPage />} />
          <Route path="/exportar-csv" element={<ExportCSV />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}