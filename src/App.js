import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Game from './pages/Game';

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
          <Route exact path="/game" component={ Game } />
        </Switch>
      </div>
    );
  }
}

// bora time, projetinho novo começando.
