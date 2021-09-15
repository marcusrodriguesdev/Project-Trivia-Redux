import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FeedBack from './pages/FeedBack';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';
import Trivia from './pages/Trivia';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/trivia" component={ Trivia } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ FeedBack } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
