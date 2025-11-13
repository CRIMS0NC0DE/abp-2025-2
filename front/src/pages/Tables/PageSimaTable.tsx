// src/pages/sima/PageSimaTable.tsx
import { useState, useMemo } from "react";
// Importa os estilos CSS unificados
import '../../components/TableBase/styles.css';

// Componentes (agora estilizados via styles.css)
import { Menu } from "../../components/TableBase/TableMenu";
import DataTable from "../../components/TableBase/DataTable";
import { Placeholder } from "../../components/TableBase/TablePlaceholder";
import styles from '../Sima/SimaPage.module.css';

// Componentes que ainda podem precisar de conversão manual ou já a têm
import { FilterBar } from "../../components/Filters/FilterBar";
import { ModalExport } from "../../components/Export/ModalExport";

// Hooks e Tipos
import { useTableData } from "../../hooks/useTableData";
import type { FilterParams, ColumnInfo, ColumnType } from "../../types/types";
import { NavLink } from "react-router-dom";

// --- LISTA DE TABELAS ---
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
    "sima", // Database correto
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
    // ADICIONADO: Fragment para agrupar o menu e a página
    <>
      {/* ADICIONADO: Bloco do menu copiado de SimaPage.tsx */}
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
          database="sima"
          title="Dados Sima"
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
                database="sima"
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
            database="sima" // Database correto
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

export default SimaTablePage;
