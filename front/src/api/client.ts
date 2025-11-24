import axios from 'axios';

export type Measurement = {
  id: number;
  station: string;
  parameter: string;
  measured_at: string;
  value: number;
  unit: string;
};
const BASE_URL = "http://localhost:3001";

const SENSOR_TO_DB_COLUMN: Record<string, string> = {
  'temperaturaDaAgua': 'tempag1', // Assumindo tempag1 como principal
  'temperaturaDaAgua1m': 'tempag1',
  'temperaturaDaAgua2m': 'tempag2',
  'temperaturaDaAgua3m': 'tempag3',
  'temperaturaDaAgua4m': 'tempag4',
  'temperaturaDoAr': 'tempar',
  'umidadeRelativa': 'ur',
  'pressaoAtmosferica': 'pressatm',
  'radiacaoIncidente': 'radincid',
  'radiacaoRefletida': 'radrefl',
  'condutividade': 'sonda_cond',
  'ph': 'sonda_pH',
  'oxigenioDissolvido': 'sonda_DO',
  'turbidez': 'sonda_turb',
  'clorofila': 'sonda_chl',
  'direcaoDoVento': 'dirvt',
  'intensidadeDoVento': 'intensvt',
};

// Unidades de medida para exibir na tabela
const UNIT_MAP: Record<string, string> = {
  'temperaturaDaAgua': '°C',
  'temperaturaDoAr': '°C',
  'ph': '',
  'umidadeRelativa': '%',
  'pressaoAtmosferica': 'hPa',
  'condutividade': 'µS/cm',
  'oxigenioDissolvido': 'mg/L',

};



export async function getMeasurements(filters: Record<string, any>): Promise<Measurement[]> {
  try {
    const params = new URLSearchParams();

    if (filters.estacao) params.append('idestacao', filters.estacao);
    if (filters.dataInicial) params.append('inicio', filters.dataInicial);
    if (filters.dataFinal) params.append('fim', filters.dataFinal);

    params.append('limit', '50'); 
    const url = `${BASE_URL}/sima/porestacao?${params.toString()}`;

    console.log("Buscando API:", url);

    const response = await axios.get(url);
    const json = response.data;

    if (!json.success || !Array.isArray(json.data)) {
      console.warn("⚠️ API retornou formato inesperado:", json);
      return [];
    }

    const rawData = json.data;

    const sensorSelecionadoKey = filters.sensor || 'temperaturaDaAgua'; 
    const colunaBanco = SENSOR_TO_DB_COLUMN[sensorSelecionadoKey] || 'tempag1';
    const unidade = UNIT_MAP[sensorSelecionadoKey] || '';

    return rawData.map((row: any) => ({
      id: row.idsima,
      station: `Estação ${row.idestacao}`, 
      parameter: sensorSelecionadoKey,       
      measured_at: row.datahora,          
      value: row[colunaBanco] !== null ? Number(row[colunaBanco]) : 0, 
      unit: unidade
    }));

  } catch (err) {
    console.warn("Falha na API, usando Mock:", err);
    return [
      { id: 1, station: "Erro API", parameter: "Verifique Console", measured_at: new Date().toISOString(), value: 0, unit: "!" }
    ];
  }
}