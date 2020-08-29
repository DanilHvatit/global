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
        centerMode: true,


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



    // элемент


    // вызов функции swipe с предварительными настройками
    swipe($('.main'), { maxTime: 1000, minTime: 100, maxDist: 150, minDist: 0 });

    // обработка свайпов
    $('.main').on("swipe", function () {
        console.log(123);
    });





    // !======================================================================================================
    function swipe(el, settings) {

        // настройки по умолчанию
        var settings = Object.assign({}, {
            minDist: 0,
            maxDist: 5,
            maxTime: 700,
            minTime: 50
        }, settings);

        // коррекция времени при ошибочных значениях
        if (settings.maxTime < settings.minTime) settings.maxTime = settings.minTime + 500;
        if (settings.maxTime < 100 || settings.minTime < 50) {
            settings.maxTime = 700;
            settings.minTime = 50;
        }

        var el = $('.main'),       // отслеживаемый элемент
            dir,                  // направление свайпа (horizontal, vertical)
            swipeType,            // тип свайпа (up, down, left, right)
            dist,                 // дистанция, пройденная указателем
            isMouse = false,      // поддержка мыши (не используется для тач-событий)
            isMouseDown = false,  // указание на активное нажатие мыши (не используется для тач-событий)
            startX = 0,           // начало координат по оси X (pageX)
            distX = 0,            // дистанция, пройденная указателем по оси X
            startY = 0,           // начало координат по оси Y (pageY)
            distY = 0,            // дистанция, пройденная указателем по оси Y
            startTime = 0,        // время начала касания
            support = {           // поддерживаемые браузером типы событий
                pointer: !!("PointerEvent" in window || ("msPointerEnabled" in window.navigator)),
                touch: !!(typeof window.orientation !== "undefined" || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "ontouchstart" in window || navigator.msMaxTouchPoints || "maxTouchPoints" in window.navigator > 1 || "msMaxTouchPoints" in window.navigator > 1)
            };

        /**
        //  * Опредление доступных в браузере событий: pointer, touch и mouse.
        //  * @returns {Object} - возвращает объект с доступными событиями.
        //  */
        var getSupportedEvents = function () {
            switch (true) {
                case support.touch:
                    events = {
                        type: "touch",
                        start: "touchstart",
                        move: "touchmove",
                        end: "touchend",
                        cancel: "touchcancel"
                    };
                    break;
                default:
                    events = {
                        type: "mouse",
                        start: "mousedown",
                        move: "mousemove",
                        end: "mouseup",
                        leave: "mouseleave"
                    };
                    break;
            }
            return events;
        };


        // /**
        //  * Объединение событий mouse/pointer и touch.
        //  * @param e {Event} - принимает в качестве аргумента событие.
        //  * @returns {TouchList|Event} - возвращает либо TouchList, либо оставляет событие без изменения.
        //  */
        var eventsUnify = function (e) {
            return e.changedTouches ? e.changedTouches[0] : e;
        };


        //* Обрабочик начала касания указателем.
        //* @param e {Event} - получает событие.

        var checkStart = function (e) {
            var event = eventsUnify(e);
            if (support.touch && typeof e.touches !== "undefined" && e.touches.length !== 1) return; // игнорирование касания несколькими пальцами
            dir = "none";
            swipeType = "none";
            dist = 0;
            startX = event.pageX;
            startY = event.pageY;
            startTime = new Date().getTime();
            if (isMouse) isMouseDown = true; // поддержка мыши
            e.preventDefault();
        };


        // * Обработчик движения указателя.
        //  * @param e {Event} - получает событие.

        var checkMove = function (e) {
            // if (isMouse && !isMouseDown) return; // выход из функции, если мышь перестала быть активна во время движения
            var event = eventsUnify(e);
            distX = event.pageX - startX;
            distY = event.pageY - startY;
            dir = (distY < 0) ? "up" : "down";
            swipeType = dir;
            e.preventDefault();
        };


        // * Обработчик окончания касания указателем.
        //  @param e {Event} - получает событие.

        var checkEnd = function (e) {
            //  if (isMouse && !isMouseDown) { // выход из функции и сброс проверки нажатия мыши
            //      mouseDown = false;
            //      return;
            //  }
            var endTime = new Date().getTime();
            var time = endTime - startTime;
            // проверка времени жеста
            if (Math.abs(distY) >= settings.minDist && Math.abs(distX) <= settings.maxDist) {
                swipeType = dir; // опредление типа свайпа как "top" или "down"
                console.log(swipeType);
                //  console.log(distY);

            } else if (Math.abs(distX) >= settings.minDist && Math.abs(distY) <= settings.maxDist) {
                swipeType = dir; // опредление типа свайпа как "left" или "right"
                console.log(swipeType);
            }
            distX = Math.abs(distX);//) опредление пройденной указателем дистанции
            distY = Math.abs(distY);
            console.log(distX + "x");
            console.log(distY + "y");
            // генерация кастомного события swipe
            console.log(swipeType);
            //  if (swipeType !== "none" && dist >= settings.minDist) {
            //      var swipeEvent = new CustomEvent("swipe", {
            //          bubbles: true,
            //          cancelable: true,
            //          detail: {
            //              full: e, // полное событие Event
            //              dir: swipeType, // направление свайпа
            //              dist: dist, // дистанция свайпа
            //              time: time // время, потраченное на свайп
            //          }

            //      });

            //     //  el.dispatchEvent(swipeEvent);
            //      console.log(111111);
            

            //  }
            e.preventDefault();
        }

        // добавление поддерживаемых событий
        var events = getSupportedEvents();

        //! =========================================================
        
        var go = function () {
            if (distY < 0) {
                var name = $('section.is-active');
                var out = 'is-active animated fadeOutUp slow fadeIn slower';
                if (!$(name).hasClass('hire')) {
                    $('section.is-active').addClass('animated fadeOutUp slow');
                }
                setTimeout(function () {
                    if (!$(name).hasClass('hire')) {
                        $(name).removeClass(out);
                    };
                }, 500);
                if (!$(name).hasClass('hire')) {
                    name.next().addClass('is-active animated fadeIn slower');
                };
                if ($(name).hasClass('contact') || $(name).hasClass('hire')) {
                    $('.menu__btn').addClass('animated fadeOutUp slow');
                    setTimeout(function () {
                        $('.menu__btn').removeClass(out);
                    }, 500);
                } else {
                    $('.menu__btn').addClass('is-active animated fadeIn slower');
                }


                var nav = $('li.nav-active');

                setTimeout(function () {
                    if (!$(name).hasClass('hire')) {
                        $(nav).removeClass('nav-active');
                    }
                }, 40);

                if (!$(name).hasClass('hire')) {
                    $('li.nav-active').next().addClass('nav-active');
                }
            } else {
                var name = $('section.is-active');
                if (!$(name).hasClass('home')) {
                    $('section.is-active').addClass('animated fadeOutUp slow');
                }

                setTimeout(function () {
                    if (!$(name).hasClass('home')) {
                        $(name).removeClass('is-active animated fadeOutUp slow fadeIn slower')
                    };
                }, 500);

                if (!$(name).hasClass('home')) {
                    $('section.is-active').prev().addClass('is-active animated fadeIn slower');
                };

                if ($(name).hasClass('works') || $(name).hasClass('home')) {
                    $('.menu__btn').addClass('animated fadeOutUp slow');
                    setTimeout(function () {
                        $('.menu__btn').removeClass('is-active animated fadeIn slower fadeOutUp slow');
                    }, 500);
                } else {
                    $('.menu__btn').addClass('is-active animated fadeIn slower');
                }

                var nav = $('li.nav-active');

                setTimeout(function () {
                    if (!$(name).hasClass('home')) {
                        $(nav).removeClass('nav-active');
                    }
                }, 30);

                if (!$(name).hasClass('home')) {
                    $('li.nav-active').prev().addClass('nav-active');
                }
            }

        }




        //! =========================================================
        // проверка наличия мыши
        // if ((support.pointer && !support.touch) || events.type === "mouse") isMouse = true;

        console.log(events.start);
        console.log(events.move);
        console.log(events.end);
        console.log(swipeType);

        // добавление обработчиков на элемент
        el.on(events.end, go);
        el.on(events.start, checkStart);
        el.on(events.move, checkMove);
        el.on(events.end, checkEnd);

    };

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
        $('.outside__nav li').removeClass('nav-active');
        $('.left-nav li').removeClass('nav-active');
        $('.left-nav a[href=\\' + $(this).attr('href') + ']').parent().addClass('nav-active');
        $(this).parent().addClass('nav-active');
        $(now).addClass('is-active animated fadeIn slower');
        $('body').removeClass('lock');

    });


    $('.left-nav a').on('click', function () {
        let now = $(this).attr('href').replace(/^#/, '.');
        $('section.is-active').removeClass('is-active animated fadeOutUp slow fadeIn slower');
        $('.left-nav li').removeClass('nav-active');
        $('.outside__nav li').removeClass('nav-active');
        $('.outside__nav a[href=\\' + $(this).attr('href') + ']').parent().addClass('nav-active');
        $(this).parent().addClass('nav-active');
        $(now).addClass('is-active animated fadeIn slower');
    });



    $('.menu__btn').on('click', function () {
        $('section.is-active').addClass('animated fadeOutUp slow');
        setTimeout(function () {
            $('section.is-active').removeClass('is-active animated fadeOutUp slow fadeIn slower');
            $('.hire').addClass('is-active animated fadeIn slower');
        }

            , 500);
    });




    // $('body').on('mousewheel DOMMouseScroll', function (e) {
    //     $('body').trigger(scroll(e));
    // });



    $('body').on('mousewheel DOMMouseScroll', function scroll(x) {
        if (typeof x.originalEvent.wheelDelta == 'number') {
            if (x.currentTarget.className === 'lock') {
            }
            else if (x.originalEvent.wheelDelta < 0) {
                var name = $('section.is-active');
                var out = 'is-active animated fadeOutUp slow fadeIn slower';
                if (!$(name).hasClass('hire')) {
                    $('section.is-active').addClass('animated fadeOutUp slow');
                }
                setTimeout(function () {
                    if (!$(name).hasClass('hire')) {
                        $(name).removeClass(out);
                    };
                }, 500);
                if (!$(name).hasClass('hire')) {
                    name.next().addClass('is-active animated fadeIn slower');
                };
                if ($(name).hasClass('contact') || $(name).hasClass('hire')) {
                    $('.menu__btn').addClass('animated fadeOutUp slow');
                    setTimeout(function () {
                        $('.menu__btn').removeClass(out);
                    }, 500);
                } else {
                    $('.menu__btn').addClass('is-active animated fadeIn slower');
                }


                var nav = $('li.nav-active');

                setTimeout(function () {
                    if (!$(name).hasClass('hire')) {
                        $(nav).removeClass('nav-active');
                    }
                }, 40);

                if (!$(name).hasClass('hire')) {
                    $('li.nav-active').next().addClass('nav-active');
                }


            } else if (x.originalEvent.wheelDelta > 0) {
                var name = $('section.is-active');
                if (!$(name).hasClass('home')) {
                    $('section.is-active').addClass('animated fadeOutUp slow');
                }

                setTimeout(function () {
                    if (!$(name).hasClass('home')) {
                        $(name).removeClass('is-active animated fadeOutUp slow fadeIn slower')
                    };
                }, 500);

                if (!$(name).hasClass('home')) {
                    $('section.is-active').prev().addClass('is-active animated fadeIn slower');
                };

                if ($(name).hasClass('works') || $(name).hasClass('home')) {
                    $('.menu__btn').addClass('animated fadeOutUp slow');
                    setTimeout(function () {
                        $('.menu__btn').removeClass('is-active animated fadeIn slower fadeOutUp slow');
                    }, 500);
                } else {
                    $('.menu__btn').addClass('is-active animated fadeIn slower');
                }

                var nav = $('li.nav-active');

                setTimeout(function () {
                    if (!$(name).hasClass('home')) {
                        $(nav).removeClass('nav-active');
                    }
                }, 30);

                if (!$(name).hasClass('home')) {
                    $('li.nav-active').prev().addClass('nav-active');
                }

            }
        }


    })
});



