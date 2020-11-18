import './App.css';
import Home from './Home';
import Login from './Login';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
