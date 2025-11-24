import { FilterMenu } from "../../components/MenuFilter/MenuFilterSima"; 
import MapaInterativo from "../../components/MapaInterativoSIMA";
import TableViewSIMA from "../TableView/TableViewSIMA"; // Certifique-se que o TableView exportado é o que editamos no passo anterior
import { useState } from "react";

export default function ConsultaSIMA() {
    // Estado 1: Controla se vemos Tabela (false) ou Mapa (true)
    const [mostrarMapa, setMostrarMapa] = useState(false);

    // Estado 2: Guarda os filtros escolhidos no Menu para passar para a Tabela
    const [filtrosAtuais, setFiltrosAtuais] = useState<Record<string, any>>({});

    // Função chamada quando o usuário clica em "Aplicar Filtros" no Menu
    const handleAplicarFiltros = (novosFiltros: any) => {
        console.log("ConsultaSIMA recebeu filtros:", novosFiltros);
        setFiltrosAtuais(novosFiltros); // 1. Salva os filtros
        setMostrarMapa(false);          // 2. Força a volta para a visão de Tabela
    };

    return (
        // Layout Flex: Sidebar na esquerda, Conteúdo na direita
        <div style={{ 
            display: 'flex', 
            height: '120vh', width: '100%', overflow: 'hidden' 
            }}>
            
            {/* --- LADO ESQUERDO: MENU LATERAL --- */}
            <div style={{ width: '300px', flexShrink: 0, borderRight: '1px solid #ddd' }}>
                <FilterMenu 
                    onApplyFilters={handleAplicarFiltros} 
                    onOpenMap={() => setMostrarMapa(true)} // Botão verde do menu ativa o mapa
                />
            </div>

            {/* --- LADO DIREITO: ÁREA DE VISUALIZAÇÃO --- */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                
                {/* Cabeçalho opcional ou Breadcrumb poderia ficar aqui */}
                
                <div style={{ flex: 1, position: 'relative', overflow: 'auto' }}>
                    {mostrarMapa ? (
                        // === MODO MAPA ===
                        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            {/* Botão de Voltar Flutuante ou no Topo */}
                            <div style={{ padding: '10px', background: '#f9f9f9', borderBottom: '1px solid #eee' }}>
                                <button 
                                    onClick={() => setMostrarMapa(false)}
                                    style={{ 
                                        padding: '8px 16px', 
                                        cursor: 'pointer',
                                        backgroundColor: '#fff',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px'
                                    }}
                                >
                                    &larr; Voltar para Tabela
                                </button>
                            </div>
                            
                            <div style={{ flex: 1 }}>
                                <MapaInterativo source={"furnas"} />
                            </div>
                        </div>
                    ) : (
                        // === MODO TABELA ===
                        // Passamos os filtrosAtuais para a tabela buscar os dados na API
                        <>
                            <TableViewSIMA currentFilters={filtrosAtuais} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}