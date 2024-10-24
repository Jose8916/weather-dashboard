// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Azul
        },
        secondary: {
            main: '#f50057', // Rosa
        },
        background: {
            default: '#f5f5f5',
        },
    },
});

export default theme;
