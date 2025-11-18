import { describe, it, expect, vi, afterEach } from 'vitest';
import { getMeasurements } from './client';

// Dados de exemplo para o teste
const mockResponseData = [
  { id: 100, station: "Test Station", parameter: "Test Param", measured_at: "2025-01-01", value: 10, unit: "X" }
];

describe('API Client - getMeasurements', () => {
  // Limpa os mocks após cada teste para não interferir nos outros
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('deve retornar dados da API quando a chamada for bem-sucedida', async () => {
    // Simula um fetch que retorna sucesso (ok: true)
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponseData,
    });
    vi.stubGlobal('fetch', fetchMock);

    const filters = { station: 'Test' };
    const data = await getMeasurements(filters);

    // Verifica se a URL foi montada corretamente com os filtros
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/api/manual-measurements'));
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('station=Test'));
    
    // Verifica se retornou os dados que simulamos
    expect(data).toEqual(mockResponseData);
  });

  it('deve retornar dados de fallback (mock) quando a API falhar', async () => {
    // Simula um erro na rede ou API
    const fetchMock = vi.fn().mockRejectedValue(new Error('API Error'));
    vi.stubGlobal('fetch', fetchMock);

    // Espiona o console.warn para confirmar que o erro foi logado, mas silencia no terminal
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const data = await getMeasurements({});

    // Verifica se retornou o array de fallback (que tem 3 itens hardcoded no client.ts)
    expect(data).toHaveLength(3); 
    expect(data[0].station).toBe('Estação A'); // Confirma que é o dado de fallback
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('deve tratar erros HTTP (ex: 404/500) acionando o fallback', async () => {
    // Simula o servidor respondendo, mas com erro (ok: false)
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500, 
      statusText: 'Internal Server Error'
    });
    vi.stubGlobal('fetch', fetchMock);

    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const data = await getMeasurements({});

    // Verifica se caiu no catch e retornou os dados de fallback
    expect(data).toHaveLength(3);
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Falha ao buscar API'), 
      expect.anything()
    );
  });
});