import React from 'react';
import './App.scss';

import Header from '../Header'
import PersonInfo from '../PersonInfo'
import Container from '../Container'
import SkillsPlane from '../SkillsPlane'

const skills = [
  {
    area: "Machine Learning",
    name: "keras",
    score: 2.5
  },
  {
    area: "Machine Learning",
    name: "sklearn",
    score: 3.5
  },
  {
    area: "Data Engineering",
    name: "pyspark",
    score: 3.8
  },
  {
    area: "MLOps",
    name: "AzureML",
    score: 4.6
  },
  {
    area: "Data Visualization",
    name: "plotly",
    score: 4
  },
  {
    area: "MLOps",
    name: "python",
    score: 5
  },
]

function App() {
  return (
    <div className="App d-flex flex-column align-items-center">
      <Header />
      <Container>
        <PersonInfo />
      </Container>
      <Container>
        <SkillsPlane skills={skills} />
      </Container>
    </div>
  );
}

export default App;
