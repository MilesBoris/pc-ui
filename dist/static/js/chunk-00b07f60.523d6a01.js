(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00b07f60"],{2972:function(t,a,e){},5176:function(t,a,e){t.exports=e("51b6")},7693:function(t,a,e){"use strict";var n=e("2972"),s=e.n(n);s.a},"863c":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container user_con",staticStyle:{"margin-top":"72px"}},[e("div",{staticClass:"user_left fl"},[e("ul",[e("li",[e("router-link",{attrs:{to:{name:"UserCenter"}}},[t._v("个人资料")])],1),e("li",[e("router-link",{attrs:{to:{name:"SafePassword"}}},[t._v("安全管理")])],1),e("li",[e("router-link",{attrs:{to:{name:"FinanceCenter"}}},[t._v("财务中心")])],1),e("li",[e("router-link",{attrs:{to:{name:"ReportTransfer"}}},[t._v("客户报表")])],1),e("li",{staticClass:"active"},[e("router-link",{attrs:{to:{name:"AgentThat"}}},[t._v("代理管理")])],1),e("li",[e("router-link",{attrs:{to:{name:"MembermanAgement"}}},[t._v("代理报表")])],1),e("li",[e("router-link",{attrs:{to:{name:"ServiceCenter"}}},[t._v("服务中心")])],1),e("li",[e("router-link",{attrs:{to:{name:"ConversionRecord"}}},[t._v("商城中心")])],1)])]),e("div",{staticClass:"user_right"},[e("div",{staticClass:"userbasic_head"},[e("router-link",{attrs:{to:{name:"AgentThat"}}},[t._v("代理说明")]),e("router-link",{attrs:{to:{name:"AgentrEportforms"}}},[t._v("会员管理")]),e("router-link",{attrs:{to:{name:"OpenAccounts"}}},[t._v("下级开户")]),e("router-link",{attrs:{to:{name:"OpenInvitation"}}},[t._v("推广链接")]),e("router-link",{attrs:{to:{name:"LinkManagement"}}},[t._v("链接管理")]),e("router-link",{staticClass:"active",attrs:{to:{name:"AgentDrawing"}}},[t._v("分红提现")])],1),e("div",{staticClass:"userbasic_body"},[e("div",{staticClass:"line_form"},[e("form",{attrs:{action:"#",method:"post"}},[e("div",{staticClass:"line"},[e("span",{staticClass:"tit"},[t._v("分红钱包余额")]),e("span",[e("Tag",{attrs:{type:"border"}},[t._v(t._s(t.cAgentCashBalance))])],1)]),e("div",{staticClass:"line"},[e("span",{staticClass:"tit"},[t._v("开户姓名")]),e("span",[t._v(t._s(t.vmCard.drawAccountName))])]),e("div",{staticClass:"line"},[e("span",{staticClass:"tit"},[t._v("收款银行")]),e("span",[t._v(t._s(t.vmCard.bankTypeName))])]),e("div",{staticClass:"line"},[e("span",{staticClass:"tit"},[t._v("银行账号")]),e("span",[t._v(t._s(t.vmCard.account))])]),e("div",{staticClass:"line"},[e("span",{staticClass:"tit"},[t._v("开户行网点")]),e("span",[t._v(t._s(t.vmCard.drawAddress))])]),t.cAgentCashBalance>0?e("div",{staticClass:"line"},[e("span",{staticClass:"tit"},[t._v("提款金额")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.vm.dealcoin,expression:"vm.dealcoin"}],staticClass:"inp",attrs:{type:"text",disabled:t.cAgentCashBalance<=0,placeholder:"输入提款金额(最低100)"},domProps:{value:t.vm.dealcoin},on:{input:function(a){a.target.composing||t.$set(t.vm,"dealcoin",a.target.value)}}}),e("span",{staticClass:"tips error-tips"},[t._v("提款金额不能少于100元")])]):t._e(),t.cAgentCashBalance>0?e("div",{staticClass:"line"},[e("span",{staticClass:"tit"},[t._v("取款密码")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.vm.coinpwd,expression:"vm.coinpwd"}],staticClass:"inp",attrs:{type:"password",disabled:t.cAgentCashBalance<=0,placeholder:"请输入支付密码",maxlength:"6"},domProps:{value:t.vm.coinpwd},on:{input:function(a){a.target.composing||t.$set(t.vm,"coinpwd",a.target.value)}}})]):t._e(),t.cAgentCashBalance>0?e("div",{staticClass:"line"},[e("span",{staticClass:"tit"}),e("button",{staticClass:"ajax-submit-without-confirm-btn account_save",attrs:{type:"button",disabled:t.cAgentCashBalance<=0},on:{click:t.mSave}},[t._v("确定")])]):t._e(),t.cAgentCashBalance<=0?e("div",{staticClass:"line"},[e("span",{staticClass:"tit"}),e("span",{staticClass:"tips error-tips"},[t._v("分红钱包余额暂不支持取现")])]):t._e()])])])])])},s=[],i=e("5176"),r=e.n(i),c=e("faab"),l={name:"MemberDrawing",mixins:[c["a"]],data:function(){return{vmCard:{drawAccountName:"",drawAccountType:"",account:"",drawAddress:"",bankTypeName:"",agentCashBalance:0},vm:{dealcoin:"",coinpwd:""}}},computed:{cAgentCashBalance:function(){var t=this.vmCard.agentCashBalance/100;return t||0}},mounted:function(){this.mInit()},methods:{mInit:function(){var t=this;this.mLoading(!0),this.$http.all([this.mGetAgentCashBalance(),this.mGetBindBank()]).then(this.$http.spread(function(a,n){-1==a.data?t.mAlert("请先设置资金密码",function(){t.$router.push({name:"SafePassword"})}):-2==a.data?t.mAlert("请先绑定银行卡",function(){t.mWinOpen("新增银行卡",function(){return e.e("chunk-e6bc9fa4").then(e.bind(null,"7f6b"))},{},600)}):t.vmCard.agentCashBalance=a.data,0==n.code&&(t.vmCard=r()(t.vmCard,n.data)),t.mLoading(!1)}))},mGetAgentCashBalance:function(){return this.$http.get("/agentUser/agentCashBalance.json")},mGetBindBank:function(){return this.$http.get("/memberUser/getbindbank.json")},mSave:function(){var t=this;if(""!=this.vm.dealcoin)if(this.vm.dealcoin<1)this.mAlert("取现金额必须大于1元");else if(""!=this.vm.coinpwd)if(this.vm.dealcoin>this.cAgentCashBalance)this.mAlert("余额不足");else{this.mLoading(!0);var a=r()({},this.vm);this.$http.post("/agentUser/agentcash.json",a).then(function(a){t.mLoading(!1),0==a.code?0==a.data?t.mAlert("提现成功"):1==a.data?t.mAlert("请先设置资金密码",function(){t.$router.push({name:"SafePassword"})}):2==a.data&&t.mAlert("请先绑定银行卡",function(){t.mWinOpen("新增银行卡",function(){return e.e("chunk-e6bc9fa4").then(e.bind(null,"7f6b"))},{},600)}):t.mAlert(a.message)})}else this.mAlert("请输入资金密码");else this.mAlert("取现金额不能为空")}}},o=l,m=(e("7693"),e("2877")),d=Object(m["a"])(o,n,s,!1,null,null,null);d.options.__file="AgentDrawing.vue";a["default"]=d.exports}}]);
//# sourceMappingURL=chunk-00b07f60.523d6a01.js.map