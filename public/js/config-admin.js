$('.updateTrigger').click(function () {
    $('.input-field').show();
    $('.data').hide();
    $('.updateTrigger').hide();
    $('.backTrigger').show();
    $('.submitTrigger').show();
    Materialize.updateTextFields();
});
$('.backTrigger').click(function () {
    $('.input-field').hide();
    $('.data').show();
    $('.updateTrigger').hide();
    $('.backTrigger').show();
    $('.submitTrigger').show();
    Materialize.updateTextFields();
});