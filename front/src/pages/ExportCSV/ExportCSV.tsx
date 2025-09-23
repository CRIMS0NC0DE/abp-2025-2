import React, { useState } from "react";
import "./styles.css";
import downloadIcon from "../../assets/download-logo.png";

// --- DADOS MOCADOS
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

interface LimnologicalData {
  id: number;
  reservatorio: string;
  data: string;
  parametro: string;
  valor: number;
}

export const ExportCSV: React.FC = () => {
  const [data] = useState<LimnologicalData[]>(mockData);

  const handleExportCSV = () => {
    if (data.length === 0) {
      alert("Não há dados para exportar!");
      return;
    }
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(","));
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "dados_limnologicos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page-container">
      <div className="sidebar left"></div>
      <div className="content-container">
        <h1 className="title">
          Exportar Dados <span className="title-highlight">CSV</span>
        </h1>

        <div className="export-box" onClick={handleExportCSV}>
          <img
            src={downloadIcon}
            className="download-icon"
            alt="Ícone de download"
          />
        </div>

        <p className="instruction-text">
          Clique no círculo para iniciar o download
        </p>
      </div>
      <div className="sidebar right"></div>
    </div>
  );
};