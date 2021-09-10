import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Config from './pages/Config';
import Ranking from './pages/Ranking';
import Game from './pages/Game';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/trivia" component={ Game } />
        <Route path="/config" component={ Config } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
