import React, {Component, Fragment} from 'react'
import Chart from './Chart'
import Export from './Export'
import CircularIndeterminate from '../../components/CircularIndeterminate/CircularIndeterminate';
import axiosBackend from "../../axios/Backend";
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
        {children}
        </Typography>
    );
}

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
});

class Charts extends Component{
    state = {
        loading: true,
        sampleColors: ['rgba(255,99,132,0.6)', 'rgba(0,99,132,0.6)', 'rgba(255,0,132,0.6)', 'rgba(255,99,0,0.6)', 'rgba(0,0,132,0.6)', 'rgba(0,99,0,0.6)'],
        patients: [],
        documentTypes: [],
        insurances: [],
        houseTypes: [],
        waterTypes: [],
        heatingTypes: [],
        tab: 0
        
    }
    
    handleTabChange = (event, value) => {
        this.setState({ tab: value });
    };

    handleTabChangeIndex = index => {
        this.setState({ tab: index });
    };

    arrayFromStateField(field){
        const array = [];
        Object.values(this.state[field]).forEach(value => {
            array[value.id] = value.nombre
        });
        return array.filter(function(n){ return n != undefined }); 
    }

    getPatients(){
        axiosBackend.get("patients").then(response => {
            this.setState({
            patients: response.data.sort((a, b) => (a.id > b.id ? -1 : 1))
            });
          });
    }

    getDocumentTypes(){
        fetch('https://api-referencias.proyecto2017.linti.unlp.edu.ar/' + "tipo-documento")
          .then(response => response.json())
          .then(data => { this.setState({ documentTypes: data }) })
    }

    getInsurances(){
        fetch('https://api-referencias.proyecto2017.linti.unlp.edu.ar/' + "obra-social")
          .then(response => response.json())
          .then(data => { this.setState({ insurances: data }) })
    }

    getHouseTypes(){
    fetch('https://api-referencias.proyecto2017.linti.unlp.edu.ar/' + "tipo-vivienda")
        .then(response => response.json())
        .then(data => { this.setState({ houseTypes: data }) })
    }

    getWaterTypes(){
    fetch('https://api-referencias.proyecto2017.linti.unlp.edu.ar/' + "tipo-agua")
        .then(response => response.json())
        .then(data => { this.setState({ waterTypes: data }) })
    }

    getHeatingTypes(){
    fetch('https://api-referencias.proyecto2017.linti.unlp.edu.ar/' + "tipo-calefaccion")
        .then(response => response.json())
        .then(data => { this.setState({ heatingTypes: data, loading: false }) })
    }

    componentDidMount(){
        this.getPatients()
        this.getDocumentTypes()
        this.getInsurances()
        this.getHouseTypes()
        this.getWaterTypes()
        this.getHeatingTypes()
    }
    
    arrayAllCerosFrom(labels){
        let ac = []
        labels.map( (v,k) => {
            ac[k] = 0
        })
        return ac
    }

