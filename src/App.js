import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/play" component={ Game } />
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}
