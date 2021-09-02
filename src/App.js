import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Question from './pages/Question';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/question" component={ Question } />
      <Route exact path="/feedback" />
      <Route exact path="/ranking" />
      <Route exact path="/settings" component={ Settings } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
