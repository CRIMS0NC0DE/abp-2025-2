import { Link, NavLink } from 'react-router-dom';

import styles from './Balcar.module.css';

import { useState } from 'react';



// --- Imports de furnas ---

import hidreletricasFurnas from '../../assets/hidreletricasFurnas.png';

import logoBalcar from '../../assets/LogoBalcar.png';

import logoCarbon from '../../assets/LogoCarbon.png';

import logoSima from '../../assets/LogoSIMA.png';

 import iconPortal from '../../assets/IconPortal.png';

 import iconFomento from '../../assets/IconFomento.png';

 import IconBasedados from '../../assets/IconBasedados.png';

 import iconResultados from '../../assets/IconDadosarmazenados.png';

 import iconCoordenacaogeral from '../../assets/IconCoordenacaogeral.png';

 import iconColetaseanalises from '../../assets/iconColetaseanalises.png';

 import iconCoordenacaoporinstituicao from '../../assets/iconCoordenacaoporinstituicao.png';

import iconMaisinformacoes from '../../assets/iconMaisinformacoes.png';

import logoVisualizargraficos from '../../assets/LogoVisualizargraficos.png';






// --- Imports ADICIONADOS da SIMAPAGE ---

import ClickableCard from '../../components/ClickableCard/ClickableCard';







