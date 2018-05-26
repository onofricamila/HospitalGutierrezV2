import React, {Component} from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2'

class Chart extends Component{
    
    render(){
        return(
            <div classNmae='chart'>
                <Pie
                    data={this.props.chartData}
                    options={{
                        maintainAspectRatio: false,
                        title: {
                            display: true,
                            text: 'Cities population',
                            fontSize:20
                        }
                    }}
                />
            </div>
        )
    }
}

export default Chart