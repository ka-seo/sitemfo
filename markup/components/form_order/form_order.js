// Checking the rate
$(document).ready(function() {
    $('.rate-item .btn').on('click', function(e) {
       e.preventDefault();
      var name = e.target.hash.slice(1);

        // $('#form-order select[name="rate"] option[value="' + id + '"]').prop('selected', true);

       $('select[name="rate"] option').each(function() {
           $(this).attr('selected', false);

           $('select[name="rate"]').val(name).trigger('change');

          if (name == $(this).attr('value')) {
              $(this).attr('selected', true);
          }

       });

       $('html, body').animate({
           scrollTop: $('#form-order').offset().top
       }, 500);

       $('input[name="username"]').focus()

    });


    function formatDate(date, numberOfDaysToAdd) {
        const monthNames = [ "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря" ];

        let someDate = date;
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

        const dd = someDate.getDate();
        const mm = someDate.getMonth() + 1;
        const year = someDate.getFullYear();

        return 'до ' + dd + ' '+ monthNames[mm-1]; //+ ' '+ year;
    }
    $('#get-date').text(formatDate(new Date(), 6));



    /********************************
     * INPUT MASK
     *********************************/
    $("input[name='phone']").inputmask(
        "+7 (999) 999-99-99",
        {
            clearIncomplete: true,
            showMaskOnHover: false,
            "onincomplete": function () {
                $(this).removeClass('valid').addClass('error');
            }
        });


    $.extend( $.validator.messages, {
        required: "Необходимо заполнить.",
        number: "Пожалуйста, введите число.",
        digits: "Пожалуйста, вводите только цифры."
    } );


    /********************************
     * ADD NEW METHODS
     *********************************/
    $.validator.addMethod("russian", function(value, element) {
        return this.optional(element) || /^[а-яА-ЯёЁ ]+$/.test(value);
    }, "Введите имя по-русски.");

    $.validator.addMethod("phoneField", function(value, element) {
        return this.optional(element) || /^[0-9-+() ]+$/.test(value);
    }, "Укажите корректный номер.");

    $.validator.addMethod("FirstLetterUp", function(value, element) {
        return this.optional(element) || /^[А-ЯЁ ]+$/.test(value[0]);
    }, "Первая буква должна быть заглавной");


    /********************************
     * VALIDATION FORM ORDER
     *********************************/
    $('#form-order').validate({
        rules:{
            username: {
                required: true,
                russian: true
            },
            phone: {
                required: true,
                phoneField: true
            },
            email: {
                required: true,
                email: true
            },
            rate: {
                required: true
            }
        },
        errorElement: 'span',
        submitHandler: function(form, e) {
            e.preventDefault();

            var sent = $(form).find('.sent'),
                defaulting = $(form).find('.default'),
                loading = $(form).find('.loading'),
                error = $(form).find('.error-send'),
                pathObj = {
                "sent": {
                    "strokepath": [{
                        "path": "M26.395 14.319A13.025 13.025 0 0 1 4.928 23.37 13.023 13.023 0 0 1 13.398.454a12.98 12.98 0 0 1 5.009.998m-11.024 9.02l6.01 7.012 11.345-11.8",
                        "duration": 1000
                    }],
                    "dimensions": {
                        "width": 30,
                        "height": 30
                    }
                }
            };

            // на экран сообщение с данными, присланными сервером.
            $.ajax({
                type: "POST",
                url: 'send.php',
                data: $(form).serializeArray(),
                beforeSend: function() {
                    console.log('try sending...');

                    $(form).find(':input').prop('readonly', true);
                    $(form).find(':button').prop('disabled', true);
                    $(form).find('select').prop('disabled', true);

                    defaulting.hide();
                    loading.show();
                },
                success: function( response ) {
                    console.info('sent');
                    loading.hide();

                    if (response == 'success') {

                        defaulting.hide();
                        sent.fadeIn();

                        $('#sent').lazylinepainter({
                            "svgData": pathObj,
                            "strokeWidth": 2,
                            "strokeColor": "#fff"
                        }).lazylinepainter('paint');

                        setTimeout(function () {
                            sent.hide();
                            defaulting.fadeIn();
                            $(form).find(':input').prop('readonly', false);
                            $(form).find(':button').prop('disabled', false);
                            $(form).find('select').prop('disabled', false);
                            $(form)[0].reset();
                        }, 2000);
                    }

                    if (response == 'error') {
                        defaulting.show();
                        alert('К сожалению, по какой-то причине ваше письмо не отправлено. Пожалуйста, повторите попытку.')
                    }
                },
                error: function(response){
                    console.error('Error sending form order.');
                    console.log(response);
                    loading.hide();
                    error.fadeIn();

                    setTimeout(function () {
                        error.hide();
                        defaulting.fadeIn();
                        $(form).find(':input').prop('readonly', false);
                        $(form).find(':button').prop('disabled', false);
                        $(form).find('select').prop('disabled', false);
                        $(form)[0].reset();
                    }, 4000);
                }
            });

        }
    });

});





function floatBtnDefault(btn, idStart, offsetStart, idEnd, offsetEnd) {
    var windowPos = $(window).scrollTop();

    if (windowPos >= ($(idStart).offset().top - offsetStart) && windowPos <= ($(idEnd).offset().top + offsetEnd)) {
        $(btn).show();
        console.log('START SHOW:', $(idStart).offset().top + ' - ' + offsetStart + ' = ', $(idStart).offset().top - offsetStart);
    } else {
        $(btn).hide();
        console.log('START END:', $(idEnd).offset().top + ' - ' + offsetEnd + ' = ', $(idEnd).offset().top + offsetEnd);
    }
}

$(window).bind('load resize orientationchange scroll', function() {
    var ww = window.innerWidth;

    if(ww > 1200) {
        floatBtnDefault('.floating-button', '#feature', 501, '#rates-container', -50);
    }
    else if(ww > 768 && ww < 992) {
        floatBtnDefault('.floating-button', '#feature', 501, '#rates-container', -50);
    }
    else if(ww < 768) {
        floatBtnDefault('.floating-button', '#feature', 502, '#rates-container', 402);
    }
    else {
        floatBtnDefault('.floating-button', '#feature', 153, '#rates-container', 250);
    }

});

$('.popup-modal').on('click', function (e) {
    e.preventDefault();
});
