$(document).ready(function(){
    var mobileNavClicker = $(".mobile-navbar-content input");
    var mobileNavDisplay = $(".mobile-nav-display");
    
    mobileNavClicker.change(function(){
        if ($(this).prop("checked")) {
            // show mobileNavDisplay
            mobileNavDisplay.css("display", "block");
            $("body").css("overflow", "hidden");
        } else {
            // hide mobileNavDisplay
            mobileNavDisplay.css("display", "none");
            $("body").css("overflow", "auto");
        }
    })
});