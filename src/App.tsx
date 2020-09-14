import React from 'react';
import './App.css';
// import Header from './Components/Common/Header';
import { Switch, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import NotFoundPage from './Components/NotFoundPage';
import { Container } from 'react-bootstrap';
import { UserStore } from './Contexts/UserContext';
import FirebaseProvider from './Contexts/FirebaseContext/FirebaseStore';

function App() {
  return (
    <Container fluid>
      {/* <Header /> */}
      <UserStore.UserProvider>
        <FirebaseProvider>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </FirebaseProvider>
      </UserStore.UserProvider>
    </Container>
  );
}

export default App;
