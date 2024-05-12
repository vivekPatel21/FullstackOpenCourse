const Header = (props) => {
  console.log('Header function called');
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  console.log('Part function called');
  return (
    <div>
      <p>{props.partName} {props.exerciseCount}</p>
    </div>
  );
};

const Total = (props) => {
  console.log('Total function called');
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  );
};

const Content = () => {
  console.log('Content function called');
  return (
    <div>
      <Part partName="Fundamentals of React" exerciseCount={10} />
      <Part partName="Using props to pass data" exerciseCount={7} />
      <Part partName="State of a component" exerciseCount={14} />
    </div>
  );
};

const App = () => {
  console.log('App function called');
  const course = 'Half Stack application development';

  const totalExercises = 10 + 7 + 14;

  return (
    <div>
      <Header course={course} />
      <Content />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
