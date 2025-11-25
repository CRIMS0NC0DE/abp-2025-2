-- ====================================================================
-- ROTEIRO DE TESTES PARA OS TRIGGERS BDR.04
-- Objetivo: Comprovar o funcionamento dos Triggers 1, 2 e 3.
-- ====================================================================

-- --------------------------------------------------------------------
-- SEÇÃO 1: INSERÇÃO DE DADOS MOCK (PRÉ-REQUISITOS DE CHAVE ESTRANGEIRA)
-- Nota: Necessário para que o INSERT de teste não falhe em FKs.
-- --------------------------------------------------------------------

-- Limpa dados de testes anteriores (para poder rodar várias vezes)
DELETE FROM tbmedidacamposuperficie WHERE idmedidacamposuperficie IN (1, 2, 3);
DELETE FROM tb_log_operacoes WHERE tabela_alvo = 'tbmedidacamposuperficie';
DELETE FROM tbsitio WHERE idsitio = 400;
DELETE FROM tbcampanha WHERE idcampanha = 300;
DELETE FROM tbreservatorio WHERE idreservatorio = 200;
DELETE FROM tbinstituicao WHERE idinstituicao = 100;

-- Cria os dados de suporte (Instituição, Reservatório, Campanha, Sítio)
INSERT INTO tbinstituicao (idinstituicao, nome) VALUES (100, 'INPE/LABTUCAR');
INSERT INTO tbreservatorio (idreservatorio, nome, lat, lng) VALUES (200, 'Reservatório de Teste', -20.0, -45.0);
INSERT INTO tbcampanha (idcampanha, idinstituicao, idreservatorio, nroCampanha, datainicio)
VALUES (300, 100, 200, 99, '2025-11-25');
INSERT INTO tbsitio (idsitio, idreservatorio, nome, lat, lng)
VALUES (400, 200, 'Sitio de Teste Superficie', -20.01, -45.01);


-- --------------------------------------------------------------------
-- SEÇÃO 2: TESTE DE SUCESSO (COMPROVA TRIGGERS 1 e 3)
-- --------------------------------------------------------------------

RAISE NOTICE '--- TESTE 1: INSERÇÃO DE SUCESSO (Dispara Log e Atualização) ---';

-- INSERT de sucesso (pH 7.5 e DO 8.0)
INSERT INTO tbmedidacamposuperficie (
  idmedidacamposuperficie, idcampanha, idsitio, datamedida, horamedida, secchi, tempagua, condutividade, _do, ph, turbidez, materialemsuspensao
) VALUES (
  1, 300, 400, '2025-11-25', '10:00:00', 1.5, 25.0, 100.0, 8.0, 7.5, 5.0, 2.0
);

-- PROVA 1.1 (Trigger 1 - LOG): Deve retornar a linha de log criada.
SELECT 'VERIFICACAO LOG OK' AS status, tabela_alvo, operacao, data_hora
FROM tb_log_operacoes
WHERE id_registro_afetado = 1;

-- PROVA 1.2 (Trigger 3 - ATUALIZAÇÃO): Deve retornar uma data/hora recente.
SELECT 'VERIFICACAO ATUALIZACAO RESERVATORIO OK' AS status, ultima_atualizacao
FROM tbreservatorio
WHERE idreservatorio = 200;

-- --------------------------------------------------------------------
-- SEÇÃO 3: TESTE DE FALHA (COMPROVA TRIGGER 2 - VALIDAÇÃO)
-- Estes blocos DEVEM causar um erro no pgAdmin, provando o sucesso do trigger.
-- --------------------------------------------------------------------

-- CASO DE FALHA 2.1: pH Inválido (Negativo)
DO $$
BEGIN
  RAISE NOTICE '--- TESTE 2.1: TENTANDO INSERIR COM pH NEGATIVO (-1.0) ---';
  INSERT INTO tbmedidacamposuperficie (
    idmedidacamposuperficie, idcampanha, idsitio, datamedida, horamedida, _do, ph
  ) VALUES (
    2, 300, 400, '2025-11-25', '11:00:00', 8.0, -1.0
  );
  RAISE EXCEPTION 'ERRO: A inserção com pH negativo deveria ter sido bloqueada!';
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'SUCESSO NO TESTE 2.1: A inserção foi bloqueada. Mensagem de erro: %', SQLERRM;
END $$;

-- CASO DE FALHA 2.2: Oxigênio Dissolvido Inválido (Acima de 20.0 mg/L)
DO $$
BEGIN
  RAISE NOTICE '--- TESTE 2.2: TENTANDO INSERIR COM DO > 20.0 (25.0) ---';
  INSERT INTO tbmedidacamposuperficie (
    idmedidacamposuperficie, idcampanha, idsitio, datamedida, horamedida, _do, ph
  ) VALUES (
    3, 300, 400, '2025-11-25', '12:00:00', 25.0, 7.0
  );
  RAISE EXCEPTION 'ERRO: A inserção com DO > 20.0 deveria ter sido bloqueada!';
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'SUCESSO NO TESTE 2.2: A inserção foi bloqueada. Mensagem de erro: %', SQLERRM;
END $$;

-- VERIFICAÇÃO FINAL: A contagem deve ser 0 (zero) para comprovar que as linhas inválidas foram barradas.
SELECT 'VERIFICAÇÃO DE INTEGRIDADE: Registros 2 e 3 devem ser 0' AS status, COUNT(*) AS total_falhas_inseridas
FROM tbmedidacamposuperficie
WHERE idmedidacamposuperficie IN (2, 3);
