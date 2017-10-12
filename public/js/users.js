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
$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });
$('.rolesModalTrigger').click(function(){
    modal = $('#rolesModal');
    contenido = $(this).closest('div').find('.contenido-card');
    alert(contenido.children().eq(1).text());
});
(jQuery); // end of jQuery name space