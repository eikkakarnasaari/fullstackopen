import React from 'react';

const Person = ({ name, number, id, removePerson }) => {
  return (
    <p>
      {name} {number}{' '}
      <button onClick={() => removePerson(name, id)}>Remove</button>
    </p>
  );
};

export default Person;
