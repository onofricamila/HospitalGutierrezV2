import React, { Component } from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import HomeIcon from 'material-ui-icons/Home';
import LoginIcon from '@material-ui/icons/Airplay';

import {Link} from 'react-router-dom'

import SessionContext from '../../../SessionContext';

class GuestItems extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [
        { path: '/', icon: <HomeIcon /> , text: 'Inicio' },
        { path: '/Login/', icon: <LoginIcon /> , text: 'Ingresar' },
      ],
    }
  }

  render() {
    return(
      <div>
        {this.state.items.map(item => { return(
          <Link to={item.path}>
            <ListItem button>
              <ListItemIcon >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        )})}
      </div>
    )
  }
}

export default GuestItems
