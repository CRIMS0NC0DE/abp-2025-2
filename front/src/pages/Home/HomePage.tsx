import { useState, useEffect } from 'react'; 
import ProjectCard from '../../components/ProjectCard/ProjectCard'; 
import styles from './HomePage.module.css';

import logoSima from '../../assets/LogoSIMA.png';
import logoFurnas from '../../assets/LogoFurnas.png';
import logoBalcar from '../../assets/LogoBalcar.png'; 


const projectData = [ 
  {
    logoSrc: logoSima,
    logoAlt: 'Logo SIMA',
    description: 'SIMA significa Sistema Integrado de Monitoramento Ambiental, é a plataforma tecnológica utilizada para coletar, integrar e transmitir os dados dos reservatórios.',
    to: '/sima'
  },
  {
    logoSrc: logoFurnas, 
    logoAlt: 'Logo BALCAR - Projeto Carbono Furnas',
    description: 'BALCAR é a sigla para Balanço de Carbono e foi um projeto focado nas emissões de gases de efeito estufa (GEE) em reservatórios de usinas hidrelétricas.',
    to: '/furnas' 
  },
  {
    logoSrc: logoBalcar, 
    logoAlt: 'Logo BALCAR - Projeto Furnas Aquicultura',
    description: 'O Projeto Furnas é a iniciativa principal para desenvolver e aplicar um sistema de monitoramento ambiental na aquicultura dos reservatórios de Furnas.',
    to: '/furnas' 
  }
];

const carouselData = [
  {
    title: 'Inovação',
    description: 'Esses projetos representam uma abordagem inovadora para monitorar o balanço de carbono e os impactos da agricultura em reservatórios do Brasil.'
  },
  {
    title: 'Tecnologia Nacional',
    description: 'O INPE desenvolveu e implementou a tecnologia do SIMA (boias com sensores e transmissão via satélite) para coletar dados em tempo real, um avanço significativo para a pesquisa ambiental no país.'
  },
  {
    title: 'Cooperação',
    description: 'A parceria com a Furnas Centrais Elétricas S.A. e a Embrapa demonstra a capacidade do INPE de colaborar com outras instituições para aplicar a pesquisa científica a problemas práticos.'
  }
];

export default function HomePage() {

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % carouselData.length);
    }, 4000); 

    
    return () => {
      clearInterval(slideInterval);
    };
  }, []); 

  const activeSlide = carouselData[currentSlide];

  return (
    <div className={styles.homepageContainer}>
      
      <h1 className={styles.mainTitle}>
        Acesse os Dados dos Projetos
      </h1>

      <div className={styles.cardsGrid}>
        {projectData.map((project) => ( 
          <ProjectCard
            key={project.logoAlt} 
            logoSrc={project.logoSrc}
            logoAlt={project.logoAlt}
            description={project.description}
            to={project.to}
          />
        ))}
      </div>

      <section className={styles.innovationSection}>
        
        <div key={currentSlide} className={styles.slideContent}>
          <h2 className={styles.innovationTitle}>{activeSlide.title}</h2>
          <p>{activeSlide.description}</p>
        </div>

      </section>

    </div>
  );
}