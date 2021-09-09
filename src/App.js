import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Question from './pages/Question';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/question" component={ Question } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
      <Route exact path="/settings" component={ Settings } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
