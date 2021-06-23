import React from 'react';
import Weather from './Weather';

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>

      <h2>Languages</h2>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>

      <h2>Flag of {country.name}</h2>
      <img src={country.flag} alt={'flag of ' + country.name} width='120px' />

      <h2>Weather in {country.name}</h2>
      <Weather capital={country.capital} />
    </div>
  );
};

export default Country;
