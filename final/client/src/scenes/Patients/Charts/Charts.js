import React, {Component, Fragment} from 'react'
import Chart from './Chart'
import Export from '../../Charts/Export'
import CircularIndeterminate from '../../../components/CircularIndeterminate/CircularIndeterminate';
import axiosBackend from "../../../axios/Backend";
import InfoIcon from 'material-ui-icons/Info';
import TimelineIcon from 'material-ui-icons/Timeline';
import Moment from 'react-moment';

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
        let PPC = []

        let weightLabels = []
        let heightLabels = []
        let PPCLabels = []

        let date

        Object.values(consults).forEach(value => {
            date = new Date(value.date).toLocaleDateString()
            
            weight.push(value.weight)
            weightLabels.push(date)
            if (value.height != 0) {
                height.push(value.height)
                heightLabels.push(date)
            }
            if (value.PPC != 0) {
                PPC.push(value.PPC) 
                PPCLabels.push(date)
            }
        });


         /* veo que muestro al renderizar */
         let show = ''

         if(!loading){
            if (consults.length == 0){
                show = 'No presenta consultas cargadas.'
            }
            else{
            show = (
                <Fragment>
                    <Export idDivToPrint="weight">
                        <Chart data={weight} text='Curva de crecimiento' labels={weightLabels} label='(Kg)' />
                    </Export>
                   
                    <div style={{textAlign: 'center', marginTop: 100, marginBottom: 100}}></div>
                    
                    <Export idDivToPrint="height">
                        <Chart data={height} text='Curva de talla' labels={heightLabels} label='(Cm)'/>
                    </Export>
                    
                    <div style={{textAlign: 'center', marginTop: 100, marginBottom: 100}}></div>
                    
                    <Export idDivToPrint="PPC">
                        <Chart data={PPC} text='Curva de percentil perímetro cefálico' labels={PPCLabels} label='(Cm)' />
                    </Export>
                </Fragment>
             )
         }}
         return show
     }
    

}

export default Charts
