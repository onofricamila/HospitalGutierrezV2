import BaseError from './base';
import React, { Component } from 'react';
import config from 'react-global-configuration';



class Maintenance extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let email = config.get('email')

    let body = "Disculpe las molestias, el sitio esta en mantenimiento en " +
                "este momento. Si lo necesita, puede contactarnos enviando " +
                "un e-mail a " + email + " o llamando al telefono " +
                "+54-221-123-4567."

    let title = "Volvemos pronto!"

    let img = "mantain8.png"

    return(
      <BaseError title={title} img={img} body={body} />
    )
  }

}

export default Maintenance;
