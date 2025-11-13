import { useState } from "react";
import { NavLink } from 'react-router-dom';


import styles from './PublicacoesFurnasPage.module.css';


export default function PublicacoesFurnasPage() {
  // --- Lógica do Menu ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainNavLinks = [
    { label: 'Home', to: '/' },
    { label: 'Início', to: '/furnas' },
    { label: 'Banco de Dados', to: '/furnas-table' },
    { label: 'Publicações', to: '/publicacoes' }, 
    { label: 'SIMA', to: '/sima' },
    { label: 'BALCAR', to: '/balcar' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Helper para renderizar subscritos em JSX
  const renderSubscript = (text: string) => {
    // Regex simples para encontrar _numero (como em CO_2 ou CH_4)
    // Pode precisar de ajuste se o formato for diferente
    const parts = text.split(/_(\d+)/g);
    return parts.map((part, index) => {
      // Se a parte for um número precedido por '_', renderiza como <sub>
      if (index % 2 !== 0) {
        return <sub key={index}>{part}</sub>;
      }
      return part;
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

      {/* --- Parte 2: O CONTEÚDO (Adaptado para CSS Modules) --- */}
      <main className={styles.mainContent}>
        <section className={styles.section}>
          <h1 className={styles.sectionTitle}>
            Publicações
          </h1>
          <p className={styles.sectionSubtitle}>
            Produção científica do projeto Balanço de Carbono em Reservatórios Hidrelétricos
          </p>

          {/* ==================== Matérias ==================== */}
          <h2 className={styles.categoryTitle}>
            Matérias
          </h2>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/lagoa.pdf" target="_blank" rel="noopener noreferrer">
                As Muitas Faces de uma Lagoa - Ciência Hoje setembro de 1999
              </a>
            </h4>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/RelFProj029.pdf" target="_blank" rel="noopener noreferrer">
                Capacitação do Setor Elétrico Brasileiro em Relação à Mudança Global do Clima
              </a>
            </h4>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/revistaFurnas_341_mcapa.pdf" target="_blank" rel="noopener noreferrer">
                Energia Renovável e Limpa: Pesquisa revela que hidrelétricas de FURNAS emitem cem vezes menos gases de efeito estufa que termelétricas. Revista Furnas de junho de 2007
              </a>
            </h4>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/LD297_pesqui.pdf" target="_blank" rel="noopener noreferrer">
                FURNAS inicia pesquisa de balanço de carbono em reservatórios - Linha Direta No 297 de 14 de junho de 2003
              </a>
            </h4>
          </div>

          {/* ==================== Publicações em Revistas e Livros ==================== */}
          <h2 className={styles.categoryTitle}>
            Publicações em Revistas e Livros
          </h2>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Carbon gas emission from the sediments of reservoirs of different ages in central Brazil
            </h4>
            <p className={styles.publicationAuthors}>
              ABE, D. S. ; SIDAGIS-GALLI, C. ; ADAMS, D. D. ; CIMBLERIS, A. C. P. ; BRUM, P. R. ; TUNDISI, J. G. ; TUNDISI, T. M. ; MATSUMURA-TUNDISI, J. E.
            </p>
            <p className={styles.publicationDetails}>
              In: Marco Aurélio dos Santos; Luiz Pinguelli Rosa. (Org.). Global Warming and Hydroelectric Reservoirs. 1 ed. Rio de Janeiro: COPPE/UFRJ e Eletrobrás, 2005, v. 1, p. 101-107
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Carbon gas cycling in the sediments of Serra da Mesa and Manso reservoirs, central Brazil
            </h4>
            <p className={styles.publicationAuthors}>
              ABE, D. S. ; ADAMS, D. D. ; SIDAGIS-GALLI, C. ; CIMBLERIS, A. C. P. ; TUNDISI, J. G.
            </p>
            <p className={styles.publicationDetails}>
              Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte Limnologie, Stuttgart, v. 29, p. 567-572, 2005
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Princípios físicos e químicos a serviço da limnologia - um exercício
            </h4>
            <p className={styles.publicationAuthors}>
              ASSIREU, A. T. ; STECH, J. L. ; MARINHO, M. M. ; CESAR, D. E. ; LORENZZETTI, J. A. ; FERREIRA, R. M. ; PACHECO, F. S. ; ROLAND, F.
            </p>
            <p className={styles.publicationDetails}>
              In: Fábio Roland; Dionéia E. Cesar; Marcelo Marinho. (Org.). Lições de Limnologia. 1 ed. São Carlos: , 2005, p. 229-242
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Caminhos do fósforo em ecossistemas aquáticos continentais
            </h4>
            <p className={styles.publicationAuthors}>FERREIRA, R. M. ; ROLAND, F.</p>
            <p className={styles.publicationDetails}>
              In: Fábio Roland; Dionéia E. Cesar; Marcelo Marinho. (Org.). Lições de Limnologia. 1 ed. São Carlos: , 2005, p. 229-242
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Carbon dioxide and methane fluxes in the littoral zone of a tropical savanna reservoir (Corumbá, Brazil)
            </h4>
            <p className={styles.publicationAuthors}>
              LIMA, I. B. T. ; MAZZI, E. A. ; NOVO, E. M. L. M. ; OMETTO, J. P. H. B. ; MELACK, J. M. ; RAMOS, F. M. ; RASERA, M. F. F. L. ; ABE, D. S. ; LORENZZETTI, J. A. ; ASSIREU, A. T. ; ROSA, R. R. ; ROLAND, F. ; CIMBLERIS, A. C. P. ; BRUM, P. R. ; SOARES, C. B. P. ; SOUMIS, N. ; STECH, J. L.
            </p>
            <p className={styles.publicationDetails}>
              Submitted to Journal of Geophysical Research - Biogeosciences
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/dynamic-chamber-photoacoustic-sensor-2005.pdf" target="_blank" rel="noopener noreferrer">
                Photoacoustic/dynamic chamber method for measuring greenhouse gas fluxes in hydroreservoirs
              </a>
            </h4>
            <p className={styles.publicationAuthors}>
              LIMA, I. B. T. ; MAZZI, E. A. ; CARVALHO, J. C. ; OMETTO, J. P. H. B. ; RAMOS, F. M. ; STECH, J. L. ; NOVO, E. M. L. M.
            </p>
            <p className={styles.publicationDetails}>
              Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte Limnologie, Stuttgart, v. 29, p. 603-606, 2005
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/SatelliteEcohydrology.pdf" target="_blank" rel="noopener noreferrer">
                Satellite ecohydrology and multifractals: perspectives for understanding and dealing with greenhouse gas emissions from hydroreservoirs
              </a>
            </h4>
            <p className={styles.publicationAuthors}>LIMA, I. B. T. ; STECH, J. L. ; RAMOS, F. M.</p>
            <p className={styles.publicationDetails}>Relatório técnico - INPE</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              The use of remote sensing and automated water quality systems for estimating greenhouse gas emissions from hydroelectric reservoirs
            </h4>
            <p className={styles.publicationAuthors}>
              LIMA, I. B. T. ; NOVO, E. M. L. M. ; STECH, J. L. ; LORENZZETTI, J. A.
            </p>
            <p className={styles.publicationDetails}>
              In: Luiz Pinguelli Rosa; Marco Aurélio dos Santos; José Galizia Tundisi. (Org.). Greenhouse gas emissions from hydropower reservoirs and water quality. Rio de Janeiro: COPPE-UFRJ, 2004, p. 47-65
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/Extreme_event_dynamics_methane_tropical.pdf" target="_blank" rel="noopener noreferrer">
                Extreme event dynamics in methane ebullition fluxes from tropical reservoirs
              </a>
            </h4>
            <p className={styles.publicationAuthors}>
              RAMOS, F. M. ; LIMA, I. B. T. ; ROSA, R. R. ; MAZZI, E. A. ; CARVALHO, J. C. ; RASERA, M. F. F. L. ; OMETTO, J. P. H. B. ; ASSIREU, A. T. ; STECH, J. L.
            </p>
            <p className={styles.publicationDetails}>
              Geophysical Research Letters, v. 33, L21404, doi:10.1029/2006GL027943, 2006
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Long term monitoring of greenhouse gas emissions at two brazilian hydro reservoirs
            </h4>
            <p className={styles.publicationAuthors}>
              ROSA, L. P. ; SANTOS, M. A. ; MATVIENKO, B. ; SANTOS, E. O. ; SILVA, M. B. ; SIKAR, E.
            </p>
            <p className={styles.publicationDetails}>
              In: Luiz Pinguelli Rosa; Marco Aurélio dos Santos; José Galízia Tundisi. (Org.). Greenhouse Gas Emissions from Hydropower Reservoirs and Water Quality. 1 ed. Rio de Janeiro: COPPE/UFRJ, 2004, v. 1, p. 121-136
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Carbon dioxide and methane emissions from hydroelectric reservoirs in Brazil
            </h4>
            <p className={styles.publicationAuthors}>
              SANTOS, M. A. ; MATVIENKO, B. ; ROSA, L. P. ; SIKAR, E.
            </p>
            <p className={styles.publicationDetails}>
              In: Marco Aurélio dos Santos; Luiz Pinguelli Rosa. (Org.). Global Warming and Hydroelectric Reservoirs. 1 ed. Rio de Janeiro: COPPE/UFRJ, 2005, v. 1, p. 81-94
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Global warming and hydroelectric reservoirs</h4>
            <p className={styles.publicationAuthors}>Editores: SANTOS, M. A. ; ROSA, L. P.</p>
            <p className={styles.publicationDetails}>
              1. ed. Rio de Janeiro: COPPE/UFRJ, 2005. v. 1. 196 p. (Como um produto do encontro no SIL, foi lançado este livro com diversas contribuições dos integrantes do projeto)
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/energypolicyhydroversusthermo.pdf" target="_blank" rel="noopener noreferrer">
                Gross greenhouse gas fluxes from hydro-power reservoir compared to thermo-power plants
              </a>
            </h4>
            <p className={styles.publicationAuthors}>
              SANTOS, M. A. ; ROSA, L. P. ; MATVIENKO, B. ; SIKAR, E. ; SANTOS, E. O.
            </p>
            <p className={styles.publicationDetails}>
              Energy Policy, The Netherlands, v. 34, n. 1, p. 481-488, 2005
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/1878_IVL29_Sikar[1].pdf" target="_blank" rel="noopener noreferrer">
                Greenhouse gases and initial findings on the carbon circulation in two reservoirs and their watersheds {/* Corrigido 'theis' -> 'their' */}
              </a>
            </h4>
            <p className={styles.publicationAuthors}>
              SIKAR, E. ; SANTOS, M. A. ; MATVIENKO, B. ; SILVA, M. B. ; ALMEIDA, C. H. E. ; SANTOS, E. O. ; BENTES JUNIOR, A. P. ; ROSA, L. P.
            </p>
            <p className={styles.publicationDetails}>
              Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte Limnologie, Stuttgart, v. 29, n. 2, p. 573-576, 2005
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Caminhos do carbono em ecossistemas aquáticos continentais
            </h4>
            <p className={styles.publicationAuthors}>
              VIDAL, L. O. ; MENDONÇA, R. F. ; MARINHO, M. M. ; ROLAND, F.
            </p>
            <p className={styles.publicationDetails}>
              In: Fábio Roland; Dionéia E. Cesar; Marcelo Marinho. (Org.). Lições de Limnologia. 1 ed. São Carlos: Rima, 2005, p. 193-208
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/VariabilityCarbonDioxideFluxTropical.pdf" target="_blank" rel="noopener noreferrer">
                Variability of carbon dioxide flux from tropical (Cerrado) hydroelectric reservoirs
              </a>
            </h4>
            <p className={styles.publicationAuthors}>
              ROLAND F. ; VIDAL L. O. ; PACHECO, F. S. ; BARROS, N. O. ; ASSIREU, A. T. ; OMETTO, J. P. H. B. ; CIMBLERIS, A. C. P. ; COLE, J. J.
            </p>
            <p className={styles.publicationDetails}>Aquatic Sciences, v. 72, n. 3, p. 283-293, 2010</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Silicon as a permanent-carbon sedimentation tracer</h4>
            <p className={styles.publicationAuthors}>
              Sikar E. ; Matvienko B. ; Santos M. A. ; Patchineelam S. R. ; Santos E. O. ; Silva M. B. ; Rocha C. H. E. D. ; Cimbleris A. C. P. ; Rosa L. P.
            </p>
            <p className={styles.publicationDetails}>Inland Waters, v. 2, n. 3, p. 119-128, 2012</p>
          </div>

          {/* ==================== Participações em Congressos ==================== */}
          <h2 className={styles.categoryTitle}>
            Participações em Congressos
          </h2>

          {/* --- ASLO 2006 --- */}
          <h3 className={styles.congressTitle}>ASLO - 2006. Victoria, Canada</h3>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Greenhouse gas concentrations and diffusive flux at the sediment-water interface from 5 tropical reservoirs in Brazil: trophic status consideration
            </h4>
            <p className={styles.publicationAuthors}>
              ABE, D. S. ; SIDAGIS-GALLI, C. ; ADAMS, D. D. ; TUNDISI, J. G. ; MATSUMURA-TUNDISI, T. ; TUNDISI, J. E. ; CIMBLERIS, A. C. P. ; BRUM, P. R.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Carbon budget in two neotropical reservoirs</h4>
            <p className={styles.publicationAuthors}>
              CIMBLERIS, A. C. P. ; BRUM, P. R. ; SOARES, C. B. ; ROLAND, F. ; CESAR, D. E. ; ROSA, L. P. ; SANTOS, M. A. ; SIKAR, B. M. ; TUNDISI, J. G. ; ABE, D. S.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Management strategies to minimize bacterial methane emission from tropical hydroreservoirs
            </h4>
            <p className={styles.publicationAuthors}>
              LIMA, I. B. ; RAMOS, F. M. ; MAZZI, E. A. ; OMETTO, J. P. ; RASERA, M. F. ; ASSIREU, A. T. ; ROSA, R. R. ; NOVO, E. M. L. M. ; STECH, J. L.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Extreme event dynamics in methane bubbling from tropical reservoirs
            </h4>
            <p className={styles.publicationAuthors}>
              RAMOS, F. M. ; LIMA, I. B. ; MAZZI, E. A. ; OMETTO, J. P. ; RASERA, M. F. ; ASSIREU, A. T. ; ROSA, R. R. ; STECH, J. L.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Heterotrophic pathways on carbon balance in tropical reservoirs
            </h4>
            <p className={styles.publicationAuthors}>
              ROLAND, F. ; VIDAL, L. ; COLE, J. J. ; CIMBLERIS, A. C. P.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Land use-stream carbon fluxes relationship in a small watershed of a tropical hydro reservoir, Brazil
            </h4>
            <p className={styles.publicationAuthors}>
              SANTOS, M. A. ; MATVIENKO, B. ; ROSA, L. P. ; SILVA, C. ; COSTA, R. S. ; SIKAR, E. ; ROCHA, C. H. ; SILVA, M. B. ; BENTES JUNIOR, A. P.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              {/* Usando renderSubscript para CO2 e CH4 */}
              The effect of cold fronts over the emission patterns of {renderSubscript('CO_2')} and {renderSubscript('CH_4')} in Brazilian Tropical Reservoirs
            </h4>
            <p className={styles.publicationAuthors}>
              LORENZETTI, J. A. ; LIMA, I. B. ; ASIREU, A. T. ; STECH, J. L.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              The fitting of weibull pdf for surface winds observed in low latitude Brazilian lakes and hydroeletric reservoirs
            </h4>
            <p className={styles.publicationAuthors}>
              STECH, J. L. ; ASSIREU, A. T. ; LORENZETTI, J. L. ; NOVO, E. M. L. M. ; LIMA, I. B. ; RAMOS, F.
            </p>
          </div>

          {/* --- SIL 2004 --- */}
          <h3 className={styles.congressTitle}>SIL - 2004. Lahti, Finland</h3>
          <h4 className={styles.congressSubtitle}>
            XXIX Congress of the International Association of Theoretical and Applied Limnology
          </h4>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Carbon gas cycling in the sediments of Serra da Mesa and Manso reservoirs, central Brazil
            </h4>
            <p className={styles.publicationAuthors}>
              ABE, D. S. ; ADAMS, D.D. ; SIDAGIS-GALLI, C. ; CIMBLERIS, A. C. P. ; TUNDISI, J. G.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Theoretical diffusive flux of greenhouse gases ({renderSubscript('CH_4')} & {renderSubscript('CO_2')}) at the sediment-water interface from 24 lakes and reservoirs of different trophic status worldwide
            </h4>
            <p className={styles.publicationAuthors}>ADAMS, D. D.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Carbon budget in hydroelectric reservoirs of Furnas Centrais Elétricas S.A., Brazil
            </h4>
            <p className={styles.publicationAuthors}>
              CIMBLERIS, A. C. P. ; SANTOS, M. A. ; MATVIENKO, B. ; MOZETO, A. ; STECH, J. L. ; LIMA, I. B. T. ; TUNDISI, J. G. ; ABE, D. S. ; SIDAGIS-GALLI, C. V. ; ROLAND, F. ; CESAR, D. E. ; BRUM, P. R.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Carbon content in the zooplankton populations of Serra da Mesa Reservoir, Tocantins River, Brazil
            </h4>
            <p className={styles.publicationAuthors}>MATSUMURA-TUNDISI, T.; TUNDISI, J. G.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Methane emission downstream of reservoirs</h4>
            <p className={styles.publicationAuthors}>
              MATVIENKO, B. ; SANTOS, M. A. ; SIKAR, E. ; SILVA, M. B. ; ALMEIDA, C. H.E. ; SANTOS, E. O.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Preliminary results of photoacoustic/dynamic chamber technique for measuring greenhouse gas fluxes to the atmosphere from hydroelectric reservoirs in the brazilian savannah, cerrado
            </h4>
            <p className={styles.publicationAuthors}>
              MAZZI, E. A. ; LIMA, I. B. T. ; CARVALHO, J. C. ; OMETTO, J. P. H. B. ; RAMOS, F. M. ; STECH, J. L. ; NOVO, E. M. L. M.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Greenhouse gases and the carbon circulation in a reservoir and its watershed
            </h4>
            <p className={styles.publicationAuthors}>
              SANTOS, M. A. ; MATVIENKO, B. ; SIKAR, E. ; SILVA, M. B. ; ALMEIDA, C. H.E. ; SANTOS, E. O.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Sediment {renderSubscript('CH_4')} and {renderSubscript('CO_2')} concentrations and diffuse emission fluxes related to limnological factors in the Lobo-Broa reservoir, São Paulo State, Brazil
            </h4>
            <p className={styles.publicationAuthors}>
              SIDAGIS-GALLI, C.; ADAMS, D. D.; ABE, D. S.; SIKAR, E.; TUNDISI, J. G.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Telemetric monitoring system for ecohydrology applications in aquatic environments
            </h4>
            <p className={styles.publicationAuthors}>
              STECH, J. L. ; LIMA, I. B. T. ; NOVO, E. M. L. M. ; SILVA, C. M. ; ASSIREU, A. T. ; CARVALHO, J. C. ; LORENZZETTI, J. A. ; BARBOSA, C. C. ; ROSA, R. R.
            </p>
          </div>

          {/* --- SIL 2007 --- */}
          <h3 className={styles.congressTitle}>SIL - 2007. Montreal, Canada</h3>
          <h4 className={styles.congressSubtitle}>
            XXX Congress of the International Association of Theoretical and Applied Limnology
          </h4>
          <h4 className={styles.congressSubtitle}>
            Title: Greenhouse gas emissions from natural ecosystems and reservoirs
          </h4>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Carbon budget in seven Brazilian hydropower reservoirs
            </h4>
            <p className={styles.publicationAuthors}>
              CIMBLERIS, A. C. P. ; BRUM, P. R. ; SOARES, C. B. P. ; ROLAND, F. ; ROSA, L. P. ; SANTOS, M. A. ; MATVIENKO, B. ; TUNDISI, J. G. ; ABE, D. S. ; GALLI, C. S. ; STECH, J. L. ; NOVO, E. M. L. M.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Greenhouse gas emissions downstream tropical hydroeletric reservoirs
            </h4>
            <p className={styles.publicationAuthors}>
              DOS SANTOS, M. A. ; ROSA, L. P. ; MATVIENKO, B. ; DOS SANTOS, E. O. ; ROCHA, C. H. E. D’A. ; SIKAR, E. ; SILVA, M. B. ; JUNIOR, A. M. P. B.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Greenhouse gas concentrations and diffusive flux at the sediment-water interface from two reservoirs in Brazil
            </h4>
            <p className={styles.publicationAuthors}>
              GALLI, C. S. ; ABE, D. S. ; TUNDISI, J.G. ; ADAMS, D. D. ; TUNDISI, T. M. ; TUNDISI, J. E. ; BRUM, P. R. ; CIMBLERIS, A. C. P.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Sunlight effects on diel {renderSubscript('CO_2')} and {renderSubscript('CH_4')} emissions from a tropical reservoirs
            </h4>
            <p className={styles.publicationAuthors}>
              LIMA, I. B. T. ; CIMBLERIS, A. C. P. ; MAZZI, E. A. ; NOVO, E. M. L. M. ; OMETTO, J. P. H. B. ; RAMOS, F. M. ; ROSA, R. R. ; STECH, J. L.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Concentrarion profile at the air-water interface and its bearing on mentane flux measurement
            </h4>
            <p className={styles.publicationAuthors}>
              MATVIENKO, B. ; SIKAR, E. ; DOS SANTOS, M. ; ROSA, L. ; SILVA, M. ; DOS SANTOS, E. ; ROCHA, C.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Evaluation of dissolved carbon dioxide and methane at three tropical hydroelectric
            </h4>
            <p className={styles.publicationAuthors}>
              ROCHA, C. H. E. D’A. ; DOS SANTOS, M. A. ; MATVIENKO, B. ; ROSA, L. P. ; DOS SANTOS, E. O. ; SIKAR, E. ; SILVA, M. B. ; JUNIOR, A. M. P. B.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Contribution of planktonic respiration to greenhouse emissions in tropical reservoirs
            </h4>
            <p className={styles.publicationAuthors}>
              ROLAND, F. ; HUSZAR, V. L. M. ; BARROS, N. O. ; FERREIRA, R. M. ; ASSIREU, A. T. ; CIMBLERIS, A. C. P. ; BRUM, P. R. ; COLE, J. J.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              The importance of land use changes analisys in the greenhouse gas emissions from hydroelectric reservoirs
            </h4>
            <p className={styles.publicationAuthors}>
              SANTOS, E. ; SILVA, C. ; MATVIENKO, B. ; ROCHA, C. H. ; ROSA, L. P. ; SIKAR, E. ; SILVA, M. ; JUNIOR, A. B.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Tropical reservoirs are on average 2.7 times bigger carbon sinks than soils
            </h4>
            <p className={styles.publicationAuthors}>
              SIKAR, E. ; MATVIENKO, B. ; DOS SANTOS,M. ; ROSA, L. ; SILVA, M. ; DOS SANTOS, E. ; ROCHA, C. ; JUNIOR, A. B.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Does methane from hydro-reservoirs fiz out from the water upon turbine discharge?
            </h4>
            <p className={styles.publicationAuthors}>
              SILVA, M. ; MATVIENKO, B. ; DOS SANTOS, M. ; SIKAR, E. ; ROSA, L. ; DOS SANTOS E. ; ROCHA, C.
            </p>
          </div>

          {/* --- Outros Congressos --- */}
          <h3 className={styles.congressTitle}>Outros Congressos</h3>
          {/* (Note: Some items listed under "Outros Congressos" in the original text might belong to specific congresses below) */}

          <div className={styles.publicationItem}>
             <h4 className={styles.publicationTitle}>
                <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ComplexidadeGeometricaVariabilidadeEspacial.pdf" target="_blank" rel="noopener noreferrer">
                   Existe relação entre a complexidade geométrica do entorno dos reservatórios e a variabilidade espacial dos parâmetros limnológicos?
                </a>
             </h4>
             <p className={styles.publicationAuthors}>
                ASSIREU, A. T. ; ROLAND, F. ; NOVO, E. M. L. M. ; BARROS, N. O. ; STECH, J. L. ; PACHECO, F. S.
             </p>
             <p className={styles.publicationDetails}>
                Anais XIII Simpósio Brasileiro de Sensoriamento Remoto, Florianópolis, Brasil, 21-26 abril 2007, p. 3263-3269
             </p>
          </div>

          <div className={styles.publicationItem}>
             <h4 className={styles.publicationTitle}>
                <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DistribuicaoVerticalDoFitoplancton.pdf" target="_blank" rel="noopener noreferrer">
                   Distribuição vertical do fitoplâncton nos reservatórios de Serra da Mesa (GO) e Manso (MT) no início do período de chuvas
                </a>
             </h4>
             <p className={styles.publicationAuthors}>
                SILVA, L. H. S. ; TRINDADE, T. N. ; ROLAND, F. ; CESAR, D. E.
             </p>
             <p className={styles.publicationDetails}>
                I Simpósio de Ecologia de Reservatórios, Avaré - SP, 2004
             </p>
          </div>

           <div className={styles.publicationItem}>
             <h4 className={styles.publicationTitle}>
                <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DistribuicaoVerticalDoFitoplanctonico.pdf" target="_blank" rel="noopener noreferrer">
                   Distribuição vertical do fitoplâncton nos reservatórios de Serra da Mesa (GO) e Manso (MT) em três períodos climatológicos
                </a>
             </h4>
             <p className={styles.publicationAuthors}>TRINDADE, T. N.</p>
             <p className={styles.publicationDetails}>
                VI Seminário de Iniciação Científica da Biologia da Universidade Gama Filho, RJ, 2004
             </p>
          </div>

          <div className={styles.publicationItem}>
             <h4 className={styles.publicationTitle}>
                <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DinamicaHorizontal.pdf" target="_blank" rel="noopener noreferrer">
                   Dinâmica horizontal do fitoplâncton no reservatório de Corumbá (GO) em três períodos climatológicos
                </a>
             </h4>
             <p className={styles.publicationAuthors}>
                TRINDADE, T. N. ; SILVA, L. H. S. ; HUSZAR, V. L. M. ; ROLAND, F. ; CESAR, D. E.
             </p>
             <p className={styles.publicationDetails}>
                XI Congresso Brasileiro de Ficologia, Itajaí - SC, 2006
             </p>
          </div>

          {/* --- XI Seminário de Iniciação Científica --- */}
          <h3 className={styles.congressTitle}>XI Seminário de Iniciação Científica, Juiz de Fora - MG, 2004</h3>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoDaIntensidadeLuminosa.pdf" target="_blank" rel="noopener noreferrer">
                Variação da intensidade luminosa em dois reservatórios do sistema FURNAS
              </a>
            </h4>
            <p className={styles.publicationAuthors}>BARROS, N. O. ; CESAR, D. E. ; ROLAND, F.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/RelacaoEntreDensidadeBacterianaO2.pdf" target="_blank" rel="noopener noreferrer">
                Relação entre a densidade bacteriana e a concentração de oxigênio dissolvido na variação vertical de dois reservatórios recentes do sistema FURNAS Centrais Elétricas (UHE de Serra da Mesa – GO e APM de Manso – MT) no período de seca
              </a>
            </h4>
            <p className={styles.publicationAuthors}>DEL'DUCA, A. ; CESAR, D. E. ; ROLAND, F.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoEspacialDaBact.pdf" target="_blank" rel="noopener noreferrer">
                Variação espacial da densidade bacteriana nos reservatórios de Serra da Mesa e de Manso em diferentes épocas do ano
              </a>
            </h4>
            <p className={styles.publicationAuthors}>DEL'DUCA, A. ; CESAR, D. E. ; ROLAND, F.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/PerfilVerticalDaCondutividade.pdf" target="_blank" rel="noopener noreferrer">
                Perfil vertical da condutividade elétrica em dois reservatórios do sistema FURNAS
              </a>
            </h4>
            <p className={styles.publicationAuthors}>
              DUQUE-ESTRADA, C. H. E. ; CESAR, D. E. ; ROLAND, F.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoNictemeralManso.pdf" target="_blank" rel="noopener noreferrer">
                Variação Nictemeral no início do período de estiagem no reservatório de Manso (MT)
              </a>
            </h4>
            <p className={styles.publicationAuthors}>
              DUQUE-ESTRADA, C. H. E. ; CESAR, D. E. ; ROLAND, F.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoDasTaxasDeProducao.pdf" target="_blank" rel="noopener noreferrer">
                Variação nas taxas de produção fitoplanctônica em dois reservatórios do sistema FURNAS
              </a>
            </h4>
            <p className={styles.publicationAuthors}>
              FERREIRA, R. M. ; BASSOLI-ROSA, F. ; CESAR, D. E. ; ROLAND, F.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/RespiracaoPlanctonicaEm2Reservatorios.pdf" target="_blank" rel="noopener noreferrer">
                Respiração planctônica em dois reservatórios do sistema FURNAS
              </a>
            </h4>
            <p className={styles.publicationAuthors}>
              FERREIRA, R. M. ; VIDAL, L. O. ; CESAR, D. E. ; ROLAND, F.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ContribuicaoDasBacterias.pdf" target="_blank" rel="noopener noreferrer">
                Contribuição das bactérias heterotróficas para o estoque de carbono em reservatórios tropicais
              </a>
            </h4>
            <p className={styles.publicationAuthors}>
              LOBÃO, L. M. ; ALFENAS, G. F. M. ; CESAR, D. E. ; ROLAND, F.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/PerfilVerticalDaProducao.pdf" target="_blank" rel="noopener noreferrer">
                Perfil vertical da produção bacteriana em dois reservatórios do sistema FURNAS
              </a>
            </h4>
            <p className={styles.publicationAuthors}>
              LOBÃO, L. M. ; ALFENAS, G. F. M. ; CESAR, D. E. ; ROLAND, F.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/EstudoQualitativoQuantitativo.pdf" target="_blank" rel="noopener noreferrer">
                Estudo qualitativo e quantitativo do processo de sedimentação em dois reservatórios do sistema FURNAS
              </a>
            </h4>
            <p className={styles.publicationAuthors}>MENDONÇA, R. F. ; CESAR, D. E. ; ROLAND, F.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/AvaliacaoDaEficiencia.pdf" target="_blank" rel="noopener noreferrer">
                Avaliação da eficiência de métodos de preservação de amostras para análises de carbono
              </a>
            </h4>
            <p className={styles.publicationAuthors}>
              MENDONÇA, R. F. ; MARINHO, M. M. ; CESAR, D. E. ; ROLAND, F.
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ConcentracoesDeFosforo.pdf" target="_blank" rel="noopener noreferrer">
                Concentração de Fósforo em dois reservatórios do sistema FURNAS
              </a>
            </h4>
            <p className={styles.publicationAuthors}>NOYMA, N. P. ; CESAR, D. E. ; ROLAND, F.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ConcentracaoDeSilicato.pdf" target="_blank" rel="noopener noreferrer">
                Concentração de Silicato em dois reservatórios do sistema FURNAS
              </a>
            </h4>
            <p className={styles.publicationAuthors}>NOYMA, N. P. ; CESAR, D. E. ; ROLAND, F.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/AnaliseComparacaoDeCarbono.pdf" target="_blank" rel="noopener noreferrer">
                Análise e comparação de carbono orgânico total em dois reservatórios do sistema FURNAS de geração de energia elétrica
              </a>
            </h4>
            <p className={styles.publicationAuthors}>PACHECO, F. S. ; CESAR, D. E. ; ROLAND, F.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoNictemeralSerra.pdf" target="_blank" rel="noopener noreferrer">
                Variação Nictemeral de fatores abióticos no reservatório da UHE de Serra da Mesa/GO
              </a>
            </h4>
            <p className={styles.publicationAuthors}>PACHECO, F. S. ; CESAR, D. E. ; ROLAND, F.</p>
          </div>

          {/* --- X Congresso Brasileiro de Limnologia --- */}
          <h3 className={styles.congressTitle}>X Congresso Brasileiro de Limnologia, Ilhéus - BA, 2005</h3>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/BacteriasHeterotroficas.pdf" target="_blank" rel="noopener noreferrer">
                Bactérias heterotróficas: um passeio por seis reservatórios tropicais
              </a>
            </h4>
            <p className={styles.publicationAuthors}>DEL'DUCA, A. ; ROLAND, F. ; CESAR, D. E.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DeterminacaoDoCarbono.pdf" target="_blank" rel="noopener noreferrer">
                Determinação do Carbono Inorgânico Dissolvido (DIC): avaliação da eficiência dos métodos direto e indireto
              </a>
            </h4>
            <p className={styles.publicationAuthors}>MARINHO, M. M. ; MENDONÇA, R.F. ; ROLAND, F..</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/MetabolismoPlanctonicoEmDoisReservatorios.pdf" target="_blank" rel="noopener noreferrer">
                Metabolismo planctônico em dois reservatórios do sistema FURNAS – reservatório de Serra da Mesa (GO) e de Manso (MT)
              </a>
            </h4>
            <p className={styles.publicationAuthors}>MELLO, M. ; CESAR, D. E. ; ROLAND, F..</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DinamicaDosEstoquesDeCarbono.pdf" target="_blank" rel="noopener noreferrer">
                Dinâmica dos estoques de carbono orgânico e inorgânico em reservatórios de diferentes idades
              </a>
            </h4>
            <p className={styles.publicationAuthors}>MENDONÇA, R. F. ; MARINHO, M. M. ; ROLAND, F..</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ClorofilaBiomassa.pdf" target="_blank" rel="noopener noreferrer">
                Concentrações de clorofila e biomassa fitoplanctônica em diferentes profundidades em um reservatório de FURNAS Centrais Elétricas S.A. no início do período de chuvas
              </a>
            </h4>
            <p className={styles.publicationAuthors}>PACHECO, F. S. ; ROLAND, F. ; CESAR, D. E..</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DinamicaDosSolidosSuspensos.pdf" target="_blank" rel="noopener noreferrer">
                Dinâmica dos sólidos suspensos em reservatórios: entrada e processamento do material alóctone
              </a>
            </h4>
            <p className={styles.publicationAuthors}>ROLAND, F. ; MENDONÇA, R. F..</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/AvaliacaoDaBiomassa.pdf" target="_blank" rel="noopener noreferrer">
                Avaliação da biomassa (conteúdo de carbono) de Rotifera no reservatório de Manso (MT), Brasil
              </a>
            </h4>
            <p className={styles.publicationAuthors}>ROSA, P. G. ; BRANCO, C. W. C. ; ROLAND, F..</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/VariacaoDaDensidadeRelativaZoo.pdf" target="_blank" rel="noopener noreferrer">
                Variação da densidade relativa zooplanctônica, em três épocas distintas, do reservatório de UHE Serra da Mesa (GO), Brasil
              </a>
            </h4>
            <p className={styles.publicationAuthors}>ROSA, P. G. ; BRANCO, C. W. C. ; ROLAND, F..</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DinamicaDoFitoplanctonManso.pdf" target="_blank" rel="noopener noreferrer">
                Dinâmica do fitoplâncton no reservatório de Manso (MT)
              </a>
            </h4>
            <p className={styles.publicationAuthors}>
              SILVA, L. H. S. ; TRINDADE, T. N. ; HUSZAR, V. L. M. ; ROLAND, F. ; CESAR, D. E..
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/DinamicaDoFitoplanctonSM.pdf" target="_blank" rel="noopener noreferrer">
                Dinâmica do fitoplâncton no reservatório de Serra da Mesa (GO)
              </a>
            </h4>
            <p className={styles.publicationAuthors}>
              TRINDADE, T. N. ; SILVA, L. H. S. ; HUSZAR, V. L. M. ; ROLAND, F. ; CESAR, D. E..
            </p>
          </div>

          {/* ==================== Resumos Publicados ==================== */}
          {/* (Esta seção parece repetir informações já presentes nos congressos acima) */}
          <h2 className={styles.categoryTitle}>
            Resumos Publicados
          </h2>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Trophic classifications between temperate and tropical aquatic ecosystems: is such terminology unrealistic for sedimentary carbon cycling?
            </h4>
            <p className={styles.publicationAuthors}>
              ABE, D. S. ; ADAMS, D. D. ; SIDAGIS-GALLI, C. ; TUNDISI, J. G. ; CIMBLERIS, A. C. P. ; BRUM, P. R.
            </p>
            <p className={styles.publicationDetails}>
              In: 11th World Lakes Conference - Management of Lake Basins for their Sustainable Use: Global Experience and African Issues, 2005, Nairobi. 11th World Lakes Conference - Abstracts Volume. Nairobi : PASS, University of Nairobi, 2005. v. 1. p. 105-105
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Carbon budget in hydroelectric reservoirs of FURNAS Centrais Elétricas, Brazil
            </h4>
            <p className={styles.publicationAuthors}>
              CIMBLERIS, A. C. P. ; SANTOS, M. A. ; MATVIENKO, B. ; STECH, J. L. ; LIMA, I. B. T. ; TUNDISI, J. G. ; ABE, D. S. ; SIDAGIS-GALLI, C. V. ; ROLAND, F. ; CESAR, D. E. ; BRUM, P. R.
            </p>
            <p className={styles.publicationDetails}>
              Proceedings of the International Association of Theoretical and Applied Limnology, v. 29, p. 563, 2005
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ConcentracaoDeO2eImplicacoesNaEstrutura.pdf" target="_blank" rel="noopener noreferrer">
                 Concentração de oxigênio e suas implicações na estrutura e metabolismo bacteriano no reservatório de Serra da Mesa/GO
              </a>
            </h4>
            <p className={styles.publicationAuthors}>DEL'DUCA, A. ; CESAR, D. E. ; ROLAND, F.</p>
            <p className={styles.publicationDetails}>
              XXIII Brazilian Congress of Microbiology, Santos - SP, Brazil, 2005
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
               <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/Ferramentas.pdf" target="_blank" rel="noopener noreferrer">
                  Ferramentas para abrir uma caixa, ainda, nebulosa
               </a>
            </h4>
            <p className={styles.publicationAuthors}>DEL'DUCA, A. ; ROLAND, F. ; CESAR, D. E.</p>
            <p className={styles.publicationDetails}>
              X Brazilian Congress of Limnology, Ilhéus - BA, Brazil, 2005
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Carbon budget in two neotropical reservoirs</h4>
            <p className={styles.publicationAuthors}>
              ROLAND, F. ; BRUM, P. R. ; SOARES, C. B. ; CESAR, D. E. ; ROSA, L. P. ; SANTOS, M. A. ; SIKAR, B. M. ; TUNDISI, J. G. ; ABE, D. S. ; STECH, J. L. ; NOVO, E. M. L. M.
            </p>
            <p className={styles.publicationDetails}>
              In: ASLO - Aquatic Sciences Meeting, 2006, Victoria
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              Heterotrophic pathways on carbon balance in tropical reservoirs
            </h4>
            <p className={styles.publicationAuthors}>
              ROLAND, F. ; VIDAL, L. ; COLE, J. J.; CIMBLERIS, A. C. P.
            </p>
            <p className={styles.publicationDetails}>
              In: ASLO - Aquatic Sciences Meeting, 2006, Victoria
            </p>
          </div>

          <h2 className={styles.categoryTitle}>
            Monografias
          </h2>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/TrabalhosUFJF/ComunidadeZooplanctonicoDeQuatroReservatorios.pdf" target="_blank" rel="noopener noreferrer">
                Comunidade zooplanctônica de quatro reservatórios do centro-oeste do Brasil: abundância e biomassa em carbono
              </a>
            </h4>
            <p className={styles.publicationAuthors}>ROSA, P. G.</p>
            <p className={styles.publicationDetails}>
              Trabalho de Conclusão de Curso (Graduação em Ciências Biológicas) - Universidade Federal do Estado do Rio de Janeiro, 2005
            </p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>
              <a href="http://www.dsr.inpe.br/projetofurnas/doc/DinamicaHorizontalFitoplanctonSM.pdf" target="_blank" rel="noopener noreferrer">
                Dinâmica horizontal do fitoplâncton no reservatório de Serra da Mesa (GO) em três períodos climatológicos
              </a>
            </h4>
            <p className={styles.publicationAuthors}>Trindade, T. N.</p>
            <p className={styles.publicationDetails}>
              Trabalho de Conclusão de Curso (Graduação em Ciências Biológicas) - Universidade Federal do Estado do Rio de Janeiro, 2007
            </p>
          </div>

        </section>
      </main>
    </>
  );
}