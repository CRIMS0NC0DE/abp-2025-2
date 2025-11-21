export type Measurement = {
    id: number;
    station: string;
    parameter: string;
    measured_at: string;
    value: number;
    unit: string;
};

// Se a variável de ambiente não existir, usa string vazia (o proxy do vite cuidará disso localmente)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Busca medições manuais
 * Tenta buscar da API; se falhar, retorna dados mock (segurança para dev).
 */
export const getMeasurements = async (filters: Record<string, any>): Promise<Measurement[]> => {
    const params = Object.entries(filters)
        .filter(([_, v]) => v !== "" && v != null)
        .map(([k, v]) => [k, String(v)]);
    
    const qs = new URLSearchParams(params).toString();
    
    try {
        // Usa API_BASE_URL (ou proxy) em vez de url relativa solta
        const response = await fetch(`${API_BASE_URL}/api/manual-measurements?${qs}`);

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        return await response.json();

    } catch (error) {
        // --- MOCK DATA RESTAURADO (FALLBACK) ---
        console.warn("Falha ao buscar API — usando dados mock:", error);
        const now = new Date();
        return [
            {   
                id: 1,
                station: "Estação A",
                parameter: "Temperatura",
                measured_at: new Date(now.getTime() - 1000 * 60 * 60).toISOString(),
                value: 25.3,
                unit: "°C",
            },
            {
                id: 2,
                station: "Estação B",
                parameter: "pH",
                measured_at: new Date(now.getTime() - 1000 * 60 * 30).toISOString(),
                value: 7.15,
                unit: "",
            },
            {
                id: 3,
                station: "Estação A",
                parameter: "O ₂  Dissolvido",
                measured_at: now.toISOString(),
                value: 6.8,
                unit: "mg/L",
            },
        ];
    }
};

/**
 * Busca dados para o mapa
 * Substitui as chamadas hardcoded nos componentes de mapa.
 */
export const fetchMapData = async (source: string) => {
    // source pode ser 'sima', 'furnas', 'balcar'
    try {
        const response = await fetch(`${API_BASE_URL}/api/mapa/${source}`);
        
        if (!response.ok) {
            throw new Error(`Erro ao buscar mapa: ${source}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Erro ao buscar dados do mapa (${source}):`, error);
        return null; // Retorna null para o mapa saber que falhou e não quebrar a tela
    }
}