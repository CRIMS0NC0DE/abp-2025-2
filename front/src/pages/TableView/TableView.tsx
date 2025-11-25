// front/src/pages/TableView/TableView.tsx

import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table";
import { getMeasurements, type Measurement } from "../../api/client";
import styles from "./TableView.module.css"
import { FilterMenu } from "../../components/MenuFilter/MenuFilterSima";

export default function TableView() {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [data, setData] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getMeasurements(filters);
        setData(result);
      } catch (err) {
        setError("Não foi possível carregar os dados.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters]);

  const exportCSV = () => {
    // ... (sua função de exportar continua igual)
    if (data.length === 0) {
      alert("Não há dados para exportar.");
      return;
    }

    const header = ["Estação", "Parâmetro", "Data", "Valor", "Unidade"].join(",") + "\n";
    const rows = data
      .map((m) =>
        [m.station, m.parameter, m.measured_at, String(m.value), m.unit]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");
    
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dados_limnologicos.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    // 1. Adicionamos a classe 'styles.page' de volta para centralizar
  <div className={styles.page}>
    <div className={styles.content}>
      {/* Lado esquerdo: menu de filtros */}
      <div className={styles.filterMenu}>
        <FilterMenu onApplyFilters={setFilters} />
      </div>

      {/* Lado direito: tabela e botão de exportação */}
      <div className={styles.tableSection}>
        {error && <p className={styles.error}>{error}</p>}

        <Table data={data} loading={loading} />

        <div className={styles.exportSection}>
          <button
            onClick={exportCSV}
            className={styles.exportButton}
            disabled={data.length === 0}
          >
            Exportar para CSV
          </button>
        </div>
      </div>
    </div>
  </div>

  );
}