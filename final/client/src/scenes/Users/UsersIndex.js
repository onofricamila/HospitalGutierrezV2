import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { Link } from 'react-router-dom'
import axios from 'axios'
import config from 'react-global-configuration'
import Modal from 'react-responsive-modal'
import PropTypes from 'prop-types'
import RoleSwitch from './RoleSwitch'
import Pagination from "react-js-pagination"

const styles = theme => ({
  hide: {
    display: 'none',
  }
})

class UsersIndex extends Component {
  constructor(props) {
    super(props)
    this.switches = []
  }

  state = {
    loading: true,
    accessToken: 'AaG5LebNVKhdGwzZ9Jd9VDH6IZ2z428togug2ziBzULmwGkTET9j4mYCveB6k8Gw',
    users: [],
    roles: [],
    mappings: [],
    editingRoles: false,
    userIndex: 1,
    offset: 0,
    activePage: 1
  }

  loadElements() {
    axios.get('http://localhost:3001/api/' + 'Configurations/elements')
    .then(response => {
      this.setState({ elements: response.data.elements })
    })
  }

  loadUsers() {
    axios.get('http://localhost:3001/api/accounts?access_token=' + this.state.accessToken)
    .then(response => {
      this.setState({ users: response.data })
    })
  }

  loadRoles() {
    axios.get('http://localhost:3001/api/Roles?access_token=' + this.state.accessToken)
    .then(response => {
      this.setState({ roles: response.data })
    })
  }

  loadRoleMappings() {
    axios.get('http://localhost:3001/api/RoleMappings?access_token=' + this.state.accessToken)
    .then(response => {
      this.setState({ mappings: response.data })
    })
  }

  toggleUserState(i, id) {
    axios.put('http://localhost:3001/api/accounts/' + id + '/toggleState?access_token=' + this.state.accessToken)
    let currUsers = this.state.users
    currUsers[i].active = !currUsers[i].active
    this.setState({ users: currUsers })
  }

  componentWillMount() {
    this.loadElements()
    this.loadUsers()
    this.loadRoles()
    this.loadRoleMappings()
    this.setState({ loading: false })
  }

  userMappings(id) {
     return this.state.mappings.filter(function(mapping) { return(mapping.principalId == id) })
  }

  userRoles(id) {
    let userMappings = this.userMappings(id)
    let roleIDs = userMappings.map(function(mapping) { return(mapping.roleId) })
    return this.state.roles.filter(function(role) { return(roleIDs.some(v => role.id == v)) })
  }

  userRolesNames(id) {
    let userRoles = this.userRoles(id)
    let userRolesNames = userRoles.map(function(role) { return(role.name) })
    return(userRolesNames.join(', ') || 'Guest')
  }

  roleMapping(role, mappings) {
    return mappings.find(function(mapping) {
      return mapping.roleId == role.id
    })
  }

  openRolesModal(index) {
    this.setState({ editingRoles: true, userIndex: index })
  }

  closeRolesModal() {
    this.setState({ editingRoles: false, userIndex: -1 })
  }

  updateRoles() {
    this.switches.forEach(function(roleSwitch) {
      roleSwitch.persist()
    })
    this.closeRolesModal()
    window.location.reload()
  }

  getPageCount() {
    return this.state.users.length / config.get('config').elements
  }

  getPagination() {
    let classes = this.props.classes
    return(
      <div>
        <Pagination
          hideDisabled
          activePage={this.state.activePage}
          itemsCountPerPage={config.get('config').elements}
          totalItemsCount={this.state.users.length}
          onChange={(pageNumber) => this.handlePageChange(pageNumber - 1)}
        />
      </div>
    )
  }

  handlePageChange(pageNumber) {
    let offset = config.get('config').elements * pageNumber
    this.setState({activePage: pageNumber, offset: offset})
  }

  gridClass(index) {
    let min = this.state.offset
    let max = min + config.get('config').elements
    if (min <= index && max > index) {
      return ''
    }
    return this.props.classes.hide
  }

  render() {
    let classes = this.props.classes

    let { loading, accessToken, users, roles, mappings, editingRoles, userIndex, offset } = this.state

    if (loading) {
      return(<div></div>)
    }

    let editedUser = {
      firstName: '',
      lastName: '',
      roles: [],
      mappings: [],
    }

    if (editingRoles) {
      editedUser = users[userIndex]
      editedUser.roles = this.userRoles(editedUser.id)
      editedUser.mappings = this.userMappings(editedUser.id)
    }

    return(
      <div className="container">
        <Modal open={editingRoles} onClose={() => this.closeRolesModal()} center>
          <h2>Editando roles de {editedUser.firstName + ', ' + editedUser.lastName}</h2>
          <Grid>
            {roles.map((role, index) => { return(
              <Grid item>
                <RoleSwitch
                  ref={(roleSwitch) => {this.switches[index] = roleSwitch}}
                  active={editedUser.roles.includes(role)}
                  role={role} user={editedUser} mapping={this.roleMapping(role, editedUser.mappings)}
                  accessToken={accessToken}
                />
              </Grid>
            )})}
          </Grid>
          <Button size="large" onClick={()=>{this.updateRoles()}}>Confirmar</Button>
          <Button size="large" onClick={()=>{this.closeRolesModal()}}>Cancelar</Button>
        </Modal>
        <Card>
          <CardContent>
            <Typography variant="display3">Usuarios</Typography>
            <Grid container spacing={24} style={{ padding: 20 }}>
              {users.map((user, index) => {return(
                <Grid item xs={12} md={6} lg={4} xl={3} className={this.gridClass(index)}>
                  <Card>
                    <CardHeader title={user.lastName + ', ' + user.firstName}/>
                    <CardContent>
                      <Typography variant="body1">Email: {user.email}</Typography>
                      <Typography variant="body1">Usuario: {user.username}</Typography>
                      <Typography variant="body1">Activo: {(user.active) ? 'Si' : 'No'}</Typography>
                      <Typography variant="body1">Roles: { this.userRolesNames(user.id) }</Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => { this.toggleUserState(index, user.id) } }>{(user.active) ? 'Desactivar' : 'Activar'}</Button>
                      <Link to={ '/Usuarios/update/' + user.id }>
                        <Button size="small">Actualizar</Button>
                      </Link>
                      <Button size="small" onClick={() => { this.openRolesModal(index) }}>Administrar Roles</Button>
                    </CardActions>
                  </Card>
                </Grid>
              )})}
            </Grid>
            <Grid>
              {(this.getPageCount() > 1) ? this.getPagination() : <div></div>}
            </Grid>
          </CardContent>
        </Card>
      </div>
    )
  }
}

UsersIndex.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersIndex)
