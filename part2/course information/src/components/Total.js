import React from 'react';

const Total = (props) => (
  <p><b>total of {props.parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, 0)} exercises</b></p>
);

export default Total;
