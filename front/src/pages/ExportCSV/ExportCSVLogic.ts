// Função para lidar com a exportação dos dados para um arquivo CSV.
export const generateCSVContent = (data: Record<string, unknown>[]) => {
  // Cria o cabeçalho do CSV a partir das chaves do primeiro objeto.
  const headers = Object.keys(data[0]).join(',');
  // Mapeia cada objeto para uma string de valores separados por vírgula.
  const rows = data.map(row => Object.values(row).join(','));
  // Combina cabeçalho e linhas.
  return [headers, ...rows].join('\n');
}

export const handleExportCSV = (data: Record<string, unknown>[]) => {
  if (data.length === 0) {
    alert("Não há dados para exportar!");
    return;
  }

  const csvContent = generateCSVContent(data);

  // Cria um Blob com o conteúdo CSV.
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  // Cria um link temporário para iniciar o download.
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'dados_limnologicos.csv');
  document.body.appendChild(link);
  link.click();
  // Remove o link após o download.
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}



