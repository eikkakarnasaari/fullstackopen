import React, { useState, useEffect } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import peopleService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    let person = persons.filter((p) => p.name === newName)[0];

    if (person) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        ) &&
        newNumber !== ''
      )
        peopleService
          .update(person.id, {
            name: newName,
            number: newNumber,
          })
          .then((response) =>
            setPersons(persons.map((p) => (p.id !== person.id ? p : response)))
          );
    } else {
      peopleService
        .create({ name: newName, number: newNumber })
        .then((response) => {
          setPersons(persons.concat(response));
        });
    }
    setNewName('');
    setNewNumber('');
  };

  const removePerson = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      peopleService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const handleNameChange = ({ target }) => {
    setNewName(target.value);
  };

  const handleNumberChange = ({ target }) => {
    setNewNumber(target.value);
  };

  const handleFilterChange = ({ target }) => {
    setNewFilter(target.value);
  };

  useEffect(() => peopleService.getAll().then((p) => setPersons(p)), []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        removePerson={removePerson}
        filter={newFilter}
      />
    </div>
  );
};

export default App;
