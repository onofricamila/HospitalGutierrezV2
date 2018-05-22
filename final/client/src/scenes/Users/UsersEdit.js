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

class UsersEdit extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    accessToken: 'AaG5LebNVKhdGwzZ9Jd9VDH6IZ2z428togug2ziBzULmwGkTET9j4mYCveB6k8Gw',
    id: this.props.match.params.id,
    user: {},
    loading: true,
    redirect: false,
    passChange: false,
  }

  componentWillMount() {
    let id = this.state.id
    let accessToken = this.state.accessToken
    axios.get('http://localhost:3001/api/accounts/' + id + '?access_token=' + accessToken)
    .then(response => {
      this.setState({ user: response.data, loading: false })
    })
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

  handleUpdate = () => {
    let user = this.state.user
    let accessToken = this.state.accessToken
    let action = 'http://localhost:3001/api/accounts/' + user.id + '?access_token=' + accessToken

    axios.put(action, user)
    .then(response => {
      this.setState({ redirect: true })
    })
  }

  passButton() {
    return(
      <Grid item xl>
        <Button size="large" onClick={()=>{this.displayPassChange()}}>Cambiar contraseña</Button>
      </Grid>
    )
  }

  displayPassChange() {
    this.setState({ passChange: true })
  }

  hidePassChange() {
    this.setState({ passChange: false })
  }

  passForm() {
    return(
      <div>
        <Grid item xl>
          <TextField
            required
            id="pass1"
            label="Nueva Contraseña"
            className={this.props.classes.textField}
            onChange={this.handleChange('pass1')}
            margin="normal"
            type="pass"
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
            type="pass"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xl>
          <Button size="large" onClick={()=>{this.hidePassChange()}}>No cambiar Contraseña</Button>
        </Grid>
      </div>
    )
  }

  render() {
    let redirect = this.state.redirect
    if (redirect) {
      return(<Redirect push to="/Usuarios"/>)
    }

    let loading = this.state.loading
    if (loading) {
      return(<div></div>)
    }

    let classes = this.props.classes
    let user = this.state.user
    let passChange = this.state.passChange

    return(
      <Grid container spacing={24} style={{ padding: 20 }}>
        <Card className={classes.card}>
          <form noValidate autoComplete="off">
          <CardContent>
            <Grid item xl>
              <Typography variant="display3">Editar Configuracion</Typography>
              <br></br>
            </Grid>
            <Grid item xl>
              <Paper className={classes.paper}>
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
                <Grid item>
                  {(passChange) ? this.passForm() : this.passButton()}
                </Grid>
              </Paper>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid item xl>
              <Link to={'/Usuarios'}>
                <Button size="large">Cancelar</Button>
              </Link>
              <Button size="large" onClick={()=>{this.handleUpdate()}}>Confirmar</Button>
            </Grid>
          </CardActions>
        </form>
        </Card>
      </Grid>
    )
  }
}

UsersEdit.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(UsersEdit)
