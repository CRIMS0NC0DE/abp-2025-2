import React from "react";
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
  "tbintituiçãobalcar.csv",
  "tbreservatoriobalcar.csv",
  "tbsitiobalcar.csv",
  "tbtabelacampo.csv", 
  
  "tbcampotabela.csv", //sima
  "tbestacao.csv",
  "tbsensor.csv",
  "tbsima.csv",
  "tbsimaoffline.csv",
];

// Página para exportação de dados em formato CSV.
const ExportCSVPage: React.FC = () => {
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
