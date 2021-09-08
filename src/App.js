import React from 'react';
import { Route, Switch } from 'react-router-dom';
import logo from './trivia.png';
import './App.css';
import Game from './pages/Game';
import Login from './pages/Login';
import Configuration from './pages/Configuration';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <Switch>
            <Route exact path="/game" component={ Game } />
            <Route exact path="/" component={ Login } />
            <Route exact path="/config" component={ Configuration } />
            <Route path="/feedback" component={ Feedback } />
            <Route exact path="/ranking" component={ Ranking } />
          </Switch>
        </header>
      </div>
    );
  }
}

export default App;
