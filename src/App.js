import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GamePage from './Pages/GamePage';
import Login from './Pages/Login';
import Settings from './Pages/Settings';
import './App.css';

// Reactou Router no Componente APP
// Caminho '/' renderiza a página de Login

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ GamePage } />
          <Route path="/settings" component={ Settings } />
        </Switch>
      </BrowserRouter>
    );
  }
}
