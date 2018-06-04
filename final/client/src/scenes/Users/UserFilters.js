import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%',
  },
  paper: {
    margin: '24px',
    padding: '24px'
  },
  state: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '130px',
  },
  button: {
    margin: theme.spacing.unit,
  },
})

class UserFilters extends Component {
  state = {
    name: '',
    username: '',
    email: '',
    active: 'all',
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  filter() {
    let { name, username, email, active } = this.state
    let activeValue = (active === 'all') ? 'all' : (active === 'active' ? true : false)
    let filterBy = {
      name: !(name === ''),
      username: !(username === ''),
      email: !(email === ''),
      active: !(activeValue === 'all'),
    }
    this.props.filterFunc(name, activeValue, username, email, filterBy)
  }

  render() {
    let classes = this.props.classes
    return(
      <Paper className={classes.paper}>
        <Grid container spacing={24} alignContent={'center'}>
          <Grid item lg={3} sm={6} xs={12}>
            <TextField
              id="name"
              label="Nombre"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <TextField
              id="username"
              label="Nombre de Usuario"
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleChange('username')}
              margin="normal"
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <TextField
              id="email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <TextField
              id="active"
              select
              label="Estado"
              className={classes.state}
              value={this.state.active}
              onChange={this.handleChange('active')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              <MenuItem key="all" value="all">
                Todos
              </MenuItem>
              <MenuItem key="active" value="active">
                Activados
              </MenuItem>
              <MenuItem key="disabled" value="disabled">
                Desactivados
              </MenuItem>
            </TextField>
            <Button variant="fab" mini aria-label="Buscar" color="primary" className={classes.button} onClick={() => {this.filter()}}>
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(styles)(UserFilters)
