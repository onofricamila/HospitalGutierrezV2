import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import axios from "../../../axios/AxiosAPIReferences";
import CircularIndeterminate from '../../../components/CircularIndeterminate/CircularIndeterminate';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import { path } from "../../../axios/AxiosAPIReferences"

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
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class ComposedTextField extends React.Component {
  state = {
    loading:true,
    patient: {
      name:'',
      lastname:'',
      documentType:'',
      dni:''
    },
    demographicData: {},
    apiData: {
      documentTypes: this.props.documentTypes,
    }
    
  };

  // componentDidMount = () => {
  //   axios
  //     .all([
  //       axios.get(path + "obra-social"),
  //       axios.get(path + "tipo-vivienda"),
  //       axios.get(path + "tipo-agua"),
  //       axios.get(path + "tipo-calefaccion")
  //     ])
  //     .then(
  //       axios.spread(
  //         (insurance, houseTypes, waterTypes, heatingTypes) => {
  //           this.setState(({ apiData }) => ({
  //             apiData: {
  //               ...apiData,
  //               insurances: insurance.data,
  //               houseTypes: houseTypes.data,
  //               waterTypes: waterTypes.data,
  //               heatingTypes: heatingTypes.data
  //             }
  //           }))
  //         }
  //       )
  //     )
  // }

  handleChange = name => event => {
    this.setState({
      patient:{
        ...this.state.patient, 
        [name]: event.target.value
      }
    });
  };

  handleSubmit = () =>{
    // TODO: validate

  }

  render() {
    const { classes, documentTypes } = this.props;

    const { patient: {  name, lastname, documentType, dni } } = this.state;

    let show;
    
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
                this.props.documentTypes.map((docType, index) =>
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
            <Button 
              color="primary" 
              className={classes.button}
              onClick={this.handleSubmit}>
              Primary
            </Button>
          </form>
          </Grid>
          </Grid>
          </Grid>
        </div>
      );
  
    return show;
  }
}

ComposedTextField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComposedTextField);
