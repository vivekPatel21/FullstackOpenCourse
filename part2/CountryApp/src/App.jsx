import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Filter from './Filter';
import Content from './Content';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setToShow] = useState([]);
  
  useEffect(() => {
    Axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => {
        setCountries([]);
      });
  }, []);

  useEffect(() => {
    if (!filter) {
      return setToShow([]);
    }

    setToShow(
      countries.filter((country) => 
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    );
  }, [filter, countries]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Content countries={countriesToShow} />
    </div>
  );
};

export default App;
