import React, { useState } from "react";
import Papa from "papaparse";
import JSZip from "jszip";
import axios from "axios";
import styles from "./ExportCSV.module.css";
import downloadIcon from "../../assets/download-logo.png";

// --- ESTRUTURA DE DADOS ATUALIZADA ---
interface TableInfo { apiUrl: string; }
interface DatabaseConfig {
  group: string;
  color: string;
  tables: { [tableName: string]: TableInfo; };
}

const databaseConfig: { [dbName: string]: DatabaseConfig } = {
  "Furnas Campanha": {
    group: "furnas-campanha",
    color: "#3182ce",
    tables: {
      "Campanhas": { apiUrl: "/furnas/campanha" },
      "Abiótico Coluna": { apiUrl: "/furnas/abioticocoluna" },
      "Abiótico Superfície": { apiUrl: "/furnas/abioticosuperficie" },
      "Água e Matéria Orgânica": { apiUrl: "/furnas/aguamateriaorganicasedimento" },
      "Biótico Coluna": { apiUrl: "/furnas/bioticocoluna" },
      "Biótico Superfície": { apiUrl: "/furnas/bioticosuperficie" },
      "Bolhas": { apiUrl: "/furnas/bolhas" },
      "Câmara de Solo": { apiUrl: "/furnas/camarasolo" },
      "Carbono": { apiUrl: "/furnas/carbono" },
      "Gás na Água": { apiUrl: "/furnas/concentracaogasagua" },
      "Gás no Sedimento": { apiUrl: "/furnas/concentracaogassedimento" },
      "Dados de Precipitação": { apiUrl: "/furnas/dadosprecipitacao" },
      "Dados da Represa": { apiUrl: "/furnas/dadosrepresa" },
      "Difusão": { apiUrl: "/furnas/difusao" },
      "Dupla Dessorção": { apiUrl: "/furnas/dupladessorcaoagua" },
      "Fluxo de Bolhas (INPE)": { apiUrl: "/furnas/fluxobolhasinpe" },
      "Fluxo de Carbono": { apiUrl: "/furnas/fluxocarbono" },
      "Fluxo Difusivo": { apiUrl: "/furnas/fluxodifusivo" },
      "Fluxo Difusivo (INPE)": { apiUrl: "/furnas/fluxodifusivoinpe" },
      "Gases em Bolhas": { apiUrl: "/furnas/gasesembolhas" },
      "Horiba": { apiUrl: "/furnas/horiba" },
      "Íons na Água": { apiUrl: "/furnas/ionsnaaguaintersticialdosedimento" },
      "Medida de Campo (Coluna)": { apiUrl: "/furnas/medidacampocoluna" },
      "Medida de Campo (Superfície)": { apiUrl: "/furnas/medidacamposuperficie" },
      "Nutrientes no Sedimento": { apiUrl: "/furnas/nutrientessedimento" },
      "Parâmetros Biológicos": { apiUrl: "/furnas/parametrosbiologicosfisicosagua" },
      "PFQ": { apiUrl: "/furnas/pfq" },
      "TC": { apiUrl: "/furnas/tc" },
      "Variáveis Físico-Químicas": { apiUrl: "/furnas/variaveisfisicasquimicasdaagua" },
    },
  },
  "Balcar Campanha": {
    group: "balcar-campanha",
    color: "#38a169",
    tables: {
      // Adicionaremos as tabelas de Balcar aqui quando tiver o SQL
    },
  },
  "SIMA": {
    group: "sima",
    color: "#d69e2e",
    tables: {
      // Adicionaremos as tabelas de SIMA aqui
    },
  },
};

// ... (O restante do arquivo continua o mesmo que a versão anterior que te enviei)
// A função renderTableContent agora usará o 'default' para as novas tabelas
// pois ainda não definimos um layout customizado para cada uma.

const API_BASE_URL = "http://localhost:3001/api";

