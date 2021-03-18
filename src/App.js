import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState({})
  const [location, setLocation] = useState('London')
  const [error, setError] = useState('')

  useEffect(() => {
    getWeather('London');
  }, [])

  useEffect(()=>{
    setTimeout(()=>setError(''), 3000)
  }, [error])

  const getWeather = async (local) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${local}&appid=${process.env.REACT_APP_APIKey}`;
    const response = await fetch(url);
      if(response.ok){
        const weatherDate = await response.json();
        const weatherMain = weatherDate.main;
        setWeatherData(weatherMain);
      }
      else{
        setError(`Weather wasn't found because of ${response.status}`)
        setLocation('London')
      }
    
  }


  const findWeather = (event) => {

    event.preventDefault()

    const locationInput = document.querySelector('.location')
    const locaionInputValue = locationInput.value

    setLocation(locaionInputValue)
    getWeather(locaionInputValue)

    locationInput.value = ''

  }


  const KelvintoCelcium = (temp) => {
    const celciumTemp = temp - 273.15
    return celciumTemp.toFixed(2);
  }


  return (
    <div className="App">
      <h1>Weather App</h1>

      <h3>{location}</h3>

      {KelvintoCelcium(weatherData.temp)} C

      <p>
        {weatherData.humidity < 80 ? String.fromCharCode(9728) : String.fromCharCode(9730)}
      </p>

      <p>{error}</p>
      <form onSubmit={findWeather}>
        <input type="text" className="location" />
        <input type="submit" value="Find weather" />
      </form>

    </div>
  );
}

export default App;
