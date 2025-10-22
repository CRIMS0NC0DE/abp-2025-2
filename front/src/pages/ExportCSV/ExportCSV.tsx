import React, { useState } from "react";
import Papa from "papaparse";
import JSZip from "jszip";
import axios from "axios";
import styles from "./ExportCSV.module.css";
import downloadIcon from "../../assets/download-logo.png";

// Interface para a configuração das tabelas
interface TableConfig {
  apiUrl: string;
  group: string;
  color: string;
}

// Mapeamento das tabelas para seus endpoints e grupos na API
const tableEndpoints: { [key: string]: TableConfig } = {
  // Grupo Furnas
  "Campanha (Furnas)": { apiUrl: "/furnas/campanha", group: "furnas-campanha", color: "#3182ce" },
  "Abiótico Coluna": { apiUrl: "/furnas/abioticocoluna", group: "furnas-campanha", color: "#3182ce" },
  // Adicione outras tabelas de Furnas aqui...

  // Grupo Balcar
  "Fluxo INPE (Balcar)": { apiUrl: "/balcar/fluxoinpe", group: "balcar-campanha", color: "#38a169" },
  // Adicione outras tabelas de Balcar aqui...

  // Grupo SIMA
  "Dados SIMA": { apiUrl: "/sima/sima", group: "sima", color: "#d69e2e" },
  "Dados SIMA Offline": { apiUrl: "/sima/simaoffline", group: "sima", color: "#d69e2e" },
  // Adicione outras tabelas de SIMA aqui...
};

const API_BASE_URL = "http://localhost:3001/api";

