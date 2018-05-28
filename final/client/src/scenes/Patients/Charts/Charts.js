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
        patient: null
        
    }

    fetchConsults(){
        axiosBackend.get('/patients/' + this.props.match.params.id + '/consults').then(response => {
          this.setState({
          consults: response.data
          });
        });
      }
    
    fetchPatient(){
    axiosBackend.get('/patients/' + this.props.match.params.id).then(response => {
        this.setState({
        patient: response.data,
        loading: false
        });
    });
    }
    
    componentDidMount(){
        this.fetchConsults()
        this.fetchPatient()
    }

    differenceInWeeks(date1, date2){
        var date1_time = date1.getTime(), date2_time = date2.getTime(), diff_sec = Math.abs(date1_time - date2_time)/1000, diff_w = Math.round(diff_sec/60/60/24/7);
        return diff_w;
    }

    differenceInYears (dateold, datenew) {
        var ynew = datenew.getFullYear();
        var mnew = datenew.getMonth();
        var dnew = datenew.getDate();
        var yold = dateold.getFullYear();
        var mold = dateold.getMonth();
        var dold = dateold.getDate();
        var diff = ynew - yold;
        if (mold > mnew) diff--;
        else {
            if (mold == mnew) {
                if (dold > dnew) diff--;
            }
        }
        return diff;
    }

    render(){

        /* extraigo vars del estado y props */
        const { loading, consults, patient } = this.state

        /* inicializo variables aux */
        let weight = []
        let height = []
        let PPC = []

        let weightLabels = []
        let heightLabels = []
        let PPCLabels = []

        let consultDate
        let diffYears
        let diffWeeks

         /* veo que muestro al renderizar */
         let show = ''

         if(!loading){
            if (consults.length == 0){
                show = 'No presenta consultas cargadas.'
            }
            else{

            Object.values(consults).forEach(value => {
                consultDate = new Date(value.date)
                
                diffYears = this.differenceInYears(new Date(patient.date), consultDate);
                diffWeeks = this.differenceInWeeks(new Date(patient.date), consultDate);
             
                if (diffWeeks <= 13) {
                    weight.push(value.weight)
                    weightLabels.push(consultDate.toLocaleDateString())

                    if (value.PPC != 0) {
                        PPC.push(value.PPC) 
                        PPCLabels.push(consultDate.toLocaleDateString())
                    }

                }
               
                if (diffYears <= 2) {
                    if (value.height != 0) {
                        height.push(value.height)
                        heightLabels.push(consultDate.toLocaleDateString())
                    }
                }
                
               
            });

            show = (
                <Fragment>
                    {diffYears}
                    {diffWeeks}
                    <Export idDivToPrint="weight">
                        <Chart data={weight} text='Curva de crecimiento' labels={weightLabels} label='Kg' />
                    </Export>
                   
                    <div style={{textAlign: 'center', marginTop: 100, marginBottom: 100}}></div>
                    
                    <Export idDivToPrint="height">
                        <Chart data={height} text='Curva de talla' labels={heightLabels} label='Cm'/>
                    </Export>
                    
                    <div style={{textAlign: 'center', marginTop: 100, marginBottom: 100}}></div>
                    
                    <Export idDivToPrint="PPC">
                        <Chart data={PPC} text='Curva de percentil perímetro cefálico' labels={PPCLabels} label='Cm' />
                    </Export>
                </Fragment>
             )
         }}
         return show
     }
    

}

export default Charts
