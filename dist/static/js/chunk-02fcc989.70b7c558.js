(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02fcc989"],{"146c":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container user_con",staticStyle:{"margin-top":"72px"}},[e("div",{staticClass:"user_left fl"},[e("ul",[e("li",[e("router-link",{attrs:{to:{name:"UserCenter"}}},[t._v("个人资料\n                    ")])],1),e("li",[e("router-link",{attrs:{to:{name:"SafePassword"}}},[t._v("安全管理\n                    ")])],1),e("li",{staticClass:"active"},[e("router-link",{attrs:{to:{name:"FinanceCenter"}}},[t._v("财务中心\n                    ")])],1),e("li",[e("router-link",{attrs:{to:{name:"ReportTransfer"}}},[t._v("客户报表")])],1),t.agnetLevel>0?e("li",[e("router-link",{attrs:{to:{name:"AgentThat"}}},[t._v("代理管理")])],1):t._e(),t.agnetLevel>0?e("li",[e("router-link",{attrs:{to:{name:"MembermanAgement"}}},[t._v("代理报表")])],1):t._e(),e("li",[e("router-link",{attrs:{to:{name:"ServiceCenter"}}},[t._v("服务中心")])],1),e("li",[e("router-link",{attrs:{to:{name:"ConversionRecord"}}},[t._v("商城中心")])],1)])]),e("div",{staticClass:"user_right "},[e("div",{staticClass:"userbasic_head"},[e("router-link",{attrs:{to:{name:"FinanceCenter"}}},[t._v("会员存款")]),e("router-link",{attrs:{to:{name:"FinanceOfflineDeposit"}}},[t._v("线下存款")]),e("router-link",{attrs:{to:{name:"MemberDrawing"}}},[t._v("会员提款")]),e("router-link",{staticClass:"active",attrs:{to:{name:"IndoorTransfer"}}},[t._v("户内转账")])],1),e("div",{staticClass:"userbasic_body"},[e("form",[e("div",{staticClass:"bank_tips"},[t._v("温馨提示：查询时，请点击游戏厅刷新额度")]),e("div",{staticClass:"indoor_line"},[t._m(0),e("ul",{staticClass:"gameroom_list indoor_toplist"},[e("li",[e("p",{staticClass:"transfer_tit"},[t._v(" 主账户额度")]),e("p",{staticClass:"name"},[t._v("￥"),e("span",{staticClass:"pos",domProps:{textContent:t._s(t.amount/100)}}),t._v(" 元")]),e("em")]),e("input",{attrs:{type:"hidden",name:"account1",value:"1"}})])]),e("div",{staticClass:"indoor_line"},[t._m(1),e("ul",{staticClass:"gameroom_list game_platform"},[t._l(t.walletlist,function(a){return a.gameCompanyId>0?e("li",{key:a.gameCompanyId,staticClass:"hasnotinfo",staticStyle:{"list-style":"none"},on:{click:function(e){t.gameCompanyId=a.gameCompanyId}}},[e("p",{staticClass:"name api_name"},[t._v(t._s(a.gameCompanyName)+" "),-1!=a.coin?e("span",{staticClass:"pos"},[t._v(t._s(a.coin/100))]):t._e(),e("a",{staticClass:"refresh",on:{click:function(e){t.mGetCoin(a)}}})]),e("em")]):t._e()}),e("input",{attrs:{type:"hidden",name:"account1",value:"1"}})],2),0==t.walletlist.length?e("div",{staticClass:"demo-spin-container",staticStyle:{width:"100%",height:"150px"},attrs:{relative:""}},[e("Spin",{attrs:{fix:""}})],1):t._e()]),e("div",{staticClass:"indoor_line"},[t._m(2),e("div",{staticClass:"line_form"},[e("div",{staticClass:"line"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.vm.dealCoin,expression:"vm.dealCoin"}],staticClass:"inp",attrs:{type:"number",step:"1",min:"1"},domProps:{value:t.vm.dealCoin},on:{input:function(a){a.target.composing||t.$set(t.vm,"dealCoin",a.target.value)}}}),t._m(3)]),e("div",{staticClass:"line"},[e("button",{staticClass:"account_save",attrs:{type:"button"},on:{click:t.mSave}},[t._v("转入游戏平台")]),e("button",{staticClass:"indoor_main",staticStyle:{"margin-left":"15px"},attrs:{type:"button"},on:{click:t.mSaveOut}},[t._v("转出游戏平台")]),e("input",{attrs:{type:"hidden",name:"transfer_type",value:"0"}})])])])])])]),e("remote-script",{attrs:{src:"/static/js/indoortransfer.js"}})],1)},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("h3",[e("span",{staticClass:"tit"},[t._v("选择账户")]),e("span",{staticClass:"themeCr"})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("h3",[e("span",{staticClass:"tit"},[t._v("选择游戏平台")]),e("span",{staticClass:"themeCr"})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("h3",[e("span",{staticClass:"tit"},[t._v("转账额度")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("span",{staticClass:"tips"},[e("span",{staticClass:"themeCr"}),t._v("元")])}],s=(e("ac6a"),{name:"IndoorTransfer",data:function(){return{walletlist:[],amount:0,wallet:"",gameCompanyId:"",vm:{walletIn:"",walletOut:"",dealCoin:""},agnetLevel:"",loading:!1}},mounted:function(){var t=this;this.mLoading(!0),this.$http.get("/memberUser/memberinfo.json").then(function(a){0==a.code&&(t.agnetLevel=a.data.agnetLevel)}),this.mGetCoins(),this.mMemberAmount()},methods:{mGetCoins:function(){var t=this;this.$http.post("/managerGame/getWalletCoins.json").then(function(a){t.walletlist=a.data.walletlist}).catch(function(a){t.mAlert("获取余额失败")})},mGetCoin:function(t){var a=this;this.mLoading(!0),this.$http.get("/managerGame/getWalletCoin.json?id="+t.gameCompanyId).then(function(e){0==e.code&&e.data>0&&a.walletlist.forEach(function(a){a.gameCompanyId==t.gameCompanyId&&(a.coin=e.data)}),a.mLoading(!1)}).catch(function(t){a.mAlert("获取余额失败")})},mMemberAmount:function(){var t=this;this.cNeedLogin||this.$http.post("/memberUser/memberamount.json").then(function(a){0==a.code&&(t.amount=a.data)})},mSave:function(){var t=this;this.loading||(""==this.gameCompanyId||this.gameCompanyId<=0?this.mAlert("请选择要操作的钱包"):this.vm.dealCoin<1?this.mAlert("转账金额必须大于1元"):this.vm.dealCoin%1==0?(this.gameCompanyId>0&&(this.vm.walletIn=this.gameCompanyId,this.vm.walletOut=0),this.mLoading(!0),this.loading=!0,this.$http.post("/managerGame/wallettransfer.json",this.vm).then(function(a){t.mLoading(!1),t.loading=!1,0==a.code?(1==a.data?(t.mRefreshAccountInfo(),t.mAlert("操作成功",function(){})):a.data<0?t.mAlert("记录转账记录失败",function(){}):2==a.data?t.mAlert("操作中心账户失败",function(){}):3==a.data?t.mAlert("游戏厅操作失败",function(){}):4==a.data&&t.mAlert("游戏厅未返回，请联系客服",function(){}),t.mGetCoins(),t.mMemberAmount()):t.mAlert(a.message,function(){})})):this.mAlert("请输入整数"))},mSaveOut:function(){var t=this;this.loading||(""==this.gameCompanyId||this.gameCompanyId<=0?this.mAlert("请选择要操作的钱包"):this.vm.dealCoin<1?this.mAlert("转账金额必须大于1元"):(this.gameCompanyId>0&&(this.vm.walletIn=0,this.vm.walletOut=this.gameCompanyId),this.mLoading(!0),this.loading=!0,this.$http.post("/managerGame/wallettransfer.json",this.vm).then(function(a){t.loading=!1,t.mLoading(!1),0==a.code?(1==a.data?(t.mRefreshAccountInfo(),t.mAlert("操作成功",function(){})):a.data<0?t.mAlert("记录转账记录失败",function(){}):1==a.data?t.mAlert("操作成功",function(){t.mGetCoins()}):2==a.data?t.mAlert("操作中心账户失败",function(){}):3==a.data?t.mAlert("游戏厅操作失败",function(){}):4==a.data&&t.mAlert("游戏厅未返回，请联系客服",function(){}),t.mGetCoins(),t.mMemberAmount()):t.mAlert(a.message,function(){})})))}}}),o=s,l=(e("29ba"),e("2877")),r=Object(l["a"])(o,n,i,!1,null,null,null);r.options.__file="IndoorTransfer.vue";a["default"]=r.exports},"24d4":function(t,a,e){},"29ba":function(t,a,e){"use strict";var n=e("24d4"),i=e.n(n);i.a}}]);
//# sourceMappingURL=chunk-02fcc989.70b7c558.js.map