import { useState, useEffect } from 'react'
import personService from './services/person.js'

import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'
import PersonForm from './components/PersonForm.jsx'
import Notification from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('new contact...')
  const [newNumber, setNewNumber] = useState('contact number...')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [result, setResult] = useState('')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
    .catch(error => {
        console.log(error)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const duplicatePerson = persons.find(person => person.name === newName)
    if (duplicatePerson){
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) {
        const updatedPerson = {...duplicatePerson, number: newNumber}
        personService
        .update(duplicatePerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
          setResult(true)
          setNotification(
            `Changed ${returnedPerson.name}'s number to ${returnedPerson.number}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setResult(false)
          setNotification(
            `Information of ${duplicatePerson.name} has already been removed from server`
          )
        })
      }
    } else {
      const newPerson = {name: newName, number: newNumber}
      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setResult(true)
        setNotification(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredList = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter))
    : persons
  
  const onDelete = (personToDelete) => {
    const confirm = window.confirm(`Delete ${personToDelete.name} ?`)
    if (confirm) {
      personService
      .deleteItem(personToDelete.id)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== deletedPerson.id))
      })
      .catch(error => {
        alert(
          `'${personToDelete.name}' was already deleted from server`
        )
        return personService.getAll()
        .then(allPersons => {
          setPersons(allPersons)
        })
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={notification} res={result} />

      <Filter filter = {filter} handleFilterChange = {handleFilterChange} />

      <h2>Add New Contact</h2>

      <PersonForm addPerson = {addPerson} 
      newName = {newName} newNumber = {newNumber}
      handleNameChange = {handleNameChange} handleNumChange = {handleNumChange}
      />

      <h2>Numbers</h2>

      <Persons filteredList = {filteredList} onDelete = {onDelete}/>

    </div>
  )
}

export default App