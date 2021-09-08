import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Configuration from './pages/Configuração';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route path="/configuration" component={ Configuration } />
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route exact path="/game" render={ (props) => <Game { ...props } /> } />
    </Switch>
  );
}
