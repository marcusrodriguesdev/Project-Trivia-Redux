import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Initial from './Pages/Initial';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={ Initial } />
      </Switch>
    </BrowserRouter>
  );
}
