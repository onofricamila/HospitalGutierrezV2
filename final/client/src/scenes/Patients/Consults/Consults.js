import React, { Component} from "react";
import { Route, Switch } from "react-router-dom";
import FullConsultPage from './FullConsult/FullConsult';
import ConsultsListPage from './ConsultsList/EnhancedTable';
import CreateOrUpdateConsult from './CreateOrUpdateConsult/CreateOrUpdateConsult';
import Error404 from "../../Errors/404";

class Consults extends Component{
    render(){
        return (
            <Switch>
            <Route path="/patients/:idP/consults/new" exact  
                render={ (routeProps) => 
                    <div>
                        <CreateOrUpdateConsult  routeProps={routeProps}/>
                    </div>
            } /> 
            <Route path="/patients/:idP/consults/" exact 
                render={ (routeProps) => 
                    <div>
                        <ConsultsListPage 
                            roles={this.props.roles}
                            routeProps={routeProps} />
                    </div>
                
            } /> 
            <Route path="/patients/:idP/consults/:idC" exact 
                render={ (routeProps) => 
                    <div>
                        <FullConsultPage routeProps={routeProps} />
                    </div> 
                }/>
            <Route path="/patients/:idP/consults/update/:idC" exact 
                render={ (routeProps) => 
                    <div>
                        <CreateOrUpdateConsult routeProps={routeProps} />
                    </div> 
                }/>
            <Route component={Error404} />
        </Switch>
        )
    }
}

export default Consults