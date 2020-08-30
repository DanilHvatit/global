$(function () {

    $('.home__slider__for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        swipe: false,
        focusOnSelect: true,

        asNavFor: '.home__slider__nav',


        responsive: [
            {
                breakpoint: 600,
                settings: {
                    swipe: true,
                }
            },
        ]
    });
    $('.home__slider__nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        swipe: false,
        asNavFor: '.home__slider__for',
        focusOnSelect: true,



    });

    $('.works__slider').slick({
        nextArrow: '<button type="button" class="slick-btn slick-next"><span class="icon-arrow-right"></span></button>',
        prevArrow: '<button type="button" class="slick-btn slick-prev"><span class="icon-arrow-left"></span></button>',
        slidesToShow: 1,
        centerPadding: '280px',
        centerMode: true,
        speed: 1000,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    arrows: false,
                }
            },

            {
                breakpoint: 840,
                settings: {
                    centerMode: true,
                    slidesToShow: 1,
                    centerPadding: '40px',
                    arrows: true,
                }
            },
            {
                breakpoint: 540,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '35%',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 440,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40%',
                    slidesToShow: 1
                }
            }
        ]


    });




    // !===============================================================================
    $('.menu__nav').on('click', function () {
        $('.outside__nav').addClass('is-active animated rotateInDownRight');
        $('.main').addClass('transform');
        $('.wrapper').css({
            display: 'block'
        });
        $('body').addClass('lock');
    });
    $('.wrapper').on('click', function () {
        $('.main').removeClass('transform');
        $('.outside__nav').removeClass('is-active animated rotateInDownRight');
        $('.wrapper').css({
            display: 'none'
        });
        $('body').removeClass('lock');


    });
    $('.outside__nav a').on('click', function () {
        $('.main').removeClass('transform');
        $('.outside__nav').removeClass('is-active animated rotateInDownRight');
        $('.wrapper').css({
            display: 'none'
        });
        let now = $(this).attr('href').replace(/^#/, '.');
        $('section.is-active').removeClass('is-active animated fadeOutUp slow fadeIn slower');
        $('.outside__nav li').removeClass('active');
        $('.left-nav li').removeClass('active');
        $('.left-nav a[href=\\' + $(this).attr('href') + ']').parent().addClass('active');
        $(this).parent().addClass('active');
        $(now).addClass('is-active animated fadeIn slower');
        $('body').removeClass('lock');
        if (now != '.hire') {
            $('.menu__btn').addClass('is-active');
        } else {
            $('.menu__btn').removeClass('is-active');
        }
        return false;
    });
    $('.left-nav a').on('click', function () {
        let now = $(this).attr('href').replace(/^#/, '.');
        $('section.is-active').removeClass('is-active animated fadeOutUp slow fadeIn slower');
        $('.left-nav li').removeClass('active');
        $('.outside__nav li').removeClass('active');
        $('.outside__nav a[href=\\' + $(this).attr('href') + ']').parent().addClass('active');
        $(this).parent().addClass('active');
        $(now).addClass('is-active animated fadeIn slower');
        if (now != '.hire') {
            $('.menu__btn').addClass('is-active');
        } else {
            $('.menu__btn').removeClass('is-active');
        }
        return false;
    });
    $('.menu__btn').on('click', function () {
        $('section.is-active').addClass('animated fadeOutUp slow');
        setTimeout(function () {
            $('section.is-active').removeClass('is-active animated fadeOutUp slow fadeIn slower');
            $('.hire').addClass('is-active animated fadeIn slower');
        }, 500);
        $('.left-nav li').removeClass('active');
        $('.outside__nav li').removeClass('active');
        $('.left-nav a[href=\\' + '#hire' + ']').parent().addClass('active');
        $('.outside__nav a[href=\\' + '#hire' + ']').parent().addClass('active');
        $('.menu__btn').removeClass('is-active');
        return false;
    }); 
    
    $('.main').on('mousewheel DOMMouseScroll', function scroll(x) {
        if (typeof x.originalEvent.wheelDelta == 'number') {
            
             
            if (x.currentTarget.className === 'lock') {
            }
            else if (x.originalEvent.wheelDelta < 0) {
                scrollUp();
            } else if (x.originalEvent.wheelDelta > 0) {
                scrollDown();
                

            }
        }


    })
});


var scrollUp = function () {
    var section = $('section.is-active');
    var eq = section.index(('section')) + 1;
    var transitionEndEventName = "webkitTransitionEnd";
    var done = false;
    var out = 'is-active animated fadeOutUp slow fadeIn slower';
    var transitionEnded = function () {
        done = true;
        section.removeClass(out);
        section[0].removeEventListener(transitionEndEventName,
            transitionEnded, false);
    };
    if (section.hasClass('is-active')) {
        if (!section.hasClass('hire')) {
            section.addClass('animated fadeOutUp slow');
            section[0].addEventListener(transitionEndEventName,
                transitionEnded, false);
            setTimeout(function () {
                if (!done) {
                    transitionEnded();
                }
            }, 510);
            setTimeout(function () {
                $(section).next().addClass('is-active animated fadeIn slower');
            }, 400);
            $('.left-nav').find('.nav').removeClass('active').eq(eq).addClass('active');
            $('.outside__nav').find('.nav').removeClass('active').eq(eq).addClass('active');
            $('.menu__btn').addClass('is-active');
            if (section.next().hasClass('hire')) {
                $('.menu__btn').removeClass('is-active');
            } 
        } 
    }
};

var scrollDown = function () {
    var section = $('section.is-active');
    var eq = section.index(('section')) + 1;
    var transitionEndEventName = "webkitTransitionEnd";
    var done = false;
    var out = 'is-active animated fadeOutUp slow fadeIn slower';
    var transitionEnded = function () {
        done = true;
        section.removeClass(out);
        section[0].removeEventListener(transitionEndEventName,
            transitionEnded, false);
    };
    if (section.hasClass('is-active')) {
        eq = eq - 1;
        if (eq >= 1) {
            section.addClass('animated fadeOutUp slow');
            section[0].addEventListener(transitionEndEventName,
                transitionEnded, false);
            setTimeout(function () {
                if (!done) {
                    transitionEnded();
                }
            }, 510);
            setTimeout(function () {
                $(section).prev().addClass('is-active animated fadeIn slower');
            }, 400);
            $('.left-nav').find('.nav').removeClass('active').eq(eq - 1).addClass('active');
            $('.outside__nav').find('.nav').removeClass('active').eq(eq - 1).addClass('active');
        }
        if (!section.prev().hasClass('home')) {
            $('.menu__btn').addClass('is-active');
        } else {
            $('.menu__btn').removeClass('is-active');
        }
    }
}