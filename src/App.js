import React from 'react';
import { Switch, Route } from 'react-router-dom';

import login from './pages/Login';
import game from './pages/Game';
import settings from './pages/Settings';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ login } />
      <Route path="/game" component={ game } />
      <Route path="/settings" component={ settings } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
