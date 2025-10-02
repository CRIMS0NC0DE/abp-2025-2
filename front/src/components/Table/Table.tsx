// front/src/components/Table/Table.tsx

import React from "react";
import { type Measurement } from "../../api/client";
import styles from "./Table.module.css"; // Estilos específicos da tabela

type Props = {
  data: Measurement[];
  loading: boolean;
};

export default function Table({ data, loading }: Props) {
  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.tableWrap}>
      <table>
        <thead>
          <tr>
            <th>Estação</th>
            <th>Parâmetro</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Unidade</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m) => (
            <tr key={m.id}>
              <td>{m.station}</td>
              <td>{m.parameter}</td>
              <td>{new Date(m.measured_at).toLocaleString()}</td>
              <td>{m.value}</td>
              <td>{m.unit}</td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={5} className={styles.noData}>
                Nenhum registro encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}