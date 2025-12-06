

<h1 align="center">2º DSM FATEC/SP - Jacareí</h1>
  

# CRIMSONCODE. 🟥

<div align=center>
 <img src=front/src/assets/Logo.jpeg height=320px alt="Logo CrimsonCode.">
</div>



<h2 align="center">
  Aplicação Web para Visualização e Disseminação de Dados Limnológicos
</h2>

## SOBRE O PROJETO 📕

<p>
A aplicação Web tem como objetivo disponibilizar, de maneira simples e interativa, os dados limnológicos e metereológicos coletados nos reservatórios de Furnas Centrais Elétricas S.A., provenientes do SIMA (Sistema Integrado de Monitoramento Ambiental) e de campanhas manuais em campo.

A aplicação organiza e apresenta os dados em uma interface limpa, permitindo que o usuário visualize informações de maneira clara, com filtros, seleções e consultas personalizadas. Dessa forma, torna-se possível acompanhar os parâmetros ambientais e hidrológicos sem a complexidade dos relatórios técnicos.
</p>

## FUNCIONALIDADES 💡

<ul>
 <li>
  Exibição simplificada de dados limnológicos e metereológicos;
 </li>
 <li>
  Filtros por período, tipo de dado e local de coleta;
 </li>
 <li>
 Organização de informações de campanhas manuais e coletas automáticas do SIMA;
 </li>
 <li>
  Visualização clara e acessível para pesquisadores, estudantes e demais interessados.
 </li>
</ul>

<h2 align="center" >BACKLOG DO PRODUTO</h2>

## REQUISITOS FUNCIONAIS - RF: 

<ul>
 <li>
  RF-ABP01: Permitir aos usuários visualizar todos os paramêtros armazenados, filtrando por instituição, reservatório e período de tempo - em formato semelhante a um painel interativo;
 </li>
 <li>
  RF-ABP02: Consultar e visualizar os dados no formato de tabelas;
 </li>
 <li>
  RF-ABP03: Consultar e exportar os dados no formato CSV;
 </li>
 <li>
  RF-ABP04: Consultar e visualizar a localização dos dados em um mapa interativo;
 </li>
   <li>
  RF-BDR05: Implementar no Sistema filtros espaciais;
 </li>
   <li>
  RF-BDR06: Implementar no Sistema cálculos de médias e outras estatísticas sobre níveis de carbono nos reservátórios;
 </li>
   <li>
  RF-DWII07: Prototificar a aplicação no FIGMA;
 </li>
    <li>
  RF-DWII08: Desenvolver Front-End;
 </li>
    <li>
  RF-TPI09: Consultar e Analisar os dados em um Mapa Interativo;
 </li>
</ul>

## REQUISITOS NÃO FUNCIONAIS - RNF:

<ul>
 <li>
  RNF-ABP010: A usuabilidade será um requisito crítico, exigindo uma interface intuitiva, clara e de fácil navegação, mesmo para usuários sem conhecimento técnico aprofundado;
 </li>
 <li>
  RNF-ABP11: A aplicação deve apresentar desempenho otimizado, garantindo carregamento rápido dos dados;
 </li>
  <li>
  RNF-ABP12: A interface deve seguir os padrões institucionais do INPE e a identidade visual definida pelo cliente.
 </li>
   <li>
  RNF-BDR13: Melhorar a performance da aplicação utilizando índices nos campos mais consultados e procedures para operações complexas.
 </li>
   RNF-EGS14: Elaborar Diagrama de Caso de Uso;
 </li>
   <li>
  RNF-EGS15: Elaborar Diagrama de Classes;
 </li>
   <li>
  RNF-EGS16: Elaborar Diagrama de Sequência;
 </li>
   <li>
  RNF-EGS17: Elaborar Documentação Caso de Teste;
 </li>
   <li>
  RNF-DWII18: Elaborar Documentação Caso de Teste;
 </li>
</ul>

## RESTRIÇÕES DE PROJETO 🛑

