import { Link, NavLink } from 'react-router-dom';

import styles from './furnas.module.css';

import { useState } from 'react';



// --- Imports de furnas ---

import hidreletricasFurnas from '../../assets/hidreletricasFurnas.png';

import logofurnas from '../../assets/Logofurnas.png';

import logoFurnas from '../../assets/LogoFurnas.png';

import logoSima from '../../assets/LogoSIMA.png';

 import iconObjetivos from '../../assets/lconObjetivos.png';

 import iconIntroducao from '../../assets/lconIntroducao.png';

 import iconMetodologia from '../../assets/lconMetodologia.png';

 import iconResultados from '../../assets/lconResultados.png';

 import iconPanorama from '../../assets/lconPanorama.png';

 import iconUsinas from '../../assets/iconUsinas.png';

 import iconPesquisas from '../../assets/iconPesquisas.png';

import iconLinks from '../../assets/iconLinks.png';

import logoBanco from '../../assets/LogoBanco.png';



// --- Imports ADICIONADOS da SIMAPAGE ---

import ClickableCard from '../../components/ClickableCard/ClickableCard';







export default function Furnas() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);



  const mainNavLinks = [

    { label: 'Home', to: '/' },

    { label: 'Início', to: '/Furnas' },

    { label: 'Banco de Dados', to: '/' },

    { label: 'Publicações', to: '/' },

    { label: 'SIMA', to: '/' },

    { label: 'FURNAS', to: '/Furnas' },

  ];



  // O const gridCards foi removido pois não é mais usado



  const handleLinkClick = () => {

    setIsMenuOpen(false);

  };



  const toggleMenu = () => {

    setIsMenuOpen(!isMenuOpen);

  }



  // --- CONTEÚDO DOS MODAIS ADICIONADO DA SIMAPAGE ---



  // --- Estilos para o conteúdo dos Modais ---

  const modalStyles = {

    h2: { marginBottom: '1rem', color: '#333' },

    p: { lineHeight: '1.6', marginBottom: '1rem' },

    ul: { listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1rem' },

    li: { marginBottom: '0.75rem', lineHeight: '1.5' },

    a: { color: '#0056b3', textDecoration: 'none' },

    h4: { marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: 'bold', color: '#555' },

  };



  // --- Conteúdo Falso para os Modais ---

  const ModalObjetivosGerais = (<div> <h2 style={modalStyles.h2}>Objetivos Gerais</h2> <p style={modalStyles.p}>
    Determinar as emissões de gases de efeito estufa: gás carbônico, metano e óxido nitroso, dos reservatórios de FURNAS Centrais Elétricas S.A.;
    <br /><br />
    Identificar as rotas do ciclo do carbono nesses reservatórios e os fatores ambientais envolvidos;
    <br /><br />
    Avaliar a influência dos fatores morfológicos, morfométricos, biogeoquímicos e operacionais dos reservatórios na emissão de gases de efeito estufa;
    <br /><br />
    Determinar o padrão de emissão existente, anteriormente à construção de reservatórios;
    <br /><br />
    Elaborar um modelo espacial e temporal de emissão de gases para reservatórios implantados em ambientes de Cerrado.</p> </div>);

  const ModalIntroducao = (<div> <h2 style={modalStyles.h2}>Introdução</h2> <ul style={modalStyles.ul}> A crescente emissão de gases de efeito estufa, devido às atividades humanas, pode causar severas conseqüências ambientais em escalas regionais e global, tendendo a afetar mais os países em desenvolvimento, localizados em baixas latitudes, do que os países do hemisfério Norte.
    <br /><br />
    O Brasil, ao ratificar a Convenção Quadro das Nações Unidas sobre Mudanças do Clima, comprometeu-se a elaborar e atualizar inventários de suas fontes de emissão, bem como das remoções por sumidouros dos principais gases de efeito estufa (GHG): gás carbônico, metano e óxido nitroso. O conhecimento dessas fontes e sumidouros é o primeiro passo na busca de medidas mitigadoras.
    <br /><br />
    A partir da última década, a comunidade científica tem questionado se os reservatórios destinados à geração hidrelétrica contribuem substancialmente para o aumento do efeito estufa. Assim, tornam-se necessárias investigações nessa área. Além disso, é importante que o setor elétrico nacional verifique as opções disponíveis para redução das emissões de gases de efeito estufa por unidade de energia gerada, de modo que possa se qualificar para o mercado mundial das Reduções Certificadas de Emissão.
    <br /><br />
    O presente projeto constitui a etapa inicial na realização do balanço de carbono de FURNAS CENTRAIS ELÉTRICAS S.A., onde as emissões originadas dos reservatórios das usinas hidrelétricas poderão ser comparadas às emissões produzidas pela geração termelétrica e, então, contrastadas com o carbono fixado por meio dos projetos de reflorestamento da Empresa.
    <br /><br />
    Este projeto foi desenvolvido de acordo com a lei 9.991/2000, que estabelece um investimento mínimo anual de 1% de seu lucro líquido, das companhias geradoras de eletricidade, em pesquisa e desenvolvimento no setor elétrico.
    <br /> {/* Quebra de linha simples antes do link */}
    Os procedimentos para os projetos são determinados pela <a href="https://www.gov.br/aneel/pt-br" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>Agência Nacional de Energia Elétrica (ANEEL)</a>. </ul> </div>);

  const ModalMetodologia = (<div> <h2 style={modalStyles.h2}>Metodologia</h2> <p style={modalStyles.p}> O projeto será composto por quatro sub-projetos a serem desenvolvidos em paralelo:
    <br /><br />
    <strong>1. Aquisição de dados micrometeorológicos e limnológicos em tempo real</strong>
    <br /> {/* Quebra simples após o subtítulo */}
    O Sistema Integrado de Monitoração Ambiental - SIMA - é um conjunto de hardware e software desenhado para a coleta de dados e a monitoração em tempo real de sistemas hidrológicos... (texto continua)... o bom desempenho do sistema.
    <br /><br />
    A seleção de variáveis ambientais a ser medida levou em conta os seguintes aspectos:
    <br />
    {/* Usando <br /> para simular a lista */}
    - sua relevância para a caracterização dos ambientes aquáticos<br />
    - sua relevância como indicador de impacto ambiental (são variáveis que respondem de forma consistente às alterações no funcionamento do sistema aquático)<br />
    - sua relevância no processo de emissão de gases de efeito estufa<br />
    - a viabilidade técnica de obtenção de medidas a partir de plataformas automáticas<br /><br />

    Com base nesses critérios, o sistema de medição automática permitirá monitorar as seguintes variáveis ambientais:
    <br />
    - água: temperatura da água, pH e turbidez, oxigênio e CO2 dissolvidos, condutividade, nitrato, amônia, profundidade relativa.<br />
    - atmosfera: temperatura do ar, pressão atmosférica, radiação solar, direção e intensidade do vento, direção e intensidade da corrente, profundidade relativa.<br /><br />

    Essas variáveis são medidas por meio de um kit de sensores integrado às plataformas... (texto continua)... serão adquiridas passagens de ida-volta do aeroporto de São José dos Campos com destino às cidades mais próximas dos reservatórios em estudo.
    <br /><br />
    <strong>2. Estimativa de Fluxos de CO2, CH4 e N2O na interface água-atmosfera e coluna dágua</strong>
    <br /> {/* Quebra simples após o subtítulo */}
    Enquanto a combustão de carvão, óleo combustível ou gás natural em plantas térmicas se produz principalmente gás carbônico (CO2)... (texto continua)... serão dispostos os conjuntos de amostragem em locais significativos dos reservatórios estudados, sendo:
    <br />
    {/* Usando <br /> para simular a lista */}
    - região próximo à barragem, em diferentes profundidades...<br />
    - região abrigada do reservatório, em algum braço de antigo rio...<br />
    - região abrigada do reservatório em diferentes profundidades, em algum braço de rio na região oposta...<br />
    - região à montante do reservatório, onde pode ocorrer presença de macrófitas aquáticas...<br />
    - região à jusante...<br /><br />

    Quanto à análise, o melhor método de análise quantitativa... (texto continua)... por cromatografia de fase gasosa.
    <br /><br />
    Elementos da amostragem:
    <br />
    - Serão quantificados os componentes...<br />
    - Para cada reservatório estudado serão combinadas estas taxas...<br />
    - Proceder-se-á também a medição in situ de fluxos de gases...<br /><br />

    <strong>3. Ciclo do Carbono na coluna d’água</strong>
    <br /> {/* Quebra simples após o subtítulo */}
    Nos ambientes aquáticos, a maior parte do carbono está presente nas formas inorgânica e orgânica dissolvidas... (texto continua)... implicações nas emissões observadas.
    <br /><br />
    Com base nesse escopo, serão obtidos os seguinte dados:
    <br />
    - Estoques Biológicos de Carbono: A biomassa fitoplanctônica... A biomassa bacteriana...<br />
    - Processos de Transferência de Carbono: Produção primária fitoplanctônica... Carbono orgânico excretado... A produção bacteriana... A respiração planctônica...<br />
    - Parâmetros ambientais: Tais como concentrações de carbono inorgânico dissolvido (DIC)... Variáveis limnológicas...<br />
    - Quantificação da entrada de material alóctone: Os principais tributários de cada reservatório... Concentrações de DOC e POC também serão avaliadas imediatamente a jusante de cada reservatório.<br /><br />

    <strong>4. Estimativa de Fluxos de CO2, CH4 e nitrogênio (N2) na interface água-sedimento</strong>
    <br /> {/* Quebra simples após o subtítulo */}
    Uma grande parte dos gases de efeito estufa é originada da decomposição da matéria orgânica presente nos sedimentos anóxicos... (texto continua)... potencial de desoxigenação e denitrificação das águas hipolimnéticas, bem como o seu fluxo para a atmosfera.
    <br /><br />
    A composição isotópica do carbono e nitrogênio, presentes nos sedimentos, também será avaliada. </p> </div>);

  const ModalResultadosEsperados = (<div> <h2 style={modalStyles.h2}>Resultados Esperados</h2> <ul style={modalStyles.ul}>Padronização de metodologia para o cálculo das emissões de gases de efeito estufa em reservatórios;
    <br /><br />
    Modelo de emissão de longo prazo de gases de efeito estufa por reservatórios;
    <br /><br />
    Artigos em revistas especializadas e publicação de livro, o qual incluirá uma versão direcionada à comunidade científica internacional.
    <br /><br />
    Modelos ecohidrodinâmicos aplicados;
    <br /><br />
    Disponibilização de modelos e dados na internet;
    <br /><br />
    Desenvolvimento de técnicas computacionais de análise de sinais ambientais;
    <br /><br />
    Incentivo da inovação tecnológica no país;
    <br /><br />
    Capacitação de recursos humanos com atividades acadêmicas de pesquisa.
    <br /><br /><br /> {/* Espaço extra antes do subtítulo */}
    <strong>Benefícios Gerados</strong>
    <br /> {/* Quebra simples após o subtítulo */}
    Fortalecimento dos parceiros como Centros de Excelência;
    <br /><br />
    Produção de conhecimento relevante ao estado-da-arte (Subsídios à realização de 5 dissertações de mestrado e 6 teses de doutorado, além de cursos de especialização);
    <br /><br />
    Participação em conferências, seminários e congressos e publicações em anais e revistas especializadas;
    <br /><br />
    Resultados irão compor o balanço de carbono de FURNAS, o qual permitirá o aprimoramento de seu planejamento ambiental, baseado no desenvolvimento sustentável. </ul> </div>);

  const ModalPanorama = (<div> <h2 style={modalStyles.h2}>Panorama</h2> <p style={modalStyles.p}><strong>AS MUDANÇAS CLIMÁTICAS GLOBAIS E OS RESERVATÓRIOS DE HIDRELÉTRICAS</strong>
    <br /><br />
    Comissão Mundial de Barragens (WCD): quando geração hidrelétrica é inferior a 0,1 W por m2 de área de reservatório, as emissões podem exceder àquelas originadas de termelétricas;
    <br /><br />
    Emissões parecem variar em função da profundidade e densidade da biomassa alagada;
    <br /><br />
    O ciclo do carbono: deve ser avaliado antes e após a instalação da formação do reservatório. Estudos devem abordar as interações com as bacias de drenagem;
    <br /><br />
    Convenção Quadro das Nações Unidas sobre Mudança do Clima (UNFCCC): Compromisso de elaborar e atualizar periodicamente inventários nacionais de emissões antrópicas por fontes e das remoções por sumidouro;
    <br /><br />
    Os reservatórios de carbono têm tamanhos muito diferentes e sua importância também é relacionada aos tempos de permanência. Sendo assim, um reservatório menor pode ter uma importância maior que um reservatório maior. Por exemplo, o biota possui 0,1% do carbono aproximadamente na Terra, mas é naturalmente responsável pela grande maioria de fluxos.
    <br /><br />
    Porém, como as atividades humanas queimam combustíveis fósseis, liberando grandes quantias de carbono, que levou milhões de anos para ser despejada na atmosfera em questão de minutos.
    <br /><br />
    As mudanças climáticas têm sido um dos temas de relevância mundial na última década. O Painel Intergovernamental sobre Mudança do Clima (IPCC), criado em 1988 pelo Programa das Nações Unidas para o Meio Ambiente e pela Organização Meteorológica Mundial, é formado por cientistas de diversas nacionalidades, e vem realizando estudos sobre a alteração do clima planetário, suas conseqüências e a influência das atividades antrópicas em tais alterações. Os documentos que compõem o Terceiro Relatório de Avaliação do IPCC (“Climate Change 2001”), confirmam que o aquecimento global nos últimos 50 anos é conseqüência do aumento das concentrações de gases de efeito estufa (GEE), originado principalmente da queima de combustíveis fósseis. Como resultado, é prevista a ocorrência de eventos climáticos extremos e são esperados impactos na circulação e no volume (elevação do nível) dos oceanos, nos regimes pluviométricos, na agricultura e na estrutura e produtividade dos ecossistemas, com perda da biodiversidade e alterações nos ciclos do carbono e nutrientes.</p> </div>);

  const ModalUsinasHidreletricas = (<div> <h2 style={modalStyles.h2}>Usinas em Operação</h2> <p style={modalStyles.p}> <img
    src={hidreletricasFurnas}
    alt="Foto das Usinas Hidrelétricas em Operação"
  /></p> </div>);

  const ModalPesquisasCorrelatadas = (<div> <h2 style={modalStyles.h2}>Pesquisas Correlatadas</h2> <ul style={modalStyles.ul}> <li style={modalStyles.li}>  The Third Assessment Report of the Intergovernmental Panel on Climate Change<br />
    IPCC 2001 - <a href="http://www.ipcc.ch" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>http://www.ipcc.ch</a>
    <br /><br />
    Sediment greenhouse gases (methane and carbon dioxide) in the Lobo-Broa Reservoir, São Paulo State, Brazil: Concentrations and diffuse emission fluxes for carbon budget considerations<br />
    ABE, D. S. ; ADAMS, D. D. ; GALLI, C. V. S. ; SIKAR, E. ; TUNDISI, J. G.<br />
    Lakes & Reservoirs: Research and Management, 10: 201-209, 2005
    <br /><br />
    A comparison of the carbon balances of a natural lake (L. O. rtra.sket) and a hydroelectric reservoir (L.Skinnmuddselet) in northern Sweden<br />
    ABERG, JAN ; BERGSTROM, ANN-K. ; ALGESTEN, G. ; DERBACK, G. ; JANSSON, M.<br />
    Water Research, 38, 531-538, 2004
    <br /><br />
    CH4 e CO2 emissions and carbon imbalance in a 10-years old tropical reservoir (Petit-Saut, French Guiana)<br />
    ABRIL, G. ; GUÉRIN, F. ; RICHARD, S. ; DELMAS, R. ; GALY-LACAUX, C. ; TREMBLAY, A. ; VARFALVY, L. ; GOSSE, P. ; SANTOS, M. A. ; MATVIENKO, B.<br />
    Global Biogechemical Cycles, 19, 2005
    <br /><br />
    In situ measurements of dissolved gases (CO2 and CH4) in a wide range of concentrations in a tropical reservoir using an Equilibrator<br />
    ABRIL, G. ; RICHARD, S. ; GUÉRIN, F.<br />
    Science of the Total Environment 354, 246-251, 2006 - <a href="http://www.elsevier.com/locate/scitotenv" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>www.elsevier.com/locate/scitotenv</a>
    <br /><br />
    Aquatic cycling and hydrosphere to troposphere transport of reduced gases - A review<br />
    ADAMS, D. D.<br />
    In: D. D. Adams, S. P. Seitzinger and P. M. Crill, Mitteilungen (Communications) No. 25, International Association of Theoretical and Applied Limnology (SIL). Publisher: E. Schweizerbart'sche Verlagsbuchhandlungen, Stuttgart, Germany, pp. 1-13, 1996
    <br /><br />
    Methane, carbon dioxide and nitrogen gases in the surficial sediments of two Chilean reservoirs - diffusive fluxes at the sediment water interface<br />
    ADAMS, D. D.<br />
    Dams and Climate Change, Luiz P. Rosa and Marco A. dos Santos, eds. ; Proceedings of International Workshop on Hydrodams, Lakes and Greenhouse Gas Emissions, COPPE-UFRJ, Rio de Janeiro, Brazil, pp. 50-77, 1999
    <br /><br />
    Reservoirs and Greenhouse Gases<br />
    ADAMS, D. D. ; DELMAS, R. ; LE, M. ; VARFALVY L. ; NOVO, E. M. L. M. ; GOSSE P. ; BOON, P.<br />
    Reservoirs and Greenhouse Gases, special session 42 at Societas Internationalis Limnologiae, Monash University, Melbourne, Australia, 2001
    <br /><br />
    Gases in the sediments of two eutrophic Chilean reservoirs: potential sediment oxygen demand and sediment-water flux of CH4 and CO2 before and after an El Niño event<br />
    ADAMS, D. D. ; VILA, I. ; PIZARRO, J. ; SALAZAR, C.<br />
    Verh. Internat. Verein. Limnol., 27:1376-1381, 2000
    <br /><br />
    Investigating Ebullition in a Sand Column Using Dissolved Gas Analysis and Reactive Transport Modeling<br />
    AMOS, R. ; YER, K.<br />
    Environmental Science Technology, 40, 5361-5367, 2006
    <br /><br />
    Mitigation and recovery of methane emissions from tropical hydroelectric dams<br />
    BAMBACE, L. A. W. ; RAMOS, F. M. ; LIMA, I. B. T. ; ROSA R. R.<br />
    Energy, 32, 1038-1046, 2007 - <a href="http://www.elsevier.com/locate/energy" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>www.elsevier.com/locate/energy</a>
    <br /><br />
    Measurement of Methane Oxidation in Lakes: A Comparison of Methods<br />
    BASTVIKEN, D. ; NEJLERTSSON, J. ; TRANVIK, L.<br />
    Environmental. Science & Technology, 36, 3354-3361, 2004
    <br /><br />
    Estimating production of heterotrophic bacterioplankton via incorporation of tritiated thymidine<br />
    BELL, R. T.<br />
    In: P.F. Kemp, B. F. Sherr, E.B. Sherr and J.J. Cole (eds) Handbook of Methods in Aquatic Microbial Ecology. Lewis. 1993
    <br /><br />
    Emission of CO2 from hydroelectric reservoirs in northern Sweden<br />
    BERGSTRÖM, ANN-K. ; ALGESTEN, G. ; SOBEK, S. ; TRANVIK, L. ; JANSSON, M.<br />
    Arch. Hydrobiol., 159 1 25-42, 2004
    <br /><br />
    Experimenting with hydroelectric reservoirs: researchers created reservoirs in Canada to explore the impacts of hydroelectric developments on greenhouse gas and methylmercury production<br />
    BODALY, R. A. ; BEATY, K. G. ; HENDZEL, L. ; MAJEWSKI, A. R. ; PATERSON, M. J. ; ROLFHUS, K. R. ; PENN, A. F. ; ST. LOUIS, V. L. ; HALL, B. ; MATTHEWS, C. J. D. ; CHEREWYK, K. ; MAILMAN, M. ; PHURLEY, J. ; CHIFF, S. S. ; VENKITESWARAN, J. J.<br />
    Environmental Science & Technology, 347-352, 2004
    <br /><br />
    Carbon cycling in Australian wetlands: the importance of methane<br />
    BOON P. I.<br />
    Verh. Internat. Verein. Limnol., 27:37-50, 2000
    <br /><br />
    Fluxes of methane and carbon dioxide from a small productive lake to the atmosphere<br />
    CASPER, P. ; MABERLY, S. C. ; HALL, G. H. ; FINLAY, B. J.<br />
    Biogeochemistry, 49:1-19, 2000
    <br /><br />
    Planktonic bacterial respiration as a function of C:N:P ratios across temperate lakes<br />
    CIMBLERIS, A. C. P. ; KALFF, J.<br />
    Hydrobiologia, 384:89-100, 1998
    <br /><br />
    Carbon in catchments: connecting terrestrial carbon losses with aquatic metabolism<br />
    COLE, J. J. ; CARACO, N. F.<br />
    Marine and Freshwater Research. 52:101-110, 2001
    <br /><br />
    Carbon dioxide supersaturation in the surface waters of lakes<br />
    COLE, J. J. ; CARACO, N. F. ; KLING, G. W. ; KRATZ, T. K.<br />
    Science, 265:1568-1570, 1994
    <br /><br />
    Persistence of net heterotrophy in lakes during nutrient addition and food web manipulations<br />
    COLE, J. J. ; PACE; M. L. ; CARPENTER, S. R. ; KITCHELL, J. F.<br />
    Limnol. Oceanogr. 45(8):1718-1730, 2000
    <br /><br />
    The Dam Debate And Its Discontents<br />
    CULLENWARD, D. ; VICTOR, D. G.<br />
    Editorial Comment , Climatic Change, 75: 81-86, 2006
    <br /><br />
    Sources and transfers of particulate organic matter in a tropical reservoir ( Petit Saut, French Guiana): a multitracers analysis using d13C, C/N ratio and pigments<br />
    DEJUNET, A. ; ABRIL, G. ; GUÉRIN, F. ; WIT, R.<br />
    Submitted December 2006
    <br /><br />
    Respiration rates in bacteria exceed phytoplankton production in unproductive aquatic systems<br />
    DEL GIORGIO, P. A. ; COLE, J. J. ; CIMBLERIS, A.<br />
    Nature 385:148-151
    <br /><br />
    Emission of greenhouse gases from the tropical hydroelectric reservoir of Petit Saut (French Guiana) compared with emissions from thermal alternatives<br />
    DELMAS, R. ; GALY-LACAUX, C. ; RICHARD, S.<br />
    Global Biogeochemical Cycles, 15, 993-1003, 2001
    <br /><br />
    Greenhouse gas emissions from hydroelectric dams in the tropics: a case study in French Guiana<br />
    DELMAS, R. ; RICHARD, S. ; GALY-LACAUX, C. ; GUÉRIN, F. ; DELON, C.<br />
    ILEAPS - International Open Science Conference, Helsinki, Finland, 73-78, 2003
    <br /><br />
    Long term greenhouse gas emissions from the hydroelectric reservoir of Petit Saut (French Guiana) and potencial impacts<br />
    DELMAS, R. ; RICHARD, S. ; GUÉRIN, F. ; ABRIL, G. ; GALY-LACAUX, C. ; DELON, C ; GRÉGOIRE, A.<br />
    In: Greenhouse gases emissions from natural environments and hydroelectric reservoirs: fluxes and processes, A. Tremblay, L. Varfalvy, C. Roehm and M. Garneau (Eds) Springer-Verlag, 293-312
    <br /><br />
    Greenhouse Gas Emissions from Energy Systems: Comparision and Overview<br />
    DONES, R. ; HECK, T. ; HIRSCHBERG, S.<br />
    In PSI Annual Report, Annex IV, Paul Scherrer Institut, Villigen, Switzerland, 27-40, 2003
    <br /><br />
    CH4 emissions from flooded land: Basis for future methodological development<br />
    DUCHEMIN, E. ; HUTTUNEN, J. T. ; TREMBLAY, A. ; DELMAS, R. ; MENEZES, C. F. S.<br />
    IGES, Kanagawa, Japan, pp. Ap3.1 - Ap3.8
    <br /><br />
    Possible approach for estimating CO2 emissions from lands converted to permanently flooded land: Basis for future methodological development<br />
    DUCHEMIN, E. ; HUTTUNEN, J. T. ; TREMBLAY, A. ; DELMAS, R. ; MENEZES, C. F. S.<br />
    IGES, Kanagawa, Japan, pp. Ap2.1 - Ap2.9
    <br /><br />
    Comparison of static chamber and Boundary Layer Equation methods for measuring greenhouse gas emissions from large water bodies<br />
    DUCHEMIN, E. ; LUCOTTE, M. ; CANUEL, R.<br />
    Environmental Science & Technology, 33:350-357, 1999
    <br /><br />
    Production of greenhouse gases CH4 and CO2 by hydroelectric reservoirs of the boreal region<br />
    DUCHEMIN, E. ; LUCOTTE, M. ; CANUEL, R.<br />
    Global Biogeochemical Cycles, vol 9, no 4, p. 529-540, 1995
    <br /><br />
    Comparison of greenhouse gas emissions from an old tropical reservoir with those from other reservoirs worldwide<br />
    DUCHEMIN, E. ; LUCOTTE, M. ; CANUEL, R. ; QUEIROZ, A. G. ; ALMEIDA, D. C. ; PEREIRA, H. C. ; DEZINCOURT, J.<br />
    Verh. Internat. Verein. Limnol., 27:1391-1395, 2000
    <br /><br />
    First assessment of methane and carbon dioxide emissions from shallow and deep zones of boreal reservoirs upon ice break-up<br />
    DUCHEMIN, E. ; LUCOTTE, M. ; CANUEL, R. ; SOUMIS, N.<br />
    Lakes & Reservoirs: Research and Management, 11: 9-19, 2006
    <br /><br />
    Influence of light intensity on methanotrophic bacterial activity in the Petit Saut reservoir, French Guiana<br />
    DUMESTRE, J. F. ; GUEZENNEC, J. ; GALY-LACAUX, C. ; DELMAS, R. ; RICHARD, S. ; LABROUE, L.<br />
    Applied and Environmental Microbiology, 65, 534 - 539, 1999
    <br /><br />
    Greenhouse gas emissions from hydroelectric reservoir (Brazil's Tucuruí dam) and the energy policy implications<br />
    FEARNSIDE, P.<br />
    Water, Air and Soil Pollution, 133:69-96, 2002
    <br /><br />
    Do hydroelectric dams mitigate globalwarming? The case of Brazil's Curuí-Una dam<br />
    FEARNSIDE, P. M.<br />
    Mitigation and Adaptation Strategies for Global Change, 10: 675-691, 2005
    <br /><br />
    Environmental impacts of Brazil's Tucuruí dam: unlearned lessons for hydroelectric development in Amazonia<br />
    FEARNSIDE, P. M.<br />
    Environmental Management, 27 (3): 377-396, 2001
    <br /><br />
    Greenhouse gas emissions from hydroelectric dams: controversies provide a springboard for rethinking a supposedly 'clean' energy source<br />
    FEARNSIDE, P. M.<br />
    Climatic Change 66: 1-8, 2004
    <br /><br />
    Greenhouse-gas emissions from Amazonian hydroelectric reservoirs: the example of Brazil's Tucuruí dam as compared to fossil fuel alternatives<br />
    FEARNSIDE, P. M.<br />
    Environmental Conservation, 24 (1): 64-75, 1997
    <br /><br />
    A headspace equilibration technique for measurement of dissolved gases in sediment pore water<br />
    FENDINGER, N. J. ; ADAMS, D. D.<br />
    Intern. J. Environ. Anal. Chem., 23:253-265, 1986
    <br /><br />
    Methane and oxygen dynamics in a shallow floodplain lake: the significance of periodic stratification<br />
    FORD, P. W. ; BOON, P. I. ; LEE, K.<br />
    Hydrobiologia, 485: 97-110, 2002
    <br /><br />
    Greenhouse gas emissions from hydropower: The state of research in 1996<br />
    GAGNON, L. ; VATE, VAN DE J. F.<br />
    Energy Policy, 25,(I),7-13, 1997
    <br /><br />
    Gaseuos emission and oxygen consumption in hydroelectric dams. A case study in French Guiana<br />
    GALY-LACAUX, C. ; DELMAS, R. ; DUMESTRE, J. F. ; LABROUE, L. ; GOSSE, P.<br />
    Global Biogeochemical Cycles, 11, 471-483, 1997
    <br /><br />
    Long term greenhouse gas emissions from hydroelectric reservoirs in tropical forest regions<br />
    GALY-LACAUX, C. ; DELMAS, R. ; KOUADIO, G. ; RICHARD, S. ; GOSSE, P.<br />
    Global Biogeochemical Cycles, 13, 503-517, 1999
    <br /><br />
    Emission de Méthane et consommation d'oxygène dans le retenue de Petit Saut en Guyane<br />
    GALY-LACAUX, C. ; JAMBERT, C. ; DELMAS, R. ; DUMESTRE, J. F. ; LABROUE, L. ; CERDAN, P. ; RICHARD, S.<br />
    Comptes Rendus de I
    <br /><br />
    Evolution and relationship between 3 dissolved gases (oxygen, methane, and carbon dioxide) over a 10-year period (1994-2003) in a river downstream of a new intertropical dam<br />
    GOSSE, P. ; ABRIL, G. ; GUÉRIN, F. ; RICHARD, S. ; DELMAS, R.<br />
    Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte Limnologie, 29, 594-600, 2005
    <br /><br />
    Evolution and relationships of greenhouse gases and dissolved oxygen during 1994-2003 in a river downstream of a tropical reservoir<br />
    GOSSE, P. ; ABRIL, G. ; GUERIN, F. ; RICHARD, S. ; DELMAS, R.<br />
    Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte Limnologie, 29, 594-600, 2005
    <br /><br />
    Emission of CO2, CH4 and N2O from lakeshore soils in an Antarctic dry valley<br />
    GREGORICH, E. G. ; HOPKINS, D. W. ; ELBERLING, B. ; SPARROW, A. D. ; NOVIS, P. ; GREENFIELD, L. G. ; ROCHETTE, P.<br />
    Soil Biology & Biochemistry, 38, 3120-3129, 2006
    <br /><br />
    Production of carbon dioxide and methane by flooded tropical soils during anoxic incubations: Implication for atmospheric emissions from a hydroelectric reservoir (Petit Saut, French Guiana)<br />
    GUÉRIN, F. ; ABRIL, G. ; DEJUNET, A. ; DELMAS, R.<br />
    Under preparation
    <br /><br />
    Methane and carbon emissions from tropical reservoirs: significance of downstream rivers<br />
    GUÉRIN, F. ; ABRIL, G. ; RICHARD, S. ; BURBAN, B. ; REYNOUARD, C. ; SEYLER, P. ; DELMAS, R.<br />
    Geophysical Research Letters, 33, L21407, 2006
    <br /><br />
    Gas transfer velocities measured by eddy correlations and floating chambers techniques in tropical reservoir<br />
    GUÉRIN, F. ; ABRIL, G. ; SERÇA, D. ; DELON, C. ; RICHARD, S. ; DELMAS, R. ; TREMBLAY, A. ; VARFALVY, L.<br />
    SOLAS Newsletter, 2, 7, 2005
    <br /><br />
    Gas transfer velocities of CO2 and CH4 in a tropical reservoir and its river downstream<br />
    GUÉRIN, F. ; ABRIL, G. ; SERÇA, D. ; DELON, C. ; RICHARD, S. ; DELMAS, R. ; TREMBLAY, A. ; VARFALVY, L.<br />
    Journal of Marine Systems, 66, 161-172, 2006
    <br /><br />
    Contribution of winter to the annual CH4 emission from a eutrophied boreal lake<br />
    HUTTUNEN, J. T. ; ALM, J. ; SAARIJARVI, E. ; LAPPALAINEN, K. M. ; SILVOLA, J. ; MARTIKAINEN, P. J.<br />
    Chemosphere, 50, 247-250, 2003
    <br /><br />
    Fluxes of methane, carbon dioxide and nitrous oxide in boreal lakes and potential anthropogenic effects on the aquatic greenhouse gas emissions<br />
    HUTTUNEN, J. T. ; ALM, J. ;, LIIKANEN, A. ; JUUTINEN, S. ; LARMOLA, T. ; HAMMAR, T. ; SILVOLA, J. ; MARTIKAINEN, P. J.<br />
    Chemosphere, 52, 609-621, 2003
    <br /><br />
    Long-term effects of boreal reservoirs on the landscape-atmosphere N2O exchange<br />
    HUTTUNEN, J. T. ; MARTIKAINEN, P. J.<br />
    Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte Limnologie, 29, 607-611, 2005
    <br /><br />
    Long-term effects of nortern reservoirs on the landscape-scale CH4 and N2O exchanges<br />
    HUTTUNEN, J. T. ; MARTIKAINEN, P. J.<br />
    Report Series in Aerosol Science No. 81A. Yliopistopaino, Helsinki, 197-201, 2005
    <br /><br />
    Long-term net methane release from finish hydro reservoirs<br />
    HUTTUNEN, J. T. ; MARTIKAINEN, P. J.<br />
    Global Warming and Hydroeletric Reservoirs, op. cit., pp. 125-135, 2005
    <br /><br />
    Methane emissions from natural peatlands on the northern boreal zone on Finland, Fennoscandia<br />
    HUTTUNEN, J. T. ; NYKÄNEN, H. ; TURUNEN, J. ; MARTIKAINEN, P. J.<br />
    Atmospheric Environment 37, 147-151, 2003
    <br /><br />
    Fluxes of nitrous oxide on natural peatlands in Vuotos, an area projected for a hydroelectric reservoir in northern Finland<br />
    HUTTUNEN, J. T. ; NYKÄNEN, H. ; TURUNEN, J. ; NENONEN, O. ; MARTIKAINEN, P. J.<br />
    SUO, 53, 87-96, 2002
    <br /><br />
    Exchange of CO2, CH4 and N2O between the atmosphere and two northern boreal ponds with catchments dominated by peatlands or forests<br />
    HUTTUNEN, J. T. ; VÄISÄNEN, T. S. ; HEIKKINEN, S. ; NYKÄNEN, H. ; NENONEN, O. ; MARTIKAINEN, P. J.<br />
    Plant and Soil, 242, 137-146
    <br /><br />
    Fluxes of CH4, CO2 and N2O in hydroelectric reservoirs Lokka and Porttipahta in the northern boreal zone in Finland<br />
    HUTTUNEN, J. T. ; VÄISÄNEN, T. S. ; HELLSTEN, S. K. ; HEIKKINEN, S. ; NYKÄNEN, H. ; JUNGNER, H. ; NISKANEN, A. ; VIRTANEN, M. O. ; LINDQVIST, O. V. ; NENONEN, O. ; MARTIKAINEN, P. J.<br />
    Global Biogeochemical Cycles, 16, 1003, 2002
    <br /><br />
    Methane fluxes at the sediment-water interface in some boreal lakes and reservoirs<br />
    HUTTUNEN, J. T. ; VÄISÄNEN, T. S. ; HELLSTEN, S. K. ; MARTIKAINEN, P. J.<br />
    Boreal Environment Research, 11, 27-34, 2006
    <br /><br />
    Hydrologic sources of carbon cycling uncertainty throughout the terrestrial-aquatic continuum<br />
    JENERETTE, G. D. ; LAL, R.<br />
    Global Change Biology, 11, 1873-1882, 2005
    <br /><br />
    Increases in fluxes of greenhouse gases and methyl mercury following flooding of an experimental reservoir<br />
    KELLY, C. A. ; RUDD, W. M. ; BODALY, R. A. ; ROULET, N. P. ; ST. LOUIS, V. L. ; HEYES, A. ; MOORE, T. R. ; SCHIFF, S. ; ARAVENA, R. ; SCOTT, K. J. ; DYCK; B. ; HARRIS, R. ; WARNER, B. ; EDWARDS, G.<br />
    Environment Science Technology, 31, 1334-1344, 1997
    <br /><br />
    Sediment respiration and lake trophic state are important predictors of large CO2 evasion from small boreal lakes<br />
    KORTELAINEN, P. ; RANTAKARI, M. ; HUTTUNEN, J. T. ; MATTSSON, T. ; ALM, J. ; JUUTINEN, S. ; LARMOLA, T. ; SILVOLA, J. ; MARTIKAINEN, P. J.<br />
    Global Change Biology, 12, 1554-1567, 2006
    <br /><br />
    Spatial and seasonal variation in greenhouse gas and nutrient dynamics and their interactions in the sediments of a boreal eutrophic lake<br />
    LIIKANEN, A. ; HUTTUNEN, J. T. ; MURTONIEMI, T. ; TANSKANEN, H. ; VÄISÄNEN, T. ; SILVOLA, J. ; ALM, J. ; MARTIKAINEN, P. J.<br />
    Biogeochemistry, 65: 83-103, 2003, Kluwer Academic Publishers
    <br /><br />
    Biogeochemical distinction of methane releases from two Amazon hydroreservoirs<br />
    LIMA, I. B. T.<br />
    Chemosphere, 59, 1697-1702, 2005
    <br /><br />
    Emissão de metano em reservatórios hidreléricos amazônicos através de leis de potência<br />
    LIMA, I. B. T.<br />
    Tese de Doutorado, Centro de Energia Nuclear na Agricultura - USP, Piracicaba, 2002, 108p. (no prelo)
    <br /><br />
    Carbon flows in the Tucuruí reservoir<br />
    LIMA, I. B. T. ; NOVO, E. M. L. M.<br />
    In: Proceedings of International Workshop on Hydro Dams, Lakes and Greenhouse Gas Emissions, Rio de Janeiro, Brazil, COPPE-UFRJ, pp.78-84, 1999
    <br /><br />
    Methane production, transport and emission in Amazon hydroelectric plants<br />
    LIMA, I. B. T. ; NOVO, E. M. L. M. ; BALLESTER, M. V. F. ; OMETTO, J. P.<br />
    IEEE, 2529-2531, 1998
    <br /><br />
    Role of the macrophyte community in the CH4 production and emission in the tropical reservoir of Tucuruí, Pará State, Brazil<br />
    LIMA, I. B. T. ; NOVO, E. M. L. M. ; BALLESTER, M. V. R. ; OMETTO, J. P.<br />
    Verh. Internat. Verein. Limnol., 27:1437-1440, 2000
    <br /><br />
    Methane, carbon dioxide, and nitrous oxide emissions from two Amazonian reservoirs during high water table<br />
    LIMA, I. B. T. ; VICTORIA, R. L. ; NOVO, E. M. L. M. ; FEIGL, B. J. ; BALLESTER, M. V. R.; OMETTO, J. P.<br />
    XXVIII Societas Internationalis Limnologiae Congress, Melbourn, Australia, 2001. In press.
    <br /><br />
    The effect of termite biomass and anthropogenic on the CH4 budgets of tropical forests in Cameroon and Borneo<br />
    MACDONALD, J. A. ; JEEVA, D. ; EGGLETON, P. ; DAVIES, R. ; BIGNELL, D. E. ; FOWLER, D. ; LAWTON, J. ; MARYATI, M.<br />
    Global change Biology, 5, 869-879, 1999
    <br /><br />
    Methane Emission from Lakes<br />
    MAKHOV, G. A. ; BAZHIN, M.<br />
    Chemosphere, 38 (6), 1453-1459, 1999
    <br /><br />
    Methane emissions from lakes and floodplains in Pantanal, Brazil<br />
    MARANI, L. ; ALVALÁ, P. C.<br />
    Atmospheric Environment, 41, 1627-1633, 2007
    <br /><br />
    Carbon Dioxide and Methane production in small reservoirs flooding upland boreal forest<br />
    MATTHEWS, C. J. D. ; JOYCE, E. M. ; ST. LOUIS, V. L. ; SCHIFF, S. L. ; VENKITESWARAN, J. J. ; HALL, B. D. ; BODALY, R. A. ; BEATY, K. G.<br />
    Ecosystems, 8: 267-285, 2005
    <br /><br />
    Comparison of three techniques used to measure diffusive gas exchange from sheltered aquatic surfaces<br />
    MATTHEWS, C. J. D. ; ST. LOUIS, V. L. ; HESSLEIN, R. H.<br />
    Environmnet Science Technology, 37, 772-780, 2003
    <br /><br />
    Flooding the land, warming the Earth: greenhouse gas emissions from dams<br />
    MCCULLY, P.<br />
    International Rivers Network, 2002
    <br /><br />
    Tropical hydropower is a significant source of greenhouse gas emissions: a response to the International Hydropower Association<br />
    MCCULLY, P.<br />
    International Rivers Network, 2004
    <br /><br />
    Tropical hydropower is a significant source of greenhouse gas emissions: response to the International Hydropower Association<br />
    MCCULLY, P.<br />
    International Rivers Network, 2004 - <a href="http://www.irn.org" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>www.irn.org</a>
    <br /><br />
    Effect of temperature on production of CH4 and CO2 from peat in a natural and flooded boreal forest wetland<br />
    MCKENZIE, C. ; SCHIFF, S. ; ARAVENA, R. ; KELLY, C. ; ST. LOUIS, V.<br />
    Climatic change, 40: 247-266, 1998
    <br /><br />
    Nitrous oxide emissions to the atmosphere from an artificially oxygenated lake<br />
    MEYER, M. ; GÄCHTER, R. ; WEHRLI, B.<br />
    Limnol. Oceanogr., 41:548-553, 1996
    <br /><br />
    Greenhouse gas emissions from building and operating electric power plants in the upper Colorado river basin<br />
    PACCA, S. ; HORVATH, A.<br />
    Environment Science Technology, 36, 3194-3200, 2002
    <br /><br />
    Extreme event dynamics in methane ebullition fluxes from tropical reservoirs<br />
    RAMOS, F. M. ; LIMA, I. B. T. ; ROSA, R. R. ; MAZZI, E. A. ; CARVALHO, J. C. ; RASERA, M. F. F. L. ; OMETTO, J. P. H. B. ; ASSIREU, A. T. ; STECH, J. L.<br />
    Geophysical research letters, 33 (21), CiteID L21404, 2006
    <br /><br />
    Interannual variation and climatic regulation of the CO2 emission from large boreal lakes<br />
    RANTAKARI, M. ; KORTELAINEN, P.<br />
    Global Change Biology, 11, 1368-1380, 2005
    <br /><br />
    Evolution of physico-chemical water quality and methane emissions in the tropical hydroelectric reservoir of Petit Saut (French Guiana)<br />
    RICHARD, S. ; GALY-LACAUX, C. ; ARNOUX, A. ; CERDAN, P. ; DELMAS, R. ; DUMESTRE, J. F. ; GOSSE, P. ; HOREAU, V. ; LABROUE, L. ; SISSAKIAN, C.<br />
    Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte Limnologie, 27, 1454-1458, 2000
    <br /><br />
    Impact of methane oxidation in tropical reservoirs on greenhouse gas fluxes and water quality<br />
    RICHARD, S. ; GOSSE, P. ; GRÉGOIRE, A. ; DELMAS, R. ; GALY LACAUX, C.<br />
    In: A. Tremblay et. al. op. cit., 329-560
    <br /><br />
    Certainty and uncertainty in the science of greenhouse gas emissions from hydroelectric reservoirs<br />
    ROSA, L. P. ; SANTOS, M. A.<br />
    Thematic Review II.2 prepared as an input to the World Commission on Dams, Cape Town, 2000
    <br /><br />
    Dams and climate change<br />
    ROSA, L. P. ; SANTOS, M. A. (eds.)<br />
    Proceedings of International Workshop on Hydro Dams, Lakes and Greenhouse Gas Emissions, Rio de Janeiro, Brazil, 1999
    <br /><br />
    Hydropower plants and greenhouse gas emissions<br />
    ROSA, L. P. ; SANTOS, M. A. (eds.)<br />
    Proceedings of International Workshop on Greenhouse Gas Emissions from Hydroelectric Reservoirs, Rio de Janeiro, Brazil, 1997
    <br /><br />
    Biogenic gas production from major Amazon reservoirs, Brazil<br />
    ROSA, L. P. ; SANTOS, M. A. ; MATVIENKO, B. ; SIKAR, E. ; LOURENÇO, R. S. M. ; MENEZES, C. F. S.<br />
    Hydrological Processes, 17, 1433-1450, 2003
    <br /><br />
    Scientific errors in the Fearnside comments on Greenhouse Gas Emissions (GHG) from hydroelectric dams and response to his political claiming<br />
    ROSA, L. P. ; SANTOS, M. A. ; MATVIENKO, B. ; SIKAR, E. ; SANTOS, E. O.<br />
    Climatic Change, 75: 91-102, 2006
    <br /><br />
    Greenhouse gas emissions from hydroelectric reservoirs in tropical regions<br />
    ROSA, L. P. ; SANTOS, M. A. ; SIKAR, B. M. ; SANTOS, E. O. ; SIKAR, E.<br />
    Climatic Change, 66:9-21, 2004, Netherlands
    <br /><br />
    Greenhouse gas emissions from hydropower reservoirs and water quality<br />
    ROSA, L. P. ; SANTOS, M. A. ; TUNDISI, J. G.<br />
    COOPE/ UFRJ, 1st ed., 136 pp.
    <br /><br />
    Measurements of greenhouse gas emission in Samuel, Tucuruí and Balbina dams - Brazil<br />
    ROSA, L. P. ; SANTOS, M. A. ; TUNDISI, J. G. ; SIKAR, B. M.<br />
    In: Hydropower Plants and Greenhouse Gas Emissions, Rosa, L. P. & Santos, M. A. (eds.), COPPE publication, Rio de Janeiro, 1997
    <br /><br />
    Global warming potentials: the case of emissions from dams<br />
    ROSA, L. P. ; SHAEFFER, R.<br />
    Energy Policy, 23 (2), pp. 149-158, 1995
    <br /><br />
    Greenhouse gas emissions from hydroelectric reservoirs<br />
    ROSA, L. P. ; SHAEFFER, R.<br />
    Ambio, 23 (2), pp. 164-165, 1994
    <br /><br />
    Are hydroelectric dams in the Brazilian Amazon significant sources of greenhouse gases<br />
    ROSA, L. P. ; SHAEFFER, R. ; SANTOS, M. A.<br />
    Environmental Conservation, 66, n.1, 2-6, Cambridge University Press, UK, 1996
    <br /><br />
    Methane and Carbon Dioxide emissions of hydroelectric power plants in the Amazon compared to thermoelectric equivalents<br />
    ROSA, L. P. ; SHAEFFER, R. ; SANTOS, M. A.<br />
    Unpublished report, Energy Planning Program, COPPE/UFRJ, August, 1994 (manuscript, 48 pp.)
    <br /><br />
    Emissões de gases de efeito estufa de reservatórios hidrelétricos<br />
    ROSA, L. P. ; SIKAR, B. M. ; SANTOS, M. A. ; MONTEIRO, J. L. ; SIKAR, E. ; SILVA, M. B. ; SANTOS, E. O. ; JUNIOR, A. P. B.<br />
    Publicação ANEEL, Brasília, 2002
    <br /><br />
    Carbon budget in tropical reservoirs<br />
    SANTOS, M. A. ; MATVIENKO, B. ; SANTOS, E. O. ; ROSA, L. P. ; ALMEIDA, C. H .E. ; SILVA, M. B. ; BENTES JR, A. P. ; SIKAR, E. ; PATCHINEELAM, S. R.<br />
    Global Warming and Hydroelectric Reservoirs, op. cit., 95-100, 2005
    <br /><br />
    Gas release in the filing stage<br />
    SANTOS, M. A. ; MATVIENKO, B. ; SIKAR, E. ; ROSA, L. P. ; FILLIPO, R. ; CIMBLERIS, A.<br />
    Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte Limnologie, 27, 1415-1419, 2000
    <br /><br />
    Dams and climate change<br />
    SANTOS, M. A. ; ROSA, L. P.<br />
    COOPE/ UFRJ 1st ed., 80 pp., 1999
    <br /><br />
    Hydropower plants and greenhouse gas emissions<br />
    SANTOS, M. A. ; ROSA, L. P.<br />
    COOPE/ UFRJ 1st ed., 120 pp., 1997
    <br /><br />
    Gross greenhouse gas fluxes from hydro-power reservoir compared to thermo-power plants<br />
    SANTOS, M. A. ; ROSA, L. P. ; SIKAR, B. ; SIKAR, E. ; SANTOS, E. O.<br />
    Energy Policy, 34, 481-488, 2006
    <br /><br />
    Emissões de gases de efeito estufa do reservatório hidrelétrico de Belo Monte - fase de pré-enchimento do reservatório<br />
    SANTOS, M. A. ; SIKAR, B. M. ; MADDOCK, J. E. L. ; SANTOS, E. O. ; SILVA, M. B. ; ROCHA, C. H. E. A. ; JUNIOR, A. P. B. ; SIKAR, E.<br />
    Relatório Técnico Final COPPE/UFRJ-Eletrobrás, Rio de Janeiro, Agosto de 2004
    <br /><br />
    Gross greenhouse gas emissions from Brazilian hydro reservoirs<br />
    SANTOS, M. A. ; SIKAR, B. M. ; ROSA, L. P. ; SIKAR, E. ; SANTOS, E. O.<br />
    In: Greenhouse Gas Emission - Fluxes and Processes, Springer, Berlin, 2005
    <br /><br />
    The importance of floating peat to methane fluxes from flooded peatlands<br />
    SCOTT, K. J. ; KELLY, C. A. ; RUDD, J. W. M.<br />
    Biogeochemistry, 47: 187-202, 1999
    <br /><br />
    Contribution of tropical ecosystems to the global budgets of trace gases, especially CH4, H2, CO, and N2O<br />
    SEILER, W. ; CONRAD, R.<br />
    In: R.E. Dickenson (ed.), The Geophysiology of Amazonia, Vegetation and Climate Interactions. John-Wiley, NY, 1987
    <br /><br />
    Gas release from a reservoir in the filling stage<br />
    SIKAR, B. M. ; SIKAR, E. ; ROSA, L. P. ; SANTOS, M. A. ; FILIPPO, R. ; CIMBLERIS, A. C. P.<br />
    Verh. Internat. Verein. Limnol., 27:1-5, 2000
    <br /><br />
    Greenhouse gases and initial findings on the carbon circulation in two reservoirs and their watersheds<br />
    SIKAR, E. ; SANTOS, M. A. ; MATVIENKO, B. ; SILVA, M. B. ; ROCHA, C. H. E. D. ; SANTOS, E. O. ; BENTES JR, A. P. ; ROSA, L. P.<br />
    Verhandlungen der Internationalen Vereinigung für Theoretische und Angewandte Limnologie, 29, 573-576, 2005
    <br /><br />
    Protein content and protein synthesis rates of planktonic marine bacteria<br />
    SIMON, M. ; AZAM, F.<br />
    Mar. Ecol. Prog. Ser., 51:201-213, 1989
    <br /><br />
    A simple, economical method for measuring bacterial protein synthesis rates in seawater using 3H-leucine<br />
    SMITH, D. C. ; AZAM, F.<br />
    Marine Microbial Food Webs, 6, 2:107-114, 1992
    <br /><br />
    A carbon budget of a small humic lake: an example of the importance of lakes for organic matter cycling in boreal catchments<br />
    SOBEK, S. ; SODERBACK, B. ; KARLSSON, S. ; ANDERSSON, E. ; BRUNBERG, A. K.<br />
    Ambio, 35 (8), 469-475, 2006
    <br /><br />
    Reservoir surface as source of greenhouse gases to the atmosphere: a global estimate<br />
    ST-LOUIS, V. ; KELLY, C. A. ; DUCHEMIN, E. ; RUDD, J. W. ; ROSENBERG, D. M.<br />
    Bioscience, 50, 9:766-775, 2000
    <br /><br />
    Atmospheric methane - tropical sources<br />
    STREET-PERROTT, F. A.<br />
    Nature, 355:23-24, 1992
    <br /><br />
    Do hydroelectric reservoirs emit greenhouse gases?<br />
    TREMBLAY, A. ; LAMBERT, M. ; GAGNON, L.<br />
    Environmental Management, 33, Supplement 1, S509-S517, 2004
    <br /><br />
    Greenhouse emissions: fluxes and processes<br />
    TREMBLAY, A. ; VARFALVY, L. ; ROEHM, C. ; GARNEAU, M.<br />
    Environmental Sciences Series, 732 pp. Berlin: Springer-Verlag
    <br /><br />
    The issue of greenhouse gases from hydroeletric reservoirs: from boreal to tropical regions<br />
    TREMBLAY, A. ; VARFALVY, L. ; ROEHM, C. ; GARNEAU, M.
    <br /><br />
    Integration of research and management in optimizing multiple uses of reservoirs: the experience in South America and Brazilian case studies<br />
    TUNDISI, J. G. ; MATSUMURA,T.<br />
    Hydrobiologia, 500: 231-242, 2003
    <br /><br />
    Theoretical reservoir ecology and its applications<br />
    TUNDISI, J. G. ; STRASKRABA, M. (eds.)<br />
    International Institute of Ecology, Backhuys, The Netherlands, 1999
    <br /><br />
    Methane oxidation: isotopic enrichment factors in freshwater boreal reservoirs<br />
    VENKITESWARAN, J. J. ; SCHIFF, S. L.<br />
    Applied Geochemistry, 20, 683-690, 2005
    <br /><br />
    Gas exchange in ecosystems: framework and case studies<br />
    WADA, E. ; LEE, J. A. ; KIMURA, M. ; KOIKE, I. ; REEBURGH, W. S. ; TUNDISI, J. G. ; YOSHINARI, T. ; YOSHIOKA, T. ; VAN VUUREN, M. M. I.<br />
    Jpn. J. Limnol., 52, 4:263-281, 1991
    <br /><br />
    Methane bubbling from Siberian thaw lakes as a positive feedback to climate warming<br />
    WALTER, K. M. ; ZIMOV, S. A. ; CHANTON, J. P. ; VERBYLA, D. ; CHAPIN, F. S.<br />
    Nature Publishing Group, 443, 7, 2006
    <br /><br />
    Limnological analyses<br />
    WETZEL, R. G. ; LIKENS, G.<br />
    Springer-Verlag, 1992 </li> </ul> </div>);

  const ModalLinks = (<div> <h2 style={modalStyles.h2}>Links</h2> <p style={modalStyles.p}> 1st UNESCO Workshop on Greenhouse Status of Freshwater Reservoirs, Paris, Dec. 5-6 2006<br />
    <a href="http://typo38.unesco.org/index.php?id=655" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>http://typo38.unesco.org/index.php?id=655</a>
    <br /><br />
    2nd UNESCO Workshop on Greenhouse Status of Freshwater Reservoirs, Foz do Iguaçu, Oct. 4-7 2007<br />
    <a href="http://www.hidroinformatica.org.br/workshop.php" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>http://www.hidroinformatica.org.br/workshop.php</a>
    <br /><br />
    ANA - Agência Nacional de Águas<br />
    <a href="http://www.ana.gov.br" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>http://www.ana.gov.br</a>
    <br /><br />
    Ciência Hoje - Rios da Amazônia liberam o triplo de CO2 estimado<br />
    <a href="http://cienciahoje.uol.com.br/controlPanel/materia/view/2416" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>http://cienciahoje.uol.com.br/controlPanel/materia/view/2416</a>
    <br /><br />
    CLIME - "Climate and Lake Impacts in Europe"<br />
    <a href="http://clime.tkk.fi" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>http://clime.tkk.fi</a>
    <br /><br />
    Hydrovision Conference 2008<br />
    <a href="http://www.hcipub.com/hydrovision/index.asp" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>http://www.hcipub.com/hydrovision/index.asp</a>
    <br /><br />
    Intergovernmental Panel on Climate Change (IPCC)<br />
    <a href="http://www.ipcc.ch" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>http://www.ipcc.ch</a>
    <br /><br />
    International Hydropower Association<br />
    <a href="http://www.hydropower.org" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>http://www.hydropower.org</a>
    <br /><br />
    NUPEM/UFRJ - Núcleo de Pesquisas Ecológicas de Macaé<br />
    <a href="http://www.nupem.biologia.ufrj.br" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>http://www.nupem.biologia.ufrj.br</a>
    <br /><br />
    Perfil dos pesquisadores do IIEGA<br />
    <a href="http://www.iie.com.br/biota.htm" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>http://www.iie.com.br/biota.htm</a>
    <br /><br />
    Programa HIDRO - Processos da Hidrosfera<br />
    <a href="http://www.dsr.inpe.br/dsr/grupos/hidrosfera/" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>http://www.dsr.inpe.br/dsr/grupos/hidrosfera/</a>
    <br /><br />
    WebFurnas Inovação P&D (Innovation P&D) Ciclo 2001/2002<br />
    <a href="http://www.furnas.com.br/inovacao_ped_0102_46.asp" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>http://www.furnas.com.br/inovacao_ped_0102_46.asp</a> </p> </div>);

  const ModalAcessarDados = (<div> <h2 style={modalStyles.h2}>Coordenação</h2> <ul style={modalStyles.ul}> <li style={modalStyles.li}> <a href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do;jsessionid=842A1992F42E2E4961C52F3F79EF3AE4.buscatextual_0" target="_blank" rel="noopener noreferrer" style={modalStyles.a}> José Luiz Stech (stech@dsr.inpe.br) </a> </li> {/* ... (etc) ... */} </ul> </div>);


  // --- FIM DO CONTEÚDO DOS MODAIS ---





  return (

    <>

      {/* SEU CÓDIGO DO CABEÇALHO (NAV) */}

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



      {/* --- CONTEÚDO PRINCIPAL --- */}

      <main className={styles.contentArea}>



        {/* Título da Página (Estrutura do furnas) */}

        <header className={styles.pageHeader}>

          <div className={styles.headerLogoLeft}>

            <img src={logofurnas} alt="Logo Projeto furnas" />

          </div>

          <h1>O Balanço de Carbono nos Reservatórios<br />de FURNAS Centrais Elétricas S.A.</h1>

          <div className={styles.headerLogoRight}>

            <Link to="/sima" aria-label="Ir para a página SIMA">

              <img className={styles.headerLogoRight1} src={logoSima} alt="Logo SIMA" />

            </Link>

            <Link to="/furnas" aria-label="Ir para a página FURNAS">

              <img className={styles.headerLogoRight2} src={logoFurnas} alt='Logo Furnas' />

            </Link>

          </div>

        </header>



        {/* --- CONTEÚDO DOS CARDS ADICIONADO DA SIMAPAGE --- */}

        {/* (Note que eu removi os títulos "SIMA" e "Sistema Integrado...") */}



        {/* Container dos 8 cards principais - ORDEM CORRIGIDA */}

        <div className={`${styles.cardContainerSupremo}`}>

          <div className={`${styles.cardContainer} ${styles.eightCardGrid}`}>

            {/* Linha 1 */}

            <ClickableCard
             title="Objetivos Gerais" 
            iconSrc={iconObjetivos} 
            modalContent={ModalObjetivosGerais} 
            /> 
            
            <ClickableCard 
            title="Introdução" 
            iconSrc={iconIntroducao} 
            modalContent={ModalIntroducao} 
            /> 
            
            <ClickableCard 
            title="Metodologia" 
            iconSrc={iconMetodologia} 
            modalContent={ModalMetodologia} 
            /> 
            
            <ClickableCard 
            title="Resultados Esperados" 
            iconSrc={iconResultados} 
            modalContent={ModalResultadosEsperados} 
            />
            
             {/* Linha 2 */} 
             
             <ClickableCard 
             title="Panorama" 
             iconSrc={iconPanorama}  
             modalContent={ModalPanorama} 
             /> 
             
             <ClickableCard 
             title="Usinas Hidrelétricas" 
             iconSrc={iconUsinas} 
             modalContent={ModalUsinasHidreletricas} 
             /> 
             
             <ClickableCard 
             title="Pesquisas Correlatadas" 
             iconSrc={iconPesquisas} 
             modalContent={ModalPesquisasCorrelatadas} 
             /> 
             
             <ClickableCard 
             title="Links" 
             iconSrc={iconLinks} 
              modalContent={ModalLinks} 
              /> 
              </div>



              {/* Seção Inferior: Equipe + Logo */}

        <div className={styles.bottomSection}>

              {/* Container da Visualizar Dados */}

              <div className={styles.cardContainer2}>

                <h2 className={styles.containerTitle}>Visualizar Dados</h2>

                <div className={styles.teamCardGrid}>
                
                <Link 
                to="/visualizar-dados" className={styles.bigButton}> 
                <div className={styles.cardButton}>
                  <img 
                  src={logoBanco}
                  alt="Acessar Dados" 
                  className={styles.cardImage} 
                  /> 
                  </div> 
                </Link>

                </div>

              </div>
            </div>
          </div>
      </main>

    </>

  );

};