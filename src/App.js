import React from 'react';
import { Route, Switch } from 'react-router';

import './App.css';

import Configuration from './pages/Configuração';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route exact path="/game" render={ (props) => <Game { ...props } /> } />
      <Route exact path="/feedback" render={ (props) => <Feedback { ...props } /> } />
      <Route path="/configuration" component={ Configuration } />
    </Switch>
  );
}
