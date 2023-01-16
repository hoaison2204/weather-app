import './App.scss';
import CurrentWeather from './components/current-weather/CurrentWeather';
import Search from './components/search/Search';
import { WEATHER_API_KEY, WEATHER_API_URL } from './Api'
import { useState, useEffect } from 'react';
import Forecast from './components/forecast/Forecast';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=21.0245&lon=105.84117&appid=${WEATHER_API_KEY}&units=metric`)
    Promise.all([currentWeatherFetch]).then(async (response) => {
      const weatherResponse = await response[0].json()
      setCurrentWeather({ city: 'Hanoi', ...weatherResponse });
    })
  }, []);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ');
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json()
        const forecastResponse = await response[1].json()
        setCurrentWeather({ city: searchData.label, ...weatherResponse })
        setForecast({ city: searchData.label, ...forecastResponse })
      })
      .catch((err) => console.log(err));
  }

  console.log('Current weather: ', currentWeather);
  console.log('Forecast: ', forecast);
  return (
    <div className="container">
      <Search
        onSearchChange={handleOnSearchChange}
      />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;