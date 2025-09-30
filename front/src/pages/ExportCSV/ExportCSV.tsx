import React from "react";
import styles from "./ExportCSV.module.css";
import downloadIcon from "../../assets/download-logo.png";

// --- DADOS MOCADOS (Exemplo) ---
// Em uma aplicação real, esses dados viriam de uma API.
const mockData = [
  {
    id: 1,
    reservatorio: "Furnas",
    data: "2024-01-15",
    parametro: "pH",
    valor: 7.2,
  },
  {
    id: 2,
    reservatorio: "Furnas",
    data: "2024-01-15",
    parametro: "Turbidez",
    valor: 3.5,
  },
  {
    id: 3,
    reservatorio: "Marimbondo",
    data: "2024-01-16",
    parametro: "pH",
    valor: 7.0,
  },
  {
    id: 4,
    reservatorio: "Marimbondo",
    data: "2024-01-16",
    parametro: "Oxigênio",
    valor: 6.8,
  },
];

// Página para exportação de dados em formato CSV.
const ExportCSVPage: React.FC = () => {
  // Função para lidar com a exportação dos dados para um arquivo CSV.
  const handleExportCSV = () => {
    if (mockData.length === 0) {
      alert("Não há dados para exportar!");
      return;
    }

    // Cria o cabeçalho do CSV a partir das chaves do primeiro objeto.
    const headers = Object.keys(mockData[0]).join(",");
    // Mapeia cada objeto para uma string de valores separados por vírgula.
    const rows = mockData.map((row) => Object.values(row).join(","));
    // Combina cabeçalho e linhas.
    const csvContent = [headers, ...rows].join("\n");

    // Cria um Blob com o conteúdo CSV.
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Cria um link temporário para iniciar o download.
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "dados_limnologicos.csv");
    document.body.appendChild(link);
    link.click();

    // Remove o link após o download.
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.pageContainer}>
      <aside className={styles.sidebar}></aside>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>
          Exportar Dados <span className={styles.titleHighlight}>CSV</span>
        </h1>

        <button className={styles.exportBox} onClick={handleExportCSV}>
          <img
            src={downloadIcon}
            className={styles.downloadIcon}
            alt="Ícone de download"
          />
        </button>

        <p className={styles.instructionText}>
          Clique no círculo para iniciar o download
        </p>
      </div>
      <aside className={styles.sidebar}></aside>
    </div>
  );
};

export default ExportCSVPage;
