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
})(jQuery); // end of jQuery name space