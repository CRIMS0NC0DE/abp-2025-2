import { furnasPool } from '../../configs/db';
import { FilterService } from '../../services/filterService';

// Mapeia as chaves do frontend (filtros) para as colunas reais do banco de dados.
const campanhaPorTabelaColumnMap = {
    // Chaves de Range (type: 'number')
    idCampanha: 'a.idCampanha',
    idTabela: 'a.idTabela',

    // Chaves de Igualdade (type: 'string')
    campanha: 'b.nroCampanha', // Filtra por 'b.nroCampanha'
    tabela: 'c.nome',       // Filtra por 'c.nome'
    rotulo: 'c.rotulo',       // Filtra por 'c.rotulo'
};

/**
 * Constrói a query de listagem e contagem dinamicamente, aplicando filtros.
 * @param filters Um objeto (ex: req.query) com os filtros.
 */
const buildCampanhaPorTabelaQuery = (filters: any) => {
    // Query base para selecionar os dados (baseado no getAll original)
    const baseQuery = `
        SELECT
            a.idCampanha, a.idTabela,
            b.idCampanha AS idcampanha, b.nroCampanha,
            c.idTabela AS idtabela, c.nome AS tabela_nome, c.rotulo AS tabela_rotulo
        FROM tbcampanhaportabela a
        LEFT JOIN tbcampanha b ON a.idCampanha = b.idCampanha
        LEFT JOIN tbtabela c ON a.idTabela = c.idTabela
    `;

    // Query base para contagem (DEVE ter os mesmos JOINs para filtros)
    const countQuery = `
        SELECT COUNT(a.idCampanha)
        FROM tbcampanhaportabela a
        LEFT JOIN tbcampanha b ON a.idCampanha = b.idCampanha
        LEFT JOIN tbtabela c ON a.idTabela = c.idTabela
    `;

    // Usa o FilterService para construir a cláusula WHERE
    const { whereClause, params, nextIndex } = FilterService.buildFilter(
        filters,
        campanhaPorTabelaColumnMap,
        1, // Começa a contagem de parâmetros em $1
    );

    const whereString = whereClause;
    const values = params;
    const paramIndex = nextIndex;

    // Query principal com ordenação (do getAll original)
    const mainQuery = `${baseQuery} ${whereString} ORDER BY b.nroCampanha DESC, c.nome`;
    // Query de contagem (sem ordenação)
    const countText = `${countQuery} ${whereString}`;

    return { mainQuery, countText, values, paramIndex };
};

/**
 * Classe Model para encapsular o acesso a dados da tbcampanhaportabela.
 */
export class CampanhaPorTabelaModel {
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
            buildCampanhaPorTabelaQuery(filters);

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
        const { mainQuery, values } = buildCampanhaPorTabelaQuery(filters);
        
        // 2. Executa a query
        const result = await furnasPool.query(mainQuery, values);
        
        // Retorna os dados "crus"
        return result.rows;
    }

    /**
     * Busca um único registro pela chave composta (idCampanha, idTabela),
     * com os joins necessários para a visualização de detalhe.
     */
    public static async findByIds(idCampanha: number, idTabela: number): Promise<any | null> {
        // Query baseada no getById original (mais completa)
        const result = await furnasPool.query(
            `
            SELECT 
                a.idCampanha, a.idTabela,
                b.idCampanha AS idcampanha, b.nroCampanha,
                b.dataInicio AS campanha_datainicio, b.dataFim AS campanha_datafim,
                b.idReservatorio AS idreservatorio,
                c.idTabela AS idtabela, c.nome AS tabela_nome,
                c.rotulo AS tabela_rotulo, c.excecao AS tabela_excecao,
                c.sitio AS tabela_sitio, c.campanha AS tabela_campanha,
                d.nome AS reservatorio_nome
            FROM tbcampanhaportabela a
            LEFT JOIN tbcampanha b ON a.idCampanha = b.idCampanha
            LEFT JOIN tbtabela c ON a.idTabela = c.idTabela
            LEFT JOIN tbreservatorio d ON b.idReservatorio = d.idReservatorio
            WHERE a.idCampanha = $1 AND a.idTabela = $2;
            `,
            [idCampanha, idTabela],
        );

        if (result.rows.length === 0) {
            return null;
        }
        
        // Retorna o primeiro registro "cru"
        return result.rows[0];
    }
}