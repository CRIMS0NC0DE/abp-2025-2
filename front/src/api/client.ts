// src/api/client.ts

export type Measurement = {
  id: number;
  station: string;
  parameter: string;
  measured_at: string;
  value: number;
  unit: string;
};

const BASE_URL = "http://localhost:3001"; // URL do seu Backend

export async function getMeasurements(filters: Record<string, any>): Promise<Measurement[]> {
  try {
    // 1. Traduzir filtros do Front (estacao, dataInicial) para o Back
    const params = new URLSearchParams();
    
    // Se o backend espera 'station', 'start_date', etc., mapeie aqui:
    if (filters.estacao) params.append('station', filters.estacao); // ou 'id'
    if (filters.dataInicial) params.append('start_date', filters.dataInicial);
    if (filters.dataFinal) params.append('end_date', filters.dataFinal);
    if (filters.sensor) params.append('parameter', filters.sensor);

    // 2. Monta a URL (Ajuste '/api/mapa/sima' se tiver uma rota especifica para tabela)
    const url = `${BASE_URL}/api/mapa/sima?${params.toString()}`;
    
    console.log("Fetching:", url); // Para debug no console

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erro na API: ${res.status}`);

    const json = await res.json();

    // 3. TRATAMENTO DE DADOS (IMPORTANTE!)
    // Se o backend retorna GeoJSON ({ type: 'FeatureCollection', features: [...] })
    // precisamos extrair as 'properties' de dentro das features.
    if (json.features && Array.isArray(json.features)) {
      return json.features.map((f: any) => ({
        id: f.properties.id,
        station: f.properties.nome_estacao || f.properties.nome, // Tenta os dois nomes
        parameter: f.properties.parametro || "N/A",
        measured_at: f.properties.data_coleta || new Date().toISOString(),
        value: f.properties.valor,
        unit: f.properties.unidade || ""
      }));
    }

    // Se o backend já retorna um array simples, retorna direto
    if (Array.isArray(json)) {
      return json as Measurement[];
    }

    return []; // Se não entender o formato, retorna vazio

  } catch (err) {
    console.warn("Falha ao buscar API, usando Mock:", err);
    // Se falhar, retorna o Mock para não quebrar a tela
    const now = new Date();
    return [
      { id: 1, station: "Estação Mock A", parameter: "Temp", measured_at: now.toISOString(), value: 25.3, unit: "°C" },
      { id: 2, station: "Estação Mock B", parameter: "pH", measured_at: now.toISOString(), value: 7.1, unit: "" },
    ];
  }
}