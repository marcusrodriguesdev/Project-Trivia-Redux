import React from 'react';
// import logo from './trivia.png';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login.js';
import Home from './pages/Home';

import './App.css';

// requisito 1
class App extends React.Component {
  render() {
    return (

      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Home } />
      </Switch>

    );
  }
}

export default App;
