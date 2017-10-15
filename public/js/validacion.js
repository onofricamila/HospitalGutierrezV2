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

function notANumber(num){
    var reg = /^\d+$/;
    return !(reg.test(num));
}    

function notOnlyLetters(text){
    alert('[ERROR] Entra a not only letters.');
    
    var reg = /^[a-zA-Z]+$/;
    return reg.test(text);
}

function notEmail(email){
    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !(reg.test(email));
}
