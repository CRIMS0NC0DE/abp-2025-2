-- Stored Procedure 1: Listar coletas por reservatório em intervalo de datas
-- Objetivo: Retornar todas as coletas realizadas em um determinado reservatório
-- Parâmetros:
--   reservatorio_nome: nome do reservatório
--   data_inicio: data inicial do intervalo
--   data_fim: data final do intervalo
-- Saída: tabela com reservatório, data da coleta, parâmetro e valor medido
-- ======================================================
CREATE OR REPLACE PROCEDURE listar_coletas_reservatorio(
    reservatorio_nome VARCHAR,
    data_inicio DATE,
    data_fim DATE
)
LANGUAGE plpgsql
AS $$
BEGIN
    PERFORM r.nome, c.data_coleta, p.nome_parametro, s.valor
    FROM reservatorio r
    INNER JOIN campanha c ON r.id_reservatorio = c.id_reservatorio
    INNER JOIN serie_temporal s ON c.id_campanha = s.id_campanha
    INNER JOIN parametro p ON s.id_parametro = p.id_parametro
    WHERE r.nome = reservatorio_nome
      AND c.data_coleta BETWEEN data_inicio AND data_fim;
END;
$$;
 
-- ======================================================
-- Stored Procedure 2: Calcular média de valores de um parâmetro em uma campanha
-- Objetivo: Retornar a média dos valores medidos para um parâmetro específico em uma campanha
-- Parâmetros:
--   campanha_id: ID da campanha
--   parametro_nome: nome do parâmetro
-- Saída: média dos valores medidos (numeric)
-- ======================================================
CREATE OR REPLACE PROCEDURE media_parametro_campanha(
    campanha_id INT,
    parametro_nome VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    PERFORM AVG(s.valor) AS media_valor
    FROM serie_temporal s
    INNER JOIN parametro p ON s.id_parametro = p.id_parametro
    WHERE s.id_campanha = campanha_id
      AND p.nome_parametro = parametro_nome;
END;
$$;
 
-- ======================================================
-- Stored Procedure 3: Listar parâmetros medidos por uma instituição
-- Objetivo: Retornar todos os parâmetros que foram coletados por uma determinada instituição
-- Parâmetros:
--   instituicao_nome: nome da instituição
-- Saída: tabela com nome do parâmetro e quantidade de vezes coletado
-- ======================================================
CREATE OR REPLACE PROCEDURE parametros_por_instituicao(
    instituicao_nome VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
    PERFORM p.nome_parametro, COUNT(c.id_campanha) AS total_coletas
    FROM instituicao i
    INNER JOIN campanha c ON i.id_instituicao = c.id_instituicao
    INNER JOIN parametro p ON c.id_parametro = p.id_parametro
    WHERE i.nome = instituicao_nome
    GROUP BY p.nome_parametro
    ORDER BY total_coletas DESC;
END;
$$;
