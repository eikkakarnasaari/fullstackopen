import React from 'react';
import Country from './Country';

const Countries = ({ countries, newFilter, setNewFilter }) => {
  const filteredCountries = countries.filter((c) =>
    c.name.toString().toLowerCase().includes(newFilter.toString().toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }

  if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  }

  return (
    <div>
      {filteredCountries.map((c) => (
        <p key={c.name}>
          {c.name} <button onClick={() => setNewFilter(c.name)}>Show</button>
        </p>
      ))}
    </div>
  );
};

export default Countries;
