import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';

// CORREÇÃO 3: Adicionar todas as importações que estavam faltando
import Footer from './components/Footer/Footer';
import HomePage from './pages/Home/HomePage';
import ExportCSVPage from './pages/ExportCSV/ExportCSV';
import MapPage from './pages/Map/MapPage';
import TablePage from './pages/Table/TablePage';
import SimaPage from './pages/Sima/SimaPage';

// Componente principal que organiza o layout e as rotas da aplicação.
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          {/* Rota principal para a HomePage */}
          <Route path="/" element={<HomePage />} />

          {/* Rotas para as demais páginas */}
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/tabelas" element={<TablePage />} />
          <Route path="/sima" element={<SimaPage />} />
          <Route path="/exportar-csv" element={<ExportCSVPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}