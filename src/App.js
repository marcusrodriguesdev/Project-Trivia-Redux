import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Feedback from './Pages/Feedback';
import Game from './Pages/Game';
import Initial from './Pages/Initial';
import Settings from './Pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Initial } />
        <Route exact path="/configuracoes" component={ Settings } />
        <Route exact path="/jogo" component={ Game } />
        <Route exact path="/feedback" component={ Feedback } />
      </Switch>
    </BrowserRouter>
  );
}
