import React, { Component } from "react"
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import config from 'react-global-configuration'
import axios from 'axios'

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
    display: 'flex',
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
  card: {
    maxWidth: 1200,
  }
})

class ConfigUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      config: '',
      redirect: false,
      globalConfig: config.get('config'),
    }
  }

  componentWillMount() {
    axios.get(config.get('config').api + 'Configurations')
    .then(response => {
      this.setState({ config: response.data[0] })
    })
    this.setState({ loading: false })
  }

  handleChange = name => event => {
    let currConfig = this.state.config
    this.setState({
      config: {
        ...currConfig,
        [name]: event.target.value,
      }
    })
  }

  updateGlobalConfig(data) {
    let prevConfig = this.state.globalConfig
    data.api = prevConfig.api
    data.articles = [
      {title: data.title1, description: data.descripcion1},
      {title: data.title2, description: data.descripcion2},
      {title: data.title3, description: data.descripcion3}
    ]
    data.reload = false
    config.set({ config: data }, { freeze: false })
    this.setState({ loadedConfig: true, configuration: data })
  }

  handleUpdate = () => {
    let configuration = this.state.config
    let action = config.get('config').api + 'Configurations/' + configuration.id + '/replace'
    axios.post(action, configuration)
    .then(response => {
      this.setState({ redirect: true })
    })
    this.updateGlobalConfig(configuration)
  }

  render() {
    let classes = this.props.classes
    let config = this.state.config

    if (this.state.redirect) {
      return(<Redirect push to="/Configuracion"/>)
    }

    if (this.state.loading) {
      return(<div></div>)
    }

    return(
      <Grid container spacing={24} style={{ padding: 20 }}>
        <Card className={classes.card}>
          <form className={classes.container} noValidate autoComplete="off">
          <CardContent>
            <Typography variant="display3">Editar Configuracion</Typography>

            <br/>

            <Paper className={classes.paper}>
                <TextField
                  required
                  id="title"
                  label="Titulo"
                  className={classes.textField}
                  value={config.title}
                  onChange={this.handleChange('title')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  required
                  id="email"
                  label="Email"
                  className={classes.textField}
                  value={config.email}
                  onChange={this.handleChange('email')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  required
                  id="elements"
                  label="Elements"
                  className={classes.numField}
                  value={config.elements}
                  onChange={this.handleChange('elements')}
                  margin="normal"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
            </Paper>
            <Grid container spacing={24} style={{ padding: 20 }}>
              <Grid item sm={12} md={6} lg={4} className="articleCard">
                <Card className="articleCard">
                  <CardContent>
                    <TextField
                      required
                      id="title1"
                      className={classes.titleField}
                      value={config.title1}
                      onChange={this.handleChange('title1')}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <br/>
                    <TextField
                      id="descripcion1"
                      multiline
                      value={config.descripcion1}
                      onChange={this.handleChange('descripcion1')}
                      className={classes.descField}
                      margin="normal"
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={12} md={6} lg={4} className="articleCard">
                <Card className="articleCard">
                  <CardContent>
                    <TextField
                      required
                      id="title2"
                      className={classes.titleField}
                      value={config.title2}
                      onChange={this.handleChange('title2')}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <br/>
                    <TextField
                      id="descripcion2"
                      multiline
                      value={config.descripcion2}
                      onChange={this.handleChange('descripcion2')}
                      className={classes.descField}
                      margin="normal"
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={12} md={6} lg={4} className="articleCard">
                <Card className="articleCard">
                  <CardContent>
                    <TextField
                      required
                      id="title3"
                      className={classes.titleField}
                      value={config.title3}
                      onChange={this.handleChange('title3')}
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <br/>
                    <TextField
                      id="descripcion3"
                      multiline
                      value={config.descripcion3}
                      onChange={this.handleChange('descripcion3')}
                      className={classes.descField}
                      margin="normal"
                    />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
          <Grid item xs={9}>
            <CardActions>
              <Link to={'/Configuracion'}>
                <Button size="large">Cancelar</Button>
              </Link>
              <Button
                size="large"
                onClick={ this.handleUpdate }
              >
                Confirmar
              </Button>
            </CardActions>
          </Grid>
        </form>
        </Card>
      </Grid>
    )
  }
}

ConfigUpdate.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ConfigUpdate)