export default function Balcar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);



  const mainNavLinks = [

    { label: 'Home', to: '/' },

    { label: 'Início', to: '/balcar' },

    { label: 'Banco de Dados', to: '/balcar-table' },

    { label: 'Publicações', to: '/publicacoesBalcar' },

    { label: 'SIMA', to: '/sima' },

    { label: 'FURNAS', to: '/furnas' },

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

  const ModalObjetivosGerais = (<div> <h2 style={modalStyles.h2}>Portal</h2> <p style={modalStyles.p}>
    Este portal constitui a interface de acesso aos dados do Projeto Balanço de Carbono nos Reservatórios de FURNAS Centrais Elétricas S.A. A base de dados é formada por coletas in situ de equipes que tinham como objetivo obter dados para:
    <br /><br />
    determinar as emissões de gases de efeito estufa: gás carbônico, metano e óxido nitroso, dos reservatórios das hidrelétricas;
    <br /><br />
    identificar as rotas do ciclo do carbono nesses reservatórios e os fatores ambientais envolvidos;
    <br /><br />
    avaliar a influência dos fatores morfológicos, morfométricos, biogeoquímicos e operacionais dos reservatórios na emissão de gases de efeito estufa;
    <br /><br />
    determinar o padrão de emissão existente, anteriormente à construção de reservatórios;
    <br /><br />
    elaborar um modelo espacial e temporal de emissão de gases para reservatórios implantados em ambientes de cerrado.
    <br /><br />
    A interface de acesso permite personalizar consultas aos dados para o download, visualização em tabelas dinâmicas e visualizar a distribuição espacial dos dados em mapa interativo do Google Maps.
  </p> </div>);

  const ModalIntroducao = (<div> <h2 style={modalStyles.h2}>Fomento</h2> 
    {/* Alterado para <p> pois o novo texto não é uma lista */}
    <p style={modalStyles.p}> 
    Os recursos utilizados para a coleta da base de dados foram fornecidos por FURNAS Centrais Elétricas S.A. no âmbito da lei 9.991/2000, que estabelece um investimento mínimo anual de 1% de seu lucro líquido, das companhias geradoras de eletricidade, em pesquisa e desenvolvimento no setor elétrico. 
    <br /><br />
    Os procedimentos para os projetos são determinados pela <a href="https://www.gov.br/aneel/pt-br" target="_blank" rel="noopener noreferrer" style={modalStyles.a}>Agência Nacional de Energia Elétrica (ANEEL)</a>. 
    </p> 
  </div>);

  const ModalMetodologia = (<div> <h2 style={modalStyles.h2}>Sobre a Base de Dados</h2> <div style={modalStyles.p}> 
    <p>A base de dados é formada pelos resultados de 79 campanhas realizadas pelas instituições participantes nos reservatórios listados abaixo. As datas compreendem o período de início e fim de cada campanha no reservatório. As datas de cada campanha podem variar de uma instituição para outra.</p>
    <p>Ao lado são listados os conjuntos de dados coletados por cada instituição.</p>
    <p>Os dados fornecidos por Furnas não são provenientes de campanhas.</p>
    
    <h4 style={modalStyles.h4}>Campanhas em Corumbá</h4>
    <ul style={{...modalStyles.ul, paddingLeft: '1.5rem'}}>
      <li style={modalStyles.li}><strong>IIE</strong>
        <ul style={{paddingLeft: '1.5rem', listStyleType: 'circle'}}>
          <li>Primeira: 16/11/2004 a 19/11/2004</li>
          <li>Segunda: 5/3/2005 a 17/3/2005</li>
          <li>Terceira: 21/8/2005 a 24/8/2005</li>
        </ul>
      </li>
      <li style={modalStyles.li}><strong>INPE</strong>
        <ul style={{paddingLeft: '1.5rem', listStyleType: 'circle'}}>
          <li>Segunda: 12/3/2005 a 19/3/2005</li>
          <li>Terceira: 23/8/2005 a 28/8/2005</li>
        </ul>
      </li>
      <li style={modalStyles.li}><strong>UFJF</strong>
        <ul style={{paddingLeft: '1.5rem', listStyleType: 'circle'}}>
          <li>Primeira: 16/11/2004 a 18/11/2004</li>
          <li>Segunda: 14/3/2005 a 17/3/2005</li>
          <li>Terceira: 20/8/2005 a 24/8/2005</li>
        </ul>
      </li>
      <li style={modalStyles.li}><strong>UFRJ</strong>
        <ul style={{paddingLeft: '1.5rem', listStyleType: 'circle'}}>
          <li>Primeira: 16/11/2004 a 21/11/2004</li>
          <li>Segunda: 14/3/2005 a 17/3/2005</li>
          <li>Terceira: 21/8/2005 a 24/8/2005</li>
        </ul>
      </li>
    </ul>

    <h4 style={modalStyles.h4}>Campanhas em Estreito</h4>
     <ul style={{...modalStyles.ul, paddingLeft: '1.5rem'}}>
      <li style={modalStyles.li}><strong>IIE</strong>
        <ul style={{paddingLeft: '1.5rem', listStyleType: 'circle'}}>
          <li>Primeira: 14/11/2005 a 15/11/2005</li>
          <li>Segunda: 28/3/2006 a 29/3/2006</li>
          <li>Terceira: 9/8/2006 a 11/8/2006</li>
        </ul>
      </li>
      <li style={modalStyles.li}><strong>UFJF</strong>
         <ul style={{paddingLeft: '1.5rem', listStyleType: 'circle'}}>
          <li>Primeira: 18/11/2005 a 18/11/2005</li>
          <li>Segunda: 8/4/2006 a 10/4/2006</li>
          <li>Terceira: 9/8/2006 a 10/8/2006</li>
        </ul>
      </li>
      <li style={modalStyles.li}><strong>UFRJ</strong>
         <ul style={{paddingLeft: '1.5rem', listStyleType: 'circle'}}>
          <li>Primeira: 14/11/2005 a 16/11/2005</li>
          <li>Segunda: 26/3/2006 a 28/3/2006</li>
          <li>Terceira: 10/8/2006 a 13/8/2006</li>
        </ul>
      </li>
    </ul>

    <h4 style={modalStyles.h4}>Campanhas em Funil</h4>
     <ul style={{...modalStyles.ul, paddingLeft: '1.5rem'}}>
      <li style={modalStyles.li}><strong>IIE</strong>
         <ul style={{paddingLeft: '1.5rem', listStyleType: 'circle'}}>
          <li>Primeira: 20/11/2006 a 28/11/2006</li>
          <li>Segunda: 26/3/2007 a 29/3/2007</li>
          <li>Terceira: 23/7/2007 a 26/7/2007</li>
        </ul>
      </li>
      <li style={modalStyles.li}><strong>UFRJ</strong>
         <ul style={{paddingLeft: '1.5rem', listStyleType: 'circle'}}>
          <li>Primeira: 20/11/2006 a 23/11/2006</li>
          <li>Segunda: 26/3/2007 a 29/3/2007</li>
          <li>Terceira: 23/7/2007 a 26/7/2007</li>
        </ul>
      </li>
    </ul>

    {/* ... (Adicione os outros reservatórios da mesma forma) ... */}

    <h4 style={modalStyles.h4}>Dados Coletados por Instituição</h4>

    <h5 style={{...modalStyles.h4, fontSize: '1.1rem'}}>Furnas</h5>
    <ul style={{...modalStyles.ul, paddingLeft: '1.5rem'}}>
      <li style={modalStyles.li}><strong>Dados de precipitação:</strong> 20683 coletas (Parâmetro: Precipitação)</li>
      <li style={modalStyles.li}><strong>Nível do reservatório:</strong> 8470 coletas (Parâmetros: Nível, Volume útil, etc.)</li>
    </ul>
    
    <h5 style={{...modalStyles.h4, fontSize: '1.1rem'}}>IIE</h5>
    <ul style={{...modalStyles.ul, paddingLeft: '1.5rem'}}>
      <li style={modalStyles.li}>Água e matéria orgânica no sedimento: 1283 coletas</li>
      <li style={modalStyles.li}>Concentração de gás na água: 1008 coletas</li>
      <li style={modalStyles.li}>Concentração de gás no sedimento: 3548 coletas</li>
      <li style={modalStyles.li}>Dados do Horiba: 21799 coletas</li>
      <li style={modalStyles.li}>Fluxo difusivo: 324 coletas</li>
      <li style={modalStyles.li}>Íons na água intersticial do sedimento: 1069 coletas</li>
      <li style={modalStyles.li}>Nutrientes no sedimento: 1233 coletas</li>
      <li style={modalStyles.li}>Variáveis físicas e químicas da água: 446 coletas</li>
    </ul>

    <h5 style={{...modalStyles.h4, fontSize: '1.1rem'}}>INPE</h5>
    <ul style={{...modalStyles.ul, paddingLeft: '1.5rem'}}>
      <li style={modalStyles.li}>Fluxo de bolhas: 297 coletas</li>
      <li style={modalStyles.li}>Fluxo difusivo (INPE): 380 coletas</li>
    </ul>
    
    <h5 style={{...modalStyles.h4, fontSize: '1.1rem'}}>UFJF</h5>
    <ul style={{...modalStyles.ul, paddingLeft: '1.5rem'}}>
       <li style={modalStyles.li}>Abióticos na coluna d'água: 120 coletas</li>
       <li style={modalStyles.li}>Abióticos na superfície: 238 coletas</li>
       <li style={modalStyles.li}>Bióticos na coluna d'água: 120 coletas</li>
       <li style={modalStyles.li}>Bióticos na superfície: 239 coletas</li>
       <li style={modalStyles.li}>Fluxos de carbono: 19 coletas</li>
       <li style={modalStyles.li}>Medidas de campo na coluna d'água: 131 coletas</li>
       <li style={modalStyles.li}>Medidas de campo na superfície: 238 coletas</li>
       <li style={modalStyles.li}>Parâmetros biológicos e físicos da água: 201 coletas</li>
    </ul>

    <h5 style={{...modalStyles.h4, fontSize: '1.1rem'}}>UFRJ</h5>
    <ul style={{...modalStyles.ul, paddingLeft: '1.5rem'}}>
      <li style={modalStyles.li}>Bolhas: 396 coletas</li>
      <li style={modalStyles.li}>Câmara solo: 82 coletas</li>
      <li style={modalStyles.li}>Carbono Total no sedimento: 301 coletas</li>
      <li style={modalStyles.li}>DC, DOC, POC, TOC, DIC e TC: 315 coletas</li>
      <li style={modalStyles.li}>Difusão: 654 coletas</li>
      <li style={modalStyles.li}>Dupla dessorção da água: 535 coletas</li>
      <li style={modalStyles.li}>Gases em bolhas: 20 coletas</li>
      <li style={modalStyles.li}>Parâmetros físicos e químicos: 1547 coletas</li>
    </ul>
  </div> </div>);

  const ModalResultadosEsperados = (<div> <h2 style={modalStyles.h2}>Dados Armazenados</h2> <div style={modalStyles.p}>
    <p>Os dados são formados por coletas realizadas em 79 campanhas com datas e localidades (reservatórios) distintos com o objetivo de coletar parâmetros na interface água-sedimento, coluna d’água e interface água-atmosfera. Mais detalhes sobre a base de dados podem ser encontrados em "descrição".</p>
    <p>Cada instituição participante tinha como objetivo estudar uma componente, e por consequência fazer leituras de parâmetros relacionados:</p>
    <ul style={modalStyles.ul}>
      <li style={modalStyles.li}><strong>IIE:</strong> estimativas de fluxos de gases de efeito estufa e das concentrações de carbono e nutrientes na interface água-sedimento;</li>
      <li style={modalStyles.li}><strong>INPE:</strong> fluxos de gases metano (CH4) e dióxido de carbono (CO2) na interface água-atmosfera;</li>
      <li style={modalStyles.li}><strong>UFJF:</strong> determinação da produção primária, metabolismo bacteriano e concentrações de nutrientes na coluna d’água;</li>
      <li style={modalStyles.li}><strong>UFRJ/COPPE:</strong> estimativa de fluxos de gases de efeito estufa na interface água-atmosfera e determinação do aporte e das taxas de sedimentação de carbono.</li>
    </ul>
  </div> </div>);

  const ModalPanorama = (<div> <h2 style={modalStyles.h2}>Coordenação Geral</h2> 
    <p style={modalStyles.p}>
      André Carlos Prates Cimbleris
    </p> 
  </div>);

  const ModalUsinasHidreletricas = (<div> <h2 style={modalStyles.h2}>Responsáveis pelas Coletas e Análises</h2> 
    <ul style={modalStyles.ul}>
      <li style={modalStyles.li}>Arcilan Trevenzoli Assireu (INPE)</li>
      <li style={modalStyles.li}>Bohdan Matvienko Sikar (UFRJ/COPPE)</li>
      <li style={modalStyles.li}>Corina Verónica Sidagis Galli (IIE)</li>
      <li style={modalStyles.li}>Ednaldo Oliveira dos Santos (UFRJ/COPPE)</li>
      <li style={modalStyles.li}>Elizabeth Matvienko Sikar (UFRJ/COPPE)</li>
      <li style={modalStyles.li}>Felipe Siqueira Pacheco (UFJF)</li>
      <li style={modalStyles.li}>Ivan Bergier Tavares de Lima (INPE)</li>
      <li style={modalStyles.li}>Luciano Marani (INPE)</li>
      <li style={modalStyles.li}>Nathan Oliveira Barros (UFJF)</li>
      <li style={modalStyles.li}>Plínio Carlos Alvalá (INPE)</li>
    </ul> 
  </div>);

  const ModalPesquisasCorrelatadas = (<div> <h2 style={modalStyles.h2}>Coordenação por Instituição</h2> 
    <ul style={modalStyles.ul}>
      <li style={modalStyles.li}><strong>IIE:</strong> Donato Seiji Abe</li>
      <li style={modalStyles.li}><strong>INPE:</strong> José Luiz Stech</li>
      <li style={modalStyles.li}><strong>UFJF:</strong> Fábio Roland</li>
      <li style={modalStyles.li}><strong>UFRJ/COPPE:</strong> Marco Aurélio dos Santos</li>
    </ul> 
  </div>);

  const ModalLinks = (<div> <h2 style={modalStyles.h2}>Mais Informações</h2> 
    <p style={modalStyles.p}>
      <strong>Gerente de Rede do Portal:</strong>
      <br />
      João Benedito Diehl
    </p>
    <p style={modalStyles.p}>
      <strong>Web e Banco de Dados:</strong>
      <br />
      Arley Ferreira de Souza (arley@dpi.inpe.br)
    </p>
  </div>);

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

            <img src={logoBalcar} alt="Logo Projeto balcar" />

          </div>

          <h1>
  <span className={styles.tituloAzul}>Dados da campanha</span>
  <br /><br />
  Projeto Balanço de Carbono nos Reservatórios de<br />
  FURNAS Centrais Elétricas S.A.
</h1>

          <div className={styles.headerLogoRight}>

            <Link to="/sima" aria-label="Ir para a página SIMA">

              <img className={styles.headerLogoRight1} src={logoSima} alt="Logo SIMA" />

            </Link>

            <Link to="/furnas" aria-label="Ir para a página FURNAS">

              <img src={logoCarbon} alt="Projeto Balanço de Carbono - Reservatórios de FURNAS" className={styles.headerLogoRight2} />


            </Link>

          </div>

        </header>



        {/* --- CONTEÚDO DOS CARDS ADICIONADO DA SIMAPAGE --- */}

        {/* (Note que eu removi os títulos "SIMA" e "Sistema Integrado...") */}



{/* Container dos 8 cards principais - ORDEM CORRIGIDA */}

   {/* Container principal com duas colunas: esquerda (dois blocos empilhados) e direita (visualizar dados) */}
<div className={styles.cardContainerSupremo}>
  

  {/* COLUNA ESQUERDA - dois blocos azuis empilhados */}
  <div className={styles.leftColumn}>

    {/* === PRIMEIRO BLOCO AZUL === */}
    <div className={styles.cardContainer}>
      <ClickableCard title="Portal" iconSrc={iconPortal} modalContent={ModalObjetivosGerais} />
      <ClickableCard title="Fomento" iconSrc={iconFomento} modalContent={ModalIntroducao} />
      <ClickableCard title="Base de Dados" iconSrc={IconBasedados} modalContent={ModalMetodologia} />
      <ClickableCard title="Dados Armazenados" iconSrc={iconResultados} modalContent={ModalResultadosEsperados} />
    </div>

    {/* === SEGUNDO BLOCO AZUL === */}
{/* === SEGUNDO BLOCO AZUL === */}
<div className={styles.cardContainer}>
  <h2 className={styles.cardTitle}>Equipe</h2>

  <ClickableCard
    title="Coordenação Geral"
    iconSrc={iconCoordenacaogeral}
    modalContent={ModalPanorama}
  />
<ClickableCard
  title="Time Coletas e Análises"
  iconSrc={iconColetaseanalises}
  modalContent={ModalUsinasHidreletricas}
  className={styles.cardColetasAnalises}
/>

  <ClickableCard
    title=" Instituições"
    iconSrc={iconCoordenacaoporinstituicao}
    modalContent={ModalPesquisasCorrelatadas}
  />
  <ClickableCard
    title="+ Informações"
    iconSrc={iconMaisinformacoes}
    modalContent={ModalLinks}
  />
</div>

  </div> {/* fim leftColumn */}

  {/* COLUNA DIREITA - painel grande "Visualizar Dados" */}
<div className={styles.rightColumn}>
  <div className={styles.cardContainer2}>
    <Link  to="/balcar-table">
    <button className={styles.cardButton} type="button">
      <img
        src={logoVisualizargraficos}
        alt="Visualizar Dados"
        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
      />
    </button>
    </Link>
    <p className={styles.visualizarGraficos}>Visualizar Gráficos</p>
  </div>
</div>


</div>



      </main>

    </>
  );
};