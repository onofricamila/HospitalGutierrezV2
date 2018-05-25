import React, { Component } from 'react'
import { Route } from "react-router-dom";

const AddPropsToRoute = (WrappedComponent, passedProps)=>{
    return (
        class Route extends Component{
            render(){
                let props = Object.assign({}, this.props, passedProps)
                return  <WrappedComponent {...props} />
            }
        }
    )
  }

export default AddPropsToRoute