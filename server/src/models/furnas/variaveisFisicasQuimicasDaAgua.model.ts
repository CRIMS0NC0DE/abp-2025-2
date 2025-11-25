import { furnasPool } from '../../configs/db';
import { FilterService } from '../../services/filterService';

// Mapeia as chaves do frontend (ex: req.query) para as colunas reais
// do banco de dados (com seus aliases).
const variaveisColumnMap = {
    // Chaves de Range (number, date)
    idVariaveisFisicasQuimicasDaAgua: 'a.idVariaveisFisicasQuimicasDaAgua',
    dataMedida: 'a.dataMedida',
    profundidade: 'a.profundidade',
    secchi: 'a.secchi',
    batimetria: 'a.batimetria',
    f: 'a.f',
    cl: 'a.cl',
    nno3: 'a.nno3',
    ppo43: 'a.ppo43',
    sso42: 'a.sso42',
    li: 'a.li',
    na: 'a.na',
    nnh4: 'a.nnh4',
    k: 'a.k',
    mg: 'a.mg',
    ca: 'a.ca',
    clorofila: 'a.clorofila',
    feofitina: 'a.feofitina',
    turbidez: 'a.turbidez',
    nt: 'a.nt',
    pt: 'a.pt',
    tdc: 'a.tdc',

    // Chaves de Igualdade (string)
    horaMedida: 'a.horaMedida',
    sitio: 'c.nome', // Mapeia a chave 'sitio' para 'c.nome'
    campanha: 'b.nroCampanha', // Mapeia 'campanha' para 'b.nroCampanha'
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 * @param filters Um objeto (ex: req.query) com os filtros.
 */
const buildVariaveisQuery = (filters: any) => {
    // Query base para selecionar os dados
    // Inclui aliases (sitio_nome, etc.) para o DataFormatterService
    const baseQuery = `
        SELECT 
            a.idVariaveisFisicasQuimicasDaAgua,
            a.dataMedida, a.horaMedida, a.profundidade, a.secchi,
            a.batimetria, a.f, a.cl, a.nno3, a.ppo43, a.sso42,
            a.li, a.na, a.nnh4, a.k, a.mg, a.ca,
            a.clorofila, a.feofitina, a.turbidez, a.nt, a.pt, a.tdc,
            b.idCampanha, b.nroCampanha,
            c.idSitio, c.nome AS sitio_nome, c.lat AS sitio_lat, c.lng AS sitio_lng
        FROM tbvariaveisfisicasquimicasdaagua AS a
        LEFT JOIN tbcampanha AS b ON a.idCampanha = b.idCampanha
        LEFT JOIN tbsitio AS c ON a.idSitio = c.idSitio
    `;

    // Query base para contagem (com os mesmos joins e filtros)
    // ISSO CORRIGE O BUG DO CONTROLLER ANTIGO
    const countQuery = `
        SELECT COUNT(a.idVariaveisFisicasQuimicasDaAgua)
        FROM tbvariaveisfisicasquimicasdaagua AS a
        LEFT JOIN tbcampanha AS b ON a.idCampanha = b.idCampanha
        LEFT JOIN tbsitio AS c ON a.idSitio = c.idSitio
    `;

    // Usa o FilterService para construir a cláusula WHERE
    const { whereClause, params, nextIndex } = FilterService.buildFilter(
        filters,
        variaveisColumnMap,
        1, // Começa a contagem de parâmetros em $1
    );

    const whereString = whereClause;
    const values = params;
    const paramIndex = nextIndex;

    // Query principal com ordenação (conforme controller original)
    const mainQuery = `${baseQuery} ${whereString} ORDER BY a.idVariaveisFisicasQuimicasDaAgua`;
    // Query de contagem (sem ordenação)
    const countText = `${countQuery} ${whereString}`;

    return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbvariaveisfisicasquimicasdaagua.
 */
export class VariaveisFisicasQuimicasDaAguaModel {
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
            buildVariaveisQuery(filters);

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
        const { mainQuery, values } = buildVariaveisQuery(filters);
        
        // 2. Executa a query
        const result = await furnasPool.query(mainQuery, values);
        
        // Retorna os dados "crus"
        return result.rows;
    }

    /**
     * Busca um único registro pelo ID, com todos os joins necessários
     * para a visualização de detalhe (seguindo o padrão do abiotico.model.ts).
     */
    public static async findById(id: number): Promise<any | null> {
        // Esta query é mais rica, seguindo o padrão do findById do abioticoColuna
        const result = await furnasPool.query(
            `
            SELECT 
                a.*, -- Campos principais da tabela
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
                d.nome AS reservatorio_nome -- Join adicional para info completa
            FROM tbvariaveisfisicasquimicasdaagua AS a
            LEFT JOIN tbcampanha AS b ON a.idCampanha = b.idCampanha
            LEFT JOIN tbsitio AS c ON a.idSitio = c.idSitio
            LEFT JOIN tbreservatorio AS d ON b.idreservatorio = d.idreservatorio
            WHERE a.idVariaveisFisicasQuimicasDaAgua = $1
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