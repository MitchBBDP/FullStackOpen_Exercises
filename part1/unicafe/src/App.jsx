import { useState } from 'react'

const Header = ({text}) => <div><h1>{text}</h1></div>

const Button = ({text, handleClick}) => <button onClick = {handleClick}>{text}</button>

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td></td><td>{value}</td></tr>

const Stats = ({title, goodTotal, neutralTotal, badTotal}) => {
  const total = goodTotal + neutralTotal + badTotal
  let average = 0
  let positive = 0
  if (total > 0) {
    average = (goodTotal - badTotal) / total
    positive = (goodTotal / total) * 100
  
    return (
      <div>
        <Header text = {title} />
        <StatisticLine text="good" value ={goodTotal} />
        <StatisticLine text="neutral" value ={neutralTotal} />
        <StatisticLine text="bad" value ={badTotal} />
        <StatisticLine text="all" value ={total} />
        <StatisticLine text="average" value ={average} />
        <StatisticLine text="positive" value ={positive} />
      </div>
    )
  } else {
    return (
      <div>
      <Header text = {title} />
      <p>No feedback given</p>
      </div>
    )
  }
}


const App = () => {
  const buttonHeader = "give feedback"
  const statsHeader = "statistics"
  const good = "good"
  const neutral = "neutral" 
  const bad = "bad"

  const [data, setData] = useState ({
    good: 0,
    neutral: 0,
    bad: 0
  })

  return (
    <div>
      <Header text = {buttonHeader} />
      <Button text = {good} handleClick = {() => setData({...data, good: data.good + 1})} />
      <Button text = {neutral} handleClick = {() => setData({...data, neutral: data.neutral + 1})} />
      <Button text = {bad} handleClick = {() => setData({...data, bad: data.bad + 1})} />
      <Stats title = {statsHeader} goodTotal = {data.good} neutralTotal = {data.neutral} badTotal = {data.bad} />

    </div>
  )
}

export default App