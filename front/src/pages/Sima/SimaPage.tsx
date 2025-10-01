import React from 'react';

import {ChartBarEvents} from '../../components/Charts/ChartBarEvents';
import {ChartLineTemporal} from '../../components/Charts/ChartLineTemporal';
import {ChartMapOccurrence} from '../../components/Charts/ChartMapOccurrence';
import {ChartPieDistribution} from '../../components/Charts/ChartPieDistribution';

import '../../components/Charts/Dashboard.css'

//Dados por enquanto de Exemplo
const mockBarData = [
    { name: 'Bioma A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Bioma B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Bioma C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Bioma D', uv: 2780, pv: 3908, amt: 2000 },
];

const mockLineData = [
    { name: 'Jan', focos: 4000, alertas: 2400 },
    { name: 'Feb', focos: 3000, alertas: 1398 },
    { name: 'Mar', focos: 2000, alertas: 9800 },
];

const mockPieData = [
    { name: 'SP', value: 400 },
    { name: 'MG', value: 300 },
    { name: 'RJ', value: 300 },
    { name: 'ES', value: 200 },
];

export default function SimaPage(){
    return (
        <div className='dashboard-container'>
            <h1>Dashboard de Eventos Ambientais</h1>

            <div className='charts-grid'>
                <div className='chart-wrapper'>
                    <h2>Eventos por Bioma</h2>
                    <ChartBarEvents data={mockBarData} />
                </div>

                <div className="chart-wrapper">
                    <h2>Série Temporal de Eventos</h2>
                    <ChartLineTemporal data={mockLineData} />
                </div>

                <div className="chart-wrapper">
                    <h2>Mapa de Ocorrências</h2>
                    <ChartMapOccurrence /> {/* Mapas geralmente buscam dados internamente */}
                </div>

                <div className="chart-wrapper">
                    <h2>Distribuição Percentual</h2>
                    <ChartPieDistribution data={mockPieData} />
                </div>
            </div>
        </div>
    )
}