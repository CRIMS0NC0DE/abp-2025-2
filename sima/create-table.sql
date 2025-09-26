DROP TABLE IF EXISTS 
tbcampotabela,
tbsensor,
tbsima,
tbsimaoffline,
tbestacao
CASCADE;

CREATE TABLE tbsensor (
  idSensor INTEGER,
  nome VARCHAR(30) NOT NULL,
  fabricante VARCHAR(30) NULL,
  modelo VARCHAR(30) NULL,
  faixa VARCHAR(60) NULL,
  precisao VARCHAR(120) NULL,
  PRIMARY KEY(idSensor)
);

CREATE TABLE tbestacao (
  idestacao VARCHAR(6) NOT NULL,
  idhexadecimal VARCHAR(5) NULL,
  rotulo VARCHAR(50) NULL,
  lat FLOAT NULL,
  lng FLOAT NULL,
  inicio DATE NULL,
  fim DATE NULL,
  PRIMARY KEY(idestacao)
);

CREATE TABLE tbcampotabela (
  idcampotabela INTEGER NOT NULL,
  idSensor INTEGER NULL,
  nomecampo VARCHAR(30) NULL,
  rotulo VARCHAR(32) NULL,
  unidademedida VARCHAR(8) NULL,
  ordem INTEGER NULL,
  PRIMARY KEY(idcampotabela),
  CONSTRAINT tbcampotabela_sensorfk FOREIGN KEY (idSensor) REFERENCES tbsensor (idSensor) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE tbsima (
  idsima SERIAL NOT NULL,
  idestacao VARCHAR(6) NOT NULL,
  datahora TIMESTAMP NOT NULL,
  regno INTEGER NULL,
  nofsamples INTEGER  NULL,
  proamag FLOAT NULL,
  dirvt FLOAT NULL,
  intensvt FLOAT NULL,
  u_vel FLOAT NULL,
  v_vel FLOAT NULL,
  tempag1 FLOAT NULL,
  tempag2 FLOAT NULL,
  tempag3 FLOAT NULL,
  tempag4 FLOAT NULL,
  tempar FLOAT NULL,
  ur FLOAT NULL,
  tempar_r FLOAT NULL,
  pressatm FLOAT NULL,
  radincid FLOAT NULL,
  radrefl FLOAT NULL,
  bateria FLOAT NULL,
  sonda_temp FLOAT NULL,
  sonda_cond FLOAT NULL,
  sonda_DOsat FLOAT NULL,
  sonda_DO FLOAT NULL,
  sonda_pH FLOAT NULL,
  sonda_NH4 FLOAT NULL,
  sonda_NO3 FLOAT NULL,
  sonda_turb FLOAT NULL,
  sonda_chl FLOAT NULL,
  sonda_bateria FLOAT NULL,
  corr_norte FLOAT NULL,
  corr_leste FLOAT NULL,
  co2_low FLOAT NULL,
  co2_high FLOAT NULL,
  precipitacao FLOAT NULL,
  PRIMARY KEY(idsima),
  CONSTRAINT tbsima_estacaofk FOREIGN KEY (idestacao) REFERENCES tbestacao (idestacao) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE tbsimaoffline (
  idsimaoffline SERIAL NOT NULL,
  idestacao VARCHAR(6) NOT NULL,
  datahora TIMESTAMP NULL,
  dirvt NUMERIC(5,2) NULL,
  intensvt NUMERIC(5,2) NULL,
  u_vel NUMERIC(4,2) NULL,
  v_vel NUMERIC(4,2) NULL,
  tempag1 NUMERIC(4,2) NULL,
  tempag2 NUMERIC(4,2) NULL,
  tempag3 NUMERIC(4,2) NULL,
  tempag4 NUMERIC(4,2) NULL,
  tempar NUMERIC(4,2) NULL,
  ur NUMERIC(5,2) NULL,
  tempar_r NUMERIC(5,2) NULL,
  pressatm NUMERIC(6,2) NULL,
  radincid NUMERIC(6,2) NULL,
  radrefl NUMERIC(6,2) NULL,
  fonteradiometro NUMERIC(4,2) NULL,
  sonda_temp NUMERIC(4,2) NULL,
  sonda_cond NUMERIC(4,2) NULL,
  sonda_do NUMERIC(4,2) NULL,
  sonda_ph NUMERIC(4,2) NULL,
  sonda_nh4 NUMERIC(6,3) NULL,
  sonda_no3 NUMERIC(6,3) NULL,
  sonda_turb NUMERIC(6,2) NULL,
  sonda_chl NUMERIC(6,2) NULL,
  sonda_bateria NUMERIC(4,2) NULL,
  corr_norte NUMERIC(5,2) NULL,
  corr_leste NUMERIC(5,2) NULL,
  bateriapainel NUMERIC(4,2) NULL,
  PRIMARY KEY(idsimaoffline),
  CONSTRAINT tbsimaoffline_estacaofk FOREIGN KEY (idestacao) REFERENCES tbestacao (idestacao) ON DELETE CASCADE ON UPDATE CASCADE
);