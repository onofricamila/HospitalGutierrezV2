import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import axios from "../../../axios/AxiosAPIReferences.js";
import CircularIndeterminate from '../../../components/CircularIndeterminate/CircularIndeterminate';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit * 2,
    width: 200,
  },
  root: {
    
  },
  textField: {
    margin: theme.spacing.unit * 2,
    width: 200,
  }
});

class ComposedTextField extends React.Component {
  state = {
    documentTypes: null,
    loading:true,
    patient: {
      name:'',
      lastname:'',
      documentType:'',
      dni:''
    }
  };

componentDidMount = () => {
  axios.get("tipo-documento").then(response => {
      this.setState({
      documentTypes: response.data,
      loading: false
      });
  });
  }

  handleChange = name => event => {
    this.setState({
      patient:{
        ...this.state.patient, 
        [name]: event.target.value
      }
    });
  };

  render() {
    const { classes } = this.props;

    const { patient: {  name, lastname, documentType, dni } } = this.state;

    let show;
    
    if (this.state.loading) {
      show = < CircularIndeterminate />
      
    } else {

      const documentTypes = [];
      Object.values(this.state.documentTypes).forEach(value => {
          documentTypes[value.id] = value.nombre
      });

      show = (
          <div className={classes.container}>
          <Grid container spacing={40}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={40}>
            <form className={classes.root}>
              <TextField
                id="name"
                label="Nombre"
                className={classes.textField}
                value={name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
              <TextField
                id="lastname"
                label="Apellido"
                className={classes.textField}
                value={lastname}
                onChange={this.handleChange('lastname')}
                margin="normal"
              />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="documentType">Tipo doc.</InputLabel>
                <Select
                  value={documentType}
                  onChange={this.handleChange('documentType')}
                >
                  {
                  documentTypes.map((docType, index) =>
                    <MenuItem value={index}>{docType}</MenuItem>
                  )
                  }
                </Select>
              </FormControl>
              <TextField
                id="dni"
                label="dni"
                value={dni}
                onChange={this.handleChange('dni')}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
              />
            </form>
            </Grid>
            </Grid>
            </Grid>
          </div>
        );
    }
    

    return show;
  }
}

ComposedTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComposedTextField);
