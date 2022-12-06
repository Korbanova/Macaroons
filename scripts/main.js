"use strict"
window.onload = function () {
    let menu = $('#menu');
    let phoneUser = $('.order-form-tel');

    $('#burger').on('click', () => {
        menu.addClass('open');
    })

    $('#menu *').on('click', () => {
        menu.removeClass('open')
    })

    function checkValidity(obj, hasError) {
        if (!obj.val().trim()) {
            obj.css('border-color', 'red')
            obj.next().show();
            return true;
        }
        return hasError;
    }

    phoneUser.on('keydown', (event) => {
        if (isNaN(parseFloat(event.key)) && event.key.toLowerCase() !== 'backspace') {
            return false;
        }
    })

    $('#order-btn').on('click', () => {
        let product = $('.order-form-select');
        let nameUser = $('.order-form-name');
        let hasError = false;
        $('.error-input').hide();
        $('.order-form input ').css('border-color', ' #821328');

        hasError = checkValidity(product, hasError);
        hasError = checkValidity(nameUser, hasError);
        hasError = checkValidity(phoneUser, hasError);

        if (!hasError) {
            let loader = $('.loader');
            loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {
                    product: product.val(),
                    name: nameUser.val(),
                    phone: phoneUser.val()
                }
            })
            .done(function (msg) {
                loader.hide();
                if (msg.success === 1) {
                    let orderForm = $('.order-form');
                    let heightOrder = orderForm.height();
                    orderForm.hide();
                    $('.order-data').append('<div id="order-success">Спасибо за Ваш заказ. Мы скоро свяжемся с Вами!</div>');
                    $('#order-success').css({
                        height: heightOrder,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '22px',
                        textAlign: 'center'
                    })
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                }
            })
        }
    })
}
