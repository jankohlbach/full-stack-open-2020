import React from 'react';

import Person from './Person';

const Persons = (props) => (
  props.persons.map((person) => {
    if(person.name.toLowerCase().indexOf(props.filter.toLowerCase()) !== -1)
      return <Person key={person.name} person={person} handleDelete={props.handleDelete} />
  })
);

export default Persons;
