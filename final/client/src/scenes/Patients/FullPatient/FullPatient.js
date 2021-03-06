import React, {Component} from "react";
import axiosBackend from "../../../axios/Backend";
import Button from 'material-ui/Button';
import DeleteModal from '../../../containers/AlertDialog/AlertDialog';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';
import { withStyles } from '@material-ui/core/styles';
import Grid from 'material-ui/Grid';
import Moment from 'react-moment';
import List from '@material-ui/core/List';
import Item from "../../../components/ListItem/ListItem";
import {Link} from 'react-router-dom';

const styles = theme => ({
    card: {
      width: 800,
    },
    media: {
      height: 0,
      paddingTop: '5.25%', // 5:9
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatarF: {
      backgroundColor: pink[400],
    },
    avatarM: {
        backgroundColor: blue[400],
      },
    flexContainer: {
        display: 'inline-block',
        width: 250,
      },
  });


class FullPatient extends Component{

    state = {
        loadedPatient: null,
        deleteModalOpen: false,
    }

    componentWillMount(){
        if (this.props.routeProps.match.params.id) {
                axiosBackend.get('/patients/' + this.props.routeProps.match.params.id)
                .then(response => {
                    this.setState({ loadedPatient: response.data });
                });
        }
    }

    deletePatientHandler = () =>{
        axiosBackend.delete('/patients/' + this.props.routeProps.match.params.id)
                .then(response => {
                    console.log(response);
                    this.props.routeProps.history.push("/patients")
                });
    }

    handleDeleteModalClickOpen = () => {
        this.setState({ deleteModalOpen: true });
    };
    
    editPatientHandler = () =>{
        this.props.routeProps.history.push("/patients/update/" + this.state.loadedPatient.id)
    }
    
    render () {
        const { classes, roles } = this.props;

        let patient="" ;

        const {documentTypes, insurances, waterTypes, houseTypes, heatingTypes} = this.props
        
        if (this.state.loadedPatient) {
            patient = (
                <div className="FullPatient">
                    
                    {/* DELETE PATIENT MODAL */}
                    <DeleteModal 
                        title={'Atención! Operación irreversible'}
                        body={'Estas a punto de eliminar a "' + this.state.loadedPatient.lastname + ', ' + this.state.loadedPatient.name + '". Estas seguro que quieres proseguir?'}
                        open={this.state.deleteModalOpen} 
                        onAgree={this.deletePatientHandler}/>

                    {/* FULL PATIENT VISIBLE CONTENT */}
                    <Grid container spacing={40}>
                    <Grid item xs={12}>
                    <Grid container justify="center" spacing={40}>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                            <Avatar className={this.state.loadedPatient.genre === 'male' ? classes.avatarM : classes.avatarF }>
                                {this.state.loadedPatient.lastname.toUpperCase()[0] + this.state.loadedPatient.name.toUpperCase()[0]}
                            </Avatar>
                            }
                           
                            title={this.state.loadedPatient.lastname + ', ' + this.state.loadedPatient.name}
                            subheader={this.state.loadedPatient.dni}
                        />
                        <CardContent>
                          <List >
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Fecha de nacimiento: ' value={<Moment format="DD/MM/YYYY">{this.state.loadedPatient.date}</Moment>} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Género: ' value={this.state.loadedPatient.genre.toUpperCase()[0]} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Tipo de documento: ' value={documentTypes[this.state.loadedPatient.documentType]} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Dirección: ' value={this.state.loadedPatient.address} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Número de telefono: ' 
                                    value={this.state.loadedPatient.phoneNumber? this.state.loadedPatient.phoneNumber : '- - -'} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Obra social: ' value={insurances[this.state.loadedPatient.insurance]} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Heladera? ' value={this.state.loadedPatient.fridge? 'Si' : 'No'} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Electricidad? ' value={this.state.loadedPatient.electricity? 'Si' : 'No'} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Mascota? ' value={this.state.loadedPatient.pet? 'Si' : 'No'} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Tipo de agua: ' value={waterTypes[this.state.loadedPatient.waterType]} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Tipo de casa: ' value={houseTypes[this.state.loadedPatient.houseType]} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Tipo de calefacción: ' value={heatingTypes[this.state.loadedPatient.heatingType]} />
                            </Grid>
                          </List>
                        </CardContent>
                        <CardActions className={classes.actions} disableActionSpacing>
                        {roles.includes('Administrador')? <Button 
                                color="primary" 
                                onClick={this.handleDeleteModalClickOpen}>
                                Borrar
                            </Button> : null
                        }
                            <Button 
                                color="primary" 
                                onClick={this.editPatientHandler}>
                                Editar
                            </Button>
                            {(roles.includes('Pediatra') || roles.includes('Administrador'))? <Link to={this.state.loadedPatient.id + '/consults/'}>    
                                <Button 
                                    color="primary" 
                                    >
                                    Historia Clinica
                                </Button>
                            </Link>
                            : null
                            }
                            <Link to={this.state.loadedPatient.id + '/charts/'}>    
                                <Button 
                                    color="primary" 
                                    >
                                    Gráficos
                                </Button>
                            </Link>
                        </CardActions>
                    </Card>
                    </Grid>
                    </Grid>
                    </Grid>
                </div>
            );
        }
        return patient;
    }
}

export default  withStyles(styles)(FullPatient);

