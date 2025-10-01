import React from "react";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
    data: any[]; //Tipar melhor depois !!!!!!!!!!!!!!!!!!! ATENÇÃO !!!!!!!!!!
}

export function ChartBarEvents({ data }: ChartData) {
    return (
        <ResponsiveContainer width='100%' height={300}>
            <BarChart
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey='uv' fill='#8884d8' />
                <Bar dataKey='pv' fill='#82ca9d' />
            </BarChart>
        </ResponsiveContainer>
    )
}