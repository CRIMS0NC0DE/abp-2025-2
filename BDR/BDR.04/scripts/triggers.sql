-- 1. Cria a tabela para registrar as operações de inserção (Rastreabilidade - TRIGGER 1).
CREATE TABLE IF NOT EXISTS tb_log_operacoes (
  id_log SERIAL PRIMARY KEY,
  tabela_alvo VARCHAR(50) NOT NULL,
  operacao VARCHAR(20) NOT NULL, -- Ex: 'INSERT', 'UPDATE', 'DELETE'
  id_registro_afetado INTEGER,
  data_hora TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);

-- 2. Adiciona a coluna para rastrear a data/hora da última medição no reservatório (Consistência - TRIGGER 3).
ALTER TABLE tbreservatorio ADD COLUMN IF NOT EXISTS ultima_atualizacao TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW();

-- --------------------------------------------------------------------
-- TRIGGER 1: REGISTRAR OPERAÇÕES EM LOG
-- Objetivo: Registrar na tabela 'tb_log_operacoes' sempre que um novo
-- dado for inserido na tabela de medição de campo de superfície.
-- Evento: AFTER INSERT na tbmedidacamposuperficie.
-- --------------------------------------------------------------------

-- Função para registrar a inserção de novos dados de medição em uma tabela de log.
CREATE OR REPLACE FUNCTION fn_log_medicao_superficie()
RETURNS TRIGGER AS $$ 
BEGIN
  INSERT INTO tb_log_operacoes (tabela_alvo, operacao, id_registro_afetado)
  VALUES ('tbmedidacamposuperficie', 'INSERT', NEW.idmedidacamposuperficie);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Gatilho que dispara a função após cada nova inserção.
CREATE OR REPLACE TRIGGER trg_log_medicao_superficie
AFTER INSERT ON tbmedidacamposuperficie
FOR EACH ROW
EXECUTE FUNCTION fn_log_medicao_superficie();


-- --------------------------------------------------------------------
-- TRIGGER 2: VALIDAR DADOS DE ENTRADA (INTEGRIDADE/CONSISTÊNCIA)
-- Regras: pH [0.0 - 14.0] e Oxigênio Dissolvido (DO) [0.0 - 20.0 mg/L].
-- Evento: BEFORE INSERT OR UPDATE na tbmedidacamposuperficie.
-- --------------------------------------------------------------------

-- Função para validar se os valores de pH e Oxigênio Dissolvido (DO) estão dentro de faixas aceitáveis.
CREATE OR REPLACE FUNCTION fn_validar_parametros_qualidade()
RETURNS TRIGGER AS $$
BEGIN
  --1. Validação de pH: deve estar entre 0.0 e 14.0.
  IF NEW.ph IS NOT NULL AND (NEW.ph < 0.0 OR NEW.ph > 14.0) THEN
    RAISE EXCEPTION 'ERRO DE VALIDAÇÃO: pH inválido (valor = %). Deve estar entre 0.0 e 14.0.', NEW.ph;
  END IF;

  --2. Validação de Oxigênio Dissolvido (_do): deve ser positivo e não exceder 20.0 mg/L.
  IF NEW._do IS NOT NULL AND (NEW._do < 0.0 OR NEW._do > 20.0) THEN
    RAISE EXCEPTION 'ERRO DE VALIDAÇÃO: Oxigênio Dissolvido inválido (valor = %). Deve estar entre 0.0 e 20.0 mg/L.', NEW._do;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Gatilho que dispara a função antes de cada inserção ou atualização na tabela de medição de superfície.
CREATE OR REPLACE TRIGGER trg_validar_parametros_qualidade
BEFORE INSERT OR UPDATE ON tbmedidacamposuperficie
FOR EACH ROW
EXECUTE FUNCTION fn_validar_parametros_qualidade();


-- --------------------------------------------------------------------
-- TRIGGER 3: ATUALIZAÇÃO AUTOMÁTICA DE ENTIDADE RELACIONADA (CONSISTÊNCIA)
-- Objetivo: Atualizar o campo 'ultima_atualizacao' na tabela 'tbreservatorio' sempre que um novo dado for inserido em um sítio
-- Evento: AFTER INSERT na tbmedidacamposuperficie.
-- --------------------------------------------------------------------

-- Função para atualizar a coluna 'ultima_atualizacao' na tabela tbreservatorio.
CREATE OR REPLACE FUNCTION fn_atualizar_reservatorio()
RETURNS TRIGGER AS $$
DECLARE
  v_id_reservatorio INTEGER;
BEGIN
  -- Encontra o ID do reservatório a partir do ID do sítio da nova linha
  SELECT idreservatorio INTO v_id_reservatorio
  FROM tbsitio
  WHERE idsitio = NEW.idsitio;

  --  -- Se encontrar o reservatório, atualiza a data/hora para o momento atual (NOW())
  IF v_id_reservatorio IS NOT NULL THEN
    UPDATE tbreservatorio
    SET ultima_atualizacao = NOW()
    WHERE idreservatorio = v_id_reservatorio;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

---- Gatilho que dispara a função após a inserção de cada medição de campo.
CREATE OR REPLACE TRIGGER trg_atualizar_reservatorio
AFTER INSERT ON tbmedidacamposuperficie
FOR EACH ROW
EXECUTE FUNCTION fn_atualizar_reservatorio();
