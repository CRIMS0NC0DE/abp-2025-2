DROP TABLE IF EXISTS 
tbfluxoinpe,
tbcampanha,
tbsitio,
tbinstituicao,
tbtabelacampo,
tbreservatorio
CASCADE;

CREATE TABLE tbreservatorio (
  idreservatorio INTEGER,
  nome VARCHAR(30) NULL,
  lat FLOAT NULL,
  lng FLOAT NULL,
  PRIMARY KEY(idreservatorio)
);

CREATE TABLE tbtabelacampo (
  idtabelacampo INTEGER,
  nome VARCHAR(50) NULL,
  rotulo VARCHAR(100) NULL,
  unidade VARCHAR(20) NULL,
  descricao VARCHAR(200) NULL,
  ordem INTEGER NULL,
  PRIMARY KEY(idtabelacampo)
);

CREATE TABLE tbinstituicao (
  idinstituicao INTEGER ,
  nome VARCHAR(20) NULL,
  PRIMARY KEY(idinstituicao)
);

CREATE TABLE tbsitio (
  idsitio INTEGER,
  idreservatorio INTEGER NOT NULL,
  nome VARCHAR(100) NULL,
  lat FLOAT NULL,
  lng FLOAT NULL,
  descricao VARCHAR(200) NULL,
  PRIMARY KEY(idsitio),
  FOREIGN KEY(idreservatorio)
    REFERENCES tbreservatorio(idreservatorio)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE tbcampanha (
  idcampanha INTEGER ,
  idreservatorio INTEGER NOT NULL,
  idinstituicao INTEGER NOT NULL,
  nrocampanha INTEGER NULL,
  datainicio DATE NULL,
  datafim DATE NULL,
  PRIMARY KEY(idcampanha),
  FOREIGN KEY(idinstituicao)
    REFERENCES tbinstituicao(idinstituicao)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(idreservatorio)
    REFERENCES tbreservatorio(idreservatorio)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

CREATE TABLE tbfluxoinpe (
  idfluxoinpe INTEGER ,
  idsitio INTEGER NOT NULL,
  idcampanha INTEGER NOT NULL,
  datamedida DATE NULL,
  ch4 NUMERIC(6,2) NULL,
  batimetria NUMERIC(6,2) NULL,
  tempar NUMERIC(6,2) NULL,
  tempcupula NUMERIC(6,2) NULL,
  tempaguasubsuperficie NUMERIC(6,2) NULL,
  tempaguameio NUMERIC(6,2) NULL,
  tempaguafundo NUMERIC(6,2) NULL,
  phsubsuperficie NUMERIC(6,2) NULL,
  phmeio NUMERIC(6,2) NULL,
  phfundo NUMERIC(6,2) NULL,
  orpsubsuperficie NUMERIC(6,2) NULL,
  orpmeio NUMERIC(6,2) NULL,
  orpfundo NUMERIC(6,2) NULL,
  condutividadesubsuperficie NUMERIC(6,3) NULL,
  condutividademeio NUMERIC(6,3) NULL,
  condutividadefundo NUMERIC(6,3) NULL,
  odsubsuperficie NUMERIC(6,2) NULL,
  odmeio NUMERIC(6,2) NULL,
  odfundo NUMERIC(6,2) NULL,
  tsdsubsuperficie NUMERIC(6,3) NULL,
  tsdmeio NUMERIC(6,3) NULL,
  tsdfundo NUMERIC(6,3) NULL,
  PRIMARY KEY(idfluxoinpe),
  FOREIGN KEY(idcampanha)
    REFERENCES tbcampanha(idcampanha)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION,
  FOREIGN KEY(idsitio)
    REFERENCES tbsitio(idsitio)
      ON DELETE NO ACTION
      ON UPDATE NO ACTION
);

