import React, { useState, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import "./graficoFurnas.css"; // Arquivo de estilo separado

// --- Registro do Chart.js ---
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// --- Mapeamento de Métricas (Específico de Furnas) ---
const METRICS: { [key: string]: { label: string; unit: string } } = {
  ch4: { label: "Metano (CH4)", unit: "fluxo" },
  co2: { label: "Dióxido de Carbono (CO₂)", unit: "fluxo" },
  n2o: { label: "Óxido Nitroso (N₂O)", unit: "fluxo" },
  ph: { label: "pH", unit: "" },
  tempagua: { label: "Temp. Água", unit: "°C" },
  tempar: { label: "Temp. Ar", unit: "°C" },
  profundidade: { label: "Profundidade", unit: "m" },
  vento: { label: "Vento", unit: "m/s" },
};

// --- Interfaces ---
interface AnalyticsItem {
  id: number;
  label: string;
  media: number;
  minimo: number;
  maximo: number;
  desvio_padrao: number;
  contagem: number;
}

interface AnalyticsResponse {
  success: boolean;
  data: AnalyticsItem[];
}

const GraficoFurnas: React.FC = () => {
  // --- Estados de Controle ---
  const [selectedMetric, setSelectedMetric] = useState<string>("ch4");
  const [data, setData] = useState<AnalyticsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Busca de Dados (Apenas Reservatórios) ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          metric: selectedMetric,
          groupBy: "reservatorio", // Comparativo apenas por reservatório
        });

        // Endpoint correto de Furnas
        const url = `http://localhost:3001/api/furnas/difusao/graph/analytics?${params}`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Erro na requisição: ${res.status}`);
        }

        const json: AnalyticsResponse = await res.json();

        if (json.success) {
          setData(json.data);
        } else {
          setData([]);
        }
      } catch (err) {
        console.error("Erro ao buscar dados Furnas:", err);
        setError("Não foi possível carregar os dados. Verifique a conexão com a API.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMetric]);

  // --- Configuração dos dados do Gráfico ---
  const chartData = useMemo<ChartData<"bar">>(() => {
    return {
      labels: data.map((d) => d.label),
      datasets: [
        {
          label: `Média de ${METRICS[selectedMetric].label}`,
          data: data.map((d) => d.media),
          // Mantendo a cor Emerald do tema Balcar solicitado
          backgroundColor: "#10B981", 
          hoverBackgroundColor: "#059669",
          borderRadius: 4,
          barPercentage: 0.6,
          categoryPercentage: 0.8,
        },
      ],
    };
  }, [data, selectedMetric]);

  // --- Opções visuais do Gráfico (Estilo Balcar) ---
  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
            color: '#475569', // Slate 600
            font: { family: 'inherit', size: 12 }
        }
      },
      tooltip: {
        backgroundColor: "#1E293B", // Slate 800
        titleColor: "#F8FAFC",
        bodyColor: "#F8FAFC",
        padding: 10,
        callbacks: {
          label: (ctx) => {
            const val = (ctx.parsed.y ?? 0).toFixed(2);
            const unit = METRICS[selectedMetric].unit;
            return `Média: ${val} ${unit}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#E2E8F0", // Slate 200
        },
        ticks: {
          color: "#64748B", // Slate 500
        },
        title: {
          display: true,
          text: METRICS[selectedMetric].unit,
          color: "#94A3B8",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#334155", // Slate 700
          font: { weight: "bold" },
        },
      },
    },
  };

  return (
    <div className="furnas-container">
      {/* Cabeçalho */}
      <header className="furnas-header">
        <div className="furnas-title-group">
          <h2>Painel Analítico Furnas</h2>
          <p>Comparativo de médias por reservatório (Difusão)</p>
        </div>

        <div className="furnas-controls">
          <label htmlFor="metricSelect">Métrica:</label>
          <select
            id="metricSelect"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="furnas-select"
          >
            {Object.entries(METRICS).map(([key, info]) => (
              <option key={key} value={key}>
                {info.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Área Principal */}
      <div className="furnas-content">
        {loading && (
          <div className="furnas-state-message">
            <div className="furnas-spinner"></div>
            <span>Carregando dados...</span>
          </div>
        )}

        {!loading && error && (
          <div className="furnas-state-message error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && data.length === 0 && (
          <div className="furnas-state-message empty">
            <p>Nenhum dado encontrado para a métrica selecionada.</p>
          </div>
        )}

        {!loading && !error && data.length > 0 && (
          <div className="furnas-chart-wrapper">
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}
      </div>

      {/* Rodapé */}
      <div className="furnas-footer">
        <div className="furnas-footer-item">
            <strong>{data.length}</strong> Reservatórios analisados
        </div>
        <div className="furnas-footer-item">
            Unidade: <strong>{METRICS[selectedMetric].unit || "N/A"}</strong>
        </div>
      </div>
    </div>
  );
};

export default GraficoFurnas;