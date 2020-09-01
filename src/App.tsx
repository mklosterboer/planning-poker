import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Planning Poker</h1>
      </header>
      <div id="main">
        <div id="create-session" className="main-section">
          <h2>
            Create a new session
          </h2>
        </div>
        <div className="vertical-rule"></div>
        <div id="join-session" className="main-section">
          <h2>
            Join an existing session
          </h2>
        </div>
      </div>
    </div>
  );
}

export default App;
