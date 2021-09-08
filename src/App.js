import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ConfigScreen from './pages/ConfigScreen';
import Login from './pages/Login';
import PageGame from './pages/PageGame';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/config" component={ ConfigScreen } />
      <Route exact path="/game" component={ PageGame } />
      <Route exact path="/ranking" component={ Ranking } />
    </Switch>
  );
}
