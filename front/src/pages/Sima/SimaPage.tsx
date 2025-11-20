import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './SimaPage.module.css';
import ClickableCard from '../../components/ClickableCard/ClickableCard';
import cardStyles from '../../components/ClickableCard/ClickableCard.module.css';

// ASSETS DOS CARDS
import sobreSima from '../../assets/sobre_o_sima.png';
import motivacao from '../../assets/motivacao.png';
import estrutura from '../../assets/estrutura.png';
import funcionamento from '../../assets/funcionamento.png';
import dados_coletados from '../../assets/dados_coletados.png';
import historia from '../../assets/historia.png';
import problemas from '../../assets/problemas.png';
import mapainterativo from '../../assets/mapa_interativo.png';
import coordenacao from '../../assets/coordenacao.png';
import colaboradores from '../../assets/colaboradores.png';
import mais_info from '../../assets/mais_informacoes.png';
import apoio from '../../assets/apoio.png';
import img_boia from '../../assets/boia_metocean.png';

// ASSETS DO NOVO HEADER
import logoSIMA from '../../assets/LogoSIMA.png';
import logoBalcar from '../../assets/LogoBalcar.png';
import logoFurnas from '../../assets/LogoFurnas.png';

// --- Definição dos Modais usando classes CSS (Clean Code) ---

const ModalSobre = (
  <div>
    <h2 className={styles.modalTitle}>Sobre o SIMA</h2>
    <p className={styles.modalText}>
      O SIMA (Sistema Integrado de Monitoramento Ambiental) é um conjunto de
      hardware e software desenhado para a coleta de dados e o monitoramento em
      tempo real de processos da hidrosfera. Para a coleta dos dados, o SIMA faz
      uso de um sistema autônomo fundeado, onde são instalados sensores,
      eletrônica de armazenamento, bateria e antena de transmissão. Os dados
      coletados em intervalo de tempo pré-programado são transmitidos via
      satélite e também armazenados na estação de coleta, sendo que os dados
      armazenados são aqueles obtidos com maior frequência. Este portal permite o
      acesso aos dados transmitidos por satélite poucas horas após a coleta. A
      associação destas componentes fornece uma poderosa ferramenta que pode ser
      empregada no gerenciamento e controle ambiental de recursos hídricos.
    </p>
  </div>
);

const ModalMotivacao = (
  <div>
    <h2 className={styles.modalTitle}>Motivação do SIMA</h2>
    <ul className={styles.modalList}>
      <li className={styles.modalListItem}>
        Sistemas aquáticos são muito dinâmicos, ou seja, podem sofrer mudanças
        significativas em questão de horas;
      </li>
      <li className={styles.modalListItem}>
        Complexa e cara a logística necessária para amostrar adequadamente os
        sistemas aquáticos em estudo;
      </li>
      <li className={styles.modalListItem}>
        Necessidade de dados em tempo real para a tomada de decisões.
      </li>
    </ul>
  </div>
);

const ModalEstrutura = (
  <div>
    <h2 className={styles.modalTitle}>Estrutura do SIMA</h2>
    <p className={styles.modalText}>
      O SIMA é formado por uma plataforma que em alguns modelos pode ser uma bóia
      toroidal (foto abaixo e a esquerda) ou uma estrutura maior (foto abaixo e a
      direita). No centro da plataforma existe uma torre onde são afixados os
      painéis solares, sensores meteorológicos e antena. No vão central um
      compartimento abriga a eletrônica do sistema, baterias e transmissor de
      satélite. Os sensores submersos são conectados a eletrônica por cabos.
    </p>
  </div>
);

const ModalFuncionamento = (
  <div>
    <h2 className={styles.modalTitle}>Modo de Funcionamento</h2>
    <ul className={styles.modalList}>
      <li className={styles.modalListItem}>
        <strong>Coleta e transmissão dos dados:</strong> circuitos analógicas e
        digitais são responsáveis por comandar o conjunto de sensores, variáveis
        de engenharia e ativar o transmissor de satélite;
      </li>
      <li className={styles.modalListItem}>
        <strong>Amostragem:</strong> a cada hora cheia um novo conjunto completo
        de dados é armazenado em um buffer de memória. Após enchimento dos oito
        buffers, o conjunto mais antigo é descartado;
      </li>
      <li className={styles.modalListItem}>
        <strong>Esquema de transmissão:</strong> a cada 90 segundos, um dos oito
        buffers é transmitido em esquema de carrossel. A transmissão é executada
        independente de existir satélite para receber os dados;
      </li>
      <li className={styles.modalListItem}>
        <strong>Recepção dos dados:</strong> as unidades do INPE de Cuiabá - MT e
        Alcântara - MA recebem os dados dos satélites e em seguida transmitem
        para a unidade de Natal - RN, onde os dados são processados para filtrar
        falhas na transmissão e para posterior envio para a DSR (Divisão de
        Sensoriamento Remoto) do INPE de São José dos Campos - SP, onde os dados
        são decodificados, processados e armazenados;
      </li>
      <li className={styles.modalListItem}>
        <strong>Distribuição dos dados:</strong> este portal é usado para a
        consulta e visualização dos dados armazenados;
      </li>
      <li className={styles.modalListItem}>
        <strong>Armazenamento interno:</strong> alguns SIMAs possuem a capacidade
        de armazenar as coletas para posterior download por um técnico in situ, ou
        seja, estes dados não são transmitidos por satélite. Neste caso as
        coletas são realizadas a cada 10 minutos.
      </li>
    </ul>
  </div>
);

