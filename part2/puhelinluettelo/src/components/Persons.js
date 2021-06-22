import React from 'react';
import Person from './Person';

const Persons = ({ persons, removePerson, filter }) => {
  const filteredPersons = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {filteredPersons.map(({ name, number, id }) => (
        <Person
          key={name}
          name={name}
          number={number}
          id={id}
          removePerson={removePerson}
        />
      ))}
    </>
  );
};

export default Persons;
