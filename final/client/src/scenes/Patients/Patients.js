import React, { Component, Fragment} from "react";
import axios from "../../axios/AxiosAPIReferences.js";
import SimpleSnackbar from '../../containers/SimpleSnackbar/SimpleSnackBar';
import CircularIndeterminate from '../../components/CircularIndeterminate/CircularIndeterminate';
import FixedBottomButton from '../../components/FixedBottomButton/FixedBottomButton';
import { Route, Switch } from "react-router-dom";
import NewPatientPage from './NewPatient/NewPatient';
import PatientsTablePage from './EnhancedPatientsTable';

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

    // deletePatientHandler = patient => {
    //     return new Promise((resolve, reject) => {
    //         //Change Timeout for delelte request
    //         setTimeout(Math.random() > 0.3 ? resolve : reject, 1000)
    //         })
    //         .then(() => {
    //             this.setState({ loading: true });
    //             const name = patient.name + " " + patient.lastname;
    //             <SimpleSnackbar message={"Se eliminó a " + name + " correctamente."} />
    //             this.setState({ loading: false });
    //         })
    //         .catch(() =>  <SimpleSnackbar message="Algo falló. Intentá nuevamente." />);
    // }

    render() {
        // let show;
        // if (this.state.loading){
        //     show = < CircularIndeterminate />
        // }
        // else{
        //     show = (
        //         <Fragment>
        //             <EnhancedTable rowsPerPage={5} data={this.state.data} documentTypes={this.state.documentTypes}/>
        //             <FixedBottomButton path="/patients/new" />
        //         </Fragment>
                
        //     ) ;
        // }
        // return show;
        let toDo = null;
        if (this.state.loading){
                toDo = < CircularIndeterminate />
        }
        
        const documentTypes = [];
        Object.values(this.state.documentTypes).forEach(value => {
            documentTypes[value.id] = value.nombre
        });

        const columnData = [
            {
              id: 'name',
              label: "Nombre",
              numeric: false,
              disablePadding: false,
            },
            {
              id: 'lastname',
              label: "Apellido",
              numeric: false,
              disablePadding: false,
            },
            {
              id: "documentType",
              label: "Tipo de documento",
              numeric: true,
              disablePadding: false,
            },
            {
              id: "dni",
              label: "N° de documento",
              numeric: true,
              disablePadding: false,
            }
        ];

        return (
            <Fragment>
                {toDo}
                <Switch>
                    <Route path="/patients/new" exact  
                        render={ (routeProps) => 
                            <NewPatientPage routeProps={routeProps} documentTypes={documentTypes}/>
                    } /> 
                    <Route path="/patients" exact 
                        render={ (routeProps) => 
                            <div>
                                <PatientsTablePage 
                                    routeProps={routeProps} 
                                    rowsPerPage={5} 
                                    data={this.state.data} 
                                    documentTypes={documentTypes}
                                    columnData={columnData}/>
                                <FixedBottomButton path="/patients/new" />
                            </div>
                        
                    } /> 
                </Switch>
            </ Fragment>
        );
    }
      
}

export default Patients;