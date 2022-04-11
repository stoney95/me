import React from 'react';
import './App.scss';

import Header from '../Header'
import PersonInfo from '../PersonInfo'
import Container from '../Container'
import SkillsPlane from '../SkillsPlane';





function App() {
  return (
    <div className="App d-flex flex-column align-items-center">
      <Header />
      <Container>
        <PersonInfo />
      </Container>
      <Container>
        <SkillsPlane/>
      </Container>
    </div>
  );
}

export default App;
