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
import ChartsPage from './scenes/Charts/Charts'

import SessionContext from './SessionContext'
import ReloadLoggedContext from './EditLoggedContext'
import axios from 'axios'
import PrivateRoute from './components/CustomRoutes/PrivateRoute'
import GuestRoute from './components/CustomRoutes/GuestRoute'
import 'moment/locale/es';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedConfig: false,
      configuration: '',
      session: false,
      redirect: false,
    }
  }

/*
  getUser(id) {
    axios.get(this.state.configuration.api + 'accounts/' + id)
    .then(res => {
      this.setState({ user: res.data })
    })
  }

  getRoles(id) {
    axios.get(this.state.configuration.api + 'accounts/' + id + '/roles')
    .then(res => {
      let roles = res.data.map(role => { return role.name })
      this.setState({ roles: roles })
    })
  }

  onLogin = (data) => {
    this.getUser(data.userId)
    this.getRoles(data.userId)
    this.setState({ logged: true, accessToken: data.id })
  }
*/

  onLogin = (data) => {
    let id = data.userId
    axios.get(this.state.configuration.api + 'accounts/' + id)
    .then(userResponse => {
      axios.get(this.state.configuration.api + 'accounts/' + id + '/roles')
      .then(rolesResponse => {
        let user = userResponse.data
        let roles = rolesResponse.data.map(role => { return role.name })
        let accessToken = data.id

        let session = {
          user: user,
          roles: roles,
          accessToken: accessToken,
        }
        this.setState({ session: session })
        localStorage.setItem("session", JSON.stringify(session));
      })
    })
  }

  onLogout = () => {
    this.setState({ session: false, redirect: true })
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('session')
    delete axios.defaults.headers.common['Authorization']
  }

  componentWillMount() {
    fetch('http://localhost:3001/api/Configurations')
      .then(response => response.json())
      .then(data => this.loadData(data[0]));
    let oldSession = localStorage.getItem('session')
    if (!(oldSession === null)) {
      this.setState({ session: JSON.parse(oldSession) })
    }
  }

  reloadLogged = () => {
    let data = { userId: this.state.session.user.id, id: this.state.session.accessToken }
    this.onLogin(data)
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

    const LoginPageWProps = () => {
      return (<LoginPage onLogin={this.onLogin.bind(this)}/>)
    }

    if (maintenance) {
      return (
        <SessionContext.Provider value={this.state.session}>
          <DocumentTitle title={title}>
            <BrowserRouter basename="/">
              <Layout onLogout={this.onLogout.bind(this)} session={this.state.session}>
                <Switch>
                  <GuestRoute path="/Login" exact component={LoginPageWProps} />
                  <PrivateRoute path="/Configuracion" component={ConfigurationPage} permissions="Administrador" />
                  <Route path="/AccessDenied" exact component={AccessDenied} />
                  <Route component={Maintenance} />
                </Switch>
              </Layout>
            </BrowserRouter>
          </DocumentTitle>
        </SessionContext.Provider>
      )
    }

    return (
      <SessionContext.Provider value={this.state.session}>
        <ReloadLoggedContext.Provider value={this.reloadLogged.bind(this)}>
          <DocumentTitle title={title}>
            <BrowserRouter basename="/">
              <Layout onLogout={this.onLogout.bind(this)} session={this.state.session}>
                <Switch>
                  <Route path="/" exact component={HomePage} />
                  <PrivateRoute path="/patients" component={PatientsPage} permissions={["Pediatra","Recepcionista","Administrador"]} />
                  <GuestRoute path="/Login" exact component={LoginPageWProps} />
                  <PrivateRoute path="/Configuracion" component={ConfigurationPage} permissions={["Administrador"]} />
                  <PrivateRoute path="/Usuarios" component={UsersPage} permissions={["Administrador"]} />
                  <Route path="/charts" exact component={ChartsPage} />
                  <Route path="/505" exact component={Error505} />
                  <Route path="/AccessDenied" exact component={AccessDenied} />
                  <Route path="/Maintenance" exact component={Maintenance} />
                  <Route path="/NoResults" exact component={NoResults} />
                  <Route component={Error404} />
                </Switch>
              </Layout>
            </BrowserRouter>
          </DocumentTitle>
        </ReloadLoggedContext.Provider>
      </SessionContext.Provider>
    );
  }
}

export default App;
