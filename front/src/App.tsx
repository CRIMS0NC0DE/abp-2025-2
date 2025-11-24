import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './pages/Home/HomePage';
import MapPage from './pages/Map/MapPage'; 
import SimaPage from './pages/Sima/SimaPage';
import ExportCSV from './pages/ExportCSV/ExportCSV';
import TableView from './pages/TableView/TableViewSIMA';
import Furnas from './pages/Furnas/Furnas';
import Balcar from './pages/Balcar/Balcar';
import PublicacoesFurnas from './pages/PublicacoesFurnas/PublicacoesFurnasPage';
import PublicacoesBalcarPage from './pages/PublicacoesBalcarPage/PublicacoesBalcarPage';
import PublicacoesSimaPage from './pages/PublicacoesSimaPage/PublicacoesSimaPage';
import "leaflet/dist/leaflet.css";
import './styles/global.css';
import ConsultaSIMA from './pages/ConsultaDados/ConsultaSIMA';
import ConsultaFurnas from './pages/ConsultaDados/ConsultaFurnas';
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
          <Route path="/tabelas" element={<TableView />} />
          <Route path="/sima" element={<SimaPage />} />
          <Route path="/sima/consulta" element={<ConsultaSIMA />} />
          <Route path="/exportar-csv" element={<ExportCSV />} />
          <Route path="/furnas" element={<Furnas />} />
          <Route path='/furnas/consulta' element={<ConsultaFurnas/>} />
          <Route path="/balcar" element={<Balcar />} />
          <Route path="/publicacoes" element={<PublicacoesFurnas />} />
          <Route path="/publicacoesBalcar" element={<PublicacoesBalcarPage />} />
          <Route path="/publicacoesSima" element={<PublicacoesSimaPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}