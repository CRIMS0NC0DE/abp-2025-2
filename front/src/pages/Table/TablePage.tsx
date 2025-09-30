import SearchBar from '../../components/SearchBar/SearchBar'; // 1. Importe o componente

export default function TablePage() {
  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Consulta por Tabelas</h1>
      
      {/* 2. Use o componente aqui */}
      <div style={{ margin: '2rem 0', width: '100%', maxWidth: '500px' }}>
         <SearchBar placeholder="Buscar por reservatório ou parâmetro..." />
      </div>

      <p>Esta página exibirá os dados limnológicos em formato de tabela.</p>
    </div>
  );
}