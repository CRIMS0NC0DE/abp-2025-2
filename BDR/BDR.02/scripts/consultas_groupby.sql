-- Consulta 1: Total de campanhas por reservatório
-- Retorna cada reservatório e a quantidade total de campanhas realizadas
SELECT r.nome AS reservatorio,
       COUNT(c.id_campanha) AS total_campanhas
FROM reservatorio r
LEFT JOIN campanha c ON r.id_reservatorio = c.id_reservatorio
GROUP BY r.nome
ORDER BY total_campanhas DESC;
 
-- Consulta 2: Média de valores por parâmetro
-- Retorna cada parâmetro e a média de seus valores coletados em todas as séries temporais
SELECT p.nome_parametro,
       AVG(s.valor) AS media_valores
FROM parametro p
INNER JOIN serie_temporal s ON p.id_parametro = s.id_parametro
GROUP BY p.nome_parametro
ORDER BY media_valores DESC;
 
-- Consulta 3: Reservatórios com mais de 3 campanhas
-- Retorna apenas os reservatórios que tiveram mais de 3 campanhas realizadas
SELECT r.nome AS reservatorio,
       COUNT(c.id_campanha) AS total_campanhas
FROM reservatorio r
INNER JOIN campanha c ON r.id_reservatorio = c.id_reservatorio
GROUP BY r.nome
HAVING COUNT(c.id_campanha) > 3
ORDER BY total_campanhas DESC;
 
-- Consulta 4: Instituições que coletaram em mais de 5 locais
-- Retorna o nome da instituição e a quantidade de pontos de coleta distintos onde atuou
SELECT i.nome AS instituicao,
       COUNT(DISTINCT c.id_reservatorio) AS total_locais
FROM instituicao i
INNER JOIN campanha c ON i.id_instituicao = c.id_instituicao
GROUP BY i.nome
HAVING COUNT(DISTINCT c.id_reservatorio) > 5
ORDER BY total_locais DESC;
 
-- Consulta 5: Primeira e última coleta em cada reservatório
-- Retorna o reservatório, a data da primeira coleta e a data da última coleta registrada
SELECT r.nome AS reservatorio,
       MIN(c.data_coleta) AS primeira_coleta,
       MAX(c.data_coleta) AS ultima_coleta
FROM reservatorio r
INNER JOIN campanha c ON r.id_reservatorio = c.id_reservatorio
GROUP BY r.nome
ORDER BY primeira_coleta;
