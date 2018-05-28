import React, { Component } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import axios from 'axios'

class RoleSwitch extends Component {
  constructor(props) {
    super(props)
    this.state = { active: props.active, role: props.role, user: props.user, accessToken: props.accessToken }
  }

  handleChange = name => event => {
    this.setState({ active: event.target.checked })
  };

  persist(session, reloadLogged) {
    let { active, role, user, accessToken } = this.state

    if (active === this.props.active) {
      return new Promise((resolve, reject) => { setTimeout(function() { resolve("¡Éxito!") }, 250) })
    }

    if (active) {
      let api = 'http://localhost:3001/api/RoleMappings?access_token=' + accessToken
      let mapping = {
        "principalType": "USER",
        "principalId": user.id,
        "roleId": role.id
      }
      return axios.post(api, mapping)
    }

    if (!active) {
      let mapping = this.props.mapping
      let action = 'http://localhost:3001/api/RoleMappings/' + mapping.id + '?access_token=' + accessToken
      return axios.delete(action)
    }
  }

  render() {
    let { active, role, user, accessToken } = this.state

    return (
      <FormControlLabel
        control={
          <Switch
            checked={active}
            onChange={this.handleChange()}
          />
        }
        label={role.name}
      />
    );
  }
}

export default RoleSwitch
