$(document).ready(function(){
    var letterOn = false;
    var turnLetterOnButton = $(".screen-notice a");
    var turnLetterOffButton = $(".letter-closing-button");
    var letterDisplay = $(".letter-from-editors");
    
    turnLetterOnButton.click(function(){
        $("body").css("overflow", "hidden");
        letterDisplay.css("display", "block");
        letterDisplay.animate({
            opacity: 1
        }, 200);
    });
    
    turnLetterOffButton.click(function(){
        $("body").css("overflow", "auto");
        letterDisplay.animate({
            opacity: 0
        }, 200);
        letterDisplay.delay(250).queue(function(next){
            $(this).css("display", "none");
            next();
        });
    });
});