import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistic = ({text, value}) => (
  <>
    <td>{text}</td>
    <td>{value}</td>
  </>
);

const Statistics = ({good, neutral, bad}) => {
  if(!good && !neutral && !bad) {
    return (
      <p>No feedback given</p>
    );
  }

  return(
    <table>
      <thead>
        <tr>
          <th colspan="2">
            <h1>statistics</h1>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Statistic text="good" value={good} />
        </tr>
        <tr>
          <Statistic text="neutral" value={neutral} />
        </tr>
        <tr>
          <Statistic text="bad" value={bad} />
        </tr>
        <tr>
          <Statistic text="all" value={good + neutral + bad} />
        </tr>
        <tr>
          <Statistic text="average" value={(good - bad) / (good + neutral + bad)} />
        </tr>
        <tr>
          <Statistic text="positive" value={good / (good + neutral + bad) * 100 + '%'} />
        </tr>
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />,
  document.getElementById('root')
);
