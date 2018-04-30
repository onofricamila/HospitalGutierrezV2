import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import HomePage from "./scenes/Home/Home";
import Error404 from "./scenes/Errors/404";
import Error505 from "./scenes/Errors/505";
import Maintenance from "./scenes/Errors/Maintenance";
import NoResults from "./scenes/Errors/NoResults";
import AccessDenied from "./scenes/Errors/AccessDenied";
import Layout from "./components/Layout/Layout";

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/">
       <Layout>
            <Switch>
              {/* <Route path="/login" component={LoginPage} />
              <Route path="/patients" component={PatientsListPage} />
              <Route path="/users" component={UsersListPage} /> */}
              {/* <Route path="/" exact component={HomePage} /> */}
              <Route path="/AccessDenied" exact component={AccessDenied} />
              <Route path="/NoResults" exact component={NoResults} />
              <Route path="/Maintenance" exact component={Maintenance} />
              <Route path="/505" exact component={Error505} />
              <Route component={Error404} />
            </Switch>
        </ Layout>
      </BrowserRouter>
    );
  }
}

export default App;
