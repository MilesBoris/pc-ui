/**
 * 当前的域
 * @type {string}
 */
var domin = document.domain;

/**
 * 获取 userkey 存款转账使用
 * @type {string}
 */
var userkey = '';

/**
 * gonggao.do 接口获取到的文字滚动数据
 * @type {Array}
 */
var noticeData = [];


/**
 * 验证码获取
 */
function imgCode() {
    $('#vPic,#vPic2').attr('src', Request_URI + "validateCode?timesp" + (new Date()).valueOf());
}

/**
 * 获取cookie 的值，没找到返回 ’‘
 * @param cookie_name {string}
 * @returns {string}
 */
function getCookie(cookie_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(cookie_name + '=');
        if (c_start != -1) {
            c_start = c_start + cookie_name.length + 1;
            var c_end = document.cookie.indexOf(';', c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return '';
}

/**
 * 设置 cookie
 * @param name {string} cookie 名称
 * @param value {string} cookie 值
 * @param days {number} cookie 保存时间
 */
function setCookie(name, value, days) {
    var exday = new Date();
    exday.setDate(exday.getDate() + days);
    document.cookie = name + '=' + escape(value) + ((days == null) ? "" :
        ";expires=" + exday.toGMTString()) + ";domin=" + domin + ";path=/";
}

/**
 * 删除cookie
 * @param name 要删除的cookie名
 */
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() +
            "domin=" + domin + ";path=/";
}

/**
 * 解析URl 返回 封装好的对象
 * @returns {Object}
 */
function getQueryString() {
    var qrcode = location.search == 0 ? '' : location.search.substr(1);
    var args = {};
    var items = qrcode.length ? qrcode.split('&') : [];
    for (var i = 0; i < items.length; i++) {
        var argsArr = items[i].split('=');
        var length = argsArr[0].toString().length;
        //防止多个=号
        args[argsArr[0].toString()] = items[i].slice(length + 1);
    }
    return args;
}


/**
 * 解析字符串或者数字，无法解析直接返回，否则返回保留两位小数数字
 * @param x {*} 要解析的数字或者字符串
 * @returns {*}
 */
function toDecimal(x) {
    var f;
    if (isNaN(x)) {
        return x;
    } else {
        f = parseFloat(x);
        f = Math.round(x * 100) / 100;
    }
    return f.toFixed(2);
}

/**
 * 获取信箱信息
 */
function getMessageNum() {
    $.ajax({
        type: "post",
        url: Request_URI + "User/getMessageNum",
        async: true,
        cache: false,
        success: function (data) {
            var islist = data.noread;
            $('#su-MsgNotReadCount,#MsgNotReadCount').text(islist);
        }
    })
}

/**
 * 登陆前样式
 */
function loginBefore() {
    $('#login_before,#index_login_before').show();
    $('#login_after,#index_login_after').hide();
    delCookie('login_judge'); //删除登录成功cookie
}

/**
 * 登录后样式
 */
function loginAfter() {
    $('#login_after,#index_login_after').show();
    $('#login_before,#index_login_before,.login_after1').hide();
    getMessageNum();//站内信接口
    setCookie('login_judge', 'true', 1); //设置登录成功cookie
    //获取信息
    $.ajax({
        type: "post",
        url: Request_URI + "User/getUserInfo",
        async: false,
        cache: false,
        success: function (data) {
            var userName = data.username,
                wallet = data.wallet;
            $('#login_user_name,#index_user_name').html(userName.slice(3));
            $('#login_user_money,#index_user_money').html(wallet);
        }
    });
}

/**
 * 用户登录
 * @param tname {String} 用户名
 * @param tpwd  {String} 密码
 * @param imgcode {String} 验证码
 * @constructor
 */
function getDefaultHref() {
    //支付页面初始化支付类型(根据后台勾选显示)
    var List = {
        1: ['member_deposit_zx.html','网银支付'],    //网银
        2: ['member_deposit_code.html','扫码支付'],    //扫码支付
        3: ['member_deposit_wx.html','微信'],      //微信支付
        4: ['member_deposit_zfb.html','支付宝'],     //支付宝支付
        5: ['member_deposit_qq.html','QQ钱包'],        //财付通支付
        6: ['member_deposit_jd.html','京东支付'],      //京东支付
        7: ['member_deposit_ylsm.html','银联扫码'],    //银联扫码支付
        8: ['member_deposit.html','银行汇款'],         //银行汇款
        9: ['member_deposit_quickPay.html','快捷支付'], //快捷支付
        10: ['member_deposit_wxtm.html', '微信条码'], //微信条码
        11: ['member_deposit_zfbtm.html', '支付宝条码'] //支付宝条码
    }

    $.post(Request_URI + 'PlatformPay/paymentChannel', function (data) {
        if(!data.PCchannel) {
            return;
        }
        // var pcChannel = data.PCchannel.reverse(); //int 数组
        var pcChannel = data.PCchannel; //int 数组
        const firstIndex = pcChannel[0];
        var initHref = List[firstIndex][0];
        // $('#goto_deposit').attr('href', initHref);
        var indexHtmlHref = `/UserCenter/${initHref}`;
        $('.goto_deposit_money').attr('href', indexHtmlHref);
    })
}
function User_login(tname, tpwd, imgcode) { //用户登录
    var laylogin = layer.load(0, {
        shade: 0.4
    });
    $.ajax({
        type: "post",
        url: Request_URI + "login.do",
        dataType: "json",
        async: false,
        data: {
            tname: Agent + tname,
            tpwd: tpwd,
            savelogin: 1,
            imgcode: imgcode
        },
        success: function (tdata) {
            //刷新验证码
            imgCode();
            getDefaultHref();
            layer.close(laylogin);
            var str = tdata.status;
            if (str == 'ok') {
                loginAfter();
            } else if (str == 'faild') {
                layer.alert(tdata.errmsg, {icon: 0, offset: '300px'});
            }
        },
        error: function () {
            layer.close(laylogin);
            layer.alert('网络繁忙，请稍后再试', {icon: 5});
            //刷新验证码
            imgCode();
        }
    });
}

/**
 * 检查登录状态
 */
function checklogin() {
    $.ajax({
        type: "post",
        url: Request_URI + "checklogin.do",
        async: true,
        cache: false,
        contentType: 'text/plain',
        success: function (data) {
            var str = data.msg;
            if (str == 'success') {
                userkey = data.userkey;
                loginAfter();
            } else if (str == 'faild') {
                loginBefore();
            } else if (str == 'outlogin') {
                loginBefore();
                layer.msg('账号在别地登录！');
            }
        }
    });
}


/**
 * 添加收藏
 */
function addFavorite() {
    var url = window.location;
    var title = document.title;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
        alert("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    } else if (ua.indexOf("msie 8") > -1) {
        window.external.AddToFavoritesBar(url, title); //IE8
    } else if (document.all) {
        try {
            window.external.addFavorite(url, title);
        } catch (e) {
            alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
        }
    } else if (window.sidebar) {
        window.sidebar.addPanel(title, url, "");
    } else {
        alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
}

/**
 * 点击文字滚动弹窗
 * @param obj 点击的li元素
 */
function noticeAlert(obj) {
    if (noticeData) {
        var index = $(obj).index();
        var content = noticeData[index];
        layer.open({
            type: 1,
            btn: ['确定'],
            area: '480px',
            shade: false,
            title: '公告', //不显示标题
            content: '<p style="text-indent: 2em;line-height: 2;font-size: 14px;padding: 20px;' +
            'text-align: justify;";>' + content + '</p>', //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
            yes: function () {
                layer.closeAll();
            },
            cancel: function () {
                layer.closeAll();
            }
        });
    }
}

/**
 * 点击调用登录接口之前的验证和获取
 */
function userLogin() {
    var username = $('#login_username').val() || $('#username2').val();
    var password = $('#login_password').val() || $('#passwd2').val();
    var imgCode = $('#login_rmNum').val() || $('#rmNum2').val();
    if (!username || !password) {
        layer.msg('用户名或密码为空');
    } else if (!imgCode) {
        layer.msg('验证码不能为空');
    } else {
        User_login(username, password, imgCode);
    }
}


/**
 * header顶部快速入款跳转
 */
function topQuickPay() {
    var quickPay = '/UserCenter/member_deposit_zx.html';
    $.post(Request_URI + 'checklogin.do', function (data) {
        if (data.msg == 'success') {
            window.location.href = quickPay;
        } else {
            layer.msg('请先登录账户！');
        }
    })
}

$(function () {
    /**
     * 配置代理，客服连接,验证码
     */
    (function () {
        /**
         * 如有代理，获取代理的值，存入名为agentCode 的cookie 注册时作为参数
         */
        if (getQueryString().p !== undefined) {
            setCookie('agentCode', getQueryString().p, 1);
        }
        //配置客服连接
        // $('.serviceLink').attr('src', customerService);

        imgCode();  //登录验证码初始化
        checklogin(); //检查登录
        //头部点击登录
        $('#btnlogin,#index_login').on('click', function () {
            userLogin();
        });
    })();


    /**
     * 注销账户
     * #su-logou 顶部
     * .index_login_out 首页
     */
    $('#su-logout,.index_login_out').on('click', function () {
        layer.confirm('是否要退出账户?', {
            yes: function () {
                $.ajax({
                    type: "get",
                    url: Request_URI + "logout.do",
                    async: true,
                    success: function () {
                        imgCode(); //刷新验证码
                        layer.closeAll();
                        loginBefore();
                        // window.location.href = '/index.html';
                        window.location.reload();
                    }
                })
            }
        })

    });

    //回车登录
    document.onkeydown = function (e) {
        var e = e || event;
        if (e.keyCode == 13 && getCookie('login_judge') == '') {
            // document.getElementById('btnlogin').click();
            userLogin();

        }
    };

    //文字轮播
    $.post(Request_URI + 'gonggao.do', {cagent: Agent}, function (data) {
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].src1 == PLATFORM_CODE) {
                    noticeData.push(data[i].rmk);
                }
            }
            $('#announcement_marquee').empty();
            var marquee_li = '';
            for (var i = 0; i < noticeData.length; i++) {
                marquee_li = '<li style="font-size:15px;float: left;list-style: none;color:#ffffff;position: relative;" onclick="noticeAlert(this)">' + (i + 1) + '.&nbsp;' + noticeData[i] + '</li>';
                $('#announcement_marquee,#index_ele_msgNews').append(marquee_li);
            }
            try {
                $("#announcement_marquee,#index_announcement_marquee").marquee({
                    yScroll: "bottom",
                    pauseOnHover: true,
                    direction: 'left',
                    delayBeforeStart: 0,
                    scrollSpeed: 250,
                    duration: 12500
                });
            } catch (e) {
            }
        }
    })


    //头部样式选中
    var root = window.location.href;
    var str = root.split('/');
    var page = str[str.length - 1];
    $('.view-slideup>ul>li').removeClass('active');
    if (page == 'live.html') {
        $('.view-slideup>ul>li').eq(1).addClass('active');
    } else if (page == 'chess.html') {
        $('.view-slideup>ul>li').eq(5).addClass('active');
    } else if (
        page == "electronic_hb.html"
        || page == "electronic.html"
        || page == "electronic_pt.html"
        || page == "electronic_yoplay.html"
        || page == "electronic_ps.html"
        || page == "electronic_sw.html"
    ) {
        $('.view-slideup>ul>li').eq(3).addClass('active');
    } else if (page == "sport.html") {
        $('.view-slideup>ul>li').eq(4).addClass('active');
    } else if (page == "lottery.html") {
        $('.view-slideup>ul>li').eq(6).addClass('active');
    } else if (page == "promotion_all_branch.html") {
        $('.view-slideup>ul>li').eq(8).addClass('active');
    } else if (page == "index.html") {
        $('.view-slideup>ul>li').eq(0).addClass('active');
    } else if (page == "fish.html") {
        $('.view-slideup>ul>li').eq(2).addClass('active');
    } else if (page == "mobile.html") {
        $('.view-slideup>ul>li').eq(7).addClass('active');
    }


    // 永利澳门平台登录框显示 其他平台可以删除；
    $('.lightbox-close').click(function () {
        $('#index_login_after').hide()
    })
    $('.login-btn').click(function () {

        // layer.open({content: $('#index_login_after'),)
        $('#index_login_after').show()


        // content: $('#tk_k'),
    })
    getDefaultHref();

});


