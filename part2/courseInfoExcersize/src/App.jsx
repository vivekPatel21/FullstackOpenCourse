const Course = (prop) => {
  console.log("creating the course page, from ",prop.course)
  return(
    <div>
    <h1>{prop.course.name}</h1>
    <ul>
      {prop.course.parts.map((part) =>
      <li key={part.id}>
        <h2>{part.name} {part.exercises}</h2>
      </li>
      )}
    </ul>
      
      
    
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App