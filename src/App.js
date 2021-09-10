import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

import './App.css';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/game" component={ Game } />
        <Route path="/config" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
