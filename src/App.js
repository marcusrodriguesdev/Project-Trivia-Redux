import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/question" />
      <Route exact path="/feedback" />
      <Route exact path="/ranking" />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
