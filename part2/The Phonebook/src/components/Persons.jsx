const Persons = ({filteredList, onDelete}) => {
  return (
    <div>
      <ul>
        {filteredList.map(person => (
          <li key={person.id}>
            {person.name} &nbsp;
            {person.number} &nbsp;
            <button onClick = {() => onDelete(person)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Persons