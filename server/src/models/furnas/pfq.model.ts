import { furnasPool } from '../../configs/db';
import { FilterService } from '../../services/filterService';

// Mapeia as chaves do frontend (ex: req.query) para as colunas reais
// do banco de dados (com seus aliases).
const pfqColumnMap = {
    // Chaves de Range (number/date)
    idPFQ: 'a.idPFQ',
    dataMedida: 'a.dataMedida',
    profundidade: 'a.profundidade',
    batimetria: 'a.batimetria',
    tempar: 'a.tempar',
    tempagua: 'a.tempagua',
    'do': 'a._do', // Frontend envia 'do', mapeia para 'a._do'
    ph: 'a.ph',
    redox: 'a.redox',
    vento: 'a.vento',

    // Chaves de Igualdade (string)
    campanha: 'b.nrocampanha',
    sitio: 'c.nome',
    horaMedida: 'a.horaMedida',
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 * @param filters Um objeto (ex: req.query) com os filtros.
 */
const buildPfqQuery = (filters: any) => {
    // Query base para selecionar os dados (com colunas para o formatListRow)
    const baseQuery = `
        SELECT 
            a.idPFQ, a.dataMedida, a.horaMedida, a.profundidade,
            a.batimetria, a.tempar, a.tempagua, a._do, a.ph,
            a.redox, a.vento,
            b.idCampanha, b.nroCampanha,
            c.idSitio, c.nome AS sitio_nome, c.lat AS sitio_lat, c.lng AS sitio_lng
        FROM tbpfq AS a
        LEFT JOIN tbcampanha AS b ON a.idCampanha = b.idCampanha
        LEFT JOIN tbsitio AS c ON a.idSitio = c.idSitio
    `;

    // Query base para contagem (para paginação)
    const countQuery = `
        SELECT COUNT(a.idPFQ)
        FROM tbpfq AS a
        LEFT JOIN tbcampanha AS b ON a.idCampanha = b.idCampanha
        LEFT JOIN tbsitio AS c ON a.idSitio = c.idSitio
    `;

    // Usa o FilterService para construir a cláusula WHERE
    const { whereClause, params, nextIndex } = FilterService.buildFilter(
        filters,
        pfqColumnMap,
        1, // Começa a contagem de parâmetros em $1
    );

    const whereString = whereClause;
    const values = params;
    const paramIndex = nextIndex;

    // Query principal com ordenação
    const mainQuery = `${baseQuery} ${whereString} ORDER BY a.dataMedida DESC, a.horaMedida DESC`;
    // Query de contagem (sem ordenação)
    const countText = `${countQuery} ${whereString}`;

    return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbpfq.
 */
export class PfqModel {
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
            buildPfqQuery(filters);

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
        const { mainQuery, values } = buildPfqQuery(filters);
        
        // 2. Executa a query
        const result = await furnasPool.query(mainQuery, values);
        
        // Retorna os dados "crus"
        return result.rows;
    }

    /**
     * Busca um único registro pelo ID, com todos os joins necessários
     * para a visualização de detalhe (seguindo o padrão do exemplo).
     */
    public static async findById(id: number): Promise<any | null> {
        // Query com joins completos para a tela de detalhe
        const result = await furnasPool.query(
            `
            SELECT 
                a.*, 
                b.idCampanha,
                b.nroCampanha,
                b.datainicio AS campanha_datainicio,
                b.datafim AS campanha_datafim,
                b.idreservatorio,
                c.idSitio,
                c.nome AS sitio_nome,
                c.descricao AS sitio_descricao,
                c.lat AS sitio_lat,
                c.lng AS sitio_lng,
                d.nome AS reservatorio_nome
            FROM tbpfq AS a
            LEFT JOIN tbcampanha AS b
                ON a.idCampanha = b.idCampanha
            LEFT JOIN tbsitio AS c
                ON a.idSitio = c.idSitio
            LEFT JOIN tbreservatorio AS d
                ON b.idreservatorio = d.idreservatorio
            WHERE a.idPFQ = $1
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