import React from 'react';

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  return (
    <b>
      Total of {parts.map((p) => p.exercises).reduce((sum, x) => sum + x)}{' '}
      exercises
    </b>
  );
};

const Content = ({ parts }) => {
  return parts.map((partObject) => (
    <Part key={partObject.id} part={partObject} />
  ));
};

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
