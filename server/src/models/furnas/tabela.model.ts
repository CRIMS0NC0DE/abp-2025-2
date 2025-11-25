import { furnasPool } from '../../configs/db';
import { FilterService } from '../../services/filterService';

// Mapeia as chaves do frontend (ex: req.query) para as colunas reais
// do banco de dados (com seus aliases).
const tabelaColumnMap = {
    // Chaves de Range (number)
    idTabela: 'a.idTabela',

    // Chaves de Igualdade (string, boolean)
    // O frontend pode enviar { instituicao: 'Nome da Instituição' }
    instituicao: 'b.nome', // Mapeia a chave 'instituicao' para 'b.nome'
    nome: 'a.nome',
    rotulo: 'a.rotulo',
    excecao: 'a.excecao',
    sitio: 'a.sitio',
    campanha: 'a.campanha',
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 * @param filters Um objeto (ex: req.query) com os filtros.
 */
const buildTabelaQuery = (filters: any) => {
    // Query base para selecionar os dados
    // Inclui aliases (ex: instituicao_nome) para o DataFormatterService
    const baseQuery = `
        SELECT
            a.idTabela,
            a.nome,
            a.rotulo,
            a.excecao,
            a.sitio,
            a.campanha,
            b.idInstituicao,
            b.nome AS instituicao_nome
        FROM tbtabela AS a
        LEFT JOIN tbinstituicao AS b
            ON a.idInstituicao = b.idInstituicao
    `;

    // Query base para contagem (com os mesmos joins e filtros)
    const countQuery = `
        SELECT COUNT(a.idTabela)
        FROM tbtabela AS a
        LEFT JOIN tbinstituicao AS b
            ON a.idInstituicao = b.idInstituicao
    `;

    // Usa o FilterService para construir a cláusula WHERE
    const { whereClause, params, nextIndex } = FilterService.buildFilter(
        filters,
        tabelaColumnMap,
        1, // Começa a contagem de parâmetros em $1
    );

    const whereString = whereClause;
    const values = params;
    const paramIndex = nextIndex;

    // Query principal com ordenação (ex: ORDER BY a.nome)
    // O original não tinha ORDER BY, mas adicionamos por consistência
    const mainQuery = `${baseQuery} ${whereString} ORDER BY a.nome`;
    // Query de contagem (sem ordenação)
    const countText = `${countQuery} ${whereString}`;

    return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbtabela.
 */
export class TabelaModel {
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
            buildTabelaQuery(filters);

        // 2. Adiciona paginação à query
        const paginatedQuery = `${mainQuery} LIMIT $${paramIndex} OFFSET $${
            paramIndex + 1
        }`;
        const paginatedValues = [...values, limit, offset];

        // 3. Executa a query de dados e a de contagem em paralelo
        //    (Usa a contagem com filtros, corrigindo o COUNT(*) do controller antigo)
        const [result, countResult] = await Promise.all([
            furnasPool.query(paginatedQuery, paginatedValues),
            furnasPool.query(countText, values),
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
        const { mainQuery, values } = buildTabelaQuery(filters);
        
        // 2. Executa a query
        const result = await furnasPool.query(mainQuery, values);
        
        // Retorna os dados "crus"
        return result.rows;
    }

    /**
     * Busca um único registro pelo ID.
     * (Retorna todos os campos da tabela e os campos da instituição com alias)
     */
    public static async findById(id: number): Promise<any | null> {
        const result = await furnasPool.query(
            `
            SELECT
                a.*, -- Campos principais da tbtabela
                b.idInstituicao AS instituicao_id,
                b.nome AS instituicao_nome
            FROM tbtabela AS a
            LEFT JOIN tbinstituicao AS b
                ON a.idInstituicao = b.idInstituicao
            WHERE a.idTabela = $1
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