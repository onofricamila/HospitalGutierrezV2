import BaseError from './base';
import React from 'react';

const maintenance = props => 
    <BaseError title="Volvemos pronto!" img="mantain8.png" body="Disculpe las molestias, el sitio esta en mantenimiento en este momento. Si lo necesita, puede contactarnos enviando
    un e-mail a {{ email }} o llamando al telefono +54-221-123-4567." />

export default maintenance;