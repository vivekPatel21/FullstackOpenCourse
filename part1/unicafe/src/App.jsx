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

const CalculateTotalClicks = (prop) => {
  console.log("calculating the total number of clicks...");
  if (prop.good > 0 || prop.neutral > 0 || prop.bad > 0) {
    return (
      <div>
        <p>Total Clicks: {prop.good + prop.neutral + prop.bad}</p>
      </div>
    );
  }
  return null;
};

const CalculateAverage = (prop) => {
  console.log("fetching the average rating...");
  if (prop.good > 0 || prop.neutral > 0 || prop.bad > 0) {
    return (
      <div>
        <p>Average Rating: {(prop.good - prop.bad) / (prop.good + prop.neutral + prop.bad)}</p>
      </div>
    );
  }
  return null;
};

const CalculatePercentPositive = (prop) => {
  console.log("fetching the positive percentage");
  if (prop.good > 0 || prop.neutral > 0 || prop.bad > 0) {
    return (
      <div>
        <p>Percentage positive: {(prop.good / (prop.good + prop.neutral + prop.bad)) * 100}%</p>
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
        <StatisticLine title="Total Clicks" value={totalClicks} />
        <StatisticLine title="Average Rating" value={averageRating} />
        <StatisticLine title="Percentage Positive" value={`${positivePercentage}%`} />
      </div>
    );
  }
};


const App = () => {
  // save clicks of each button to its own state
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

      <DisplayNumOf title="good" numberOfClicks={good} />
      <DisplayNumOf title="neutral" numberOfClicks={neutral} />
      <DisplayNumOf title="bad" numberOfClicks={bad} />

      <Statistics title={"Statistics"} good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
