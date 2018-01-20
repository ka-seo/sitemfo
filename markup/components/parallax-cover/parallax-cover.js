$(document).ready(function(){
    setTimeout(function () {
        parallaxScroll();
        $('.parallax-cover').fadeIn();
    }, 300);

    $(window).bind('scroll',function(e){
        parallaxScroll();
    });

    function parallaxScroll(){
        let scrolled = $(window).scrollTop();
        $('.parallax-cover .parallax__item-1').css('top', ( 0 - ( scrolled * 1.25 ) ) + 'px' );
        $('.parallax-cover .parallax__item-2').css('top', ( 170 - ( scrolled * 1.15 ) ) + 'px' );
        $('.parallax-cover .parallax__item-3').css('top', ( 0 - ( scrolled * 1.15 ) ) + 'px' );
        $('.parallax-cover .parallax__item-3-a').css('top', ( 200 - ( scrolled * 1.15 ) ) + 'px' );
        $('.parallax-cover .parallax__item-4').css('top', ( 65 - ( scrolled * 1.02 ) ) + 'px' );
    }
});
