import { simaPool } from '../../configs/db'; // ATENÇÃO: Importa o simaPool
import { FilterService } from '../../services/filterService';

// Mapeia as chaves do frontend (ex: req.query) para as colunas reais
// do banco de dados (com seus aliases).
const campoTabelaColumnMap = {
    // Chaves de Range (number)
    idcampotabela: 'a.idcampotabela',
    ordem: 'a.ordem',

    // Chaves de Igualdade (string)
    // O frontend pode enviar { sensor: 'Nome do Sensor' }
    sensor: 'b.nome', // Mapeia a chave 'sensor' para 'b.nome'
    nomecampo: 'a.nomecampo',
    rotulo: 'a.rotulo',
    unidademedida: 'a.unidademedida',
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 * @param filters Um objeto (ex: req.query) com os filtros.
 */
const buildCampoTabelaQuery = (filters: any) => {
    // Query base para selecionar os dados
    // O alias 'b.nome' foi padronizado para 'sensor_nome' para o DataFormatterService
    const baseQuery = `
        SELECT
            a.idcampotabela,
            a.idSensor,
            b.nome AS sensor_nome,
            a.nomecampo,
            a.rotulo,
            a.unidademedida,
            a.ordem
        FROM tbcampotabela a
        LEFT JOIN tbsensor b ON a.idSensor = b.idSensor
    `;

    // Query base para contagem (com os mesmos joins e filtros)
    // ISSO CORRIGE O BUG DO CONTROLLER ANTIGO
    const countQuery = `
        SELECT COUNT(a.idcampotabela)
        FROM tbcampotabela a
        LEFT JOIN tbsensor b ON a.idSensor = b.idSensor
    `;

    // Usa o FilterService para construir a cláusula WHERE
    const { whereClause, params, nextIndex } = FilterService.buildFilter(
        filters,
        campoTabelaColumnMap,
        1, // Começa a contagem de parâmetros em $1
    );

    const whereString = whereClause;
    const values = params;
    const paramIndex = nextIndex;

    // Query principal com ordenação (conforme controller original)
    const mainQuery = `${baseQuery} ${whereString} ORDER BY a.nomecampo`;
    // Query de contagem (sem ordenação)
    const countText = `${countQuery} ${whereString}`;

    return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbcampotabela.
 */
export class CampoTabelaModel {
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
            buildCampoTabelaQuery(filters);

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
        const { mainQuery, values } = buildCampoTabelaQuery(filters);
        
        // 2. Executa a query
        const result = await simaPool.query(mainQuery, values);
        
        // Retorna os dados "crus"
        return result.rows;
    }

    /**
     * Busca um único registro pelo ID.
     * (Segue o padrão do findById do abiotico.model.ts, selecionando a.*)
     */
    public static async findById(id: number): Promise<any | null> {
        const result = await simaPool.query(
            `
            SELECT
                a.*, -- Campos principais do tbcampotabela
                b.idSensor AS sensor_id,
                b.nome AS sensor_nome
            FROM tbcampotabela a
            LEFT JOIN tbsensor b ON a.idSensor = b.idSensor
            WHERE a.idcampotabela = $1
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