import { balcarPool } from '../../configs/db';
import { FilterService } from '../../services/filterService';

// Mapeia as chaves do frontend para as colunas reais do banco
const fluxoInpeColumnMap = {
    // Chaves de Range (number, date)
    idfluxoinpe: 'a.idfluxoinpe',
    datamedida: 'a.datamedida',
    ch4: 'a.ch4',
    batimetria: 'a.batimetria',
    tempar: 'a.tempar',
    tempcupula: 'a.tempcupula',
    tempaguasubsuperficie: 'a.tempaguasubsuperficie',
    tempaguameio: 'a.tempaguameio',
    tempaguafundo: 'a.tempaguafundo',
    phsubsuperficie: 'a.phsubsuperficie',
    phmeio: 'a.phmeio',
    phfundo: 'a.phfundo',
    orpsubsuperficie: 'a.orpsubsuperficie',
    orpmeio: 'a.orpmeio',
    orpfundo: 'a.orpfundo',
    condutividadesubsuperficie: 'a.condutividadesubsuperficie',
    condutividademeio: 'a.condutividademeio',
    condutividadefundo: 'a.condutividadefundo',
    odsubsuperficie: 'a.odsubsuperficie',
    odmeio: 'a.odmeio',
    odfundo: 'a.odfundo',
    tsdsubsuperficie: 'a.tsdsubsuperficie',
    tsdmeio: 'a.tsdmeio',
    tsdfundo: 'a.tsdfundo',

    // Chaves de Igualdade (string)
    sitio: 'c.nome', 
    campanha: 'b.nrocampanha', 
};

/**
 * Constrói a query de listagem e contagem dinamicamente.
 */
const buildFluxoInpeQuery = (filters: any) => {
    const baseQuery = `
        SELECT 
            a.idfluxoinpe, a.datamedida, a.ch4, a.batimetria, a.tempar,
            a.tempcupula, a.tempaguasubsuperficie, a.tempaguameio, a.tempaguafundo,
            a.phsubsuperficie, a.phmeio, a.phfundo,
            a.orpsubsuperficie, a.orpmeio, a.orpfundo,
            a.condutividadesubsuperficie, a.condutividademeio, a.condutividadefundo,
            a.odsubsuperficie, a.odmeio, a.odfundo,
            a.tsdsubsuperficie, a.tsdmeio, a.tsdfundo,
            b.idcampanha, b.nrocampanha,
            c.idsitio, c.nome AS sitio_nome, c.lat AS sitio_lat, c.lng AS sitio_lng
        FROM tbfluxoinpe AS a
        LEFT JOIN tbcampanha AS b ON a.idcampanha = b.idcampanha
        LEFT JOIN tbsitio AS c ON a.idsitio = c.idsitio
    `;

    const countQuery = `
        SELECT COUNT(a.idfluxoinpe)
        FROM tbfluxoinpe AS a
        LEFT JOIN tbcampanha AS b ON a.idcampanha = b.idcampanha
        LEFT JOIN tbsitio AS c ON a.idsitio = c.idsitio
    `;

    const { whereClause, params, nextIndex } = FilterService.buildFilter(
        filters,
        fluxoInpeColumnMap,
        1
    );

    const mainQuery = `${baseQuery} ${whereClause} ORDER BY a.datamedida DESC, a.idfluxoinpe DESC`;
    const countText = `${countQuery} ${whereClause}`;

    return { mainQuery, countText, values: params, paramIndex: nextIndex };
};

