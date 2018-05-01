import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import BubbleChartIcon from 'material-ui-icons/BubbleChart';
import PeopleIcon from 'material-ui-icons/People';
import PeopleOutlineIcon from 'material-ui-icons/PeopleOutline';
import SettingsIcon from 'material-ui-icons/Settings';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';
import ReportIcon from 'material-ui-icons/Report';
import {Link} from 'react-router-dom'

export const listItems = (
  <div>
    <Link to="/"> 
      <ListItem button>
        <ListItemIcon >
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItem>
    </Link> 
    <Link to="/patients"> 
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Pacientes" />
      </ListItem>
    </Link> 
    <Link to="/Usuarios"> 
      <ListItem button>
        <ListItemIcon>
          <PeopleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItem>
    </Link> 
    <Link to="/Reportes"> 
      <ListItem button>
        <ListItemIcon>
          <BubbleChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reportes" />
      </ListItem>
    </Link> 
  </div>
);

export const otherListItems = (
  <div>
    <Link to="/Configuracion"> 
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Configuración" />
      </ListItem>
    </Link> 
    <Link to="/Logout"> 
      <ListItem button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Salir" />
      </ListItem>
    </Link> 
  </div>
);