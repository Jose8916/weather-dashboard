// src/components/HistoricalTab.js
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const HistoricalTab = ({ historical }) => {
    if (!historical || historical.length === 0)
        return <Typography>No historical data available</Typography>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Grid container spacing={2}>
                {historical.map((day, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ backgroundColor: '#e3f2fd' }}>
                            <CardContent>
                                <Typography variant="h6">
                                    {new Date(day.dt * 1000).toLocaleDateString()}
                                </Typography>
                                <Typography variant="h5">Max: {day.temp.max} °C</Typography>
                                <Typography variant="h5">Min: {day.temp.min} °C</Typography>
                                <Typography variant="body2">{day.weather[0].description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </motion.div>
    );
};

export default HistoricalTab;
