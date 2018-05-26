import React, {Component} from 'react'
import Chart from './Chart'
import Export from './Export'
import CircularIndeterminate from '../../components/CircularIndeterminate/CircularIndeterminate';

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

    getdocumentTypesData(){
        
    }

    componentDidMount(){
        this.getdocumentTypesData()
        this.getInsurances()
        this.getHouseTypes()
        this.getWaterTypes()
        this.getHeatingTypes()
    }
    
    render(){
        const { loading, documentTypesData, insurancesData, houseTypesData, waterTypesData, heatingTypesData } = this.state
        
        let show = <CircularIndeterminate/>
        if(!loading){
            show = (
                <Export idDivToPrint="test">
                    <Chart chartData={this.state.mockData}/>
                </Export>
            )
        }
        return show
    }
}

export default Charts