import React, { Component } from 'react';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

import config from 'react-global-configuration';
import axios from 'axios';

class MaintenanceSwitch extends Component {
  state = {
    maintenance: config.get('maintenance')
  };

  handleChange = name => event => {
    axios.put(config.get('API') + 'Configurations/toggleMaintenance')
    this.setState({ maintenance: event.target.checked })
  };

  render() {
    let active = this.state.maintenance
    let label = (active ? 'Activado' : 'Desactivado')

    return (
      <FormControlLabel
        control={
          <Switch
            checked={active}
            onChange={this.handleChange()}
          />
        }
        label={label}
      />
    );
  }
}

export default MaintenanceSwitch
