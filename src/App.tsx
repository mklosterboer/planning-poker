import React from 'react';
import './App.css';
// import Header from './Components/Common/Header';
import { Switch, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import NotFoundPage from './Components/NotFoundPage';
import { Container } from 'react-bootstrap';
import { UserProvider } from './Contexts/UserContext/UserStore';
import FirebaseProvider from './Contexts/FirebaseContext/FirebaseStore';
import { SessionProvider } from './Contexts/SessionContext/SessionStore';
import { SessionLeader } from './Components/SessionLeader';
import { JoinSession } from './Components/JoinSession';

function App() {
  return (
    <Container fluid>
      {/* <Header /> */}
      <SessionProvider>
        <UserProvider>
          <FirebaseProvider>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/session/:id" exact component={SessionLeader} />
              <Route path="/session/:id/join" exact component={JoinSession} />
              <Route component={NotFoundPage} />
            </Switch>
          </FirebaseProvider>
        </UserProvider>
      </SessionProvider>
    </Container>
  );
}

export default App;
