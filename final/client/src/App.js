import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./scenes/Home/Home";
import PatientsPage from "./scenes/Patients/Patients";
import ConfigurationPage from "./scenes/Configuration/Configuration";
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
      loadedConfig: false
    }
  }

  componentWillMount() {
    fetch('http://localhost:3001/api/Configurations')
      .then(response => response.json())
      .then(data => this.loadData(data[0]));
  }

  loadData(data) {
    config.set({
      title: data.title,
      email: data.email,
      elements: data.elements,
      maintenance: data.maintenance
    })

    this.setState({ loadedConfig: true })
  }

  render() {
    let loadedConfig = this.state.loadedConfig
    if (!loadedConfig) {
      return <div></div>
    }

    let maintenance = config.get('maintenance')
    let title = config.get('title')

    if (maintenance) {
      return (
        <DocumentTitle title={title}>
          <Maintenance/>
        </DocumentTitle>
      )
    }

    return (
      <DocumentTitle title={title}>
        <BrowserRouter basename="/">
          <Layout>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/patients" component={PatientsPage} />
              <Route path="/AccessDenied" exact component={AccessDenied} />
              <Route path="/NoResults" exact component={NoResults} />
              <Route path="/Maintenance" exact component={Maintenance} />
              <Route path="/Configuracion" exact component={ConfigurationPage} />
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
