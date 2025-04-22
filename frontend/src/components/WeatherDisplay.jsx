import React, { useEffect, useState } from 'react';

const WeatherDisplay = ({ onWeatherLoaded }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`
        );
        
        if (!response.ok) {
          throw new Error('Weather API request failed');
        }
        
        const data = await response.json();
        
        const weatherData = {
          temp: Math.round(data.current.temp_c),
          description: data.current.condition.text,
          icon: data.current.condition.icon,
        };
        
        setWeather(weatherData);
        onWeatherLoaded(weatherData);
      } catch (error) {
        console.error('Weather fetch error:', error);
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    const getLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setError('Unable to retrieve your location');
          setLoading(false);
        }
      );
    };

    getLocation();
  }, [onWeatherLoaded]);

  if (loading) return <div className="text-gray-600">Loading weather...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!weather) return null;

  return (
    <div className="flex items-center gap-2 mb-4">
      <img
        src={weather.icon}
        alt={weather.description}
        className="w-12 h-12"
      />
      <div>
        <div className="font-medium">{weather.temp}°C</div>
        <div className="text-sm text-gray-600 capitalize">{weather.description}</div>
      </div>
    </div>
  );
};

export default WeatherDisplay; 