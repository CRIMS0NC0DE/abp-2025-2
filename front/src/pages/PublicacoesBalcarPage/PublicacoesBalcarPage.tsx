import { useState } from "react";
import { NavLink } from 'react-router-dom';

// Importa os estilos do CSS Module
import styles from './PublicacoesBalcarPage.module.css';

export default function PublicacoesBalcarPage() {
  // --- Lógica do Menu ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainNavLinks = [
    { label: 'Home', to: '/' },
    { label: 'Início', to: '/balcar' },
    { label: 'Banco de Dados', to: '/balcar-table' },
    { label: 'Publicações', to: '/publicacoesBalcar' }, 
    { label: 'SIMA', to: '/sima' },
    { label: 'FURNAS', to: '/furnas' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Função helper para formatar subscritos (CO2, CH4)
  const renderSubscript = (text: string) => {
    // Procura por _(dígito) - Ex: CO_2, CH_4
    const parts = text.split(/_(\d+)/g);
    return parts.map((part, index) => {
      if (index % 2 !== 0) { // Se for a parte capturada (o dígito)
        return <sub key={index}>{part}</sub>;
      }
      return part; // Retorna o texto normal
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
            <h4 className={styles.publicationTitle}>Carbon gas cycling in the sediments of Serra da Mesa and Manso reservoirs, central Brazil.</h4>
            <p className={styles.publicationAuthors}>ABE, D. S.; ADAMS, D. D.; SIDAGIS-GALLI, C.; CIMBLERIS, A. C. P.; TUNDISI, J. G.</p>
            <p className={styles.publicationDetails}>Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte Limnologie, Stuttgart, v. 29, p. 567-572, 2005.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Photoacoustic/dynamic chamber method for measuring greenhouse gas fluxes in hydroreservoirs.</h4>
            <p className={styles.publicationAuthors}>LIMA, I. B. T.; MAZZI, E. A.; CARVALHO, J. C.; OMETTO, J. P. H. B.; RAMOS, F. M.; STECH, J. L.; NOVO, E. M. L. M.</p>
            <p className={styles.publicationDetails}>Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte Limnologie, Stuttgart, v. 29, p. 603-606, 2005.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>The use of remote sensing and automated water quality systems for estimating greenhouse gas emissions from hydroelectric reservoirs.</h4>
            <p className={styles.publicationAuthors}>LIMA, I. B. T.; NOVO, E. M. L. M.; STECH, J. L.; LORENZZETTI, J. A.</p>
            <p className={styles.publicationDetails}>In: Luiz Pinguelli Rosa; Marco Aurélio dos Santos; José Galizia Tundisi. (Org.). Greenhouse gas emissions from hydropower reservoirs and water quality. Rio de Janeiro: COPPE-UFRJ, 2004, p. 47-65.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Extreme event dynamics in methane ebullition fluxes from tropical reservoirs.</h4>
            <p className={styles.publicationAuthors}>RAMOS, F. M.; LIMA, I. B. T.; ROSA, R. R.; MAZZI, E. A.; CARVALHO, J. C.; RASERA, M. F. F. L.; OMETTO, J. P. H. B.; ASSIREU, A. T.; STECH, J. L.</p>
            <p className={styles.publicationDetails}>Geophysical Research Letters, v. 33, L21404, doi:10.1029/2006GL027943, 2006.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Gross greenhouse gas fluxes from hydro-power reservoir compared to thermo-power plants.</h4>
            <p className={styles.publicationAuthors}>SANTOS, M. A.; ROSA, L. P.; MATVIENKO, B.; SIKAR, E.; SANTOS, E. O.</p>
            <p className={styles.publicationDetails}>Energy Policy, The Netherlands, v. 34, n. 1, p. 481-488, 2005.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Greenhouse gases and initial findings on the carbon circulation in two reservoirs and their watersheds.</h4> {/* Corrigido 'theis' -> 'their' */}
            <p className={styles.publicationAuthors}>SIKAR, E.; SANTOS, M. A.; MATVIENKO, B.; SILVA, M. B.; ALMEIDA, C. H. E.; SANTOS, E. O.; BENTES JUNIOR, A. P.; ROSA, L. P.</p>
            <p className={styles.publicationDetails}>Verhandlungen - Internationale Vereinigung für Theoretische und Angewandte Limnologie, Stuttgart, v. 29, n. 2, p. 573-576, 2005.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Variability of carbon dioxide flux from tropical (Cerrado) hydroelectric reservoirs.</h4>
            <p className={styles.publicationAuthors}>ROLAND F.; VIDAL L. O.; PACHECO, F. S.; BARROS, N. O.; ASSIREU, A. T.; OMETTO, J. P. H. B.; CIMBLERIS, A. C. P.; COLE, J. J.</p>
            <p className={styles.publicationDetails}>Aquatic Sciences, v. 72, n. 3, p. 283-293, 2010.</p>
          </div>

          {/* ==================== Capítulos de livros ==================== */}
          <h2 className={styles.categoryTitle}>
            Capítulos de livros
          </h2>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Carbon gas emission from the sediments of reservoirs of different ages in central Brazil.</h4>
            <p className={styles.publicationAuthors}>ABE, D. S.; SIDAGIS-GALLI, C.; ADAMS, D. D.; CIMBLERIS, A. C. P.; BRUM, P. R.; TUNDISI, J. G.; TUNDISI, T. M.; MATSUMURA-TUNDISI, J. E.</p>
            <p className={styles.publicationDetails}>In: Marco Aurélio dos Santos; Luiz Pinguelli Rosa. (Org.). Global Warming and Hydroelectric Reservoirs. 1 ed. Rio de Janeiro: COPPE/UFRJ e Eletrobrás, 2005, v. 1, p. 101-107.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Princípios físicos e químicos a serviço da limnologia - um exercício.</h4>
            <p className={styles.publicationAuthors}>ASSIREU, A. T.; STECH, J. L.; MARINHO, M. M.; CESAR, D. E.; LORENZZETTI, J. A.; FERREIRA, R. M.; PACHECO, F. S.; ROLAND, F.</p>
            <p className={styles.publicationDetails}>In: Fábio Roland; Dionéia E. Cesar; Marcelo Marinho. (Org.). Lições de Limnologia. 1 ed. São Carlos - SP, 2005, p. 229-242.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Caminhos do fósforo em ecossistemas aquáticos continentais.</h4>
            <p className={styles.publicationAuthors}>FERREIRA, R. M.; ROLAND, F.</p>
            <p className={styles.publicationDetails}>In: Fábio Roland; Dionéia E. Cesar; Marcelo Marinho. (Org.). Lições de Limnologia. 1 ed. São Carlos - SP, 2005, p. 229-242.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Long term monitoring of greenhouse gas emissions at two brazilian hydro reservoirs.</h4>
            <p className={styles.publicationAuthors}>ROSA, L. P.; SANTOS, M. A.; MATVIENKO, B.; SANTOS, E. O.; SILVA, M. B.; SIKAR, E.</p>
            <p className={styles.publicationDetails}>In: Luiz Pinguelli Rosa; Marco Aurélio dos Santos; José Galízia Tundisi. (Org.). Greenhouse Gas Emissions from Hydropower Reservoirs and Water Quality. 1 ed. Rio de Janeiro: COPPE/UFRJ, 2004, v. 1, p. 121-136.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Carbon dioxide and methane emissions from hydroelectric reservoirs in Brazil.</h4>
            <p className={styles.publicationAuthors}>SANTOS, M. A.; MATVIENKO, B.; ROSA, L. P.; SIKAR, E.</p>
            <p className={styles.publicationDetails}>In: Marco Aurélio dos Santos; Luiz Pinguelli Rosa. (Org.). Global Warming and Hydroelectric Reservoirs. 1 ed. Rio de Janeiro: COPPE/UFRJ, 2005, v. 1, p. 81-94.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Caminhos do carbono em ecossistemas aquáticos continentais.</h4>
            <p className={styles.publicationAuthors}>VIDAL, L. O.; MENDONÇA, R. F.; MARINHO, M. M.; ROLAND, F.</p>
            <p className={styles.publicationDetails}>In: Fábio Roland; Dionéia E. Cesar; Marcelo Marinho. (Org.). Lições de Limnologia. 1 ed. São Carlos: Rima, 2005, p. 193-208.</p>
          </div>

          {/* ==================== Eventos ==================== */}
          <h2 className={styles.categoryTitle}>
            Eventos
          </h2>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Greenhouse gas concentrations and diffusive flux at the sediment-water interface from 5 tropical reservoirs in Brazil: trophic status consideration.</h4>
            <p className={styles.publicationAuthors}>ABE, D. S.; SIDAGIS-GALLI, C.; ADAMS, D. D.; TUNDISI, J. G.; MATSUMURA-TUNDISI, T.; TUNDISI, J. E.; CIMBLERIS, A. C. P.; BRUM, P. R.</p>
            <p className={styles.publicationDetails}>ASLO - 2006. Victoria, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Carbon budget in two neotropical reservoirs.</h4>
            <p className={styles.publicationAuthors}>CIMBLERIS, A. C. P.; BRUM, P. R.; SOARES, C. B.; ROLAND, F.; CESAR, D. E.; ROSA, L. P.; SANTOS, M. A.; SIKAR, B. M.; TUNDISI, J. G.; ABE, D. S.</p>
            <p className={styles.publicationDetails}>ASLO - 2006. Victoria, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Management strategies to minimize bacterial methane emission from tropical hydroreservoirs.</h4>
            <p className={styles.publicationAuthors}>LIMA, I. B.; RAMOS, F. M.; MAZZI, E. A.; OMETTO, J. P.; RASERA, M. F.; ASSIREU, A. T.; ROSA, R. R.; NOVO, E. M. L. M.; STECH, J. L.</p>
            <p className={styles.publicationDetails}>ASLO - 2006. Victoria, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Extreme event dynamics in methane bubbling from tropical reservoirs.</h4>
            <p className={styles.publicationAuthors}>RAMOS, F. M.; LIMA, I. B.; MAZZI, E. A.; OMETTO, J. P.; RASERA, M. F.; ASSIREU, A. T.; ROSA, R. R.; STECH, J. L.</p>
            <p className={styles.publicationDetails}>ASLO - 2006. Victoria, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Heterotrophic pathways on carbon balance in tropical reservoirs.</h4>
            <p className={styles.publicationAuthors}>ROLAND, F. ; VIDAL, L. ; COLE, J. J. ; CIMBLERIS, A. C. P.</p>
            <p className={styles.publicationDetails}>ASLO - 2006. Victoria, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Land use-stream carbon fluxes relationship in a small watershed of a tropical hydro reservoir, Brazil.</h4>
            <p className={styles.publicationAuthors}>SANTOS, M. A.; MATVIENKO, B.; ROSA, L. P.; SILVA, C.; COSTA, R. S.; SIKAR, E.; ROCHA, C. H.; SILVA, M. B.; BENTES JUNIOR, A. P.</p>
            <p className={styles.publicationDetails}>ASLO - 2006. Victoria, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>The effect of cold fronts over the emission patterns of {renderSubscript('CO_2')} and {renderSubscript('CH_4')} in Brazilian Tropical Reservoirs.</h4>
            <p className={styles.publicationAuthors}>LORENZETTI, J. A.; LIMA, I. B.; ASIREU, A. T.; STECH, J. L.</p>
            <p className={styles.publicationDetails}>ASLO - 2006. Victoria, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>The fitting of weibull pdf for surface winds observed in low latitude Brazilian lakes and hydroeletric reservoirs.</h4>
            <p className={styles.publicationAuthors}>STECH, J. L.; ASSIREU, A. T.; LORENZETTI, J. L.; NOVO, E. M. L. M.; LIMA, I. B.; RAMOS, F.</p>
            <p className={styles.publicationDetails}>ASLO - 2006. Victoria, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Carbon gas cycling in the sediments of Serra da Mesa and Manso reservoirs, central Brazil.</h4>
            <p className={styles.publicationAuthors}>ABE, D. S.; ADAMS, D. D.; SIDAGIS-GALLI, C.; CIMBLERIS, A. C. P.; TUNDISI, J. G.</p>
            <p className={styles.publicationDetails}>XXIX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2004, Lahti, Finland.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Theoretical diffusive flux of greenhouse gases ({renderSubscript('CH_4')} & {renderSubscript('CO_2')}) at the sediment-water interface from 24 lakes and reservoirs of different trophic status worldwide.</h4>
            <p className={styles.publicationAuthors}>ADAMS, D. D.</p>
            <p className={styles.publicationDetails}>XXIX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2004, Lahti, Finland.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Carbon budget in hydroelectric reservoirs of Furnas Centrais Elétricas S.A., Brazil.</h4>
            <p className={styles.publicationAuthors}>CIMBLERIS, A. C. P.; SANTOS, M. A.; MATVIENKO, B.; MOZETO, A.; STECH, J. L.; LIMA, I. B. T.; TUNDISI, J. G.; ABE, D. S.; SIDAGIS-GALLI, C. V.; ROLAND, F.; CESAR, D. E.; BRUM, P. R.</p>
            <p className={styles.publicationDetails}>XXIX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2004, Lahti, Finland.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Carbon content in the zooplankton populations of Serra da Mesa Reservoir, Tocantins River, Brazil.</h4>
            <p className={styles.publicationAuthors}>MATSUMURA-TUNDISI, T.; TUNDISI, J. G.</p>
            <p className={styles.publicationDetails}>XXIX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2004, Lahti, Finland.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Methane emission downstream of reservoirs.</h4>
            <p className={styles.publicationAuthors}>MATVIENKO, B.; SANTOS, M. A.; SIKAR, E.; SILVA, M. B.; ALMEIDA, C. H. E.; SANTOS, E. O.</p>
            <p className={styles.publicationDetails}>XXIX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2004, Lahti, Finland.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Preliminary results of photoacoustic/dynamic chamber technique for measuring greenhouse gas fluxes to the atmosphere from hydroelectric reservoirs in the brazilian savannah, cerrado.</h4>
            <p className={styles.publicationAuthors}>MAZZI, E. A.; LIMA, I. B. T.; CARVALHO, J. C.; OMETTO, J. P. H. B.; RAMOS, F. M.; STECH, J. L.; NOVO, E. M. L. M.</p>
            <p className={styles.publicationDetails}>XXIX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2004, Lahti, Finland.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Greenhouse gases and the carbon circulation in a reservoir and its watershed.</h4>
            <p className={styles.publicationAuthors}>SANTOS, M. A.; MATVIENKO, B.; SIKAR, E.; SILVA, M. B.; ALMEIDA, C. H. E.; SANTOS, E. O.</p>
            <p className={styles.publicationDetails}>XXIX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2004, Lahti, Finland.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Sediment {renderSubscript('CH_4')} and {renderSubscript('CO_2')} concentrations and diffuse emission fluxes related to limnological factors in the Lobo-Broa reservoir, São Paulo State, Brazil.</h4>
            <p className={styles.publicationAuthors}>SIDAGIS-GALLI, C.; ADAMS, D. D.; ABE, D. S.; SIKAR, E.; TUNDISI, J. G.</p>
            <p className={styles.publicationDetails}>XXIX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2004, Lahti, Finland.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Telemetric monitoring system for ecohydrology applications in aquatic environments.</h4>
            <p className={styles.publicationAuthors}>STECH, J. L.; LIMA, I. B. T.; NOVO, E. M. L. M.; SILVA, C. M.; ASSIREU, A. T.; CARVALHO, J. C.; LORENZZETTI, J. A.; BARBOSA, C. C.; ROSA, R. R.</p>
            <p className={styles.publicationDetails}>XXIX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2004, Lahti, Finland.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Carbon budget in seven Brazilian hydropower reservoirs.</h4>
            <p className={styles.publicationAuthors}>CIMBLERIS, A. C. P.; BRUM, P. R.; SOARES, C. B. P.; ROLAND, F.; ROSA, L. P.; SANTOS, M. A.; MATVIENKO, B.; TUNDISI, J. G.; ABE, D. S.; GALLI, C. S.; STECH, J. L.; NOVO, E. M. L. M.</p>
            <p className={styles.publicationDetails}>XXX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2007, Montreal, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Greenhouse gas emissions downstream tropical hydroeletric reservoirs.</h4>
            <p className={styles.publicationAuthors}>DOS SANTOS, M. A.; ROSA, L. P.; MATVIENKO, B.; DOS SANTOS, E. O.; ROCHA, C. H. E. D’A.; SIKAR, E.; SILVA, M. B.; JUNIOR, A. M. P. B.</p>
            <p className={styles.publicationDetails}>XXX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2007, Montreal, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Greenhouse gas concentrations and diffusive flux at the sediment-water interface from two reservoirs in Brazil.</h4>
            <p className={styles.publicationAuthors}>GALLI, C. S.; ABE, D. S.; TUNDISI, J. G.; ADAMS, D. D.; TUNDISI, T. M.; TUNDISI, J. E.; BRUM, P. R.; CIMBLERIS, A. C. P.</p>
            <p className={styles.publicationDetails}>XXX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2007, Montreal, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Sunlight effects on diel {renderSubscript('CO_2')} and {renderSubscript('CH_4')} emissions from a tropical reservoirs.</h4>
            <p className={styles.publicationAuthors}>LIMA, I. B. T.; CIMBLERIS, A. C. P.; MAZZI, E. A.; NOVO, E. M. L. M.; OMETTO, J. P. H. B.; RAMOS, F. M.; ROSA, R. R.; STECH, J. L.</p>
            <p className={styles.publicationDetails}>XXX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2007, Montreal, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Concentrarion profile at the air-water interface and its bearing on mentane flux measurement.</h4>
            <p className={styles.publicationAuthors}>MATVIENKO, B.; SIKAR, E.; SANTOS, M.; ROSA, L.; SILVA, M.; SANTOS, E.; ROCHA, C.</p>
            <p className={styles.publicationDetails}>XXX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2007, Montreal, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Evaluation of dissolved carbon dioxide and methane at three tropical hydroelectric.</h4>
            <p className={styles.publicationAuthors}>ROCHA, C. H. E. D’A.; SANTOS, M. A.; MATVIENKO, B.; ROSA, L. P.; SANTOS, E. O.; SIKAR, E.; SILVA, M. B.; JUNIOR, A. M. P. B.</p>
            <p className={styles.publicationDetails}>XXX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2007, Montreal, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Contribution of planktonic respiration to greenhouse emissions in tropical reservoirs.</h4>
            <p className={styles.publicationAuthors}>ROLAND, F.; HUSZAR, V. L. M.; BARROS, N. O.; FERREIRA, R. M.; ASSIREU, A. T.; CIMBLERIS, A. C. P.; BRUM, P. R.; COLE, J. J.</p>
            <p className={styles.publicationDetails}>XXX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2007, Montreal, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>The importance of land use changes analisys in the greenhouse gas emissions from hydroelectric reservoirs.</h4>
            <p className={styles.publicationAuthors}>SANTOS, E.; SILVA, C.; MATVIENKO, B.; ROCHA, C. H.; ROSA, L. P.; SIKAR, E.; SILVA, M.; JUNIOR, A. B.</p>
            <p className={styles.publicationDetails}>XXX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2007, Montreal, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Tropical reservoirs are on average 2.7 times bigger carbon sinks than soils.</h4>
            <p className={styles.publicationAuthors}>SIKAR, E.; MATVIENKO, B.; SANTOS, M.; ROSA, L.; SILVA, M.; SANTOS, E.; ROCHA, C.; JUNIOR, A. B.</p>
            <p className={styles.publicationDetails}>XXX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2007, Montreal, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Does methane from hydro-reservoirs fiz out from the water upon turbine discharge?</h4>
            <p className={styles.publicationAuthors}>SILVA, M.; MATVIENKO, B.; SANTOS, M.; SIKAR, E.; ROSA, L.; SANTOS E.; ROCHA, C.</p>
            <p className={styles.publicationDetails}>XXX Congress of the International Association of Theoretical and Applied Limnology, SIL - 2007, Montreal, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Existe relação entre a complexidade geométrica do entorno dos reservatórios e a variabilidade espacial dos parâmetros limnológicos?</h4>
            <p className={styles.publicationAuthors}>ASSIREU, A. T.; ROLAND, F.; NOVO, E. M. L. M.; BARROS, N. O.; STECH, J. L.; PACHECO, F. S.</p>
            <p className={styles.publicationDetails}>Anais XIII Simpósio Brasileiro de Sensoriamento Remoto, Florianópolis, Brasil, 21-26 abril 2007, p. 3263-3269.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Trophic classifications between temperate and tropical aquatic ecosystems: is such terminology unrealistic for sedimentary carbon cycling?</h4>
            <p className={styles.publicationAuthors}>ABE, D. S.; ADAMS, D. D.; SIDAGIS-GALLI, C.; TUNDISI, J. G.; CIMBLERIS, A. C. P.; BRUM, P. R.</p>
            <p className={styles.publicationDetails}>In: 11th World Lakes Conference - Management of Lake Basins for their Sustainable Use: Global Experience and African Issues, 2005, Nairobi. 11th World Lakes Conference - Abstracts Volume. Nairobi : PASS, University of Nairobi, 2005. v. 1. p. 105-105.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Carbon budget in hydroelectric reservoirs of FURNAS Centrais Elétricas, Brazil.</h4>
            <p className={styles.publicationAuthors}>CIMBLERIS, A. C. P.; SANTOS, M. A.; MATVIENKO, B.; STECH, J. L.; LIMA, I. B. T.; TUNDISI, J. G.; ABE, D. S.; SIDAGIS-GALLI, C. V.; ROLAND, F.; CESAR, D. E.; BRUM, P. R.</p>
            <p className={styles.publicationDetails}>Proceedings of the International Association of Theoretical and Applied Limnology, v. 29, p. 563, 2005.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Carbon budget in two neotropical reservoirs.</h4>
            <p className={styles.publicationAuthors}>ROLAND, F.; BRUM, P. R.; SOARES, C. B.; CESAR, D. E.; ROSA, L. P.; SANTOS, M. A.; SIKAR, B. M.; TUNDISI, J. G.; ABE, D. S.; STECH, J. L.; NOVO, E. M. L. M.</p>
            <p className={styles.publicationDetails}>In: ASLO - Aquatic Sciences Meeting, 2006. Victoria, Canada.</p>
          </div>

          <div className={styles.publicationItem}>
            <h4 className={styles.publicationTitle}>Heterotrophic pathways on carbon balance in tropical reservoirs.</h4>
            <p className={styles.publicationAuthors}>ROLAND, F.; VIDAL, L.; COLE, J. J.; CIMBLERIS, A. C. P.</p>
            <p className={styles.publicationDetails}>In: ASLO - Aquatic Sciences Meeting, 2006. Victoria, Canada.</p>
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