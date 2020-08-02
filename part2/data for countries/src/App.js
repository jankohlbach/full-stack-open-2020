import React, {useState, useEffect} from 'react';
import axios from 'axios';

import Search from './components/Search';
import Results from './components/Results';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(function getData() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((response) => setCountries(response.data));
  }, []);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  return (
    <>
      <Search search={search} handleSearchChange={handleSearchChange} />
      <Results search={search} countries={countries} />
    </>
  );
}

export default App;
