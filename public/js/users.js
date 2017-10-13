//jQuery name space
(function ($) {
    //document ready
    $(function () {
        $(".dropdown-button").dropdown({
            hover: true,
            inDuration: 300,
            outDuration: 225,
            constrain_width: false, // Does not change width of dropdown to that of the activator
            // gutter: -130, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left'
        });
    }); // end of document ready
})
$(document).ready(function () {
    $('select').material_select();
});
$(document).ready(function () {
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});
$('.rolesModalTrigger').click(function () {
    contenido = $(this).closest('div').find('.contenido-card');
    id = contenido.children().eq(0).text();
    $('#rolesModalId').val(id);
    user = contenido.children().eq(2).text().replace('Nombre de usuario: ', '');
    $('#rolesModalUser').text(user);
    roles = contenido.children().eq(6).text().replace('Roles: ', '').split(", ");
    for (var i = 0; i < roles.length; i++) {
        var rol = '#' + roles[i];
        $(rol).prop('checked', true);
    }
    Materialize.updateTextFields();
});
$('.deleteModalTrigger').click(function () {
    contenido = $(this).closest('div').find('.contenido-card');
    id = contenido.children().eq(0).text();
    $('#deleteModalId').val(id);
    user = contenido.children().eq(2).text().replace('Nombre de usuario: ', '');
    $('#deleteModalUser').text(user);
});
$('.updateModalTrigger').click(function () {
    document.getElementById("form").reset();
    $('#form').attr('action', 'index.php?controller=Users&action=updateUser');

    contenido = $(this).closest('div').find('.contenido-card');
    id = contenido.children().eq(0).text();
    email = contenido.children().eq(1).text().replace('E-mail: ', '');
    user = contenido.children().eq(2).text().replace('Nombre de usuario: ', '');
    nombre = contenido.children().eq(7).text();
    apellido = contenido.children().eq(8).text();

    $('#title').text('Actualizar usuario: ' + user);
    $('#email').val(email);
    $('#user').val(user);
    $('#first_name').val(nombre);
    $('#last_name').val(apellido);
    $('#id').val(id);
    Materialize.updateTextFields();
});
$('.newUserModalTrigger').click(function () {
    document.getElementById("form").reset();
    $('#form').attr('action', 'index.php?controller=Users&action=newUser');
    $('#title').text('Nuevo Usuario');
    Materialize.updateTextFields();
});
$(document).ready(function () {
    var paginacion = $('.paginacion').text();
    $('.cardContainer').each(function( index ) {
        if (index > paginacion) {
            $(this).hide();
        }
    });
    $('.pagination-li').first().addClass('disabled');
    if ($('.pagination-li').length == 1) {
        $('.pagination-next').addClass('disabled');
    }
});

(jQuery); // end of jQuery name space