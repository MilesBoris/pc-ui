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
                    'background': 'url(../images/bg-ico.png) no-repeat center center',
                    'background-position': '-80px -102px'
                })
                if (data.Code != 0) {
                    alert(data.Message);
                    return;
                }
                pos.html(data.Data + '元');
                //money_span.html(money_span.attr('data-username'))
                //console.log(data)
            },
            error: function (err, status) {
                //console.log(err)
            }
        })
    });

    //选择账户
    $('.indoor_toplist').on('click', 'li', function () {
        var _index = $(this).index();
        //隐藏的input 值
        $('.indoor_toplist li').removeClass('on');
        $(this).addClass('on');
        $('input', $(this).parent()).val($(this).attr('data-type'));
    })

    //选择游戏平台
    $('.game_platform').on('click', 'li.hasinfo', function () {
        $('.game_platform li').removeClass('on');
        $(this).addClass('on');
        $('.dividend_bonus').show();

        //隐藏的input 值
        $('input', $(this).parent()).val($(this).attr('data-id'));
    })

    $('.game_platform').on('click', 'li.hasnotinfo', function () {
        $('.game_platform li').removeClass('on');
        $(this).addClass('on');
        $('.dividend_bonus').hide();

        //隐藏的input 值
        $('input', $(this).parent()).val($(this).attr('data-id'));
    })

    //转入游戏平台按钮 改变隐藏的input 值
    // $('.line_form .account_save,.line_form .indoor_main').on('click', function () {
    //     var btn = $(this)
    //     $('input', btn.parent()).val(btn.attr('data-type'));

    //     btn.attr('disabled', true);

    //     var go = true;
    //     var form = $(this).parents('form');

    //     var url = form.attr('action');
    //     var method = form.attr('method');

    //     var rest_method = form.find("input[name='_method']");
    //     var method_s = rest_method.length > 0 ? rest_method.val() : method;
    //     if (go == true) {
    //         var detailLoad = layer.load(2, {
    //             shade: [0.2, '#ccc'], //遮罩层背景色、透明度,
    //             //shade:false
    //         });

    //         $.ajax({
    //             type: method_s,
    //             url: url,
    //             data: form.serialize(),
    //             dataType: "json",
    //             success: function (data) {
    //                 layer.close(detailLoad);
    //                 btn.attr('disabled', false);

    //                 var html = '';
    //                 var obj = JSON.parse(data.status.msg);

    //                 for (var p in obj) {
    //                     if (typeof (obj[p]) == 'string') {
    //                         html += '<p><b>' + obj[p] + '</b></p>';
    //                     } else if (obj[p] instanceof Array) {
    //                         for (var i = 0; i < obj[p].length; i++) {
    //                             html += '<p><b>' + obj[p][i] + '</b></p>';
    //                         }

    //                     }
    //                 }
    //                 //
    //                 layer.confirm(html, {
    //                     btn: ['确定'] //按钮
    //                 });
    //                 if (data.url)
    //                     location.href = data.url;
    //                 //else
    //                 //    layer.confirm(html, {
    //                 //        btn: ['确定'] //按钮
    //                 //    });

    //             }
    //         });
    //     }
    // })


})