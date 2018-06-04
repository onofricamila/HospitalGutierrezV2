import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom";
import SessionContext from '../../SessionContext'

class GuestRoute extends Component {
  getComponent(session) {
    return session
      ? <Redirect to='/' />
      : <Route path={this.props.path} component={this.props.component} />
  }

  render() {
    return(
      <SessionContext.Consumer>
        {session => ( this.getComponent(session) )}
      </SessionContext.Consumer>
    )
  }
}

export default GuestRoute
