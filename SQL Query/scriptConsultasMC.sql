SELECT 
    tbsitio.idSitio, 
    tbsitio.nome 
FROM 
    tbsitio
JOIN 
    tbgasesembolhas ON tbsitio.idSitio = tbgasesembolhas.idSitio
 
EXCEPT
 
SELECT 
    tbsitio.idSitio, 
    tbsitio.nome 
FROM 
    tbsitio
JOIN 
    tbfluxobolhasinpe ON tbsitio.idSitio = tbfluxobolhasinpe.idSitio;

SELECT 
    tbreservatorio.nome AS reservatorio_nome,
    tbsitio.nome AS sitio_nome,
    tbdadosprecipitacao.dataMedida,
    tbdadosprecipitacao.precipitacao_mm
FROM 
    tbreservatorio
JOIN 
    tbsitio ON tbreservatorio.idReservatorio = tbsitio.idReservatorio
JOIN 
    tbdadosprecipitacao ON tbsitio.idSitio = tbdadosprecipitacao.idSitio
WHERE 
    tbdadosprecipitacao.dataMedida BETWEEN '2023-01-01' AND '2023-12-31';

SELECT 
    tbsitio.idSitio, 
    'Fluxo de Carbono' AS tipo_fluxo,
    tbfluxocarbono.dataMedida, 
    tbfluxocarbono.carbonoorganicoexcretado AS valor_fluxo
FROM 
    tbsitio
JOIN 
    tbfluxocarbono ON tbsitio.idSitio = tbfluxocarbono.idSitio
 
UNION
 
SELECT 
    tbsitio.idSitio, 
    'Fluxo de Bolhas' AS tipo_fluxo,
    tbfluxobolhasinpe.dataMedida, 
    tbfluxobolhasinpe.ch4 AS valor_fluxo
FROM 
    tbsitio
JOIN 
    tbfluxobolhasinpe ON tbsitio.idSitio = tbfluxobolhasinpe.idSitio;
