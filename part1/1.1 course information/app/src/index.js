import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.title}</h1>
);

const Content = (props) => {
  return props.parts.map((part, i) => (<p key={i}>{part.name} {part.exercise}</p>));
};

const Total = (props) => (
  <p>Number of exercises {props.total}</p>
);

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header title={course} />
      <Content
        parts={[
          {
            name: part1,
            exercises: exercises1,
          },
          {
            name: part2,
            exercises: exercises2,
          },
          {
            name: part3,
            exercises: exercises3,
          },
        ]}
      />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
