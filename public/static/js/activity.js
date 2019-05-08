$(function () {
    navObj = 5;
    var $content_box = $('.content_box');
    $('.content_box>ul>li>img').on('click', function () {
        var $li = $(this).closest('li');
        if (!$li.hasClass('active')) {
            $content_box.find('li.active').removeClass('active').find('.more_info').slideUp();
            $li.addClass('active');
            $li.find('.more_info').slideDown();
            console.log(123);
        } else {
            $li.find('.more_info').slideUp('slow', function () {
                $li.removeClass('active');
            });
        }
        return false;
    });

    $('.tab_title').on('click', 'li', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        var index = $(this).index();
        $content_box.removeClass('active').eq(index).addClass('active');
    })
});