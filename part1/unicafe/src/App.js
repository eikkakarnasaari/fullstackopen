import React, { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ value, text }) => (
  <tr>
    <td>{text} </td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  if (total < 1) {
    return <p>No feedback given</p>;
  } else
    return (
      <>
        <table>
          <tbody>
            <StatisticLine value={good} text='Good:' />
            <StatisticLine value={neutral} text='Neutral:' />
            <StatisticLine value={bad} text='Bad:' />
            <StatisticLine value={total} text='All:' />
            <StatisticLine value={average} text='Average:' />
            <StatisticLine value={positive + ' %'} text='Positive:' />
          </tbody>
        </table>
      </>
    );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