<ul>
 <li>
  RP01: Os dados devem ser armazenados no SGBD PostgreSQL;
 </li>
 <li>
  RP02: O back-end dev ser desenvolvido em Node.js com TypeScript;
 </li>
  <li>
  RP03: O front-end deve ser desenvolvido em React com TypeScript;
 </li>
  <li>
  RP04: A aplicação deve utilizar containers independentes para o banco de dados, o back-end e o front-end.
 </li>
</ul>

## HISTÓRIAS DE USUÁRIOS

| ID  | História de Usuário                                                                                 | Critérios de Aceitação                                                                                         |
|-----|------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| US01 | Como usuário, quero consultar e exportar dados em formato .CSV, para que eu possa baixar e analisar os dados externamente. | O sistema deve permitir exportação em .CSV;<br>O arquivo deve conter os parâmetros selecionados;<br>Deve ser possível escolher o período e o reservatório. |
| US02 | Como usuário, quero consultar os dados em formato de tabelas, para que eu possa visualizá-los de forma organizada. | As tabelas devem permitir filtros e rolagem;<br>Os cabeçalhos devem identificar claramente os parâmetros exibidos. |
| US03 | Como usuário, quero exibir os dados de séries temporais em gráficos (dados do SIMA), para que eu possa analisar a variação dos parâmetros ao longo do tempo. | Deve ser possível selecionar o parâmetro, o reservatório e o período;<br>O gráfico deve atualizar dinamicamente. |
| US04 | Como usuário, quero adicionar filtros espaciais nas consultas de tabelas, para que eu possa visualizar dados de regiões específicas. | O filtro deve permitir seleção por área ou reservatório;<br>As tabelas devem ser atualizadas automaticamente. |
| US05 | Como usuário, quero consultar e analisar os dados em um mapa interativo, para que eu possa ver a distribuição espacial das coletas. | O mapa deve exibir marcadores representando os pontos de coleta;<br>Ao clicar em um marcador, devem aparecer os dados associados. |
| US06 | Como analista do sistema, quero prototipar a aplicação no Figma, para que a equipe defina a interface e experiência do usuário. | O protótipo deve incluir telas principais (home, dashboard, gráficos, tabelas e mapa). |
| US07 | Como desenvolvedor, quero elaborar o diagrama de caso de uso, para que as interações entre usuário e sistema fiquem bem definidas. | O diagrama deve representar todos os casos de uso e atores envolvidos. |
| US08 | Como desenvolvedor, quero elaborar o diagrama de classes, para que a estrutura do sistema e suas entidades fiquem claras. | O diagrama deve representar as principais classes, atributos e relacionamentos. |
| US09 | Como desenvolvedor, quero elaborar o diagrama de sequência, para que as interações entre objetos durante os processos sejam compreendidas. | O diagrama deve representar pelo menos um fluxo principal do sistema. |
| US10 | Como desenvolvedor, quero desenvolver o front-end, para que os usuários possam interagir com o sistema através de uma interface funcional e intuitiva. | A aplicação deve ser responsiva;<br>As telas devem seguir o design definido no Figma;<br>Deve se comunicar corretamente com o backend. |

## SPRINT 1 🔁

<h3>SPRINT BACKLOG 📜</h3>

| Histórias de Usuário             | Tipo de Requisito | Justificativa                                                                 |
|----------------------------------|-------------------|-------------------------------------------------------------------------------|
| Prototipar aplicação no FIGMA    | Não Funcional     | Protótipo de interface, auxilia na definição de usabilidade e design         |
| Elaborar Diagrama de Caso de Uso | Não Funcional     | Documento que define os fluxos de interação entre usuários e sistema         |
| Desenvolver Front-End            | Funcional          | Entrega funcional do sistema — implementação real da interface para o usuário |

<h3>BURNDOWN 🔥</h3>

<div>
 <img src=front/src/assets/burndownSP1.jpg> 
</div>

<h3>RETROSPECTIVA DE SPRINT 🗣️</h3>

<p><strong>O QUE DEU CERTO?</strong></p>

O fluxo de trabalho se manteve estável e concreto, onde tivemos as reuniões facilitando o gerenciamento. Trabalho em equipe.

