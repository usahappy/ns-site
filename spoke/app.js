/*
 * jQuery Easing Compatibility v1 - http://gsgd.co.uk/sandbox/jquery.easing.php
 *
 * Adds compatibility for applications that use the pre 1.2 easing names
 *
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

jQuery.extend( jQuery.easing,
{
	easeIn: function (x, t, b, c, d) {
		return jQuery.easing.easeInQuad(x, t, b, c, d);
	},
	easeOut: function (x, t, b, c, d) {
		return jQuery.easing.easeOutQuad(x, t, b, c, d);
	},
	easeInOut: function (x, t, b, c, d) {
		return jQuery.easing.easeInOutQuad(x, t, b, c, d);
	},
	expoin: function(x, t, b, c, d) {
		return jQuery.easing.easeInExpo(x, t, b, c, d);
	},
	expoout: function(x, t, b, c, d) {
		return jQuery.easing.easeOutExpo(x, t, b, c, d);
	},
	expoinout: function(x, t, b, c, d) {
		return jQuery.easing.easeInOutExpo(x, t, b, c, d);
	},
	bouncein: function(x, t, b, c, d) {
		return jQuery.easing.easeInBounce(x, t, b, c, d);
	},
	bounceout: function(x, t, b, c, d) {
		return jQuery.easing.easeOutBounce(x, t, b, c, d);
	},
	bounceinout: function(x, t, b, c, d) {
		return jQuery.easing.easeInOutBounce(x, t, b, c, d);
	},
	elasin: function(x, t, b, c, d) {
		return jQuery.easing.easeInElastic(x, t, b, c, d);
	},
	elasout: function(x, t, b, c, d) {
		return jQuery.easing.easeOutElastic(x, t, b, c, d);
	},
	elasinout: function(x, t, b, c, d) {
		return jQuery.easing.easeInOutElastic(x, t, b, c, d);
	},
	backin: function(x, t, b, c, d) {
		return jQuery.easing.easeInBack(x, t, b, c, d);
	},
	backout: function(x, t, b, c, d) {
		return jQuery.easing.easeOutBack(x, t, b, c, d);
	},
	backinout: function(x, t, b, c, d) {
		return jQuery.easing.easeInOutBack(x, t, b, c, d);
	}
});


var currentRow = 1;
var currentColumn = 1;
var inMaze = true;

$(document).ready(function(){
    (function( $ ) {
        $.fn.moveTo = function(elem) {
            var newLeft = elem.offset().left;
            var newTop = elem.offset().top;

            $(this).animate({
                left: newLeft,
                top: newTop
            }, 200);
        }
    })(jQuery);
    
    var startLeft = $(".maze .start").offset().left;
    var startTop = $(".maze .start").offset().top;
    
    $(".maze.player").moveTo($(".maze .start"));
    $(".maze .start").addClass("current-position");
    
    $(".mobile-controller a").each(function(){
        $(this).on("click",function(){
            if ($(this).is("#left-button")) {
                if (!($(".current-position").is(".border-left") || $(".current-position").is(".edge-left"))) {
                    currentColumn -= 1;

                    $(".current-position").removeClass("current-position");
                    var newSquare = $(".maze #a" + currentRow + "" + currentColumn);
                    newSquare.addClass("current-position");
                    $(".maze.player").moveTo(newSquare);
                }
            } else if ($(this).is("#right-button")) {
                if (!($(".current-position").is(".border-right") || $(".current-position").is(".edge-right"))) {
                    currentColumn += 1;

                    $(".current-position").removeClass("current-position");
                    var newSquare = $(".maze #a" + currentRow + "" + currentColumn);
                    newSquare.addClass("current-position");
                    $(".maze.player").moveTo(newSquare);
                }
            } else if ($(this).is("#up-button")) {
                if (!($(".current-position").is(".border-top") || $(".current-position").is(".edge-top"))) {
                    currentRow -= 1;

                    $(".current-position").removeClass("current-position");
                    var newSquare = $(".maze #a" + currentRow + "" + currentColumn);
                    newSquare.addClass("current-position");
                    $(".maze.player").moveTo(newSquare);
                }
            } else if ($(this).is("#down-button")) {
                if (!($(".current-position").is(".border-bottom") || $(".current-position").is(".edge-bottom"))) {
                    currentRow += 1;

                    $(".current-position").removeClass("current-position");
                    var newSquare = $(".maze #a" + currentRow + "" + currentColumn);
                    newSquare.addClass("current-position");
                    $(".maze.player").moveTo(newSquare);
                }
            }
            
            if (currentColumn==10 && currentRow==10) {
                inMaze=false;
                setTimeout(function(){$(".winner").addClass("finished");}, 250);
            }
        });
        
        $(this).mousedown(function(){
            $(this).parent().addClass("activated");
        });
        
        $(this).mouseup(function(){
            $(this).parent().removeClass("activated");
        });
    });
    
    $(document).keydown(function(e){
        if (inMaze) {
            switch(e.which){
                case 37: //left arrow
                    if (!($(".current-position").is(".border-left") || $(".current-position").is(".edge-left"))) {
                        currentColumn -= 1;

                        $(".current-position").removeClass("current-position");
                        var newSquare = $(".maze #a" + currentRow + "" + currentColumn);
                        newSquare.addClass("current-position");
                        $(".maze.player").moveTo(newSquare);
                    }
                    break;
                case 39: //right arrow
                    if (!($(".current-position").is(".border-right") || $(".current-position").is(".edge-right"))) {
                        currentColumn += 1;

                        $(".current-position").removeClass("current-position");
                        var newSquare = $(".maze #a" + currentRow + "" + currentColumn);
                        newSquare.addClass("current-position");
                        $(".maze.player").moveTo(newSquare);
                    }
                    break;
                case 38: //up arrow
                    if (!($(".current-position").is(".border-top") || $(".current-position").is(".edge-top"))) {
                        currentRow -= 1;

                        $(".current-position").removeClass("current-position");
                        var newSquare = $(".maze #a" + currentRow + "" + currentColumn);
                        newSquare.addClass("current-position");
                        $(".maze.player").moveTo(newSquare);
                    }
                    break;
                case 40: //down arrow
                    if (!($(".current-position").is(".border-bottom") || $(".current-position").is(".edge-bottom"))) {
                        currentRow += 1;

                        $(".current-position").removeClass("current-position");
                        var newSquare = $(".maze #a" + currentRow + "" + currentColumn);
                        newSquare.addClass("current-position");
                        $(".maze.player").moveTo(newSquare);
                    }
                    break;
            }
        }
        
        if (currentColumn==10 && currentRow==10) {
            inMaze=false;
            setTimeout(function(){$(".winner").addClass("finished");}, 250);
        }
    });
});