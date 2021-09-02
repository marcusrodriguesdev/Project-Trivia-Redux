import React from 'react';
import { Switch, Route } from 'react-router-dom';

import login from './pages/Login';
import game from './pages/Game';
import settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ login } />
      <Route path="/game" component={ game } />
      <Route path="/settings" component={ settings } />
    </Switch>
  );
}
