import React from 'react';
import { Route, Switch } from 'react-router';

import login from './pages/login';
import game from './pages/game';
import ranking from './pages/ranking';

import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ login } />
      <Route path="/game" component={ game } />
      <Route path="/ranking" component={ ranking } />
    </Switch>
  );
}
