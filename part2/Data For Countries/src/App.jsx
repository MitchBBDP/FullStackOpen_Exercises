import { useState, useEffect } from 'react'
import webService from './services/countries.js'
import Countries from './components/Countries.jsx'
import Filter from './components/Filter.jsx'

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    webService
    .getCountries()
    .then(countries => {
      setCountries(countries.filter(country => 
      country.name.common.toLowerCase().includes(filter)))
    })
    .catch(error => console.log(error))
  }, [filter])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const showCountry = (countryName) => {
    setCountries(countries.filter(country => 
      country.name.common === countryName))
  }

  return (
    <div>
      <Filter handleFilterChange = {handleFilterChange}/>
      <Countries countries = {countries} showCountry = {showCountry} />
    </div>
  )
}

export default App
