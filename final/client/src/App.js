import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./scenes/Home/Home";
import PatientsPage from "./scenes/Patients/Patients";
import Error404 from "./scenes/Errors/404";
import Error505 from "./scenes/Errors/505";
import Maintenance from "./scenes/Errors/Maintenance";
import NoResults from "./scenes/Errors/NoResults";
import AccessDenied from "./scenes/Errors/AccessDenied";
import Layout from "./containers/Layout/Layout";
import DocumentTitle from "react-document-title";

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: {
        title: '...',
        loadedMaintenance: false,
        maintenance: null
      }
    }
  }

  componentWillMount() {
    fetch('http://localhost:3001/api/Configurations')
      .then(response => response.json())
      .then(data => this.loadData(data[0]));
  }

  loadData(data) {
    let title = data.title
    let maintenance = data.maintenance
    let email = data.email

    this.setState({
      config: {
        title: title,
        loadedMaintenance: true,
        maintenance: maintenance,
        email: email
      }
    })
  }

  render() {
    let config = this.state.config
    let title = config.title
    let maintenance = config.maintenance
    let loadedMaintenance = config.loadedMaintenance
    let email = config.email

    if (!loadedMaintenance) {
      return <div></div>
    }

    if (maintenance) {
      return (
        <DocumentTitle title={title}>
          <Maintenance config={config}/>
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
