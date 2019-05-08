/***
 * config
 */
var hostname = window.location.host;
var protocol = window.location.protocol;

//代理号
var Agent = 'XKJ';

//请求路径
var Request_URI = protocol + '//' + hostname + (hostname.indexOf('192.168') > -1 ? '/XPJ/' : '/' + Agent + '/');

//网站标识
var PLATFORM_CODE = 'XKJK';

//title
document.title = '永利澳门';


//页头
window.onload = function () {
    $('title').after(
        '<link rel="icon" href="//image.beike188.com/KFY/images/index2/favicon.ico" />'
    );
};