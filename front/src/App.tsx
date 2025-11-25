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
import PublicacoesSimaPage from './pages/PublicacoesSimaPage/PublicacoesSimaPage';
import PageBalcarTable from './pages/Tables/PageBalcarTable';
import FurnasTablePage from './pages/Tables/PageFurnasTable';
import SimaTablePage from './pages/Tables/PageSimaTable';
import BalcarMap from './pages/Map/BalcarMap';
import FurnasMap from './pages/Map/FurnasMap';
import SimaMap from './pages/Map/SimaMap';
import "leaflet/dist/leaflet.css";
import './styles/global.css';
import './index.css'
import DashboardPreview from './pages/teste/teste';
import BarraBrasil from './components/BarraBrasil/BarraBrasil';



export default function App() {
  return (
    <>
    <BarraBrasil />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/mapa-balcar" element={<BalcarMap />} />
          <Route path="/mapa-furnas" element={<FurnasMap />} />
          <Route path="/mapa-sima" element={<SimaMap />} />
          <Route path="/tabelas" element={<TableView />} />
          <Route path="/sima" element={<SimaPage />} />
          <Route path="/exportar-csv" element={<ExportCSV />} />
          <Route path="/furnas" element={<Furnas />} />
          <Route path="/balcar" element={<Balcar />} />
          <Route path="/publicacoesFurnas" element={<PublicacoesFurnas />} />
          <Route path="/publicacoesBalcar" element={<PublicacoesBalcarPage />} />
          <Route path="/publicacoesSima" element={<PublicacoesSimaPage />} />
          <Route path="/furnas-table" element={<FurnasTablePage/>} />
          <Route path="/balcar-table" element={<PageBalcarTable/>} />
          <Route path="/sima-table" element={<SimaTablePage/>} />
          <Route path="/teste" element={<DashboardPreview/>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}