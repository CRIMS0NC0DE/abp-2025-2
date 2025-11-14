//src/configs/db.ts
import dotenv from "dotenv";
dotenv.config();

// 1. Importar 'Pool' e 'types' do pg
import { Pool, types } from "pg";

// --- INÍCIO DA CORREÇÃO GLOBAL DE TIPOS ---

/**
 * OID (Object ID) do PostgreSQL para o tipo NUMERIC/DECIMAL.
 * Por padrão, o node-postgres retorna isso como string para evitar perda de precisão.
 */
const OID_NUMERIC = 1700;

/**
 * Parser customizado para converter a string numérica (que pode estar em 
 * formato pt-BR, ex: "1.234,56") para um 'number' do JavaScript.
 */
const parseNumeric = (value: string): number | null => {
  if (value === null) {
    return null; // Preserva valores nulos
  }

  // Detecta se é formato pt-BR (contém vírgula)
  if (value.includes(',')) {
    // Ex: "1.234,56" -> "1234,56" (remove separador de milhar)
    const v1 = value.replace(/\./g, '');
    // Ex: "1234,56" -> "1234.56" (troca vírgula decimal)
    const v2 = v1.replace(',', '.');
    return parseFloat(v2);
  }

  // Se não tem vírgula, é formato padrão (ex: "1234.56" ou "1234")
  return parseFloat(value);
};

// 3. Aplica o parser globalmente
// Isso instrui o node-postgres a usar nossa função 'parseNumeric'
// sempre que encontrar um valor do tipo NUMERIC (1700).
types.setTypeParser(OID_NUMERIC, parseNumeric);

// (Opcional, mas recomendado) Aplicar também a outros tipos de ponto flutuante
types.setTypeParser(types.builtins.FLOAT4, parseNumeric); // OID 700
types.setTypeParser(types.builtins.FLOAT8, parseNumeric); // OID 701

// --- FIM DA CORREÇÃO GLOBAL DE TIPOS ---


// O restante do seu arquivo permanece EXATAMENTE igual
export const furnasPool = new Pool({
  host: process.env.DB_FURNAS_HOST,
  user: process.env.DB_FURNAS_USER,
  password: String(process.env.DB_FURNAS_PASSWORD),
  database: process.env.DB_FURNAS_NAME,
  port: Number(process.env.DB_FURNAS_PORT),
});

export const simaPool = new Pool({
  host: process.env.DB_SIMA_HOST,
  user: process.env.DB_SIMA_USER,
  password: String(process.env.DB_SIMA_PASSWORD),
  database: process.env.DB_SIMA_NAME,
  port: Number(process.env.DB_SIMA_PORT),
});

export const balcarPool = new Pool({
  host: process.env.DB_BALCAR_HOST,
  user: process.env.DB_BALCAR_USER,
  password: String(process.env.DB_BALCAR_PASSWORD),
  database: process.env.DB_BALCAR_NAME,
  port: Number(process.env.DB_BALCAR_PORT),
});