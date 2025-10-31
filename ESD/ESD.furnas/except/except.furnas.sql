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
