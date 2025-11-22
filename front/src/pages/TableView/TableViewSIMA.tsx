import React, { useEffect, useState } from "react";
// Removi o import do FilterMenu, pois ele está no pai agora!
import { getMeasurements, type Measurement } from "../../api/client";
import styles from "./TableView.module.css";
import { TabelaSima } from "../../components/TableSima/TableSima";

// Agora o TableView recebe os filtros prontos do componente Pai
interface Props {
  currentFilters: Record<string, any>;
}

export default function TableView({ currentFilters }: Props) {
  // O estado 'filters' local sumiu. Usamos o 'currentFilters' da prop.
  const [data, setData] = useState<Measurement[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Busca dados toda vez que o pai mandar filtros novos
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Usa os filtros que vieram via prop
        const result = await getMeasurements(currentFilters);
        setData(result);
      } catch (err) {
        setError("Não foi possível carregar os dados.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentFilters]); // <--- A dependência agora é a prop

  const exportCSV = () => {
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
    <div className={styles.page}>
      <div className={styles.content}>
        
        {/* REMOVI O MENU LATERAL DAQUI */}

        {/* Agora só renderiza a tabela e o botão, ocupando 100% do espaço desse container */}
        <div className={styles.tableSection} style={{ width: '100%' }}>
          {error && <p className={styles.error}>{error}</p>}

          <TabelaSima data={data} isLoading={loading} />

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