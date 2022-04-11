import React from 'react';
import './App.scss';

import Header from '../Header'
import PersonInfo from '../PersonInfo'
import Container from '../Container'
import SkillsPlane from '../SkillsPlane';
import {Area, Level} from '../SkillsPlane/types'

const skills = [
  {
    areas: [Area.MACHINE_LEARNING],
    name: "keras",
    level: Level.USED_ONCE
  },
  {
    areas: [Area.MACHINE_LEARNING],
    name: "sklearn",
    level: Level.USED_FREQUENTLY
  },
  {
    areas: [Area.DATA_ENGINEERING],
    name: "pyspark",
    level: Level.USED_FREQUENTLY
  },
  {
    areas: [Area.DATA_ENGINEERING],
    name: "kafka",
    level: Level.INTERACTED_WITH
  },
  {
    areas: [Area.MLOPS],
    name: "AzureML",
    level: Level.STILL_LEARNING
  },
  {
    areas: [Area.DATA_VISUALIZATION],
    name: "plotly",
    level: Level.USED_EVERYDAY
  },
  {
    areas: [Area.DATA_ENGINEERING, Area.MACHINE_LEARNING, Area.MLOPS],
    name: "python",
    level: Level.STILL_LEARNING
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
