(function ($) {
    "use strict";

    // Spinner
    let spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow').css('top', -55);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    });


    // vegetable carousel
    $(".vegetable-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        let $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })

        if (document.querySelector('meta[http-equiv="X-Translated-To"]')) {
            var translatedTo = document.querySelector('meta[http-equiv="X-Translated-To"]').getAttribute('content');
            console.log("Translated to: " + translatedTo);
            document.body.classList.add("translatedTo" + translatedTo);
        }
    });



    // Product Quantity
    $('.quantity button').on('click', function () {
        let button = $(this);
        let oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            let newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                let newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

    $('.add-to-cart').on('click', function (e) {
        e.preventDefault()

        $.ajax({
            type: "POST",
            url: window.url,
            data: {
                'product_id': $(this).data('id'),
                'csrfmiddlewaretoken': window.csrfToken,
            },
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", window.csrfToken);
            },
            success: function (response) {
                console.log(response);
                $('#cart_quantity').text(response.cart_quantity);
            },
        });
    });

    $('.remove-from-cart').on('click', function (e) {
        e.preventDefault()

        console.log("#product-" + $(this).data('id'))

        $.ajax({
            type: "DELETE",
            url: window.url,
            data: {
                'product_id': $(this).data('id'),
                'csrfmiddlewaretoken': window.csrfToken,
            },
            beforeSend: function (xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", window.csrfToken);
            },
            success: function (response) {
                if (response.status === 204) {
                    $(this).closest('tr').addClass('d-none');
                }
            },
        });
    });

    // $('#input-search').on('click', function (e) {
    //     e.preventDefault()

    //     console.log("#product")

    //     $.ajax({
    //         type: "POST",
    //         url: "search/",
    //         data: {
    //             'search': $("#search").val(),
    //             'csrfmiddlewaretoken': window.csrfToken,
    //         },
    //         beforeSend: function (xhr, settings) {
    //             xhr.setRequestHeader("X-CSRFToken", window.csrfToken);
    //         },
    //         success: function (response) {
    //             if (response) {
    //                 console.log(response)
    //             }
    //         },
    //     });
    // });

    // $('.category-link').click(function (e) {
    //     e.preventDefault();
    //     let url = "/"
    //     let categorySlug = $(this).data('category-slug')
    //     url = url + "?category=" + categorySlug
    //     $.ajax({
    //         url: url,
    //         type: "GET",
    //         data: {},
    //         success: function (data) {
    //             $('.product-list').html(data);
    //             console.log(data);
    //         },
    //         error: function (xhr, status, error) {
    //             console.log(error);
    //         }
    //     });
    // });

})(jQuery);

