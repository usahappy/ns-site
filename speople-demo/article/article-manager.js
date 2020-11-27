$(document).ready(function() {
    var elemTopPadding = 20;
    var shareBar = $('.share-bar');
    var sideAd = $('.article-ad');
    
    var recommendationStart = $('.recommendation-container').offset().top - 60;
    
    var shareBarOriginHeight = shareBar.offset().top;
    var adOriginTop = sideAd.offset().top;
    var adHeight = $('img', sideAd).height();
    var adMinTop = recommendationStart - adHeight - 60;
    
    console.log(adMinTop);
    $(document).on('scroll', function() {
        var windowHeight = $(window).height();
        
        var scrollTop = $(window).scrollTop();
        var scrollBottom = scrollTop + windowHeight;
        
        if (shareBarOriginHeight - 60 - elemTopPadding <= scrollTop && $(window).width() > 1120) {
            shareBar.addClass('fixed');
            shareBar.css({top: scrollTop - 60});
        } else {
            shareBar.removeClass('fixed');
            shareBar.css({top: 0});
        }
        
        var adCurrentTop = sideAd.offset().top;
        if (adOriginTop - 60 - elemTopPadding <= scrollTop && scrollTop < adMinTop - 60) {
            sideAd.addClass('fixed');
            sideAd.css({top: scrollTop - 60});
        } else if(adOriginTop - 60 - elemTopPadding <= scrollTop) {
            // do nothing (lock in place)
        } else {
            sideAd.removeClass('fixed');
            sideAd.css({top: 0});
        }
    });
});