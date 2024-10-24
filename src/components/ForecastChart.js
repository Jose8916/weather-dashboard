// src/components/ForecastChart.js
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { Typography, Box } from '@mui/material';

const ForecastChart = ({ forecast }) => {
    // Procesar los datos para agrupar por día y calcular la temperatura promedio
    const dailyData = forecast.reduce((acc, curr) => {
        const date = new Date(curr.dt * 1000).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = { date, temp: [] };
        }
        acc[date].temp.push(curr.main.temp);
        return acc;
    }, {});

    const chartData = Object.values(dailyData).map((day) => ({
        date: day.date,
        temperature: parseFloat(
            (day.temp.reduce((a, b) => a + b, 0) / day.temp.length).toFixed(1)
        ),
    }));

    return (
        <Box width="100%" height={300}>
            <Typography variant="h6" gutterBottom>
                Pronóstico de Temperatura
            </Typography>
            <ResponsiveContainer>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis unit="°C" />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#1976d2"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default ForecastChart;