export class FluxoInpeModel {
    /**
     * Busca lista paginada com filtros.
     */
    public static async findPaginated(options: { filters: any; page: number; limit: number; }) {
        const { filters, page, limit } = options;
        const offset = (page - 1) * limit;

        const { mainQuery, countText, values, paramIndex } = buildFluxoInpeQuery(filters);

        const paginatedQuery = `${mainQuery} LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
        const paginatedValues = [...values, limit, offset];

        const [result, countResult] = await Promise.all([
            balcarPool.query(paginatedQuery, paginatedValues),
            balcarPool.query(countText, values),
        ]);

        return { data: result.rows, total: Number(countResult.rows[0].count) };
    }

    /**
     * Busca todos os registros (para exportação).
     */
    public static async findAll(options: { filters: any }) {
        const { filters } = options;
        const { mainQuery, values } = buildFluxoInpeQuery(filters);
        const result = await balcarPool.query(mainQuery, values);
        return result.rows;
    }

    /**
     * Busca um registro por ID.
     */
    public static async findById(id: number) {
        const result = await balcarPool.query(
            `
            SELECT 
                a.*,
                b.idcampanha, b.nrocampanha, b.datainicio AS campanha_datainicio, b.datafim AS campanha_datafim,
                c.idsitio, c.nome AS sitio_nome, c.lat AS sitio_lat, c.lng AS sitio_lng, c.descricao AS sitio_descricao,
                d.idreservatorio, d.nome AS reservatorio_nome
            FROM tbfluxoinpe AS a
            LEFT JOIN tbcampanha AS b ON a.idcampanha = b.idcampanha
            LEFT JOIN tbsitio AS c ON a.idsitio = c.idsitio
            LEFT JOIN tbreservatorio AS d ON b.idreservatorio = d.idreservatorio
            WHERE a.idfluxoinpe = $1
            `,
            [id]
        );

        if (result.rows.length === 0) return null;
        return result.rows[0];
    }

    /**
     * Realiza a agregação de dados para gráficos comparativos.
     * Agrupa por Reservatório (Macro) ou Sítio (Micro).
     */
    public static async getAnalyticsData(options: {
        metric: string;
        groupBy: 'reservatorio' | 'sitio';
        filterReservatorioId?: number;
        campanhaId?: number;
    }) {
        const { metric, groupBy, filterReservatorioId, campanhaId } = options;

        // 1. Whitelist de métricas permitidas (Segurança contra SQL Injection)
        const allowedMetrics = [
            'ch4', 'tempar', 'tempaguasubsuperficie', 'tempaguameio', 'tempaguafundo',
            'phsubsuperficie', 'phmeio', 'phfundo',
            'orpsubsuperficie', 'condutividadesubsuperficie', 
            'odsubsuperficie', 'batimetria', 'tsdsubsuperficie'
        ];
        
        if (!allowedMetrics.includes(metric)) {
            throw new Error(`Métrica inválida ou não permitida para análise: ${metric}`);
        }

        // 2. Construção da Query
        let selectLabel = '';
        let groupByClause = '';
        let whereClauses: string[] = [];
        let params: any[] = [];
        let paramCounter = 1;

        // Base Joins: Sempre fazemos todos os joins para garantir acesso aos nomes
        const joinClause = `
            LEFT JOIN tbcampanha b ON a.idcampanha = b.idcampanha 
            LEFT JOIN tbreservatorio r ON b.idreservatorio = r.idreservatorio 
            LEFT JOIN tbsitio s ON a.idsitio = s.idsitio 
        `;

        if (groupBy === 'reservatorio') {
            // Agrupar por Reservatório
            selectLabel = 'r.nome AS label, r.idreservatorio AS id';
            groupByClause = 'GROUP BY r.idreservatorio, r.nome';
        } else {
            // Agrupar por Sítio
            selectLabel = 's.nome AS label, s.idsitio AS id';
            groupByClause = 'GROUP BY s.idsitio, s.nome';
        }

        // 3. Filtros

        // Filtro de Drill-down (Ex: ver apenas sítios do Reservatório de Furnas)
        if (filterReservatorioId) {
            whereClauses.push(`r.idreservatorio = $${paramCounter++}`);
            params.push(filterReservatorioId);
        }

        // Filtro de Campanha (Ex: Apenas Campanha 1)
        if (campanhaId) {
            whereClauses.push(`b.idcampanha = $${paramCounter++}`);
            params.push(campanhaId);
        }

        // Filtro essencial: Ignorar nulos na métrica escolhida para não distorcer a média
        whereClauses.push(`a.${metric} IS NOT NULL`);

        const whereString = whereClauses.length > 0 
            ? 'WHERE ' + whereClauses.join(' AND ') 
            : '';

        // 4. Montagem Final
        const query = `
            SELECT 
                ${selectLabel},
                ROUND(AVG(a.${metric})::numeric, 2) as media,
                ROUND(STDDEV(a.${metric})::numeric, 2) as desvio_padrao,
                MIN(a.${metric}) as minimo,
                MAX(a.${metric}) as maximo,
                COUNT(a.${metric}) as contagem
            FROM tbfluxoinpe a
            ${joinClause}
            ${whereString}
            ${groupByClause}
            ORDER BY label ASC
        `;

        const result = await balcarPool.query(query, params);
        return result.rows;
    }
}