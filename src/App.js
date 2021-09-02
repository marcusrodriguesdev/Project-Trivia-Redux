import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Settings from './pages/Settings';

import './App.css';

import Login from './pages/Login';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/" component={ Settings } />
        </Switch>
      </div>
    );
  }
}

// bora time, projetinho novo começando.
