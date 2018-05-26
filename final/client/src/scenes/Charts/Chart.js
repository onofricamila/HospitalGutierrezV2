import React, {Component} from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2'

class Chart extends Component{
    
    render(){
        return(
            <div classNmae='chart'>
                <Bar
                    data={this.props.chartData}
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