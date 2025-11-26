// src/pages/Tables/PageFurnasTable.tsx
import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
// Importamos o ícone X e BarChart3
import { X, BarChart3 } from "lucide-react"; 

// Estilos
import "../../components/TableBase/styles.css";
import styles from "../Sima/SimaPage.module.css"; 

// Componentes da UI
import { FilterSidebar } from "../../components/TableBase/FilterSidebar";
import DataTable from "../../components/TableBase/DataTable";
import { Placeholder } from "../../components/TableBase/TablePlaceholder";
import { ModalExport } from "../../components/Export/ModalExport";

// Importando o Mapa e o Logo
import FurnasMap from "../Map/FurnasMap";
import logoFurnas from "../../assets/LogoFurnas.png";

// Importação do Gráfico (Novo)
import GraficoFurnas from "../Grafico/GraficoFurnas";

// Hooks e Tipos
import { useTableData } from "../../hooks/useTableData";
import type { FilterParams, ColumnInfo, ColumnType } from "../../types/types";

// --- Tipos de Visualização ---
// Adicionado 'graph'
type ViewMode = 'table' | 'map' | 'graph';

// --- LISTA DE TABELAS (Furnas) ---
const tabelasDisponiveis = [
  { label: "Abiótico (Coluna)", value: "abiotico-coluna" },
  { label: "Abiótico (Superfície)", value: "abiotico-superficie" },
  { label: "Água Matéria Orgânica Sedimento", value: "agua-materia-organica-sedimento" },
  { label: "Biótico (Coluna)", value: "biotico-coluna" },
  { label: "Biótico (Superfície)", value: "biotico-superficie" },
  { label: "Bolhas", value: "bolhas" },
  { label: "Câmara Solo", value: "camara-solo" },
  { label: "Campanha", value: "campanha" },
  { label: "Campanha por Tabela", value: "campanha-por-tabela" },
  { label: "Campo por Tabela", value: "campo-por-tabela" },
  { label: "Carbono", value: "carbono" },
  { label: "Concentração Gás Água", value: "concentracao-gas-agua" },
  { label: "Concentração Gás Sedimento", value: "concentracao-gas-sedimento" },
  { label: "Dados Precipitação", value: "dados-precipitacao" },
  { label: "Dados Represa", value: "dados-represa" },
  { label: "Difusão", value: "difusao" },
  { label: "Dupla Dessorção Água", value: "dupla-dessorcao-agua" },
  { label: "Fluxo Bolhas INPE", value: "fluxo-bolhas-inpe" },
  { label: "Fluxo Carbono", value: "fluxo-carbono" },
  { label: "Fluxo Difusivo", value: "fluxo-difusivo" },
  { label: "Fluxo Difusivo INPE", value: "fluxo-difusivo-inpe" },
  { label: "Gases em Bolhas", value: "gases-em-bolhas" },
  { label: "Horiba", value: "horiba" },
  { label: "Instituição", value: "instituicao" },
  { label: "Íons na Água Intersticial do Sedimento", value: "ions-na-agua-intersticial-do-sedimento" },
  { label: "Medida Campo Coluna", value: "medida-campo-coluna" },
  { label: "Medida Campo Superfície", value: "medida-campo-superficie" },
  { label: "Nutrientes Sedimento", value: "nutrientes-sedimento" },
  { label: "Parâmetros Biológicos Físicos Água", value: "parametros-biologicos-fisicos-agua" },
  { label: "PFQ", value: "pfq" },
  { label: "Reservatório", value: "reservatorio" },
  { label: "Sítio", value: "sitio" },
  { label: "Tabela", value: "tabela" },
  { label: "TC", value: "tc" },
  { label: "Variáveis Físicas Químicas da Água", value: "variaveis-fisicas-quimicas-da-agua" },
];

const mainNavLinks = [
  { label: "Home", to: "/" },
  { label: "Início", to: "/furnas" },
  { label: "Banco de Dados", to: "/furnas-table" },
  { label: "Publicações", to: "/publicacoesFurnas" },
  { label: "SIMA", to: "/sima" },
  { label: "BALCAR", to: "/balcar" },
  
];

export function FurnasTablePage() {
  // --- Estados de Controle ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  // --- Handlers de Menu ---
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- Estado da Tabela e Filtros ---
  const [tabelaAtiva, setTabelaAtiva] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterParams>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hook de Dados (Database = "furnas")
  const { dados, colunas, paginacao, loading, error } = useTableData(
    "furnas",
    tabelaAtiva,
    currentPage,
    filters
  );

  // Lógica de Tipos de Coluna para a Sidebar Inteligente
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

  // --- Handlers da Página ---

  const handleSelectTabela = (novaTabela: string) => {
    setTabelaAtiva(novaTabela);
    setFilters({});
    setCurrentPage(1);
    setViewMode('table'); // Força modo tabela ao trocar de dados
  };

  const handleSidebarFilters = (sidebarFilters: any) => {
    console.log("Aplicando filtros Furnas:", sidebarFilters);
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
    // setTabelaAtiva(null); // Opcional: manter ou limpar tabela
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      {/* --- HEADER --- */}
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

      {/* --- LAYOUT PRINCIPAL --- */}
      <div className="page-layout-container" style={{ display: 'flex' }}>
        
        {/* Sidebar Unificada (com Logo e Título Furnas) */}
        <FilterSidebar
          tabelas={tabelasDisponiveis}
          tabelaAtiva={tabelaAtiva}
          colunasDisponiveis={colunasDisponiveis}
          logoSrc={logoFurnas}
          projectTitle="FURNAS"
          onSelectTabela={handleSelectTabela}
          onApplyFilters={handleSidebarFilters}
          onExport={handleOpenExport}
          onOpenGraph={handleOpenGraph} // Passando a função real
          onOpenMap={handleOpenMap}
        />

        {/* Área de Conteúdo */}
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
                    <FurnasMap />
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
                    <GraficoFurnas />
                </div>
             </div>
          ) : (
             // --- MODO TABELA ---
             <>
                {tabelaAtiva ? (
                    <DataTable
                      database="furnas"
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
              currentPage={paginacao.page}
              currentLimit={paginacao.limit}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              database="furnas"
              tableName={tabelaAtiva}
              currentFilters={filters}
              totalRecords={paginacao.total}
              pageRecords={dados.length}
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

export default FurnasTablePage;
