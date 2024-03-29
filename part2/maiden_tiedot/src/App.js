import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';
import Filter from './components/Filter';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState('');

  const handleFilterChange = ({ target }) => {
    setNewFilter(target.value);
  };

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  }, []);

  return (
    <div>
      <h1>Countries</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Countries
        countries={countries}
        newFilter={newFilter}
        setNewFilter={setNewFilter}
      />
    </div>
  );
};

export default App;
