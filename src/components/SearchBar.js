import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather, addFavorite } from '../actions/weatherActions';
import { TextField, Button, Box, IconButton, Tooltip } from '@mui/material';
import { FavoriteBorder } from '@mui/icons-material';

const SearchBar = () => {
    const [city, setCity] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim() === '') {
            alert('Por favor, ingresa una ciudad.');
            return;
        }
        dispatch(fetchWeather(city));
        setCity('');
    };

    const handleAddFavorite = () => {
        if (city.trim() === '') {
            alert('Por favor, ingresa una ciudad para agregar a favoritos.');
            return;
        }
        dispatch(addFavorite(city));
        setCity('');
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
        >
            <TextField
                variant="outlined"
                label="Buscar ciudad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                sx={{ width: '300px' }}
            />
            <Button variant="contained" type="submit">
                Buscar
            </Button>
            <Tooltip title="Agregar a favoritos">
                <IconButton color="secondary" onClick={handleAddFavorite}>
                    <FavoriteBorder />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default SearchBar;
