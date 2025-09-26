DROP TABLE IF EXISTS 
tbabioticocoluna,
tbabioticosuperficie,
tbaguamateriaorganicasedimento,
tbbioticocoluna,
tbbioticosuperficie,
tbbolhas,
tbcamarasolo,
tbcampanha,
tbcampanhaportabela,
tbcampoportabela,
tbcarbono,
tbconcentracaogasagua,
tbconcentracaogassedimento,
tbdadosprecipitacao,
tbdadosrepresa,
tbdifusao,
tbdupladessorcaoagua,
tbfluxobolhasinpe,
tbfluxocarbono,
tbfluxodifusivo,
tbfluxodifusivoinpe,
tbgasesembolhas,
tbhoriba,
tbinstituicao,
tbionsnaaguaintersticialdosedimento,
tbmedidacampocoluna,
tbmedidacamposuperficie,
tbnutrientessedimento,
tbparametrosbiologicosfisicosagua,
tbpfq,
tbreservatorio,
tbsitio,
tbtabela,
tbtc,
tbvariaveisfisicasquimicasdaagua
CASCADE;

CREATE TABLE  IF NOT EXISTS tbinstituicao (
  idinstituicao INTEGER NOT NULL ,
  nome varchar(50) NOT NULL,
  PRIMARY KEY (idinstituicao)
);

CREATE TABLE  IF NOT EXISTS tbreservatorio (
  idreservatorio INTEGER NOT NULL ,
  nome varchar(50) NOT NULL,
  lat FLOAT,
  lng FLOAT,
  PRIMARY KEY (idreservatorio)
);

