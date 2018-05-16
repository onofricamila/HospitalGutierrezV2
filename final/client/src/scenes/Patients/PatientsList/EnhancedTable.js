import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import {Link} from 'react-router-dom';
import { InputLabel } from 'material-ui/Input';
import { FormControl} from 'material-ui/Form';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Grid from 'material-ui/Grid';
import axiosBackend from "../../../axios/Backend";
import DeleteModal from '../../../containers/AlertDialog/AlertDialog';
import EnhancedTableHead from './EnhancedTableHead.js'
import EnhancedTableToolbar from './EnhancedTableToolbar'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  formControl: {
    margin: theme.spacing.unit * 2,
    width: 200,
  },
  textField: {
    margin: theme.spacing.unit * 2,
    width: 200,
  },
  
});

class EnhancedTable extends React.Component {
  
  constructor(props, context) {
    super(props, context);

    this.state = {
      deleteModal: {
        open: false,
        patient: '',
        id: ''
      },
      order: 'asc',
      orderBy: 'id',
      selected: [],
      data: [],
      page: 0,
      rowsPerPage: 0,
      filter: {
        name: '',
        lastname: '',
        documentType: '',
        dni: '',
      }
    };
  }

  componentWillMount = () => {
    axiosBackend.get("Configurations/elements").then(response => {
        this.setState({
        rowsPerPage: response.data.elements,
        });
    });
    axiosBackend.get("patients").then(response => {
      this.setState({
      data: response.data.sort((a, b) => (a.id > b.id ? -1 : 1))
      });
    });
  }
  
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleFilterChange = field => event => {
    let currentState = this.state;
    let currentFilter = this.state.filter;
    this.setState({
        ...currentState, 
        filter: {
          ...currentFilter, 
          [field]: event.target.value
        } 
    });
  };

  filterData = (data) =>{
    let filter = this.state.filter
    let filteredData = data.filter(item => {
      for (var key in filter) {
          if (filter[key].toString().trim() !== '') {
            if (!item[key].toString().toLowerCase().includes(filter[key].toString().toLowerCase()))
              return false;
          }
      }
      return true;
    });

    return filteredData;
  };
 
  deletePatientHandler = (id) =>{
    axiosBackend.delete('patients/' + id).then(response => {
        console.log(response);
        let patients = this.state.data
        
        for (var pat in patients) {
          if (patients[pat].id === id) {
            delete patients[pat]; 
          }
        }
        this.setState({
          data: patients,
          deleteModal: {
            open: false, 
          }
        })
    });
  }

  handleDeleteModalClickOpen = (patient, id) => {
    this.setState({ 
      deleteModal: {
        open: true, 
        patient: patient, 
        id: id
      } 
    });
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, filter, deleteModal } = this.state;
    const filteredData = this.filterData(data);

    return (
      <Fragment>
      {/* DELETE MODAL */}
      <DeleteModal 
          title={'Atención! Operación irreversible'}
          patient={deleteModal.patient}
          body={'Estas a punto de eliminar a "' + deleteModal.patient + '". Estas seguro que quieres proseguir?'}
          open={deleteModal.open} 
          onAgree={() => this.deletePatientHandler(deleteModal.id)}/>

      {/* FILTER FORM */}
      <Grid item xs={12}>
        <form className={classes.root} autoComplete="off" style={{marginTop:0}}>
            <TextField
              id="name"
              label="Nombre"
              className={classes.textField}
              value={filter.name}
              onChange={this.handleFilterChange('name')}
              margin="normal"
            />
            <TextField
              id="lastname"
              label="Apellido"
              className={classes.textField}
              value={filter.lastname}
              onChange={this.handleFilterChange('lastname')}
              margin="normal"
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="documentType">Tipo doc.</InputLabel>
              <Select
                value={filter.documentType}
                onChange={this.handleFilterChange('documentType')}
                >
                {this.props.documentTypes.map((docType, index) =>
                  <MenuItem key={index} value={index}>{docType}</MenuItem>
                )}
              </Select>
            </FormControl>
            <TextField
              id="dni"
              label="DNI"
              className={classes.textField}
              value={filter.dni}
              onChange={this.handleFilterChange('dni')}
              margin="normal"
            />
        </form>
      </Grid>

      {/* TABLE STRUCTURE */}
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              columnData={this.props.columnData}
            />
            <TableBody>
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                return (
                    <TableRow
                      hover
                      key={n.id}
                      >
                      <TableCell >
                        <Tooltip title="Show">
                          <Link to={'patients/' + n.id} key={n.id}>    
                            {n.name}
                          </Link>
                        </Tooltip>
                      </TableCell>
                      <TableCell >
                        {n.lastname}
                      </TableCell>
                      <TableCell numeric>
                        {
                          this.props.documentTypes[n.documentType]
                        }
                      </TableCell>
                      <TableCell numeric>
                        {n.dni}
                      </TableCell> 
                      <TableCell >
                        <Tooltip title="Delete">
                            <DeleteIcon 
                              style={{cursor: 'pointer', fontSize: 18}}
                              onClick={() => this.handleDeleteModalClickOpen(n.lastname + ', ' + n.name, n.id)}/>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <Link to={'patients/update/' + n.id} key={n.id}>    
                            <EditIcon style={{cursor: 'pointer', fontSize: 18}} />
                          </Link>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                );
              })
            }
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={filteredData.length}
          rowsPerPage={this.state.rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          rowsPerPageOptions={[]}
        />
      </Paper>
      </Fragment>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);