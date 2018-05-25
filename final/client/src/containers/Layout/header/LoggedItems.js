import React, { Component } from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import BubbleChartIcon from 'material-ui-icons/BubbleChart';
import PeopleIcon from 'material-ui-icons/People';
import PeopleOutlineIcon from 'material-ui-icons/PeopleOutline';
import SettingsIcon from 'material-ui-icons/Settings';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';
import {Link} from 'react-router-dom'
import Icon from '@material-ui/core/Icon';

import SessionContext from '../../../SessionContext';

class LoggedItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        { path: '/', icon: <HomeIcon /> , text: 'Inicio', reqRoles: [] },
        { path: '/patients/', icon: <PeopleIcon /> , text: 'Pacientes', reqRoles: ['Pediatra','Recepcionista','Administrador'] },
        { path: '/Usuarios', icon: <PeopleOutlineIcon /> , text: 'Usuarios', reqRoles: ['Administrador'] },
        { path: '/Reportes', icon: <BubbleChartIcon /> , text: 'Reportes', reqRoles: [] },
        { path: '/Configuracion', icon: <SettingsIcon /> , text: 'Configuración', reqRoles: ['Administrador'] },
      ],
    }
  }

  filteredItems(session) {
    let filteredItems = []
    this.state.items.forEach(item => {
      if (item.reqRoles.length == 0) { filteredItems.push(item) }
      if ( session.roles.some(role => item.reqRoles.includes(role)) ){ filteredItems.push(item) }
    })
    return filteredItems
  }

  render() {
    return(
      <div>
        {this.filteredItems(this.props.session).map(item => { return(
          <Link to={item.path}>
            <ListItem button>
              <ListItemIcon >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        )})}
        <ListItem button onClick={this.props.onLogout}>
          <ListItemIcon >
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </div>
    )
  }
}

export default LoggedItems