const ModalDadosColetados = (
  <div>
    <h2 className={styles.modalTitle}>Dados Coletados</h2>
    <p className={styles.modalText}>
      O SIMA coleta algumas variáveis ambientais a partir de sensores colocados acima da linha d´água (temperatura do ar, pressão atmosférica, direção e intensidade de ventos, radiação solar incidente e refletida) e abaixo da linha d´água (amônia, nitrato, clorofila, condutividade, direção e intensidade da corrente, oxigênio dissolvido, pH e temperatura em diferentes profundidades).
    </p>
  </div>
);

const ModalHistoria = (
  <div>
    <h2 className={styles.modalTitle}>História</h2>
    <p className={styles.modalText}>
      O SIMA foi desenvolvido em uma parceria entre a Universidade do Vale do
      Paraíba e o INPE. A partir de 1995, o projeto foi transferido para a Neuron
      Engenharia Ltda. Através de uma parceria com a Diretoria de Hidrografia e
      Navegação (DHN) a Neuron construiu um protótipo do SIMA, que ficou
      fundeado em águas do litoral do Rio de Janeiro durante um ano e os dados
      coletados foram disponibilizados pelo Programa Nacional de Bóia. Os dados
      coletados neste período foram comparados com dados in situ, o que
      confirmou o bom desempenho do sistema.
    </p>
  </div>
);

const ModalProblemas = (
  <div>
    <h2 className={styles.modalTitle}>Problemas</h2>
    <ul className={styles.modalList}>
      <li className={styles.modalListItem}>
        <strong>Sensores:</strong> por características específicas de alguns
        ambientes aquáticos, os sensores podem se degradar rapidamente, tornando
        os dados inválidos. Veja como exemplo a foto abaixo tirada da sonda do
        SIMA fundeado no reservatório de Funil, no momento de uma atividade de
        calibração;
      </li>
      <li className={styles.modalListItem}>
        <strong>Satélite:</strong> o SIMA faz uma leitura de parâmetros a cada
        hora, ou seja, 24 leituras por dia. Acontece que nem sempre são recebidas
        todas as leituras, pois o sistema necessita de satélites para completar a
        transmissão e por questão de posicionamento da constelação de satélites,
        algumas localities terrestres não são atendidas com a frequência
        necessária para completar todas as transmissões.
      </li>
    </ul>
  </div>
);

const ModalApoio = (
  <div>
    <h2 className={styles.modalTitle}>Apoio</h2>
    <p className={styles.modalText}>
      Ao longo da existência deste sistema, os recursos para a aquisição e
      manutenção dos sistemas de coletas e recursos computacionais foram
      fornecidos pelas seguintes instituições:
    </p>
    <ul className={styles.modalList}>
      <li className={styles.modalListItem}>
        <a
          href="https.www.cepel.br/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.modalLink}
        >
          CEPEL - Centro de Pesquisas de Energia Elétrica
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a
          href="http://www.chesf.gov.br/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.modalLink}
        >
          Chesf - Companhia Hidro Elétrica do São Francisco
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a
          href="https.www.gov.br/cnpq/pt-br"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.modalLink}
        >
          CNPq - Conselho Nacional de Desenvolvimento Científico e Tecnológico
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a
          href="http://www.eln.gov.br/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.modalLink}
        >
          Eletronorte - Centrais Elétricas do Norte do Brasil
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a
          href="httpsfapesp.br/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.modalLink}
        >
          FAPESP - Fundação de Amparo à Pesquisa do Estado de São Paulo
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a
          href="httpsf:www.furnas.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.modalLink}
        >
          Furnas Centrais Elétricas
        </a>
      </li>
    </ul>
  </div>
);

const ModalMaisInformacoes = (
  <div>
    <h2 className={styles.modalTitle}>Mais informações</h2>
    <p className={styles.modalText}>
      (Conteúdo para "Mais Informações" a ser adicionado aqui.)
    </p>
  </div>
);

const ModalCoordenacao = (
  <div>
    <h2 className={styles.modalTitle}>Coordenação</h2>
    <ul className={styles.modalList}>
      <li className={styles.modalListItem}>
        <a
          href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4787880H6"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.modalLink}
        >
          José Luiz Stech (stech@dsr.inpe.br)
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a
          href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4772022Y1"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.modalLink}
        >
          Enner Herenio de Alcântara
        </a>
      </li>
    </ul>
  </div>
);

