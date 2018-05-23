import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'

import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import config from 'react-global-configuration'
import PropTypes from 'prop-types'

import login from '../../actions/authActions.js'

/*
import CardHeader from '@material-ui/core/CardHeader'

import Modal from 'react-responsive-modal'
import RoleSwitch from './RoleSwitch'
import Pagination from "react-js-pagination"
*/

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
  menu: {
    width: 200,
  },
})

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false,
    }
  }

/*
  login() {
    let { configuration, email, password } = this.state
    let credentials = { email: email, password: password }
    alert(JSON.stringify(credentials))
    axios.post(configuration.api + '/accounts/login', credentials)
    .then(response => {
      configuration.accessToken = response.data.id
      configuration.reload = true
      config.set({ config: configuration }, { freeze: false })
      this.setState({ configuration: configuration })
    })
    .catch(error => {
      alert('Usuario o contraseña incorrectos')
    })
  }
*/

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  submit() {
    let credentials = { email: this.state.email, password: this.state.password }
    login(credentials)
    .then(res => { this.context.router.push('/')})
    .catch(err => { '' })
/*
    axios.post(config.get('config').api + '/accounts/login', credentials)
    .then(response => {
      let token = response.data.id
      localStorage.setItem('jwtToken', token)
    })
    .catch(error => {
      this.setState({ isLoading: false })
    })
*/
  }

  render() {
    let classes = this.props.classes
    let { errors, password, email, isLoading } = this.state

    return(
      <Grid container spacing={24} style={{ padding: 20 }}>
        <Card className={classes.card}>
          <form>
          <CardContent>
            <Grid item xl>
              <Typography variant="display3">Login</Typography>
            </Grid>
            <Grid item xl>
                <Grid item>
                  <TextField
                    required
                    id="email"
                    label="Email"
                    className={classes.textField}
                    onChange={this.handleChange('email')}
                    margin="normal"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    required
                    id="password"
                    label="Contraseña"
                    className={classes.textField}
                    onChange={this.handleChange('password')}
                    type="password"
                    margin="normal"
                  />
                </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid item xl>
              <Link to={'/'}>
                <Button size="large">Cancelar</Button>
              </Link>
              <Button size="large" onClick={() => {this.submit()}}>Login</Button>
            </Grid>
          </CardActions>
        </form>
        </Card>
      </Grid>

    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)
