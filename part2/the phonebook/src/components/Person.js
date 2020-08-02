import React from 'react';

const Person = (props) => (
  <div>{props.person.name} {props.person.number}<button data-id={props.person.id} onClick={props.handleDelete}>delete</button></div>
);

export default Person;
