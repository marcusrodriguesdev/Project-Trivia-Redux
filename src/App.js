import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ConfigPage from './pages/ConfigPage';

import './App.css';

// requisito 1
class App extends React.Component {
  componentDidMount() {
    const player = {
      name: '',
      assertions: '',
      score: '',
      gravatarEmail: '',
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Home } />
        <Route exact path="/ConfigPage" component={ ConfigPage } />
      </Switch>
    );
  }
}
export default App;
