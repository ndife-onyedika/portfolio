particlesJS.load('particles-js', './assets/vendor/json/particlesjs-config.json', function () {
    console.log('callback - particles.js config loaded');
});
$(document).ready(function () {
    $('figure').each(function () {
        $(this).attr({
            'class': 'lightboxed',
            'rel': 'group1',
            'data-link': $(this).children().attr('src')
        })
    })
    $('#scroll_up').addClass('animated fadeOutRight')
})

$('.nav_checkbox').on('change', function () {
    if ($(this).is(":checked")) {
        $('.nav').addClass("nav_checked")
    } else {
        $('.nav').removeClass("nav_checked")
    }
})

$(document).on(
    {
        mouseenter: function () {
            let self = $(this);

            $(`[data-scroll="${self.attr('data-scroll')}"]`).each(function () {
                $(this).addClass('nav_item_hover')
            })
        },
        mouseleave: function () {
            let self = $(this);

            $(`[data-scroll="${self.attr('data-scroll')}"]`).each(function () {
                $(this).removeClass('nav_item_hover')
            })
        }
    }, '.nav_item>a'
)



$('.slide').each(function () {
    let self = $(this);
    self.waypoint(function (direction) {
        if (direction == "down") {
            $(document).find('.nav_item>a').each(function () {
                if (self.attr('id') == $(this).attr('data-scroll')) {
                    $(`[data-scroll="${self.attr('id')}"]`).each(function () {
                        $(this).addClass('nav_item_hover')
                    });
                } else {
                    $(`.nav_item>a:not([data-scroll="${self.attr('id')}"])`).each(function () {
                        $(this).removeClass('nav_item_hover')
                    });
                }
            })

        } else {
            $(document).find('.nav_item>a').each(function () {
                if (self.attr('id') == $(this).attr('data-scroll')) {
                    $(`[data-scroll="${self.attr('id')}"]`).each(function () {
                        $(this).addClass('nav_item_hover')
                    });
                } else {
                    $(`.nav_item>a:not([data-scroll="${self.attr('id')}"])`).each(function () {
                        $(this).removeClass('nav_item_hover')
                    });
                }
            })
        }
    }, {
        offset: '10px;'
    })
})

$('main').waypoint(function (direction) {
    if (direction == "down") {
        $('#scroll_up').removeClass('fadeOutRight')
        $('#scroll_up').addClass('fadeInRight')
    } else {
        $('#scroll_up').removeClass('fadeInRight')
        $('#scroll_up').addClass('fadeOutRight')
    }
}, {
    offset: '10px;'
});

// SMOOTH SCROLLTOP BUTTON
$(document).on('click', '.js-scroll_up', function () {
    scroll({
        top: $('html,body').offset().top,
        behavior: "smooth"
    });
});

$(".slide-main-btn-down").on('click', function () {
    $(this).parent().next().slideDown(0);
    scroll({
        top: $(this).parent().next().find("#slide_main-details").offset().top,
        behavior: "smooth"
    });
});
$(".slide-main-btn-up").on('click', function () {
    $(this).parent().parent().slideUp(1000);
    scroll({
        top: $(this).parent().parent().parent().offset().top,
        behavior: "smooth"
    });
});

(function () {
    var ChaHeader = function (element) {
        this.element = element;
        this.sections = document.getElementsByClassName('js-section-nav');
        this.nav = this.element.getElementsByClassName('js-nav')[0];
        initChaHeader(this);
    };

    function initChaHeader(element) {
        // set initial status
        for (var j = 0; j < element.sections.length; j++) {
            initSection(element, j);
        }

        // make sure header element is visible when in focus
        element.nav.addEventListener('focusin', function (event) {
            checkHeaderVisible(element);
        });
    };

    function initSection(element, index) {
        // clone header element inside each section
        var cloneItem = (index == 0) ? element.element : element.element.cloneNode(true);
        Util.removeClass(cloneItem, 'js-nav-clip');
        var customClasses = element.sections[index].getAttribute('data-theme');
        // hide clones to SR
        cloneItem.setAttribute('aria-hidden', 'true');
        if (customClasses) Util.addClass(cloneItem.getElementsByClassName('js-nav')[0], customClasses);
        // keyborad users - make sure cloned items are not tabbable
        if (index != 0) {
            // reset tab index
            resetTabIndex(cloneItem);
            element.sections[index].insertBefore(cloneItem, element.sections[index].firstChild);
        }
    }

    function resetTabIndex(clone) {
        var focusable = clone.querySelectorAll('[href], button, input');
        for (var i = 0; i < focusable.length; i++) {
            focusable[i].setAttribute('tabindex', '-1');
        }
    };

    function checkHeaderVisible(element) {
        if (window.scrollY > element.sections[0].offsetHeight - element.nav.offsetHeight) window.scrollTo(0, 0);
    };

    // init the ChaHeader Object
    var chaHeader = document.getElementsByClassName('js-nav-clip');
    if (chaHeader.length > 0) {
        for (var i = 0; i < chaHeader.length; i++) {
            new ChaHeader(chaHeader[i]);
        }
    }
}());


(function () {
    var ChaScroll = function (element) {
        this.element = element;
        this.sections = document.getElementsByClassName('js-section-scroll');
        this.nav = this.element.getElementsByClassName('js-scroll_up')[0];
        initChaScroll(this);
    };

    function initChaScroll(element) {
        // set initial status
        for (var j = 0; j < element.sections.length; j++) {
            initSection(element, j);
        }

        // make sure scroll element is visible when in focus
        element.nav.addEventListener('focusin', function (event) {
            checkScrollVisible(element);
        });
    };

    function initSection(element, index) {
        // clone scroll element inside each section
        var cloneItem = (index == 0) ? element.element : element.element.cloneNode(true);
        Util.removeClass(cloneItem, 'js-scroll_up-clip');
        var customClasses = element.sections[index].getAttribute('data-theme');
        // hide clones to SR
        cloneItem.setAttribute('aria-hidden', 'true');
        if (customClasses) Util.addClass(cloneItem.getElementsByClassName('js-scroll_up')[0], customClasses);
        // keyborad users - make sure cloned items are not tabbable
        if (index != 0) {
            // reset tab index
            resetTabIndex(cloneItem);
            element.sections[index].insertBefore(cloneItem, element.sections[index].firstChild);
        }
    }

    function resetTabIndex(clone) {
        var focusable = clone.querySelectorAll('[href], button, input');
        for (var i = 0; i < focusable.length; i++) {
            focusable[i].setAttribute('tabindex', '-1');
        }
    };

    function checkScrollVisible(element) {
        if (window.scrollY > element.sections[0].offsetHeight - element.nav.offsetHeight) window.scrollTo(0, 0);
    };

    // init the ChaHeader Object
    var chaScroll = document.getElementsByClassName('js-scroll_up-clip');
    if (chaScroll.length > 0) {
        for (var i = 0; i < chaScroll.length; i++) {
            new ChaScroll(chaScroll[i]);
        }
    }
}());


(function ($) {
    /*
     * We need to turn it into a function.
     * To apply the changes both on document ready and when we resize the browser.
     */

    function mediaSize() {
        /* Set the matchMedia */
        if (window.matchMedia("(max-width: 800px)").matches) {
            /* Changes when we reach the max-width  */
            $(document).on('click', '.nav_item>a', function () {
                $('.nav_checkbox').each(function () {
                    $(this).prop('checked', false)
                    $('.nav').removeClass("nav_checked")
                })
            })
        }
    }

    /* Call the function */
    mediaSize();
    /* Attach the function to the resize event listener */
    window.addEventListener("resize", mediaSize, false);
})(jQuery);