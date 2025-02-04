import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import Message from './components/Msg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Signup></Signup>
      <br />
      <Message autur={"ilay"} msg={"try design gfggfg"} time={"4.2 22:45"}></Message>
        {false&&(<><img src={logo} className="App-logo" alt="logo" />
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
      
    </div>
  );
}

export default App;
