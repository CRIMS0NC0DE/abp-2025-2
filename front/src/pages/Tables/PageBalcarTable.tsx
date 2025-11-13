import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom"; // <-- ADICIONADO

// Importa os estilos CSS unificados
import "../../components/TableBase/styles.css";
// ADICIONADO: Importa os estilos do menu de navegação
import styles from "../Sima/SimaPage.module.css";

// Componentes (agora estilizados via styles.css)
import { Menu } from "../../components/TableBase/TableMenu";
import DataTable from "../../components/TableBase/DataTable";
import { Placeholder } from "../../components/TableBase/TablePlaceholder";

// Componentes que ainda podem precisar de conversão manual ou já a têm
import { FilterBar } from "../../components/Filters/FilterBar";
import { ModalExport } from "../../components/Export/ModalExport";

// Hooks e Tipos
import { useTableData } from "../../hooks/useTableData";
import type { FilterParams, ColumnInfo, ColumnType } from "../../types/types";

// --- LISTA DE TABELAS ---
const tabelasDisponiveis = [
  { label: "Campanha", value: "campanha" },
  { label: "Fluxo INPE", value: "fluxo-inpe" },
  { label: "Instituição", value: "instituicao" },
  { label: "Reservatório", value: "reservatorio" },
  { label: "Sítio", value: "sitio" },
  { label: "Tabela Campo", value: "tabela-campo" },
];

// ADICIONADO: Lista de links para o menu de navegação
const mainNavLinks = [
  { label: "Home", to: "/" },
  { label: "Início", to: "/balcar" },
  { label: "Banco de Dados", to: "/balcar-table" },
  { label: "Publicações", to: "/publicacoesBalcar" },
  { label: "SIMA", to: "/sima" },
  { label: "FURNAS", to: "/furnas" },
];

export function PageBalcarTable() {
  // ADICIONADO: Estado e funções do menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // --- Lógica existente da página ---
  const [tabelaAtiva, setTabelaAtiva] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterParams>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { dados, colunas, paginacao, loading, error } = useTableData(
    "balcar", // Database correto
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
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    // ADICIONADO: Fragment
    <>
      {/* ADICIONADO: Bloco do menu de navegação */}
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

      {/* Conteúdo original da página de tabela */}
      <div className="page-layout-container">
        {/* Menu Lateral */}
        <Menu
          title="Dados Balcar"
          database="balcar"
          tabelas={tabelasDisponiveis}
          tabelaAtiva={tabelaAtiva}
          onSelectTabela={handleSelectTabela}
        />

        {/* Área de Conteúdo Principal */}
        <main className="main-content-area">
          {tabelaAtiva ? (
            <>
              <FilterBar
                tableName={tabelaAtiva}
                key={tabelaAtiva}
                onApplyFilters={setFilters}
                onClearFilters={() => setFilters({})}
                onExportClick={() => setIsModalOpen(true)}
                colunasDisponiveis={colunasDisponiveis}
              />

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
            </>
          ) : (
            <Placeholder />
          )}
        </main>

        {/* Modal de Exportação */}
        {tabelaAtiva && (
          <ModalExport
            currentPage={paginacao.page}
            currentLimit={paginacao.limit}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            database="balcar"
            tableName={tabelaAtiva}
            currentFilters={filters}
            totalRecords={paginacao.total}
            pageRecords={dados.length}
          />
        )}
      </div>
    </> // ADICIONADO: Fechamento do Fragment
  );
}

export default PageBalcarTable;