$(document).ready(function () {
    $('.carousel').carousel();
});

$('.carousel.carousel-slider').carousel({
    fullWidth: true
});

$('.carousel').carousel();
setInterval(function () {
    $('.carousel').carousel('next');
}, 4500); // every x seconds