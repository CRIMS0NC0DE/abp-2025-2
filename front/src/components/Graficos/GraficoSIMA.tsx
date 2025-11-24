import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

// 1. Registrar os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// 2. Tipagem dos dados que vêm da API
interface ApiData {
  labels: string[];
  valores: number[];
}

export const GraficoSIMA: React.FC = () => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Substitua pela URL da sua API
        const { data } = await axios.get<ApiData>('http://localhost:3001/api/mapa/sima');

        // 3. Formatar dados para o Chart.js
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: 'Vendas Mensais (R$)',
              data: data.valores,
              backgroundColor: 'rgba(53, 162, 235, 0.5)', // Cor das barras
              borderColor: 'rgb(53, 162, 235)',
              borderWidth: 1,
            },
          ],
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 4. Opções visuais (opcional)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Gráfico de Vendas 2024',
      },
    },
  };

  if (loading) return <p>Carregando gráfico...</p>;
  if (!chartData) return <p>Sem dados para exibir.</p>;

  return (
    <div style={{ width: '800px', margin: '0 auto' }}>
      <Bar options={options} data={chartData} />
    </div>
  );
};