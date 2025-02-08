import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import Message from './components/Msg';
import Disconnect from './components/disconnect';
import { io } from 'socket.io-client';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  //TODO add socket connection
  return (
    <div className="App">
      <header className="App-header">
        {(!isSignedIn && <Signup setSigned={setIsSignedIn}></Signup>)}
        {(isSignedIn && <Disconnect discon={() => setIsSignedIn(false)}></Disconnect>)}
        <br />
        <Message autur={"ilay"} msg={"try design gfggfg"} time={"4.2 22:45"}></Message>
        {false && (<><img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a></>)}
      </header>

    </div >
  );
}

export default App;
