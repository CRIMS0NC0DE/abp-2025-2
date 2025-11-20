import React from 'react';
import styles from './TableSima.module.css';

interface RowData {
  [key: string]: any;
}

interface TabelaSimaProps {
  data: RowData[];
  isLoading?: boolean;
}

export const TabelaSima: React.FC<TabelaSimaProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return <div className={styles.noData}>Carregando...</div>;
  }

  if (!data || data.length === 0) {
    return <div className={styles.noData}>Nenhum dado encontrado.</div>;
  }

  const headers = Object.keys(data[0]);

  const headerLabels: Record<string, string> = {
    id: "ID",
    station: "Estação",
    parameter: "Parâmetro",
    measured_at: "Data de Medição",
    value: "Valor",
    unit: "Unidade",
  };

  return (
    <div className={styles.tableWrap}>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>
                {headerLabels[header] ?? header.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header) => (
                <td key={`${rowIndex}-${header}`}>
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
