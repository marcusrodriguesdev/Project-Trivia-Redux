import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Settings from './Pages/Settings';

// Reactou Router no Componente APP
// Caminho '/' renderiza a página de Login

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/settings" component={ Settings } />
        <Route path="/" component={ Login } />
      </BrowserRouter>
    );
  }
}
