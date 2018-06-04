import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import config from 'react-global-configuration';
import MaintenanceSwitch from './MaintenanceSwitch.js';

const styles = theme => ({
  card: {
    minWidth: 500,
    maxWidth: 1000,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class ConfigIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      config: config.get('config'),
    }
  }

/*
  componentWillMount() {
    let action = config.get('config').api + 'Configurations'
    axios.get(action)
    .then(response => {
      this.setState({ loading: false, config: response.data[0] })
    })
  }
*/

  render() {
    let classes = this.props.classes
    let config = this.state.config

    let articles = config.articles

    let data = [
      {name: "Titulo", value: config.title},
      {name: "Email", value: config.email},
      {name: "Elementos", value: config.elements}
    ]

    return (
      <Grid container spacing={24} style={{ padding: 20 }} justify='center'>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="display3">Configuración</Typography>

            <br/>

            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableBody>
                  <TableRow>
                    <TableCell>Mantenimiento</TableCell>
                    <TableCell><MaintenanceSwitch/></TableCell>
                  </TableRow>

                  {data.map(n => {
                    return(
                      <TableRow key={n.id}>
                        <TableCell>{n.name}</TableCell>
                        <TableCell>{n.value}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Paper>
          </CardContent>
          <Grid container spacing={24} style={{ padding: 20 }} >
            {articles.map(a => {
              return(
                <Grid item xs={12} sm={4}>
                  <Card >
                    <CardHeader title={a.title}/>
                    <CardContent >
                      <p style={{height: 300, overflow: 'scroll'}}>{a.description}</p>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
          <CardActions>
            <Link to={'/Configuracion/update'}>
              <Button size="large">Editar</Button>
            </Link>
          </CardActions>
        </Card>
        </Grid>
    )
  }
}

ConfigIndex.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfigIndex);
