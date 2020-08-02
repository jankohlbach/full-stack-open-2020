import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(function getPersons() {
    personService
      .getAll()
      .then((response) => setPersons(response))
      .catch((error) => alert('Error'));
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons[persons.length - 1].id + 1,
      };

      personService
        .create(newPerson)
        .then((response) => console.log(response))
        .catch((error) => alert('Error'));

      setPersons(persons.concat(newPerson));

      setNewName('');
      setNewNumber('');
    }
  };

  const handleDelete = (e) => {
    const personToDelete = persons.filter((person) => person.id == e.target.dataset.id)[0];

    if(window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .remove(personToDelete.id)
        .catch((error) => alert('Error'));

      setPersons(persons.filter((person) => person.id != personToDelete.id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
