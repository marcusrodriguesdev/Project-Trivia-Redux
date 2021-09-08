import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Feedback from './Pages/Feedback';
import Game from './Pages/Game';
import Login from './Pages/Login';
import Setting from './Pages/Setting';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/Game" component={ Game } />
      <Route path="/settings" component={ Setting } />
      <Route path="/feedback" component={ Feedback } />
    </Switch>
  );
}
