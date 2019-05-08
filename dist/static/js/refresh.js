$(function () {
    $('.refresh').on('click', function () {
        var _this = $(this);
        var pos = _this.parent('p').find('span');
        var money_span = _this.parent('p').next().find('span');
        _this.css({
            'background': 'url(http://mo2.doc886.com/web/images/h-u-loading2.gif) no-repeat center center'
        })
        $.ajax({
            type: 'GET',
            url: _this.attr('data-uri'),
            data: '',
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                _this.css({
                    'background': 'url(http://mo2.doc886.com/web/images/bg-ico.png) no-repeat center center',
                    'background-position': '-80px -102px'
                })
                if (data.Code != 0) {
                    alert(data.Message);
                    return;
                }
                pos.html(data.Data + '元');
                money_span.html(money_span.attr('data-username'))
            },
            error: function (err, status) {
                console.log(err)
            }
        })
    })

    $('.level').each(function () {
        var levelNum = $(this).attr('levelNum');
        $(this).animate({
            'width': levelNum
        }, 800)
    });
})