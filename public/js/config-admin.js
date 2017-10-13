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
