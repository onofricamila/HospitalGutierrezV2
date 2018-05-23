import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./scenes/Home/Home";
import PatientsPage from "./scenes/Patients/Patients";
import ConfigurationPage from "./scenes/Configuration/Configuration";
import UsersPage from "./scenes/Users/Users";
import LoginPage from "./scenes/Login/Login";
import Error404 from "./scenes/Errors/404";
import Error505 from "./scenes/Errors/505";
import Maintenance from "./scenes/Errors/Maintenance";
import NoResults from "./scenes/Errors/NoResults";
import AccessDenied from "./scenes/Errors/AccessDenied";
import Layout from "./containers/Layout/Layout";
import DocumentTitle from "react-document-title";
import config from 'react-global-configuration';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedConfig: false,
      configuration: '',
    }
  }

  componentWillMount() {
    fetch('http://localhost:3001/api/Configurations')
      .then(response => response.json())
      .then(data => this.loadData(data[0]));
  }

  loadData(data) {
    data.api = 'http://localhost:3001/api/'
    data.articles = [
      {title: data.title1, description: data.descripcion1},
      {title: data.title2, description: data.descripcion2},
      {title: data.title3, description: data.descripcion3}
    ]
    data.reload = false
    config.set({ config: data }, { freeze: false })
    this.setState({ loadedConfig: true, configuration: data })
  }

  render() {
    let loadedConfig = this.state.loadedConfig
    if (!loadedConfig) {
      return <div></div>
    }

    let maintenance = this.state.configuration.maintenance
    let title = this.state.configuration.title

    if (maintenance) {
      return (
        <DocumentTitle title={title}>
          <BrowserRouter basename="/">
            <Layout>
              <Switch>
                <Route path="/Configuracion" component={ConfigurationPage} />
                <Route path="/Login" exact component={LoginPage} />
                <Route component={Maintenance} />
              </Switch>
            </Layout>
          </BrowserRouter>
        </DocumentTitle>
      )
    }

    return (
      <DocumentTitle title={title}>
        <BrowserRouter basename="/">
          <Layout>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/Login" exact component={LoginPage} />
              <Route path="/patients" component={PatientsPage} />
              <Route path="/AccessDenied" exact component={AccessDenied} />
              <Route path="/NoResults" exact component={NoResults} />
              <Route path="/Maintenance" exact component={Maintenance} />
              <Route path="/Configuracion" component={ConfigurationPage} />
              <Route path="/Usuarios" component={UsersPage} />
              <Route path="/505" exact component={Error505} />
              <Route component={Error404} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </DocumentTitle>
    );
  }
}

export default App;
