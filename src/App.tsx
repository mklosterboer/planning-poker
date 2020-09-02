import React from 'react';
import './App.css';
import firebase from "./Firebase";

function App() {
  const [dbValue, setDbValue] = React.useState("initialValue");

  React.useEffect(() => {
    const fbRef = firebase.database().ref("test");

    fbRef.on('value', snapshot => {
      let fbValue = snapshot.val();
      setDbValue(fbValue);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Planning Poker</h1>
      </header>
      <div>{dbValue}</div>
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
