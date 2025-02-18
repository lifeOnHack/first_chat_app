import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import { io } from 'socket.io-client';
import HomePage from './components/HomePage';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState("");
  //TODO add socket connection
  const [sock, setSocket] = useState(io("ws://localhost:7070"));
  return (
    <div className="App">
      <header className="App-header">
        {(!isSignedIn && <Signup setSigned={setIsSignedIn} setName={setUser}></Signup>)}
        {(isSignedIn && <HomePage user={user}
                          sock={sock}
                          setIsSignedIn={setIsSignedIn}
                          ></HomePage>)}
        <br />
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
