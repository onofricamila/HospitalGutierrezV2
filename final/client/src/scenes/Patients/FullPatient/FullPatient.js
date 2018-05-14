import React, {Fragment, Component} from "react";
import axios from "../../../axios/Backend";
import Button from 'material-ui/Button';
import DeleteModal from '../DeleteModal';
import CircularIndeterminate from '../../../components/CircularIndeterminate/CircularIndeterminate';

class FullPatient extends Component{

    state = {
        loadedPatient: null,
        deleteModalOpen: false,
    }

    componentDidMount(){
        if (this.props.routeProps.match.params.id) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id != this.props.routeProps.match.params.id)) {
                axios.get('/patients/' + this.props.routeProps.match.params.id)
                .then(response => {
                    this.setState({ loadedPatient: response.data });
                });
            }
        }
    }

    deletePatientHandler = () =>{
        axios.delete('/patients/' + this.props.routeProps.match.params.id)
                .then(response => {
                    console.log(response);
                    this.props.routeProps.history.push("/patients")
                });
    }

    handleDeleteModalClickOpen = () => {
        this.setState({ deleteModalOpen: true });
      };
    
    
    render () {
        let patient="" ;
        
        if (this.state.loadedPatient) {
            patient = (
                <div className="FullPatient">
                    
                    {/* DELETE PATIENT MODAL */}
                    <DeleteModal 
                        patient={this.state.loadedPatient.lastname + ', ' + this.state.loadedPatient.name}
                        open={this.state.deleteModalOpen} 
                        deletePatientHandler={this.deletePatientHandler}/>

                    {/* FULL PATIENT VISIBLE CONTENT */}
                    <h1>{this.state.loadedPatient.lastname + ', ' + this.state.loadedPatient.name}</h1>
                    <div className="Edit">
                        <Button 
                            color="primary" 
                            onClick={this.handleDeleteModalClickOpen}>
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

