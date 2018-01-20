$(document).ready(function () {
    $('.cover__action .btn').on('click', (e) => {
        e.preventDefault();
        const target = e.target.hash;


        $('html, body').animate({
            scrollTop: $(target).offset().top - 50
        }, 500);
    })
});

