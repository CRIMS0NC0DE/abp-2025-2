import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CardComponent from '../../components/Card/Card';
import styles from './SimaPage.module.css';

const Card = CardComponent as unknown as React.ComponentType<any>;

import bannerImg from '../../../../imagens/sima/banner.png';
import mapIcon from '../../assets/map-icon.png';
import tableIcon from '../../assets/table-icon.png';
import downloadIcon from '../../assets/download-logo_card.png';

export default function SimaPage() {
  return (
    <>
      <Header />
      <div className={styles.simaContainer}>
        <section
          className={styles.banner}
          style={{ backgroundImage: `url(${bannerImg})` }}
        >
          <div className={styles.bannerOverlay}>
            <div className={styles.bannerText}>
              <h1>SIMA</h1>
              <p>Sistema Integrado de Monitoramento Ambiental</p>
            </div>
          </div>
        </section>

        <main className={styles.content}>
          <p className={styles.description}>
            O Sistema Integrado de Monitoramento Ambiental (SIMA) é uma plataforma robusta para a gestão e visualização de dados ambientais. Desenvolvida em parceria com instituições de renome, a ferramenta oferece acesso a um vasto conjunto de informações coletadas por sondas e sensores, permitindo análises detalhadas e o acompanhamento de variáveis ambientais em tempo real e de forma histórica.
          </p>

          <div className={styles.cardsContainer}>
            <Card
              label="Mapa Interativo"
              iconSrc={mapIcon}
              to="/mapa"
            />
            <Card
              label="Consulta por Tabela"
              iconSrc={tableIcon}
              to="/tabelas"
            />
            <Card
              label="Download dos Dados"
              iconSrc={downloadIcon}
              to="/exportar-csv"
            />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}