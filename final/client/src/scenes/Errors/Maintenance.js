import BaseError from './base';
import React, { Component } from 'react';



class Maintenance extends Component {

  render() {
    let email = this.props.config.email
    let body = "Disculpe las molestias, el sitio esta en mantenimiento en " +
                "este momento. Si lo necesita, puede contactarnos enviando " +
                "un e-mail a " + email + " o llamando al telefono " +
                "+54-221-123-4567."

    return(
      <BaseError title="Volvemos pronto!" img="mantain8.png" body={body} />
    )
  }

}

export default Maintenance;
