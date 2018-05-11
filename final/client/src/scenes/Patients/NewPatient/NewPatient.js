import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { FormControl} from 'material-ui/Form';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import axiosBackend from "../../../axios/Backend";
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit * 2,
    width: 200,
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
    patient: {
      name:'',
      lastname:'',
      date:'',
      genre:'',
      documentType:'',
      dni:'', 
      address: '',
      phoneNumber:'',
      insurance: '',
      fridge: '',
      electricity: '',
      pet: '',
      waterType: '',
      houseType: '',
      heatingType: '',
    },
    rules: {
      name: {
        required: true,
        helperText: '',
        valid: false,
      },
      lastname:{
        required: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      date:{
        required: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      genre:{
        required: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      documentType:{
        required: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      dni:{
        required: true,
        numeric: true,
        helperText: '',
        valid: false,
        touched: false,
      }, 
      address: {
        required: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      phoneNumber:{
        required: false,
        numeric: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      insurance: {
        required: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      fridge: {
        required: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      electricity: {
        required: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      pet: {
        required: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      waterType: {
        required: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      houseType: {
        required: true,
        helperText: '',
        valid: false,
        touched: false,
      },
      heatingType: {
        required: true,
        helperText: '',
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    apiData: {
      documentTypes: this.props.documentTypes,
      insurances: this.props.insurances,
      waterTypes: this.props.waterTypes,
      houseTypes: this.props.houseTypes,
      heatingTypes: this.props.heatingTypes,
    }
    
  };

  handleChange = field => event => {
    let currentRules = this.state.rules;
    let currentPatient = this.state.patient;
   
    this.setState({
      patient:{
        ...currentPatient, 
        [field]: event.target.value
      },
      rules:{
        ...currentRules, 
        [field]: {
          ...currentRules[field],
          valid: this.validate(field, event.target.value, currentRules[field]),
          touched: true
        } 
      },
    });
  };

  validateRequired(value){
    return typeof value === "string" ?
              value.trim().length > 0 :
              value.toString().length > 0;
  }

  validate(field, value, rules){
    // TODO: finish all validations

    if(rules.required){
      if (!this.validateRequired(value)) {
        rules.helperText = 'Campo obligatorio';
        return false;
      }
    }

    if(rules.numeric){
      if (!/^([0-9])*$/.test(value)) {
        rules.helperText = 'Solo números';
        return false;
      }
    }

    if(rules.valid) rules.helperText = '';
    return true;
  }

  handleSubmit = () =>{
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
      alert('El formulario no se puede enviar!');
      return false;
    }
    
    alert('El estado del formulario es aceptable. Ahora se haria el requerimiento post');

    // post request si true lo anterior
    const data = this.state.patient;

    axiosBackend.post("patients", data).then( response =>
      console.log(response)
    );
  }

  render() {
    const { classes, documentTypes, insurances, waterTypes, houseTypes, heatingTypes } = this.props;

    const { patient: {  name, lastname, date, genre, documentType, dni, address, phoneNumber, insurance, fridge, electricity, pet, waterType, houseType, heatingType } } = this.state;

    let show;
    
    show = (
        <div className={classes.container}>
        <Grid container spacing={40}>
          <Grid item xs={12}>
              <Grid container justify="center" spacing={40}>
          <form className={classes.root} validate autoComplete="off">
            <TextField
              id="name"
              label="Nombre"
              className={classes.textField}
              value={name}
              onChange={this.handleChange('name')}
              margin="normal"
              error={this.state.rules.name.touched ? !this.state.rules.name.valid : false}
              helperText={this.state.rules.name.helperText}
            />
            <TextField
              id="lastname"
              label="Apellido"
              className={classes.textField}
              value={lastname}
              onChange={this.handleChange('lastname')}
              margin="normal"
              error={this.state.rules.lastname.touched ? !this.state.rules.lastname.valid : false}
              helperText={!this.state.rules.lastname.valid ? this.state.rules.lastname.helperText : ''}
            />
            <TextField
              id="date"
              label="Fecha de nacimiento"
              type="date"
              value={date}
              defaultValue=""
              onChange={this.handleChange('date')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              error={this.state.rules.date.touched ? !this.state.rules.date.valid : false}
              helperText={this.state.rules.date.helperText}
            /> 
            <FormControl className={classes.formControl} 
                error={this.state.rules.genre.touched ? !this.state.rules.genre.valid : false}
                helperText={this.state.rules.genre.helperText}>
              <InputLabel htmlFor="genre">Género</InputLabel>
              <Select
                value={genre}
                onChange={this.handleChange('genre')}
                error={this.state.rules.genre.touched ? !this.state.rules.genre.valid : false}
                helperText={this.state.rules.genre.helperText}
              >
                  <MenuItem value='female'>Femenino</MenuItem>
                  <MenuItem value='male'>Masculino</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}
              error={this.state.rules.documentType.tocuhed ? !this.state.rules.documentType.valid : false}
              helperText={this.state.rules.documentType.helperText}>
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
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              error={this.state.rules.dni.touched ? !this.state.rules.dni.valid : false}
                helperText={this.state.rules.dni.helperText}
            />
            <TextField
              id="address"
              label="Dirección"
              multiline
              rowsMax="4"
              value={address}
              onChange={this.handleChange('address')}
              className={classes.textField}
              margin="normal"
              error={this.state.rules.address.touched ? !this.state.rules.address.valid : false}
                helperText={this.state.rules.address.helperText}
            />
            <TextField
              id="phoneNumber"
              label="Numero de telefono"
              value={phoneNumber}
              onChange={this.handleChange('phoneNumber')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              error={this.state.rules.phoneNumber.touched ? !this.state.rules.phoneNumber.valid : false}
              helperText={this.state.rules.phoneNumber.helperText}
            />
            <FormControl className={classes.formControl} 
              error={this.state.rules.insurance.touched ? !this.state.rules.insurance.valid : false}
              helperText={this.state.rules.insurance.helperText} >
              <InputLabel htmlFor="insurance">Obra social</InputLabel>
              <Select
                value={insurance}
                onChange={this.handleChange('insurance')}
              >
                {
                insurances.map((ins, index) =>
                  <MenuItem value={index}>{ins}</MenuItem>
                )
                }
              </Select>
            </FormControl>
            <FormControl className={classes.formControl} 
                error={this.state.rules.fridge.touched ? !this.state.rules.fridge.valid : false}
                helperText={this.state.rules.fridge.helperText}>
              <InputLabel htmlFor="fridge">Heladera?</InputLabel>
              <Select
                value={fridge}
                onChange={this.handleChange('fridge')}
              >
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}
              error={this.state.rules.electricity.touched ? !this.state.rules.electricity.valid : false}
              helperText={this.state.rules.electricity.helperText}>
              <InputLabel htmlFor="electricity">Electricidad?</InputLabel>
              <Select
                value={electricity}
                onChange={this.handleChange('electricity')}
              >
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl} 
               error={this.state.rules.pet.touched ? !this.state.rules.pet.valid : false}
               helperText={this.state.rules.pet.helperText}>
              <InputLabel htmlFor="pet">Mascota?</InputLabel>
              <Select
                value={pet}
                onChange={this.handleChange('pet')}
              >
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl} 
               error={this.state.rules.waterType.touched ? !this.state.rules.waterType.valid : false}
               helperText={this.state.rules.waterType.helperText}>
              <InputLabel htmlFor="waterType">Tipo de agua</InputLabel>
              <Select
                value={waterType}
                onChange={this.handleChange('waterType')}
              >
                {
                waterTypes.map((watType, index) =>
                  <MenuItem value={index}>{watType}</MenuItem>
                )
                }
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}
              error={this.state.rules.houseType.touched ? !this.state.rules.houseType.valid : false}
              helperText={this.state.rules.houseType.helperText}>
              <InputLabel htmlFor="houseType">Tipo de casa</InputLabel>
              <Select
                value={houseType}
                onChange={this.handleChange('houseType')}
              >
                {
                houseTypes.map((houType, index) =>
                  <MenuItem value={index}>{houType}</MenuItem>
                )
                }
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}
              error={this.state.rules.heatingType.ttouched ? !this.state.rules.heatingType.valid : false}
              helperText={this.state.rules.heatingType.helperText}>
              <InputLabel htmlFor="heatingType">Tipo de calefacción</InputLabel>
              <Select
                value={heatingType}
                onChange={this.handleChange('heatingType')}
              >
                {
                heatingTypes.map((heaType, index) =>
                  <MenuItem value={index}>{heaType}</MenuItem>
                )
                }
              </Select>
            </FormControl>
            <Button 
              color="primary" 
              className={classes.button}
              onClick={this.handleSubmit}>
              Enviar
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
