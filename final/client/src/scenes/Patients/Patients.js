import React, { Component, Fragment} from "react";
import axiosReferences from "../../axios/References";
import CircularIndeterminate from '../../components/CircularIndeterminate/CircularIndeterminate';
import FixedBottomButton from '../../components/FixedBottomButton/FixedBottomButton';
import { Route, Switch } from "react-router-dom";
import NewPatientPage from './NewPatient/NewPatient';
import UpdatePatientPage from './UpdatePatient/UpdatePatient';
import FullPatientPage from './FullPatient/FullPatient';
import PatientsTablePage from './PatientsList/EnhancedPatientsTable';
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

    getDocumentTypes(){
        axiosReferences.get("tipo-documento").then(response => {
            this.setState({
            documentTypes: response.data
            });
        });
    }
    
    getInsurances(){
        axiosReferences.get("obra-social").then(response => {
            this.setState({
            insurances: response.data,
            });
        });
    }

    getHouseTypes(){
        axiosReferences.get("tipo-vivienda").then(response => {
            this.setState({
            houseTypes: response.data,
            });
        });
    }

    getWaterTypes(){
        axiosReferences.get("tipo-agua").then(response => {
            this.setState({
            waterTypes: response.data,
            });
        });
    }

    getHeatingTypes(){
        axiosReferences.get("tipo-calefaccion").then(response => {
            this.setState({
            heatingTypes: response.data,
            loading: false
            });
        });
    }

    componentWillMount = () => {
        this.getDocumentTypes()
        this.getInsurances()
        this.getHouseTypes()
        this.getWaterTypes()
        this.getHeatingTypes()
    }

    arrayFromStateField(field){
        const array = [];
        Object.values(this.state[field]).forEach(value => {
            array[value.id] = value.nombre
        });
        return array
    }

    render() {
    
        let show = null;
        
        if (this.state.loading){
                show = < CircularIndeterminate />
        }

        const documentTypes = this.arrayFromStateField('documentTypes');
        
        const insurances = this.arrayFromStateField('insurances');

        const waterTypes = this.arrayFromStateField('waterTypes');

        const houseTypes = this.arrayFromStateField('houseTypes');
       
        const heatingTypes = this.arrayFromStateField('heatingTypes');

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
                    <Route path="/patients/update/:id" exact 
                        render={ (routeProps) => 
                            <div>
                                <UpdatePatientPage 
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