import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText} from 'material-ui/Form';
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
      id: '',
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
        valid: true,
      },
      lastname:{
        required: true,
        helperText: '',
        valid: true,
        touched: false,
      },
      date:{
        required: true,
        helperText: '',
        valid: true,
        touched: false,
      },
      genre:{
        required: true,
        helperText: '',
        valid: true,
        touched: false,
      },
      documentType:{
        required: true,
        helperText: '',
        valid: true,
        touched: false,
      },
      dni:{
        required: true,
        numeric: true,
        helperText: '',
        valid: true,
        touched: false,
      }, 
      address: {
        required: true,
        helperText: '',
        valid: true,
        touched: false,
      },
      phoneNumber:{
        required: false,
        numeric: true,
        helperText: '',
        valid: true,
        touched: false,
      },
      insurance: {
        required: true,
        helperText: '',
        valid: true,
        touched: false,
      },
      fridge: {
        required: true,
        helperText: '',
        valid: true,
        touched: false,
      },
      electricity: {
        required: true,
        helperText: '',
        valid: true,
        touched: false,
      },
      pet: {
        required: true,
        helperText: '',
        valid: true,
        touched: false,
      },
      waterType: {
        required: true,
        helperText: '',
        valid: true,
        touched: false,
      },
      houseType: {
        required: true,
        helperText: '',
        valid: true,
        touched: false,
      },
      heatingType: {
        required: true,
        helperText: '',
        valid: true,
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

  componentDidMount(){
    if (this.props.routeProps.match.params.id) {
        if (!this.state.patient || (this.state.patient && this.state.patient.id != this.props.routeProps.match.params.id)) {
            axiosBackend.get('/patients/' + this.props.routeProps.match.params.id)
            .then(response => {
                this.setState({ patient: response.data });
            });
        }
    }
}

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

  handleUpdate = () =>{
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
      for (let f in currentRules){
        currentRules[f].touched = true;
      }
      this.setState({
        rules: currentRules
      })
      return false;
    }
    
    const data = this.state.patient;

    axiosBackend.put("patients/" + data.id, data).then( res => {
      this.props.routeProps.history.push("/patients/" + data.id)
    }
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
          <form className={classes.root} autoComplete="off">
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
                >
              <InputLabel htmlFor="genre">Género</InputLabel>
              <Select
                value={genre}
                onChange={this.handleChange('genre')}
              >
                  <MenuItem value='female'>Femenino</MenuItem>
                  <MenuItem value='male'>Masculino</MenuItem>
              </Select>
              <FormHelperText>{this.state.rules.genre.helperText}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}
              error={this.state.rules.documentType.touched ? !this.state.rules.documentType.valid : false}
              >
              <InputLabel htmlFor="documentType">Tipo doc.</InputLabel>
              <Select
                value={documentType}
                onChange={this.handleChange('documentType')}
                >
                {
                documentTypes.map((docType, index) =>
                  <MenuItem key={index} value={index}>{docType}</MenuItem>
                )
                }
              </Select>
              <FormHelperText>{this.state.rules.documentType.helperText}</FormHelperText>
            </FormControl>
            <TextField
              id="dni"
              label="DNI"
              value={dni}
              onChange={this.handleChange('dni')}
              className={classes.textField}
              
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
              margin="normal"
              error={this.state.rules.phoneNumber.touched ? !this.state.rules.phoneNumber.valid : false}
              helperText={this.state.rules.phoneNumber.helperText}
            />
            <FormControl className={classes.formControl} 
              error={this.state.rules.insurance.touched ? !this.state.rules.insurance.valid : false}
              >
              <InputLabel htmlFor="insurance">Obra social</InputLabel>
              <Select
                value={insurance}
                onChange={this.handleChange('insurance')}
              >
                {
                insurances.map((ins, index) =>
                  <MenuItem key={index} value={index}>{ins}</MenuItem>
                )
                }
              </Select>
              <FormHelperText>{this.state.rules.insurance.helperText}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} 
                error={this.state.rules.fridge.touched ? !this.state.rules.fridge.valid : false}
                >
              <InputLabel htmlFor="fridge">Heladera?</InputLabel>
              <Select
                value={fridge}
                onChange={this.handleChange('fridge')}
              >
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
              </Select>
              <FormHelperText>{this.state.rules.fridge.helperText}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}
              error={this.state.rules.electricity.touched ? !this.state.rules.electricity.valid : false}
              >
              <InputLabel htmlFor="electricity">Electricidad?</InputLabel>
              <Select
                value={electricity}
                onChange={this.handleChange('electricity')}
              >
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
              </Select>
              <FormHelperText>{this.state.rules.electricity.helperText}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} 
               error={this.state.rules.pet.touched ? !this.state.rules.pet.valid : false}
               >
              <InputLabel htmlFor="pet">Mascota?</InputLabel>
              <Select
                value={pet}
                onChange={this.handleChange('pet')}
              >
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
              </Select>
              <FormHelperText>{this.state.rules.pet.helperText}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} 
               error={this.state.rules.waterType.touched ? !this.state.rules.waterType.valid : false}
               >
              <InputLabel htmlFor="waterType">Tipo de agua</InputLabel>
              <Select
                value={waterType}
                onChange={this.handleChange('waterType')}
              >
                {
                waterTypes.map((watType, index) =>
                  <MenuItem key={index} value={index}>{watType}</MenuItem>
                )
                }
              </Select>
              <FormHelperText>{this.state.rules.waterType.helperText}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}
              error={this.state.rules.houseType.touched ? !this.state.rules.houseType.valid : false}
              >
              <InputLabel htmlFor="houseType">Tipo de casa</InputLabel>
              <Select
                value={houseType}
                onChange={this.handleChange('houseType')}
              >
                {
                houseTypes.map((houType, index) =>
                  <MenuItem key={index} value={index}>{houType}</MenuItem>
                )
                }
              </Select>
              <FormHelperText>{this.state.rules.houseType.helperText}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}
              error={this.state.rules.heatingType.touched ? !this.state.rules.heatingType.valid : false}
              >
              <InputLabel htmlFor="heatingType">Tipo de calefacción</InputLabel>
              <Select
                value={heatingType}
                onChange={this.handleChange('heatingType')}
              >
                {
                heatingTypes.map((heaType, index) =>
                  <MenuItem key={index} value={index}>{heaType}</MenuItem>
                )
                }
              </Select>
              <FormHelperText>{this.state.rules.heatingType.helperText}</FormHelperText>
            </FormControl>
            <Button 
              color="primary" 
              className={classes.button}
              variant="raised"
              onClick={this.handleUpdate}>
              Editar
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
