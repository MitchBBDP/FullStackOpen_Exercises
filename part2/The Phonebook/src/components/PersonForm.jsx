const PersonForm = ({addPerson, newName, newNumber, handleNameChange, handleNumChange}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value = {newName} onChange = {handleNameChange}/>
        </div>
        <div>
          Number: <input value = {newNumber} onChange = {handleNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm