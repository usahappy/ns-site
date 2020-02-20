$(document).ready(function(){
    // Your web app's Firebase configuration
    var firebaseConfig = {
    apiKey: "AIzaSyAXSKcHDShpO12DGwFI9TOdK_T320NoaSY",
    authDomain: "rha-site.firebaseapp.com",
    databaseURL: "https://rha-site.firebaseio.com",
    projectId: "rha-site",
    storageBucket: "rha-site.appspot.com",
    messagingSenderId: "680785206398",
    appId: "1:680785206398:web:3e6d27e31837d2432fcc2f",
    measurementId: "G-XNTQB72031"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    var database = firebase.firestore();
    // End of Firebase setup
    
    
    // setting headline height
    var navHeight = $(".nav").height();
    var aboutHeight = $("#about").height();
    var headlineHeight = "calc(100vh - " + navHeight + "px - " + aboutHeight + "px)";
    $("#headline").css("height",headlineHeight);
    
    database.collection("halls").doc("dooleys-bowl").get({source:"server"}).then(function(doc) {
        console.log(doc.data());

        var points = doc.data().alabama;
    });
    
    
    $("#contact #comment-btn").on("click", function() {
        var feedback = $("#contact textarea").val();
        
        var url = database.collection("webhooks").doc("slack").get({source:"server"}).then(function(doc) {
            var slackUrl = doc.data().url;
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
        })
    });

});