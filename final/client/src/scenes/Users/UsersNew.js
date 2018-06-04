import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
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
  state = {
    user: {
      lastName: '',
      firstName: '',
      email: '',
      username: '',
      pass1: '',
      pass2: '',
    },
    rules: {
      lastName: {
        required: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      firstName: {
        required: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      email: {
        required: true,
        isEmail: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      username: {
        required: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      pass1: {
        required: true,
        isPass: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      pass2: {
        required: true,
        isPass: true,
        helperText: '',
        valid: false,
        touched: false,
      }
    },
    formIsValid: false,
    redirect: false,
  }

  handleChange = name => event => {
    let currentRules = this.state.rules;
    let currUser = this.state.user

    this.setState({
      user: {
        ...currUser,
        [name]: event.target.value,
      },
      rules:{
        ...currentRules,
        [name]: {
          ...currentRules[name],
          valid: this.validate(name, event.target.value, currentRules[name]),
          touched: true
        }
      },
    })
  }

  validateRequired(value){
    return typeof value === "string" ?
              value.trim().length > 0 :
              value.toString().length > 0;
  }

  validateEmail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePasswords(pass, field){
    let otherPass = (field == 'pass1') ? this.state.user.pass2 : this.state.user.pass1

    if (otherPass == '') return true

    return pass == otherPass
  }

  validate(field, value, rules){
    if(rules.required){
      if (!this.validateRequired(value)) {
        rules.helperText = 'Campo obligatorio';
        return false;
      }
    }

    if(rules.isEmail){
      if (!this.validateEmail(value)) {
        rules.helperText = 'Email invalido';
        return false;
      }
    }

    if (rules.isPass) {
      let rule1 = this.state.rules.pass1
      let rule2 = this.state.rules.pass2
      if (!this.validatePasswords(value, field)) {
        rule1.helperText = 'Contraseñas no coinciden';
        rule2.helperText = 'Contraseñas no coinciden';
        rule1.valid = false;
        rule2.valid = false;
        return false;
      }
      if (field == 'pass1' && rule2.helperText == 'Contraseñas no coinciden') {
        rule2.helperText = '';
        rule2.valid = true;
      }
      if (field == 'pass2' && rule1.helperText == 'Contraseñas no coinciden') {
        rule1.helperText = '';
        rule1.valid = true;
      }
    }

    rules.helperText = '';
    return true;
  }

  canSubmit(){
    let formIsValid = true;
    let currentState = this.state;
    let currentRules = this.state.rules;

    for (let f in currentRules){
      formIsValid = currentRules[f].valid && formIsValid;
    }

    this.setState({
      ...currentState,
      formIsValid: formIsValid
    });

    if (!formIsValid) {
      for (let f in currentRules){
        currentRules[f].touched = true;
      }
      this.setState({
        rules: currentRules
      })
      return false;
    }
    return true
  }

  handleCreate = (session) => {
    if (!this.canSubmit()) {
      return false
    }

    let data = this.state.user
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
                    id="lastName"
                    label="Apellido"
                    className={classes.textField}
                    value={user.lastName}
                    onChange={this.handleChange('lastName')}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.rules.lastName.touched ? !this.state.rules.lastName.valid : false}
                    helperText={this.state.rules.lastName.helperText}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="firstName"
                    label="Nombre"
                    className={classes.textField}
                    value={user.firstName}
                    onChange={this.handleChange('firstName')}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.rules.firstName.touched ? !this.state.rules.firstName.valid : false}
                    helperText={this.state.rules.firstName.helperText}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="email"
                    label="Email"
                    className={classes.textField}
                    value={user.email}
                    onChange={this.handleChange('email')}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.rules.email.touched ? !this.state.rules.email.valid : false}
                    helperText={this.state.rules.email.helperText}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="username"
                    label="Usuario"
                    className={classes.textField}
                    value={user.username}
                    onChange={this.handleChange('username')}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.rules.username.touched ? !this.state.rules.username.valid : false}
                    helperText={this.state.rules.username.helperText}
                  />
                </Grid>
                <Grid item xl>
                  <TextField
                    id="pass1"
                    label="Contraseña"
                    className={this.props.classes.textField}
                    onChange={this.handleChange('pass1')}
                    margin="normal"
                    type="password"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.rules.pass1.touched ? !this.state.rules.pass1.valid : false}
                    helperText={this.state.rules.pass1.helperText}
                  />
                </Grid>
                <Grid item xl>
                  <TextField
                    id="pass2"
                    label="Repetir Contraseña"
                    className={this.props.classes.textField}
                    onChange={this.handleChange('pass2')}
                    margin="normal"
                    type="password"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={this.state.rules.pass2.touched ? !this.state.rules.pass2.valid : false}
                    helperText={this.state.rules.pass2.helperText}
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
