/* para eliminar la consulta de la clinica de un paciente */
$(document).on("click", ".openDeleteConsultModal", function () {
    var idAndNameAndFecha = $(this).data('id').split("/", 3);
    document.getElementById('paciente').innerHTML = idAndNameAndFecha[1];
    document.getElementById('fecha').innerHTML = idAndNameAndFecha[2];
    document.getElementById('enlace_consulta').setAttribute('href', "index.php?controller=Consultas&action=deleteConsulta&idConsulta=" + idAndNameAndFecha[0]);
});

function validateFormConsult() {
    
     var vacunas_completas = document.getElementById("vacunas_completas").value;
     var maduracion_acorde = document.getElementById("maduracion_acorde").value;
     var examen_fisico_normal = document.getElementById("examen_fisico_normal").value;
     var vacunas_obs = document.getElementById("vacunas_obs").value;
     var maduracion_obs = document.getElementById("maduracion_obs").value;
     var examen_fisico_obs = document.getElementById("examen_fisico_obs").value;
     var peso = document.getElementById("peso").value;
 
    /* is empty? */
    if(empty(vacunas_completas) ){
        alert('[ERROR] El campo requerido vacunas_completas esta vacio.');
        return false;
   }
   if(empty(maduracion_acorde) ){
        alert('[ERROR] El campo requerido maduracion_acorde esta vacio.');
        return false;
   }
   if(empty(examen_fisico_normal) ){
        alert('[ERROR] El campo requerido examen_fisico_normal esta vacio.');
        return false;
   }
   if(empty(vacunas_obs) ){
        alert('[ERROR] El campo requerido vacunas_obs esta vacio.');
        return false;
   }
   if(empty(maduracion_obs) ){
        alert('[ERROR] El campo requerido maduracion_obs esta vacio.');
        return false;
   }
   if(empty(examen_fisico_obs) ){
        alert('[ERROR] El campo requerido examen_fisico_obs esta vacio.');
        return false;
   }
   if(empty(peso) ){
        alert('[ERROR] El campo requerido peso esta vacio.');
        return false;
   }

    return true
     
 }
 