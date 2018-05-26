import React, {Component} from 'react'
import Chart from './Chart'
import Export from './Export'

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
        documentTypesData: [],
        insurancesData: [],
        houseTypesData: [],
        waterTypesData: [],
        heatingTypesData: [],
    }

    render(){
        return (<Export idDivToPrint="test"><Chart chartData={this.state.mockData}/></Export>)
    }
}

export default Charts