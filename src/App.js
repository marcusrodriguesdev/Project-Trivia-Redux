import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import FeedBack from './pages/FeedBack';
// import GamePage from './pages/GamePage';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Trivia from './pages/Trivia';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/trivia" component={ Trivia } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ FeedBack } />
    </Switch>
  );
}
