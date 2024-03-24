import axios from 'axios';

const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

const getWeather = (capital) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`
  const request = axios.get(url)
  return request.then(response => response.data)
}

export default {getWeather}
