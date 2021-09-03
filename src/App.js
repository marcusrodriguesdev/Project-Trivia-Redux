import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/ranking" component={ Ranking } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/" component={ Login } />
      <Route exact path="/settings" component={ Settings } />
    </Switch>
  );
}
