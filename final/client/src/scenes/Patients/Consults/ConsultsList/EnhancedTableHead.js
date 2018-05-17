import React from 'react';
import PropTypes from 'prop-types';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  tableCell: {
    width: 200,
    textAlign: 'left',
  },
});

class EnhancedTableHead extends React.Component {
  
    createSortHandler = property => event => {
      this.props.onRequestSort(event, property);
    };
  
    render() {
      const { order, orderBy, classes} = this.props;

      const columnData = [
            {
            id: 'date',
            label: "Fecha",
            },
            {
            id: 'age',
            label: "Edad",
            },
            {
            id: 'weight',
            label: "Peso",
            },
            {
            id: "user",
            label: "Usuario que la realizó",
            },
      ];
    
      return (
        <TableHead>
          <TableRow>
            {columnData.map(column => {
              return (
                <TableCell className={classes.tableCell}
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
                      {column.label.trim()}
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

export default withStyles(styles)(EnhancedTableHead)