import React, {Component} from "react";
import axiosBackend from "../../../../axios/Backend";
import Button from 'material-ui/Button';
import DeleteModal from '../../../../containers/AlertDialog/AlertDialog';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Grid from 'material-ui/Grid';
import Moment from 'react-moment';
import List from '@material-ui/core/List';
import Item from "../../../../components/ListItem/ListItem";
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
    flexContainer: {
        display: 'inline-block',
        width: 250,
      },
  });


class FullConsult extends Component{

    state = {
        loadedConsult: null,
        loadedPatient: null,
        deleteModalOpen: false,
    }

    getConsult(){
        axiosBackend.get('/patients/' + this.props.routeProps.match.params.idP + '/consults/' + this.props.routeProps.match.params.idC )
        .then(response => {
            this.setState({ loadedConsult: response.data });
        });
    }

    getPatient(){
        axiosBackend.get('/patients/' + this.props.routeProps.match.params.idP )
        .then(response => {
            this.setState({ loadedPatient: response.data });
        });
    }

    componentWillMount(){
        if (this.props.routeProps.match.params.idP && this.props.routeProps.match.params.idC) {
               this.getConsult()
               this.getPatient()
        }
    }

    deleteConsultHandler = () =>{
            console.log('entra al delete consult handler')
            axiosBackend.delete('/patients/' + this.props.routeProps.match.params.idP + '/consults/' + this.props.routeProps.match.params.idC)
                .then(response => {
                    console.log(response);
                    this.props.routeProps.history.push("/patients/" + this.props.routeProps.match.params.idP + '/consults/')
                });
    }

    handleDeleteModalClickOpen = () => {
        this.setState({ deleteModalOpen: true });
    };
    
    editConsulttHandler = () =>{
        this.props.routeProps.history.push("/patients/" + this.state.loadedPatient.id + "/consults/update/" + this.state.loadedConsult.id)
    }
    
    render () {
        const { classes, roles } = this.props;

        const {loadedPatient, loadedConsult} = this.state;

        let consult="" ;

        if (loadedConsult && loadedPatient) {

            consult = (
                <div className="FullConsult">
                    
                    {/* DELETE Consult MODAL */}
                    <DeleteModal 
                        title={'Atención! Operación irreversible'}
                        body={'Estas a punto de eliminar a la consulta del dia ' + new Date(loadedConsult.date).toLocaleDateString() 
                                + ' para el paciente '+ loadedPatient.lastname + ', ' + loadedPatient.name 
                                + '. Estas seguro que quieres proseguir?'}
                        open={this.state.deleteModalOpen} 
                        onAgree={this.deleteConsultHandler}/>

                    {/* FULL Consult VISIBLE CONTENT */}
                    <Grid container spacing={40}>
                    <Grid item xs={12}>
                    <Grid container justify="center" spacing={40}>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                            <Link to={'/patients/' + loadedPatient.id}>    
                                <Avatar >
                                    {loadedPatient.lastname.toUpperCase()[0] + loadedPatient.name.toUpperCase()[0]}
                                </Avatar>
                            </Link>    
                            }
                           
                            title={<Moment format="DD/MM/YYYY">{loadedConsult.date}</Moment>}
                            subheader={loadedPatient.lastname + ', ' + loadedPatient.name}
                        />
                        <CardContent>
                          <List >
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Edad: ' value={<Moment locale="es" to={loadedConsult.date} ago>{loadedPatient.date}</Moment>} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Peso: ' value={loadedConsult.weight + ' Kg'} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Vacunas completas? ' value={loadedConsult.completeVaccines? 'Si' : 'No'} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Vacunas, observaciones: ' value={loadedConsult.vaccinesObs} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Maduración acorde? ' value={loadedConsult.accordingMaturation? 'Si' : 'No'} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Maduración, observaciones: ' value={loadedConsult.maturationObs} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Exámen físico acorde? ' value={loadedConsult.physicalExamOk? 'Si' : 'No'} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Exámen físico, observaciones: ' value={loadedConsult.physicalExamObs} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='PC: ' 
                                    value={loadedConsult.PC? loadedConsult.PC + ' cm' : '- - -'} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='PPC: ' 
                                    value={loadedConsult.PPC? loadedConsult.PPC  + ' cm' : '- - -'} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Talla: ' 
                                    value={loadedConsult.height? loadedConsult.height  + ' cm' : '- - -'} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Alimentación: ' 
                                    value={loadedConsult.feeding? loadedConsult.feeding : '- - -'} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Observaciones generales: ' 
                                    value={loadedConsult.gralObs? loadedConsult.gralObs : '- - -'} />
                            </Grid>
                            <Grid item xs={5} className={classes.flexContainer}>
                                <Item title='Usuario que cargó los datos: ' value={loadedConsult.user}/>
                            </Grid>
                          </List>
                        </CardContent>
                        <CardActions className={classes.actions} disableActionSpacing>
                            {roles.includes('Administrador')? <Button 
                                    color="primary" 
                                    onClick={this.handleDeleteModalClickOpen}>
                                    Borrar
                                </Button>
                            : null}
                            <Button 
                                color="primary" 
                                onClick={this.editConsulttHandler}>
                                Editar
                            </Button>
                        </CardActions>
                    </Card>
                    </Grid>
                    </Grid>
                    </Grid>
                </div>
            );
        }
        return consult;
    }
}

export default  withStyles(styles)(FullConsult);