const ExportCSVPage: React.FC = () => {
  type TableRow = Record<string, any>;
  const [tables, setTables] = useState<{ [key: string]: TableRow[] }>({});
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Busca os dados da API ao clicar em uma aba
  const handleTabClick = async (tableName: string) => {
    setActiveTab(tableName);
    if (!tables[tableName]) {
      setLoading(true);
      try {
        const endpoint = tableEndpoints[tableName].apiUrl;
        const response = await axios.get(`${API_BASE_URL}${endpoint}`);
        if (response.data && response.data.data) {
          setTables((prev) => ({ ...prev, [tableName]: response.data.data }));
        }
      } catch (error) {
        console.error(`Erro ao buscar dados para ${tableName}:`, error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Exporta todos os dados para um arquivo .zip
  const handleExportAllAsZip = async () => {
    const zip = new JSZip();
    setLoading(true);

    await Promise.all(
      Object.entries(tableEndpoints).map(async ([tableName, config]) => {
        try {
          const response = await axios.get(`${API_BASE_URL}${config.apiUrl}`);
          // CORREÇÃO: Acessa response.data.data e verifica se há dados
          if (response.data && response.data.data && response.data.data.length > 0) {
            // Aplaina os dados para um CSV limpo
            const flattenedData = response.data.data.map((row: any) => {
              const flatRow: Record<string, any> = {};
              for (const key in row) {
                if (typeof row[key] === 'object' && row[key] !== null) {
                  for (const subKey in row[key]) {
                    flatRow[`${key}_${subKey}`] = row[key][subKey];
                  }
                } else {
                  flatRow[key] = row[key];
                }
              }
              return flatRow;
            });

            const csvString = Papa.unparse(flattenedData);
            zip.file(`${tableName.replace(/[\s()]/g, '_')}.csv`, csvString);
          }
        } catch (error) {
          console.error(`Falha ao exportar ${tableName}:`, error);
        }
      })
    );

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "dados_completos.zip");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setLoading(false);
  };

  // Função para renderizar o conteúdo da tabela correta
  const renderTableContent = (tableName: string, data: any[]) => {
    switch (tableName) {
      case "Campanha (Furnas)":
        return (
          <>
            <thead>
              <tr>
                <th>ID Campanha</th>
                <th>Instituição</th>
                <th>Reservatório</th>
                <th>Nº Campanha</th>
                <th>Data Início</th>
                <th>Data Fim</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.idcampanha}>
                  <td>{row.idcampanha}</td>
                  <td>{row.instituicao?.nome}</td>
                  <td>{row.reservatorio?.nome}</td>
                  <td>{row.nrocampanha}</td>
                  <td>{new Date(row.datainicio).toLocaleDateString()}</td>
                  <td>{new Date(row.datafim).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </>
        );

      case "Abiótico Coluna":
        return (
          <>
            <thead>
              <tr>
                <th>ID</th>
                <th>Parâmetro</th>
                <th>Valor</th>
                <th>Unidade</th>
                <th>Profundidade (m)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.idabioticocoluna}>
                  <td>{row.idabioticocoluna}</td>
                  <td>{row.parametro}</td>
                  <td>{row.valor}</td>
                  <td>{row.unidade}</td>
                  <td>{row.profundidade}</td>
                </tr>
              ))}
            </tbody>
          </>
        );

      case "Fluxo INPE (Balcar)":
        return (
          <>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fluxo CH4</th>
                <th>Fluxo CO2</th>
                <th>Temperatura Ar</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.idfluxoinpe}>
                  <td>{row.idfluxoinpe}</td>
                  <td>{row.fluxo_ch4}</td>
                  <td>{row.fluxo_co2}</td>
                  <td>{row.temperatura_ar}</td>
                  <td>{new Date(row.data_amostragem).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </>
        );

      case "Dados SIMA":
      case "Dados SIMA Offline":
        return (
          <>
            <thead>
              <tr>
                <th>ID</th>
                <th>Estação</th>
                <th>Sensor</th>
                <th>Valor</th>
                <th>Data/Hora</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.idsima || row.idsimaoffline}>
                  <td>{row.idsima || row.idsimaoffline}</td>
                  <td>{row.estacao?.nome}</td>
                  <td>{row.sensor?.tipo}</td>
                  <td>{row.valor}</td>
                  <td>{new Date(row.data_hora_sonda).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </>
        );

      // Renderização padrão para qualquer outra tabela não especificada
      default:
        return (
          <>
            <thead>
              <tr>
                {Object.keys(data[0] || {}).map((col) => <th key={col}>{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i}>
                  {Object.values(row).map((cell, j) => (
                    <td key={j}>{String(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </>
        );
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>
          Visualizar e Exportar Dados <span className={styles.titleHighlight}>.CSV</span>
        </h1>

        <button className={styles.exportBox} onClick={handleExportAllAsZip} disabled={loading}>
          <img src={downloadIcon} className={styles.downloadIcon} alt="Ícone de download" />
        </button>

        <p className={styles.instructionText}>
          {loading ? "Processando..." : "Clique no círculo para baixar todos os dados em um ZIP"}
        </p>

        <div className={styles.tabsContainer}>
          {Object.entries(tableEndpoints).map(([tableName, config]) => (
            <div key={tableName} className={styles.tabWithTooltip}>
              <button
                onClick={() => handleTabClick(tableName)}
                className={`${styles.tabButton} ${activeTab === tableName ? styles.activeTab : ""}`}
                style={{ borderTop: `4px solid ${config.color || "#ccc"}` }}
              >
                {tableName}
              </button>
              <span className={styles.tooltip} style={{ background: config.color || "#333" }}>
                {config.group}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.tableWrapper}>
          {loading && !tables[activeTab || ""] ? (
            <p>Carregando tabela...</p>
          ) : activeTab && tables[activeTab] && tables[activeTab].length > 0 ? (
            <table className={styles.dataTable}>
              {renderTableContent(activeTab, tables[activeTab])}
            </table>
          ) : (
            <p>{activeTab ? `Não há dados para exibir para ${activeTab}.` : "Selecione uma tabela para visualizar."}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportCSVPage;