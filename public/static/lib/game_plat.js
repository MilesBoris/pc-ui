/**
 * @file 游戏跳转转账
 */

/**
 *  {string} 全局储存游戏类型
 */
var gameType_k;
/**
 *  {string} 全局储存游戏id
 */
var gameID_k;
/**
 *  {string} 全局储存游戏模式
 */
var model_k;

var errMsg = [
    '转账平台错误',
    '转账金额不正确',
    'token获取失败',
    '图形验证码错误',
    '转账未完成请稍后再试',
    '余额不足',
    '钱包查询出错',
    '系统错误,请稍后再试',
    '系统维护中，请稍后操作',
    '转账成功'
]

/**
 *  游戏对应的名称，转账账type，游戏type
 *  {{游戏type: string[游戏名，转账type]}}
 */
var balaceARR = {
    'CG': ['卡卡湾88(视讯)', 'CG'],
    'AG': ['AG极速厅', 'AG'],
    'AGIN': ['AG国际厅/捕鱼王', 'AGIN'],
    'BBIN': ['BBIN', 'BBIN'],
    'DS': ['DS视讯', 'DS'],
    'OB': ['欧博', 'OB'],
    'OG': ['OG视讯', 'OG'],
    'SB': ['申博', 'SB'],
    'VR': ['VR彩票', 'VR'],
    'IGPJ': ['IG彩票(新)', 'IGPJ'],
    'IG': ['IG彩票', 'IG'],
    'MG': ['MG电子', 'MG'],
    'HABA': ['HABA', 'HABA'],
    'PT': ['PT电子', 'PT'],
    'HG': ['HG体育', 'HG'],
    'GGBY': ['GG捕鱼', 'GGBY'],
    'AGBY': ['AG捕鱼', 'AGIN'],
    'KYQP': ['开元棋牌', 'KYQP'],
    'YOPLAY': ['YOPLAY电子', 'AGIN'],
    'IGLOTTERY': ['IG彩票', 'IG'],
    'IGPJLOTTERY': ['IG彩票(新)', 'IGPJ'],
    'IGPJLOTTO': ['IG-六合彩(新)', 'IGPJ'],
    'IGLOTTO': ['IG-六合彩', 'IG'],
    'TASSPTA': ['AG体育', 'AGIN'],
    'VG': ['VG棋牌', 'VG'],
    'GY': ['GY彩票', 'GY'],
    'PS': ['PS电子', 'PS'],
    // 'NB': ['NB体育', 'NB'],
    'LYQP':['乐游棋牌','LYQP'],
    'JDB':['JDB电子','JDB'],
    'BG':['BG视讯','BG'],
    'SW':['SW电子','SW']
};

/**
 * 游戏跳转入口
 * @param gameType {string} 游戏类型
 * @param gameID {string}   游戏id
 * @param model {string}    游戏模式
 */
function loadgame(gameType, gameID, model) {
    if (getCookie('login_judge') == '') {
        // BootstrapDialog.show({
        //     title:'提示信息',
        //     message: '请先登录账户!',
        //     buttons: [{
        //         label: 'OK',
        //         //cssClass: 'btn-primary',
        //         action: function(dialog){
        //             dialog.close();
        //         }
        //     }]
        // });
        layer.alert('请先登录账户!');
        return;
    }
    gameType_k = gameType;
    gameID_k = gameID;
    model_k = model;
    $.ajax({
        type: "get",
        url: Request_URI + "checklogin.do",
        async: true,
        cache: false,
        success: function (data) {
            if (data.msg == 'success') {
                showTranWin(); //额度转账弹窗
            } else if (data.msg == 'faild') {
                layer.alert('登录状态失效,请重新登录!');
                $('#login_after').hide();
                $('#login_before').show();
                delCookie('login_judge');
            } else if (data.msg == 'outlogin') {
                layer.alert('账号在别地登录！');
                $('#login_after').hide();
                $('#login_before').show();
                delCookie('login_judge');
            }
        },
        error: function () {
            layer.alert('网络繁忙，请稍后再试', {
                icon: 0,
                offset: '300px'
            });
        }
    });


}

