import React, { useEffect, useState } from "react";
import JSZip from "jszip";
import styles from "./ExportCSV.module.css";
import downloadIcon from "../../assets/download-logo.png";

// Página para exportação de dados em formato CSV.
const ExportCSVPage: React.FC = () => {
  const [csvFiles, setCsvFiles] = useState<{ [key: string]: string[] }>({});

  useEffect(() => {
    fetch("/api/csv-files")
      .then((res) => res.json())
      .then(setCsvFiles);
  }, []);

  // Função para lidar com a exportação dos dados para um arquivo CSV.
  const handleExportAllAsZip = async () => {
    const zip = new JSZip();
    // Percorra todas as bases e arquivos
    await Promise.all(
      Object.entries(csvFiles).flatMap(([base, files]) =>
        files.map(async (filename) => {
          const response = await fetch(`/${base}-campanha/csv/${filename}`);
          if (response.ok) {
            const text = await response.text();
            zip.file(`${base}/${filename}`, text);
          }
        })
      )
    );

    // Gera o ZIP e inicia o download
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data-csv.zip");
    document.body.appendChild(link);
    link.click();
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

        <button className={styles.exportBox} onClick={handleExportAllAsZip}>
          <img
            src={downloadIcon}
            className={styles.downloadIcon}
            alt="Ícone de download"
          />
        </button>

        <p className={styles.instructionText}>
          Clique no círculo para baixar todos os CSVs em um ZIP
        </p>
      </div>
      <aside className={styles.sidebar}></aside>
    </div>
  );
};

export default ExportCSVPage;
