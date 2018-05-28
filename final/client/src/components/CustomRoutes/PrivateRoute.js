import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom";
import SessionContext from '../../SessionContext'
import AddPropsToRoute from '../../hoc/AddPropsToRoute'

class PrivateRoute extends Component {
  constructor(props) {
    super(props)
  }

  getComponent(session) {
    return session ? this.canAccess(session) : <Redirect to='/Login' />
  }

  canAccess(session) {
    let passingProps = {
      roles: session.roles,
      user: session.user.username
    }
    let canAccess = session.roles.some(role => this.props.permissions.includes(role))
    return canAccess ? <Route path={this.props.path} component={AddPropsToRoute(this.props.component, passingProps)}  roles={session.roles} /> : <Redirect to='/AccessDenied' />
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