<p><strong>O QUE DEU ERRADO?</strong></p>

Inicialmente trabalhar com ambiente docker se mostrou um pouco confuso e certo receio em relação a utilização do banco em containers

<p><strong>O QUE PODEMOS MELHORAR?</strong></p>

Utilização do ambiente docker e tratamento de tasks.

## SPRINT 2 🔁

<h3>SPRINT BACKLOG 📜</h3>

| Histórias de Usuário             | Tipo de Requisito | Justificativa                                                                 |
|----------------------------------|-------------------|-------------------------------------------------------------------------------|
| Consultar e Analisar os Dados do Mapa Interativo | Funcional     | Requisito do cliente para consulta de dados        |
| Consultar e Visualizar os Dados no formato de Tabelas   | Funcional     | Requisito do cliente para exibição de dados         |
| Exportar Dados em formato CSV   | Funcional     | Requisito do cliente para exportar dados         |
| Consultar e Visualizar dados e formato de Gráfico   | Funcional     | Requisito do cliente para exibição dos dados em formato de gráfico         |
| Elaborar Diagrama de Classe   | Não Funcional     | Documento que define as classes e relacionamentos do sistema         |
| Revisão do Front End          | Não Funcional          | Revisão do Front End para que ele esteja de acordo com as expectativas do cliente |


<h3>BURNDOWN 🔥</h3>

<div>
 <img src=front/src/assets/burndownSP2.png> 
</div>

## SPRINT 3 🔁

<h3>SPRINT BACKLOG 📜</h3>

| Histórias de Usuário             | Tipo de Requisito | Justificativa                                                                 |
|----------------------------------|-------------------|-------------------------------------------------------------------------------|
| Elaborar Diagrama de Sequência | Não Funcional     | Documento que define a sequência das ações no sistema        |
| Testes Unitários para Validação de Funcionalidades  | Não Funcional     | Documento que define a sequência dos testes realizados no sistema         |
| Adicionar os filtros espaciais nas consultas de Tabelas   | Funcional     | Requisito do cliente para exibição de dados         |
| Consultar e Visualizar dados e formato de Gráfico no SIMA   | Funcional     | Requisito do cliente para exibição dos dados em formato de gráfico         |
| Deploy Front-End e Back-end  | Funcional     | Requisito do cliente para acessar as informações do sistema         |


<h3>BURNDOWN 🔥</h3>

<div>
 <img src=front/src/assets/burndownSP3.png> 
</div>

## TECNOLOGIAS UTILIZADAS

#### Backend
<div style="display: inline_block"><br>
  <img align="center" alt="Ts" height="30" widht="40" src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg"/>
  <img align="center" alt="POSTGRESQL" height="30" width="40" src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-plain.svg">
  <img align="center" alt="Docker" height="30" width="40" src="https://github.com/devicons/devicon/blob/master/icons/docker/docker-plain.svg">
<br>

#### Frontend

<div style="display: inline_block"><br>
  <img align="center" alt="Ts" height="30" widht="40" src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg"/>
  <img align="center" alt="REACT" height="30" width="40" src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg">
  <img align="center" alt="CSS" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg">
<br>

## EQUIPE💻

<br align="center" >

| NOME              | FUNÇÃO        | GITHUB                                                    |
|-------------------|---------------|-----------------------------------------------------------|
| Márcio Bueno      | Scrum Master  | [MarcioBuenoo](https://github.com/MarcioBuenoo)           |
| Vinicius Ledro    | Product Owner | [ViniciusLedro](https://github.com/ViniciusLedro)         |
| Leonardo Broinizi | Dev. Team     | [Leonardo-Broinizi](https://github.com/Leonardo-Broinizi) |
| Bruno Mark        | Dev. Team     | [bruno-mark](https://github.com/bruno-mark)               |
| Davi Snaider      | Dev. Team     | [davisnaider06](https://github.com/davisnaider06)         |
| Henrique Pinho    | Dev. Team     | [rickshf](https://github.com/rickshf)                     |
| Eric França       | Dev. Team     | [EricFranca96](https://github.com/EricFranca90)           |
 
<br>
