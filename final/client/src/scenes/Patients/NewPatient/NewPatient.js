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
        valid: true,
      },
      lastname:{
        required: true,
        helperText: '',
        valid: true,
      },
      date:{
        required: true,
        helperText: '',
        valid: true,
      },
      genre:{
        required: true,
        helperText: '',
        valid: true,
      },
      documentType:{
        required: true,
        helperText: '',
        valid: true,
      },
      dni:{
        required: true,
        numeric: true,
        helperText: '',
        valid: true,
      }, 
      address: {
        required: true,
        helperText: '',
        valid: true,
      },
      phoneNumber:{
        required: false,
        numeric: true,
        helperText: '',
        valid: true,
      },
      insurance: {
        required: true,
        helperText: '',
        valid: true,
      },
      fridge: {
        required: true,
        helperText: '',
        valid: true,
      },
      electricity: {
        required: true,
        helperText: '',
        valid: true,
      },
      pet: {
        required: true,
        helperText: '',
        valid: true,
      },
      waterType: {
        required: true,
        helperText: '',
        valid: true,
      },
      houseType: {
        required: true,
        helperText: '',
        valid: true,
      },
      heatingType: {
        required: true,
        helperText: '',
        valid: true,
      },
    },
    apiData: {
      documentTypes: this.props.documentTypes,
      insurances: this.props.insurances,
      waterTypes: this.props.waterTypes,
      houseTypes: this.props.houseTypes,
      heatingTypes: this.props.heatingTypes,
    }
    
  };

  handleChange = field => event => {
    this.setState({
      patient:{
        ...this.state.patient, 
        [field]: event.target.value
      },
      rules:{
        ...this.state.rules, 
        [field]: {
          ...this.state.rules[field],
          valid: this.validate(field, event.target.value, this.state.rules[field])
        } 
      }
    });
  };

  validateRequired(field, value, rules){
    return typeof value === "string" ?
              value.trim().length > 0 :
              value.toString().length > 0;
  }

  validate(field, value, rules){

    if(rules.required){
      if (!this.validateRequired(field, value, rules)) {
        this.state.rules[field].helperText = 'Campo obligatorio';
        return false;
      }
    }

    if(rules.numeric){
      if (!/^([0-9])*$/.test(value)) {
        this.state.rules[field].helperText = 'Solo números';
        return false;
      }
    }

    // if(field == 'dni'){
    //   regex = /^\d{8}[a-zA-Z]$/;
    //   isValid = regex.test(value);
    //   if (!isValid) {
    //     this.state.rules[field].helperText = 'DNI invalido';
    //   }
    // }
    if(this.state.rules[field].valid) this.state.rules[field].helperText = '';
    return true;
  }

  handleSubmit = () =>{
    // TODO: validate
    // post?
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
              error={!this.state.rules.name.valid}
              helperText={this.state.rules.name.helperText}
            />
            <TextField
              id="lastname"
              label="Apellido"
              className={classes.textField}
              value={lastname}
              onChange={this.handleChange('lastname')}
              margin="normal"
              error={!this.state.rules.lastname.valid}
              helperText={!this.state.rules.lastname.valid ? this.state.rules.lastname.helperText : ''}
            />
            <TextField
              id="date"
              label="Fecha de nacimiento"
              type="date"
              value={date}
              defaultValue=""
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              error={!this.state.rules.date.valid}
              helperText={this.state.rules.date.helperText}
            />
            <FormControl className={classes.formControl} 
                error={!this.state.rules.genre.valid}
                helperText={this.state.rules.genre.helperText}>
              <InputLabel htmlFor="genre">Género</InputLabel>
              <Select
                value={genre}
                onChange={this.handleChange('genre')}
                error={!this.state.rules.genre.valid}
                helperText={this.state.rules.genre.helperText}
              >
                  <MenuItem value='female'>Femenino</MenuItem>
                  <MenuItem value='male'>Masculino</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}
              error={!this.state.rules.documentType.valid}
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
              error={!this.state.rules.dni.valid}
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
              error={!this.state.rules.address.valid}
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
              error={!this.state.rules.phoneNumber.valid}
                helperText={this.state.rules.phoneNumber.helperText}
            />
            <FormControl className={classes.formControl} 
              error={!this.state.rules.insurance.valid}
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
                error={!this.state.rules.fridge.valid}
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
              error={!this.state.rules.electricity.valid}
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
               error={!this.state.rules.pet.valid}
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
               error={!this.state.rules.waterType.valid}
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
              error={!this.state.rules.houseType.valid}
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
              error={!this.state.rules.heatingType.valid}
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
