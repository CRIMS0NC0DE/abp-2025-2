import React, { useState } from 'react';
// REMOVA A LINHA DO REACT-ICONS
import './styles.css'; 

// 1. IMPORTE SUA IMAGEM LOCAL
// A localização '../../assets/' assume que a pasta 'assets' está na raiz do projeto,
// um nível acima de 'front/'. Se 'assets' estiver dentro de 'front/public/',
// o caminho seria '/assets/download-logo.png'
import downloadIcon from '../../../../assets/download-logo.png';

// --- DADOS MOCADOS (A lógica permanece a mesma) ---
const mockData = [
    { id: 1, reservatorio: 'Furnas', data: '2024-01-15', parametro: 'pH', valor: 7.2 },
    { id: 2, reservatorio: 'Furnas', data: '2024-01-15', parametro: 'Turbidez', valor: 3.5 },
    { id: 3, reservatorio: 'Marimbondo', data: '2024-01-16', parametro: 'pH', valor: 7.0 },
    { id: 4, reservatorio: 'Marimbondo', data: '2024-01-16', parametro: 'Oxigênio', valor: 6.8 },
];

interface LimnologicalData {
    id: number;
    reservatorio: string;
    data: string;
    parametro: string;
    valor: number;
}


export const ExportCSV: React.FC = () => {
    const [data] = useState<LimnologicalData[]>(mockData);

    const handleExportCSV = () => {
        // ... (A função handleExportCSV continua exatamente a mesma)
        if (data.length === 0) {
            alert("Não há dados para exportar!");
            return;
        }

        const headers = Object.keys(data[0]).join(',');
        const rows = data.map(row => Object.values(row).join(','));
        const csvContent = [headers, ...rows].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.setAttribute("href", url);
        link.setAttribute("download", "dados_limnologicos.csv");
        document.body.appendChild(link);
        
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="page-container">
            <div className="sidebar left"></div>
            <div className="content-container">
                <h1 className="title">
                    Exportar <span className="title-highlight">CSV</span>
                </h1>
                
                <div className="export-box" onClick={handleExportCSV}>
                    {/* 2. SUBSTITUA O ÍCONE PELA SUA IMAGEM */}
                    <img src={downloadIcon} className="download-icon" alt="Ícone de download" />
                </div>

                {/* O texto de instrução no seu PNG era diferente, vamos ajustar */}
                <p className="instruction-text">
                    ou jogue o arquivo <span className="title-highlight">CSV</span>
                </p>
            </div>
            <div className="sidebar right"></div>
        </div>
    );
};