const Header = (props) => {
  console.log("loading " + props + "...")
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const getDisplay = (name, count) => {
  console.log("getting display " + name)
  return (
    <p>{name} {count}</p>
  )
}

const Display = ({ name, count }) => { // Changed to object destructuring for props
  console.log("invoking getDisplay function")
  return getDisplay(name, count)
}

const parseList = (list) => {
  console.log("parsing list...")
  return list.map((item, index) => (
    <div key={index}>
      <Display name={item.name} count={item.exercises} />
    </div>
  ));
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const total = part1.exercises + part2.exercises + part3.exercises

  const list = [part1, part2, part3]

  return (
    <div>
      <Header course={course} />
      {/* Invoke parseList function with list and render its return value */}
      {parseList(list)}
      <p>Total: {total}</p>
    </div>
  )
}

export default App;
