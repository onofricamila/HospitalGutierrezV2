import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom";
import SessionContext from '../../SessionContext'

class PrivateRoute extends Component {
  constructor(props) {
    super(props)
  }

  getComponent(session) {
    return session ? this.canAccess(session) : <Redirect to='/Login' />
  }

  canAccess(session) {
    let canAccess = session.roles.some(role => this.props.permissions.includes(role))
    return canAccess ? <Route path={this.props.path} component={this.props.component} /> : <Redirect to='/AccessDenied' />
  }

  render() {
    return(
      <SessionContext.Consumer>
        {session => (this.getComponent(session))}
      </SessionContext.Consumer>
    )
  }
}

export default PrivateRoute
