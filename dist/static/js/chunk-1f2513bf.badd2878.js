(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f2513bf"],{"0d8b":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container user_con",staticStyle:{"margin-top":"72px"}},[n("div",{staticClass:"user_left fl"},[n("ul",[n("li",[n("router-link",{attrs:{to:{name:"UserCenter"}}},[t._v("个人资料")])],1),n("li",[n("router-link",{attrs:{to:{name:"SafePassword"}}},[t._v("安全管理")])],1),n("li",[n("router-link",{attrs:{to:{name:"FinanceCenter"}}},[t._v("财务中心")])],1),n("li",[n("router-link",{attrs:{to:{name:"ReportTransfer"}}},[t._v("客户报表")])],1),t.agnetLevel>0?n("li",[n("router-link",{attrs:{to:{name:"AgentThat"}}},[t._v("代理管理")])],1):t._e(),t.agnetLevel>0?n("li",[n("router-link",{attrs:{to:{name:"MembermanAgement"}}},[t._v("代理报表")])],1):t._e(),n("li",{staticClass:"active"},[n("router-link",{attrs:{to:{name:"ServiceCenter"}}},[t._v("服务中心")])],1),n("li",[n("router-link",{attrs:{to:{name:"ConversionRecord"}}},[t._v("商城中心")])],1)])]),n("div",{staticClass:"user_right "},[n("div",{staticClass:"userbasic_head"},[n("router-link",{staticClass:"active",attrs:{to:{name:"ServiceCenter"}}},[t._v("公告信息")]),n("router-link",{attrs:{to:{name:"ComplaintProposal"}}},[t._v("投诉建议")])],1),n("div",{staticClass:"userbasic_body"},[n("ul",{staticClass:"noticeList"},t._l(t.cGongGaos,function(e,a){return n("li",{key:a,staticClass:"active"},[n("h5",{domProps:{textContent:t._s(e.title)}}),n("p",{domProps:{textContent:t._s(e.content)}})])}))])])])},r=[],s={name:"ServiceCenter",data:function(){return{agnetLevel:""}},mounted:function(){var t=this;this.mLoading(!0),this.$http.get("/memberUser/memberinfo.json").then(function(e){0==e.code&&(t.agnetLevel=e.data.agnetLevel)})},computed:{cGongGaos:function(){return this.$store.getters.getGonggaos}}},i=s,o=(n("8fa6"),n("2877")),l=Object(o["a"])(i,a,r,!1,null,null,null);l.options.__file="ServiceCenter.vue";e["default"]=l.exports},2336:function(t,e,n){},"8fa6":function(t,e,n){"use strict";var a=n("2336"),r=n.n(a);r.a}}]);
//# sourceMappingURL=chunk-1f2513bf.badd2878.js.map