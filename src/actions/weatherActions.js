import axios from 'axios';

const API_KEY = 'a1a077a9e6b4ad79fa0470fe7ff2b0dd'; // Ensure your API Key is valid

export const fetchWeather = (city) => async (dispatch, getState) => {
    dispatch({ type: 'FETCH_WEATHER_REQUEST' });

    const { unit } = getState().weather;

    try {
        // Obtain coordinates of the city
        const geoResponse = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );

        if (geoResponse.data.length === 0) {
            throw new Error('City not found');
        }

        const { lat, lon } = geoResponse.data[0];

        // Obtain current weather
        const currentWeatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
        );

        // Obtain 5-day forecast
        const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
        );

        // Attempt to obtain historical data (last 5 days with Free API limitations)
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
            // Check if the error is due to unauthorized access (likely because of Free API limitations)
            if (
                historicalError.response &&
                historicalError.response.status === 401
            ) {
                console.log(
                    'You are using Free API. Not able to get historical data.'
                );
            } else {
                console.log(
                    'Error getting historical data:',
                    historicalError.message
                );
            }
            // Optionally, you can set historical to null or an empty array
            historical = [];
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
