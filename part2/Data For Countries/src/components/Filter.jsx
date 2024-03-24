const Filter = ({handleFilterChange}) => {
  return (
    <div>
      find countries <input type='text' onChange={handleFilterChange}/>
    </div>
  )
}

export default Filter