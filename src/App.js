import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import GameScreen from './pages/GameScreen';
import Login from './pages/Login';
import ConfigWindow from './pages/ConfigWindow';
import FeedBack from './pages/FeedBack';
import GameRanking from './pages/GameRanking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/config" component={ ConfigWindow } />
        <Route path="/game" component={ GameScreen } />
        <Route path="/feedback" component={ FeedBack } />
        <Route path="/ranking" component={ GameRanking } />
      </Switch>
    </div>
  );
}
