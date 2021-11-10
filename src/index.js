import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from './components/home'
import Login from './components/login'
import Register from './components/register' 
import Dashboardform from './components/jobs/dashboardform';
import Editjob from './components/editjob'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
      
      <Route path="/home" component={Home}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/dashboard" component={Dashboardform}></Route>
      <Route path="/editjob" component={Editjob}></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


