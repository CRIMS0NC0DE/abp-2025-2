// src/pages/sima/PageSimaTable.tsx
import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { X, BarChart3 } from "lucide-react"; 

// Importa estilos unificados e específicos
import '../../components/TableBase/styles.css';
import styles from '../Sima/SimaPage.module.css';

// Importação da Sidebar unificada e Componentes Base
import { FilterSidebar } from "../../components/TableBase/FilterSidebar";
import DataTable from "../../components/TableBase/DataTable";
import { Placeholder } from "../../components/TableBase/TablePlaceholder";
import { ModalExport } from "../../components/Export/ModalExport";

// Importação do Mapa
import SimaMap from "../Map/SimaMap";

// Importação do Gráfico (Novo)
import GraficoSima from "../Grafico/GraficoSima";

// Hooks e Tipos
import { useTableData } from "../../hooks/useTableData";
import type { FilterParams, ColumnInfo, ColumnType } from "../../types/types";

// Imagem do Logo
import logoSima from "../../assets/logoSima.png";

// --- Tipos de Visualização ---
// Adicionado 'graph' para suportar a nova visualização
type ViewMode = 'table' | 'map' | 'graph';

// --- Configurações ---
const tabelasDisponiveis = [
  { label: "Campo Tabela", value: "campo-tabela" },
  { label: "Estação", value: "estacao" },
  { label: "Sensor", value: "sensor" },
  { label: "Sima", value: "sima" },
  { label: "Sima Offline", value: "sima-offline" },
];

const mainNavLinks = [
  { label: "Home", to: "/" },
  { label: "Início", to: "/sima" },
  { label: "Banco de Dados", to: "/sima-table" },
  { label: "Publicações", to: "/publicacoesSima" },
  { label: "BALCAR", to: "/balcar" },
  { label: "FURNAS", to: "/furnas" },
];

export function SimaTablePage() {
  // --- Estados de Controle ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('table'); // Estado de visualização
  
  // Estado para controlar a Tabela e Filtros
  const [tabelaAtiva, setTabelaAtiva] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterParams>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hook de Dados
  const { dados, colunas, paginacao, loading, error } = useTableData(
    "sima", 
    tabelaAtiva,
    currentPage,
    filters
  );

  // --- Handlers ---
  const handleLinkClick = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Analisa os tipos de dados para gerar os filtros corretos na Sidebar
  const colunasDisponiveis = useMemo((): ColumnInfo[] => {
    const getColumnType = (coluna: string): ColumnType => {
      const lowerCol = coluna.toLowerCase();
      if (lowerCol.startsWith("data")) return "date";
      if (lowerCol.startsWith("hora")) return "time";

      for (const row of dados) {
        const value = row[coluna];
        if (value !== null && value !== undefined) {
          const type = typeof value;
          if (type === "number") return "number";
          if (type === "string") return "string";
        }
      }
      return "string";
    };

    return colunas.map((coluna) => ({
      name: coluna,
      type: getColumnType(coluna),
    }));
  }, [colunas, dados]);

  // Ao selecionar tabela, forçamos o modo Tabela
  const handleSelectTabela = (novaTabela: string) => {
    setTabelaAtiva(novaTabela);
    setFilters({});
    setCurrentPage(1);
    setViewMode('table');
  };

  const handleSidebarFilters = (sidebarFilters: any) => {
    console.log("Aplicando filtros na tabela SIMA:", sidebarFilters);
    setFilters(sidebarFilters);
    setCurrentPage(1);
  };

  const handleOpenExport = () => {
    if (!tabelaAtiva) {
      alert("Selecione uma tabela para exportar.");
      return;
    }
    setIsModalOpen(true);
  };

  // --- Handlers do Mapa ---
  const handleOpenMap = () => {
    setViewMode('map');
  };

  // --- Handlers do Gráfico (NOVO) ---
  const handleOpenGraph = () => {
    setViewMode('graph');
  };

  // Handler genérico para fechar visualizações especiais (Mapa/Gráfico) e voltar para tabela
  const handleCloseSpecialView = () => {
    setViewMode('table');
    // Opcional: Se quiser limpar a seleção da tabela ao voltar
    // setTabelaAtiva(null); 
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      {/* Header / Navegação Superior */}
      <div className={styles.subHead}>
        <button
          className={`${styles.hamburgerButton} ${isMenuOpen ? styles.open : ""}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`${styles.mainNav} ${isMenuOpen ? styles.menuOpen : ""}`}>
          <ul>
            {mainNavLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Layout Principal */}
      <div className="page-layout-container" style={{ display: 'flex' }}>
        
        {/* Sidebar Genérica Configurada para SIMA */}
        <FilterSidebar
          // Dados e Estado
          tabelas={tabelasDisponiveis}
          tabelaAtiva={tabelaAtiva}
          colunasDisponiveis={colunasDisponiveis}
          // Identidade Visual
          logoSrc={logoSima}
          projectTitle="SIMA"
          // Ações
          onSelectTabela={handleSelectTabela}
          onApplyFilters={handleSidebarFilters}
          onExport={handleOpenExport}
          onOpenGraph={handleOpenGraph} // Passando a função real agora
          onOpenMap={handleOpenMap}
        />

        {/* Área de Conteúdo Principal */}
        <main className="main-content-area" style={{ flex: 1, padding: '20px', overflowX: 'auto', position: 'relative' }}>
          
          {/* Lógica de Renderização Condicional: Mapa | Gráfico | Tabela */}
          
          {viewMode === 'map' ? (
             // --- MODO MAPA ---
             <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={toolbarStyle}>
                    <button onClick={handleCloseSpecialView} style={closeButtonStyle}>
                        <X size={18} /> Fechar Mapa
                    </button>
                </div>
                <div style={{ flex: 1, position: 'relative', minHeight: '500px' }}> 
                    <SimaMap />
                </div>
             </div>

          ) : viewMode === 'graph' ? (
            // --- MODO GRÁFICO (NOVO) ---
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={toolbarStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                        <BarChart3 size={20} />
                        <span style={{ fontWeight: 600 }}>Visualização Gráfica</span>
                    </div>
                    <button onClick={handleCloseSpecialView} style={closeButtonStyle}>
                        <X size={18} /> Fechar Gráfico
                    </button>
                </div>
                <div style={{ flex: 1, position: 'relative', minHeight: '500px', marginTop: '10px' }}> 
                    <GraficoSima />
                </div>
             </div>

          ) : (
            // --- MODO TABELA ---
            <>
              {tabelaAtiva ? (
                <DataTable
                  database="sima"
                  tableName={tabelaAtiva}
                  dados={dados}
                  colunas={colunas}
                  loading={loading}
                  error={error}
                  paginacao={paginacao}
                  onPageChange={handlePageChange}
                />
              ) : (
                <Placeholder />
              )}
            </>
          )}
        </main>
        
        {/* Modal de Exportação */}
        {tabelaAtiva && (
          <ModalExport
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            database="sima"
            tableName={tabelaAtiva}
            currentFilters={filters}
            totalRecords={paginacao.total}
            pageRecords={dados.length}
            currentPage={paginacao.page}
            currentLimit={paginacao.limit}
          />
        )}
      </div>
    </>
  );
}

// Estilos inline auxiliares para manter o código limpo
const toolbarStyle: React.CSSProperties = {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: '10px',
    paddingBottom: '10px',
    borderBottom: '1px solid #ddd'
};

const closeButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s'
};

export default SimaTablePage;