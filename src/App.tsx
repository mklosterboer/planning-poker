import React from 'react';
import './App.css';
// import Header from './Components/Common/Header';
import { Switch, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import NotFoundPage from './Components/NotFoundPage';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container fluid>
      {/* <Header /> */}
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Container>
  );
}

export default App;
