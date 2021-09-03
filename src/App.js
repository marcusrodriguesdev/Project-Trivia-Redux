import React from 'react';
import { Route, Switch } from 'react-router';
import logo from './trivia.png';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Switch>
            <Route path="/Game">
              <Game />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
          </Switch>
        </header>
      </div>
    );
  }
}

export default App;
