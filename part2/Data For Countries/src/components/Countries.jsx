import { useState, useEffect } from 'react'
import weatherService from '../services/openWeatherMap.js'

const Countries = ({countries, showCountry}) => {

  const [weather, setWeather] = useState([])

  useEffect(() => {
    if (countries.length === 1) {
        countries.map(country => {
          weatherService
          .getWeather(country.capital[0])
          .then(weather => {
            setWeather(weather)
          })
          .catch(error => console.log(error))
        })
     }
  }, [countries])

  if (countries.length > 10){
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length === 1) {
    return (
      <div>
        {countries.map(country => (
          <div key={country.name.common}>
            <h1>{country.name.common}</h1>
            <p>
              {country.capital}
              <br/>
              {country.area}
            </p>
            <h3>languages:</h3>
            <ul>
              {Object.values(country.languages).map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
            <img src={country.flags.svg} alt={country.flags.alt} style={{ maxWidth: '150px', maxHeight: '150px' }} />
            <h2>Weather in {country.capital[0]}</h2>
            {weather.main && <p>temperature {(weather.main.temp-273.15).toFixed(2)} Celcius</p>}
            {weather.weather && <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />}
            {weather.wind && <p>wind {weather.wind.speed} m/s</p>}
          </div>
        ))}
      </div>
    )
  } else {
    return (
      <div> 
        {countries.map(country => (
          <p key={country.name.common}>
            {country.name.common}
            &nbsp;
            <button onClick={()=>showCountry(country.name.common)}>show</button>
          </p>
        ))}
      </div>
    )
  }
}

export default Countries