import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import Error404 from "../Errors/404"
import UsersNew from "./UsersNew.js"
import UsersIndex from "./UsersIndex.js"
import UsersEdit from "./UsersEdit.js"
import SessionContext from '../../SessionContext'

class Configuration extends Component {
  render() {
    return(
      <Switch>
        <Route path="/Usuarios/new" exact component={UsersNew}/>
        <Route path="/Usuarios/" exact component={UsersIndex}/>
        <Route path="/Usuarios/update/:id" exact component={UsersEdit}/>
        <Route component={Error404}/>
      </Switch>
    )
  }
}

export default Configuration
