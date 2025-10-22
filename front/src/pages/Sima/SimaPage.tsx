import styles from './SimaPage.module.css'
import ClickableCard from '../../components/ClickableCard/ClickableCard'
import { Link } from 'react-router-dom' // Para os botões de navegação

// Importando ícones temporários (você pode trocar depois)
import simaIcon from '../../assets/sima-icon.png'
import mapIcon from '../../assets/map-icon.png'
import tableIcon from '../../assets/table-icon.png'
import downloadIcon from '../../assets/download-logo_card.png'
import logoInpe from '../../assets/LogoInpe.png'

// --- Estilos para o conteúdo dos Modais ---
// (Colocando aqui para facilitar a formatação dos textos)
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
}

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
)

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
)

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
)

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
)

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
)

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
)

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
)

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
)

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
      <li style={modalStyles.li}>
        <a
          href="http://buscatextual.cnpq.br/buscatextual/visualizacv.do?metodo=apresentar&id=K4721643Y6"
          target="_blank"
          rel="noopener noreferrer"
          style={modalStyles.a}
        >
          Artur Luiz da Costa da Silva
        </a>
      </li>
      <li style={modalStyles.li}>
        <a href="#" style={modalStyles.a}>
          Augusto Cesar Fonseca Saraiva
        </a>
      </li>
      <li style={modalStyles.li}>
        <a href="#" style={modalStyles.a}>
          Cláudio Clemente Faria Barbosa
        </a>
      </li>
      <li style={modalStyles.li}>
        <a href="#" style={modalStyles.a}>
          Donato Seiji Abe
        </a>
      </li>
      <li style={modalStyles.li}>
        <a href="#" style={modalStyles.a}>
          Evlyn Márcia Leão de Moraes Novo
        </a>
      </li>
      <li style={modalStyles.li}>
        <a href="#" style={modalStyles.a}>
          Fábio Roland
        </a>
      </li>
      <li style={modalStyles.li}>
        <a href="#" style={modalStyles.a}>
          João Antônio Lorenzzetti
        </a>
      </li>
      <li style={modalStyles.li}>
        <a href="#" style={modalStyles.a}>
          Jorge Machado Damazio
        </a>
      </li>
      <li style={modalStyles.li}>
        <a href="#" style={modalStyles.a}>
          Marco Aurélio dos Santos
        </a>
      </li>
      <li style={modalStyles.li}>
        <a href="#" style={modalStyles.a}>
          Maria Elvira Piñeiro Maceira
        </a>
      </li>
      <li style={modalStyles.li}>
        <a href="#" style={modalStyles.a}>
          Nelson Luís da Costa Dias
        </a>
      </li>
    </ul>

    <h4 style={modalStyles.h4}>Desenvolvimento do Sistema de Coleta de Dados</h4>
    <ul style={modalStyles.ul}>
      <li style={modalStyles.li}>
        <a href="#" style={modalStyles.a}>
          Neuron Eletrônica
        </a>
      </li>
    </ul>

    <h4 style={modalStyles.h4}>Manutenção do Sistema de Coleta de Dados</h4>
    <ul style={modalStyles.ul}>
      <li style={modalStyles.li}>Alexandre Donizetti da Silva (Neuron Eletrônica)</li>
      <li style={modalStyles.li}>Carlos Alberto Sampaio de Araújo</li>
      <li style={modalStyles.li}>Geraldo Orlando Mendes</li>
      <li style={modalStyles.li}>Joaquim Antônio Dionísio Leão</li>
      <li style={modalStyles.li}>Vitor Bruno</li>
    </ul>

    <h4 style={modalStyles.h4}>Gerente de Rede do Portal</h4>
    <ul style={modalStyles.ul}>
      <li style={modalStyles.li}>João Benedito Diehl</li>
    </ul>

    <h4 style={modalStyles.h4}>Web e Banco de Dados</h4>
    <ul style={modalStyles.ul}>
      <li style={modalStyles.li}>Arley Ferreira de Souza (arley@dpi.inpe.br)</li>
    </ul>
  </div>
)

// --- Componente da Página ---

function SimaPage() {
  return (
    <div className={styles.simaPageContainer}>
      <h1 className={styles.simaTitle}>SIMA</h1>

      {/* Container dos 8 cards principais */}
      <div className={`${styles.cardContainer} ${styles.eightCardGrid}`}>
        <ClickableCard
          title="Sobre o SIMA"
          iconSrc={simaIcon}
          modalContent={ModalSobre}
        />
        <ClickableCard
          title="Motivação"
          iconSrc={simaIcon}
          modalContent={ModalMotivacao}
        />
        <ClickableCard
          title="Estrutura"
          iconSrc={simaIcon}
          modalContent={ModalEstrutura}
        />
        <ClickableCard
          title="Funcionamento"
          iconSrc={simaIcon}
          modalContent={ModalFuncionamento}
        />
        <ClickableCard
          title="História"
          iconSrc={simaIcon}
          modalContent={ModalHistoria}
        />
        <ClickableCard
          title="Apoio"
          iconSrc={simaIcon}
          modalContent={ModalApoio}
        />
        <ClickableCard
          title="Problemas"
          iconSrc={simaIcon}
          modalContent={ModalProblemas}
        />
        <ClickableCard
          title="Mais informações"
          iconSrc={simaIcon}
          modalContent={
            <div>
              <h2>Mais informações</h2>
            </div>
          }
        />
      </div>

      {/* Container dos Botões de Navegação */}
      <div className={styles.navButtonContainer}>
        <Link to="/" className={styles.navButton}>
          {/* Ícone Home SVG Placeholder */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Página Inicial</span>
        </Link>
        <Link to="/mapa" className={styles.navButton}>
          {/* Ícone Mapa SVG Placeholder */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
            <line x1="8" y1="2" x2="8" y2="18"></line>
            <line x1="16" y1="6" x2="16" y2="22"></line>
          </svg>
          <span>Mapa Interativo</span>
        </Link>
      </div>

      {/* Seção Inferior: Equipe + Logo */}
      <div className={styles.bottomSection}>
        {/* Container da Equipe */}
        <div className={styles.cardContainer}>
          <h2 className={styles.containerTitle}>Equipe</h2>
          <div className={styles.teamCardGrid}>
            <ClickableCard
              title="Coordenação"
              iconSrc={simaIcon}
              modalContent={ModalCoordenacao}
            />
            <ClickableCard
              title="Colaboradores"
              iconSrc={simaIcon}
              modalContent={ModalColaboradores}
            />
            <ClickableCard
              title="Equipe 3" // Placeholder
              iconSrc={simaIcon}
              modalContent={<div></div>}
            />
            <ClickableCard
              title="Equipe 4" // Placeholder
              iconSrc={simaIcon}
              modalContent={<div></div>}
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
  )
}

export default SimaPage
