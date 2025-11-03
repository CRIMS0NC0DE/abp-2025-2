import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Home/HomePage';
import MapPage from './pages/Map/MapPage'; 
import SimaPage from './pages/Sima/SimaPage';
import ExportCSV from './pages/ExportCSV/ExportCSV';
import TableView from './pages/TableView/TableView';
import Furnas from './pages/Furnas/Furnas';
import Balcar from './pages/Balcar/Balcar';
import PublicacoesFurnas from './pages/PublicacoesFurnas/PublicacoesFurnasPage';
import PublicacoesBalcarPage from './pages/PublicacoesBalcarPage/PublicacoesBalcarPage';
import "leaflet/dist/leaflet.css";
import './styles/global.css';


export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/tabelas" element={<TableView />} />
          <Route path="/sima" element={<SimaPage />} />
          <Route path="/exportar-csv" element={<ExportCSV />} />
          <Route path="/furnas" element={<Furnas />} />
          <Route path="/balcar" element={<Balcar />} />
          <Route path="/publicacoes" element={<PublicacoesFurnas />} />
          <Route path="/publicacoesBalcar" element={<PublicacoesBalcarPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}