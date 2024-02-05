(function($) {

	"use strict";


    /*------------------------------------------
        = FUNCTIONS
    -------------------------------------------*/
    // Check ie and version
    function isIE () {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1], 10) : false;
    }


    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $(".navigation-menu-holder");
        var openBtn = $(".navbar-header .open-btn");
        var closeBtn = $(".navigation-menu-holder .close-navbar");
        var navLinks = $("#navbar > ul > li > a:not(.dropdown-toggle)");

        openBtn.on("click", function() {
            if (!navbar.hasClass("slideInn")) {
                navbar.addClass("slideInn");
            }

            return false;
        })

        closeBtn.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;            
        })


        navLinks.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;            
        })

    }

    toggleMobileNavigation();


    // Add class for small navigation
    function addClassForSmallNav() {
        var windowWidth = window.innerWidth,
            mainNav = $("#navbar > ul");
        
        if (windowWidth < 992) {
            mainNav.addClass("small-nav");
        } else {
            mainNav.removeClass("small-nav");
        }
    }

    addClassForSmallNav();


    // Functionality for dropdown open close ect
    function smallNavFunctinality() {
        if ($(".small-nav").length) {
            var navigation = $(".small-nav");

            var subMenuLink = navigation.find(".sub-menu > a");
            var subSubMenuLink = navigation.find(".sub-sub-menu > a");
            var subMenu = subMenuLink.siblings("ul");
            var subSubMenu = subSubMenuLink.next("ul");

            subMenu.hide();
            subSubMenu.hide();

            subMenuLink.on("click", function(e) {
                var $this = $(this);
                e.preventDefault();
                $this.siblings().slideToggle();
                e.stopImmediatePropagation();
            });

            subSubMenuLink.on("click", function(f) {
                var $this = $(this);
                f.preventDefault();
                $this.siblings().slideToggle();
                f.stopImmediatePropagation();
            });
        }
    }


    //ACTIVE CURRENT MENU WHILE SCROLLING
    // function for active menuitem
    function activeMenuItem($links) {
        var cur_pos = $(window).scrollTop() + 2,
            bottomPosition = $(document).height() - $(window).height() - $(window).scrollTop(),
            sections = $("section"),
            nav = $links,
            nav_height = nav.outerHeight(),
            home = nav.find(" > ul > li:first");

        sections.each(function() {
            var top = $(this).offset().top - nav_height - 20,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find("> ul > li > a").parent().removeClass("current");
                nav.find("a[href='#" + $(this).attr('id') + "']").parent().addClass("current");
            } else if (cur_pos === 2) {
                nav.find("> ul > li > a").parent().removeClass("current");
                home.addClass("current");
            }
        });
    }


    // smooth-scrolling
    function smoothScrolling($links, $topGap = 0) {
        var links = $links;
        var topGap = $topGap;

        links.on("click", function() {
            if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
                if (target.length) {
                    $("html, body").animate({
                    scrollTop: target.offset().top - topGap
                }, 1000, "easeInOutExpo");
                    return false;
                }
            }
            return false;
        });
    }



    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function() {
                var height = $(this).position().top;
                var resize     = height - $(window).scrollTop();
                var parallaxSpeed = $(this).data("speed");
                var doParallax = -(resize / parallaxSpeed);
                var positionValue   = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }

    bgParallax();


    // Hero slider background setting
    function sliderBgSetting() {
        if ($(".hero-slider .slide").length) {
            $(".hero-slider .slide").each(function() {
                var $this = $(this);
                var img = $this.find(".slider-bg").attr("src");

                $this.css({
                    backgroundImage: "url("+ img +")",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                })
            });
        }
    }


     //Setting hero slider
    function heroSlider() {
        if ($(".hero-slider").length) {
            $(".hero-slider").owlCarousel({
                items: 1,
                autoplay: true,
                loop: true,
                mouseDrag: false,
                smartSpeed: 800,
                navSpeed: 800,
                dotsSpeed: 800,
                nav: true,
                navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                animateOut: 'fadeOut'
            });
        }
    }


    // set two coloumn height equal
    function setTwoColEqHeight($col1, $col2) {
        var firstCol = $col1,
            secondCol = $col2,
            firstColHeight = $col1.innerHeight(),
            secondColHeight = $col2.innerHeight();

        if (firstColHeight > secondColHeight) {
            secondCol.css({
                "height": firstColHeight + 1 + "px"
            })
        } else {
            firstCol.css({
                "height": secondColHeight + 1 + "px"
            })
        }
    }



    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function() {

                //active wow
                wow.init();

                //Active heor slider
                heroSlider();

            });
        }
    }


    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

    // Function for clone an element for sticky menu
    function cloneNavForSticyMenu($ele, $newElmClass) {
        $ele.addClass('original').clone().insertAfter($ele).addClass($newElmClass).removeClass('original').hide();
    }

    // clone home style 1 navigation for sticky menu
    if ($('.header-style1 .navigation').length) {
        cloneNavForSticyMenu($('.header-style1 .navigation'), "sticky");
    }

    // clone home style 2 navigation for sticky menu
    if ($('.header-style2 .navigation').length) {
        cloneNavForSticyMenu($('.header-style2 .navigation'), "sticky-s2");
    }


    // Function for sticky menu
    function stickIt($stickyClass) {
        var orgElementPos = $(".original").offset();
        var orgElementTop = orgElementPos.top;   

        if ($(window).scrollTop() >= (orgElementTop)) {
            var orgElement = $(".original");
            var coordsOrgElement = orgElement.offset();
            var leftOrgElement = coordsOrgElement.left;  
            var widthOrgElement = orgElement.css("width");

            $stickyClass.css({
                "left": leftOrgElement + "px",
                "top": 0,
                "width": widthOrgElement
            }).show();

            $(".original").css({
                "visibility": "hidden",
                "opacity": "0"
            });

        } else {
            $stickyClass.hide();
            $(".original").css({
                "visibility": "visible",
                "opacity": "1"
            });
        }
    }


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    });


    /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/  
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect  : "elastic",
            closeEffect : "elastic",
            wrapCSS     : "project-fancybox-title-style"
        });
    }


    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/  
    if ($(".video-play").length) {
        $(".video-play").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {  
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });    
    }
    

    /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/  
    if ($(".popup-gallery").length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',

            gallery: {
              enabled: true
            },

            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });    
    }


    /*------------------------------------------
        = BACK TO TOP BTN SETTING
    -------------------------------------------*/
    $("body").prepend("<a href='#'' class='back-to-top'><i class='fa fa-angle-up'></i></a>");

    function toggleBackToTopBtn() {
        var amountScrolled = 300;
        if ($(window).scrollTop() > amountScrolled) {
            $("a.back-to-top").fadeIn("slow");
        } else {
            $("a.back-to-top").fadeOut("slow");
        }
    }

    $(".back-to-top").on("click", function() {
        $("html,body").animate({
            scrollTop: 0
        }, 700);
        return false;
    })


    /*------------------------------------------
        = HEADER SEARCH AREA AND MINICART TOGGLE
    -------------------------------------------*/
    if ($(".header-search-area").length) {
        var serachFormBox = $(".header-search-area .header-search-form");
        var openSeachBtn = $(".header-search-area .open-btn");
        
        $(document.body).append(serachFormBox);
        serachFormBox.hide();

        openSeachBtn.on("click", function(e) {
            e.preventDefault();
            serachFormBox.slideDown();
        });

        serachFormBox.on("click", function() {
            serachFormBox.slideUp();
            return false;
        }).find(".form").on("click", function(e) {
             e.stopPropagation();
        })
    }

    // Mini cart toggle
    if ($(".search-mini-cart").length) {
        var cartOpenBtn = $(".mini-cart-btn a"),
            cartBox = $(".mini-cart"),
            body =  $(document.body);

        cartBox.hide();

        cartOpenBtn.on("click", function() {
            cartBox.fadeIn();
            return false;
        });

        body.on("click", function(e) {
            cartBox.fadeOut();
        }).find(cartBox).on("click", function(e) {
             e.stopPropagation();
        });
    }


    /*------------------------------------------
        = PROGRESS BAR WITHOUT PERCENTAGE
    -------------------------------------------*/
    if ($(".progress-bar-s1").length) {
        var $progress_bar = $('.progress-bar-s1');
        $progress_bar.appear();
        $(document.body).on('appear', '.progress-bar-s1', function() {
            var current_item = $(this);
            if (!current_item.hasClass('appeared')) {
                var percent = current_item.data('percent');
                current_item.css('width', percent + '%').addClass('appeared');
            }
            
        });
    };


    /*------------------------------------------
        =  PROGRESS BAR WITH PERCENTAGE
    -------------------------------------------*/
    if ($(".progress-bar-s2").length) {
        var $progress_bar = $('.progress-bar-s2');
        $progress_bar.appear();
        $(document.body).on('appear', '.progress-bar-s2', function() {
            var current_item = $(this);
            if (!current_item.hasClass('appeared')) {
                var percent = current_item.data('percent');
                current_item.append('<span>' + percent + '%' + '</span>').css('width', percent + '%').addClass('appeared');
            }
            
        });
    };

    // progress bar style 3
    if ($(".progress-bar").length) {
        var $progress_bar = $('.progress-bar');
        $progress_bar.appear();
        $(document.body).on('appear', '.progress-bar', function() {
            var current_item = $(this);
            if (!current_item.hasClass('appeared')) {
                var percent = current_item.data('percent');
                current_item.append('<span>' + percent + '%' + '</span>').css('width', percent + '%').addClass('appeared');
            }
        });
    };    


    /*------------------------------------------
        = FAN FACT COUNT
    -------------------------------------------*/
    if ($(".start-count").length) {
        $('.counter').appear();
        $(document.body).on('appear', '.counter', function(e) {
            var $this = $(this),
            countTo = $this.attr('data-count');

            $({ countNum: $this.text()}).animate({
                countNum: countTo
            }, {
                duration: 3000,
                easing:'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }


    /*------------------------------------------
        = URGENT CAUSES SLIDER
    -------------------------------------------*/
    if ($(".urgent-causes-slider").length) {
        $(".urgent-causes-slider").owlCarousel({
            items: 1,
            //autoplay: true,
            loop: true,
            mouseDrag: false,
            smartSpeed: 800,
            navSpeed: 800,
            dotsSpeed: 800,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
    }    


    /*------------------------------------------
        = ABOUT SLIDER SLIDER
    -------------------------------------------*/
    if ($(".about-slider").length) {
        $(".about-slider").owlCarousel({
            items: 1,
            mouseDrag: false,
        });
    }    


    /*------------------------------------------
        = QUICK DONATION TOGGLE ACTIVE CLASS
    -------------------------------------------*/
    if ($(".quick-donation-section").length) {
        var donateList = $(".quick-donation-section .donate-list .box");

        donateList.on("click", function(e) {
            var $this = $(this);

            if (!$this.hasClass("active")) {
                $this.addClass("active");
                $this.siblings().removeClass("active");
            }

        })
    }


    /*------------------------------------------
        = TESTIMONIALS SLIDER
    -------------------------------------------*/
    if ($(".testimonials-slider").length) {
        $(".testimonials-slider").owlCarousel({
            margin: 30,
            autoplayHoverPause:true,
            loop: true,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            responsive: {
                0 : {
                    items: 1
                },

                620 : {
                    items: 2
                },

                768 : {
                    items: 2
                },

                1200 : {
                    items: 3
                }
            }
        });
    }


    /*------------------------------------------
        = HOME SYTLE2 FETURED CAUSES METER
    -------------------------------------------*/
    if ($(".meter").length) {
        var $meter = $('.meter');
        $meter.appear();
        $(document.body).on('appear', '.meter', function() {
            var current_item = $(this);
            if (!current_item.hasClass('appeared')) {
                current_item.addClass('appeared');
                $(".meter").circleProgress({
                    size: 75,
                    thickness: 2,
                    fill: "#23a884",
                    animation: {
                         duration: 2000
                    }
                }).on('circle-animation-progress', function(event, progress, stepValue) {
                    var $this = $(this);
                    $this.find('span').html(Math.round(100 * stepValue) + '<i>%</i>');
                });
            }                
        });
    };

    if ($(".meter-2").length) {
        var $meter = $(".meter-2");
        $meter.appear();
        $(document.body).on("appear", ".meter-2", function() {
            var current_item = $(this);
            if (!current_item.hasClass("appeared")) {
                current_item.addClass("appeared");
                $(".meter-2").circleProgress({
                    size: 160,
                    thickness: 6,
                    fill: "#23a884",
                    emptyFill: "#fff",
                    lineCap: "square",
                    animation: {
                         duration: 2000
                    }
                }).on("circle-animation-progress", function(event, progress, stepValue) {
                    var $this = $(this);
                    $this.find("span").html(Math.round(100 * stepValue) + "<i>%</i>");
                });
            }                
        });
    };

    if ($(".meter-3").length) {
        var $meter = $(".meter-3");
        $meter.appear();
        $(document.body).on("appear", ".meter-3", function() {
            var current_item = $(this);
            if (!current_item.hasClass("appeared")) {
                current_item.addClass("appeared");
                $(".meter-3").circleProgress({
                    size: 110,
                    thickness: 4,
                    fill: "#23a884",
                    emptyFill: "#eeeeee",
                    lineCap: "square",
                    animation: {
                         duration: 2000
                    }
                }).on("circle-animation-progress", function(event, progress, stepValue) {
                    var $this = $(this);
                    $this.find("span").html(Math.round(100 * stepValue) + "<i>%</i>");
                });
            }                
        });
    };


    /*------------------------------------------
        = FEATURED CAUSES SLIDER
    -------------------------------------------*/
    if ($(".featured-causes-slider").length) {
        $(".featured-causes-slider").owlCarousel({
            items: 1,
            loop: true,
            mouseDrag: false,
            smartSpeed: 800,
            navSpeed: 800,
            dotsSpeed: 800,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
        });
    }   


    /*------------------------------------------
        = CAUSES-S2 SLIDER
    -------------------------------------------*/
    if ($(".causes-s2-slider").length) {
        $(".causes-s2-slider").owlCarousel({
            loop: true,
            margin: 30,
            autoplayHoverPause:true,
            dots: false,
            nav: true,
            navText: ["<i class='fa fa-long-arrow-left'></i>","<i class='fa fa-long-arrow-right'></i>"],
            responsive: {
                0 : {
                    items: 1
                },

                620 : {
                    items: 2
                },

                768 : {
                    items: 2
                },

                1200 : {
                    items: 3
                }
            }
        });
    }


    /*------------------------------------------
        = RECENT BLOG SLIDER
    -------------------------------------------*/
    if ($(".recent-blog-slider").length) {
        $(".recent-blog-slider").owlCarousel({
            loop: true,
            margin: 35,
            stagePadding: 10,
            autoplayHoverPause:true,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            responsive: {
                0 : {
                    items: 1
                },

                650 : {
                    items: 2
                }
            }
        });
    }


    /*------------------------------------------
        = HOME STYLE 3 CAUSES SLIDER
    -------------------------------------------*/
    if ($(".causes-s3-slider").length) {
        $(".causes-s3-slider").owlCarousel({
            margin: 30,
            stagePadding: 15,
            autoplayHoverPause:true,
            loop: true,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            responsive: {
                0 : {
                    items: 1
                },

                620 : {
                    items: 2
                },

                768 : {
                    items: 2
                },

                1200 : {
                    items: 3
                }
            }
        });
    }


    /*------------------------------------------
        = PARTNERS SLIDER
    -------------------------------------------*/
    if ($(".partners-slider").length) {
        $(".partners-slider").owlCarousel({
            autoplay:true,
            loop: true,
            margin: 30,
            dots: false,
            nav: false,
            responsive: {
                0 : {
                    items: 2
                },

                500 : {
                    items: 3
                },

                768 : {
                    items: 4
                },

                1200 : {
                    items: 5
                }
            }
        });
    }


    /*------------------------------------------
        = URGENT SLIDER
    -------------------------------------------*/
    if ($(".urgent-slider").length) {
        $(".urgent-slider").owlCarousel({
            mouseDrag: false,
            smartSpeed:300,
            items:1,
            loop:true,
            margin:0,
            center:true,
            autoplayHoverPause:true,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
        });
    }


    /*-------------------------------------------------------------
        = POPUP GOOGLE MAP FOR CONTACT PAGE
    -------------------------------------------------------------*/  
    if ($(".map-link").length) {
        $('.map-link').magnificPopup({
            type: 'iframe'
        }); 
    }


    /*------------------------------------------
        = EVENT SINGLE PAGE EVENT SLIDER
    -------------------------------------------*/
    if ($(".event-single-slider").length) {
        $(".event-single-slider").owlCarousel({
            mouseDrag: false,
            smartSpeed:300,
            items:1,
            loop:true,
            margin:0,
        });
    }

    //Disable mouse scroll wheel zoom on embedded Google Maps
    if ($('.event-location-map').length) {
        $('.event-location-map').on("click", function(e) {
            $(this).find('iframe').css('pointer-events', 'all');
        }).mouseleave(function(e) {
            $(this).find('iframe').css('pointer-events', 'none');
        });
    }


    /*------------------------------------------
        = SHOP RANGE SLIDER
    -------------------------------------------*/
    if ($("#range").length) {
        $("#range").slider({
            min: 50,
            max: 1000,
            value: [85, 300],
            tooltip: "hide"
        });

        $("#range").on("slide", function(v1) {
            $("#min-value").text("$" + v1.value[0]);
            $("#max-value").text("$" + v1.value[1]);
        });
    }


    /*------------------------------------------
        = SHOP DETAILS PRODUCT SLIDER
    -------------------------------------------*/
    if ($(".shop-single-slider-wrapper").length) {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            focusOnSelect: true,
            prevArrow: '<i class="nav-btn nav-btn-lt fa fa-long-arrow-left"></i>',
            nextArrow: '<i class="nav-btn nav-btn-rt fa fa-long-arrow-right"></i>',

            responsive: [
                {
                  breakpoint: 500,
                  settings: {
                    slidesToShow: 3,
                    infinite: true
                  }
                }
            ]

        });
    }

    // Bootstrap touchspin for product details page
    if ($("input[name='count-product']").length) {
        $("input[name='count-product']").TouchSpin({
            verticalbuttons: true
        });
    }

    // Add data-text attribute in .theme-btn, .theme-btn-s4 for flip hover effect
    function addDataText($btnClass) {
        if ($btnClass.length) {
            var btn = $btnClass;
            btn.each(function() {
                var $this = $(this);
                var text = $this.text();
                $this.attr("data-text", text);
            });
        }
    }

    addDataText($(".theme-btn"));
    addDataText($(".theme-btn-s4"));


    /*------------------------------------------
        = CONTACT FORM SUBMISSION
    -------------------------------------------*/  
    if ($("#contact-form").length) {
        $("#contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: "required",
                phone: {
                    number: true,
                    minlength: 4
                }
            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email"
            },

            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });
                
                return false; // required to block normal submit since you used ajax
            }

        });
    }


    /*==========================================================================
        WHEN DOCUMENT LOADING 
    ==========================================================================*/
    $(window).on('load', function() {

        preloader();

        toggleMobileNavigation();

        sliderBgSetting();

        addClassForSmallNav();

        smallNavFunctinality();

        // set home page abou us section two col equal
        if ($(".about-us-section").length) {
            setTwoColEqHeight($(".about-us-section .left-col"), $(".about-us-section .right-col"));
        }

        // set home page 2 about company section two col equal
        if ($(".about-company-section").length) {
            setTwoColEqHeight($(".about-company-section .left-col"), $(".about-company-section .some-info"));
        }

        // set causes list page case item two col equal height
        if ($(".causes-list-box").length) {
            setTwoColEqHeight($(".causes-list-box .img-holder"), $(".causes-list-box .details"));
        }

        // set urgent slider two col equal height
        if ($(".urgent-slider .urgent-box").length) {
            setTwoColEqHeight($(".urgent-box .img-holder"), $(".urgent-box .details"));
        }

        // set newsletter two col equial
        if ($(".newsletter").length) {
            setTwoColEqHeight($(".newsletter .children-holder"), $(".newsletter .subscribe"));
        }  

        // All page smooth scrolling except app landing home 
        if ($(".page-wrapper").length) {
            smoothScrolling($("#navbar > ul > li > a:not(.dropdown-toggle)"), 60);
        }

    });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function() {
        
        bgParallax();

        if ($(".header-style1").length) {
            stickIt($(".sticky")); 
        }

        if ($(".header-style2").length) {
            stickIt($(".sticky-s2")); 
        }

        // Add sticky header for home style three
        if ($(".header-style3").length) {
            var header = $(".header-style3 .navigation");
            var scroll = $(window).scrollTop();
            var top = 300;

            if ((scroll > top) && !header.hasClass("header-style-three")) {
                header.addClass("sticky-s3");
            } else {
                header.removeClass("sticky-s3");
            }
        }

        activeMenuItem($("#navbar"));


        toggleBackToTopBtn();        

    });



    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function() {
        
        addClassForSmallNav();

        smallNavFunctinality();

        if ($(".header-style1").length) {
            stickIt($(".sticky")); 
        } 

        if ($(".header-style2").length) {
            stickIt($(".sticky-s2")); 
        }

        // set cta-2 two col equial
        if ($(".about-us-section").length) {
            setTwoColEqHeight($(".about-us-section .left-col"), $(".about-us-section .right-col"));
        }

        // set newsletter two col equial
        if ($(".newsletter").length) {
            setTwoColEqHeight($(".newsletter .children-holder"), $(".newsletter .subscribe"));
        }  
        
    });


})(window.jQuery);
