import React, {useState} from 'react';
import axios from 'axios';

const Results = (props) => {
  const [weather, setWeather] = useState();

  const countriesToShow = props.countries.filter((country) => country.name.toLowerCase().indexOf(props.search.toLowerCase()) !== -1);

  const handleShowClick = (e) => {
    props.handleShowClick(e.target.dataset.country);
  };

  const getWeather = (city) => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}`)
      .then((response) => {
        if(response.data.current.temperature !== weather?.temperature)
          setWeather(response.data.current);
      });
  };

  const getResults = () => {
    if(countriesToShow.length > 10 || countriesToShow.length === 0) {
      return (<div>Too many matches, specify another filter</div>);
    } else if(countriesToShow.length > 1) {
      return (countriesToShow.map((country) => (
        <div key={country.alpha3Code}>{country.name}<button data-country={country.name} onClick={handleShowClick}>show</button></div>
      )));
    } else {
      getWeather(countriesToShow[0].capital);

      return (
        <>
          <h1>{countriesToShow[0].name}</h1>
          <div>capital {countriesToShow[0].capital}</div>
          <div>population {countriesToShow[0].population}</div>
          <h2>Spoken languages</h2>
          <ul>
            {countriesToShow[0].languages.map((language) => <li key={language.iso639_2}>{language.name}</li>)}
          </ul>
          <img src={countriesToShow[0].flag} alt={`Flag ${countriesToShow[0].name}`} />
          <h2>Weather in {countriesToShow[0].capital}</h2>
          <div><b>temperature:</b>{weather?.temperature}</div>
          <img src={weather?.weather_icons[0]} alt={weather?.weather_descriptions[0]} />
          <div><b>wind:</b>{`${weather?.wind_speed} mph direction ${weather?.wind_dir}`}</div>
        </>
      );
    }
  };

  return getResults();
};

export default Results;
