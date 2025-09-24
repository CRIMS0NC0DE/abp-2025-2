COPY tbestacao (idestacao, idhexadecimal, rotulo, lat, lng, inicio, fim)
FROM '/csv/tbestacao.csv'
WITH (
    FORMAT CSV,
    DELIMITER ';',
    NULL '\N',
    HEADER,
    QUOTE '"',
    ENCODING 'UTF8'
);

COPY tbsensor (idSensor, nome, fabricante, modelo, faixa, precisao)
FROM '/csv/tbsensor.csv'
WITH (
    FORMAT CSV,
    DELIMITER ';',
    NULL '\N',
    HEADER,
    QUOTE '"',
    ENCODING 'UTF8'
);

COPY tbcampotabela (idCampoTabela, idSensor, nomeCampo, rotulo, unidademedida, ordem)
FROM '/csv/tbcampotabela.csv'
WITH (
    FORMAT CSV,
    DELIMITER ';',
    NULL '\N',
    HEADER,
    QUOTE '"',
    ENCODING 'UTF8'
);


COPY tbsimaoffline (idestacao, datahora, dirvt,
       intensvt, u_vel, v_vel, tempag1, tempag2, tempag3,
       tempag4, tempar, ur, tempar_r, pressatm, radincid,
	   radrefl, fonteradiometro, sonda_temp, sonda_cond, sonda_do,
	   sonda_pH, sonda_NH4, sonda_NO3, sonda_turb,
	   sonda_chl, sonda_bateria, corr_norte, corr_leste, bateriapainel)
FROM '/csv/tbsimaoffline.csv'
WITH (
    FORMAT CSV,
    DELIMITER ';',
    NULL '\N',
    HEADER,
    QUOTE '"',
    ENCODING 'UTF8'
);

COPY tbsima (idestacao, datahora, regno, nofsamples, proamag, dirvt,
       intensvt, u_vel, v_vel, tempag1, tempag2, tempag3,
       tempag4, tempar, ur, tempar_r, pressatm, radincid,
	   radrefl, bateria, sonda_temp, sonda_cond, sonda_DOsat,
	   sonda_DO, sonda_pH, sonda_NH4, sonda_NO3, sonda_turb,
	   sonda_chl, sonda_bateria, corr_norte, corr_leste, co2_low,
	   co2_high, precipitacao)
FROM '/csv/tbsima.csv'
WITH (
    FORMAT CSV,
    DELIMITER ';',
    NULL '\N',
    HEADER,
    QUOTE '"',
    ENCODING 'UTF8'
);
