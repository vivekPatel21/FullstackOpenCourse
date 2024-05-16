import { useState } from 'react';

const Header = (prop) => {
  console.log("fetching header ", prop);
  return (
    <div>
      <h1>{prop.title}</h1>
    </div>
  );
};

const Button = (prop) => {
  console.log(prop.title, " clicked!");
  return (
    <button onClick={() => prop.setMethod(prop.rating + 1)}>
      {prop.title}
    </button>
  );
};

const DisplayNumOf = (prop) => {
  console.log("displaying number of ", prop.title, " clicked...");
  if (prop.numberOfClicks > 0) {
    return (
      <div>
        <p>{prop.title} {prop.numberOfClicks}</p>
      </div>
    );
  }
  return null;
};


const StatisticLine = ({ title, value }) => {
  return (
    <div>
      <p>{title}: {value}</p>
    </div>
  );
};


const Statistics = (prop) => {
  if (prop.good === 0 && prop.bad === 0 && prop.neutral === 0) {
    return (
      <div>
        <Header title={prop.title} />
        <p>No Feedback given</p>
      </div>
    );
  } else {
    const totalClicks = prop.good + prop.neutral + prop.bad;
    const averageRating = (prop.good - prop.bad) / (prop.good + prop.neutral + prop.bad);
    const positivePercentage = (prop.good / (prop.good + prop.neutral + prop.bad)) * 100;

    return (
      <div>
        <Header title={prop.title} />
        <tr><DisplayNumOf title="good" numberOfClicks={prop.good} /></tr>
        <tr><DisplayNumOf title="neutral" numberOfClicks={prop.neutral} /></tr>
        <tr><DisplayNumOf title="bad" numberOfClicks={prop.bad} /> </tr>
        <tr><StatisticLine title="Total Clicks" value={totalClicks} /></tr>
        <tr><StatisticLine title="Average Rating" value={averageRating} /></tr>
        <tr><StatisticLine title="Percentage Positive" value={`${positivePercentage}%`} /></tr>
      </div>
    );
  }
};


const App = () => {
  const title = 'Give Feedback';

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header title={title} />
      <Button title="good" rating={good} setMethod={setGood} />
      <Button title="neutral" rating={neutral} setMethod={setNeutral} />
      <Button title="bad" rating={bad} setMethod={setBad} />

      <Statistics title={"Statistics"} good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
