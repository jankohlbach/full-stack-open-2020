import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
    },
  ]);

  const [newName, setNewName] = useState('');

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({name: newName}));
      setNewName('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <div>{person.name}</div>)}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
