import React, { useEffect, useState } from 'react';
import './App.scss';

import Header from '../Header'
import PersonInfo from '../PersonInfo'
import Container from '../Container'
import Content from '../Content'
import TiteledContainer from '../TiteledContainer'
import SkillsPlane from '../SkillsPlane';
import CrossSectionSkills from '../CrossSectionSkills'
import WorkExperience from '../WorkExperience'

import { MousePositionProvider } from '../../context/cursor/mousePosition';

const skills = [
  {
    title: "Methodologies",
    skill: [
      {name: "Kanban", level: 3},
      {name: "Scrum", level: 5},
      {name: "CRISP-DM", level: 5},
      {name: "CRISP-ML(Q)", level: 3},
    ]
  },
  {
    title: "Cloud Providers",
    skill: [
      {name: "Azure", level: 4},
      {name: "AWS", level: 2},
      {name: "GCP", level: 1},
    ]
  },
  {
    title: "Other Skills",
    skill: [
      {name: "Communication", level: 4},
      {name: "Specification", level: 5},
      {name: "Documentation", level: 4},
    ]
  },
]


function App() {
  return (
    <MousePositionProvider>
      <div className="App d-flex flex-column align-items-center">
        <Header />
        <Content>
          <Container>
            <PersonInfo />
          </Container>
          <TiteledContainer title="Skills">
            <SkillsPlane/>
          </TiteledContainer>
          <TiteledContainer title="Cross Section Skills">
            <CrossSectionSkills skills={skills}/>
          </TiteledContainer>
          <Container>
            <WorkExperience />
          </Container>
        </Content>
      </div>
    </MousePositionProvider>
  );
}

export default App;
