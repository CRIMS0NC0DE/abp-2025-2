import styles from './SimaPage.module.css';
import ClickableCard from '../../components/ClickableCard/ClickableCard';
import QuickNav from '../../components/QuickNav/QuickNav'; // Importa o novo componente

// Importando ícones
import simaIcon from '../../assets/sima-icon.png';
import mapIcon from '../../assets/map-icon.png';
import tableIcon from '../../assets/table-icon.png';
// import downloadIcon from '../../assets/download-logo_card.png'; // Descomente se for usar
import logoInpe from '../../assets/LogoInpe.png';

// --- Estilos para o conteúdo dos Modais ---
const modalStyles = {
  h2: {
    marginBottom: '1rem',
    color: '#333',
  },
  p: {
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  ul: {
    listStyleType: 'disc',
    paddingLeft: '2rem',
    marginBottom: '1rem',
  },
  li: {
    marginBottom: '0.75rem',
    lineHeight: '1.5',
  },
  a: {
    color: '#0056b3',
    textDecoration: 'none',
  },
  h4: {
    marginTop: '1.5rem',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#555',
  },
};

// --- Conteúdo Falso para os Modais ---

const ModalSobre = (
  <div>
    <h2 style={modalStyles.h2}>Sobre o SIMA</h2>
    <p style={modalStyles.p}>
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
    <h2 style={modalStyles.h2}>Motivação do SIMA</h2>
    <ul style={modalStyles.ul}>
      <li style={modalStyles.li}>
        Sistemas aquáticos são muito dinâmicos, ou seja, podem sofrer mudanças
        significativas em questão de horas;
      </li>
      <li style={modalStyles.li}>
        Complexa e cara a logística necessária para amostrar adequadamente os
        sistemas aquáticos em estudo;
      </li>
      <li style={modalStyles.li}>
        Necessidade de dados em tempo real para a tomada de decisões.
      </li>
    </ul>
  </div>
);

const ModalEstrutura = (
  <div>
    <h2 style={modalStyles.h2}>Estrutura do SIMA</h2>
    <p style={modalStyles.p}>
      O SIMA é formado por uma plataforma que em alguns modelos pode ser uma bóia
      toroidal (foto abaixo e a esquerda) ou uma estrutura maior (foto abaixo e a
      direita). No centro da plataforma existe uma torre onde são afixados os
      painéis solares, sensores meteorológicos e antena. No vão central um
      compartimento abriga a eletrônica do sistema, baterias e transmissor de
      satélite. Os sensores submersos são conectados a eletrônica por cabos.
    </p>
    {/* TODO: Adicionar as fotos mencionadas quando disponíveis */}
  </div>
);

const ModalFuncionamento = (
  <div>
    <h2 style={modalStyles.h2}>Modo de Funcionamento</h2>
    <ul style={modalStyles.ul}>
      <li style={modalStyles.li}>
        <strong>Coleta e transmissão dos dados:</strong> circuitos analógicas e
        digitais são responsáveis por comandar o conjunto de sensores, variáveis
        de engenharia e ativar o transmissor de satélite;
      </li>
      <li style={modalStyles.li}>
        <strong>Amostragem:</strong> a cada hora cheia um novo conjunto completo
        de dados é armazenado em um buffer de memória. Após enchimento dos oito
        buffers, o conjunto mais antigo é descartado;
      </li>
      <li style={modalStyles.li}>
        <strong>Esquema de transmissão:</strong> a cada 90 segundos, um dos oito
        buffers é transmitido em esquema de carrossel. A transmissão é executada
        independente de existir satélite para receber os dados;
      </li>
      <li style={modalStyles.li}>
        <strong>Recepção dos dados:</strong> as unidades do INPE de Cuiabá - MT e
        Alcântara - MA recebem os dados dos satélites e em seguida transmitem
        para a unidade de Natal - RN, onde os dados são processados para filtrar
        falhas na transmissão e para posterior envio para a DSR (Divisão de
        Sensoriamento Remoto) do INPE de São José dos Campos - SP, onde os dados
        são decodificados, processados e armazenados;
      </li>
      <li style={modalStyles.li}>
        <strong>Distribuição dos dados:</strong> este portal é usado para a
        consulta e visualização dos dados armazenados;
      </li>
      <li style={modalStyles.li}>
        <strong>Armazenamento interno:</strong> alguns SIMAs possuem a capacidade
        de armazenar as coletas para posterior download por um técnico in situ, ou
        seja, estes dados não são transmitidos por satélite. Neste caso as
        coletas são realizadas a cada 10 minutos.
      </li>
    </ul>
  </div>
);

// NOVO MODAL (Placeholder)
const ModalDadosColetados = (
  <div>
    <h2 style={modalStyles.h2}>Dados Coletados</h2>
    <p style={modalStyles.p}>
      Informações sobre os tipos de dados coletados pelas boias do SIMA.
      (Conteúdo a ser adicionado).
    </p>
  </div>
);

const ModalHistoria = (
  <div>
    <h2 style={modalStyles.h2}>História</h2>
    <p style={modalStyles.p}>
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
    <h2 style={modalStyles.h2}>Problemas</h2>
    <ul style={modalStyles.ul}>
      <li style={modalStyles.li}>
        <strong>Sensores:</strong> por características específicas de alguns
        ambientes aquáticos, os sensores podem se degradar rapidamente, tornando
        os dados inválidos. Veja como exemplo a foto abaixo tirada da sonda do
        SIMA fundeado no reservatório de Funil, no momento de uma atividade de
        calibração;
      </li>
      <li style={modalStyles.li}>
        <strong>Satélite:</strong> o SIMA faz uma leitura de parâmetros a cada
        hora, ou seja, 24 leituras por dia. Acontece que nem sempre são recebidas
        todas as leituras, pois o sistema necessita de satélites para completar a
        transmissão e por questão de posicionamento da constelação de satélites,
        algumas localities terrestres não são atendidas com a frequência
        necessária para completar todas as transmissões.
      </li>
    </ul>
    {/* TODO: Adicionar foto mencionada */}
  </div>
);

// NOVO MODAL (Placeholder)
const ModalMapaInterativo = (
  <div>
    <h2 style={modalStyles.h2}>Mapa Interativo</h2>
    <p style={modalStyles.p}>
      Esta seção apresenta o mapa interativo com a localização das boias e
      acesso aos dados.
    </p>
    <p style={modalStyles.p}>
      Você também pode acessar o mapa diretamente clicando no ícone "Mapa
      Interativo" no canto superior direito da página.
    </p>
  </div>
);

const ModalApoio = (
  <div>
    <h2 style={modalStyles.h2}>Apoio</h2>
    <p style={modalStyles.p}>
      Ao longo da existência deste sistema, os recursos para a aquisição e
      manutenção dos sistemas de coletas e recursos computacionais foram
      fornecidos pelas seguintes instituições:
    </p>
    <ul style={modalStyles.ul}>
      <li style={modalStyles.li}>
        <a
          href="https://www.cepel.br/"
          target="_blank"
          rel="noopener noreferrer"
          style={modalStyles.a}
        >
          CEPEL - Centro de Pesquisas de Energia Elétrica
        </a>
      </li>
      <li style={modalStyles.li}>
        <a
          href="http://www.chesf.gov.br/"
          target="_blank"
          rel="noopener noreferrer"
          style={modalStyles.a}
        >
          Chesf - Companhia Hidro Elétrica do São Francisco
        </a>
      </li>
      <li style={modalStyles.li}>
        <a
          href="https://www.gov.br/cnpq/pt-br"
          target="_blank"
          rel="noopener noreferrer"
          style={modalStyles.a}
        >
          CNPq - Conselho Nacional de Desenvolvimento Científico e Tecnológico
        </a>
      </li>
      <li style={modalStyles.li}>
        <a
          href="http://www.eln.gov.br/"
          target="_blank"
          rel="noopener noreferrer"
          style={modalStyles.a}
        >
          Eletronorte - Centrais Elétricas do Norte do Brasil
        </a>
      </li>
      <li style={modalStyles.li}>
        <a
          href="https://fapesp.br/"
          target="_blank"
          rel="noopener noreferrer"
          style={modalStyles.a}
        >
          FAPESP - Fundação de Amparo à Pesquisa do Estado de São Paulo
        </a>
      </li>
      <li style={modalStyles.li}>
        <a
          href="https://www.furnas.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          style={modalStyles.a}
        >
          Furnas Centrais Elétricas
        </a>
      </li>
    </ul>
  </div>
);

const ModalMaisInformacoes = (
  <div>
    <h2 style={modalStyles.h2}>Mais informações</h2>
    <p style={modalStyles.p}>
      (Conteúdo para "Mais Informações" a ser adicionado aqui.)
    </p>
  </div>
);

const ModalCoordenacao = (
  <div>
    <h2 style={modalStyles.h2}>Coordenação</h2>
    <ul style={modalStyles.ul}>
      <li style={modalStyles.li}>
        <a
          href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do;jsessionid=842A1992F42E2E4961C52F3F79EF3AE4.buscatextual_0"
          target="_blank"
          rel="noopener noreferrer"
          style={modalStyles.a}
        >
          José Luiz Stech (stech@dsr.inpe.br)
        </a>
      </li>
      <li style={modalStyles.li}>
        <a
          href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do"
          target="_blank"
          rel="noopener noreferrer"
          style={modalStyles.a}
        >
          Enner Herenio de Alcântara
        </a>
      </li>
    </ul>
  </div>
);

const ModalColaboradores = (
  <div>
    <h2 style={modalStyles.h2}>Colaboradores</h2>
    <ul style={modalStyles.ul}>
      <li style={modalStyles.li}>
        <a
          href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4786906P3"
          target="_blank"
          rel="noopener noreferrer"
          style={modalStyles.a}
        >
          André Carlos Prates Cimbleris
        </a>
      </li>
      {/* ... (restante dos colaboradores) ... */}
      <li style={modalStyles.li}>
        <a
          href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4795537Y9"
          target="_blank"
          rel="noopener noreferrer"
          style={modalStyles.a}
        >
          Arcilan Trevenzoli Assireu
        </a>
      </li>
      {/* ... (etc) ... */}
    </ul>
    {/* ... (restante do modal colaboradores) ... */}
  </div>
);

// --- Componente da Página ---

function SimaPage() {
  return (
    // Adicionado position: relative para ancorar o QuickNav
    <div className={styles.simaPageContainer}> 
      {/* QuickNav adicionado aqui. O CSS o posicionará. */}
      <QuickNav />

      <h1 className={styles.simaTitle}>SIMA</h1>
      {/* Subtítulo adicionado conforme solicitado */}
      <h2 className={styles.simaSubtitle}>
        Sistema Integrado de Monitoramento Ambiental
      </h2>

      {/* Container dos 8 cards principais - ORDEM CORRIGIDA */}
      <div className={`${styles.cardContainer} ${styles.eightCardGrid}`}>
        {/* Linha 1 */}
        <ClickableCard
          title="Sobre o SIMA"
          iconSrc={simaIcon}
          modalContent={ModalSobre}
        />
        <ClickableCard
          title="Motivação"
          iconSrc={simaIcon} // Trocar ícone se desejar
          modalContent={ModalMotivacao}
        />
        <ClickableCard
          title="Estrutura"
          iconSrc={simaIcon} // Trocar ícone se desejar
          modalContent={ModalEstrutura}
        />
        <ClickableCard
          title="Funcionamento"
          iconSrc={simaIcon} // Trocar ícone se desejar
          modalContent={ModalFuncionamento}
        />
        {/* Linha 2 */}
        <ClickableCard
          title="Dados Coletados"
          iconSrc={tableIcon} // Ícone de tabela
          modalContent={ModalDadosColetados}
        />
        <ClickableCard
          title="História"
          iconSrc={simaIcon} // Trocar ícone se desejar
          modalContent={ModalHistoria}
        />
        <ClickableCard
          title="Problemas"
          iconSrc={simaIcon} // Trocar ícone se desejar
          modalContent={ModalProblemas}
        />
        <ClickableCard
          title="Mapa Interativo"
          iconSrc={mapIcon} // Ícone de mapa
          modalContent={ModalMapaInterativo}
        />
      </div>

      {/* O container .navButtonContainer foi REMOVIDO מכאן */}

      {/* Seção Inferior: Equipe + Logo */}
      <div className={styles.bottomSection}>
        {/* Container da Equipe */}
        <div className={styles.cardContainer}>
          <h2 className={styles.containerTitle}>Equipe</h2>
          {/* ORDEM CORRIGIDA: +Informações e Apoio movidos para cá */}
          <div className={styles.teamCardGrid}>
            {/* Linha 1 */}
            <ClickableCard
              title="Coordenação"
              iconSrc={simaIcon} // Trocar ícone
              modalContent={ModalCoordenacao}
            />
            <ClickableCard
              title="Colaboradores"
              iconSrc={simaIcon} // Trocar ícone
              modalContent={ModalColaboradores}
            />
            {/* Linha 2 */}
            <ClickableCard
              title="+ Informações"
              iconSrc={simaIcon} // Trocar ícone
              modalContent={ModalMaisInformacoes}
            />
            <ClickableCard
              title="Apoio"
              iconSrc={simaIcon} // Trocar ícone
              modalContent={ModalApoio}
            />
          </div>
        </div>

        {/* Container da Imagem */}
        <div className={styles.bottomImageContainer}>
          <img
            src={logoInpe}
            alt="Logo Instituição"
            className={styles.bottomImage}
          />
        </div>
      </div>
    </div>
  );
}

export default SimaPage;