const ExportCSVPage: React.FC = () => {
  const [selectedDb, setSelectedDb] = useState<string | null>(null);
  const [activeTable, setActiveTable] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDbSelect = (dbName: string) => {
    setSelectedDb(dbName);
    setActiveTable(null);
    setTableData([]);
  };

  const handleTableSelect = async (tableName: string) => {
    if (!selectedDb) return;
    setActiveTable(tableName);
    setLoading(true);
    try {
      const endpoint = databaseConfig[selectedDb].tables[tableName].apiUrl;
      const response = await axios.get(`${API_BASE_URL}${endpoint}`);
      if (response.data && response.data.data) {
        setTableData(response.data.data);
      }
    } catch (error) {
      console.error(`Erro ao buscar dados para ${tableName}:`, error);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleExportAllAsZip = async () => {
    const zip = new JSZip();
    setLoading(true);

    for (const dbName in databaseConfig) {
      for (const tableName in databaseConfig[dbName].tables) {
        try {
          const config = databaseConfig[dbName].tables[tableName];
          const response = await axios.get(`${API_BASE_URL}${config.apiUrl}`);
          if (response.data && response.data.data && response.data.data.length > 0) {
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
            const fileName = `${dbName}_${tableName}`.replace(/[\s()]/g, '_') + '.csv';
            zip.file(fileName, csvString);
          }
        } catch (error) {
          console.error(`Falha ao exportar ${tableName} do banco ${dbName}:`, error);
        }
      }
    }

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "backup_completo_dados.zip");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setLoading(false);
  };

  // Substitua a função inteira no seu ExportCSV.tsx
// Substitua a função inteira no seu ExportCSV.tsx por esta versão corrigida

// Substitua esta função inteira no seu ExportCSV.tsx

const renderTableContent = (tableName: string, data: any[]) => {
    // Caso especial para "Campanhas", que tem uma estrutura única
    if (tableName === "Campanhas") {
      return (
        <>
          <thead>
            <tr>
              <th>ID Campanha</th><th>Instituição</th><th>Reservatório</th>
              <th>Nº Campanha</th><th>Data Início</th><th>Data Fim</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.idcampanha}>
                <td>{row.idcampanha}</td><td>{row.instituicao?.nome}</td><td>{row.reservatorio?.nome}</td>
                <td>{row.nrocampanha}</td><td>{new Date(row.datainicio).toLocaleDateString()}</td><td>{new Date(row.datafim).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </>
      );
    }
  
    // --- RENDERIZAÇÃO GENÉRICA E INTELIGENTE PARA TODAS AS OUTRAS TABELAS ---
    // Pega os cabeçalhos do primeiro objeto, excluindo os objetos aninhados (campanha, sitio)
    const headers = Object.keys(data[0] || {}).filter(
      (key) => typeof data[0][key] !== 'object' || data[0][key] === null
    );

    return (
      <>
        <thead>
          <tr>
            {/* Adiciona as colunas dos dados aninhados no início, se existirem */}
            {data[0]?.campanha && <th>Nº Campanha</th>}
            {data[0]?.sitio && <th>Sítio</th>}
            {/* Mapeia o resto dos cabeçalhos */}
            {headers.map(header => <th key={header}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row[headers[0]] || index}>
              {/* Exibe os dados aninhados, se existirem */}
              {row.campanha && <td>{row.campanha.nrocampanha}</td>}
              {row.sitio && <td>{row.sitio.nome}</td>}
              {/* Mapeia o resto das células */}
              {headers.map(header => {
                const cellData = row[header];
                // Formata datas para serem mais legíveis
                if (typeof cellData === 'string' && cellData.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
                  return <td key={header}>{new Date(cellData).toLocaleDateString()}</td>;
                }
                // Converte valores nulos para uma string vazia
                return <td key={header}>{cellData === null ? '' : String(cellData)}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </>
    );
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Visualizar e Exportar Dados <span className={styles.titleHighlight}>.CSV</span></h1>
        <p className={styles.instructionText}>Primeiro, selecione um banco de dados. Em seguida, escolha uma tabela para visualizar.</p>
        <div className={styles.dbSelectorContainer}>
          {Object.entries(databaseConfig).map(([dbName, config]) => (
            <button key={dbName} onClick={() => handleDbSelect(dbName)} className={`${styles.dbButton} ${selectedDb === dbName ? styles.activeDbButton : ""}`} style={{ '--active-color': config.color } as React.CSSProperties}>
              {dbName}
            </button>
          ))}
        </div>
        {selectedDb && (
          <div className={styles.tabsContainer}>
            {Object.keys(databaseConfig[selectedDb].tables).map((tableName) => (
              <button key={tableName} onClick={() => handleTableSelect(tableName)} className={`${styles.tabButton} ${activeTable === tableName ? styles.activeTab : ""}`} style={{ '--active-color': databaseConfig[selectedDb].color } as React.CSSProperties}>
                {tableName}
              </button>
            ))}
          </div>
        )}
        <div className={styles.tableWrapper}>
          {loading ? (<p>Carregando tabela...</p>) : activeTable && tableData.length > 0 ? (
            <table className={styles.dataTable}>{renderTableContent(activeTable, tableData)}</table>
          ) : (
            <p>{!selectedDb ? "Selecione um banco de dados para começar." : !activeTable ? "Selecione uma tabela para visualizar os dados." : "Não há dados para exibir para a tabela selecionada."}</p>
          )}
        </div>
        <div className={styles.exportSection}>
          <button className={styles.exportBox} onClick={handleExportAllAsZip} disabled={loading}>
            <img src={downloadIcon} className={styles.downloadIcon} alt="Ícone de download" />
          </button>
          <p className={styles.instructionText}>{loading ? "Processando..." : "Clique no círculo para baixar TODAS as tabelas de TODOS os bancos em um arquivo ZIP."}</p>
        </div>
      </div>
    </div>
  );
};

export default ExportCSVPage;