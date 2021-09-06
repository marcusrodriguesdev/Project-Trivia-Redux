import React from 'react';
import { Route, Switch } from 'react-router';
// import logo from './trivia.png';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/settings';

export default function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <p>
          SUA VEZ
        </p>
      </header> */}
      <Switch>
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
