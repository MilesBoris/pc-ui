(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8c91a384"],{2113:function(t,e,s){"use strict";var a=s("8cf8"),n=s.n(a);n.a},7950:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container user_con",staticStyle:{"margin-top":"72px"}},[s("div",{staticClass:"user_left fl"},[s("ul",[s("li",{staticClass:"active"},[s("router-link",{attrs:{to:{name:"UserCenter"}}},[t._v("个人资料")])],1),s("li",[s("router-link",{attrs:{to:{name:"SafePassword"}}},[t._v("安全管理")])],1),s("li",[s("router-link",{attrs:{to:{name:"FinanceCenter"}}},[t._v("财务中心")])],1),s("li",[s("router-link",{attrs:{to:{name:"ReportTransfer"}}},[t._v("客户报表")])],1),t.agnetLevel>0?s("li",[s("router-link",{attrs:{to:{name:"AgentThat"}}},[t._v("代理管理")])],1):t._e(),t.agnetLevel>0?s("li",[s("router-link",{attrs:{to:{name:"MembermanAgement"}}},[t._v("代理报表")])],1):t._e(),s("li",[s("router-link",{attrs:{to:{name:"ServiceCenter"}}},[t._v("服务中心")])],1),s("li",[s("router-link",{attrs:{to:{name:"ConversionRecord"}}},[t._v("商城中心")])],1)])]),s("div",{staticClass:"user_right "},[s("div",{staticClass:"userbasic_head"},[s("router-link",{attrs:{to:{name:"UserCenter"}}},[t._v("基本信息")]),s("router-link",{staticClass:"active",attrs:{to:{name:"DeliveryAdd"}}},[t._v("收货信息")]),s("router-link",{attrs:{to:{name:"BankLoad"}}},[t._v("银行资料")]),s("router-link",{attrs:{to:{name:"MessageList"}}},[t._v("站内消息")])],1),s("div",{staticClass:"userbasic_body"},[s("div",{staticClass:"line_form"},[s("form",[s("div",{staticClass:"line"},[s("span",{staticClass:"tit"},[t._v("收货人姓名")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.vm.memberName,expression:"vm.memberName"}],ref:"oldPass",staticClass:"inp",attrs:{placeholder:"请输入收货人姓名"},domProps:{value:t.vm.memberName},on:{input:function(e){e.target.composing||t.$set(t.vm,"memberName",e.target.value)}}}),t._m(0)]),s("div",{staticClass:"line"},[s("span",{staticClass:"tit"},[t._v("手机号码")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.vm.phone,expression:"vm.phone"}],ref:"newPass",staticClass:"inp",attrs:{placeholder:"请输入手机号码"},domProps:{value:t.vm.phone},on:{input:function(e){e.target.composing||t.$set(t.vm,"phone",e.target.value)}}}),t._m(1)]),s("div",{staticClass:"line"},[s("span",{staticClass:"tit"},[t._v("收货地址")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.vm.address,expression:"vm.address"}],ref:"truePass",staticClass:"inp",attrs:{placeholder:"请输入收货地址"},domProps:{value:t.vm.address},on:{input:function(e){e.target.composing||t.$set(t.vm,"address",e.target.value)}}}),t._m(2)]),s("div",{staticClass:"line"},[s("span",{staticClass:"tit"}),s("Button",{staticClass:"ajax-submit-btn account_save",attrs:{type:"error"},on:{click:t.mSaveAdd}},[t._v("保 存")])],1)])])])])])},n=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"tips"},[s("span",{staticClass:"themeCr"},[t._v("*")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"tips"},[s("span",{staticClass:"themeCr"},[t._v("*")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("span",{staticClass:"tips"},[s("span",{staticClass:"themeCr"},[t._v("*")])])}],i=s("faab"),r={name:"BankLoad",mixins:[i["a"]],data:function(){return{vm:{},agnetLevel:""}},mounted:function(){var t=this;this.mInit(),this.mLoading(!0),this.$http.get("/memberUser/memberinfo.json").then(function(e){0==e.code&&(t.agnetLevel=e.data.agnetLevel)})},methods:{mInit:function(){var t=this;this.$http.get("/memberUser/getMemberAddress.json").then(function(e){0==e.code&&(t.vm=e.data?e.data:{},t.vm.id?t.isDoing=!0:t.isDoing=!1)})},mSaveAdd:function(){var t=this;if(this.isDoing)return this.mAlert("如需修改，请联系客服！",function(){}),this.mInit();this.vm.memberName?this.vm.phone?this.vm.address?(this.isDoing=!0,this.mLoading(!0),this.$http.post("/memberUser/saveMemberAddress.json",this.vm).then(function(e){t.isDoing=!1,t.mLoading(!1),0==e.code?(t.mAlert("恭喜，设置成功！",function(){}),t.mInit()):t.mAlert(e.message,function(){})})):this.mAlert("收货地址 必填！",function(){}):this.mAlert("收货人电话 必填！",function(){}):this.mAlert("收货人姓名 必填！",function(){})}}},o=r,m=(s("2113"),s("2877")),l=Object(m["a"])(o,a,n,!1,null,null,null);l.options.__file="DeliveryAdd.vue";e["default"]=l.exports},"8cf8":function(t,e,s){}}]);
//# sourceMappingURL=chunk-8c91a384.1b95d1f6.js.map