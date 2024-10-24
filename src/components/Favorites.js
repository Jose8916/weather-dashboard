// src/components/Favorites.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addFavorite, removeFavorite, fetchWeather } from '../actions/weatherActions';
import {
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
    Box,
    Tooltip,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

const Favorites = () => {
    const favorites = useSelector((state) => state.weather.favorites);
    const currentCity = useSelector((state) => state.weather.current.name);
    const dispatch = useDispatch();

    const handleToggleFavorite = (city) => {
        if (favorites.includes(city)) {
            dispatch(removeFavorite(city));
        } else {
            dispatch(addFavorite(city));
        }
    };

    const handleCityClick = (city) => {
        dispatch(fetchWeather(city));
    };

    return (
        <Box mt={4}>
            <Typography variant="h6">Ciudades Favoritas</Typography>
            {favorites.length === 0 ? (
                <Typography variant="body2">No tienes ciudades favoritas.</Typography>
            ) : (
                <List>
                    {favorites.map((city, index) => (
                        <ListItem
                            key={index}
                            secondaryAction={
                                <Tooltip title={favorites.includes(city) ? "Eliminar de favoritos" : "Agregar a favoritos"}>
                                    <IconButton edge="end" onClick={() => handleToggleFavorite(city)}>
                                        {currentCity === city ? <Favorite color="error" /> : <FavoriteBorder />}
                                    </IconButton>
                                </Tooltip>
                            }
                            button
                            onClick={() => handleCityClick(city)}
                        >
                            <ListItemText primary={city} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default Favorites;
