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
import axiosBackend from "../../../../axios/Backend";
import DeleteModal from '../../../../containers/AlertDialog/AlertDialog';
import EnhancedTableHead from './EnhancedTableHead.js'
import EnhancedTableToolbar from './EnhancedTableToolbar'
import Moment from 'react-moment';
import FixedBottomButton from '../../../../components/FixedBottomButton/FixedBottomButton';

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
  tableCell: {
    width: 200,
    textAlign: 'left',
  },
});

class EnhancedTable extends React.Component {
  
  constructor(props, context) {
    super(props, context);

    this.state = {
      deleteModal: {
        open: false,
        consult: '',
        id: ''
      },
      order: 'asc',
      orderBy: 'id',
      consults: [],
      patient: '',
      page: 0,
      rowsPerPage: 0,
    };
  }

  fetchConsults(){
    axiosBackend.get('/patients/' + this.props.routeProps.match.params.idP + '/consults').then(response => {
      this.setState({
      consults: response.data.sort((a, b) => (a.id > b.id ? -1 : 1))
      });
    });
  }

  fetchPatient(){
    axiosBackend.get('/patients/' + this.props.routeProps.match.params.idP).then(response => {
      this.setState({
      patient: response.data
      });
    });
  }

  fetchPaginationData(){
    axiosBackend.get("Configurations/elements").then(response => {
      this.setState({
      rowsPerPage: response.data.elements,
      });
    });
  }

  componentWillMount = () => {
    this.fetchPaginationData()
    this.fetchConsults()
    this.fetchPatient()
  }
  
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const consults =
      order === 'desc'
        ? this.state.consults.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.consults.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ consults, order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

 
  deleteConsultHandler = (id) =>{
    axiosBackend.delete('/patients/' + this.props.routeProps.match.params.idP + '/consults/' + id).then(response => {
        console.log(response);
        let consults = this.state.consults
        
        for (var pat in consults) {
          if (consults[pat].id === id) {
            delete consults[pat]; 
          }
        }
        this.setState({
          consults: consults,
          deleteModal: {
            open: false, 
          }
        })
    });
  }

  handleDeleteModalClickOpen = (consult, id) => {
    this.setState({ 
      deleteModal: {
        open: true, 
        consult: consult, 
        id: id
      } 
    });
  };

  render() {
    const { classes } = this.props;
    const { consults, patient, order, orderBy, rowsPerPage, page, deleteModal } = this.state;

    return (
      <Fragment>
      {/* DELETE MODAL */}
      <DeleteModal 
          title={'Atención! Operación irreversible'}
          consult={deleteModal.consult}
          body={'Estas a punto de eliminar a la consulta del dia "' + deleteModal.consult 
                  + '" para "' + patient.lastname + ', ' + patient.name 
                  + '". Estas seguro que quieres proseguir?'}
          open={deleteModal.open} 
          onAgree={() => this.deleteConsultHandler(deleteModal.id)}/>


      {/* TABLE STRUCTURE */}
      <Paper className={classes.root}>
        <EnhancedTableToolbar />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={consults.length}
            />
            <TableBody>
              {consults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                return (
                    <TableRow
                      hover
                      key={n.id}
                      >
                      <TableCell className={classes.tableCell}>
                        <Tooltip title="Show">
                          <Link to={n.id} key={n.id}>    
                            {new Date(n.date).toLocaleDateString()}
                          </Link>
                        </Tooltip>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                      {<Moment to={n.date} ago>{patient.date}</Moment>}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {n.weight}
                      </TableCell>
                      <TableCell className={classes.tableCell}numeric>
                        {n.user}
                      </TableCell> 
                      <TableCell className={classes.tableCell}>
                        <Tooltip title="Delete">
                            <DeleteIcon 
                              style={{cursor: 'pointer', fontSize: 18}}
                              onClick={() => this.handleDeleteModalClickOpen(new Date(n.date).toLocaleDateString(), n.id)}/>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <Link to={'update/' + n.id} key={n.id}>    
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
          count={consults.length}
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
      <FixedBottomButton path={'/patients/' + patient.id + '/consults/new'} />
      </Fragment>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);