import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Notification from './components/Notification';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notification, setNotification] = useState([]);
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
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find((person) => person.name === newName);

        const newPerson = {
          ...person,
          number: newNumber,
        };

        personService
          .update(newPerson)
          .then((response) => {
            setPersons(persons.map((person) => person.id !== response.id ? person : response));
            setNewName('');
            setNewNumber('');

            setNotification(`Updated ${person.name}`);
            setTimeout(() => {
              setNotification(null);
            }, 3000);
          })
          .catch((error) => alert('Error'));
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
          setNewName('');
          setNewNumber('');

          setNotification(`Added ${response.name}`);
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        })
        .catch((error) => alert('Error'));
    }
  };

  const handleDelete = (e) => {
    const personToDelete = persons.find((person) => person.id === parseInt(e.target.dataset.id, 10));

    if(window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .remove(personToDelete.id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== personToDelete.id));
        })
        .catch((error) => alert('Error'));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
