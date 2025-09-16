<h1 align="center" >2º DSM FATEC/SP - Jacareí</h1>

# CRIMSONCODE. 🟥

<div align=center>
 <img src=assets/Logo.jpeg height=320px alt="Logo CrimsonCode.">
</div>

## SOBRE O PROJETO 📕

<p>
<strong>X</strong> é uma aplicação Web que tem como objetivo disponibilizar, de maneira simples e interativa, os dados limnológicos e metereológicos coletados nos reservatórios de Furnas Centrais Elétricas S.A., provenientes do SIMA (Sistema Integrado de Monitoramento Ambiental) e de campanhas manuais em campo.

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

<h2 align="center" >REQUISITOS</h2>

## REQUISITOS FUNCIONAIS: 

<ul>
 <li>
  RF01: Permitir aos usuários visualizar todos os paramêtros armazenados, filtrando por instituição, reservatório e período de tempo - em formato semelhante a um painel interativo;
 </li>
 <li>
  RF02: Consultar e visualizar os dados no formato de tabelas;
 </li>
 <li>
  RF03: Consultar e exportar os dados no formato CSV;
 </li>
 <li>
  RF04: Consultar e visualizar a localização dos dados em um mapa interativo;
 </li>
 <li>
  RF05: Exibir os dados de séries temporais (paramêtros coletados pelo SIMA) em gráficos.
 </li>
</ul>

## REQUISITOS NÃO FUNCIONAIS:

<ul>
 <li>
  RNF01: A usuabilidade será um requisito crítico, exigindo uma interface intuitiva, clara e de fácil navegação, mesmo para usuários sem conhecimento técnico aprofundado;
 </li>
 <li>
  RNF02: A aplicação deve apresentar desempenho otimizado, garantindo carregamento rápido dos dados;
 </li>
  <li>
  RNF03: A interface deve seguir os padrões institucionais do INPE e a identidade visual definida pelo cliente.
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
