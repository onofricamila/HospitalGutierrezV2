$('.updateTrigger').click(function () {
    $('.input-field').show();
    $('.data').hide();
    Materialize.updateTextFields();
});
$('.backTrigger').click(function () {
    $('.input-field').hide();
    $('.data').show();
    Materialize.updateTextFields();
});