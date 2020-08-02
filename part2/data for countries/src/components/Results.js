import React from 'react';

const Results = (props) => {
  const countriesToShow = props.countries.filter((country) => country.name.toLowerCase().indexOf(props.search.toLowerCase()) !== -1);

  const handleShowClick = (e) => {
    props.handleShowClick(e.target.dataset.country);
  };

  const getResults = () => {
    if(countriesToShow.length > 10 || countriesToShow.length === 0) {
      return (<div>Too many matches, specify another filter</div>);
    } else if(countriesToShow.length > 1) {
      return (countriesToShow.map((country) => (
        <div key={country.alpha3Code}>{country.name}<button data-country={country.name} onClick={handleShowClick}>show</button></div>
      )));
    } else {
      return (
        <>
          <h1>{countriesToShow[0].name}</h1>
          <div>capital {countriesToShow[0].capital}</div>
          <div>population {countriesToShow[0].population}</div>
          <h2>languages</h2>
          <ul>
            {countriesToShow[0].languages.map((language) => <li key={language.iso639_2}>{language.name}</li>)}
          </ul>
          <img src={countriesToShow[0].flag} alt={`Flag ${countriesToShow[0].name}`} />
        </>
      );
    }
  };

  return getResults();
};

export default Results;
