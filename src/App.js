import React, { useState, useEffect } from 'react';

import './App.css';
import logoWeather from './images/logoWeather.png';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '11ef4961a8mshff52d86335f309ap1a32f9jsn7c085e183876',
      'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com',
    },
  };

  const getWeather = (city) => {
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setWeatherData(result);
      })
      .catch((err) => {
        console.error(err);
        setError('An error occurred while fetching weather data.');
      });
  };

  const citiesToFetch = ['London', 'New York', 'Tokyo', 'Toronto', 'Cape Town', 'Buenos Aires'];

   // Function to fetch weather data for a specific city
   const getCityWeather = (cityName) => {
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + cityName, options)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // Update the weather data for the specific city
        setWeatherData((prevData) => ({
          ...prevData,
          [cityName]: result, // Store weather data with the city name as the key
        }));
      })
      .catch((err) => {
        console.error(err);
        setError(`An error occurred while fetching weather data for ${cityName}.`);
      });
  };

  useEffect(() => {
    getWeather('Delhi'); // You can initially load data for a default city here

    // Fetch weather data for specific cities
    citiesToFetch.forEach((cityName) => {
      getCityWeather(cityName);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === '') {
      setError('Enter a city first');
    } else {
      setError(null); // Clear any previous errors
      getWeather(city);
    }
  };

  // Function to format Unix timestamp to readable time
function formatTime(timestamp) {
  if (!timestamp) return '';
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  return date.toLocaleTimeString();
}



  return (
    <div className="App">
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-brand">
          <img src={logoWeather} alt='logo' width="25" height="25" />
          Weather Check
        </span>
      </div>
    </nav>

    <div className="container">
    <form className="d-flex dynamicCity" role="search" onSubmit={handleSubmit}>
        <input id="city" className="form-control me-2" type="search" placeholder="Search Your City" aria-label="Search" value={city} onChange={(e) => setCity(e.target.value)}/>
        <button className="submitBtn btn-outline-success" type="submit" id="submit">
          Search
        </button>
      </form>
      {/* <h2 className="dynamicCity">Weather for {weatherData.cityName}</h2> */}
        <main>
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
              <div className="col">
                <div className="card mb-4 rounded-3 shadow-sm">
                  <div className="card-header py-3">
                    <h4 className="my-0 fw-normal">Temperatures</h4>
                  </div>
                  <div className="card-body">
                    <h1 className="card-title pricing-card-title"><span id="temp2">{weatherData.temp}</span><small className="text-body-secondary fw-light"><span>&#8451;</span></small></h1>
                    <ul className="list-unstyled mt-3 mb-4">
                    <li>Temperature is {weatherData.temp}<span>&#8451;</span></li>
                    <li>Minimum Temperature is {weatherData.min_temp}<span>&#8451;</span></li>
                    <li>Maximum Temperature is {weatherData.max_temp}<span>&#8451;</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card mb-4 rounded-3 shadow-sm">
                  <div className="card-header py-3">
                    <h4 className="my-0 fw-normal">Environment Info</h4>
                  </div>
                  <div className="card-body">
                    <h1 className="card-title pricing-card-title"><span id="humidity2">{weatherData.humidity}</span><small className="text-body-secondary fw-light"> %</small></h1>
                    <ul className="list-unstyled mt-3 mb-4">
                    <li>Humidity is {weatherData.humidity} %</li>
                    <li>Wind Degrees is {weatherData.wind_degrees} m/s</li>
                    <li>Feels Like is {weatherData.feels_like}<span>&#8451;</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card mb-4 rounded-3 shadow-sm">
                  <div className="card-header py-3">
                    <h4 className="my-0 fw-normal">Wind Info</h4>
                  </div>
                  <div className="card-body">
                    <h1 className="card-title pricing-card-title"><span id="wind_speed2">{weatherData.wind_speed}</span><small className="text-body-secondary fw-light"> km/hr</small></h1>
                    <ul className="list-unstyled mt-3 mb-4">
                    <li>Wind Speed is {weatherData.wind_speed} km/hr</li>
                    <li>Sunrise Time is {formatTime(weatherData.sunrise)}</li>
                    <li>Sunset Time is  {formatTime(weatherData.sunset)}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <h2>Major Global Cities</h2>
          <div id="carouselExample" class="carousel slide">
          <div className="carousel-inner">
          {citiesToFetch.map((cityName, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              <img src={logoWeather} alt="logo" width="25px" height="25px" />
              <p>
                Temperature in {cityName} is{' '}
                <span>
                  {weatherData[cityName] ? weatherData[cityName].temp :  <i class="fas fa-spinner fa-spin"></i>}&#8451;
                </span>
              </p>
            </div>
          ))}
        </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          <footer>
            <p>2023 @ArnavRout</p>
            <p><a href="https://www.linkedin.com/in/arnavrout/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>  arnavrout</a>
            </p>
        </footer>
      </div>
    
    </div>
  );
}

export default App;