    render(){
        /* extraigo vars del estado y props */
        const { loading, patients, sampleColors } = this.state
        const { classes, theme } = this.props;

        /* inicio contadores de booleans */
        let pet = 0
        let electricity = 0
        let fridge = 0

        /* armo todas las labels que voy a necesitar para cada chart */
        const documentTypesLabels = this.arrayFromStateField('documentTypes');
        const insurancesLabels = this.arrayFromStateField('insurances');
        const waterTypesLabels = this.arrayFromStateField('waterTypes');
        const houseTypesLabels = this.arrayFromStateField('houseTypes');
        const heatingTypesLabels = this.arrayFromStateField('heatingTypes');

        /* inicializo los contadores de cant para cada label en cada chart en 0 */
        let documentTypesData = this.arrayAllCerosFrom(documentTypesLabels);
        let insurancesData = this.arrayAllCerosFrom(insurancesLabels);
        let waterTypesData = this.arrayAllCerosFrom(waterTypesLabels);
        let houseTypesData = this.arrayAllCerosFrom(houseTypesLabels);
        let heatingTypesData = this.arrayAllCerosFrom(heatingTypesLabels);
        
        /* cuento la cant para cada label en cada chart */
        Object.values(patients).forEach(value => {
            documentTypesData[value.documentType-1] = documentTypesData[value.documentType-1] +1
            insurancesData[value.insurance-1] = insurancesData[value.insurance-1] +1
            waterTypesData[value. waterType-1] = waterTypesData[value. waterType-1] +1
            houseTypesData[value.houseType-1] = houseTypesData[value.houseType-1] +1
            heatingTypesData[value.heatingType-1] = heatingTypesData[value.heatingType-1] +1
            value.pet? pet++ : null
            value.fridge? fridge++ : null
            value.electricity? electricity++ : null
        });

        /* armo el objeto a enviar como data en cada chart */
        let documentTypesCharData = {
            labels: documentTypesLabels,
            datasets: [
                {
                    label: 'Cantidad de pacientes',
                    data: documentTypesData,
                    backgroundColor: sampleColors
                }
            ]
        }

        let insurancesCharData = {
            labels: insurancesLabels,
            datasets: [
                {
                    label: 'Cantidad de pacientes',
                    data: insurancesData,
                    backgroundColor: sampleColors
                }
            ]
        }

        let waterTypesCharData = {
            labels: waterTypesLabels,
            datasets: [
                {
                    label: 'Cantidad de pacientes',
                    data: waterTypesData,
                    backgroundColor: sampleColors
                }
            ]
        }

        let houseTypesCharData = {
            labels: houseTypesLabels,
            datasets: [
                {
                    label: 'Cantidad de pacientes',
                    data: houseTypesData,
                    backgroundColor: sampleColors
                }
            ]
        }

        let heatingTypesCharData = {
            labels: heatingTypesLabels,
            datasets: [
                {
                    label: 'Cantidad de pacientes',
                    data: heatingTypesData,
                    backgroundColor: sampleColors
                }
            ]
        }

        let petCharData = {
            labels: ['Si', 'No'],
            datasets: [
                {
                    label: 'Cantidad de pacientes',
                    data: [pet, patients.length - pet],
                    backgroundColor: sampleColors
                }
            ]
        }

        let fridgeCharData = {
            labels: ['Si', 'No'],
            datasets: [
                {
                    label: 'Cantidad de pacientes',
                    data: [fridge, patients.length - fridge],
                    backgroundColor: sampleColors
                }
            ]
        }

        let electricityCharData = {
            labels: ['Si', 'No'],
            datasets: [
                {
                    label: 'Cantidad de pacientes',
                    data: [electricity, patients.length - electricity],
                    backgroundColor: sampleColors
                }
            ]
        }


        /* veo que muestro al renderizar el componente */
        let show = <CircularIndeterminate/>
        if(!loading){
            show = (
                <div className={classes.root}>
                    <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.tab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="Documentos" />
                        <Tab label="Obras Sociales" />
                        <Tab label="Agua" />
                        <Tab label="Casas" />
                        <Tab label="Calefacción" />
                        <Tab label="Mascotas" />
                        <Tab label="Heladera" />
                        <Tab label="Electricidad" />
                    </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.tab}
                        onChangeIndex={this.handleTabChangeIndex}
                        >
                        <TabContainer dir={theme.direction}>
                            <Export idDivToPrint="documentTypes">
                                <Chart chartData={documentTypesCharData} text='Tipos de Documento' />
                            </Export>
                        </TabContainer>
                       
                        <TabContainer dir={theme.direction}>
                            <Export idDivToPrint="insurances">
                                <Chart chartData={insurancesCharData} text='Tipos de Obra Social' />
                            </Export>
                        </TabContainer>

                        <TabContainer dir={theme.direction}>
                            <Export idDivToPrint="waterTypes">
                                <Chart chartData={waterTypesCharData} text='Tipos de Agua' />
                            </Export>
                        </TabContainer>

                        <TabContainer dir={theme.direction}>
                            <Export idDivToPrint="houseTypes">
                                <Chart chartData={houseTypesCharData} text='Tipos de Casas' />
                            </Export>
                        </TabContainer>

                        <TabContainer dir={theme.direction}>
                            <Export idDivToPrint="heatingTypes">
                                <Chart chartData={heatingTypesCharData} text='Tipos de Calefacción' />
                            </Export>
                        </TabContainer>

                        <TabContainer dir={theme.direction}>
                            <Export idDivToPrint="pet">
                                <Chart chartData={petCharData} text='Tiene mascota?' />
                            </Export>
                        </TabContainer>

                        <TabContainer dir={theme.direction}>
                            <Export idDivToPrint="fridge">
                                <Chart chartData={fridgeCharData} text='Tiene heladera?' />
                            </Export>
                        </TabContainer>
            
                        <TabContainer dir={theme.direction}>
                            <Export idDivToPrint="electricity">
                                <Chart chartData={electricityCharData} text='Tiene electricidad?' />
                            </Export>
                        </TabContainer>
                    </SwipeableViews>
                </div>
            )
        }
        return show
    }
}

export default withStyles(styles, { withTheme: true })(Charts)