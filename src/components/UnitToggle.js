// src/components/UnitToggle.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUnit, fetchWeather } from '../actions/weatherActions';
import { ToggleButton, ToggleButtonGroup, Box } from '@mui/material';

const UnitToggle = () => {
    const dispatch = useDispatch();
    const unit = useSelector((state) => state.weather.unit);
    const city = useSelector((state) => state.weather.current.name);

    const handleUnitChange = (event, newUnit) => {
        if (newUnit !== null) {
            dispatch(setUnit(newUnit));
            if (city) {
                dispatch(fetchWeather(city));
            }
        }
    };

    return (
        <Box display="flex" justifyContent="center" mt={2}>
            <ToggleButtonGroup
                value={unit}
                exclusive
                onChange={handleUnitChange}
                aria-label="unidades de temperatura"
            >
                <ToggleButton value="metric" aria-label="Celsius">
                    °C
                </ToggleButton>
                <ToggleButton value="imperial" aria-label="Fahrenheit">
                    °F
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
};

export default UnitToggle;
