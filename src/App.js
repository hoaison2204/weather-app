import './App.scss';
import CurrentWeather from './components/current-weather/CurrentWeather';
import Search from './components/search/Search';
import { WEATHER_API_KEY, WEATHER_API_URL } from './Api'
import { useState, useEffect } from 'react';
import Forecast from './components/forecast/Forecast';
import ChartBar from './components/chart/ChartBar';

function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [forecastByHour, setForecastByHour] = useState(null);

  useEffect(() => {
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=21.0245&lon=105.84117&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=21.0245&lon=105.84117&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastByHour = fetch(`${WEATHER_API_URL}/onecall?lat=21.0245&lon=105.84117&APPID=e5f1e0e91073e047bfd37039ad433153&units=metric`)
    Promise.all([currentWeatherFetch, forecastFetch, forecastByHour])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        const forecastByHourResponse = await response[2].json();
        setCurrentWeather({ city: 'Hanoi, VN', ...weatherResponse });
        setForecast({ ...forecastResponse });
        setForecastByHour({ ...forecastByHourResponse });
      })
  }, []);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ');
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)
    const forecastByHour = fetch(`${WEATHER_API_URL}/onecall?lat=${lat}&lon=${lon}&APPID=e5f1e0e91073e047bfd37039ad433153&units=metric`)

    Promise.all([currentWeatherFetch, forecastFetch, forecastByHour])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        const forecastByHourResponse = await response[2].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
        setForecastByHour({ city: searchData.label, ...forecastByHourResponse });
      })
      .catch((err) => console.log(err));
  }

  // console.log('Current weather: ', currentWeather);
  // console.log('Forecast: ', forecast);
  // console.log('Forecast by hour: ', forecastByHour)

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      {/* {forecastByHour && <ChartBar data={forecastByHour} />} */}
    </div>
  );
}
export default App;