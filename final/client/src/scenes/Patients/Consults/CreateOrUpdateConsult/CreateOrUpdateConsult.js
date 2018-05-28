import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText} from 'material-ui/Form';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import axiosBackend from "../../../../axios/Backend";
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import DatePicker from 'material-ui-pickers/DatePicker';
import Paper from 'material-ui/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';

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
  textFieldSmall: {
    margin: theme.spacing.unit * 2,
    width: 140,
  },
  button: {
    margin: theme.spacing.unit,
  },
  paper:{ width: 700}
});

class BasePatientsForm extends React.Component {
    state = {
        consult: {
            weight: '',
            completeVaccines: '',
            vaccinesObs: '',
            accordingMaturation: '',
            maturationObs: '',
            physicalExamOk: '',
            physicalExamObs: '',
            PC: '',
            PPC: '',
            height: '',
            feeding: '',
            gralObs: '',
            user: this.props.user
        },
        rules: {
            weight: {
                required: true,
                decimal: true,
                helperText: '',
                valid: false,
                touched: false,
            },
            completeVaccines: {
                required: true,
                helperText: '',
                valid: false,
                touched: false,
            },
            vaccinesObs: {
                required: true,
                helperText: '',
                valid: false,
                touched: false,
            },
            accordingMaturation: {
                required: true,
                helperText: '',
                valid: false,
                touched: false,
            },
            maturationObs: {
                required: true,
                helperText: '',
                valid: false,
                touched: false,
            },
            physicalExamOk: {
                required: true,
                helperText: '',
                valid: false,
                touched: false,
            },
            physicalExamObs: {
                required: true,
                helperText: '',
                valid: false,
                touched: false,
            },
            PC: {
                required: false,
                decimal: true,
                helperText: '',
                valid: true,
                touched: false,
            },
            PPC: {
                required: false,
                decimal: true,
                helperText: '',
                valid: true,
                touched: false,
            },
            height: {
                required: false,
                decimal: true,
                helperText: '',
                valid: true,
                touched: false,
            },
            feeding: {
                required: false,
                helperText: '',
                valid: true,
                touched: false,
            },
            gralObs: {
                required: false,
                helperText: '',
                valid: true,
                touched: false,
            }
        },
        formIsValid: false,
  };

  componentDidMount(){
    if (this.amIUpdating()) {
            axiosBackend.get('/patients/' + this.props.routeProps.match.params.idP + '/consults/' +  this.props.routeProps.match.params.idC)
            .then(response => {
                this.setState({ consult: response.data });
            });

            this.allFiledsValidityToTrue()
    }
  }

  amIUpdating(){
    if (this.props.routeProps.match.params.idC) {
        return true
    }
    return false
  }

  canSubmit(){
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
    return true
  }

  handleUpdate = () =>{
    if(this.canSubmit()){
        // put request si true lo anterior
        const data = this.state.consult;
        axiosBackend.put("/patients/" + this.props.routeProps.match.params.idP + '/consults/' + data.id, data).then( res => {
            this.props.routeProps.history.push("/patients/" + this.props.routeProps.match.params.idP + '/consults/' + data.id)
            }
        );
    }
  }

  handleCreate = () =>{
    if(this.canSubmit()){
        // post request si true lo anterior
        const data = this.state.consult;
        axiosBackend.post("/patients/" + this.props.routeProps.match.params.idP + '/consults', data).then(  res => {
            this.props.routeProps.history.push("/patients/" + this.props.routeProps.match.params.idP + '/consults/')
            }
        );
    }
}

