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
        sampleColors: ['rgba(255,99,132,0.6)', 'rgba(0,99,132,0.6)', 'rgba(255,0,132,0.6)', 'rgba(255,99,0,0.6)', 'rgba(0,0,132,0.6)', 'rgba(0,99,0,0.6)'],
        
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
         const { loading, consults, sampleColors } = this.state

         let show = ''
         
         if(!loading){
            if (consults.length == 0){
                show = 'No presenta consultas cargadas'
            }
            else{
            show = (
                <Fragment>
                    <Export idDivToPrint="weight">
                        {/* <Chart chartData={weightCharData} text='Curva de crecimiento' /> */}
                        {'lala'}
                    </Export>

                    <Export idDivToPrint="height">
                        {/* <Chart chartData={heightCharData} text='Curva de talla' /> */}
                        {'lala'}
                    </Export>

                    <Export idDivToPrint="ppc">
                        {/* <Chart chartData={ppcCharData} text='Curva de percentil perímetro cefálico' /> */}
                        {'lala'}
                    </Export>
                </Fragment>
             )
         }}
         return show
     }
    

}

export default Charts
