import React, { Component } from "react";
import axios from "../../axios/AxiosAPIReferences.js";
import EnhancedTable from './EnhancedTable';
import SimpleSnackbar from '../../containers/SimpleSnackbar/SimpleSnackBar';

class Patients extends Component{
    state = {
        loading: true,
        searching: false,
        documentTypes: [],
        data: [
            {
              id: "1",
              name: "Franco",
              lastname: "Borrelli",
              documentType: "1",
              dni: 32
            },
            {
              id: "2",
              name: "Pedro",
              lastname: "Brost",
              documentType: "2",
              dni: 3223423432
            },
            {
              id: "3",
              name: "Juan",
              lastname: "Perez",
              documentType: "1",
              dni: 397872
            },
            {
              id: "4",
              name: "John",
              lastname: "Garcia",
              documentType: "3",
              dni: 41243
            }
          ]
      }
    
    componentDidMount = () => {
    axios.get("tipo-documento").then(response => {
        this.setState({
        loading: false,
        documentTypes: response.data
        });
    });
    }

    searchHandler = data => {
    this.setState({ searching: true });

    //Search Request

    this.setState({ searching: false });
    }

    deletePatientHandler = patient => {
    return new Promise((resolve, reject) => {
        //Change Timeout for delelte request
        setTimeout(Math.random() > 0.3 ? resolve : reject, 1000)
        })
        .then(() => {
            this.setState({ loading: true });
            const name = patient.name + " " + patient.lastname;
            <SimpleSnackbar message={"Se eliminó a " + name + " correctamente."} />
            this.setState({ loading: false });
        })
        .catch(() =>  <SimpleSnackbar message="Algo falló. Intentá nuevamente." />);
    }

    render() {

        return (
            <EnhancedTable rowsPerPage={1} data={this.state.data} documentTypes={this.state.documentTypes}/>
        );
    }
      
}

export default Patients;