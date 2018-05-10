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
      title: '...'
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/Configurations/title')
      .then(response => response.json())
      .then(data => this.setState({ title: data.title }));
  }


  render() {
    let title = this.state.title
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
