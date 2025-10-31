SELECT 
    tbestacao.idestacao, 
    tbestacao.rotulo, 
    tbestacao.lat AS estacao_lat, 
    tbestacao.lng AS estacao_lng,
    tbreservatorio.nome AS reservatorio_nome,
    tbreservatorio.lat AS reservatorio_lat,
    tbreservatorio.lng AS reservatorio_lng,
    ST_Distance(
        ST_SetSRID(ST_MakePoint(tbestacao.lng, tbestacao.lat), 4326), 
        ST_SetSRID(ST_MakePoint(tbreservatorio.lng, tbreservatorio.lat), 4326)
    ) AS distancia_em_metros
FROM 
    tbestacao
JOIN 
    tbreservatorio ON ST_DWithin(
        ST_SetSRID(ST_MakePoint(tbestacao.lng, tbestacao.lat), 4326), 
        ST_SetSRID(ST_MakePoint(tbreservatorio.lng, tbreservatorio.lat), 4326), 
        5000  -- Distância máxima de 5000 metros (5 km)
    )
WHERE 
    ST_Distance(
        ST_SetSRID(ST_MakePoint(tbestacao.lng, tbestacao.lat), 4326), 
        ST_SetSRID(ST_MakePoint(tbreservatorio.lng, tbreservatorio.lat), 4326)
    ) < 5000;  -- Distância menor que 5000 metros (5 km)

-- Essa consulta está calculando a distância entre um ponto (um sítio) e um reservatório correspondente, com base nas coordenadas geográficas (latitude e longitude) de cada um, e filtrando apenas os que estão a menos de 5 km de distância. 
