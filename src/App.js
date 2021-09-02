import React from 'react';

import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Settings from './Pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/settings" component={ Settings } />
    </Switch>
  );
}