//BG试玩
function try_loadgame(gameID, model) {
    var txwinow = window.open('', model + gameID);
    var img =
        '<div  style="position: absolute;width: 276px;left: 50%;margin-left: -138px;margin-top: 200px; text-align: center;">' +
        '<img src="//image.beike188.com/KFY/images/5-121204193R0.gif"/>' +
        '<p style="text-align: center;margin-top: 100px;font-weight: bold;">' +
        '正在加载..' + '</p>' +
        '</div>';

    txwinow.document.body.innerHTML = '';
    txwinow.document.write(img);
    $.ajax({
        type: "post",
        url: Request_URI + "bg/bgTrialGame",
        async: true,
        data: {
            gameID: gameID,
            agent: Agent,
            model: model
        },
        success: function (g_data) {
            if (g_data.msg == 'error') {
                layer.alert('系统错误', {
                    icon: 0
                });
                txwinow.close();
            } else if (g_data.msg == 'process') {
                layer.alert('系统维护中', {
                    icon: 0
                });
                txwinow.close();
            } else {
                txwinow.location.href = g_data.msg;
            }

        },
        error: function () {
            layer.alert('网络繁忙，请稍后再试', {
                icon: 0
            });
            txwinow.close();
        }
    });
}

//IG试玩
function try_lottery(gameID) {
    var number = Math.ceil(Math.random() * 100000);
    var randomCode = 'TX' + number.toString();
    if (getCookie('accountCode') == '') {
        aaccountCode = randomCode;
        setCookie('accountCode', randomCode, 1);
    } else {
        aaccountCode = getCookie('accountCode');
    }
    var txwinow = window.open('', number + gameID);
    var img =
        '<div  style="position: absolute;width: 276px;left: 50%;margin-left: -138px;margin-top: 200px; text-align: center;">' +
        '<img src="//image.beike188.com/KFY/images/5-121204193R0.gif"/>' +
        '<p style="text-align: center;margin-top: 100px;font-weight: bold;">' +
        '正在加载..' + '</p>' +
        '</div>';

    txwinow.document.body.innerHTML = '';
    txwinow.document.write(img);
    $.ajax({
        type: "post",
        url: Request_URI + "DemoPlay/IG",
        async: true,
        data: {
            gameType: 'IGLOTTERY',
            gameID: gameID,
            model: 'PC',
            cagent: Agent,
            accountCode: aaccountCode
        },
        success: function (g_data) {
            if (g_data.msg == 'error') {
                layer.alert('系统错误', {
                    icon: 0
                });
                txwinow.close();
            } else if (g_data.msg == 'process') {
                layer.alert('系统维护中', {
                    icon: 0
                });
                txwinow.close();
            } else {
                txwinow.location.href = g_data.msg;
            }

        },
        error: function () {
            layer.alert('网络繁忙，请稍后再试', {
                icon: 0
            });
            txwinow.close();
        }
    });
}

//BG视讯试玩
function try_loadgame_sx() {
    var data = {
        gameType: 'BG',
        gameID: 1,
        agent: Agent,
        model: 'fun'
    };
    var txwinow = window.open('', data.model + data.gameID);
    var img =
        '<div  style="position: absolute;width: 276px;left: 50%;margin-left: -138px;margin-top: 200px; text-align: center;">' +
        '<img src="//image.beike188.com/KFY/images/5-121204193R0.gif"/>' +
        '<p style="text-align: center;margin-top: 100px;font-weight: bold;">' +
        '正在加载..' + '</p>' +
        '</div>';

    txwinow.document.body.innerHTML = '';
    txwinow.document.write(img);

    $.ajax({
        type: "post",
        url: Request_URI + "bg/bgTrialGame",
        async: true,
        data: data,
        success: function (g_data) {
            if (g_data.msg == 'error') {
                layer.alert('系统错误', {
                    icon: 0
                });
                txwinow.close();
            } else if (g_data.msg == 'process') {
                layer.alert('系统维护中', {
                    icon: 0
                });
                txwinow.close();
            } else {
                txwinow.location.href = g_data.msg;
            }

        },
        error: function () {
            layer.alert('网络繁忙，请稍后再试', {
                icon: 0
            });
            txwinow.close();
        }
    });
}