const ModalColaboradores = (
  <div>
    <h2 className={styles.modalTitle}>Colaboradores</h2>
    <ul className={styles.modalList}>
      <li className={styles.modalListItem}>
        <a
          href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4786906P3"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.modalLink}
        >
          André Carlos Prates Cimbleris
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a
          href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4795537Y9"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.modalLink}
        >
          Arcilan Trevenzoli Assireu
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a 
          href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4721643Y6"
          className={styles.modalLink}
        >
          Artur Luiz da Costa da Silva
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4704147D6"
           className={styles.modalLink}
        >
          Augusto Cesar Fonseca Saraiva
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4707693Y5"
           className={styles.modalLink}
        >
          Cláudio Clemente Faria Barbosa
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4796947P1"
           className={styles.modalLink}
        >
          Donato Seiji Abe
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4787271Z9"
           className={styles.modalLink}
        >
          Evlyn Márcia Leão de Moraes Novo
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4784185Z0"
           className={styles.modalLink}
        >
          Fábio Roland
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4781542Z8"
           className={styles.modalLink}
        >
          João Antônio Lorenzzetti
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a href="Jorge Machado Damazio"
           className={styles.modalLink}
        >
          Jorge Machado Damazio
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4785602H9"
           className={styles.modalLink}
        >
          Marco Aurélio dos Santos
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4786780Y3"
           className={styles.modalLink}
        >
          Maria Elvira Piñeiro Maceira
        </a>
      </li>
      <li className={styles.modalListItem}>
        <a href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4781646H4"
           className={styles.modalLink}
        >
          Nelson Luís da Costa Dias
        </a>
      </li>
    </ul>
  </div>
);

function SimaPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const mainNavLinks = [
    { label: 'Home', to: '/' },
    { label: 'Início', to: '/sima' },
    { label: 'Banco de Dados', to: '/mapa' },
    { label: 'Publicações', to: '/publicacoesSima' },
    { label: 'BALCAR', to: '/balcar' },
    { label: 'FURNAS', to: '/furnas' },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className={styles.subHead}>
        <button
          className={`${styles.hamburgerButton} ${
            isMenuOpen ? styles.open : ''
          }`}
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          className={`${styles.mainNav} ${isMenuOpen ? styles.menuOpen : ''}`}
        >
          <ul>
            {mainNavLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => (isActive ? styles.active : '')}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.simaPageContainer}>
        
      <header className={styles.pageHeader}>
        <div className={styles.titleContainer}>
          <img
            src={logoSIMA}
            alt="Logo SIMA"
            className={styles.simaTitleImage}
          />
          <h2 className={styles.simaSubtitle}>
            Sistema Integrado de Monitoramento Ambiental
          </h2>
        </div>

        <div className={styles.headerLogoRight}>
          <Link to="/balcar" aria-label="Ir para a página BALCAR">
            <img
              src={logoBalcar}
              alt="Logo Balcar"
              className={styles.sideLogo}
            />
          </Link>
          <Link to="/furnas" aria-label="Ir para a página FURNAS">
            <img
              src={logoFurnas}
              alt="Logo Furnas"
              className={styles.sideLogo}
            />
          </Link>
        </div>
      </header>

      <div className={`${styles.cardContainer} ${styles.eightCardGrid}`}>
        <ClickableCard
          title="Sobre o SIMA"
          iconSrc={sobreSima}
          modalContent={ModalSobre}
        />
        <ClickableCard
          title="Motivação"
          iconSrc={motivacao}
          modalContent={ModalMotivacao}
        />
        <ClickableCard
          title="Estrutura"
          iconSrc={estrutura}
          modalContent={ModalEstrutura}
        />
        <ClickableCard
          title="Funcionamento"
          iconSrc={funcionamento}
          modalContent={ModalFuncionamento}
        />
        <ClickableCard
          title="Dados Coletados"
          iconSrc={dados_coletados}
          modalContent={ModalDadosColetados}
        />
        <ClickableCard
          title="História"
          iconSrc={historia}
          modalContent={ModalHistoria}
        />
        <ClickableCard
          title="Problemas"
          iconSrc={problemas}
          modalContent={ModalProblemas}
        />
        {/* Refatorado para usar componente Link do react-router-dom */}
        <Link
          to="/sima/consulta"
          className={`${cardStyles.card} ${styles.cardLink}`}
        >
          <img src={mapainterativo} alt="Mapa Interativo" className={cardStyles.icon} />
          <h3 className={cardStyles.title}>Consultar Dados</h3>
        </Link>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.cardContainer}>
          <h2 className={styles.containerTitle}>Equipe</h2>
          <div className={styles.teamCardGrid}>
            <ClickableCard
              title="Coordenação"
              iconSrc={coordenacao}
              modalContent={ModalCoordenacao}
            />
            <ClickableCard
              title="Colaboradores"
              iconSrc={colaboradores}
              modalContent={ModalColaboradores}
            />
            <ClickableCard
              title="+ Informações"
              iconSrc={mais_info}
              modalContent={ModalMaisInformacoes}
            />
            <ClickableCard
              title="Apoio"
              iconSrc={apoio}
              modalContent={ModalApoio}
            />
          </div>
        </div>

        <div className={styles.bottomImageContainer}>
          <img
            src={img_boia}
            alt="Bóia metocean"
            className={styles.bottomImage}
          />
        </div>
      </div>
    </div>
    </> 
  );
}

export default SimaPage;