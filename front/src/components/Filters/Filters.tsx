// front/src/components/Filters/Filters.tsx

import React, { useState } from "react";
import styles from "./Filters.module.css"; // Usando CSS Modules

type Props = {
  onChange: (filters: Record<string, any>) => void;
};

export default function Filters({ onChange }: Props) {
  const [institution, setInstitution] = useState("");
  const [reservoir, setReservoir] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const apply = () => {
    onChange({ institution, reservoir, from, to });
  };

  const clear = () => {
    setInstitution("");
    setReservoir("");
    setFrom("");
    setTo("");
    onChange({});
  };

  return (
    <div className={styles.filters}>
      <input placeholder="Instituição" value={institution} onChange={(e) => setInstitution(e.target.value)} />
      <input placeholder="Reservatório" value={reservoir} onChange={(e) => setReservoir(e.target.value)} />
      <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
      <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
      <div className={styles.filterActions}>
        <button onClick={apply} className={`${styles.btn} ${styles.primary}`}>Filtrar</button>
        <button onClick={clear} className={styles.btn}>Limpar</button>
      </div>
    </div>
  );
}