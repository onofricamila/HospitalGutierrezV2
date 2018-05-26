import React, {Component} from 'react'
import Chart from './Chart'
import Export from './Export'
import CircularIndeterminate from '../../components/CircularIndeterminate/CircularIndeterminate';
import axiosBackend from "../../axios/Backend";

class Charts extends Component{
    state = {
        loading: true,
        mockData:{
            labels: ['City Bell', 'Ensenada'],
            datasets: [
                {
                    label: 'People',
                    data:[6258, 2589],
                    backgroundColor:['rgba(255,99,132,0.6)', 'rgba(0,99,132,0.6)']
                }
            ],
        },
        patients: [],
        documentTypes: [],
        insurances: [],
        houseTypes: [],
        waterTypes: [],
        heatingTypes: [],
        
    }
    
    arrayFromStateField(field){
        const array = [];
        Object.values(this.state[field]).forEach(value => {
            array[value.id] = value.nombre
        });
        return array
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
        /* extraigo vars del estado */
        const { loading, patients } = this.state
        
        /* armo todas las labels que voy a necesitar para cada chart */
        const documentTypesLabels = this.arrayFromStateField('documentTypes');

        const insurancesLabels = this.arrayFromStateField('insurances');

        const waterTypesLabels = this.arrayFromStateField('waterTypes');

        const houseTypesLabels = this.arrayFromStateField('houseTypes');

        const heatingTypesLabels = this.arrayFromStateField('heatingTypes');

        /* inicializo los contadores de cant para cada label en cada chart en 0 */
        let documentTypesData = this.arrayAllCerosFrom(documentTypesLabels);
        
        /* cuento la cant para cada label en cada chart */
        Object.values(patients).forEach(value => {
            documentTypesData[value.documentType] = documentTypesData[value.documentType] +1
        console.log( documentTypesData)
        });
            
        /* armo el objeto a enviar como data en cada chart */
        let documentTypesCharData = {
            labels: documentTypesLabels,
            datasets: [
                {
                    label: 'Tipos de Documento',
                    data: documentTypesData,
                }
            ]
        }


        let show = <CircularIndeterminate/>
        if(!loading){
            show = (
                <Export idDivToPrint="test">
                    <Chart chartData={documentTypesCharData} text='Tipos de Documento' />
                </Export>
            )
        }
        return show
    }
}

export default Charts