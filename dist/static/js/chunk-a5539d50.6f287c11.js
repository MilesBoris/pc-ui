(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a5539d50"],{"0a49":function(t,e,n){var i=n("9b43"),a=n("626a"),o=n("4bf8"),r=n("9def"),s=n("cd1c");t.exports=function(t,e){var n=1==t,c=2==t,u=3==t,d=4==t,l=6==t,h=5==t||l,m=e||s;return function(e,s,p){for(var f,g,v=o(e),y=a(v),w=i(s,p,3),b=r(y.length),C=0,M=n?m(e,b):c?m(e,0):void 0;b>C;C++)if((h||C in y)&&(f=y[C],g=w(f,C,v),t))if(n)M[C]=g;else if(g)switch(t){case 3:return!0;case 5:return f;case 6:return C;case 2:M.push(f)}else if(d)return!1;return l?-1:u||d?d:M}}},1169:function(t,e,n){var i=n("2d95");t.exports=Array.isArray||function(t){return"Array"==i(t)}},2198:function(t,e,n){},3306:function(t,e,n){"use strict";var i=n("577e"),a=n.n(i);a.a},5176:function(t,e,n){t.exports=n("51b6")},"577e":function(t,e,n){},7514:function(t,e,n){"use strict";var i=n("5ca1"),a=n("0a49")(5),o="find",r=!0;o in[]&&Array(1)[o](function(){r=!1}),i(i.P+i.F*r,"Array",{find:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")(o)},"98b6":function(t,e,n){"use strict";n.r(e);var i,a,o,r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container slot ",staticStyle:{"margin-top":"70px",position:"relative"}},[t._m(0),n("div",{staticClass:"feature"},[n("div",{staticClass:"content",staticStyle:{display:"flex","justify-content":"space-between"}},[n("div",{staticClass:"col col1"},[n("div",{staticClass:"prize"},[t._v("\n                    CNY\n                    "),n("span",{staticClass:"jackpot-count",attrs:{id:"prize1","data-provider":"AG"}},[t._v("￥\n                        "),n("IOdometer",{staticClass:"iOdometer",attrs:{value:t.ag,format:"(,ddd).dd",animation:"count"}})],1)]),n("p",[t._v("AG电游总奖池")])]),n("div",{staticClass:"col col2"},[n("div",{staticClass:"prize"},[t._v("\n                    CNY\n                    "),n("span",{staticClass:"jackpot-count",attrs:{id:"prize2","data-provider":"PT"}},[t._v("￥\n                        "),n("IOdometer",{staticClass:"iOdometer",attrs:{value:t.pt,format:"(,ddd).dd",animation:"count"}})],1)]),n("p",[t._v("TGP电游总奖池")])]),n("div",{staticClass:"col col3"},[n("div",{staticClass:"prize"},[t._v("\n                    CNY\n                    "),n("span",{staticClass:"jackpot-count",attrs:{id:"prize3","data-provider":"MG"}},[t._v("￥\n                    "),n("IOdometer",{staticClass:"iOdometer",attrs:{value:t.mg,format:"(,ddd).dd",animation:"count"}})],1)]),n("p",[t._v("DT电游总奖池")])])])]),n("div",{staticClass:"main"},[n("div",{staticClass:"content"},[n("div",{staticClass:"tab",attrs:{id:"providerGroup"}},[n("div",{staticStyle:{background:"#1e1e1e",overflow:"hidden"}},[n("ul",t._l(t.gameRooms,function(e,i){return n("li",{key:i,class:{on:e.isSelect},staticStyle:{width:"107px",height:"40px",background:"#1e1e1e","text-align":"center",position:"relative",cursor:"pointer",float:"left","list-style":"none"},on:{click:function(n){t.mGameRoomSelect(e.gameCompanyId)}}},[n("p",{staticClass:"tit",staticStyle:{"font-size":"14px","line-height":"44px","font-weight":"200",color:"#999"},domProps:{textContent:t._s(e.gameName)}})])}))]),n("div",{staticClass:"search",staticStyle:{display:"block"}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.searchGameKey,expression:"searchGameKey"}],staticClass:"search-input",attrs:{type:"text",id:"game_input",placeholder:"搜索游戏"},domProps:{value:t.searchGameKey},on:{change:t.mSearchGameByKey,input:function(e){e.target.composing||(t.searchGameKey=e.target.value)}}}),n("button",{staticClass:"search-btn",attrs:{id:"game_searchdo"}})])]),n("div",{staticClass:"tab-content",attrs:{id:"searchPart2"}},[n("div",{staticClass:"filter"},[n("div",{staticClass:"filter-group",attrs:{id:"game_nav_bar"}},[n("a",{staticClass:"active",attrs:{href:"javascript:void(0);",id:"partAll"}},[t._v(t._s(t.gName))]),n("a",{attrs:{href:"javascript:void(0);",id:"partAG"},on:{click:function(e){t.mSearchGameByKey(0)}}},[t._v("全部")])])])]),n("div",{staticClass:"tab-content",staticStyle:{display:"block"},attrs:{id:"the_content"}},[n("div",{attrs:{id:"gamesTable"}},[n("div",{staticClass:"content_listNumb_box"},t._l(t.games,function(e,i){return n("div",{key:i,staticClass:"game game2 animated pulse"},[n("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.prcUrl}}),n("div",{staticClass:"game-details"},[n("p",{staticClass:"game-title",domProps:{textContent:t._s(e.value)}}),t._m(1,!0)]),n("span",{staticClass:"game-mask"}),n("div",{staticClass:"game-hover games"},[n("h5",{domProps:{textContent:t._s(e.value)}},[t._v("108好汉")]),n("a",{staticClass:"game-btn gamein",attrs:{href:"###"},on:{click:function(n){t.mEnterGame(e.id)}}},[t._v("立即游戏")])])])}))]),n("div",{staticClass:"clear"})])])])])},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{width:"100%",position:"relative",overflow:"hidden"}},[n("div",{staticClass:"fullSlide"},[n("div",{staticClass:"bd bd1"},[n("div",{staticClass:"swiper-container eGameBanner",attrs:{id:"homeSwiper"}})])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"likes"},[n("span",{staticClass:"icon-flame"})])}],c=n("5176"),u=n.n(c),d=(n("ac6a"),n("7514"),n("acab")),l=n.n(d),h=(n("2198"),{name:"eGame",components:{IOdometer:l.a},data:function(){return{ag:4206340,pt:5706770,mg:6502960,format:"",duration:2e3,animation:"",gameRooms:[],games:[],searchGameKey:"",sGames:[],gName:""}},computed:{cSelectGameRoom:function(){return this.gameRooms.find(function(t){return 1==t.isSelect})},cGongGaos:function(){return this.$store.getters.getGonggaos}},mounted:function(){var t=this;this.$http.post("/gamesbytypedisc.json",{sysId:0}).then(function(e){if(0==e.code){var n=e.data.companyCustomGames?e.data.companyCustomGames:[];t.gameRooms=[],n.forEach(function(e,n){5==e.typeId&&(e.isSelect=!1,t.gameRooms.push(e))}),t.gameRooms.length>0&&t.mGameRoomSelect(t.gameRooms[0].gameCompanyId)}})},methods:{mGameRoomSelect:function(t){var e,n=this;this.gameRooms.map(function(n){n.isSelect,n.gameCompanyId===t?(n.isSelect=!0,e=n):(n.isSelect=!1,e=n)}),this.gName=this.gameRooms.find(function(t){return 1==t.isSelect}).gameName,e&&this.$http.get("/managerGame/gamePlays.json?id="+t).then(function(t){0==t.code&&(n.games=t.data.playlist,n.sGames=n.games)})},mEnterGame:function(t){var e=this;this.cNeedLogin?this.mAlert("请先登陆！"):(this.mLoading(!0),this.$http.post("/managerGame/getMemberGameUrl.json",{username:this.cLoginUser.username,gameCompanyId:this.cSelectGameRoom.gameCompanyId,gameId:t}).then(function(t){e.mLoading(!1),0==t.code?setTimeout(function(){var e=window.open("","_blank");e.location.href=t.data.dgUrl.pcUrl},300):e.mAlert(t.message)}).catch(function(t){e.mAlert("游戏正忙，请稍后再试...")}))},getAg:function(){var t=this;i&&clearTimeout(i),i=setTimeout(function(){t.ag=t.ag+m(2e3),t.getAg()},m(8e3))},getPt:function(){var t=this;a&&clearTimeout(a),this.pt=this.pt+m(2e3),a=setTimeout(function(){t.getPt()},m(8e3))},getMg:function(){var t=this;o&&clearTimeout(o),this.mg=this.mg+m(2e3),o=setTimeout(function(){t.getMg()},m(8e3))},mSearchGameByKey:function(t){var e=this;this.games=[],0===t?(this.searchGameKey="",this.games=u()([],this.sGames)):this.games=this.sGames.filter(function(t){return t.value.indexOf(e.searchGameKey)>=0})}},created:function(){this.getAg(),this.getPt(),this.getMg()}});function m(t){var e=Math.floor(Math.random()*t+1);return e}var p=h,f=(n("3306"),n("2877")),g=Object(f["a"])(p,r,s,!1,null,"0d5f9bdd",null);g.options.__file="eGame.vue";e["default"]=g.exports},a933:function(t,e,n){var i,a;(function(){var n,o,r,s,c,u,d,l,h,m,p,f,g,v,y,w,b,C,M,S,x,_,D,T,G,E,F,A,O,k,j,L,N=[].slice;b='<span class="odometer-value"></span>',v='<span class="odometer-ribbon"><span class="odometer-ribbon-inner">'+b+"</span></span>",s='<span class="odometer-digit"><span class="odometer-digit-spacer">8</span><span class="odometer-digit-inner">'+v+"</span></span>",d='<span class="odometer-formatting-mark"></span>',r="(,ddd).dd",l=/^\(?([^)]*)\)?(?:(.)(d+))?$/,h=30,u=2e3,n=20,m=2,c=.5,p=1e3/h,o=1e3/n,y="transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",G=document.createElement("div").style,w=null!=G.transition||null!=G.webkitTransition||null!=G.mozTransition||null!=G.oTransition,D=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,f=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,M=function(t){var e;return e=document.createElement("div"),e.innerHTML=t,e.children[0]},_=function(t,e){return t.className=t.className.replace(new RegExp("(^| )"+e.split(" ").join("|")+"( |$)","gi")," ")},C=function(t,e){return _(t,e),t.className+=" "+e},E=function(t,e){var n;if(null!=document.createEvent)return n=document.createEvent("HTMLEvents"),n.initEvent(e,!0,!0),t.dispatchEvent(n)},x=function(){var t,e;return null!=(t=null!=(e=window.performance)&&"function"===typeof e.now?e.now():void 0)?t:+new Date},T=function(t,e){return null==e&&(e=0),e?(t*=Math.pow(10,e),t+=.5,t=Math.floor(t),t/Math.pow(10,e)):Math.round(t)},F=function(t){return t<0?Math.ceil(t):Math.floor(t)},S=function(t){return t-T(t)},O=!1,(A=function(){var t,e,n,i,a;if(!O&&null!=window.jQuery){for(O=!0,i=["html","text"],a=[],e=0,n=i.length;e<n;e++)t=i[e],a.push(function(t){var e;return e=window.jQuery.fn[t],window.jQuery.fn[t]=function(t){var n;return null==t||null==(null!=(n=this[0])?n.odometer:void 0)?e.apply(this,arguments):this[0].odometer.update(t)}}(t));return a}})(),setTimeout(A,0),g=function(){function t(e){var n,i,a,o,r,s,c,d,l,h=this;if(this.options=e,this.el=this.options.el,null!=this.el.odometer)return this.el.odometer;for(n in this.el.odometer=this,c=t.options,c)a=c[n],null==this.options[n]&&(this.options[n]=a);null==(o=this.options).duration&&(o.duration=u),this.MAX_VALUES=this.options.duration/p/m|0,this.resetFormat(),this.value=this.cleanValue(null!=(d=this.options.value)?d:""),this.renderInside(),this.render();try{for(l=["innerHTML","innerText","textContent"],r=0,s=l.length;r<s;r++)i=l[r],null!=this.el[i]&&function(t){Object.defineProperty(h.el,t,{get:function(){var e;return"innerHTML"===t?h.inside.outerHTML:null!=(e=h.inside.innerText)?e:h.inside.textContent},set:function(t){return h.update(t)}})}(i)}catch(t){t,this.watchForMutations()}}return t.prototype.renderInside=function(){return this.inside=document.createElement("div"),this.inside.className="odometer-inside",this.el.innerHTML="",this.el.appendChild(this.inside)},t.prototype.watchForMutations=function(){var t=this;if(null!=f)try{return null==this.observer&&(this.observer=new f(function(e){var n;return n=t.el.innerText,t.renderInside(),t.render(t.value),t.update(n)})),this.watchMutations=!0,this.startWatchingMutations()}catch(t){t}},t.prototype.startWatchingMutations=function(){if(this.watchMutations)return this.observer.observe(this.el,{childList:!0})},t.prototype.stopWatchingMutations=function(){var t;return null!=(t=this.observer)?t.disconnect():void 0},t.prototype.cleanValue=function(t){var e;return"string"===typeof t&&(t=t.replace(null!=(e=this.format.radix)?e:".","<radix>"),t=t.replace(/[.,]/g,""),t=t.replace("<radix>","."),t=parseFloat(t,10)||0),T(t,this.format.precision)},t.prototype.bindTransitionEnd=function(){var t,e,n,i,a,o,r=this;if(!this.transitionEndBound){for(this.transitionEndBound=!0,e=!1,a=y.split(" "),o=[],n=0,i=a.length;n<i;n++)t=a[n],o.push(this.el.addEventListener(t,function(){return!!e||(e=!0,setTimeout(function(){return r.render(),e=!1,E(r.el,"odometerdone")},0),!0)},!1));return o}},t.prototype.resetFormat=function(){var t,e,n,i,a,o,s,c;if(t=null!=(s=this.options.format)?s:r,t||(t="d"),n=l.exec(t),!n)throw new Error("Odometer: Unparsable digit format");return c=n.slice(1,4),o=c[0],a=c[1],e=c[2],i=(null!=e?e.length:void 0)||0,this.format={repeating:o,radix:a,precision:i}},t.prototype.render=function(t){var e,n,i,a,o,r,s;for(null==t&&(t=this.value),this.stopWatchingMutations(),this.resetFormat(),this.inside.innerHTML="",o=this.options.theme,e=this.el.className.split(" "),a=[],r=0,s=e.length;r<s;r++)n=e[r],n.length&&((i=/^odometer-theme-(.+)$/.exec(n))?o=i[1]:/^odometer(-|$)/.test(n)||a.push(n));return a.push("odometer"),w||a.push("odometer-no-transitions"),o?a.push("odometer-theme-"+o):a.push("odometer-auto-theme"),this.el.className=a.join(" "),this.ribbons={},this.formatDigits(t),this.startWatchingMutations()},t.prototype.formatDigits=function(t){var e,n,i,a,o,r,s,c,u,d;if(this.digits=[],this.options.formatFunction)for(i=this.options.formatFunction(t),u=i.split("").reverse(),o=0,s=u.length;o<s;o++)n=u[o],n.match(/0-9/)?(e=this.renderDigit(),e.querySelector(".odometer-value").innerHTML=n,this.digits.push(e),this.insertDigit(e)):this.addSpacer(n);else for(a=!this.format.precision||!S(t)||!1,d=t.toString().split("").reverse(),r=0,c=d.length;r<c;r++)e=d[r],"."===e&&(a=!0),this.addDigit(e,a)},t.prototype.update=function(t){var e,n=this;if(t=this.cleanValue(t),e=t-this.value)return _(this.el,"odometer-animating-up odometer-animating-down odometer-animating"),C(this.el,e>0?"odometer-animating-up":"odometer-animating-down"),this.stopWatchingMutations(),this.animate(t),this.startWatchingMutations(),setTimeout(function(){return n.el.offsetHeight,C(n.el,"odometer-animating")},0),this.value=t},t.prototype.renderDigit=function(){return M(s)},t.prototype.insertDigit=function(t,e){return null!=e?this.inside.insertBefore(t,e):this.inside.children.length?this.inside.insertBefore(t,this.inside.children[0]):this.inside.appendChild(t)},t.prototype.addSpacer=function(t,e,n){var i;return i=M(d),i.innerHTML=t,n&&C(i,n),this.insertDigit(i,e)},t.prototype.addDigit=function(t,e){var n,i,a,o;if(null==e&&(e=!0),"-"===t)return this.addSpacer(t,null,"odometer-negation-mark");if("."===t)return this.addSpacer(null!=(o=this.format.radix)?o:".",null,"odometer-radix-mark");if(e){a=!1;while(1){if(!this.format.repeating.length){if(a)throw new Error("Bad odometer format without digits");this.resetFormat(),a=!0}if(n=this.format.repeating[this.format.repeating.length-1],this.format.repeating=this.format.repeating.substring(0,this.format.repeating.length-1),"d"===n)break;this.addSpacer(n)}}return i=this.renderDigit(),i.querySelector(".odometer-value").innerHTML=t,this.digits.push(i),this.insertDigit(i)},t.prototype.animate=function(t){return w&&"count"!==this.options.animation?this.animateSlide(t):this.animateCount(t)},t.prototype.animateCount=function(t){var e,n,i,a,r,s=this;if(n=+t-this.value)return a=i=x(),e=this.value,(r=function(){var c,u,d;return x()-a>s.options.duration?(s.value=t,s.render(),void E(s.el,"odometerdone")):(c=x()-i,c>o&&(i=x(),d=c/s.options.duration,u=n*d,e+=u,s.render(Math.round(e))),null!=D?D(r):setTimeout(r,o))})()},t.prototype.getDigitCount=function(){var t,e,n,i,a,o;for(i=1<=arguments.length?N.call(arguments,0):[],t=a=0,o=i.length;a<o;t=++a)n=i[t],i[t]=Math.abs(n);return e=Math.max.apply(Math,i),Math.ceil(Math.log(e+1)/Math.log(10))},t.prototype.getFractionalDigitCount=function(){var t,e,n,i,a,o,r;for(a=1<=arguments.length?N.call(arguments,0):[],e=/^\-?\d*\.(\d*?)0*$/,t=o=0,r=a.length;o<r;t=++o)i=a[t],a[t]=i.toString(),n=e.exec(a[t]),a[t]=null==n?0:n[1].length;return Math.max.apply(Math,a)},t.prototype.resetDigits=function(){return this.digits=[],this.ribbons=[],this.inside.innerHTML="",this.resetFormat()},t.prototype.animateSlide=function(t){var e,n,i,a,o,r,s,u,d,l,h,m,p,f,g,v,y,w,b,M,S,x,_,D,T,G,E;if(v=this.value,u=this.getFractionalDigitCount(v,t),u&&(t*=Math.pow(10,u),v*=Math.pow(10,u)),i=t-v){for(this.bindTransitionEnd(),a=this.getDigitCount(v,t),o=[],e=0,h=b=0;0<=a?b<a:b>a;h=0<=a?++b:--b){if(y=F(v/Math.pow(10,a-h-1)),s=F(t/Math.pow(10,a-h-1)),r=s-y,Math.abs(r)>this.MAX_VALUES){l=[],m=r/(this.MAX_VALUES+this.MAX_VALUES*e*c),n=y;while(r>0&&n<s||r<0&&n>s)l.push(Math.round(n)),n+=m;l[l.length-1]!==s&&l.push(s),e++}else l=function(){E=[];for(var t=y;y<=s?t<=s:t>=s;y<=s?t++:t--)E.push(t);return E}.apply(this);for(h=M=0,x=l.length;M<x;h=++M)d=l[h],l[h]=Math.abs(d%10);o.push(l)}for(this.resetDigits(),G=o.reverse(),h=S=0,_=G.length;S<_;h=++S)for(l=G[h],this.digits[h]||this.addDigit(" ",h>=u),null==(w=this.ribbons)[h]&&(w[h]=this.digits[h].querySelector(".odometer-ribbon-inner")),this.ribbons[h].innerHTML="",i<0&&(l=l.reverse()),p=T=0,D=l.length;T<D;p=++T)d=l[p],g=document.createElement("div"),g.className="odometer-value",g.innerHTML=d,this.ribbons[h].appendChild(g),p===l.length-1&&C(g,"odometer-last-value"),0===p&&C(g,"odometer-first-value");return y<0&&this.addDigit("-"),f=this.inside.querySelector(".odometer-radix-mark"),null!=f&&f.parent.removeChild(f),u?this.addSpacer(this.format.radix,this.digits[u-1],"odometer-radix-mark"):void 0}},t}(),g.options=null!=(j=window.odometerOptions)?j:{},setTimeout(function(){var t,e,n,i,a;if(window.odometerOptions){for(t in i=window.odometerOptions,a=[],i)e=i[t],a.push(null!=(n=g.options)[t]?(n=g.options)[t]:n[t]=e);return a}},0),g.init=function(){var t,e,n,i,a,o;if(null!=document.querySelectorAll){for(e=document.querySelectorAll(g.options.selector||".odometer"),o=[],n=0,i=e.length;n<i;n++)t=e[n],o.push(t.odometer=new g({el:t,value:null!=(a=t.innerText)?a:t.textContent}));return o}},null!=(null!=(L=document.documentElement)?L.doScroll:void 0)&&null!=document.createEventObject?(k=document.onreadystatechange,document.onreadystatechange=function(){return"complete"===document.readyState&&!1!==g.options.auto&&g.init(),null!=k?k.apply(this,arguments):void 0}):document.addEventListener("DOMContentLoaded",function(){if(!1!==g.options.auto)return g.init()},!1),i=[],a=function(){return g}.apply(e,i),void 0===a||(t.exports=a)}).call(this)},acab:function(t,e,n){!function(e,i){t.exports=i(n("a933"))}("undefined"!=typeof self&&self,function(t){return function(t){function e(i){if(n[i])return n[i].exports;var a=n[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),a=n.n(i),o=n(4),r=n.n(o),s={__odometer__:r.a,name:"IOdometer",props:{value:{type:Number,required:!1,default:0},format:{type:String,required:!1},theme:{type:String,required:!1,default:"default"},duration:{type:Number,required:!1},animation:{type:String,required:!1},formatFunction:{type:Function,required:!1}},data:function(){return{instance:null}},watch:{value:{handler:function(t){var e=this;e.instance&&a()(e.instance.update)&&e.instance.update(t)},deep:!1}},methods:{auto:function(){"undefined"!=typeof window&&(window.odometerOptions?window.odometerOptions.auto=!1:window.odometerOptions={auto:!1})},init:function(){var t=this;if(!t.instance){t.auto();var e=t.$el,n=new r.a({el:e,value:t.value,format:t.format,theme:t.theme,duration:t.duration,animation:t.animation,formatFunction:t.formatFunction});n.render(),t.$emit("ready",n,r.a),t.instance=n}},uninit:function(){this.instance=null},renderInside:function(){var t=this;t.instance&&a()(t.instance.renderInside)&&t.instance.renderInside()},watchForMutations:function(){var t=this;t.instance&&a()(t.instance.watchForMutations)&&t.instance.watchForMutations()},startWatchingMutations:function(){var t=this;t.instance&&a()(t.instance.startWatchingMutations)&&t.instance.startWatchingMutations()},stopWatchingMutations:function(){var t=this;t.instance&&a()(t.instance.stopWatchingMutations)&&t.instance.stopWatchingMutations()},cleanValue:function(t){var e=this;e.instance&&a()(e.instance.cleanValue)&&e.instance.cleanValue(t)},bindTransitionEnd:function(){var t=this;t.instance&&a()(t.instance.bindTransitionEnd)&&t.instance.bindTransitionEnd()},resetFormat:function(){var t=this;t.instance&&a()(t.instance.resetFormat)&&t.instance.resetFormat()},renderDigit:function(){var t=this;t.instance&&a()(t.instance.renderDigit)&&t.instance.renderDigit()},formatDigits:function(t){var e=this;e.instance&&a()(e.instance.formatDigits)&&e.instance.formatDigits(t)},insertDigit:function(t,e){var n=this;n.instance&&a()(n.instance.insertDigit)&&n.instance.insertDigit(t,e)},addDigit:function(t,e){var n=this;n.instance&&a()(n.instance.addDigit)&&n.instance.addDigit(t,e)},addSpacer:function(t,e,n){var i=this;i.instance&&a()(i.instance.addSpacer)&&i.instance.addSpacer(t,e,n)},animate:function(t){var e=this;e.instance&&a()(e.instance.animate)&&e.instance.animate(t)},animateCount:function(t){var e=this;e.instance&&a()(e.instance.animateCount)&&e.instance.animateCount(t)},getDigitCount:function(){var t=this;t.instance&&a()(t.instance.getDigitCount)&&t.instance.getDigitCount()},getFractionalDigitCount:function(){var t=this;t.instance&&a()(t.instance.getFractionalDigitCount)&&t.instance.getFractionalDigitCount()},resetDigits:function(){var t=this;t.instance&&a()(t.instance.resetDigits)&&t.instance.resetDigits()},animateSlide:function(t){var e=this;e.instance&&a()(e.instance.animateSlide)&&e.instance.animateSlide(t)},render:function(t){var e=this;e.instance&&a()(e.instance.render)&&e.instance.render(t)},update:function(t){var e=this;e.instance&&a()(e.instance.update)&&e.instance.update(t)}},mounted:function(){this.init()},beforeDestroy:function(){this.uninit()},render:function(t){return t("span",{})}};e.default=s},function(t,e,n){function i(t){if(!o(t))return!1;var e=a(t);return e==s||e==c||e==r||e==u}var a=n(2),o=n(3),r="[object AsyncFunction]",s="[object Function]",c="[object GeneratorFunction]",u="[object Proxy]";t.exports=i},function(t,e){function n(t){return a.call(t)}var i=Object.prototype,a=i.toString;t.exports=n},function(t,e){function n(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}t.exports=n},function(e,n){e.exports=t}])})},cd1c:function(t,e,n){var i=n("e853");t.exports=function(t,e){return new(i(t))(e)}},e853:function(t,e,n){var i=n("d3f4"),a=n("1169"),o=n("2b4c")("species");t.exports=function(t){var e;return a(t)&&(e=t.constructor,"function"!=typeof e||e!==Array&&!a(e.prototype)||(e=void 0),i(e)&&(e=e[o],null===e&&(e=void 0))),void 0===e?Array:e}}}]);
//# sourceMappingURL=chunk-a5539d50.6f287c11.js.map