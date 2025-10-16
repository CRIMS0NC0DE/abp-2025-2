// src/pages/Map/MapPage.tsx
import { useState } from 'react';
import styles from './MapPage.module.css';
import MapaInterativo from '../../components/MapaInterativo';

// Estrutura de dados para os botões
const buttonData = [
  {
    main: 'Parâmetros Físico-Químicos',
    sub: [
      'Temperatura (Água, Ar, Solo)', 'Condutividade', 'pH', 'Oxigênio Dissolvido (OD)',
      'Potencial Redox', 'Turbidez', 'Sólidos Totais Dissolvidos (TDS)',
      'Profundidade (Secchi)', 'Material em Suspensão', 'Intensidade Luminosa'
    ]
  },
  {
    main: 'Gases de Efeito Estufa (GEE)',
    sub: [
      'Concentração: Dióxido de Carbono (CO₂)', 'Concentração: Metano (CH₄)', 'Concentração: Óxido Nitroso (N₂O)',
      'Fluxos: Fluxo Difusivo (CO₂, CH₄)', 'Fluxos: Fluxo Ebulitivo (Bolhas) (CH₄)',
      'Composição de Bolhas (CO₂, CH₄, N₂O, O₂, N₂)'
    ]
  },
  {
    main: 'Ciclo do Carbono',
    sub: [
      'Carbono Orgânico (Total, Particulado, Dissolvido)', 'Carbono Inorgânico Dissolvido',
      'Carbono Total', 'Fluxos de Carbono (Prod. Primária, Respiração, etc.)', 'Isótopos Estáveis (δ¹³C)'
    ]
  },
  {
    main: 'Nutrientes e Íons',
    sub: [
      'Nitrogênio (Total, Isótopos δ¹⁵N)', 'Fósforo Total', 'Íons na Água (Cloretos, Nitrato, Amônio, etc.)', 'Nutrientes no Sedimento'
    ]
  },
  {
    main: 'Parâmetros Biológicos',
    sub: [
      'Clorofila-a', 'Bactérias (Densidade e Biomassa)', 'Fitoplâncton (Densidade e Biomassa)', 'Zooplâncton (Densidade e Biomassa)'
    ]
  },
  {
    main: 'Dados do Sedimento',
    sub: [ 'Teor de Água', 'Matéria Orgânica' ]
  }
];

export default function MapPage() {
  // Estado para controlar qual menu está aberto. 'null' significa nenhum.
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Função para abrir/fechar um menu
  const toggleMenu = (mainButton: string) => {
    setOpenMenu(openMenu === mainButton ? null : mainButton);
  };

  return (
    <div className={styles.container}>
      <MapaInterativo />

      <div className={styles.buttonContainer}>
        {buttonData.map((menu) => (
          <div key={menu.main}>
            <button
              className={styles.mainButton}
              onClick={() => toggleMenu(menu.main)}
            >
              {menu.main}
            </button>
            {/* Renderiza os sub-botões apenas se o menu estiver aberto */}
            {openMenu === menu.main && (
              <div className={styles.subButtonContainer}>
                {menu.sub.map((subItem) => (
                  <button key={subItem} className={styles.subButton}>
                    {subItem}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}