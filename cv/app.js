$(document).ready(function(){
    var favicon = $("#favicon");
    
    
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function(){
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            favicon.attr("href", "../images/icons/icon-white.png");
        } else {
            favicon.attr("href", "../images/icons/icon-blue.png");
        }
    });
});