// src/pages/balcar/PageBalcarTable.tsx
import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
// Importamos o ícone X e BarChart3
import { X, BarChart3 } from "lucide-react"; 

import "../../components/TableBase/styles.css";
import styles from "../Sima/SimaPage.module.css";

import { FilterSidebar } from "../../components/TableBase/FilterSidebar";
import DataTable from "../../components/TableBase/DataTable";
import { Placeholder } from "../../components/TableBase/TablePlaceholder";
import { ModalExport } from "../../components/Export/ModalExport";
import BalcarMap from "../Map/BalcarMap"; 

// Importação do Gráfico (Novo)
import GraficoBalcar from "../Grafico/GraficoBalcar";

import { useTableData } from "../../hooks/useTableData";
import type { FilterParams, ColumnInfo, ColumnType } from "../../types/types";

// Importação do Logo
import logoBalcar from "../../assets/LogoBalcar.png";

// --- Tipos de Visualização ---
// Adicionado 'graph'
type ViewMode = 'table' | 'map' | 'graph';

const tabelasDisponiveis = [
  { label: "Campanha", value: "campanha" },
  { label: "Fluxo INPE", value: "fluxo-inpe" },
  { label: "Instituição", value: "instituicao" },
  { label: "Reservatório", value: "reservatorio" },
  { label: "Sítio", value: "sitio" },
  { label: "Tabela Campo", value: "tabela-campo" },
];

const mainNavLinks = [
  { label: "Home", to: "/" },
  { label: "Início", to: "/balcar" },
  { label: "Banco de Dados", to: "/balcar-table" },
  { label: "Publicações", to: "/publicacoesBalcar" },
  { label: "SIMA", to: "/sima" },
  { label: "FURNAS", to: "/furnas" },
];

export function PageBalcarTable() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [tabelaAtiva, setTabelaAtiva] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterParams>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { dados, colunas, paginacao, loading, error } = useTableData(
    "balcar",
    tabelaAtiva,
    currentPage,
    filters
  );

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

    return colunas.map((coluna) => {
      return {
        name: coluna,
        type: getColumnType(coluna),
      };
    });
  }, [colunas, dados]);

  const handleSelectTabela = (novaTabela: string) => {
    setTabelaAtiva(novaTabela);
    setFilters({});
    setCurrentPage(1);
    // Ao selecionar tabela, volta para visualização de tabela
    setViewMode('table'); 
  };

  const handleSidebarFilters = (sidebarFilters: any) => {
      console.log("Aplicando filtros na tabela:", sidebarFilters);
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

  const handleOpenMap = () => {
      setViewMode('map');
  };

  // --- Handler do Gráfico (NOVO) ---
  const handleOpenGraph = () => {
    setViewMode('graph');
  };

  // ✅ Fecha visualizações especiais (mapa/gráfico) e volta para tabela
  const handleCloseSpecialView = () => {
      setViewMode('table');
      // setTabelaAtiva(null); // Opcional: descomente se quiser limpar a seleção ao fechar
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className={styles.subHead}>
        <button
          className={`${styles.hamburgerButton} ${
            isMenuOpen ? styles.open : ""
          }`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          className={`${styles.mainNav} ${isMenuOpen ? styles.menuOpen : ""}`}
        >
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

      <div className="page-layout-container" style={{ display: 'flex' }}>
        
        {/* Sidebar atualizada com Logo e Título */}
        <FilterSidebar
          tabelas={tabelasDisponiveis}
          tabelaAtiva={tabelaAtiva}
          colunasDisponiveis={colunasDisponiveis}
          logoSrc={logoBalcar}
          projectTitle="BALCAR"
          onSelectTabela={handleSelectTabela}
          onApplyFilters={handleSidebarFilters}
          onExport={handleOpenExport}
          onOpenGraph={handleOpenGraph} // Passando a função real
          onOpenMap={handleOpenMap} 
        />

        {/* Área de Conteúdo Principal */}
        <main className="main-content-area" style={{ flex: 1, padding: '20px', overflowX: 'auto', position: 'relative' }}>
          
          {viewMode === 'map' ? (
             // --- MODO MAPA ---
             <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={toolbarStyle}>
                    <button onClick={handleCloseSpecialView} style={closeButtonStyle}>
                        <X size={18} /> Fechar Mapa
                    </button>
                </div>
                <div style={{ flex: 1, position: 'relative', minHeight: '500px' }}> 
                    <BalcarMap />
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
                    <GraficoBalcar />
                </div>
             </div>
          ) : (
             // --- MODO TABELA ---
             <>
                {tabelaAtiva ? (
                    <DataTable
                      database="balcar"
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
        
        {tabelaAtiva && (
            <ModalExport
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                database="balcar"
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

// Estilos inline auxiliares
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

export default PageBalcarTable;
