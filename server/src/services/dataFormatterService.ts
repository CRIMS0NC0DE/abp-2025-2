// src/services/dataFormatterService.ts
import { logger } from "../configs/logger";

/**
 * Classe de serviço para centralizar a formatação e normalização de dados
 * para as saídas da API.
 */
export class DataFormatterService {
  // ----------------------------------------------------------------
  // MÉTODOS DE NORMALIZAÇÃO DE TIPOS
  // ----------------------------------------------------------------

  /**
   * Constrói string ISO "YYYY-MM-DD" segura a partir de ano/mês/dia.
   */
  private static buildISODate(y: number, m: number, d: number): string | null {
    try {
      if (m < 1 || m > 12 || d < 1 || d > 31 || y < 1900 || y > 3000) {
        return null;
      }
      const date = new Date(Date.UTC(y, m - 1, d));

      if (date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d) {
        return date.toISOString().slice(0, 10);
      }
      return null;
    } catch (error) {
      logger.warn(`Erro ao construir data ISO: ${y}-${m}-${d}`, error);
      return null;
    }
  }

  /**
   * Normaliza datas de strings em formatos comuns ou objetos Date para "YYYY-MM-DD".
   */
  public static normalizeDate(value: string | Date | null | undefined): string | null {
    if (!value) return null;

    if (value instanceof Date) {
      if (isNaN(value.getTime())) return null;
      return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()))
        .toISOString()
        .slice(0, 10);
    }

    const trimmed = String(value).trim(); // Converte para string por segurança
    if (!trimmed) return null;

    // YYYY-MM-DD
    const matchISO = /^(\d{4})-(\d{2})-(\d{2})/.exec(trimmed);
    if (matchISO) {
      const [, y, m, d] = matchISO;
      return DataFormatterService.buildISODate(Number(y), Number(m), Number(d));
    }

    // DD/MM/YYYY
    const matchDMY = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(trimmed);
    if (matchDMY) {
      const [, d, m, y] = matchDMY;
      return DataFormatterService.buildISODate(Number(y), Number(m), Number(d));
    }

    // ... (outros formatos de data)

    // Tenta parsear como último recurso
    try {
      const date = new Date(trimmed);
      if (!isNaN(date.getTime())) {
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
          .toISOString()
          .slice(0, 10);
      }
    } catch (error) {
      /* Ignora falha no parse */
    }

    logger.warn(`Formato de data não reconhecido: ${value}`);
    return null;
  }

  /**
   * ESTE MÉTODO NÃO É MAIS USADO PELO formatListRow,
   * pois o db.ts agora cuida da conversão de números.
   * Mantido aqui para o caso de precisar ser usado manualmente.
   */
  public static parseLocaleNumber(value: string | number | null | undefined): number | null {
    if (value == null) return null;
    if (typeof value === "number") {
      return isNaN(value) ? null : value;
    }
    // ... (lógica de parse)
    return null;
  }

  // ----------------------------------------------------------------
  // MÉTODOS DE FORMATAÇÃO DE SAÍDA (Genéricos)
  // ----------------------------------------------------------------

  /**
   * Formata um registro para a saída de listagem (getAll).
   * "Achata" relacionamentos e normaliza datas.
   * **NÃO** mexe mais com números, pois o db.ts já os converteu.
   */
  public static formatListRow(row: any): any {
    if (!row) return null;

    // 1. Começa com todos os campos do 'row' (IDs, e números já formatados)
    const formatted: any = { ...row };

    // 2. Normaliza campos de data conhecidos (snake_case)
    if (formatted.datamedida !== undefined) {
      formatted.datamedida = DataFormatterService.normalizeDate(formatted.datamedida);
    }
    if (formatted.datahora !== undefined) {
      formatted.datahora = DataFormatterService.normalizeDate(formatted.datahora);
    }
    if (formatted.datainicio !== undefined) {
      formatted.datainicio = DataFormatterService.normalizeDate(formatted.datainicio);
    }
    if (formatted.datafim !== undefined) {
      formatted.datafim = DataFormatterService.normalizeDate(formatted.datafim);
    }
    if (formatted.inicio !== undefined) {
      formatted.inicio = DataFormatterService.normalizeDate(formatted.inicio);
    }
    if (formatted.fim !== undefined) {
      formatted.fim = DataFormatterService.normalizeDate(formatted.inicio);
    }

    // (camelCase)
    if (formatted.dataMedida !== undefined) {
      formatted.dataMedida = DataFormatterService.normalizeDate(formatted.dataMedida);
    }
    if (formatted.dataHora !== undefined) {
      formatted.dataHora = DataFormatterService.normalizeDate(formatted.dataHora);
    }
    if (formatted.dataInicio !== undefined) {
      formatted.dataInicio = DataFormatterService.normalizeDate(formatted.dataInicio);
    }
    if (formatted.dataFim !== undefined) {
      formatted.dataFim = DataFormatterService.normalizeDate(formatted.dataFim);
    }

    // 3. "Achata" relacionamentos comuns
    // O Model DEVE fornecer 'sitio_nome' e 'nrocampanha'
    if (row.idsitio !== undefined || row.idSitio !== undefined) {
      formatted.sitio = row.sitio_nome; // Usa o alias da query
      // Limpa os campos originais para não poluir a API
      delete formatted.idsitio;
      delete formatted.idSitio;
      delete formatted.sitio_nome;
    }
    if (row.idcampanha !== undefined || row.idCampanha !== undefined) {
      formatted.campanha = row.nrocampanha; // Usa o alias da query
      // Limpa os campos originais
      delete formatted.idcampanha;
      delete formatted.idCampanha;
      delete formatted.nrocampanha;
    }

    // Remove outros campos de join que não queremos na lista
    delete formatted.sitio_lat;
    delete formatted.sitio_lng;

    return formatted;
  }
}
