import React from 'react';

const Persons = ({ persons, removePerson, filter }) => {
  return (
    <div>
      {persons
        .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
        .map(({ name, number, id }) => (
          <p key={name}>
            {name} {number}{' '}
            <button onClick={() => removePerson(name, id)}>Remove</button>
          </p>
        ))}
    </div>
  );
};

export default Persons;
