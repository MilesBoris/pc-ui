(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b602188"],{5540:function(s,t,a){"use strict";var e=a("d69e"),i=a.n(e);i.a},9974:function(s,t,a){"use strict";a.r(t);var e=function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"container user_con",staticStyle:{"margin-top":"72px"}},[a("div",{staticClass:"user_left fl"},[a("ul",[a("li",[a("router-link",{attrs:{to:{name:"UserCenter"}}},[s._v("个人资料\n                    ")])],1),a("li",{staticClass:"active"},[a("router-link",{attrs:{to:{name:"SafePassword"}}},[s._v("安全管理\n                    ")])],1),a("li",[a("router-link",{attrs:{to:{name:"FinanceCenter"}}},[s._v("财务中心\n                    ")])],1),a("li",[a("router-link",{attrs:{to:{name:"ReportTransfer"}}},[s._v("客户报表")])],1),s.agnetLevel>0?a("li",[a("router-link",{attrs:{to:{name:"AgentThat"}}},[s._v("代理管理")])],1):s._e(),s.agnetLevel>0?a("li",[a("router-link",{attrs:{to:{name:"MembermanAgement"}}},[s._v("代理报表")])],1):s._e(),a("li",[a("router-link",{attrs:{to:{name:"ServiceCenter"}}},[s._v("服务中心")])],1),a("li",[a("router-link",{attrs:{to:{name:"ConversionRecord"}}},[s._v("商城中心")])],1)])]),a("div",{staticClass:"user_right "},[a("div",{staticClass:"userbasic_head"},[a("router-link",{staticClass:"active",attrs:{to:{name:"SafePassword"}}},[s._v("取款密码")]),a("router-link",{attrs:{to:{name:"LoginPassword"}}},[s._v("登陆密码")])],1),""==s.coinPassword?a("div",{staticClass:"userbasic_body"},[a("div",{staticClass:"bank_tips"},[s._v("温馨提示：请牢记您设置的取款密码。")]),a("div",{staticClass:"line_form"},[a("form",[a("div",{staticClass:"line"},[a("span",{staticClass:"tit"},[s._v("新密码")]),a("input",{directives:[{name:"model",rawName:"v-model",value:s.vm.password,expression:"vm.password"}],staticClass:"inp",domProps:{value:s.vm.password},on:{input:function(t){t.target.composing||s.$set(s.vm,"password",t.target.value)}}}),s._m(0)]),a("div",{staticClass:"line"},[a("span",{staticClass:"tit"},[s._v("确认密码")]),a("input",{directives:[{name:"model",rawName:"v-model",value:s.vm.truePassword,expression:"vm.truePassword"}],staticClass:"inp",domProps:{value:s.vm.truePassword},on:{input:function(t){t.target.composing||s.$set(s.vm,"truePassword",t.target.value)}}}),s._m(1)]),a("div",{staticClass:"line"},[a("span",{staticClass:"tit"}),a("button",{staticClass:"ajax-submit-btn account_save",attrs:{type:"button"},on:{click:s.mNewPswSave}},[s._v("确定")])])])])]):a("div",{staticClass:"userbasic_body"},[a("div",{staticClass:"bank_tips"},[s._v("温馨提示：修改后请牢记您的取款密码。")]),a("div",{staticClass:"line_form"},[a("form",[a("div",{staticClass:"line"},[a("span",{staticClass:"tit"},[s._v("原密码")]),a("input",{directives:[{name:"model",rawName:"v-model",value:s.vm.oldPass,expression:"vm.oldPass"}],ref:"oldPass",staticClass:"inp",attrs:{placeholder:"请输入原始密码"},domProps:{value:s.vm.oldPass},on:{input:function(t){t.target.composing||s.$set(s.vm,"oldPass",t.target.value)}}}),s._m(2)]),a("div",{staticClass:"line"},[a("span",{staticClass:"tit"},[s._v("新密码")]),a("input",{directives:[{name:"model",rawName:"v-model",value:s.vm.newPass,expression:"vm.newPass"}],ref:"newPass",staticClass:"inp",attrs:{placeholder:"请输入新的资金密码"},domProps:{value:s.vm.newPass},on:{input:function(t){t.target.composing||s.$set(s.vm,"newPass",t.target.value)}}}),s._m(3)]),a("div",{staticClass:"line"},[a("span",{staticClass:"tit"},[s._v("确认密码")]),a("input",{directives:[{name:"model",rawName:"v-model",value:s.vm.truePass,expression:"vm.truePass"}],ref:"truePass",staticClass:"inp",attrs:{placeholder:"请再次输入新的资金密码"},domProps:{value:s.vm.truePass},on:{input:function(t){t.target.composing||s.$set(s.vm,"truePass",t.target.value)}}}),s._m(4)]),a("div",{staticClass:"line"},[a("span",{staticClass:"tit"}),a("button",{staticClass:"ajax-submit-btn account_save",attrs:{type:"button"},on:{click:s.mSave}},[s._v("确定")])])])])])])])},i=[function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("span",{staticClass:"tips"},[a("span",{staticClass:"themeCr"},[s._v("*")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("span",{staticClass:"tips"},[a("span",{staticClass:"themeCr"},[s._v("*")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("span",{staticClass:"tips"},[a("span",{staticClass:"themeCr"},[s._v("*")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("span",{staticClass:"tips"},[a("span",{staticClass:"themeCr"},[s._v("*")])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("span",{staticClass:"tips"},[a("span",{staticClass:"themeCr"},[s._v("*")])])}],n={name:"SafePassword",data:function(){return{data:"",vm:{password:"",truePassword:""},edit:{oldPass:"",newPass:"",truePass:""},agnetLevel:"",coinPassword:""}},mounted:function(){var s=this;this.mLoading(!0),this.$http.get("/memberUser/memberinfo.json").then(function(t){0==t.code&&(s.agnetLevel=t.data.agnetLevel,s.coinPassword=t.data.coinPassword)}),this.mInit()},methods:{mInit:function(){var s=this;this.mLoading(!0),this.$http.get("/memberUser/membercoin.json").then(function(t){console.log(t.data),-1==t.data&&(s.data=t.data,s.mAlert("请先设置资金密码",function(){}))})},mNewPswSave:function(){var s=this;""!=this.vm.password?""!=this.vm.truePassword?this.vm.truePassword==this.vm.password?6==this.vm.password.length?(this.mLoading(!0),this.$http.post("/memberUser/setcoinpass.json",{newPass:this.vm.password}).then(function(t){s.mLoading(!1),console.log(t),0==t.code&&(s.mAlert("操作成功",function(){}),s.mInit())})):this.mAlert("请输入正确的6位数资金密码！"):this.mAlert("两次输入的密码不一致！"):this.mAlert("请再次输入资金密码！"):this.mAlert("请输入资金密码！")},mSave:function(){var s=this;""!=this.vm.oldPass?""!=this.vm.newPass?this.vm.truePass==this.vm.newPass?6==this.vm.newPass.length?(this.mLoading(!0),this.$http.post("/memberUser/updatecoinpass.json",this.vm).then(function(t){s.mLoading(!1),0==t.code?s.mAlert("修改成功！",function(){s.vm={}},"success"):s.mAlert(t.message,function(){},"error")})):this.mAlert("请输入正确的6位数资金密码！"):this.mAlert("两次输入的密码不一致",null,"warning"):this.mAlert("请输入新的资金密码",null,"warning"):this.mAlert("请输入原资金密码",null,"warning")}}},r=n,o=(a("5540"),a("2877")),l=Object(o["a"])(r,e,i,!1,null,null,null);l.options.__file="SafePassword.vue";t["default"]=l.exports},d69e:function(s,t,a){}}]);
//# sourceMappingURL=chunk-6b602188.33040c51.js.map