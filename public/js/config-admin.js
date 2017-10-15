$('.updateTrigger').click(function () {
    $(function () {
        $("textarea").each(function () {
            this.style.height = (this.scrollHeight - 40) + 'px';
        });
    });
    var $target = $('html,body');
    $target.animate({
        scrollTop: $target.height()
    }, 1000);
    $('.input-field').show();
    $('.data').hide();
    $('.updateTrigger').hide();
    $('.updateButton').show();
    Materialize.updateTextFields();
});
$('.backTrigger').click(function () {
    $('.input-field').hide();
    $('.data').show();
    $('.updateTrigger').show();
    $('.updateButton').hide();
    Materialize.updateTextFields();
});

/* para validar*/

function validacionAdmin(){
    var titulo = document.getElementById("titulo").value;
    var email = document.getElementById("email").value;
    var elementos = document.getElementById("elementos").value;

    if(lessThan(titulo, 3) || empty(titulo)) {
        alert('[ERROR] El titulo es vacio o menor a 4 chars.');
        return false;
    }
    if(notEmail(email) || empty(email)) {
        alert('[ERROR] El email es vacio o invalido.');
        return false;
    }
    if(empty(elementos) ||  nan(elementos)){
        alert('[ERROR] La cantidad de elementos por pagina es requerida y debe ser un numero.');
        return false;
    }

    return true
}