import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom";
import SessionContext from '../../SessionContext'

class GuestRoute extends Component {
  constructor(props) {
    super(props)
  }

  getComponent(session) {
    return session == false
      ? <Route path={this.props.path} component={this.props.component} />
      : <Redirect to='/' />
  }

  render() {
    return(
      <SessionContext.Consumer>
        {session => ( this.getComponent() )}
      </SessionContext.Consumer>
    )
  }
}

export default GuestRoute
