import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
// Importamos o ícone X para o botão de fechar
import { X } from "lucide-react"; 

import "../../components/TableBase/styles.css";
import styles from "../Sima/SimaPage.module.css";

import { FilterSidebar } from "../../components/TableBase/FilterSidebar";
import DataTable from "../../components/TableBase/DataTable";
import { Placeholder } from "../../components/TableBase/TablePlaceholder";
import { ModalExport } from "../../components/Export/ModalExport";
import BalcarMap from "../Map/BalcarMap"; 

import { useTableData } from "../../hooks/useTableData";
import type { FilterParams, ColumnInfo, ColumnType } from "../../types/types";

// --- Tipos de Visualização ---
type ViewMode = 'table' | 'map';

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

  // ✅ NOVA FUNÇÃO: Fecha o mapa e limpa a seleção da tabela
  const handleCloseMap = () => {
      setViewMode('table');
      setTabelaAtiva(null); // Isso força a volta para o <Placeholder />
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
        
        <FilterSidebar
          tabelas={tabelasDisponiveis}
          tabelaAtiva={tabelaAtiva}
          colunasDisponiveis={colunasDisponiveis}
          onSelectTabela={handleSelectTabela}
          onApplyFilters={handleSidebarFilters}
          onExport={handleOpenExport}
          onOpenGraph={() => alert("Análise Gráfica em breve!")}
          onOpenMap={handleOpenMap} 
        />

        {/* Área de Conteúdo Principal */}
        <main className="main-content-area" style={{ flex: 1, padding: '20px', overflowX: 'auto', position: 'relative' }}>
          
          {viewMode === 'map' ? (
             // --- MODO MAPA COM BOTÃO DE FECHAR ---
             <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                
                {/* Barra de ferramentas do Mapa (Botão Fechar) */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    marginBottom: '10px',
                    paddingBottom: '10px',
                    borderBottom: '1px solid #ddd'
                }}>
                    <button 
                        onClick={handleCloseMap}
                        style={{
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
                            fontSize: '0.9rem'
                        }}
                    >
                        <X size={18} /> Fechar Mapa
                    </button>
                </div>

                {/* Container do Mapa */}
                <div style={{ flex: 1, position: 'relative', minHeight: '500px' }}> 
                    <BalcarMap />
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

export default PageBalcarTable;