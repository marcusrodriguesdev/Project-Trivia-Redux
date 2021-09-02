import React from 'react';

import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';

export default function App() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
    </Switch>
  );
}
