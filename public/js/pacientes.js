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
 
 
    /* funcion que hace la separacion de paginotOnlyLetters*/
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

/* para validar formularios */

/*si el form se envia de todas formas poner en el onsubmit del form event.preventDefault() y si la fx devuelve false no se manda el form */
function validateFormPac() {
    
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
 
    /* is empty? */
    if(empty(nombre) ){
        alert('[ERROR] El campo requerido nombre tipo agua esta vacio.');
        return false;
   }
   if(empty(apellido) ){
        alert('[ERROR] El campo requerido apellido tipo agua esta vacio.');
        return false;
   }
   if(empty(fecha_nacimiento) ){
        alert('[ERROR] El campo requerido fecha de nacimiento tipo agua esta vacio.');
        return false;
   }
   if(empty(idGenero) ){
        alert('[ERROR] El campo requerido genero esta vacio.');
        return false;
   }
   if(empty(idTipoDoc) ){
        alert('[ERROR] El campo requerido tipo doc esta vacio.');
        return false;
   }
   if(empty(dni) ){
        alert('[ERROR] El campo requerido dni esta vacio.');
        return false;
   }
   if(empty(domicilio) ){
        alert('[ERROR] El campo requerido domicilio esta vacio.');
        return false;
   }
   if(empty(heladera) ){
        alert('[ERROR] El campo requerido heladera esta vacio.');
        return false;
   }
   if(empty(electricidad) ){
        alert('[ERROR] El campo requerido rlrctricidad esta vacio.');
        return false;
   }
   if(empty(mascota) ){
        alert('[ERROR] El campo requerido mascota esta vacio.');
        return false;
   }
   if(empty(idTipoVivienda) ){
        alert('[ERROR] El campo requerido tipo vivienda esta vacio.');
        return false;
   }
   if(empty(idTipoCalefaccion) ){
        alert('[ERROR] El campo requerido tipo calefaccion esta vacio.');
        return false;
   }
   if(empty(idTipoAgua)){
        alert('[ERROR] El campo requerido tipo agua esta vacio.');
        return false;
   }
       
   /* formatos */
    if(notOnlyLetters(nombre) || notOnlyLetters(apellido)){
        alert('[ERROR] Respeta el formato solo letras para el nombre y el apellido.');
        return false;
    }
    
    if(notANumber(dni) ){
     alert('[ERROR] Respeta el formato de numeros para el dni.');
     return false;
    }

    if(!(empty(telefono)) && notANumber(telefono)){
        alert('[ERROR] Respeta el formato de numeros para el telefono.');
        return false;
    }
    if(!(empty(telefono)) && lessThan(telefono,4) && telefono != 0){
        alert('[ERROR] El telefono debe tener minimo 4 digitos.');
        return false;
    }

    return true
     
 }
 
 /* para el buscador */
function validateSearchPac(){
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var dni = document.getElementById("dni").value;
    var idTipoDoc = document.getElementById("idTipoDoc").value;
    
    if( !(empty(nombre)) && notOnlyLetters(nombre)){
        alert('[ERROR] Respeta el formato de letras para el nombre.');
        return false;
    }
    if( !(empty(apellido)) && notOnlyLetters(apellido)){
        alert('[ERROR] Respeta el formato de letras para el apellido.');
        return false;
    }
    if(!(empty(dni)) && notANumber(dni)){
        alert('[ERROR] Respeta el formato de numeros para el dni.');
        return false;
    }

    return true;
} 

/* para eliminar un paciente */
/* data('id') me trae el valor del att data-id del boton clickeado, que es: id/surname+name del paciente en cuestion. Con la funcion split lo que hago es crear un arreglo que separa sus elementos por el delimitador "/". Al abrir el modal le asigna el valor de ese arreglo creado en la pos 0 al anchor para formar la url y el valor de ese arreglo creado en la pos 1 (corresponde al nombre y apellido) a cualquier elemento html dentro del modal-content con id="totallocal".
*/

$(document).on("click", ".openDeleteModal", function () {
var idAndName = $(this).data('id').split("/", 2);
document.getElementById('totalLocal').innerHTML = idAndName[1];
document.getElementById('enlace').setAttribute('href', "index.php?controller=Pacientes&action=deletePaciente&idPaciente=" + idAndName[0]);
});


/* para eliminar la historia clinica de un paciente */
$(document).on("click", ".openDeleteHistoryModal", function () {
    var idAndName = $(this).data('id').split("/", 2);
    document.getElementById('paciente').innerHTML = idAndName[1];
    document.getElementById('enlace_historia').setAttribute('href', "index.php?controller=Consultas&action=deleteHistoria&idPaciente=" + idAndName[0]);
});