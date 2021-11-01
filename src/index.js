import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from './components/home'
import Login from './components/login'
import Register from './components/register' 
import Dashboard from './components/jobs/dashboard'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
      <Route path="/home" component={Home}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