//AGIN试玩接口
function try_AGIN() {
    // layer.alert('系统维护中', {
    //     icon: 0
    // });
    var number = Math.ceil(Math.random() * 100000);
    var randomCode = 'AGIN' + number.toString();
    var txwinow = window.open('', number);
    var img =
        '<div  style="position: absolute;width: 276px;left: 50%;margin-left: -138px;margin-top: 200px; text-align: center;">' +
        '<img src="//image.beike188.com/KFY/images/5-121204193R0.gif"/>' +
        '<p style="text-align: center;margin-top: 100px;font-weight: bold;">' +
        '正在加载..' + '</p>' +
        '</div>';

    txwinow.document.body.innerHTML = '';
    txwinow.document.write(img);
    $.ajax({
        type: "post",
        url: Request_URI + "DemoPlay/AGIN",
        async: true,
        data: {
            gameType: 'AGIN',
            model: 'PC',
            cagent: Agent,
            accountCode: randomCode
        },
        success: function (g_data) {
            if (g_data.msg == 'error') {
                layer.alert('系统错误', {
                    icon: 0
                });
                txwinow.close();
            } else if (g_data.msg == 'process') {
                layer.alert('系统维护中', {
                    icon: 0
                });
                txwinow.close();
            } else {
                txwinow.location.href = g_data.msg;
            }

        },
        error: function () {
            layer.alert('网络繁忙，请稍后再试', {
                icon: 0
            });
            txwinow.close();
        }
    });
}


//额度转账弹窗
function showTranWin() {
    layer.open({
        type: 1,
        title: ['额度转换', 'font-size:18px;background:#6b423b;color: #fff;height:45px'],
        closeBtn: 1,
        offset: '250px',
        shade: [0.8, '#393D49'],
        shade: false,
        skin: 'demo-class',
        area: ['425px', '315px'],
        btnAlign: 'c',
        shadeClose: true,
        btn: ['确定转账', '直接游戏'],
        yes: function (index, layero) {
            var amount_y = $('#amount_k').val();
            var type_trans = balaceARR[gameType_k][1]; //转账type
            var a_userBalance = getBalance('WALLET');
            var bol = true;
            //检测金额是否填写
            if (amount_y == '') {
                layer.msg('请填写金额');
                return false;
            } else if (Number(amount_y) < 1) {
                layer.msg('单笔最小转账金额为：1元');
                return false;
            } else if (Number(amount_y) > 100000) {
                layer.msg('单笔最大转账金额为：100,000元');
                return false;
            }
            // } else if (Number($('#amount_k').val()) > Number(a_userBalance)) {
            //     layer.msg('转账金额不能大于' + a_userBalance + '元');
            //     return false;
            // }
            //if (type_trans == '' || type_trans == 'WALLET') { //直接转入游戏
            //	transfer_to_y(amount_y, bol);
            //	return false;
            //}
            Submit(amount_y, type_trans); //转入平台


        },
        btn2: function (index, layero) {
            forward_game_k();
        },
        content: $('#tk_k'),
        success: function (layero, index) {
            open_bol = false;
            $('#amount_k').val('');
        },
        end: function () {
            open_bol = true;
        }
    });

    //获取类型余额
    $('#game_k').text(balaceARR[gameType_k][0]);
    //$('#k_gameType').text('￥'+getBalance(gameType_k));
    //$('#k_userBalance').text('￥'+ getBalance('WALLET'));
    getBalance(balaceARR[gameType_k][1], '#k_gameType');
    getBalance('WALLET', '#k_userBalance');
}

