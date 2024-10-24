// src/actions/weatherActions.js
import axios from 'axios';

const API_KEY = 'a1a077a9e6b4ad79fa0470fe7ff2b0dd'; // Asegúrate de que tu API Key sea válida

export const fetchWeather = (city) => async (dispatch, getState) => {
    dispatch({ type: 'FETCH_WEATHER_REQUEST' });

    const { unit } = getState().weather;

    try {
        // Obtener coordenadas de la ciudad
        const geoResponse = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );

        if (geoResponse.data.length === 0) {
            throw new Error('Ciudad no encontrada');
        }

        const { lat, lon } = geoResponse.data[0];

        // Obtener clima actual
        const currentWeatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
        );

        // Obtener pronóstico de 5 días
        const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
        );

        // Intentar obtener datos históricos (últimos 5 días por limitaciones gratuitas)
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
            console.error('Error al obtener datos históricos:', historicalError.message);
            // Opcional: dispatch para manejar el error de históricos si lo deseas
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

export const setUnit = (unit) => ({
    type: 'SET_UNIT',
    payload: unit,
});

export const addFavorite = (city) => ({
    type: 'ADD_FAVORITE',
    payload: city,
});

export const removeFavorite = (city) => ({
    type: 'REMOVE_FAVORITE',
    payload: city,
});
