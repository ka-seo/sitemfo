$(document).ready(function(){
    setTimeout(function () {
        parallaxScroll();
        $('.parallax-blog').fadeIn();
    }, 300);

    $(window).bind('scroll',function(e){
        parallaxScroll();
    });

    function parallaxScroll(){
        let scrolled = $(window).scrollTop();
        $('.parallax-blog .parallax__item-1').css('top', ( 0 - ( scrolled * 1.25 ) ) + 'px' );
        $('.parallax-blog .parallax__item-2').css('top', ( 50 - ( scrolled * 1.15 ) ) + 'px' );
        $('.parallax-blog .parallax__item-3').css('top', ( 190 - ( scrolled * 1.3 ) ) + 'px' );
        $('.parallax-blog .parallax__item-3-a').css('top', ( 230 - ( scrolled * 1.25 ) ) + 'px' );
        $('.parallax-blog .parallax__item-4').css('top', ( -380 - ( scrolled * 1.02 ) ) + 'px' );
    }
});

if (window.devicePixelRatio > 1) {
    $('body').addClass('display-hd');
}
if (window.devicePixelRatio >= 2) {
    $('body').addClass('display-retina');
}
