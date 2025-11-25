// src/models/balcar/campanha.model.ts

import { balcarPool } from '../../configs/db'; 
import { FilterService } from '../../services/filterService';

// Mapeia as chaves do frontend (ex: req.query) para as colunas reais
// do banco de dados (com seus aliases).
const campanhaColumnMap: { [key: string]: string } = {
    // --- Identificadores e Datas ---
    idcampanha: 'a.idcampanha',
    datainicio: 'a.datainicio',
    datafim: 'a.datafim',

    // --- Coluna Campanha (Número) ---
    // O SQL retorna 'nrocampanha', mas se o frontend enviar 'campanha' ou 'nrocampanha', ambos funcionam.
    nrocampanha: 'a.nrocampanha',
    campanha: 'a.nrocampanha', // ✅ Adicionado (caso o JSON de saída use 'campanha')

    // --- Relacionamentos (O PULO DO GATO) ---
    
    // Mapeamento "Legado" (caso alguém chame ?reservatorio=...)
    reservatorio: 'b.nome',
    instituicao: 'c.nome',

    // ✅ Mapeamento CORRETO para o Frontend (que usa o alias do JSON)
    // O frontend vê "reservatorio_nome", então ele envia ?reservatorio_nome=...
    // O backend deve traduzir isso para "b.nome" no WHERE.
    reservatorio_nome: 'b.nome', 
    instituicao_nome: 'c.nome',
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 * @param filters Um objeto (ex: req.query) com os filtros.
 */
const buildCampanhaQuery = (filters: any) => {
    // Query base para selecionar os dados (agora com JOINs e aliases)
    const baseQuery = `
        SELECT 
            a.idcampanha,
            a.nrocampanha,
            a.datainicio,
            a.datafim,
            b.idreservatorio,
            b.nome AS reservatorio_nome,
            c.idinstituicao,
            c.nome AS instituicao_nome
        FROM tbcampanha a
        LEFT JOIN tbreservatorio b ON a.idreservatorio = b.idreservatorio
        LEFT JOIN tbinstituicao c ON a.idinstituicao = c.idinstituicao
    `;

    // Query base para contagem
    const countQuery = `
        SELECT COUNT(a.idcampanha)
        FROM tbcampanha a
        LEFT JOIN tbreservatorio b ON a.idreservatorio = b.idreservatorio
        LEFT JOIN tbinstituicao c ON a.idinstituicao = c.idinstituicao
    `;

    // Usa o FilterService para construir a cláusula WHERE
    const { whereClause, params, nextIndex } = FilterService.buildFilter(
        filters,
        campanhaColumnMap, // ✅ Agora usa o mapa completo
        1,
    );

    const whereString = whereClause;
    const values = params;
    const paramIndex = nextIndex;

    // Query principal com ordenação
    const mainQuery = `${baseQuery} ${whereString} ORDER BY a.datainicio DESC, a.idcampanha DESC`;
    
    // Query de contagem
    const countText = `${countQuery} ${whereString}`;

    return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbcampanha (Balcar).
 */
export class CampanhaModel {
    /**
     * Busca uma lista paginada de registros, aplicando filtros.
     */
    public static async findPaginated(options: {
        filters: any;
        page: number;
        limit: number;
    }) {
        const { filters, page, limit } = options;
        const offset = (page - 1) * limit;

        const { mainQuery, countText, values, paramIndex } =
            buildCampanhaQuery(filters);

        const paginatedQuery = `${mainQuery} LIMIT $${paramIndex} OFFSET $${
            paramIndex + 1
        }`;
        const paginatedValues = [...values, limit, offset];

        const [result, countResult] = await Promise.all([
            balcarPool.query(paginatedQuery, paginatedValues),
            balcarPool.query(countText, values),
        ]);

        const total = Number(countResult.rows[0].count);
        
        return { data: result.rows, total };
    }

    /**
     * Busca TODOS os registros (sem paginação).
     */
    public static async findAll(options: { filters: any }): Promise<any[]> {
        const { filters } = options;
        const { mainQuery, values } = buildCampanhaQuery(filters);
        const result = await balcarPool.query(mainQuery, values);
        return result.rows;
    }

    /**
     * Busca um único registro pelo ID.
     */
    public static async findById(id: number): Promise<any | null> {
        const result = await balcarPool.query(
            `
            SELECT
                c.idcampanha,
                c.nrocampanha,
                c.datainicio,
                c.datafim,
                r.idreservatorio,
                r.nome AS reservatorio_nome,
                i.idinstituicao,
                i.nome AS instituicao_nome
            FROM tbcampanha c
            JOIN tbreservatorio r ON c.idreservatorio = r.idreservatorio
            JOIN tbinstituicao i ON c.idinstituicao = i.idinstituicao
            WHERE c.idcampanha = $1
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return null;
        }
        
        return result.rows[0];
    }
}