  handleChange = field => event => {
    let currentRules = this.state.rules;
    let currentConsult = this.state.consult;
   
    this.setState({
      consult:{
        ...currentConsult, 
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

    if(rules.decimal){
        if(!rules.required){
           if( value.trim() === ''){ return true }
        }
        if (!/^[0-9]+([.][0-9]+)?$/g.test(value)) {
            rules.helperText = 'Solo numeros, incluyendo decimales con "."';
            return false;
        }
    }

    if(rules.valid) rules.helperText = '';
    return true;
  }

  allFiledsValidityToTrue(){
        let currentState = this.state;
        let currentRules = this.state.rules;
        
        for (let f in currentRules){
           currentRules[f].valid = true;
        }
    
        this.setState({
            ...currentState,
            rules: currentRules
        });
  }

  render() {
    const { classes } = this.props;

    const { consult: { 
            weight, 
            completeVaccines,
            vaccinesObs,
            accordingMaturation,
            maturationObs,
            physicalExamOk,
            physicalExamObs,
            PC,
            PPC,
            height,
            feeding,
            gralObs, }
    } = this.state;

    let show;

    show = (
          <Grid container spacing={40}>
          <Grid item xs={12}>
          <Grid container justify="center" spacing={40}>
          <Paper className={classes.paper}>
          <form className={classes.root} autoComplete="off">
            <TextField
              id="weight"
              label="Peso"
              className={classes.textFieldSmall}
              value={weight}
              onChange={this.handleChange('weight')}
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
              }}
              error={this.state.rules.weight.touched ? !this.state.rules.weight.valid : false}
              helperText={this.state.rules.weight.helperText}
            />
            <TextField
              id="height"
              label="Talla"
              value={height}
              onChange={this.handleChange('height')}
              className={classes.textFieldSmall}
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">Cm</InputAdornment>,
              }}
              error={this.state.rules.height.touched ? !this.state.rules.height.valid : false}
              helperText={this.state.rules.height.helperText}
            />

            <TextField
              id="PC"
              label="PC"
              value={PC}
              onChange={this.handleChange('PC')}
              className={classes.textFieldSmall}
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">Cm</InputAdornment>,
              }}
              error={this.state.rules.PC.touched ? !this.state.rules.PC.valid : false}
              helperText={this.state.rules.PC.helperText}
            />
            <TextField
              id="PPC"
              label="PPC"
              value={PPC}
              onChange={this.handleChange('PPC')}
              className={classes.textFieldSmall}
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">Cm</InputAdornment>,
              }}
              error={this.state.rules.PPC.touched ? !this.state.rules.PPC.valid : false}
              helperText={this.state.rules.PPC.helperText}
            />
            
            <FormControl className={classes.formControl} 
                error={this.state.rules.completeVaccines.touched ? !this.state.rules.completeVaccines.valid : false}
                >
              <InputLabel htmlFor="completeVaccines">Vacunas completas?</InputLabel>
              <Select
                value={completeVaccines}
                onChange={this.handleChange('completeVaccines')}
                >
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
              </Select>
              <FormHelperText>{this.state.rules.completeVaccines.helperText}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} 
                error={this.state.rules.accordingMaturation.touched ? !this.state.rules.accordingMaturation.valid : false}
                >
              <InputLabel htmlFor="accordingMaturation">Maduracion acorde?</InputLabel>
              <Select
                value={accordingMaturation}
                onChange={this.handleChange('accordingMaturation')}
                >
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
              </Select>
              <FormHelperText>{this.state.rules.accordingMaturation.helperText}</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl} 
                error={this.state.rules.physicalExamOk.touched ? !this.state.rules.physicalExamOk.valid : false}
                >
              <InputLabel htmlFor="physicalExamOk">Examen fisico acorde?</InputLabel>
              <Select
                value={physicalExamOk}
                onChange={this.handleChange('physicalExamOk')}
                >
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
              </Select>
              <FormHelperText>{this.state.rules.physicalExamOk.helperText}</FormHelperText>
            </FormControl>

            <TextField
              id="vaccinesObs"
              multiline
              rows="4"
              label="Vacunas, observaciones"
              className={classes.textField}
              value={vaccinesObs}
              onChange={this.handleChange('vaccinesObs')}
              margin="normal"
              error={this.state.rules.vaccinesObs.touched ? !this.state.rules.vaccinesObs.valid : false}
              helperText={this.state.rules.vaccinesObs.helperText}
            />
            <TextField
              id="maturationObs"
              multiline
              rows="4"
              label="Maduracion, observaciones"
              className={classes.textField}
              value={maturationObs}
              onChange={this.handleChange('maturationObs')}
              margin="normal"
              error={this.state.rules.maturationObs.touched ? !this.state.rules.maturationObs.valid : false}
              helperText={this.state.rules.maturationObs.helperText}
            />
            <TextField
              id="physicalExamObs"
              multiline
              rows="4"
              label="Examen fisico, observaciones"
              className={classes.textField}
              value={physicalExamObs}
              onChange={this.handleChange('physicalExamObs')}
              margin="normal"
              error={this.state.rules.physicalExamObs.touched ? !this.state.rules.physicalExamObs.valid : false}
              helperText={this.state.rules.physicalExamObs.helperText}
            />
            
            <TextField
              id="feeding"
              multiline
              rows="4"
              label="Alimentación"
              value={feeding}
              onChange={this.handleChange('feeding')}
              className={classes.textField}
              margin="normal"
              error={this.state.rules.feeding.touched ? !this.state.rules.feeding.valid : false}
              helperText={this.state.rules.feeding.helperText}
            />
            <TextField
              id="gralObs"
              multiline
              rows="4"
              label="Observaciones generales"
              value={gralObs}
              onChange={this.handleChange('gralObs')}
              className={classes.textField}
              margin="normal"
              error={this.state.rules.gralObs.touched ? !this.state.rules.gralObs.valid : false}
              helperText={this.state.rules.gralObs.helperText}
            />

            <br/>

            <Button 
              color="primary" 
              className={classes.button}
              onClick={ this.amIUpdating()? this.handleUpdate : this.handleCreate}>
              { this.amIUpdating()? 'Editar' : 'Crear'}
            </Button>
          </form>
          </Paper>
          </Grid>
          </Grid>
          </Grid>
      );
  
    return show;
  }
}

BasePatientsForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BasePatientsForm);
