import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ConfigScreen from './pages/ConfigScreen';
import Login from './pages/Login';

export default function App() {
  return (
    <div>
      <Route exact path="/" component={ Login } />
      <Route exact path="/config" component={ ConfigScreen } />
    </div>
  );
}
