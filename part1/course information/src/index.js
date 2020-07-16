import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.title}</h1>
);

const Part = (props) => (
  <p>{props.name} {props.exercises}</p>
);

const Content = (props) => {
  return props.parts.map((part, i) => (<Part key={i} name={part.name} exercises={part.exercises} />));
};

const Total = (props) => (
  <p>Number of exercises {props.total}</p>
);

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header title={course} />
      <Content parts={[part1, part2, part3]} />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
