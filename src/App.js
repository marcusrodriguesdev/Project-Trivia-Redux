import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Login from './pages/Login';

export default function App() {
  return (
    <div>
      <Switch>

        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/play" component={ Game } />

      </Switch>
    </div>
  );
}
