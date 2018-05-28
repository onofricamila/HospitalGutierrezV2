import React, {Component} from 'react';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import Button from 'material-ui/Button';

export default class Export extends Component {

  printDocument = () => {
    const input = document.getElementById(this.props.idDivToPrint);
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }

  render() {
    return (<div>
      <div className="mb5">
        <Button onClick={this.printDocument}>Descargar pdf</Button>
      </div>
      <div id={this.props.idDivToPrint} className="mt4" style={{
        width: '210mm',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <div>{this.props.children}</div>
      </div>
    </div>);
  }
}
  
