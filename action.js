$(document).ready(function(){
    /* SCROLLING */
    var currentPos = 1;
    var wait = false;
    var totalPos = 3;
    
    for (i=2; i<=totalPos; i++) {
        $("#num"+i).css("opacity","0").css("top","+=100px").css("display","none");
    }
    
    $(window).on("wheel", function(){
        var delta = event.deltaY;
        
        if (delta > 75 && !wait && currentPos < totalPos) { // going forward
            wait=true;
            currentPos+=1;
            
            setTimeout(function(){wait=false},700);
            
            // main
            $("#num"+(currentPos-1)).animate({ // exit old
                opacity: "0",
                top: "-=100px"
            },150, function(){$("#num"+(currentPos-1)).css("display","none")});
            
            $("#num"+(currentPos)).css("display","block"); // new visible
            $("#num"+(currentPos)).animate({ // enter new
                opacity: "1",
                top: "-=100px"
            },200);
            
            
            // navbar
            $("#nav-num"+(currentPos-1)).animate({ // exit old navbar
                opacity: "0" 
            }, 300, function(){$("#nav-num"+(currentPos-1)).css("display","none")});
            
            $("#nav-num"+currentPos+" li").delay(300).each(function(index){ // enter new navbar
                $(this).css("left", "-=10px").css("opacity", 0);
                $("#nav-num"+currentPos).css("display","block").css("opacity", 1);
                
                $(this).delay(150 * index).animate({
                    opacity: "1",
                    left: "+=10px"
                }, 300);
            });
            
        } else if (delta < -75 && !wait && currentPos > 1) { // going backwards
            wait=true;
            currentPos-=1;
            
            setTimeout(function(){wait=false},700);
            
            // main
            $("#num"+(currentPos+1)).animate({ // old go away
                opacity: "0",
                top: "+=100px"
            },150, function(){$("#num"+(currentPos+1)).css("display","none")});
            
            $("#num"+(currentPos)).css("display","block"); // new visible
            $("#num"+(currentPos)).animate({ // enter new
                opacity: "1",
                top: "+=100px"
            },200);
            
            
            // navbar
            $("#nav-num"+currentPos+" li").delay(300).each(function(index){ // enter new navbar
                $(this).css("left", "-=10px").css("opacity", 0);
                $("#nav-num"+currentPos).css("display","block").css("opacity", 1);
                
                $(this).delay(150 * index).animate({
                    opacity: "1",
                    left: "+=10px"
                }, 300);
            });
            
            
            $("#nav-num"+(currentPos+1)).animate({ // exit old navbar
                opacity: "0" 
            }, 300, function(){$("#nav-num"+(currentPos+1)).css("display","none")});
        }
    });
    
    /* HOVER PREVIEW */
    $(".navbar li").each(function(){
        $(this).mouseenter(function(){
            if ($(this).is("#BLIS")) {
                $("body").css("background","#00A0C1");
                
            } else if ($(this).is("#RHA")) {
                $("body").css("background","#EE274E");
                
            } else if ($(this).is("#hall-council")) {
                $("body").css("background","#004382");
                
            } else if ($(this).is("#VFX")) {
                $("body").css("background","#4c1073");
                
            } else if ($(this).is("#web")) {
                $("body").css("background","#e44d26");
                
            } else if ($(this).is("#roblox")) {
                $("body").css("background","#eb1a24");
            }
        });
        $(this).mouseleave(function(){
            $("body").css("background","black");
        });
    });
});