CREATE TABLE  IF NOT EXISTS tbcampanha (
  idcampanha INTEGER NOT NULL,
  idinstituicao INTEGER NOT NULL,
  idreservatorio INTEGER NOT NULL,
  nroCampanha INTEGER,
  datainicio DATE,
  datafim DATE,
  PRIMARY KEY (idCampanha),
  CONSTRAINT tbcampanha_instituicaofk FOREIGN KEY (idInstituicao) REFERENCES tbinstituicao (idinstituicao) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT tbCampanha_reservatoriofk FOREIGN KEY (idReservatorio) REFERENCES tbreservatorio (idreservatorio) ON DELETE NO ACTION ON UPDATE CASCADE
);

 CREATE TABLE  IF NOT EXISTS tbsitio (
  idsitio INTEGER NOT NULL ,
  idreservatorio INTEGER NOT NULL,
  nome varchar(100),
  lat FLOAT,
  lng FLOAT,
  descricao varchar(200),
  PRIMARY KEY (idSitio),
  CONSTRAINT tbSitio_reservatoriofk FOREIGN KEY (idReservatorio) REFERENCES tbreservatorio (idReservatorio) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbtabela (
  idTabela INTEGER NOT NULL ,
  idInstituicao INTEGER NOT NULL,
  nome varchar(100) NOT NULL,
  rotulo varchar(100) NOT NULL,
  excecao varchar(256),
  sitio varchar(10) NOT NULL,
  campanha varchar(10) NOT NULL,
  PRIMARY KEY (idTabela),
  CONSTRAINT tbTabela_instituicaofk FOREIGN KEY (idInstituicao) REFERENCES tbinstituicao (idInstituicao) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbcampoportabela (
  idCampoPorTabela INTEGER NOT NULL ,
  idTabela INTEGER NOT NULL,
  nome varchar(50) NOT NULL,
  rotulo varchar(100) NOT NULL,
  unidade varchar(20),
  descricao varchar(200),
  principal varchar(10) NOT NULL,
  ordem INTEGER,
  tipo varchar(10) NOT NULL,
  PRIMARY KEY (idCampoPorTabela),
  CONSTRAINT tbCampoPorTabela_tabelafk FOREIGN KEY (idTabela) REFERENCES tbtabela (idTabela) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbcampanhaportabela (
  idCampanha INTEGER NOT NULL,
  idTabela INTEGER NOT NULL,
  PRIMARY KEY (idCampanha,idTabela),
  CONSTRAINT tbCampanhaPorTabela_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT tbCampanhaPorTabela_tabelafk FOREIGN KEY (idTabela) REFERENCES tbtabela (idTabela) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbabioticocoluna (
  idabioticocoluna INTEGER NOT NULL ,
  idcampanha INTEGER NOT NULL,
  idsitio INTEGER NOT NULL,
  datamedida DATE,
  horamedida TIME,
  profundidade FLOAT,
  dic FLOAT,
  nt FLOAT,
  pt FLOAT,
  delta13c FLOAT,
  delta15n FLOAT,
  PRIMARY KEY (idabioticocoluna),
  CONSTRAINT tbabioticocoluna_sitiofk FOREIGN KEY (idsitio) REFERENCES tbsitio (idsitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbabioticocoluna_campanhafk FOREIGN KEY (idcampanha) REFERENCES tbcampanha (idcampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbabioticosuperficie (
  idabioticosuperficie INTEGER NOT NULL ,
  idcampanha INTEGER NOT NULL,
  idsitio INTEGER NOT NULL,
  datamedida DATE,
  horamedida TIME,
  dic FLOAT,
  nt FLOAT,
  pt FLOAT,
  delta13c FLOAT,
  delta15n FLOAT,
  PRIMARY KEY (idAbioticoSuperficie),
  CONSTRAINT tbabioticosuperficie_sitiofk FOREIGN KEY (idsitio) REFERENCES tbsitio (idsitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbabioticosuperficie_campanhafk FOREIGN KEY (idcampanha) REFERENCES tbcampanha (idcampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbaguamateriaorganicasedimento (
  idaguamateriaorganicasedimento INTEGER NOT NULL ,
  idcampanha INTEGER NOT NULL,
  idsitio INTEGER NOT NULL,
  datamedida DATE,
  horamedida TIME,
  profundidade FLOAT,
  batimetria FLOAT,
  agua FLOAT,
  materiaOrganica FLOAT,
  PRIMARY KEY (idaguamateriaorganicasedimento),
  CONSTRAINT tbaguamateriaorganicasedimento_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idsitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbaguamateriaorganicasedimento_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);


CREATE TABLE  IF NOT EXISTS tbbioticocoluna (
  idBioticoColuna INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  profundidade FLOAT,
  doc FLOAT,
  toc FLOAT,
  poc FLOAT,
  densidadeBacteria FLOAT,
  biomassaBacteria FLOAT,
  clorofilaA FLOAT,
  biomassaCarbonoTotalFito FLOAT,
  densidadeTotalFito FLOAT,
  biomassaZoo FLOAT,
  densidadeTotalZoo FLOAT,
  PRIMARY KEY (idBioticoColuna),
  CONSTRAINT tbbioticocoluna_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idsitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbbioticocoluna_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idcampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbbioticosuperficie (
  idBioticoSuperficie INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  doc FLOAT,
  toc FLOAT,
  poc FLOAT,
  densidadeBacteria FLOAT,
  biomassaBacteria FLOAT,
  clorofilaA FLOAT,
  biomassaCarbonoTotalFito FLOAT,
  densidadeTotalFito FLOAT,
  biomassaZoo FLOAT,
  densidadeTotalZoo FLOAT,
  PRIMARY KEY (idBioticoSuperficie),
  CONSTRAINT tbbioticosuperficie_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbbioticosuperficie_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbbolhas (
  idBolhas INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  profundidade FLOAT,
  nroDeFunis INTEGER,
  volumeColetado FLOAT,
  co2 FLOAT,
  o2 FLOAT,
  n2 FLOAT,
  ch4 FLOAT,
  n2o FLOAT,
  PRIMARY KEY (idBolhas),
  CONSTRAINT tbbolhas_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbbolhas_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbcamarasolo (
  idCamaraSolo INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  ch4 FLOAT,
  co2 FLOAT,
  n2o FLOAT,
  tempar FLOAT,
  tempsolo FLOAT,
  vento FLOAT,
  altitude FLOAT,
  PRIMARY KEY (idCamaraSolo),
  CONSTRAINT tbcamarasolo_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbcamarasolo_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbcarbono (
  idCarbono INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  dc FLOAT,
  doc FLOAT,
  poc FLOAT,
  toc FLOAT,
  dic FLOAT,
  tc FLOAT,
  PRIMARY KEY (idCarbono),
  CONSTRAINT tbCarbono_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbCarbono_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbconcentracaogasagua (
  idConcentracaoGasAgua INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  batimetria FLOAT,
  altura FLOAT,
  replica INTEGER,
  ch4 FLOAT,
  co2 FLOAT,
  PRIMARY KEY (idConcentracaoGasAgua),
  CONSTRAINT tbConcentracaoGasAgua_sutiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbConcentracaoGasAgua_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbconcentracaogassedimento (
  idConcentracaoGasSedimento INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  batimetria FLOAT,
  profundidadeDoSedimento FLOAT,
  replica INTEGER,
  ch4 FLOAT,
  co2 FLOAT,
  PRIMARY KEY (idConcentracaoGasSedimento),
  CONSTRAINT tbConcentracaoGasSedimento_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbConcentracaoGasSedimento_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbdifusao (
  idDifusao INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  ch4 FLOAT,
  co2 FLOAT,
  n2o FLOAT,
  ph FLOAT,
  tempagua FLOAT,
  tempar FLOAT,
  profundidade FLOAT,
  altitude FLOAT,
  vento FLOAT,
  PRIMARY KEY (idDifusao),
  CONSTRAINT tbDifusao_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbDifusao_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbdupladessorcaoagua (
  idDuplaDessorcaoAgua INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  profundidade FLOAT,
  co2 FLOAT,
  o2 FLOAT,
  n2 FLOAT,
  ch4 FLOAT,
  n2o FLOAT,
  PRIMARY KEY (idDuplaDessorcaoAgua),
  CONSTRAINT tbDuplaDessorcaoAgua_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbDuplaDessorcaoAgua_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbfluxobolhasinpe (
  idFluxoBolhasInpe INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  profundidade FLOAT,
  ch4 FLOAT,
  ch4_desviopadrao FLOAT,
  ch4_amostras INTEGER,
  PRIMARY KEY (idFluxoBolhasInpe),
  CONSTRAINT tbFluxoBolhasInpe_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbFluxoBolhasInpe_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbfluxocarbono (
  idFluxoCarbono INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  producaofitoplanctonica FLOAT,
  carbonoorganicoexcretado FLOAT,
  respiracaofito FLOAT,
  producaobacteriana FLOAT,
  respiracaobacteriana FLOAT,
  taxasedimentacao FLOAT,
  PRIMARY KEY (idFluxoCarbono),
  CONSTRAINT tbFluxoCarbono_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbFluxoCarbono_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbfluxodifusivo (
  idFluxoDifusivo INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  batimetria FLOAT,
  intervalo varchar(16),
  ch4 FLOAT,
  co2 FLOAT,
  PRIMARY KEY (idFluxoDifusivo),
  CONSTRAINT tbFluxoDifusivo_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbFluxoDifusivo_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbfluxodifusivoinpe (
  idFluxoDifusivoInpe INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  profundidade FLOAT,
  co2 FLOAT,
  co2_desviopadrao FLOAT,
  co2_amostras INTEGER,
  ch4 FLOAT,
  ch4_desviopadrao FLOAT,
  ch4_amostras INTEGER,
  PRIMARY KEY (idFluxoDifusivoInpe),
  CONSTRAINT tbFluxoDifusivoInpe_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbFluxoDifusivoInpe_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbgasesembolhas (
  idGasesEmBolhas INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  profundidade FLOAT,
  co2 FLOAT,
  o2 FLOAT,
  n2 FLOAT,
  ch4 FLOAT,
  n2o FLOAT,
  PRIMARY KEY (idGasesEmBolhas),
  CONSTRAINT tbGasesEmBolhas_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbGasesEmBolhas_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbhoriba (
  idHoriba INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  profundidade FLOAT,
  tempagua FLOAT,
  condutividade FLOAT,
  ph FLOAT,
  _do FLOAT,
  tds FLOAT,
  redox FLOAT,
  turbidez FLOAT,
  PRIMARY KEY (idHoriba),
  CONSTRAINT tbHoriba_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbHoriba_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbionsnaaguaintersticialdosedimento (
  idIonsNaAguaIntersticialDoSedimento INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  profundidade FLOAT,
  batimetria FLOAT,
  f FLOAT,
  cl FLOAT,
  no2 FLOAT,
  br FLOAT,
  no3 FLOAT,
  po4 FLOAT,
  so4 FLOAT,
  na FLOAT,
  nh4 FLOAT,
  k FLOAT,
  mg FLOAT,
  ca FLOAT,
  acetato FLOAT,
  PRIMARY KEY (idIonsNaAguaIntersticialDoSedimento),
  CONSTRAINT tbIonsNaAguaIntersticialDoSedimento_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbIonsNaAguaIntersticialDoSedimento_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbmedidacampocoluna (
  idMedidaCampoColuna INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  profundidade FLOAT,
  secchi FLOAT,
  tempagua FLOAT,
  condutividade FLOAT,
  _do FLOAT,
  ph FLOAT,
  turbidez FLOAT,
  materialemsuspensao FLOAT,
  intensidadeluminosa FLOAT,
  PRIMARY KEY (idMedidaCampoColuna),
  CONSTRAINT tbMedidaCampoColuna_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbMedidaCampoColuna_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbmedidacamposuperficie (
  idMedidaCampoSuperficie INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  secchi FLOAT,
  tempagua FLOAT,
  condutividade FLOAT,
  _do FLOAT,
  ph FLOAT,
  turbidez FLOAT,
  materialemsuspensao FLOAT,
  PRIMARY KEY (idMedidaCampoSuperficie),
  CONSTRAINT tbMedidaCampoSuperficie_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbMedidaCampoSuperficie_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbnutrientessedimento (
  idNutrientesSedimento INTEGER NOT NULL ,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  profundidade FLOAT,
  batimetria FLOAT,
  n2 FLOAT,
  pt FLOAT,
  tc FLOAT,
  PRIMARY KEY (idNutrientesSedimento),
  CONSTRAINT tbNutrientesSedimento_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbNutrientesSedimento_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbparametrosbiologicosfisicosagua (
  idParametrosBiologicosFisicosAgua INTEGER NOT NULL,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  profundidade FLOAT,
  secchi FLOAT,
  tempagua FLOAT,
  condutividade FLOAT,
  _do FLOAT,
  ph FLOAT,
  turbidez FLOAT,
  materialemsuspensao FLOAT,
  doc FLOAT,
  toc FLOAT,
  poc FLOAT,
  dic FLOAT,
  nt FLOAT,
  pt FLOAT,
  densidadebacteria FLOAT,
  biomassabacteria FLOAT,
  clorofilaa FLOAT,
  biomassacarbonototalfito FLOAT,
  densidadetotalfito FLOAT,
  biomassazoo FLOAT,
  densidadetotalzoo FLOAT,
  producaofitoplanctonica FLOAT,
  carbonoorganicoexcretado FLOAT,
  respiracaofito FLOAT,
  producaobacteriana FLOAT,
  respiracaobacteriana FLOAT,
  taxasedimentacao FLOAT,
  delta13c FLOAT,
  delta15n FLOAT,
  intensidadeluminosa FLOAT,
  PRIMARY KEY (idParametrosBiologicosFisicosAgua),
  CONSTRAINT tbParametrosBiologicosFisicosAgua_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbParametrosBiologicosFisicosAgua_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbpfq (
  idPFQ INTEGER NOT NULL,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  profundidade FLOAT,
  batimetria FLOAT,
  tempar FLOAT,
  tempagua FLOAT,
  _do FLOAT,
  ph FLOAT,
  redox FLOAT,
  vento varchar(16),
  PRIMARY KEY (idPFQ),
  CONSTRAINT tbPFQ_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbPFQ_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbtc (
  idtc INTEGER NOT NULL,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  profundidade varchar(16),
  tc FLOAT,
  PRIMARY KEY (idtc),
  CONSTRAINT tbTc_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbTc_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbvariaveisfisicasquimicasdaagua (
  idVariaveisFisicasQuimicasDaAgua INTEGER NOT NULL,
  idCampanha INTEGER NOT NULL,
  idSitio INTEGER NOT NULL,
  dataMedida DATE,
  horaMedida TIME,
  profundidade FLOAT,
  secchi FLOAT,
  batimetria FLOAT,
  f FLOAT,
  cl FLOAT,
  nno3 FLOAT,
  ppo43 FLOAT,
  sso42 FLOAT,
  li FLOAT,
  na FLOAT,
  nnh4 FLOAT,
  k FLOAT,
  mg FLOAT,
  ca FLOAT,
  clorofila FLOAT,
  feofitina FLOAT,
  turbidez FLOAT,
  nt FLOAT,
  pt FLOAT,
  tdc FLOAT,
  PRIMARY KEY (idVariaveisFisicasQuimicasDaAgua),
  CONSTRAINT tbVariaveisFisicasQuimicasDaAgua_sitiofk FOREIGN KEY (idSitio) REFERENCES tbsitio (idSitio) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT tbVariaveisFisicasQuimicasDaAgua_campanhafk FOREIGN KEY (idCampanha) REFERENCES tbcampanha (idCampanha) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbdadosprecipitacao (
  idDadosPrecipitacao INTEGER NOT NULL ,
  idReservatorio INTEGER NOT NULL,
  dataMedida DATE,
  precipitacao FLOAT,
  PRIMARY KEY (idDadosPrecipitacao),
  CONSTRAINT tbDadosPrecipitacao_ibfk_1 FOREIGN KEY (idReservatorio) REFERENCES tbreservatorio (idReservatorio) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE  IF NOT EXISTS tbdadosrepresa (
  idDadosRepresa INTEGER NOT NULL ,
  idReservatorio INTEGER NOT NULL,
  dataMedida DATE,
  nivelReservatorio FLOAT,
  volUtilReservatorio FLOAT,
  porVolUtilReservatorio FLOAT,
  geracao FLOAT,
  vazaoAfluente FLOAT,
  vazaoDefluente FLOAT,
  produtividade FLOAT,
  vazaoTurbinada FLOAT,
  vazaoVertida FLOAT,
  vazaoTurbinadaVazio FLOAT,
  PRIMARY KEY (idDadosRepresa),
  CONSTRAINT tbDadosRepresa_reservatoriofk FOREIGN KEY (idReservatorio) REFERENCES tbreservatorio (idReservatorio) ON DELETE NO ACTION ON UPDATE CASCADE
);