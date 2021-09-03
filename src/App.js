import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Settings from './Pages/Settings';
import Trivia from './Pages/Trivia';
import Ranking from './Pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/settings" component={ Settings } />
      <Route path="/trivia" component={ Trivia } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
