import BaseError from './base';
import React from 'react';

const noResults = props => 
    <BaseError 
        title="No se encontraron resultados!" 
        img="bad.png" 
        body="Lo sentimos, no hay elementos que coincidan con el criterio de búsquda."/>

export default noResults;