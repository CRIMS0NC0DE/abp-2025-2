// src/types/types.ts

/**
 * Define os nomes de banco de dados permitidos.
 * (Anteriormente definido em api.ts, movido para cá para ser central)
 */
export type DatabaseName = 'furnas' | 'balcar' | 'sima';

/**
 * Define o formato do objeto de filtros.
 * Ex: { "sitio": "Ponto 1", "ph": 7 }
 * (Anteriormente definido em api.ts, movido para cá para ser central)
 */
export type FilterParams = Record<string, string | number>;

/**
 * Define a estrutura de uma única linha de dados da tabela.
 * É um objeto genérico onde as chaves são strings (colunas)
 * e os valores podem ser de qualquer tipo.
 * (Deduzido do uso em useTableData)
 */
/**
 * Define a estrutura de uma única linha de dados da tabela.
 * Usamos uma união de tipos primitivos em vez de 'any' 
 * para manter a segurança de tipos.
 */
export type DataRow = Record<string, string | number | boolean | null>;

/**
 * Define o tipo de dados da tabela como um array de linhas.
 * (Importado por useTableData)
 */
export type DataType = DataRow[];

/**
 * Define a estrutura do objeto de paginação.
 * (Deduzido da inicialização e uso no hook useTableData)
 */
export interface PaginacaoState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Define a resposta completa esperada da API, que inclui
 * os dados paginados e as informações de paginação.
 * (Importado por api.ts e usado em useTableData)
 */
export interface ApiResponse extends PaginacaoState {
  data: DataType;
  // Você pode adicionar outras propriedades da API aqui, se houver
  // ex: message?: string;
}

/*
  * Define os tipos de coluna possíveis para as colunas de cada tabela.
*/
export type ColumnType = 'string' | 'number' | 'date' | 'time' | 'unknown';

export interface ColumnInfo {
  name: string;      // ex: "ph"
  type: ColumnType; // ex: "number"
}