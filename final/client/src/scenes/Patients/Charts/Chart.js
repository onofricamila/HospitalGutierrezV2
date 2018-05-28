import React, {Component} from 'react'
import {Line} from 'react-chartjs-2'

class Chart extends Component{
    
    render(){
        let chartData =  {
            labels: this.props.labels,
            datasets: [
                {
                    data: this.props.data,
                    fill: false,
                    pointHoverRadius: 5,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    spanGaps: false,
                    borderColor: 'rgba(255,99,132,0.6)',
                    backgroundColor: 'rgba(255,99,132,0.6)',
                    pointBorderWidth: 5,
                    label: this.props.label
                }
            ]
        }

        return(
            <div >
                <Line
                    data={chartData} 
                    options={{
                        maintainAspectRatio: true,
                        title: {
                            display: true,
                            text: this.props.text,
                            fontSize:20
                        },
                        legend: {
                            display: true,
                        }
                    }}
                />
            </div>
        )
    }
}

export default Chart