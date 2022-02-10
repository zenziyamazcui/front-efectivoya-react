import React , {Component} from 'react'
import ReactDom from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Vw_Onboring from './layout/Onbording'
import COMP_Login  from './components/login/comp_login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import COMP_desaprobado from './components/login/comp_desaprobado';
import COMP_verify from "./components/login/comp_verify";
import { COMP_aprobado } from './components/login/comp_aprobado';

ReactDom.render(
  <div id="w">
    <Router>
      <Switch>
        <Route exact path="/">
          <Vw_Onboring />
        </Route>
        <Route path="/login">
          <COMP_Login />
        </Route>
        <Route path="/verify/:token">
          <COMP_verify />
        </Route>
        <Route path="/*">
        <Vw_Onboring />
        </Route>
      </Switch>
    </Router>
  </div>,
  document.getElementById("z")
);