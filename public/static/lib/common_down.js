< !--侧边导航栏 -->

    // $(window).on('scroll', function(event) {
    //     if ($(this).scrollTop() > 73) {
    //         $(".header .logo").addClass('w');
    //
    //         if($('.btm-tool').hasClass('expand')) {
    //             $(this).parent().find('.btn-download').hide();
    //             $(this).parent().find('.btn-min').hide();
    //         } else {
    //             $('.btn-download').stop().hide();
    //             $('.btn-min').stop().fadeIn();
    //         }
    //
    //     } else {
    //         $(".header .logo").stop().removeClass('w');
    //         if($('.btm-tool').hasClass('expand')) {
    //             $(this).parent().find('.btn-download').hide();
    //             $(this).parent().find('.btn-min').hide();
    //         } else {
    //             $('.btn-download').stop().fadeIn();
    //             $('.btn-min').stop().hide();
    //         }
    //     }
    // });

    $(function () {
        $(".wrapper").click(function () {
            $('body').removeClass('nav-sidebar-open');
        });
        $(document).on('click', '#open-menu', function () {
            $('body').addClass('nav-sidebar-open');
        });

        $(document).on('click', '#close-menu', function () {
            $('body').removeClass('nav-sidebar-open');
        });

        // $(document).on('click', '.nav-sidebar-open .wrapper', function(){
        // 	$('body').removeClass('nav-sidebar-open');
        // });

        $('.sidebar .lang').click(function (e) {
            $(this).hide();
            $('.sidebar .back-btn').show();
            $('.sidebar .c').removeClass('active');
            $(this).parent().parent().find('.back-menu').addClass('active');
            e.stopPropagation();
            e.preventDefault();
        });

        $('.sidebar .back-btn').click(function (e) {
            $(this).hide();
            $('.sidebar .lang').show();
            $('.sidebar .c').removeClass('active');
            $(this).parent().parent().find('.lang-menu').addClass('active');
            e.stopPropagation();
            e.preventDefault();
        });

        $('.btn-download').click(function () {
            $(this).hide();
            $(this).parent().find('.btn-expand').fadeIn();
            $(this).parent().addClass('expand');
        });

        $('.btn-min').click(function () {
            $(this).hide();
            $(this).parent().find('.btn-expand').fadeIn();
            $(this).parent().addClass('expand');
        });

        $('.qr-close').click(function () {
            $(this).parent().parent().removeClass('expand');
            $(this).parent().hide();

            if ($(window).scrollTop() > 73) {
                $(this).parent().parent().find('.btn-min').fadeIn();
            }

            if ($(window).scrollTop() < 73) {
                $(this).parent().parent().find('.btn-download').fadeIn();
            }
        });

        // $('.sidebar .scrollbar-inner').scrollbar();

        Position = $(window).height() + $(window).scrollTop();
        $('.view').each(function (i) {
            if (Position > $(this).offset().top) {
                $(this).delay(80 * i).queue(function () {
                    $(this).addClass("on");
                });
            }
        });

        $(window).scroll(function () {
            scrollPosition = $(window).height() + $(window).scrollTop();
            $('.view').each(function () {
                if (scrollPosition - 200 > $(this).offset().top) {
                    $(this).addClass("on");
                }
            });
        });
    });
