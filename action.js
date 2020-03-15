function playVideo(videoObj) {
    videoObj.css("display","block");
    videoObj[0].play();

    videoObj.stop().hide(0).fadeIn(500);

    var videoDuration = videoObj[0].duration;
    var fadeDelay = (videoDuration * 1000) - 500

    setTimeout(function(){
        videoObj.stop().fadeOut(500, function() {
            videoObj[0].pause();
            videoObj[0].currentTime = 0;
        });
    }, fadeDelay);
}

function setBackupText(title) {
    $(".backup-header").text(title);
    $(".backup-header").delay(150).stop().fadeIn(500);
}

$(document).ready(function(){
    $(".backup-header").fadeOut(0);
    
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
    $(".navbar li a").each(function(){
        $(this).mouseenter(function(){
            $("#num"+currentPos+" h1").stop().fadeOut(200);
            if ($(this).parent().is("#BLIS")) {
                $(".overlay-color").css("background","#00A0C1ff");
                
            } else if ($(this).parent().is("#RHA")) {
                $(".overlay-color").css("background","#EE274Eff");
                
            } else if ($(this).parent().is("#hall-council")) {
                $(".overlay-color").css("background","#004382ff");
                
                $(".backup-header").text("HALL COUNCIL");
                $(".backup-header").delay(150).stop().fadeIn(500);
                
            } else if ($(this).parent().is("#VFX")) {
                $(".overlay-color").css("background","#460770ff");
            
            } else if ($(this).parent().is("#misc")) {
                $(".overlay-color").css("background","#4913cdff");
                
                $(".backup-header").text("MICELLANEOUS");
                $(".backup-header").delay(150).stop().fadeIn(500);
                
            } else if ($(this).parent().is("#web")) {
                $(".overlay-color").css("background","#e44d26ff");
                
                $(".backup-header").text("WEB DEVELOPMENT");
                $(".backup-header").delay(150).stop().fadeIn(500);
                
            } else if ($(this).parent().is("#roblox")) {
                $(".overlay-color").css("background","#eb1a24d9");
                
                $(".backup-header").text("ROBLOX");
                $(".backup-header").delay(500).stop().fadeIn(500);
                
                playVideo($(this).parent().find("video"));
            }
        });
        $(this).on("mouseleave", function(){
            $(".overlay-color").css("background","#000000ff");
            $("#num"+currentPos+" h1").delay(200).stop().fadeIn(500);
            $(".backup-header").stop().fadeOut(200);
            
            var videoToStop = $(this).parent().find("video");
            videoToStop.stop().fadeOut(500, function() {
                videoToStop[0].pause();
                videoToStop[0].currentTime = 0;
            });
        });
    });
    
    // favicon
    if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
        var newIcon = '<link rel="icon" href="https://www.nicholasskelley.com/images/icon-white.png">';
        $("head").append(newIcon);
    }
    window.matchMedia("(prefers-color-scheme:dark)").addListener(function(e) {
       console.log(e.matches);
        if (e.matches) {
            var newIcon = '<link rel="icon" href="https://www.nicholasskelley.com/images/icon-white.png">';
            $("head").append(newIcon);
        } else if (! e.matches) {
            var newIcon = '<link rel="icon" href="https://www.nicholasskelley.com/images/icon-black.png">';
            $("head").append(newIcon);
        }
    });
});