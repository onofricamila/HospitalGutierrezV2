import React, {Fragment, Component} from "react";
import axios from "../../../axios/Backend.js";
import Button from 'material-ui/Button';

class FullPatient extends Component{

    state = {
        loadedPatient: null
    }

    componentDidMount(){
        if (this.props.routeProps.match.params.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id != this.props.routeProps.match.params.id)) {
                axios.get('/patients/' + this.props.routeProps.match.params.id)
                .then(response => {
                    this.setState({ loadedPatient: response.data });
                    console.log(response);
                });
            }
        }
    }

    deletePatientHandler = () =>{
        axios.delete('/patients/' + this.props.routeProps.match.params.id)
                .then(response => {
                    console.log(response);
                });
    }

    render () {
        let patient ;
        if (this.props.routeProps.match.params.id){
            patient= <p> Cargando paciente ... </p>
        }
        if (this.state.loadedPatient) {
            patient = (
                <div className="FullPatient">
                    <h1>{this.state.loadedPatient.lastname + ', ' + this.state.loadedPatient.name}</h1>
                    <div className="Edit">
                        <Button 
                            color="primary" 
                            onClick={this.deletePatientHandler}>
                            Borrar
                        </Button>
                        <Button 
                            color="primary" 
                            onClick={this.editPatientHandler}>
                            Editar
                        </Button>
                    </div>
                </div>
    
            );
        }
        return patient;
    }

}

export default FullPatient;

