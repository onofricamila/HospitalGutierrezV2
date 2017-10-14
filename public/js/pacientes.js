/*
    Plugin pagination TdA 1.0
     
    Uso: El table tiene que tener un ID
    * Por ese motivo no funcionara con class solo con IDs
    
    *   $("#tableRoomList").paginationTdA({
            elemPerPage: 10
        });

    * Solo recibe un parametro elemPerPage que define cuantos rows mostrara por pagina
    * si no se indica el parametro por defecto son 2
*/
 
(function ( $ ) {
    /* función que añade el footer a la tabla con los numeritos de paginacion */
    function createTableFooterPagination(idTable, nTdsColspan, last){
        var pagination = "<span><button class='btn  paginationInit'><<</button></span> ";
        for (var i = 1; i <= last; i++)
        {
            pagination += "<span><button class='btn paginationClick'>" + i + "</button></span> ";
        }
        pagination += "<span><button class='btn btn-info paginationEnd'>>></button></span>"
        tfoot = "<tfoot><tr><td style='text-align:center;' colspan='" + 10 + "'>" + pagination + "</td></tr></tfoot>";
         
        idTable
        .find("tfoot").remove();
        idTable
        .find("tbody").before(tfoot);
    }
 
 
    /* funcion que hace la separacion de paginas*/
    $.fn.paginationTdA = function( options ) {
         
        var settings = $.extend({
            elemPerPage: 10
        }, options );
  
         
            var idTable = $( this );
             
            //Configuramos los TRs para comenzar con el plugin
            //de cada TR del table tbody agregamos la clase con la que haremos los calculos
            idTable.find("tbody").eq(0).find("tr").each(function(){
                $(this).addClass("elementToPaginate");
            });
             
            var elemPerPage = settings.elemPerPage;
            var totalElem = idTable.find("tbody").eq(0).find(".elementToPaginate").length;
            var first = 1;
            var division = Math.round(parseInt(totalElem) / elemPerPage);
            var last = totalElem > elemPerPage ?  division : first;
            if ((elemPerPage * last) < totalElem)
            {
                last += 1;
            }
             
             
            var numberOfTds = idTable.find("tbody").eq(0).find("tr").eq(0).find("th").length;
            createTableFooterPagination(idTable, numberOfTds, last);
             
            idTable.find("tbody").eq(0).find(".elementToPaginate").each(function(i){
                $(this)
                .attr("data-number", (i + 1));
                // Ocultamos solo los que no sean inferiores o iguales al elemPerPage (para visualizar los primeros)
                if ((i + 1) > elemPerPage)
                {
                    $(this).hide();
                }
            });
             
            /* Al clicar sobre un numero de la paginacion realizamos el algoritmo */
            $("body").on("click", ".paginationClick", function(e){
                e.preventDefault();
                idTable.find("tbody").eq(0).find(".elementToPaginate").hide();
                var nClicked = $(this).html();
                var startIn = (elemPerPage * (nClicked - 1)) + 1;
                var stopIn = (elemPerPage * nClicked);
                 
                for(var i = startIn; i <= stopIn; i++)
                {
                    idTable.find("tbody").eq(0).find(".elementToPaginate[data-number='" + i + "']").fadeIn();
                }
                 
            });
             
            /* Al clicar en 'primero' emulamos el algoritmo con nClicked = 1 (como si hubieramos clicado en 1)*/
            $("body").on("click", ".paginationInit", function(e){
                e.preventDefault();
                idTable.find("tbody").eq(0).find(".elementToPaginate").hide();
                var nClicked = 1;
                var startIn = (elemPerPage * (nClicked - 1)) + 1;
                var stopIn = (elemPerPage * nClicked);
                 
                for(var i = startIn; i <= stopIn; i++)
                {
                    idTable.find("tbody").eq(0).find(".elementToPaginate[data-number='" + i + "']").fadeIn();
                }
            });
             
            /* Al clicar en 'ultimo' emulamos el algoritmo con nClicked = last (como si hubieramos clicado en el ultimo numero)*/
            $("body").on("click", ".paginationEnd", function(e){
                e.preventDefault();
                idTable.find("tbody").eq(0).find(".elementToPaginate").hide();
                var nClicked = last;
                var startIn = (elemPerPage * (nClicked - 1)) + 1;
                var stopIn = (elemPerPage * nClicked);
                 
                for(var i = startIn; i <= stopIn; i++)
                {
                    idTable.find("tbody").eq(0).find(".elementToPaginate[data-number='" + i + "']").fadeIn();
                }
            });
             
        //});
 
 
        return this;
  
    };
  
}( jQuery ));


/* el snippet siguiente es escencial para disparar la pagiancion; mandas el parametro de cuantos queres por pagina*/
$(document).ready(function(){
    $("#tableUserList").paginationTdA({
        elemPerPage: 1
    });
});


/* funcion para la animacion de la card de un paciente*/
$(document).ready(function() {
    $(".btn-pref .btn").click(function () {
        $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
        // $(".tab").addClass("active"); // instead of this do the below 
        $(this).removeClass("btn-default").addClass("btn-primary");   
    });
});

