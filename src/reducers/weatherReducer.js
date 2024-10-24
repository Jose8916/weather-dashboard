// src/reducers/weatherReducer.js
const initialState = {
    current: {},
    forecast: [],
    historical: [],
    loading: false,
    error: null,
    unit: 'metric', // 'metric' para Celsius, 'imperial' para Fahrenheit
    favorites: [],
};

export const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_WEATHER_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_WEATHER_SUCCESS':
            return {
                ...state,
                loading: false,
                current: action.payload.current,
                forecast: action.payload.forecast,
                historical: action.payload.historical,
            };
        case 'FETCH_WEATHER_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'SET_UNIT':
            return { ...state, unit: action.payload };
        case 'ADD_FAVORITE':
            if (state.favorites.includes(action.payload)) return state;
            return { ...state, favorites: [...state.favorites, action.payload] };
        case 'REMOVE_FAVORITE':
            return { ...state, favorites: state.favorites.filter(city => city !== action.payload) };
        default:
            return state;
    }
};
