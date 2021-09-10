import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ConfigScreen from './pages/ConfigScreen';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import PageGame from './pages/PageGame';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/config" component={ ConfigScreen } />
      <Route exact path="/game" component={ PageGame } />
      <Route exatt path="/feedback" component={ Feedback } />
    </Switch>
  );
}
