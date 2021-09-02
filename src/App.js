import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Login from './Pages/Login';
import Setting from './Pages/Setting';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Setting } />
    </Switch>
  );
}
