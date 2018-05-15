import React, { Component, Fragment} from "react";
import axiosReferences from "../../axios/References";
import axiosBackend from "../../axios/Backend";
import CircularIndeterminate from '../../components/CircularIndeterminate/CircularIndeterminate';
import FixedBottomButton from '../../components/FixedBottomButton/FixedBottomButton';
import { Route, Switch } from "react-router-dom";
import NewPatientPage from './NewPatient/NewPatient';
import FullPatientPage from './FullPatient/FullPatient';
import PatientsTablePage from './PatientsList/EnhancedPatientsTable';
import { Redirect } from 'react-router-dom'
import Typography from 'material-ui/Typography';
import Error404 from "../Errors/404";

class Patients extends Component{
    state = {
        loading: true,
        documentTypes: [],
        insurances: [],
        houseTypes: [],
        waterTypes: [],
        heatingTypes: [],
      }
    
    componentWillMount = () => {
        
        axiosReferences.get("tipo-documento").then(response => {
            this.setState({
            documentTypes: response.data
            });
        });
        axiosReferences.get("obra-social").then(response => {
            this.setState({
            insurances: response.data,
            });
        });
        axiosReferences.get("tipo-vivienda").then(response => {
            this.setState({
            houseTypes: response.data,
            });
        });
        axiosReferences.get("tipo-agua").then(response => {
            this.setState({
            waterTypes: response.data,
            });
        });
        axiosReferences.get("tipo-calefaccion").then(response => {
            this.setState({
            heatingTypes: response.data,
            loading: false
            });
        });
    }

    render() {
    
        let show = null;
        
        if (this.state.loading){
                show = < CircularIndeterminate />
        }

        const data = this.state.data;

        const documentTypes = [];
        Object.values(this.state.documentTypes).forEach(value => {
            documentTypes[value.id] = value.nombre
        });

        const insurances = [];
        Object.values(this.state.insurances).forEach(value => {
            insurances[value.id] = value.nombre
        });

        const waterTypes = [];
        Object.values(this.state.waterTypes).forEach(value => {
            waterTypes[value.id] = value.nombre
        });

        const houseTypes = [];
        Object.values(this.state.houseTypes).forEach(value => {
            houseTypes[value.id] = value.nombre
        });

        const heatingTypes = [];
        Object.values(this.state.heatingTypes).forEach(value => {
            heatingTypes[value.id] = value.nombre
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
                {show}
                <Switch>
                    <Route path="/patients/new" exact  
                        render={ (routeProps) => 
                            <div>
                                <Typography variant="title">REGISTRA UN NUEVO PACIENTE</Typography>
                                <br/>
                                <NewPatientPage 
                                    routeProps={routeProps} 
                                    documentTypes={documentTypes} 
                                    insurances={insurances}
                                    waterTypes={waterTypes}
                                    houseTypes={houseTypes}
                                    heatingTypes={heatingTypes}
                                    />
                            </div>
                    } /> 
                    <Route path="/patients" exact 
                        render={ (routeProps) => 
                            <div>
                                <PatientsTablePage 
                                    routeProps={routeProps} 
                                    documentTypes={documentTypes}
                                    columnData={columnData}/>
                                <FixedBottomButton path="/patients/new" />
                            </div>
                        
                    } /> 
                    <Route path="/patients/:id" exact 
                        render={ (routeProps) => 
                            <div>
                                <FullPatientPage 
                                    routeProps={routeProps} 
                                    documentTypes={documentTypes}
                                    insurances={insurances}
                                    waterTypes={waterTypes}
                                    houseTypes={houseTypes}
                                    heatingTypes={heatingTypes} />
                            </div> 
                        }/>
                    <Route component={Error404} />
                </Switch>
            </ Fragment>
        );
    }
      
}

export default Patients;