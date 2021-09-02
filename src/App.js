import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Quiz from './pages/Quiz';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/quiz" component={ Quiz } />
        <Route exact path="/settings" component={ Settings } />
      </Switch>
    </div>
  );
}
