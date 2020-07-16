import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
);

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
);

const Content = (props) => {
  return props.parts.map((part, i) => (<Part key={i} name={part.name} exercises={part.exercises} />));
};

const Total = (props) => (
  <p>Number of exercises {props.parts.reduce((acc, curr) => acc + curr.exercises, 0)}</p>
);

const App = () => {
  const course = 'Half Stack application development';
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
