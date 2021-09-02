import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import login from './pages/login';
import game from './pages/game';
import ranking from './pages/ranking';

import './App.css';
import GameConfig from './pages/gameConfig';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ login } />
        <Route path="/game" component={ game } />
        <Route path="/gameConfig" component={ GameConfig } />
        <Route path="/ranking" component={ ranking } />
      </Switch>
    </BrowserRouter>
  );
}
