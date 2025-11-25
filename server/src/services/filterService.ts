// src/services/filterService.ts
import { Request } from 'express';

// Interface para um mapa de colunas (Parâmetro da URL -> Coluna do Banco)
type ColumnMap = { [key: string]: string };

export interface FilterResult {
    // Ex: "WHERE c.nome ILIKE $1 AND a.profundidade >= $2"
    whereClause: string;
    // Ex: ["%Ponto 1%", 10]
    params: any[];
    // Ex: 3
    nextIndex: number;
}

/**
 * Serviço de utilidade estático para construir filtros SQL
 * a partir de parâmetros de requisição, com suporte a ranges.
 */
export class FilterService {
    /**
     * Constrói uma cláusula WHERE parametrizada.
     * @param queryInput Os parâmetros da URL (req.query ou req.body.filters).
     * @param columnMap O mapeamento de parâmetros para colunas (ex: { sitio: 'c.nome' }).
     * @param startIndex O índice inicial para os parâmetros (ex: 1).
     * @returns Um objeto com a cláusula WHERE, os parâmetros e o próximo índice.
     */
    public static buildFilter(
        queryInput: Request['query'] | any,
        columnMap: ColumnMap,
        startIndex: number = 1,
    ): FilterResult {
        const whereClauses: string[] = [];
        const params: any[] = [];
        let paramIndex = startIndex;

        // Itera sobre todas as chaves recebidas na query (ex: 'sitio', 'profundidade_gte')
        for (const key in queryInput) {
            const value = queryInput[key];

            // Ignora valores nulos, vazios ou chaves de paginação
            if (value == null || value === '' || key === 'page' || key === 'limit') {
                continue;
            }

            // 1. Checa Filtros de Range (ex: profundidade_gte)
            if (key.endsWith('_gte')) {
                // 'profundidade_gte' -> 'profundidade'
                const baseKey = key.slice(0, -4); 
                
                // Verifica se 'profundidade' existe no map
                if (columnMap[baseKey]) {
                    const columnName = columnMap[baseKey]; // 'a.profundidade'
                    whereClauses.push(`${columnName} >= $${paramIndex++}`);
                    params.push(value);
                }
            }
            // 2. Checa Filtros de Range (ex: profundidade_lte)
            else if (key.endsWith('_lte')) {
                // 'profundidade_lte' -> 'profundidade'
                const baseKey = key.slice(0, -4); 
                
                // Verifica se 'profundidade' existe no map
                if (columnMap[baseKey]) {
                    const columnName = columnMap[baseKey]; // 'a.profundidade'
                    whereClauses.push(`${columnName} <= $${paramIndex++}`);
                    params.push(value);
                }
            }
            // 3. Checa Filtros de String (ex: sitio)
            else if (columnMap[key]) {
                // Verifica se 'sitio' existe no map
                const columnName = columnMap[key]; // 'c.nome'
                
                whereClauses.push(`${columnName} ILIKE $${paramIndex++}`);
                params.push(`%${value}%`); 
            }
            
            // Chaves desconhecidas (que não estão no map) são ignoradas
        }

        if (whereClauses.length === 0) {
            return { whereClause: '', params: [], nextIndex: startIndex };
        }

        return {
            whereClause: `WHERE ${whereClauses.join(' AND ')}`,
            params: params,
            nextIndex: paramIndex,
        };
    }
}