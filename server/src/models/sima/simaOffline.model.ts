import { simaPool } from '../../configs/db'; // ATENÇÃO: Importa o simaPool
import { FilterService } from '../../services/filterService';

// Mapeia as chaves do frontend (ex: req.query) para as colunas reais
// do banco de dados (com seus aliases).
const simaOfflineColumnMap = {
    // Chaves de Range (number, date)
    idsimaoffline: 'a.idsimaoffline',
    datahora: 'a.datahora',
    dirvt: 'a.dirvt',
    intensvt: 'a.intensvt',
    u_vel: 'a.u_vel',
    v_vel: 'a.v_vel',
    tempag1: 'a.tempag1',
    tempag2: 'a.tempag2',
    tempag3: 'a.tempag3',
    tempag4: 'a.tempag4',
    tempar: 'a.tempar',
    ur: 'a.ur',
    tempar_r: 'a.tempar_r',
    pressatm: 'a.pressatm',
    radincid: 'a.radincid',
    radrefl: 'a.radrefl',
    sonda_temp: 'a.sonda_temp',
    sonda_cond: 'a.sonda_cond',
    sonda_do: 'a.sonda_do',
    sonda_ph: 'a.sonda_ph',
    sonda_nh4: 'a.sonda_nh4',
    sonda_no3: 'a.sonda_no3',
    sonda_turb: 'a.sonda_turb',
    sonda_chl: 'a.sonda_chl',
    sonda_bateria: 'a.sonda_bateria',
    corr_norte: 'a.corr_norte',
    corr_leste: 'a.corr_leste',
    bateriapainel: 'a.bateriapainel',
    
    // Chaves de Igualdade (string)
    fonteradiometro: 'a.fonteradiometro',
    estacao: 'b.rotulo', // Mapeia a chave 'estacao' para 'b.rotulo'
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 * @param filters Um objeto (ex: req.query) com os filtros.
 */
const buildSimaOfflineQuery = (filters: any) => {
    // Query base para selecionar os dados
    // Usa os aliases 'estacao_rotulo', etc. para o DataFormatterService
    const baseQuery = `
        SELECT 
            a.*,
            b.idestacao,
            b.rotulo AS estacao_rotulo,
            b.lat AS estacao_lat,
            b.lng AS estacao_lng
        FROM tbsimaoffline a
        LEFT JOIN tbestacao b ON a.idestacao = b.idestacao
    `;

    // Query base para contagem (com os mesmos joins e filtros)
    // ISSO CORRIGE O BUG DO CONTROLLER ANTIGO
    const countQuery = `
        SELECT COUNT(a.idsimaoffline)
        FROM tbsimaoffline a
        LEFT JOIN tbestacao b ON a.idestacao = b.idestacao
    `;

    // Usa o FilterService para construir a cláusula WHERE
    const { whereClause, params, nextIndex } = FilterService.buildFilter(
        filters,
        simaOfflineColumnMap,
        1, // Começa a contagem de parâmetros em $1
    );

    const whereString = whereClause;
    const values = params;
    const paramIndex = nextIndex;

    // Query principal com ordenação (conforme controller original)
    const mainQuery = `${baseQuery} ${whereString} ORDER BY a.datahora DESC`;
    // Query de contagem (sem ordenação)
    const countText = `${countQuery} ${whereString}`;

    return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbsimaoffline.
 */
export class SimaOfflineModel {
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
            buildSimaOfflineQuery(filters);

        // 2. Adiciona paginação à query
        const paginatedQuery = `${mainQuery} LIMIT $${paramIndex} OFFSET $${
            paramIndex + 1
        }`;
        const paginatedValues = [...values, limit, offset];

        // 3. Executa a query de dados e a de contagem em paralelo
        //    (Usa a contagem com filtros, corrigindo o COUNT(*) do controller antigo)
        const [result, countResult] = await Promise.all([
            simaPool.query(paginatedQuery, paginatedValues),
            simaPool.query(countText, values),
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
        const { mainQuery, values } = buildSimaOfflineQuery(filters);
        
        // 2. Executa a query
        const result = await simaPool.query(mainQuery, values);
        
        // Retorna os dados "crus"
        return result.rows;
    }

    /**
     * Busca um único registro pelo ID.
     * (Mantém a query detalhada do controller original)
     */
    public static async findById(id: number): Promise<any | null> {
        const result = await simaPool.query(
            `
            SELECT 
                a.*,
                b.idestacao,
                b.rotulo AS estacao_rotulo,
                b.lat AS estacao_lat,
                b.lng AS estacao_lng,
                b.inicio AS estacao_inicio,
                b.fim AS estacao_fim
            FROM tbsimaoffline a
            LEFT JOIN tbestacao b ON a.idestacao = b.idestacao 
            WHERE a.idsimaoffline = $1
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