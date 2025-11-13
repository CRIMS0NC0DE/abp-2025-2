// src/pages/furnas/PageFurnasTable.tsx
import { useState, useMemo } from "react";
import { NavLink } from "react-router-dom"; // <-- ADICIONADO

// ADICIONADO: Importar os estilos de layout que você já criou
import "../../components/TableBase/styles.css";
// ADICIONADO: Importar os estilos do menu de navegação
import styles from "../Sima/SimaPage.module.css"; 

import { Menu } from "../../components/TableBase/TableMenu";
import DataTable from "../../components/TableBase/DataTable";
import { Placeholder } from "../../components/TableBase/TablePlaceholder";
import { FilterBar } from "../../components/Filters/FilterBar";
import { ModalExport } from "../../components/Export/ModalExport";
import { useTableData } from "../../hooks/useTableData";
import type { FilterParams, ColumnInfo, ColumnType } from "../../types/types";

// --- LISTA DE TABELAS (Sem alteração) ---
const tabelasDisponiveis = [
  { label: "Abiótico (Coluna)", value: "abiotico-coluna" },
  { label: "Abiótico (Superfície)", value: "abiotico-superficie" },
  {
    label: "Água Matéria Orgânica Sedimento",
    value: "agua-materia-organica-sedimento",
  },
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
  {
    label: "Íons na Água Intersticial do Sedimento",
    value: "ions-na-agua-intersticial-do-sedimento",
  },
  { label: "Medida Campo Coluna", value: "medida-campo-coluna" },
  { label: "Medida Campo Superfície", value: "medida-campo-superficie" },
  { label: "Nutrientes Sedimento", value: "nutrientes-sedimento" },
  {
    label: "Parâmetros Biológicos Físicos Água",
    value: "parametros-biologicos-fisicos-agua",
  },
  { label: "PFQ", value: "pfq" },
  { label: "Reservatório", value: "reservatorio" },
  { label: "Sítio", value: "sitio" },
  { label: "Tabela", value: "tabela" },
  { label: "TC", value: "tc" },
  {
    label: "Variáveis Físicas Químicas da Água",
    value: "variaveis-fisicas-quimicas-da-agua",
  },
];

// ADICIONADO: Lista de links para o menu de navegação
const mainNavLinks = [
  { label: "Home", to: "/" },
  { label: "Início", to: "/sima" }, // Você pode querer mudar este para /furnas
  { label: "Banco de Dados", to: "/furnas-table" },
  { label: "Publicações", to: "/publicacoesSima" }, // Ou este para /publicacoes
  { label: "BALCAR", to: "/balcar" },
  { label: "FURNAS", to: "/furnas" },
];

export function FurnasTablePage() {
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
    "furnas",
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

  // --- JSX (CORRIGIDO) ---
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
        <Menu
          database="furnas"
          title="Dados Furnas"
          tabelas={tabelasDisponiveis}
          tabelaAtiva={tabelaAtiva}
          onSelectTabela={handleSelectTabela}
        />

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
                database="furnas"
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
        </main>
      </div>
    </> // ADICIONADO: Fechamento do Fragment
  );
}

export default FurnasTablePage;
