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

import setAuthorizationToken from '../../utils/setAuthorizationToken'

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
      redirect: false,
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  submit() {
    let credentials = { email: this.state.email, password: this.state.password }
    axios.post('http://localhost:3001/api/accounts/login', credentials)
    .then(res => {
      let token = res.data.id
      localStorage.setItem('jwtToken', token)
      setAuthorizationToken(token)
      this.props.onLogin(res.data)
    })
    .catch(err => {
      alert(JSON.stringify(err))
    })
    this.setState({ redirect: true })
  }

  render() {
    let classes = this.props.classes
    let { errors, password, email, isLoading } = this.state

    if (this.state.redirect) {
      return(<Redirect push to="/"/>)
    }

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
  onLogin: PropTypes.func.isRequired
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withStyles(styles)(Login)
