const Header = ({course}) => {
    return (
      <div>
        <h1>{course}</h1>
      </div>
    )
  }
  
const Content = ({parts}) => {
    return (
    <div>
        {parts.map((part) => (
        <p key = {part.id}>{part.name} {part.exercises}</p>
        ))}
    </div>
    ) 
}

const Total = ({parts}) => {
    return (
    <div>
        <p><b>total of {parts.reduce((sum, part) =>  sum + part.exercises, 0)} exercises</b></p>
    </div>
    )
}

const Course = ({course}) => {
    return (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </div>
    )
}

export default Course