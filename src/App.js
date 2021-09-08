import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Configuration from './pages/Configuração';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/configuration" component={ Configuration } />
    </Switch>
  );
}
