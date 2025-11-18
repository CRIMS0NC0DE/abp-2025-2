import type { Pool, QueryResult } from "pg";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function queryWithRetry<T = any>(
  pool: Pool,
  sql: string,
  params: Array<string | number> = [],
  options?: { retries?: number; delayMs?: number },
): Promise<{ rows: T[] }> {
  const maxRetries = options?.retries ?? 5;
  const baseDelay = options?.delayMs ?? 1000;

  let attempt = 0;
  /* tenta com backoff exponencial simples */
  while (true) {
    try {
      const res: QueryResult = await pool.query(sql, params);
      return { rows: res.rows as unknown as T[] };
    } catch (err: any) {
      const isConnError =
        err?.code === "ECONNREFUSED" ||
        err?.message?.includes("ECONNREFUSED") ||
        err?.message?.includes("Connection terminated") ||
        err?.message?.includes("terminating connection") ||
        err?.message?.includes("getaddrinfo ENOTFOUND");

      if (!isConnError || attempt >= maxRetries) {
        throw err;
      }

      const wait = baseDelay * Math.pow(2, attempt);
      await sleep(wait);
      attempt += 1;
    }
  }
}
