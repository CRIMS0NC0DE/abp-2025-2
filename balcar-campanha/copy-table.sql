COPY tbinstituicao (idinstituicao, nome)
FROM '/csv/tbinstituicao.csv'
WITH (
    FORMAT CSV,
    DELIMITER ';',
    NULL '\N',
    HEADER,
    QUOTE '"',
    ENCODING 'UTF8'
);

COPY tbreservatorio (idreservatorio, nome, lat, lng)
FROM '/csv/tbreservatorio.csv'
WITH (
    FORMAT CSV,
    DELIMITER ';',
    NULL '\N',
    HEADER,
    QUOTE '"',
    ENCODING 'UTF8'
);

COPY tbcampanha (idCampanha, idReservatorio, idInstituicao, nroCampanha,dataInicio, dataFim)
FROM '/csv/tbcampanha.csv'
WITH (
    FORMAT CSV,
    DELIMITER ';',
    NULL '\N',
    HEADER,
    QUOTE '"',
    ENCODING 'UTF8'
);

COPY tbsitio (idSitio, idReservatorio, nome, lat, lng, descricao)
FROM '/csv/tbsitio.csv'
WITH (
    FORMAT CSV,
    DELIMITER ';',
    NULL '\N',
    HEADER,
    QUOTE '"',
    ENCODING 'UTF8'
);


COPY tbtabelacampo (idtabelacampo, nome, rotulo, unidade, descricao, ordem)
FROM '/csv/tbtabelacampo.csv'
WITH (
    FORMAT CSV,
    DELIMITER ';',
    NULL '\N',
    HEADER,
    QUOTE '"',
    ENCODING 'UTF8'
);

COPY tbfluxoinpe (idfluxoinpe, idcampanha, idsitio, datamedida, ch4, batimetria,
  tempar, tempcupula, tempaguasubsuperficie, tempaguameio, tempaguafundo,
  phsubsuperficie, phmeio, phfundo, orpsubsuperficie, orpmeio, orpfundo,
  condutividadesubsuperficie, condutividademeio, condutividadefundo,
  odsubsuperficie, odmeio, odfundo, tsdsubsuperficie, tsdmeio, tsdfundo)
FROM '/csv/tbfluxoinpe.csv'
WITH (
    FORMAT CSV,
    DELIMITER ';',
    NULL '\N',
    HEADER,
    QUOTE '"',
    ENCODING 'UTF8'
);