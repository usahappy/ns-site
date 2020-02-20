$(document).ready(function(){
    var navHeight = $(".nav").height();
    var aboutHeight = $("#about").height();
    var headlineHeight = "calc(100vh - " + navHeight + "px - " + aboutHeight + "px)";
    $("#headline").css("height",headlineHeight);
    
    var slackUrl = "https://hooks.slack.com/services/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";
    
    $("#contact #comment-btn").on("click", function() {
        var feedback = $("#contact textarea").val();
        
        $.ajax({
            data: {
                "text":"Hello world!"
            },
            contentType: "application/json",
            type: "POST",
            url: slackUrl,
            error: function(xhr,status,error){
                console.log("error: " + error);
            },
            success: function(data) {
                console.log("result: " + data);
            }
        });
    });

});