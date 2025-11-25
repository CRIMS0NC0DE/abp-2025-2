import { furnasPool } from '../../configs/db';
import { FilterService } from '../../services/filterService';

// Mapeia as chaves do frontend (filtros) para as colunas reais do banco de dados.
const campanhaColumnMap = {
    // Chaves de Range (type: 'number' ou 'date')
    idcampanha: 'a.idcampanha',
    datainicio: 'a.datainicio',
    datafim: 'a.datafim',

    // Chaves de Igualdade (type: 'string')
    nrocampanha: 'a.nrocampanha',
    instituicao: 'b.nome', // <-- Filtra por 'b.nome'
    reservatorio: 'c.nome', // <-- Filtra por 'c.nome'
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 * @param filters Um objeto (ex: req.query) com os filtros.
 */
const buildCampanhaQuery = (filters: any) => {
    // Query base para selecionar os dados (baseado no getAll original)
    const baseQuery = `
        SELECT 
            a.idcampanha, a.nrocampanha, a.datainicio, a.datafim,
            b.idinstituicao, b.nome AS instituicao_nome,
            c.idreservatorio, c.nome AS reservatorio_nome,
            c.lat AS reservatorio_lat, c.lng AS reservatorio_lng
        FROM tbcampanha AS a
        LEFT JOIN tbinstituicao AS b ON a.idinstituicao = b.idinstituicao
        LEFT JOIN tbreservatorio AS c ON a.idreservatorio = c.idreservatorio
    `;

    // Query base para contagem (DEVE ter os mesmos JOINs para filtros)
    const countQuery = `
        SELECT COUNT(a.idcampanha)
        FROM tbcampanha AS a
        LEFT JOIN tbinstituicao AS b ON a.idinstituicao = b.idinstituicao
        LEFT JOIN tbreservatorio AS c ON a.idreservatorio = c.idreservatorio
    `;

    // Usa o FilterService para construir a cláusula WHERE
    const { whereClause, params, nextIndex } = FilterService.buildFilter(
        filters,
        campanhaColumnMap,
        1, // Começa a contagem de parâmetros em $1
    );

    const whereString = whereClause;
    const values = params;
    const paramIndex = nextIndex;

    // Query principal com ordenação (do getAll original)
    const mainQuery = `${baseQuery} ${whereString} ORDER BY c.nome, a.nrocampanha`;
    // Query de contagem (sem ordenação)
    const countText = `${countQuery} ${whereString}`;

    return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbcampanha.
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

        // 1. Constrói a query base com filtros
        const { mainQuery, countText, values, paramIndex } =
            buildCampanhaQuery(filters);

        // 2. Adiciona paginação à query
        const paginatedQuery = `${mainQuery} LIMIT $${paramIndex} OFFSET $${
            paramIndex + 1
        }`;
        const paginatedValues = [...values, limit, offset];

        // 3. Executa a query de dados e a de contagem em paralelo
        //    (Nota: A contagem agora usa os filtros, corrigindo o original)
        const [result, countResult] = await Promise.all([
            furnasPool.query(paginatedQuery, paginatedValues),
            furnasPool.query(countText, values), // Contagem total com filtros
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
        const { mainQuery, values } = buildCampanhaQuery(filters);
        
        // 2. Executa a query
        const result = await furnasPool.query(mainQuery, values);
        
        // Retorna os dados "crus"
        return result.rows;
    }

    /**
     * Busca um único registro pelo ID, com os joins necessários
     * para a visualização de detalhe.
     */
    public static async findById(id: number): Promise<any | null> {
        // Query baseada no getById original
        const result = await furnasPool.query(
            `
            SELECT 
                a.idcampanha, a.nrocampanha, a.datainicio, a.datafim,
                b.idinstituicao, b.nome AS instituicao_nome,
                c.idreservatorio, c.nome AS reservatorio_nome,
                c.lat AS reservatorio_lat, c.lng AS reservatorio_lng
            FROM tbcampanha AS a
            LEFT JOIN tbinstituicao AS b 
                ON a.idinstituicao = b.idinstituicao
            LEFT JOIN tbreservatorio AS c 
                ON a.idreservatorio = c.idreservatorio
            WHERE a.idcampanha = $1
            `,
            [id],
        );

        if (result.rows.length === 0) {
            return null;
        }
        
        // Retorna o primeiro registro "cru"
        return result.rows[0];
    }
}