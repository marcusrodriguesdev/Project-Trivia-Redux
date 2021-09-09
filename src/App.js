import React from 'react';
import { Route, Switch } from 'react-router-dom';

import login from './pages/login';
import game from './pages/game';
import feedback from './pages/feedback';
import ranking from './pages/ranking';
import GameConfig from './pages/gameConfig';

import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ login } />
      <Route path="/game" component={ game } />
      <Route path="/gameConfig" component={ GameConfig } />
      <Route path="/ranking" component={ ranking } />
      <Route path="/feedback" component={ feedback } />
    </Switch>
  );
}
