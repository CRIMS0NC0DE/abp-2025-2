import React, { useState } from "react";
import Papa from "papaparse";
import JSZip from "jszip";
import styles from "./ExportCSV.module.css";
import downloadIcon from "../../assets/download-logo.png";

const csvFiles = [
  "tbabioticocoluna.csv", //furnas-campanha
  "tbabioticosuperficie.csv",
  "tbaguamateriaorganicasedimento.csv",
  "tbbioticocoluna.csv",
  "tbbioticosuperficie.csv",
  "tbbolhas.csv",
  "tbcamarasolo.csv",
  "tbcampanha.csv",
  "tbcampanhaportabela.csv",
  "tbcampoportabela.csv",
  "tbcarbono.csv",
  "tbconcentracaogasagua.csv",
  "tbconcentracaogassedimento.csv",
  "tbdadosprecipitacao.csv",
  "tbdadosrepresa.csv",
  "tbdifusao.csv",
  "tbdupladessorcaoagua.csv",
  "tbfluxobolhasinpe.csv",
  "tbfluxocarbono.csv",
  "tbfluxodifusivo.csv",
  "tbfluxodifusivoinpe.csv",
  "tbgasesembolhas.csv",
  "tbhoriba.csv",
  "tbinstituicao.csv",
  "tbionsnaaguaintersticialdosedimento.csv",
  "tbmedidacampocoluna.csv",
  "tbmedidacamposuperficie.csv",
  "tbnutrientessedimento.csv",
  "tbparametrosbiologicosfisicosagua.csv",
  "tbpfq.csv",
  "tbreservatorio.csv",
  "tbsitio.csv",
  "tbtabela.csv",
  "tbtc.csv",
  "tbvariaveisfisicasquimicasdaagua.csv",

  "tbcampanhabalcar.csv", //balcar-campanha
  "tbfluxoinpe.csv",
  "tbinstituicaobalcar.csv",
  "tbreservatoriobalcar.csv",
  "tbsitiobalcar.csv",
  "tbtabelacampo.csv",

  "tbcampotabela.csv", //sima
  "tbestacao.csv",
  "tbsensor.csv",
  "tbsima.csv",
  "tbsimaoffline.csv",
];

const csvGroups: Record<string, { group: string; color: string }> = {
  // furnas-campanha
  "tbabioticocoluna.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbabioticosuperficie.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbaguamateriaorganicasedimento.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbbioticocoluna.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbbioticosuperficie.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbbolhas.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbcamarasolo.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbcampanha.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbcampanhaportabela.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbcampoportabela.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbcarbono.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbconcentracaogasagua.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbconcentracaogassedimento.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbdadosprecipitacao.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbdadosrepresa.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbdifusao.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbdupladessorcaoagua.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbfluxobolhasinpe.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbfluxocarbono.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbfluxodifusivo.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbfluxodifusivoinpe.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbgasesembolhas.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbhoriba.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbinstituicao.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbionsnaaguaintersticialdosedimento.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbmedidacampocoluna.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbmedidacamposuperficie.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbnutrientessedimento.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbparametrosbiologicosfisicosagua.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbpfq.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbreservatorio.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbsitio.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbtabela.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbtc.csv": { group: "furnas-campanha", color: "#3182ce" },
  "tbvariaveisfisicasquimicasdaagua.csv": { group: "furnas-campanha", color: "#3182ce" },

  // balcar-campanha
  "tbcampanhabalcar.csv": { group: "balcar-campanha", color: "#38a169" },
  "tbfluxoinpe.csv": { group: "balcar-campanha", color: "#38a169" },
  "tbinstituicaobalcar.csv": { group: "balcar-campanha", color: "#38a169" },
  "tbreservatoriobalcar.csv": { group: "balcar-campanha", color: "#38a169" },
  "tbsitiobalcar.csv": { group: "balcar-campanha", color: "#38a169" },
  "tbtabelacampo.csv": { group: "balcar-campanha", color: "#38a169" },

  // sima
  "tbcampotabela.csv": { group: "sima", color: "#d69e2e" },
  "tbestacao.csv": { group: "sima", color: "#d69e2e" },
  "tbsensor.csv": { group: "sima", color: "#d69e2e" },
  "tbsima.csv": { group: "sima", color: "#d69e2e" },
  "tbsimaoffline.csv": { group: "sima", color: "#d69e2e" },
};

// Página para exportação de dados em formato CSV.
const ExportCSVPage: React.FC = () => {
  type TableRow = Record<string, string>;
  const [tables, setTables] = useState<{ [key: string]: TableRow[] }>({});
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Carrega o CSV só quando clicar na aba
  const handleTabClick = async (filename: string) => {
    setActiveTab(filename);
    if (!tables[filename]) {
      setLoading(true);
      const response = await fetch(`/csv/${filename}`);
      if (response.ok) {
        const text = await response.text();
        const parsed = Papa.parse(text, { header: true });
        setTables((prev) => ({ ...prev, [filename]: parsed.data as TableRow[] }));
      }
      setLoading(false);
    }
  };

  // Função para lidar com a exportação dos dados para um arquivo CSV.
  const handleExportAllAsZip = async () => {
    const zip = new JSZip();

    // Busca todos os arquivos CSV e adiciona ao zip
    await Promise.all(
      csvFiles.map(async (filename) => {
        const response = await fetch(`/csv/${filename}`);
        if (response.ok) {
          const text = await response.text();
          zip.file(filename, text);
        }
      })
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

        <div className={styles.tabsContainer}>
          {csvFiles.map((filename) => {
            const groupInfo = csvGroups[filename];
            return (
              <div key={filename} className={styles.tabWithTooltip}>
                <button
                  onClick={() => handleTabClick(filename)}
                  className={`${styles.tabButton} ${activeTab === filename ? styles.activeTab : ""}`}
                  style={{
                    borderTop: `4px solid ${groupInfo?.color || "#ccc"}`,
                  }}
                >
                  {filename.replace(".csv", "")}
                </button>
                <span
                  className={styles.tooltip}
                  style={{ background: groupInfo?.color || "#333" }}
                >
                  {groupInfo?.group}
                </span>
              </div>
            );
          })}
        </div>
        <div className={styles.tableWrapper}>
          {loading ? (
            <p>Carregando tabela...</p>
          ) : activeTab && tables[activeTab] && tables[activeTab].length > 0 ? (
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  {Object.keys(tables[activeTab][0] || {}).map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tables[activeTab].map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((cell, j) => (
                      <td key={j}>{cell as string}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Selecione uma tabela para visualizar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportCSVPage;
