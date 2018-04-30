import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from 'material-ui-icons/Home';
import BubbleChartIcon from 'material-ui-icons/BubbleChart';
import PeopleIcon from 'material-ui-icons/People';
import PeopleOutlineIcon from 'material-ui-icons/PeopleOutline';
import SettingsIcon from 'material-ui-icons/Settings';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';
import ReportIcon from 'material-ui-icons/Report';
import Error404 from "../../scenes/Errors/404";

export const listItems = (
  <div>
    <ListItem button>
      <ListItemIcon >
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Inicio" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Pacientes" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Usuarios" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BubbleChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reportes" />
    </ListItem>
  </div>
);

export const otherListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Configuración" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Salir" />
    </ListItem>
  </div>
);