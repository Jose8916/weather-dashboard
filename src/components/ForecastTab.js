// src/components/ForecastTab.js
import React from 'react';
import ForecastChart from './ForecastChart';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const ForecastTab = ({ forecast }) => {
    // Agrupar pronóstico por día
    const dailyForecast = forecast.reduce((acc, curr) => {
        const date = new Date(curr.dt * 1000).toLocaleDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(curr);
        return acc;
    }, {});

    // Obtain promedio diario
    const forecastData = Object.keys(dailyForecast).map((date) => {
        const temps = dailyForecast[date].map((item) => item.main.temp);
        const weather = dailyForecast[date][0].weather[0];
        return {
            dt: dailyForecast[date][0].dt,
            date,
            main: {
                temp: (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1),
            },
            weather: [weather],
        };
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <ForecastChart forecast={forecast} />
            <Grid container spacing={2} mt={2}>
                {forecastData.map((day) => (
                    <Grid item xs={12} sm={6} md={4} key={day.dt}>
                        <Card sx={{ backgroundColor: '#e3f2fd' }}>
                            <CardContent>
                                <Typography variant="h6">{day.date}</Typography>
                                <Typography variant="h5">{day.main.temp} °C</Typography>
                                <Typography variant="body2">{day.weather[0].description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </motion.div>
    );
};

export default ForecastTab;
