/* para eliminar la consulta de la clinica de un paciente */
$(document).on("click", ".openDeleteConsultModal", function () {
    var idAndNameAndFecha = $(this).data('id').split("/", 3);
    document.getElementById('paciente').innerHTML = idAndNameAndFecha[1];
    document.getElementById('fecha').innerHTML = idAndNameAndFecha[2];
    document.getElementById('enlace_consulta').setAttribute('href', "index.php?controller=Consultas&action=deleteConsulta&idConsulta=" + idAndNameAndFecha[0]);
});