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
    pass = contenido.children().eq(9).text();
    
    $('#title').text('Actualizar usuario: ' + user);
    $('#email').val(email);
    $('#user').val(user);
    $('#first_name').val(nombre);
    $('#last_name').val(apellido);
    $('#id').val(id);
    $('#pass').val(pass);
    Materialize.updateTextFields();
});
$('.newUserModalTrigger').click(function () {
    document.getElementById("form").reset();
    $('#form').attr('action', 'index.php?controller=Users&action=newUser');
    $('#title').text('Nuevo Usuario');
    Materialize.updateTextFields();
});
$(document).ready(function () {
    $('.cardContainer').each(function( index ) {
        if (index+1 > $('#paginacion').text()) {
            $(this).hide();
        }
    });
    $('.pagination-li').first().addClass('active');
    if ($('.pagination-li').length == 1) {
        $('.pagination-next').addClass('disabled');
    }

    var actual = $('.pagination-li.active').text();
    if ( actual == $('.pagination-li').last().text() ) {
        $('.pagination-next').addClass('disabled');
    } else {
        $('.pagination-next').removeClass('disabled');
    }
    if ( actual == $('.pagination-li').first().text() ) {
        $('.pagination-back').addClass('disabled');
    } else {
        $('.pagination-back').removeClass('disabled');
    }
    $('.container').show();
});
$('.pagination-li').click(function() {
    $('.pagination-li.active').addClass('waves-effect');
    $('.pagination-li.active').removeClass('active');
    $(this).addClass('active');
    $(this).removeClass('waves-effect');

    var actual = $('.pagination-li.active').text();
    if ( actual == $('.pagination-li').last().text() ) {
        $('.pagination-next').addClass('disabled');
    } else {
        $('.pagination-next').removeClass('disabled');
    }
    if ( actual == $('.pagination-li').first().text() ) {
        $('.pagination-back').addClass('disabled');
    } else {
        $('.pagination-back').removeClass('disabled');
    }

    $('.cardContainer').each(function( index ) {
        if ($('.pagination-li.active').text()-1 == Math.floor(index / $('#paginacion').text())) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
});
$('.pagination-back').click(function() {
    var actual = $('.pagination-li.active').text();
    if (!(actual == $('.pagination-li').first().text())) {
        $('.pagination-li').eq(actual-2).click();
    }
});
$('.pagination-next').click(function() {
    var actual = $('.pagination-li.active').text();
    if (!(actual == $('.pagination-li').last().text())) {
        $('.pagination-li').eq(actual).click();
    }
});
(jQuery); // end of jQuery name space

/* para validar new user */
function validateFormUser(){
    var email = document.getElementById("email").value;
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;
    var last_name = document.getElementById("last_name").value;
    var first_name = document.getElementById("first_name").value;

    if(empty(email) ||
    empty(user) ||
    empty(pass) ||
    empty(last_name) ||
    empty(first_name)
    ){
        alert('[ERROR] Hay algun campo requerido que esta vacio. Recuerda que son todos obligatorios.');
        return false;
    }

    if(notEmail(email)) {
        alert('[ERROR] El email es invalido.');
        return false;
    }

    if(lessThan(user, 4)){
        alert('[ERROR] El user no debe ser menor a 4 chars.');
        return false;
    }

    if(contieneBlancos(user)){
        alert('[ERROR] El nombre de usuario no debe contener blancos.');
        return false;
    }

    if(contieneBlancos(pass)){
        alert('[ERROR] La contraseña no debe contener blancos.');
        return false;
    }

    if(lessThan(pass, 4)){
        alert('[ERROR] La contraseña no debe ser menor a 4 chars.');
        return false;
    }


    if( !(empty(first_name)) && notOnlyLetters(first_name)){
        alert('[ERROR] Respeta el formato de letras para el nombre.');
        return false;
    }
    if( !(empty(last_name)) && notOnlyLetters(last_name)){
        alert('[ERROR] Respeta el formato de letras para el apellido.');
        return false;
    }
    return true;
}