import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState('');
  const API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`
      )
      .then((response) => setWeather(response.data.current));
  }, [capital, API_KEY]);

  if (weather) {
    return (
      <div>
        <img src={weather.weather_icons[0]} alt='weather icon' />
        <p>
          <b>Temperature:</b> {weather.temperature} Celcius
        </p>
        <p>
          <b>Wind:</b> {weather.wind_speed} mph {weather.wind_dir}
        </p>
      </div>
    );
  } else {
    return <p>Loading weather...</p>;
  }
};

export default Weather;
