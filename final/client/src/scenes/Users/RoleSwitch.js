import React, { Component } from 'react'

import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
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

  persist() {
    let { active, role, user, accessToken } = this.state

    if (active == this.props.active) {
      return
    }

    if (active) {
      let api = 'http://localhost:3001/api/RoleMappings?access_token=' + accessToken
      let mapping = {
        "principalType": "USER",
        "principalId": user.id,
        "roleId": role.id
      }
      axios.post(api, mapping).then(function (response) { return })
    }

    if (!active) {
      let mapping = this.props.mapping
      let action = 'http://localhost:3001/api/RoleMappings/' + mapping.id + '?access_token=' + accessToken
      axios.delete(action).then(function (response) { return })
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
