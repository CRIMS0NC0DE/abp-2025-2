SELECT idestacao, datahora, tempag1, tempag2, tempag3
FROM tbsima
UNION
SELECT idestacao, datahora, tempag1, tempag2, tempag3
FROM tbsimaoffline;
