// src/components/CurrentWeather.js
import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import {
    WiDaySunny,
    WiCloudy,
    WiRain,
    WiSnow,
    WiThunderstorm,
    WiFog,
} from 'react-icons/wi';
import Map from './Map';
import { motion } from 'framer-motion';

const getWeatherIcon = (main) => {
    switch (main.toLowerCase()) {
        case 'clear':
            return <WiDaySunny size={64} color="#fdd835" />;
        case 'clouds':
            return <WiCloudy size={64} color="#90a4ae" />;
        case 'rain':
            return <WiRain size={64} color="#0288d1" />;
        case 'snow':
            return <WiSnow size={64} color="#bdbdbd" />;
        case 'thunderstorm':
            return <WiThunderstorm size={64} color="#f57c00" />;
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'dust':
        case 'fog':
        case 'sand':
        case 'ash':
        case 'squall':
        case 'tornado':
            return <WiFog size={64} color="#90a4ae" />;
        default:
            return <WiDaySunny size={64} color="#fdd835" />;
    }
};

const CurrentWeather = ({ data }) => {
    if (!data || Object.keys(data).length === 0) return null;

    const { name, main, weather, wind, sys, coord } = data;

    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card sx={{ backgroundColor: '#e3f2fd' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {name}, {sys.country}
                    </Typography>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        {getWeatherIcon(weather[0].main)}
                        <Box ml={2}>
                            <Typography variant="h4">{main.temp} °C</Typography>
                            <Typography variant="subtitle1">{weather[0].description}</Typography>
                            <Typography variant="body2">Humidity: {main.humidity} %</Typography>
                        </Box>
                    </Box>
                    <Grid container spacing={2} mt={2}>
                        <Grid item xs={6} sm={3}>
                            <Typography variant="body2">
                                <strong>Temperature:</strong> {main.feels_like} °C
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Typography variant="body2">
                                <strong>Pressure:</strong> {main.pressure} hPa
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Typography variant="body2">
                                <strong>Wind:</strong> {wind.speed} m/s
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <Typography variant="body2">
                                <strong>Direction Wind:</strong> {wind.deg}°
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box mt={4}>
                        <Map lat={coord.lat} lon={coord.lon} city={name} />
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default CurrentWeather;
