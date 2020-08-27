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
  const [notification, setNotification] = useState({});
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(function getPersons() {
    personService
      .getAll()
      .then((response) => setPersons(response))
      .catch((error) => {
        setNotification({
          message: 'Error while fetching phonebook',
          type: 'error',
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
        console.error(error);
      });
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

            setNotification({
              message: `Updated ${person.name}`,
              type: 'success',
            });
            setTimeout(() => {
              setNotification({});
            }, 3000);
          })
          .catch((error) => {
            setNotification({
              message: error.response.data.error,
              type: 'error',
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            console.error(error);
          });
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

          setNotification({
            message: `Added ${response.name}`,
            type: 'success',
          });
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        })
        .catch((error) => {
          setNotification({
            message: error.response.data.error,
            type: 'error',
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          console.error(error);
        });
    }
  };

  const handleDelete = (e) => {
    const personToDelete = persons.find((person) => person.id === e.target.dataset.id);

    if(window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .remove(personToDelete.id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== personToDelete.id));
        })
        .catch((error) => {
          setNotification({
            message: 'Error while deleting person',
            type: 'error',
          });
          setTimeout(() => {
            setNotification(null);
          }, 5000);
          console.error(error);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
