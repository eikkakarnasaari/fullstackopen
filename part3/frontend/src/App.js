import React, { useState, useEffect } from 'react';
import './index.css';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import peopleService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [notification, setNotification] = useState(null);

  const addPerson = (event) => {
    event.preventDefault();

    let newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    let existingPerson = persons.filter((p) => p.name === newPerson.name)[0];

    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
        ) &&
        newNumber !== ''
      ) {
        peopleService
          .update(existingPerson.id, {
            name: existingPerson.name,
            number: newPerson.number,
          })
          .then((response) => {
            setPersons(
              persons.map((p) => (p.id !== existingPerson.id ? p : response))
            );
            setNotification({
              message: `Updated ${existingPerson.name}!`,
              type: 'success',
            });
            setTimeout(() => setNotification(null), 5000);
          })
          .catch((err) => {
            setNotification({
              message: `Information of ${existingPerson.name} has already been removed from server`,
              type: 'error',
            });
          });
      }
    } else {
      peopleService
        .create({ name: newPerson.name, number: newPerson.number })
        .then((response) => {
          setPersons(persons.concat(response));
          setNotification({
            message: `Added ${response.name}!`,
            type: 'success',
          });
          setTimeout(() => setNotification(null), 5000);
        })
        .catch((err) => {
          setNotification({
            message: `Error adding ${newPerson.name}!`,
            type: 'error',
          });
        });
    }
    setNewName('');
    setNewNumber('');
  };

  const removePerson = (name, id) => {
    if (window.confirm(`Remove ${name} ?`)) {
      peopleService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotification({ message: `Removed ${name}!`, type: 'success' });
          setTimeout(() => setNotification(null), 5000);
        })
        .catch((err) => {
          setNotification({
            message: `Information of ${name} has already been removed from server`,
            type: 'error',
          });
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
      <Notification notification={notification} />
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
