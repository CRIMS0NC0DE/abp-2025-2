import { balcarPool } from '../../configs/db'; // ATENÇÃO: Importa o balcarPool
import { FilterService } from '../../services/filterService';

// Mapeia as chaves do frontend (ex: req.query) para as colunas reais
// do banco de dados (com seus aliases).
const sitioColumnMap = {
    // Chaves de Range (number)
    idsitio: 'a.idsitio',
    lat: 'a.lat',
    lng: 'a.lng',

    // Chaves de Igualdade (string)
    // O frontend pode enviar { nome: 'Nome Sitio' } ou { reservatorio: 'Nome Reservatorio' }
    nome: 'a.nome',
    descricao: 'a.descricao',
    reservatorio: 'b.nome', // Mapeia a chave 'reservatorio' para 'b.nome'
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 * @param filters Um objeto (ex: req.query) com os filtros.
 */
const buildSitioQuery = (filters: any) => {
    // Query base para selecionar os dados (agora com JOIN e aliases)
    const baseQuery = `
        SELECT 
            a.idsitio,
            a.idreservatorio,
            a.nome,
            a.lat,
            a.lng,
            a.descricao,
            b.nome AS reservatorio_nome 
        FROM tbsitio a
        LEFT JOIN tbreservatorio b ON a.idreservatorio = b.idreservatorio
    `;

    // Query base para contagem (com os mesmos joins e filtros)
    // ISSO CORRIGE O BUG DO CONTROLLER ANTIGO (COUNT(*) sem filtros)
    const countQuery = `
        SELECT COUNT(a.idsitio)
        FROM tbsitio a
        LEFT JOIN tbreservatorio b ON a.idreservatorio = b.idreservatorio
    `;

    // Usa o FilterService para construir a cláusula WHERE
    const { whereClause, params, nextIndex } = FilterService.buildFilter(
        filters,
        sitioColumnMap,
        1, // Começa a contagem de parâmetros em $1
    );

    const whereString = whereClause;
    const values = params;
    const paramIndex = nextIndex;

    // Query principal com ordenação (conforme controller original)
    const mainQuery = `${baseQuery} ${whereString} ORDER BY a.nome ASC`;
    // Query de contagem (sem ordenação)
    const countText = `${countQuery} ${whereString}`;

    return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbsitio (Balcar).
 */
export class SitioModel {
    /**
     * Busca uma lista paginada de registros, aplicando filtros.
     * Retorna tanto os dados da página quanto a contagem total de registros.
     */
    public static async findPaginated(options: {
        filters: any;
        page: number;
        limit: number;
    }) {
        const { filters, page, limit } = options;
        const offset = (page - 1) * limit;

        // 1. Constrói a query base com filtros
        const { mainQuery, countText, values, paramIndex } =
            buildSitioQuery(filters);

        // 2. Adiciona paginação à query
        const paginatedQuery = `${mainQuery} LIMIT $${paramIndex} OFFSET $${
            paramIndex + 1
        }`;
        const paginatedValues = [...values, limit, offset];

        // 3. Executa a query de dados e a de contagem em paralelo
        //    (Usa a contagem com filtros, corrigindo o COUNT(*) do controller antigo)
        const [result, countResult] = await Promise.all([
            balcarPool.query(paginatedQuery, paginatedValues),
            balcarPool.query(countText, values),
        ]);

        const total = Number(countResult.rows[0].count);
        
        // Retorna os dados "crus" e a contagem
        return { data: result.rows, total };
    }

    /**
     * Busca TODOS os registros que correspondem aos filtros, sem paginação.
     * Ideal para exportações (range = 'all').
     */
    public static async findAll(options: { filters: any }): Promise<any[]> {
        const { filters } = options;
        
        // 1. Constrói a query base (ignora contagem e paginação)
        const { mainQuery, values } = buildSitioQuery(filters);
        
        // 2. Executa a query
        const result = await balcarPool.query(mainQuery, values);
        
        // Retorna os dados "crus"
        return result.rows;
    }

    /**
     * Busca um único registro pelo ID.
     * (Adiciona o JOIN para seguir o padrão de 'detalhe' dos exemplos)
     */
    public static async findById(id: number): Promise<any | null> {
        const result = await balcarPool.query(
            `
            SELECT 
                a.*, -- Campos principais do sitio
                b.idreservatorio AS reservatorio_id,
                b.nome AS reservatorio_nome
            FROM tbsitio a
            LEFT JOIN tbreservatorio b ON a.idreservatorio = b.idreservatorio
            WHERE a.idsitio = $1
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return null;
        }
        
        // Retorna o primeiro registro "cru"
        return result.rows[0];
    }
}