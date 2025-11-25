import { useState } from "react";
import { NavLink } from 'react-router-dom';

// Importa os estilos do CSS Module
import styles from './PublicacoesSimaPage.module.css';


export default function PublicacoesSimaPage() {
  // --- Lógica do Menu ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainNavLinks = [
    { label: 'Home', to: '/' },
    { label: 'Início', to: '/sima' },
    { label: 'Banco de Dados', to: '/sima-table' },
    { label: 'Publicações', to: '/publicacoesSimaPage' }, 
    { label: 'BALCAR', to: '/balcar' },
    { label: 'FURNAS', to: '/furnas' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função helper para formatar subscritos (CO_2, CH_4)
  const renderSubscript = (text: string) => {
    const parts = text.split(/_(\d+)/g); // Procura por _(numero)
    return parts.map((part, index) => {
      if (index % 2 !== 0) { // Se for a parte capturada (o número)
        return <sub key={index}>{part}</sub>;
      }
      return part; // Retorna o texto normal (ex: "CO", "CH")
    });
  };


  return (
    <>
      {/* --- Parte 1: O MENU --- */}
      <div className={styles.subHead}>
        <button
          className={`${styles.hamburgerButton} ${isMenuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`${styles.mainNav} ${isMenuOpen ? styles.menuOpen : ''}`}>
          <ul>
            {mainNavLinks.map(link => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => isActive ? styles.active : ''}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* --- Parte 2: O CONTEÚDO (NOVO CONTEÚDO INSERIDO) --- */}
      <main className={styles.mainContent}>
        <section className={styles.section}>
          <h1 className={styles.sectionTitle}>
            Publicações
          </h1>
          <p className={styles.sectionSubtitle}>
            Produção científica do projeto Balanço de Carbono em Reservatórios Hidrelétricos
          </p>

          {/* ==================== Artigos ==================== */}
          <h2 className={styles.categoryTitle}>
            Artigos
          </h2>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Limnological characterization of floodplain lakes in Mamirauá Sustainable Development Reserve, Central Amazon (Amazonas State, Brazil).</h4>
            <p className={styles.publicationAuthors}>AFFONSO, A. G.; QUEIROZ, H. L.; and NOVO, E. M. L. M.</p>
            <p className={styles.publicationDetails}>Acta Limnologica Brasiliensia, 23(1): 95-108. 2011. ISSN: 2179-975X.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>A system for environmental monitoring of hydroelectric reservoirs in Brazil.</h4>
            <p className={styles.publicationAuthors}>ALCÂNTARA, E.; CURTARELLI, M.; OGASHAWARA, I; STECH, J.; SOUZA, A.</p>
            <p className={styles.publicationDetails}>Revista Ambiente & Água - An Interdisciplinary Journal of Applied Science: v. 8, n.1, p. 6-17, 2013.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Environmental factors associated with long-term changes in chlorophyll-a concentration in the Amazon floodplain.</h4>
            <p className={styles.publicationAuthors}>ALCÂNTARA, E.; NOVO, E. M.; BARBOSA, C. F.; BONNET, M-P.; STECH, J. L.; and OMETTO, J. P.</p>
            <p className={styles.publicationDetails}>Biogeosciences Discussions, 8(2): 3739-3770. 2011. DOI: &lt;10.5194/bgd-8-3739-2011&gt;.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Desenvolvimento de modelo conceitual termodinâmico para o reservatório hidrelétrico de Itumbiara baseado em dados de satélite e telemétricos.</h4>
            <p className={styles.publicationAuthors}>ALCÂNTARA, E. H.; and STECH, J. L.</p>
            <p className={styles.publicationDetails}>Revista Ambiente & Água, 6: 157-179. 2011.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>A contribution to understanding the turbidity behaviour in an Amazon floodplain.</h4>
            <p className={styles.publicationAuthors}>ALCÂNTARA, E.; NOVO, E.; STECH, J.; LORENZZETTI, J.; BARBOSA, C.; ASSIREU, A.; and SOUZA, A.</p>
            <p className={styles.publicationDetails}>Hydrolology and Earth System Sciences, 14(2): 351-364. 2010. DOI: &lt;10.5194/hess-14-351-2010&gt;.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>On the water thermal response to the passage of cold fronts: initial results for Itumbiara reservoir (Brazil).</h4>
            <p className={styles.publicationAuthors}>ALCÂNTARA, E. H.; BONNET, M. P.; ASSIREU, A. T.; STECH, J. L.; NOVO, E. M. L. M.; and LORENZZETTI, J. A.</p>
            <p className={styles.publicationDetails}>Hydrology and Earth System Sciences Discussions, 7: 9437-9465. 2010. DOI: &lt;10.5194/hessd-7-9437-2010&gt;.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Remote sensing of water surface temperature and heat flux over a tropical hydroelectric reservoir.</h4>
            <p className={styles.publicationAuthors}>ALCÂNTARA, E. H.; STECH, J. L.; LORENZZETTI, J. A.; BONNET, M. P.; CASAMITJANA, X.; ASSIREU, A. T.; and NOVO, E. M. L. M.</p>
            <p className={styles.publicationDetails}>Remote Sensing of Environment, 114(11): 2651-2665, 2010. DOI: &lt;10.1016/j.rse.2010.06.002&gt;.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Use of ordinary kriging algorithm and wavelet analysis to understanding the turbidity behavior in an amazon floodplain.</h4>
            <p className={styles.publicationAuthors}>ALCÂNTARA, E. H.</p>
            <p className={styles.publicationDetails}>Journal of Computational Interdisciplinary Sciences, 1(1): 57-70. 2008.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Hydro-physical processes at the plunge point: an analysis using satellite and in situ data.</h4>
            <p className={styles.publicationAuthors}>ASSIREU, A. T.; ALCÂNTARA, E.; NOVO, E. M. L. M.; ROLAND, F.; PACHECO, F. S.; STECH, J. L.; and LORENZZETTI, J. A.</p>
            <p className={styles.publicationDetails}>Hydrology and Earth System Sciences, 15, 3689-3700, doi:10.5194/hess-15-3689-2011, 2011.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Carbon dioxide and methane fluxes in the littoral zone of a tropical savanna reservoir (Corumbá, Brazil).</h4>
            <p className={styles.publicationAuthors}>BERGIER, I.; NOVO, E. M. L. M.; RAMOS; F. M.; MAZZI, E. A.; and RASERA, M. F. F. L.</p>
            <p className={styles.publicationDetails}>Oecologia Australis, 15(3): 666-681. 2011. DOI: &lt;10.4257/oeco.2011.1503.17&gt;.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Avaliação da dinâmica temporal da evaporação no reservatório de Itumbiara, GO, utilizando dados obtidos por sensoriamento remoto.</h4>
            <p className={styles.publicationAuthors}>CURTARELLI, M. P.; ALCÂNTARA, E. H.; ARAÚJO, C. A. S.; STECH, J. L.; LORENZZETTI, J. A.</p>
            <p className={styles.publicationDetails}>Ambi-Água, Taubaté, v. 8, n.1 1, p. 272-289, 2013, ISSN:1980-993X, doi:10.4136/1980-993X.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Effects of cold fronts on MODIS-derived sensible and latent heat fluxes in Itumbiara reservoir (Central Brazil).</h4>
            <p className={styles.publicationAuthors}>CURTARELLI, M.; ALCÂNTARA, E.; RENNÓ, C; STECH, J.</p>
            <p className={styles.publicationDetails}>Advances in Space Research, Available online 1 August 2013, ISSN 0273-1177, http://dx.doi.org/10.1016/j.asr.2013.07.037.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Modeling the effects of cold front passages on the heat ﬂuxes and thermal structure of a tropical hydroelectric reservoir.</h4>
            <p className={styles.publicationAuthors}>CURTARELLI, M. P.; ALCÂNTARA, E. H.; RENNÓ, C. D.; STECH, J. L.</p>
            <p className={styles.publicationDetails}>Hydrol. Earth Syst. Sci. Discuss., 10, 8467–8502, 2013. DOI: &lt;10.5194/hessd-10-8467-2013&gt;.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Localização de áreas de monitoramento telemétrico em ambientes aquáticos da Amazônia.</h4>
            <p className={styles.publicationAuthors}>LIMA, I. B. T.; BARBOSA, C. C.; NOVO, E. M. L. M.; CARVALHO, J. C.; and STECH, J. L.</p>
            <p className={styles.publicationDetails}>Acta Amazonica, 36(3): 331-334. 2006.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Caracterização limnológica do reservatório hidrelétrico de Itumbiara, Goiás, Brasil.</h4>
            <p className={styles.publicationAuthors}>NASCIMENTO, R. F. F.; ALCÂNTARA, E. H.; KAMPEL, M.; and STECH, J. L.</p>
            <p className={styles.publicationDetails}>Revista Ambiente & Água, 6: 143-156. 2011.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Integração de Dados do Sistema de Monitoramento Automático de Variáveis Ambientais (SIMA) e de Imagens Orbitais na Avaliação do Estado Trófico do Reservatório da UHE Funil.</h4>
            <p className={styles.publicationAuthors}>NOVO, E. M. L. M.; STECH, J. L. ; ALCÂNTARA, E. H.; LONDE, L. R.; ASSIREU, A.; BARBOSA, C. C.; and SOUZA, A. F.</p>
            <p className={styles.publicationDetails}>Geografia (Rio Claro. Impresso), 35: 641-660. 2010.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Variability of carbon dioxide flux from tropical (Cerrado) hydroelectric reservoirs.</h4>
            <p className={styles.publicationAuthors}>ROLAND, F.; VIDAL, L. O.; PACHECO, F. S.; BARROS, N. O.; ASSIREU, A.; OMETTO, J. P. H. B.; CIMBLERIS, A. C. P.; and COLE, J. J.</p>
            <p className={styles.publicationDetails}>Aquatic Sciences, 72(3): 283-293. 2010. DOI: &lt;10.1007/s00027-010-0140-0&gt;.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Seasonal and spatial variability of {renderSubscript('CO_2')} emission from a large floodplain lake in the lower Amazon.</h4>
            <p className={styles.publicationAuthors}>RUDORFF, C. M.; MELACK, J. M.; MACINTYRE, S.; BARBOSA, C. C. F.; and NOVO, E. M. L. M.</p>
            <p className={styles.publicationDetails}>Journal of Geophysical Research, 116: G04007, 2011. DOI: &lt;10.1029/2011JG001699&gt;.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Telemetric monitoring system for meteorological and limnological data acquisition.</h4>
            <p className={styles.publicationAuthors}>STECH, J. L.; LIMA, I. B. T.; NOVO, E. M. L. M.; ASSIREU, A. T.; LORENZZETTI, J. A.; CARVALHO, J. C.; and ROSA, R. R.</p>
            <p className={styles.publicationDetails}>Proceedings of the International Association of Theoretical and Applied Limnology, 29: 1747-1750. 2006.</p>
          </div>

          {/* ==================== Livro ==================== */}
          <h2 className={styles.categoryTitle}>
            Livro
          </h2>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Novas tecnologias para o monitoramento e estudo de reservatórios hidrelétricos e grandes lagos.</h4>
            <p className={styles.publicationAuthors}>ALCÂNTARA, E. H.; NOVO, E. M. L. M.; and STECH, J. L. (Orgs.).</p>
            <p className={styles.publicationDetails}>São José dos Campos: Parêntese, 2011.</p>
          </div>

          {/* ==================== Capítulos de livros ==================== */}
          <h2 className={styles.categoryTitle}>
            Capítulos de livros
          </h2>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Tecnologia Espacial para o monitoramento da Temperatura e Fluxos de Calor na Superfície da Água do Reservatório Hidrelétrico de Itumbiara (GO).</h4>
            <p className={styles.publicationAuthors}>ALCÂNTARA, E. H.; STECH, J. L.; LORENZZETTI, J. A.; and NOVO, E. M. L. M.</p>
            <p className={styles.publicationDetails}>In: ALCÂNTARA, E. H.; NOVO, E. M. L. M.; and STECH, J. L. (Orgs.). Novas tecnologias para o monitoramento e estudo de reservatórios hidrelétricos e grandes lagos. São José dos Campos: Parêntese, p.: 15-80. 2011.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>A Successful Combined Use of Telemetric Monitoring System and Spatial Data Modeling to Study the Turbidity Behavior in the Amazon Floodplain.</h4>
            <p className={styles.publicationAuthors}>ALCÂNTARA, E. H.; NOVO, E. M. L. M.; STECH, J. L.; BARBOSA, C.; LORENZZETTI, J. A.; ASSIREU, A.T.; BONNET, M-P; and SOUZA, A. F.</p>
            <p className={styles.publicationDetails}>In: ÁLVAREZ, M. A. (Org.). Floodplains: Physical Geography, Ecology and Societal Interactions. New York: Nova Science, p.: 201-226. 2011.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Linking telemetric climatic-limnologic data and online {renderSubscript('CH_4')} and {renderSubscript('CO_2')} flux dynamics.</h4>
            <p className={styles.publicationAuthors}>LIMA, I. B. T.; RAMOS, F. M.; NOVO, E. M. L. M; LORENZZETTI, J. A.; ROSA, R. R.; BARBOSA, C. C.; OMETTO, J. P. H. B.; and ASSIREU, A. T.</p>
            <p className={styles.publicationDetails}>In: SANTOS, M. A.; and ROSA, L. P. (Orgs.). Global warming and hydroeletric reservoirs. Rio de Janeiro: COPPE, p.: 67-69. 2005.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>SIMA: A near real time buoy data acquisition and telemetry system as support for limnological studies.</h4>
            <p className={styles.publicationAuthors}>LORENZETTI, J. A.; STECH, J. L.; NOVO, E. M. L. M.; and LIMA, I. B. T.</p>
            <p className={styles.publicationDetails}>In: SANTOS, M. A.; and ROSA, L. P. (Orgs.). Global warming and hydroeletric reservoirs. Rio de Janeiro: COPPE, p.: 71-80. 2005.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Space technology contribution for sustainable development in the Amazon Floodplain.</h4>
            <p className={styles.publicationAuthors}>NOVO, E. M. L. M.; STECH, J. L.; and BARBOSA, C. C. F.</p>
            <p className={styles.publicationDetails}>In: TIEZZI, E.; BREBBIA, C. A.; JØRGENSEN, S. E.; and GOMAR, D. A. (Eds.). Ecosystems and sustainable development V. Southampton: WIT Press, 2005. p. 563-570. Fifth Iinternational Conference on Ecosystems and Sustainable Development ECOSUD V. ISBN: 1-84564-013-6. (INPE-13383-PRE/8598).</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Uso de Derivadores Rastreados por Satélite em Ambientes Aquáticos Continentais.</h4>
            <p className={styles.publicationAuthors}>PACHECO, F. S.; ASSIREU, A. T.; and ROLAND, F.</p>
            <p className={styles.publicationDetails}>In: ALCÂNTARA, E. H.; NOVO, E. M. L. M.; and STECH, J. L. (Orgs.). Novas tecnologias para o monitoramento e estudo de reservatórios hidrelétricos e grandes lagos. São José dos Campos: Parêntese, p.: 193-218. 2011.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Uso de tecnologia espacial para coleta automática de dados limnológicos e meteorológicos: aplicações nos reservatórios hidrelétricos de Manso e Corumbá.</h4>
            <p className={styles.publicationAuthors}>STECH, J.; ALCÂNTARA, E. H.; LORENZZETTI, J. A.; NOVO, E. M. L. M.; and LIMA, I. B. T.</p>
            <p className={styles.publicationDetails}>In: ALCÂNTARA, E. H.; NOVO, E. M. L. M.; and STECH, J. L. (Orgs.). Novas tecnologias para o monitoramento e estudo de reservatórios hidrelétricos e grandes lagos. São José dos Campos: Parêntese, p.: 163-191. 2011.</p>
          </div>

          {/* ==================== Eventos ==================== */}
          <h2 className={styles.categoryTitle}>
            Eventos
          </h2>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Estimativa dos fluxos de calor sensível e latente na superfície da água do reservatório de Itumbiara (GO) por meio de dados MODIS/Terra.</h4>
            <p className={styles.publicationAuthors}>ALCÂNTARA, E. H; STECH, J. L.; LORENZZETTI, J. A.; NOVO, E. M. L. M.; and SOUZA, A. F.</p>
            <p className={styles.publicationDetails}>In: Simpósio Brasileiro de Sensoriamento Remoto, 2011, Curitiba. Anais XV Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos Campos: INPE, p.: 5185-5192.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Spatially Water Heat Flux using MODIS/terra data.</h4>
            <p className={styles.publicationAuthors}>ALCÂNTARA, E.; and STECH, J.</p>
            <p className={styles.publicationDetails}>In: 31st EARSeL Symposium and 34th General Assembly 2011. Prague: European Association of Remote Sensing Laboratories, 2011.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>On the spatially water temperature and heat flux variability over a tropical hydroelectric reservoir.</h4>
            <p className={styles.publicationAuthors}>ALCÂNTARA, E. H.; STECH, J. L.; CASAMITJANA, X.; BONNET, M-P; LORENZZETTI, J. A.; and NOVO, E. M. L. M.</p>
            <p className={styles.publicationDetails}>In: 14th International Workshop on Physical Processes in Natural Waters, 2010, Reykjavík: University of Iceland, p.: 8-15. 2010.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Cross wavelet, coherence and phase between water surface temperature and heat flux in a tropical hydroelectric reservoir.</h4>
            <p className={styles.publicationAuthors}>ALCÂNTARA, E. H.; STECH, J. L.; LORENZZETTI, J. A.; and NOVO, E. M. L. M.</p>
            <p className={styles.publicationDetails}>In: 14th International Workshop on Physical Processes in Natural Waters, 2010, Reykjavík: University of Iceland, p.: 86-93. 2011.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Integração de dados de alta frequência temporal e imagens MODIS/Terra para o estudo da turbidez na planície de Curuai (PA, Brasil).</h4>
            <p className={styles.publicationAuthors}>ALCÂNTARA, E. H.; STECH, J. L. ; BARBOSA, C.; NOVO, E. ; and SHIMABUKURO, Y.</p>
            <p className={styles.publicationDetails}>In: XIII Simpósio Brasileiro de Sensoriamento Remoto, 2007, Florianópolis. XIII Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos Campos: INPE, p.: 6549-6556.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>O comportamento do rio ao longo do reservatório observado a partir de Sensoriamento Remoto, dados in situ e ensaios de laboratório.</h4>
            <p className={styles.publicationAuthors}>ASSIREU, A. T.; NOVO, E M. L. M.; ROLAND, F.; PACHECO, F. S.; ALCÂNTARA, E. H.; and STECH, J. L.</p>
            <p className={styles.publicationDetails}>In: XVI Simpósio Brasileiro de Sensoriamento Remoto, 2009, Natal. XIV Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos Campos: INPE, p.: 4647-4653.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Aplicação do Operador de Fragmentação Assimétrica (FA) na comparação de dados coletados in situ por diferentes sensores e transmitidos pelos satélites brasileiros SCD e CBERS: um exemplo de aplicação ao Sistema de Monitoramento Ambiental (SIMA).</h4>
            <p className={styles.publicationAuthors}>ASSIREU, A. T.; STECH, J. L.; NOVO, E. M. L. M.; LORENZETTI, J. A.; LIMA, I. B. T.; and CARVALHO, J. C.</p>
            <p className={styles.publicationDetails}>In: XII Simpósio Brasileiro de Sensoriamento Remoto, 2005, Goiânia. XII Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos Campos: INPE, p.: 2455-2462.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Integração de dados do sistema automático de monitoramento de variáveis ambientais (SIMA) e de imagens orbitais na avaliação do estado trófico do Reservatório da UHE Funil.</h4>
            <p className={styles.publicationAuthors}>NOVO, E. M. L. M.; STECH, J. L.; LONDE, L. R.; ASSIREU, A.; BARBOSA, C. C.; ALCÂNTARA, E. H.; and SOUZA, A. F.</p>
            <p className={styles.publicationDetails}>In: XVI Simpósio Brasileiro de Sensoriamento Remoto, 2009, Natal. XIV Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos Campos: INPE, p.: 4797-4804.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Temporal variability Chlorophyll-a concentration in floodplain lakes in response to seasonality of Amazon River discharge.</h4>
            <p className={styles.publicationAuthors}>NOVO, E.; BARBOSA, C.; STECH, J.; ALCÂNTARA, E. H.; RUDORFF, C. M.; and ASSIREU, A. T.</p>
            <p className={styles.publicationDetails}>In: Amazônia em Perspectiva, 2008, Manaus. Anais Amazônia em Perspectiva.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Arquitetura de um banco de dados para suporte à integração de dados de campo e de sensoriamento remoto em estudos limnológicos e meteorológicos.</h4>
            <p className={styles.publicationAuthors}>SOUZA, A. F.; BARBOSA, C. C.; NOVO, E. M. L. M.; and STECH, J. L.</p>
            <p className={styles.publicationDetails}>In: XVI Simpósio Brasileiro de Sensoriamento Remoto, 2009, Natal. XIV Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos Campos: INPE, p.: 2349-2355.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>The impacts of the cold fronts on thermal stratification and water quality in a tropical reservoir (Brazil).</h4>
            <p className={styles.publicationAuthors}>STECH, J. L.; ALCÂNTARA, E. H.; LORENZZETTI, J. A.; NOVO, E. M. L. M.; and ASSIREU, A. T.</p>
            <p className={styles.publicationDetails}>In: 14th International Workshop on Physical Processes in Natural Waters, 2010, Reykjavík: University of Iceland, p.: 94-101. 2010.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Variabilidade dos dados bóia SIMA analisados pelo Operador de Fragmentação Assimétrica.</h4>
            <p className={styles.publicationAuthors}>VALÉRIO, A. M.; KAMPEL, M.; STECH, J. L.; and ASSIREU, A. T.</p>
            <p className={styles.publicationDetails}>In: Simpósio Brasileiro de Sensoriamento Remoto, 2011, Curitiba. Anais XV Simpósio Brasileiro de Sensoriamento Remoto - SBSR. São José dos Campos: INPE, p.: 5108-5115.</p>
          </div>


          {/* ==================== Teses e dissertações ==================== */}
          <h2 className={styles.categoryTitle}>
            Teses e dissertações
          </h2>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Sensoriamento remoto da temperatura e dos fluxos de calor na superfície da água no reservatório de Itumbiara (GO).</h4>
            <p className={styles.publicationAuthors}>ALCÂNTARA, E. H. 2010.</p>
            <p className={styles.publicationDetails}>Tese (Doutorado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas Espaciais. 136 p.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Análise da turbidez na planície de inundação de Curuaí (PA, Brasil) integrando dados telemétricos e Imagens MODIS/Terra.</h4>
            <p className={styles.publicationAuthors}>ALCÂNTARA, E. H. 2006.</p>
            <p className={styles.publicationDetails}>Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas Espaciais. 217 p.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Caracterização e avaliação da dinâmica sazonal as propriedades bio-ópticas do reservatório de Funil com apoio de sensoriamento remoto, dados in situ e modelos ópticos.</h4>
            <p className={styles.publicationAuthors}>AUGUSTO-SILVA, P. B. 2013.</p>
            <p className={styles.publicationDetails}>Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas Espaciais. 155 p.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Estudo da influência de frentes frias sobre a circulação e os processos de estratificação e mistura no reservatório de Itumbiara (GO): um enfoque por modelagem hidrodinâmica e Sensoriamento Remoto.</h4>
            <p className={styles.publicationAuthors}>CURTARELLI, M. P. 2012.</p>
            <p className={styles.publicationDetails}>Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas Espaciais. 108 p.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Caracterização da influência de sistemas frontais sobre a qualidade da água do reservatório de Itumbiara, GO, utilizando dados de sensoriamento remoto e dados in situ.</h4>
            <p className={styles.publicationAuthors}>CESAR, G. M. 2011.</p>
            <p className={styles.publicationDetails}>Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas Espaciais. 81 p.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Utilização de imagens MERIS e dados in situ para a caracterização bio-óptica do reservatório de Itumbiara, GO.</h4>
            <p className={styles.publicationAuthors}>NASCIMENTO, R. F. F. 2010.</p>
            <p className={styles.publicationDetails}>Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas Espaciais. 91 p.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>O uso do sensoriamento remoto orbital e de superfície para o estudo do comportamento do corpo de água do reservatório de Manso, MT, Brasil.</h4>
            <p className={styles.publicationAuthors}>VALÉRIO, A. M. 2009.</p>
            <p className={styles.publicationDetails}>Dissertação (Mestrado em Sensoriamento Remoto) - Instituto Nacional de Pesquisas Espaciais. 117 p.</p>
          </div>

          {/* ==================== Relatórios técnicos ==================== */}
          <h2 className={styles.categoryTitle}>
            Relatórios técnicos
          </h2>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Satellite ecohydrology and multifractals: perspectives for understanding and dealing with greenhouse gas emissions from hydroreservoirs.</h4>
            <p className={styles.publicationAuthors}>LIMA, I. B. T. ; STECH, J. L. ; RAMOS, F. M.</p>
            <p className={styles.publicationDetails}>Relatório técnico - INPE, 2005.</p>
          </div>

        </section>
      </main>
    </>
  );
}