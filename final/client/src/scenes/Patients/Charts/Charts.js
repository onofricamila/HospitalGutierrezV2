import React, {Component, Fragment} from 'react'
import Chart from './Chart'
import Export from '../../Charts/Export'
import CircularIndeterminate from '../../../components/CircularIndeterminate/CircularIndeterminate';
import axiosBackend from "../../../axios/Backend";
import InfoIcon from 'material-ui-icons/Info';


class Charts extends Component{
    state = {
        loading: true,
        consults: [],
        
    }

    fetchConsults(){
        axiosBackend.get('/patients/' + this.props.match.params.id + '/consults').then(response => {
          this.setState({
          consults: response.data,
          loading: false
          });
        });
      }
    
    componentDidMount(){
        this.fetchConsults()
    }

    render(){

        /* extraigo vars del estado y props */
        const { loading, consults } = this.state

        let weight = []
        let height = []
        let ppc = []

        let weightLabels = []
        let heightLabels = []
        let ppcLabels = []

        let date

        Object.values(consults).forEach(value => {
            date = value.date.toLocaleString()

            weight.push(value.weight)
            weightLabels.push(date)
            if (value.height != 0) {
                height.push(value.height)
                heightLabels.push(date)
            }
            if (value.PPC != 0) {
                ppc.push(value.PPC) 
                ppcLabels.push(date)
            }
        });

        console.log(weight)
        console.log(height)
        console.log(ppc)

        /* armo el objeto a enviar como data en cada chart */
        let weightCharData = {
            labels: weightLabels,
            datasets: [
                {
                    data: weight,
                    fill: false,
                    pointHoverRadius: 5,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    spanGaps: false,
                    borderColor: 'rgba(255,99,132,0.6)',
                    pointBorderWidth: 5
                }
            ]
        }

        let heightCharData = {
            labels: heightLabels,
            datasets: [
                {
                    data: height,
                }
            ]
        }

        let ppcCharData = {
            labels: ppcLabels,
            datasets: [
                {
                    data: ppc,
                }
            ]
        }

         /* veo que muestro al renderizar */
         let show = ''

         if(!loading){
            if (consults.length == 0){
                show = 'No presenta consultas cargadas'
            }
            else{
            show = (
                <Fragment>
                    <Export idDivToPrint="weight">
                        <Chart chartData={weightCharData} text='Curva de crecimiento' />
                    </Export>

                    <Export idDivToPrint="height">
                        <Chart chartData={heightCharData} text='Curva de talla' />
                    </Export>

                    <Export idDivToPrint="ppc">
                        <Chart chartData={ppcCharData} text='Curva de percentil perímetro cefálico' />
                    </Export>
                </Fragment>
             )
         }}
         return show
     }
    

}

export default Charts
