export type Measurement = {
id: number;
station: string;
parameter: string;
measured_at: string;
value: number;
unit: string;
};
/**
* getMeasurements - tenta buscar da API; se falhar, retorna dados mock.
* Filters: { institution, reservoir, station, parameter, from, to }
*/
export async function getMeasurements(filters: Record<string, any>): Promise<Measurement[]> {
const params = Object.entries(filters)
.filter(([_, v]) => v !== "" && v != null)
.map(([k, v]) => [k, String(v)] as [string, string]);
const qs = new URLSearchParams(params).toString();
try {
const res = await fetch(`/api/manual-measurements?${qs}`);
if (!res.ok) throw new Error("API retornou erro");
const json = await res.json();
// espera que a API retorne um array compatível
return json as Measurement[];
} catch (err) {
// Fallback: mock data para você visualizar a tabela sem backend
console.warn("Falha ao buscar API — usando dados mock:", err);
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
}