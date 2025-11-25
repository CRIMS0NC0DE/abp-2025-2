import { furnasPool } from '../../configs/db';
import { FilterService } from '../../services/filterService';

// Mapeia as chaves do frontend (ex: req.query) para as colunas reais
// do banco de dados (com seus aliases).
const reservatorioColumnMap = {
    // Chaves de Range (number)
    idreservatorio: 'a.idreservatorio',
    lat: 'a.lat',
    lng: 'a.lng',

    // Chaves de Igualdade (string)
    // O frontend pode enviar { nome: 'SERRA DA MESA' }
    nome: 'a.nome', 
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 * @param filters Um objeto (ex: req.query) com os filtros.
 */
const buildReservatorioQuery = (filters: any) => {
    // Query base para selecionar os dados
    const baseQuery = `
        SELECT 
            a.idreservatorio, a.nome, a.lat, a.lng
        FROM tbreservatorio AS a
    `;

    // Query base para contagem (para paginação)
    const countQuery = `
        SELECT COUNT(a.idreservatorio)
        FROM tbreservatorio AS a
    `;

    // Usa o FilterService para construir a cláusula WHERE
    const { whereClause, params, nextIndex } = FilterService.buildFilter(
        filters,
        reservatorioColumnMap,
        1, // Começa a contagem de parâmetros em $1
    );

    const whereString = whereClause;
    const values = params;
    const paramIndex = nextIndex;

    // Query principal com ordenação (original ordenava por nome)
    const mainQuery = `${baseQuery} ${whereString} ORDER BY a.nome`;
    // Query de contagem (sem ordenação)
    const countText = `${countQuery} ${whereString}`;

    return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbreservatorio.
 */
export class ReservatorioModel {
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
            buildReservatorioQuery(filters);

        // 2. Adiciona paginação à query
        const paginatedQuery = `${mainQuery} LIMIT $${paramIndex} OFFSET $${
            paramIndex + 1
        }`;
        const paginatedValues = [...values, limit, offset];

        // 3. Executa a query de dados e a de contagem em paralelo
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
        const { mainQuery, values } = buildReservatorioQuery(filters);
        
        // 2. Executa a query
        const result = await furnasPool.query(mainQuery, values);
        
        // Retorna os dados "crus"
        return result.rows;
    }

    /**
     * Busca um único registro pelo ID.
     * (Query simples, baseada no controller original)
     */
    public static async findById(id: number): Promise<any | null> {
        const result = await furnasPool.query(
            `
            SELECT 
                idreservatorio,
                nome,
                lat,
                lng
            FROM tbreservatorio
            WHERE idreservatorio = $1
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