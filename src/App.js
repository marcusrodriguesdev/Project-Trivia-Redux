import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Settings from './pages/Settings';
import Login from './pages/Login';
import HeaderProfile from './components/HeaderProfile';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/headerprofile" component={ HeaderProfile } />
      </Switch>
    </div>
  );
}
