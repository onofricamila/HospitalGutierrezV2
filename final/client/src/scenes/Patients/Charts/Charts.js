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

        Object.values(consults).forEach(value => {
            weight.push(value.weight)
            if (value.height != 0) {
                height.push(value.height)  
            }
            if (value.PPC != 0) {
                ppc.push(value.ppc)  
            }
        });

        console.log(weight)
        console.log(height)
        console.log(ppc)

        /* armo el objeto a enviar como data en cada chart */
        let weightCharData = {
            labels: [],
            datasets: [
                {
                    data: weight,
                }
            ]
        }

        let heightCharData = {
            labels: [],
            datasets: [
                {
                    data: height,
                }
            ]
        }

        let ppcCharData = {
            labels: [],
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
