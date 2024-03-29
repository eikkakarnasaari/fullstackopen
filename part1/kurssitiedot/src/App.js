import React from 'react';

const Header = (props) => {
  return <h1>{props.name.name}</h1>;
};

const Content = (props) => {
  return (
    <>
      <Part part={props.parts.parts[0]} />
      <Part part={props.parts.parts[1]} />
      <Part part={props.parts.parts[2]} />
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises{' '}
        {props.parts.parts.map((x) => x.exercises).reduce((sum, x) => sum + x)}
      </p>
    </>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header name={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  );
};

export default App;
