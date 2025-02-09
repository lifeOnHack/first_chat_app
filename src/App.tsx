import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import Disconnect from './components/Disconnect';
import MsgPage, { msgData } from './components/MsgPage';
import { io } from 'socket.io-client';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  //TODO add socket connection
  return (
    <div className="App">
      <header className="App-header">
        {(!isSignedIn && <Signup setSigned={setIsSignedIn}></Signup>)}
        {(isSignedIn && <Disconnect discon={() => setIsSignedIn(false)}></Disconnect>)}
        {(isSignedIn && <MsgPage msgList={[
          { author: "ilay1", msg: "hi", time: "9.2 10:30" },
          { author: "ilay2", msg: "byyvdvzvzxee", time: "9.2 10:30" },
          { author: "ilay3", msg: "1111", time: "9.2 10:30" }
        ]}></MsgPage>)}
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
