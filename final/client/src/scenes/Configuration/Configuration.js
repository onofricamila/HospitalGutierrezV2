import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import ConfigIndex from "./ConfigIndex.js"
import ConfigUpdate from "./ConfigUpdate.js"
import Error404 from "../Errors/404"

class Configuration extends Component {
  render() {
    return(
      <Switch>
        <Route path="/Configuracion/update" exact component={ConfigUpdate}/>
        <Route path="/Configuracion/" exact component={ConfigIndex}/>
        <Route component={Error404}/>
      </Switch>
    )
  }
}

export default Configuration
