import React, {  useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import { ChatsProvider } from './utils/ChatsContext';
function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState("");
  //TODO add socket connection
  return (
    <div className="App">
      <header className="App-header">
        <ChatsProvider>
          {(!isSignedIn && <Signup setSigned={setIsSignedIn} setName={setUser} ></Signup>)}
          {(isSignedIn && <HomePage user={user}
            setIsSignedIn={setIsSignedIn}
          ></HomePage>)}
        </ChatsProvider>
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
