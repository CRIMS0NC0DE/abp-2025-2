// src/hooks/useTableData.ts (MODIFICADO)

import { useState, useEffect } from 'react';
// 1. Imports atualizados
import { fetchTableData } from '../api/api'; 
import type { 
  DatabaseName, 
  DataType, 
  PaginacaoState, 
  FilterParams 
} from '../types/types'; // Importe todos os tipos

// 2. A Assinatura do Hook DEVE ser alterada aqui
export const useTableData = (
  database: DatabaseName,
  tableName: string | null, // <-- ESTA É A CORREÇÃO
  currentPage: number, 
  filters: FilterParams
) => {
  const [dados, setDados] = useState<DataType>([]);
  const [colunas, setColunas] = useState<string[]>([]);
  const [paginacao, setPaginacao] = useState<PaginacaoState>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const stringifiedFilters = JSON.stringify(filters);

  useEffect(() => {
    // 3. Esta guarda JÁ TRATA O CASO 'null' corretamente
    if (!tableName) {
      setDados([]);
      setColunas([]);
      setPaginacao({ page: 1, limit: 10, total: 0, totalPages: 1 });
      return;
    }

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Agora 'tableName' é 'string' (não 'null') e a chamada funciona
        const resultado = await fetchTableData(database, tableName, currentPage, 10, filters);
        
        setDados(resultado.data || []);
        setPaginacao({
          page: resultado.page,
          limit: resultado.limit,
          total: resultado.total,
          totalPages: resultado.totalPages,
        });

        if (resultado.data && resultado.data.length > 0) {
          setColunas(Object.keys(resultado.data[0]));
        } else {
          setColunas([]);
        }

      } catch (err) {
        console.error("Falha ao buscar dados:", err); 
        setError('Não foi possível carregar os dados. Verifique a API ou tente novamente.');
        setDados([]);
        setColunas([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();

  }, [database, tableName, currentPage, stringifiedFilters, filters]);

  return { dados, colunas, paginacao, loading, error };
};