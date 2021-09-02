import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import Settings from './pages/Settings';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