//进入游戏
function forward_game_k() {
    var txwinow = window.open('', gameType_k + gameID_k);
    img =
        '<div  style="width:200px;height:32px;position: absolute;top: 200px; left:50%;margin-left: -100px; text-align: center;">' +
        '<img  src="//image.beike188.com/KFY/images/game_loading.gif"/></div>' +
        '<p style="font-size: 12px;text-align: center;margin-top: 280px;width: 200px;position: absolute;left: 50%;margin-left: -100px;">正在加载..</p>';
    txwinow.document.body.innerHTML = '';
    txwinow.document.write(img);
    $.ajax({
        type: "get",
        url: Request_URI + "User/forwardGame",
        async: true,
        data: {
            gameType: gameType_k,
            gameID: gameID_k,
            model: model_k
        },
        success: function (g_data) {
            if (g_data.msg == 'error') {
                layer.closeAll();
                // layer.alert('系统错误', {
                // 	icon: 0,
                // 	offset: '300px'
                // });
                layer.msg('系统错误');
                txwinow.close();
            } else if (g_data.msg == 'process') {
                layer.closeAll();
                // layer.alert('系统维护中', {
                // 	icon: 0,
                // 	offset: '300px'
                // });
                layer.msg('系统维护中');
                txwinow.close();
            } else if ($.isEmptyObject(g_data)) {
                layer.closeAll();
                // layer.alert('系统维护中', {
                // 	icon: 0,
                // 	offset: '300px'
                // });
                layer.msg('系统维护中');
            } else {
                layer.closeAll();
                txwinow.location.href = g_data.msg;
            }

        },
        error: function () {
            // layer.alert('网络繁忙，请稍后再试', {
            // 	icon: 0,
            // 	offset: '300px'
            // });
            layer.msg('网络繁忙，请稍后再试');
            txwinow.close();
        }
    });
}

//数字标准化
function toDecimal(number) {
    var f;
    if (isNaN(number)) {
        return number;
    } else {
        f = parseFloat(number);
        f = Math.round(number * 100) / 100;
    }
    return f.toFixed(2);
}

//获取平台
function getBalance(type, selector) {
    $(selector).text('loading...');
    $.post(Request_URI + 'User/getBalance', {BType: type}, function (data) {
        var balance = toDecimal(data.balance);
        $(selector).text('￥' + balance);
    })

}


//中心钱包转入游戏平台
function Submit(amount, type) {
    var load = layer.load(1, {
        shade: [0.3, '#000000']
    });
    //检查登录
    checklogin();
    $.ajax({
        type: "post",
        url: Request_URI + 'User/getToken',
        async: true,
        data: {
            userKey: userkey
        },
        success: function (data) {
            var tokenUUID = data.msg;
            //自平台转出
            tranferTo(amount, type, tokenUUID);
        },
        error: function () {
            layer.close(load);
            layer.msg('请求失败,请稍后再试!');
        }
    })
}

function tranferTo(amount, type, tokenUUID) {
    $.ajax({
        type: 'post',
        url: Request_URI + 'User/TransferTo',
        data: {
            credit: amount,
            type: type,
            uuid: tokenUUID,
            isImgCode: 0
        },
        timeout: 10000,
        success: function (data) {
            layer.closeAll();
            if (data.msg == 'success') {
                layer.confirm('转账成功！', {
                    title: '提示',
                    btn: '进入游戏',
                    btnAlign: 'c',
                    skin: 'yx_demo'
                }, function () {
                    layer.closeAll();
                    forward_game_k();
                });
            } else {
                //错误处理
                errHandling(data.msg);
            }
        },
        error: function (xhr, textStatus) {
            layer.closeAll();
            if (textStatus == 'timeout') {
                layer.msg('请求超时,请稍后再试!');
            } else {
                layer.msg('请求失败,请稍后再试!');
            }

        }
    })
}

function errHandling(msg) {
    if (msg == 'error') {
        layer.alert(this.errMsg[7]);
    } else if (msg == 'process') {
        layer.alert(this.errMsg[8]);
    } else {
        var key = parseInt(msg) - 1;
        layer.alert(this.errMsg[key]);
    }
}
