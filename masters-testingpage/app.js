$(document).ready(function(){
    function updateLeaderboard() {
        $.getJSON("https://www.nicholasskelley.com/masters/livescore.json", function(data){
            $(".leaderboard .leaderslot").each(function(){
                $(this).remove();
            });
            
            console.log("updating leaderboard");
             var listing = data.player.sort(function(a,b){ return (parseInt(a.startScore)+parseInt(a.liveScore)) - (parseInt(b.startScore)+parseInt(b.liveScore));});

             var currentPlace = 1;

             // get all of the scores in action
             var currentScores = [];
             $.each(listing, function(key,val){
                 currentScores.push((parseInt(val.liveScore)+parseInt(val.startScore)));
             });

             // create cutoffs for each place
             var placeCutoffs = [];
             while(currentScores.length > 0) {
                 var currentLow = Math.min.apply(Math,currentScores);
                 placeCutoffs.push(currentLow);

                 currentScores = jQuery.grep(currentScores, function(value){
                     return value != currentLow;
                 });
             }

             // find frequency of each score
             var placeFrequencies = [];
             $.each(placeCutoffs, function(val){
                 placeFrequencies.push(0);
             });

             $.each(listing, function(key,val){
                 for (i=0; i < placeFrequencies.length; i++){
                     var curr = parseInt(val.liveScore)+parseInt(val.startScore);
                     if (curr == placeCutoffs[i]) {
                         placeFrequencies[i]++;
                     }
                 }
             });

             $.each(listing, function(key,val){
                 // assign the correct place
                 var curr = parseInt(val.liveScore)+parseInt(val.startScore);
                 var thisPlace = "";
                 for (i=0; i < placeCutoffs.length; i++){
                     if (curr == placeCutoffs[i] && placeFrequencies[i]==1) {
                         var currentSum = 1;
                         for (q=(i-1); q>=0; q--) {
                             currentSum+=placeFrequencies[q];
                        }
                        thisPlace = thisPlace + currentSum;
                     } else if (curr == placeCutoffs[i] && placeFrequencies[i] > 1) {
                         var currentSum = 1;
                         for (q=(i-1); q>=0; q--) {
                             currentSum+=placeFrequencies[q];
                        }
                        thisPlace = "T" + currentSum;
                     }
                 }

                 var toAppend = "<div class='leaderslot'><p id='place'>"+thisPlace+"</p><p id='name'>"+val.name+"</p><p id='golfer'>"+val.golfer+"</p><p id='liveScore'>"+(parseInt(val.startScore)+parseInt(val.liveScore))+"</p><p id='todayScore'>"+val.liveScore+"</p></div>";
                 $(".leaderboard").append(toAppend);
             });
        });
    }
    updateLeaderboard();
    //reload every minute
    //setInterval(function(){window.location.href=window.location.href;},10000);
});