import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}
