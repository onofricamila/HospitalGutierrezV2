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

function notEmail(email){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !(re.test(email));
}

function NaN(num){
    var reg = /^\d+$/;
    return !(re.test(num));
    
}

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
    if(empty(elementos) ||  NaN(elementos)){
        alert('[ERROR] La cantidad de elementos por pagina es requerida y debe ser un numero.');
        return false;
    }

    return true
}