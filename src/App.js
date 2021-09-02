import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}
