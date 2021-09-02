import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Initial from './Pages/Initial';
import Settings from './Pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Initial } />
        <Route exact path="/configuracoes" component={ Settings } />
      </Switch>
    </BrowserRouter>
  );
}
