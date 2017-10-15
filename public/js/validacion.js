function empty(valor) {
    if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
        return true;
    }
}
function lessThan(valor, limit) {
    if(  valor.length < limit) {
        return true;
    }
}

function notANumber(num){
    var reg = /^\d+$/;
    return !(reg.test(num));
}    

function notOnlyLetters(text){
    var reg =/^[A-Za-z]+$/;
    return !(   reg.test(text.replace(/\s/g, ""))   );
}

function notEmail(email){
    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !(reg.test(email));
}
