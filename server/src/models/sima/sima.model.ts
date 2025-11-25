import { simaPool } from '../../configs/db'; // ATENÇÃO: Importa o simaPool
import { FilterService } from '../../services/filterService';

// Mapeia as chaves do frontend (ex: req.query) para as colunas reais
// do banco de dados (com seus aliases).
const simaColumnMap = {
    // Chaves de Range (number, date)
    idsima: 'a.idsima',
    datahora: 'a.datahora',
    regno: 'a.regno',
    nofsamples: 'a.nofsamples',
    proamag: 'a.proamag',
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
    bateria: 'a.bateria',
    sonda_temp: 'a.sonda_temp',
    sonda_cond: 'a.sonda_cond',
    sonda_DOsat: 'a.sonda_dosat',
    sonda_DO: 'a.sonda_do',
    sonda_pH: 'a.sonda_ph',
    sonda_NH4: 'a.sonda_nh4',
    sonda_NO3: 'a.sonda_no3',
    sonda_turb: 'a.sonda_turb',
    sonda_chl: 'a.sonda_chl',
    sonda_bateria: 'a.sonda_bateria',
    corr_norte: 'a.corr_norte',
    corr_leste: 'a.corr_leste',
    co2_low: 'a.co2_low',
    co2_high: 'a.co2_high',
    precipitacao: 'a.precipitacao',

    // Chaves de Igualdade (string)
    // O frontend pode enviar { estacao: 'Rotulo da Estacao' }
    estacao: 'b.rotulo', // Mapeia a chave 'estacao' para 'b.rotulo'
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 * @param filters Um objeto (ex: req.query) com os filtros.
 */
const buildSimaQuery = (filters: any) => {
    // Query base para selecionar os dados
    // Usa os aliases 'estacao_rotulo', etc. para o DataFormatterService
    const baseQuery = `
        SELECT 
            a.*,
            b.idestacao,
            b.rotulo AS estacao_rotulo,
            b.lat AS estacao_lat,
            b.lng AS estacao_lng
        FROM tbsima a
        LEFT JOIN tbestacao b ON a.idestacao = b.idestacao
    `;

    // Query base para contagem (com os mesmos joins e filtros)
    // ISSO CORRIGE O BUG DO CONTROLLER ANTIGO
    const countQuery = `
        SELECT COUNT(a.idsima)
        FROM tbsima a
        LEFT JOIN tbestacao b ON a.idestacao = b.idestacao
    `;

    // Usa o FilterService para construir a cláusula WHERE
    const { whereClause, params, nextIndex } = FilterService.buildFilter(
        filters,
        simaColumnMap,
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
 * Classe Model para encapsular o acesso a dados da tbsima.
 */
export class SimaModel {
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
            buildSimaQuery(filters);

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
        const { mainQuery, values } = buildSimaQuery(filters);
        
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
            FROM tbsima a
            LEFT JOIN tbestacao b ON a.idestacao = b.idestacao
            WHERE a.idsima = $1
            `,
            [id],
        );

        if (result.rows.length === 0) {
            return null;
        }
        
        // Retorna o primeiro registro "cru"
        return result.rows[0];
    }

    /**
     * Busca a lista de todas as estações cadastradas.
     * Usado para preencher filtros no frontend.
     */
    public static async findAllStations() {
        // Buscamos direto da tbestacao, que é leve e rápida.
        // Ordenamos pelo rótulo para ficar alfabético no dropdown.
        const query = `
            SELECT idestacao, rotulo, lat, lng 
            FROM tbestacao 
            ORDER BY rotulo ASC
        `;
        
        const result = await simaPool.query(query);
        return result.rows;
    }

    /**
     * Realiza a agregação de dados para gráficos.
     * Agrupa por hora, dia ou mês e calcula médias/máximas/mínimas.
     */
    public static async getAnalyticsData(options: {
        stationId: string | number;
        startDate: string;
        endDate: string;
        granularity: 'hour' | 'day' | 'month';
    }) {
        const { stationId, startDate, endDate, granularity } = options;

        // Validação de segurança para evitar injeção de SQL na granularidade
        // Se alguém mandar 'drop table', cairá no 'day' por padrão.
        const validGranularities = ['hour', 'day', 'month', 'year'];
        const safeGranularity = validGranularities.includes(granularity) ? granularity : 'day';

        // A Query Mágica
        // 1. DATE_TRUNC: Arredonda a data (ex: 2016-12-03 14:35 -> 2016-12-03 00:00 se for 'day')
        // 2. ROUND(AVG(...)): Calcula média e arredonda para 2 casas decimais
        // 3. SUM(precipitacao): Chuva se soma, não se faz média
        const query = `
            SELECT 
                to_char(DATE_TRUNC($1, datahora), 'YYYY-MM-DD"T"HH24:MI:SS') as label,
                
                -- Temperaturas (Médias, Máximas e Mínimas)
                ROUND(AVG(tempar)::numeric, 2) as avg_tempar,
                MAX(tempar) as max_tempar,
                MIN(tempar) as min_tempar,
                
                ROUND(AVG(tempag1)::numeric, 2) as avg_temp_agua,
                
                -- Umidade e Pressão
                ROUND(AVG(ur)::numeric, 2) as avg_ur,
                ROUND(AVG(pressatm)::numeric, 2) as avg_pressao,
                
                -- Vento e Radiação
                ROUND(AVG(intensvt)::numeric, 2) as avg_vento,
                ROUND(AVG(radincid)::numeric, 2) as avg_radiacao,

                -- Chuva (Soma acumulada no período)
                COALESCE(SUM(precipitacao), 0) as total_chuva

            FROM tbsima
            WHERE 
                idestacao = $2 
                AND datahora >= $3 
                AND datahora <= $4
            GROUP BY 1
            ORDER BY 1 ASC
        `;

        const values = [safeGranularity, stationId, startDate, endDate];
        
        const result = await simaPool.query(query, values);
        return result.rows;
    }
}