import { balcarPool } from '../../configs/db'; // ATENÇÃO: Importa o balcarPool
import { FilterService } from '../../services/filterService';

// Mapeia as chaves do frontend (ex: req.query) para as colunas reais
// do banco de dados (com seus aliases).
const tabelaCampoColumnMap = {
    // Chaves de Range (number)
    idtabelacampo: 'a.idtabelacampo',
    ordem: 'a.ordem',

    // Chaves de Igualdade (string)
    // O frontend pode enviar { nome: 'Nome do Campo' }
    nome: 'a.nome',
    rotulo: 'a.rotulo',
    unidade: 'a.unidade',
    descricao: 'a.descricao',
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 * @param filters Um objeto (ex: req.query) com os filtros.
 */
const buildTabelaCampoQuery = (filters: any) => {
    // Query base para selecionar os dados (usando alias 'a')
    const baseQuery = `
        SELECT 
            a.idtabelacampo,
            a.nome,
            a.rotulo,
            a.unidade,
            a.descricao,
            a.ordem
        FROM tbtabelacampo a
    `;

    // Query base para contagem (usando alias 'a')
    // ISSO CORRIGE O BUG DO CONTROLLER ANTIGO (COUNT(*) sem filtros)
    const countQuery = `
        SELECT COUNT(a.idtabelacampo)
        FROM tbtabelacampo a
    `;

    // Usa o FilterService para construir a cláusula WHERE
    const { whereClause, params, nextIndex } = FilterService.buildFilter(
        filters,
        tabelaCampoColumnMap,
        1, // Começa a contagem de parâmetros em $1
    );

    const whereString = whereClause;
    const values = params;
    const paramIndex = nextIndex;

    // Query principal com ordenação (conforme controller original)
    const mainQuery = `${baseQuery} ${whereString} ORDER BY a.ordem ASC`;
    // Query de contagem (sem ordenação)
    const countText = `${countQuery} ${whereString}`;

    return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbtabelacampo (Balcar).
 */
export class TabelaCampoModel {
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
            buildTabelaCampoQuery(filters);

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
        const { mainQuery, values } = buildTabelaCampoQuery(filters);
        
        // 2. Executa a query
        const result = await balcarPool.query(mainQuery, values);
        
        // Retorna os dados "crus"
        return result.rows;
    }

    /**
     * Busca um único registro pelo ID.
     */
    public static async findById(id: number): Promise<any | null> {
        const result = await balcarPool.query(
            `
            SELECT 
                idtabelacampo,
                nome,
                rotulo,
                unidade,
                descricao,
                ordem
            FROM tbtabelacampo
            WHERE idtabelacampo = $1
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