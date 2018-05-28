import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import axios from 'axios'
import PropTypes from 'prop-types'
import SessionContext from '../../SessionContext'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  numField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100,
  },
  titleField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  descField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  menu: {
    width: 200,
  },
})

class UsersNew extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      redirect: false,
    }
  }

  handleChange = name => event => {
    let currUser = this.state.user
    this.setState({
      user: {
        ...currUser,
        [name]: event.target.value,
      }
    })
  }

  handleCreate = (session) => {
    let data = this.state.user
    let accessToken = session.accessToken
    let action = 'http://localhost:3001/api/accounts/'

    let user = {
      active: false,
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      password: data.pass1
    }

    axios.post(action, user)
    .then(response => {
      this.setState({ user: {}, redirect: true })
    })
    .catch(err => {
      alert(JSON.stringify(err))
    })
  }

  render() {
    let classes = this.props.classes
    let { redirect, user } = this.state

    if (redirect) {
      return(<Redirect push to="/Usuarios"/>)
    }

    return(
      <Grid container spacing={24} style={{ padding: 20 }} justify='center'>
        <Card className={classes.card}>
          <form noValidate autoComplete="off">
          <CardContent>
            <Grid item xl>
              <Typography variant="display3">Nuevo Usuario</Typography>
              <br></br>
            </Grid>
            <Grid item xl>
                <Grid item>
                  <TextField
                    required
                    id="lastName"
                    label="Apellido"
                    className={classes.textField}
                    value={user.lastName}
                    onChange={this.handleChange('lastName')}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    id="firstName"
                    label="Nombre"
                    className={classes.textField}
                    value={user.firstName}
                    onChange={this.handleChange('firstName')}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    id="email"
                    label="Email"
                    className={classes.textField}
                    value={user.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    id="username"
                    label="Usuario"
                    className={classes.textField}
                    value={user.username}
                    onChange={this.handleChange('username')}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xl>
                  <TextField
                    required
                    id="pass1"
                    label="Contraseña"
                    className={this.props.classes.textField}
                    onChange={this.handleChange('pass1')}
                    margin="normal"
                    type="password"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xl>
                  <TextField
                    required
                    id="pass2"
                    label="Repetir Contraseña"
                    className={this.props.classes.textField}
                    onChange={this.handleChange('pass2')}
                    margin="normal"
                    type="password"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid item xl>
              <Link to={'/Usuarios'}>
                <Button size="large">Cancelar</Button>
              </Link>
              <SessionContext.Consumer>
                {session => {
                  return (<Button size="large" onClick={()=>{this.handleCreate(session)}}>Confirmar</Button>)
                }}
              </SessionContext.Consumer>
            </Grid>
          </CardActions>
        </form>
        </Card>
      </Grid>
    )
  }
}

UsersNew.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UsersNew)
