// src/components/WeatherCard.js
import React from 'react';

const WeatherCard = ({ data }) => {
    const date = new Date(data.dt * 1000).toLocaleDateString();
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    return (
        <div className="weather-card">
            <h3>{date}</h3>
            <img src={iconUrl} alt={data.weather[0].description} />
            <p>Temp: {data.main.temp} °C</p>
            <p>Humidity: {data.main.humidity} %</p>
        </div>
    );
};

export default WeatherCard;
