import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './Game.css';
import './CreateQuestion.css';
import './Feedback.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/jogo" component={ Game } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/settings" component={ Settings } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
