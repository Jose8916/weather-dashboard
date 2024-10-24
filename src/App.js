// src/App.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Container,
    Typography,
    Tabs,
    Tab,
    Box,
    CircularProgress,
    Alert,
} from '@mui/material';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastTab from './components/ForecastTab';
import HistoricalTab from './components/HistoricalTab';
import UnitToggle from './components/UnitToggle';
import Favorites from './components/Favorites';
import { fetchWeather } from './actions/weatherActions';
import axios from 'axios';

const App = () => {
    const weather = useSelector((state) => state.weather);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherByCoords(latitude, longitude);
                },
                (error) => {
                    console.log('Error obteniendo la geolocalización:', error.message);
                    dispatch(fetchWeather('Lima'));
                }
            );
        } else {
            // Geolocalización no soportada, cargar ciudad por defecto
            dispatch(fetchWeather('Lima'));
        }
    }, [dispatch]);

    const fetchWeatherByCoords = async (lat, lon) => {
        try {
            const API_KEY = 'a1a077a9e6b4ad79fa0470fe7ff2b0dd'; // Asegúrate de que tu API Key sea válida
            const unit = weather.unit;

            // Obtain clima actual
            const currentWeatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
            );

            // Obtain pronóstico de 5 días
            const forecastResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
            );

            // Intentar Obtain datos históricos (últimos 5 días por limitaciones gratuitas)
            let historical = [];
            try {
                const historicalDataPromises = [];
                const currentTime = Math.floor(Date.now() / 1000);
                for (let i = 1; i <= 5; i++) {
                    const timestamp = currentTime - i * 86400;
                    historicalDataPromises.push(
                        axios.get(
                            `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp}&units=${unit}&appid=${API_KEY}`
                        )
                    );
                }

                const historicalResponses = await Promise.all(historicalDataPromises);
                historical = historicalResponses.map((res) => res.data.current);
            } catch (historicalError) {
                console.error('Error al Obtain datos históricos:', historicalError.message);
            }

            dispatch({
                type: 'FETCH_WEATHER_SUCCESS',
                payload: {
                    current: currentWeatherResponse.data,
                    forecast: forecastResponse.data.list,
                    historical: historical,
                },
            });
        } catch (error) {
            dispatch({
                type: 'FETCH_WEATHER_FAILURE',
                payload: error.message,
            });
        }
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Container maxWidth="md" sx={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <Typography variant="h3" align="center" gutterBottom>
                Weather Dashboard
            </Typography>
            <SearchBar />
            <UnitToggle />
            <Favorites />
            {weather.loading && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            )}
            {weather.error && (
                <Box mt={4}>
                    <Alert severity="error">{weather.error}</Alert>
                </Box>
            )}
            {!weather.loading && !weather.error && weather.current && (
                <>
                    <Box mt={4}>
                        <CurrentWeather data={weather.current} />
                    </Box>
                    <Box mt={4}>
                        <Tabs value={activeTab} onChange={handleTabChange} centered>
                            <Tab label="Forecast" />
                            <Tab label="Historical" />
                        </Tabs>
                        <Box mt={2}>
                            {activeTab === 0 && <ForecastTab forecast={weather.forecast} />}
                            {activeTab === 1 && <HistoricalTab historical={weather.historical} />}
                        </Box>
                    </Box>
                </>
            )}
        </Container>
    );
};

export default App;
