import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Game from './pages/Game';

import Login from './pages/Login';
import Settings from './pages/Settings';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/settings" component={ Settings } />
          <Route path="/game" component={ Game } />
        </Switch>
      </div>
    );
  }
}

export default App;
