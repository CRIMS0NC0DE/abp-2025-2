//src/components/commons/TableMenu
import { useMemo } from "react";
import { Database, Table2 } from "lucide-react";
import type { DatabaseName } from "../../types/types"; // Ajuste o caminho se necessário

// Importe o arquivo CSS
import './styles.css';

interface TabelaDisponivel {
  label: string;
  value: string;
}

interface MenuProps {
  title?: string;
  tabelas: TabelaDisponivel[];
  tabelaAtiva: string | null;
  onSelectTabela: (value: string) => void;
  database: DatabaseName;
}

export function Menu({ title, tabelas, tabelaAtiva, onSelectTabela, database }: MenuProps) {
  const databaseDisplayName = useMemo(() => {
    switch (database) {
      case "furnas":
        return "Furnas";
      case "balcar":
        return "Balcar";
      case "sima":
        return "Sima";
      default:
        return "Database"; // Fallback
    }
  }, [database]);

  return (
    <aside className="table-menu">
      {/* Cabeçalho do Menu (Marca) */}
      <div className="menu-header">
        <Database className="menu-header-icon" />
        <h1 className="menu-header-title">{databaseDisplayName}Data</h1>
      </div>

      {/* Título da Seção */}
      {title && (
        <div className="menu-section-title-container">
          <h3 className="menu-section-title">{title}</h3>
        </div>
      )}

      {/* Lista de Itens do Menu */}
      <nav className={`menu-nav ${title ? "menu-nav-padding-top" : "menu-nav-padding-top-large"}`}>
        {tabelas.map((tabela) => {
          const isAtivo = tabela.value === tabelaAtiva;
          return (
            <button
              key={tabela.value}
              onClick={() => onSelectTabela(tabela.value)}
              className={`menu-button ${isAtivo ? "menu-button-active" : "menu-button-inactive"}`}
            >
              <Table2 className="menu-button-icon" />
              <span className="menu-button-label">{tabela.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Rodapé do Menu */}
      <div className="menu-footer">
        <p>
          &copy; {new Date().getFullYear()} - Projeto {databaseDisplayName}
        </p>
      </div>
    </aside>
  );
}