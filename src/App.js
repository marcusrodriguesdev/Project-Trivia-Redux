import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './Pages/Login';
import Trivia from './Pages/Trivia';
import Settings from './Pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/trivia" component={ Trivia } />
      <Route path="/settings" component={ Settings } />
    </Switch>
  );
}