/* para el select */
$(document).ready(function() {
    $('select').material_select();
  });

/* para el date picker */
$(document).ready(function() {
    $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 70, // Creates a dropdown of 70 years to control year,
    clear: 'Clear',
    close: 'Ok',
    max: Date.now(),
    closeOnSelect: false // Close upon selecting a date,
  }); 
});

/* para el modal de eliminacion de pacientes*/
$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });
     
/* para eliminar un paciente*/
$('.deleteModalTrigger').click(function () {
    contenido = $(this).closest('tr').find('.contenido');
    id = contenido.children().eq(0).text();
    $('#deleteModalId').val(id);
    paciente = contenido.children().eq(1).text();
    $('#deleteModalPatient').text(paciente);
    Materialize.updateTextFields();
});

/* para marcar como selected los options en el update */
function select(idGenero, idTipoDoc, idObraSocial, heladera, electricidad, mascota, idTipoVivienda, idTipoCalefaccion, idTipoAgua){
    $("#idGenero option[value="+ idGenero +"]").attr("selected",true);
    $("#idTipoDoc option[value="+ idTipoDoc +"]").attr("selected",true);
    $("#idObraSocial option[value="+ idObraSocial +"]").attr("selected",true);
    $("#heladera option[value="+ heladera +"]").attr("selected",true);
    $("#electricidad option[value="+ electricidad +"]").attr("selected",true);
    $("#mascota option[value="+ mascota +"]").attr("selected",true);
    $("#idTipoVivienda option[value="+ idTipoVivienda +"]").attr("selected",true);
    $("#idTipoCalefaccion option[value="+ idTipoCalefaccion +"]").attr("selected",true);
    $("#idTipoAgua option[value="+ idTipoAgua +"]").attr("selected",true);
}

/* para validar formularios */

function empty(valor) {
    if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
        return true;
    }
}
function lessThan(valor, limit) {
    if(  valor.length <= limit) {
        return true;
    }
}

function nan(num){
    var reg = /^\d+$/;
    return !(re.test(num));
}    

function nas(text){
    var reg = /^[A-Za-z ]+$/;
    return !(re.test(text));
}

/*si el form se envia de todas formas poner en el onsubmit del form event.preventDefault() y si la fx devuelve false no se manda el form */
function validacion() {
    
     var nombre = document.getElementById("nombre").value;
     var apellido = document.getElementById("apellido").value;
     var fecha_nacimiento = document.getElementById("fecha_nacimiento").value;
     var idGenero = document.getElementById("idGenero").value;
     var idTipoDoc = document.getElementById("idTipoDoc").value;
     var dni = document.getElementById("dni").value;
     var domicilio = document.getElementById("domicilio").value;
     var telefono = document.getElementById("telefono").value;
     var heladera = document.getElementById("heladera").value;
     var electricidad = document.getElementById("electricidad").value;
     var mascota = document.getElementById("mascota").value;
     var idTipoVivienda = document.getElementById("idTipoVivienda").value;
     var idTipoCalefaccion = document.getElementById("idTipoCalefaccion").value;
     var idTipoAgua = document.getElementById("idTipoAgua").value;
 
     if(lessThan(nombre, 3) || empty(nombre) ||
        lessThan(apellido, 3) || empty(apellido) ||
        empty(fecha_nacimiento) ||
        empty(idGenero) ||
        empty(idTipoDoc) ||
        lessThan(dni, 3) || empty(dni) ||
        lessThan(domicilio, 3) || empty(domicilio) ||
        empty(heladera) ||
        empty(electricidad) ||
        empty(mascota) ||
        empty(idTipoVivienda) ||
        empty(idTipoCalefaccion) ||
        empty(idTipoAgua)
        ){
         alert('[ERROR] Hay algun campo requerido que esta vacio o no tiene mas de 3 caracteres. Recuerda que son todos obligatorios menos obra social y telefono.');
         return false;
    }

    if(nas(nombre) || nas(apellido)){
        alert('[ERROR] Respeta el formato de numeros para el dni.');
        return false;
       }
    
    if(nan(dni) ){
     alert('[ERROR] Respeta el formato de numeros para el dni.');
     return false;
    }

    if(!(empty(telefono || lessThan(telefono, 3) )) & nan(telefono)){
        alert('[ERROR] Respeta el formato de numeros para el telefono.');
        return false;
       }

    return true
     
 }
 

/* para eliminar un paciente */
/* data('id') me trae el valor del att data-id del boton clickeado, que es: id/surname+name del paciente en cuestion. Con la funcion split lo que hago es crear un arreglo que separa sus elementos por el delimitador "/". Al abrir el modal le asigna el valor de ese arreglo creado en la pos 0 al anchor para formar la url y el valor de ese arreglo creado en la pos 1 (corresponde al nombre y apellido) a cualquier elemento html dentro del modal-content con id="totallocal".
*/

$(document).on("click", ".openDeleteModal", function () {
var idAndName = $(this).data('id').split("/", 2);
document.getElementById('totalLocal').innerHTML = idAndName[1];
document.getElementById('enlace').setAttribute('href', "index.php?controller=Pacientes&action=deletePaciente&idPaciente=" + idAndName[0]);
});
