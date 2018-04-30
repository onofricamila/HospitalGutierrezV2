import BaseError from './base';
import React from 'react';

const accessDenied = props => 
    <BaseError 
        title="Acceso denegado!" 
        img="security.png"
        body="Lo sentimos, no tiene permisos para acceder a esta funcionlidad." />

export default accessDenied;