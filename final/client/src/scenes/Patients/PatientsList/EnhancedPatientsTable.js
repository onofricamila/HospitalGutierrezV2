import React, {Fragment} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import { lighten } from 'material-ui/styles/colorManipulator';
import {Link} from 'react-router-dom';
import { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import Grid from 'material-ui/Grid';
import axiosBackend from "../../../axios/Backend";

class EnhancedTableHead extends React.Component {
  
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, rowCount, columnData} = this.props;

    return (
      <TableHead>
        <TableRow>
          
          {columnData.map(column => {
            return (
              <TableCell 
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
          <TableCell padding={'default'}>
            {'Acciones'}
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
          <Typography variant="title">PACIENTES</Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          null
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

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
      data: response.data.sort((a, b) => (a.id < b.id ? -1 : 1))
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

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
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
          if (filter[key].toString().trim() != '') {
            if (!item[key].toString().toLowerCase().includes(filter[key].toString().toLowerCase()))
              return false;
          }
      }
      return true;
    });

    return filteredData;
  };

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page, filter } = this.state;
    
    return (
      <Fragment>
      {/* FILTER FORM */}
      <div className={classes.container}>
      <Grid container>
      <Grid item xs={12}>
        <form className={classes.root} autoComplete="off">
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
                {
                this.props.documentTypes.map((docType, index) =>
                  <MenuItem value={index}>{docType}</MenuItem>
                )
                }
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
      </Grid>
      </div>
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
              {this.filterData(data).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
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
                    
                    <TableCell >{n.lastname}</TableCell>
                    <TableCell numeric>
                      {
                        this.props.documentTypes[n.documentType]
                      }
                    </TableCell>
                    <TableCell numeric>{n.dni}</TableCell> 
                    <TableCell >
                      <Tooltip title="Delete">
                        <Link to={'patients/' + n.id} key={n.id}>    
                          <DeleteIcon />
                        </Link>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <Link to={'patients/' + n.id} key={n.id}>    
                          <EditIcon />
                        </Link>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={this.state.rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
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