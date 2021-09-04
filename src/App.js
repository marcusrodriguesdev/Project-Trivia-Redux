import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/settings';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">

        <p>
          SUA VEZ
        </p>
      </header>
      <BrowserRouter>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
      </BrowserRouter>
    </div>
  );
}
