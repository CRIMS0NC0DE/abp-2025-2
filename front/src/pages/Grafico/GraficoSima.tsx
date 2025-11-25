// src/pages/Grafico/GraficoSima.tsx
import React, { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import "./graficoSima.css"; // Arquivo de estilo separado

// --- Registro do Chart.js ---
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// --- Mapeamento de Métricas ---
const METRICS: {
  [key: string]: { label: string; unit: string; color: string };
} = {
  avg_tempar: { label: "Temp. Ar (Média)", unit: "°C", color: "#F97316" }, // Orange
  max_tempar: { label: "Temp. Ar (Máxima)", unit: "°C", color: "#fdba74" }, // Light Orange
  avg_temp_agua: { label: "Temp. Água", unit: "°C", color: "#0EA5E9" }, // Sky Blue
  avg_ur: { label: "Umidade Relativa", unit: "%", color: "#8B5CF6" }, // Violet
  avg_pressao: { label: "Pressão Atmosférica", unit: "hPa", color: "#10B981" }, // Emerald
  avg_vento: { label: "Velocidade do Vento", unit: "m/s", color: "#F59E0B" }, // Amber
  avg_radiacao: { label: "Radiação Solar", unit: "W/m²", color: "#EF4444" }, // Red
  total_chuva: { label: "Precipitação", unit: "mm", color: "#06B6D4" }, // Cyan
};

// --- Interfaces ---
interface Station {
  idestacao: string;
  rotulo: string;
}

interface AnalyticsDataPoint {
  label: string; // Data
  [key: string]: number | string;
}

interface AnalyticsResponse {
  success: boolean;
  data: AnalyticsDataPoint[];
}

const GraficoSima: React.FC = () => {
  // --- Estados de Controle ---
  const [stations, setStations] = useState<Station[]>([]);
  const [selectedStation, setSelectedStation] = useState<string>("");
  
  // Datas (Padrão: Dezembro 2016 conforme exemplo)
  const [startDate, setStartDate] = useState("2016-12-01");
  const [endDate, setEndDate] = useState("2016-12-31");
  const [granularity, setGranularity] = useState<"day" | "month">("day");

  // Métrica Selecionada (Única)
  const [selectedMetric, setSelectedMetric] = useState<string>("avg_tempar");

  // --- Estados de Dados ---
  const [chartDataPoints, setChartDataPoints] = useState<AnalyticsDataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- 1. Carregar Lista de Estações ---
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/sima/sima/graph/stations");
        const json = await res.json();
        if (json.success) {
          setStations(json.data);
          if (json.data.length > 0) setSelectedStation(json.data[0].idestacao);
        }
      } catch (err) {
        console.error("Erro ao buscar estações SIMA", err);
      }
    };
    fetchStations();
  }, []);

  // --- 2. Carregar Dados Analíticos ---
  useEffect(() => {
    if (!selectedStation) return;

    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = new URLSearchParams({
          stationId: selectedStation,
          start: startDate,
          end: endDate,
          granularity,
        });

        const res = await fetch(`http://localhost:3001/api/sima/sima/graph/analytics?${query}`);
        const json: AnalyticsResponse = await res.json();

        if (json.success) {
          setChartDataPoints(json.data);
        } else {
          setChartDataPoints([]);
        }
      } catch (err) {
        setError("Não foi possível carregar os dados temporais.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [selectedStation, startDate, endDate, granularity]);

  // --- 3. Configuração do Gráfico ---
  const chartConfig = useMemo<ChartData<"line">>(() => {
    const labels = chartDataPoints.map((p) => {
      const d = new Date(p.label);
      return granularity === 'day' 
        ? d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
        : d.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
    });

    const metricInfo = METRICS[selectedMetric];

    return {
      labels,
      datasets: [
        {
          label: metricInfo.label,
          data: chartDataPoints.map((p) => Number(p[selectedMetric]) || 0),
          borderColor: metricInfo.color,
          backgroundColor: metricInfo.color,
          tension: 0.3, // Curva suave
          pointRadius: 3,
          pointHoverRadius: 6,
          pointBackgroundColor: "#ffffff",
          pointBorderWidth: 2,
          borderWidth: 2,
          fill: false,
        },
      ],
    };
  }, [chartDataPoints, selectedMetric, granularity]);

  // --- 4. Opções Visuais ---
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
            color: '#475569',
            font: { family: 'inherit', size: 12 }
        }
      },
      tooltip: {
        backgroundColor: "#1E293B",
        titleColor: "#F8FAFC",
        bodyColor: "#F8FAFC",
        padding: 10,
        callbacks: {
            label: (ctx) => {
                const val = ctx.parsed.y;
                const unit = METRICS[selectedMetric].unit;
                return ` ${val} ${unit}`;
            }
        }
      },
    },
    scales: {
      y: {
        grid: { color: "#E2E8F0" },
        ticks: { color: "#64748B" },
        title: {
          display: true,
          text: METRICS[selectedMetric].unit,
          color: "#94A3B8",
        },
      },
      x: {
        grid: { display: false },
        ticks: { 
            color: "#334155",
            maxTicksLimit: 12 // Evita superlotação de datas
        },
      },
    },
  };

  return (
    <div className="sima-container">
      {/* Cabeçalho */}
      <header className="sima-header">
        <div className="sima-title-group">
          <h2>Monitoramento SIMA</h2>
          <p>Análise temporal por estação</p>
        </div>
      </header>

      {/* Barra de Ferramentas / Filtros */}
      <div className="sima-toolbar">
        
        {/* Grupo 1: Seleção Principal */}
        <div className="sima-control-group">
            <div className="sima-input-wrapper">
                <label>Estação</label>
                <select
                    value={selectedStation}
                    onChange={(e) => setSelectedStation(e.target.value)}
                    className="sima-select"
                    disabled={stations.length === 0}
                >
                    {stations.length === 0 && <option>Carregando...</option>}
                    {stations.map((s) => (
                    <option key={s.idestacao} value={s.idestacao}>
                        {s.rotulo}
                    </option>
                    ))}
                </select>
            </div>

            <div className="sima-input-wrapper grow">
                <label>Métrica Analisada</label>
                <select
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="sima-select highlight"
                >
                    {Object.entries(METRICS).map(([key, info]) => (
                    <option key={key} value={key}>
                        {info.label}
                    </option>
                    ))}
                </select>
            </div>
        </div>

        {/* Grupo 2: Filtros Temporais */}
        <div className="sima-control-group">
             <div className="sima-input-wrapper">
                <label>Início</label>
                <input
                    type="date"
                    className="sima-input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div className="sima-input-wrapper">
                <label>Fim</label>
                <input
                    type="date"
                    className="sima-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
             <div className="sima-input-wrapper">
                <label>Agrupar</label>
                <select
                    className="sima-select"
                    value={granularity}
                    onChange={(e) => setGranularity(e.target.value as "day" | "month")}
                >
                    <option value="day">Diário</option>
                    <option value="month">Mensal</option>
                </select>
            </div>
        </div>
      </div>

      {/* Área do Gráfico */}
      <div className="sima-content">
        {loading && (
          <div className="sima-state-message">
            <div className="sima-spinner"></div>
            <span>Processando série temporal...</span>
          </div>
        )}

        {!loading && error && (
          <div className="sima-state-message error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && chartDataPoints.length === 0 && (
          <div className="sima-state-message empty">
            <p>Nenhum dado encontrado para este período.</p>
          </div>
        )}

        {!loading && !error && chartDataPoints.length > 0 && (
          <div className="sima-chart-wrapper">
            <Line data={chartConfig} options={options} />
          </div>
        )}
      </div>

      {/* Rodapé */}
      <div className="sima-footer">
        <div className="sima-footer-item">
            <strong>{chartDataPoints.length}</strong> Registros Temporais
        </div>
        <div className="sima-footer-item">
             Métrica: <strong style={{color: METRICS[selectedMetric].color}}>{METRICS[selectedMetric].label}</strong>
        </div>
      </div>
    </div>
  );
};

export default GraficoSima;