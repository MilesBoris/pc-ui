(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0af0a905"],{5176:function(t,e,a){t.exports=a("51b6")},"55c3":function(t,e,a){"use strict";var n={methods:{mSearch:function(t){this.mLoading(!0),t&&(this.searchVM.page=t),this.searchVM.page||(this.searchVM.page=1),this.searchVM.start=(this.searchVM.page-1)*this.searchVM.rows,this.searchVM.limit=this.searchVM.rows,this.mPullData()},mHandleSizeChange:function(t){t&&(this.searchVM.rows=t,this.mSearch(1))},mHandleCurrentChange:function(t){this.mSearch(t)}}};e["a"]=n},"7d15":function(t,e,a){},b361:function(t,e,a){"use strict";var n=a("7d15"),r=a.n(n);r.a},dbf9:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container user_con",staticStyle:{"margin-top":"72px"}},[a("div",{staticClass:"user_left fl"},[a("ul",[a("li",[a("router-link",{attrs:{to:{name:"UserCenter"}}},[t._v("个人资料\n                ")])],1),a("li",[a("router-link",{attrs:{to:{name:"SafePassword"}}},[t._v("安全管理\n                ")])],1),a("li",[a("router-link",{attrs:{to:{name:"FinanceCenter"}}},[t._v("财务中心\n                ")])],1),a("li",{staticClass:"active"},[a("router-link",{attrs:{to:{name:"ReportTransfer"}}},[t._v("客户报表")])],1),t.agnetLevel>0?a("li",[a("router-link",{attrs:{to:{name:"AgentThat"}}},[t._v("代理管理")])],1):t._e(),t.agnetLevel>0?a("li",[a("router-link",{attrs:{to:{name:"MembermanAgement"}}},[t._v("代理报表")])],1):t._e(),a("li",[a("router-link",{attrs:{to:{name:"ServiceCenter"}}},[t._v("服务中心")])],1),a("li",[a("router-link",{attrs:{to:{name:"ConversionRecord"}}},[t._v("商城中心")])],1)])]),a("div",{staticClass:"user_right "},[a("div",{staticClass:"userbasic_head"},[a("router-link",{staticClass:"active",attrs:{to:{name:"ReportTransfer"}}},[t._v("转账记录")]),a("router-link",{attrs:{to:{name:"RechargeList"}}},[t._v("存款记录")]),a("router-link",{attrs:{to:{name:"CashList"}}},[t._v("取款记录")]),a("router-link",{attrs:{to:{name:"GameBetRecord"}}},[t._v("游戏记录")]),a("router-link",{attrs:{to:{name:"CoinList"}}},[t._v("资金明细")]),a("router-link",{attrs:{to:{name:"RakebackRecord"}}},[t._v("\n                反水记录\n            ")])],1),a("div",{staticClass:"coin-list",staticStyle:{"margin-top":"20px"}},[a("Row",[a("Col",{attrs:{span:"5"}},[a("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"daterange",placement:"bottom-start",placeholder:"起止时间"},on:{"on-change":t.select}})],1),a("Col",{staticStyle:{"margin-left":"15px"},attrs:{span:"4"}},[a("Select",{attrs:{placeholder:"转账类型"},model:{value:t.searchVM.transType,callback:function(e){t.$set(t.searchVM,"transType",e)},expression:"searchVM.transType"}},[a("Option",{attrs:{value:"-1"}},[t._v("所有")]),t._l(t.initData.actionTypes,function(e,n){return a("Option",{key:n,attrs:{value:e.id}},[t._v(t._s(e.value))])})],2)],1),a("Col",{staticStyle:{"margin-left":"15px"},attrs:{span:"4"}},[a("Select",{attrs:{placeholder:"完成状态"},model:{value:t.searchVM.finalState,callback:function(e){t.$set(t.searchVM,"finalState",e)},expression:"searchVM.finalState"}},[a("Option",{attrs:{value:"-1"}},[t._v("所有")]),t._l(t.initData.finalStates,function(e,n){return a("Option",{key:n,attrs:{value:e.id}},[t._v(t._s(e.value))])})],2)],1),a("Col",{staticStyle:{"margin-left":"15px"},attrs:{span:"8"}},[a("Button",{attrs:{type:"warning"},on:{click:function(e){t.mSearch(1)}}},[t._v("搜索")])],1)],1),a("Row",[a("Table",{attrs:{height:"550",columns:t.columns,data:t.dataList}}),a("Page",{attrs:{"class-name":"text-center",total:t.initData.total,"page-size":t.searchVM.rows,"show-total":""},on:{"on-page-size-change":t.mHandleSizeChange,"on-change":t.mHandleCurrentChange}})],1)],1)])])},r=[],i=a("5176"),s=a.n(i),o=a("55c3"),l={name:"Coinlist",mixins:[o["a"]],data:function(){return{columns:[{title:"交易编号",align:"center",key:"transNo",width:200},{title:"交易类型",align:"center",key:"transTypeStr",width:100},{title:"操作金额",align:"center",key:"transferAmount",width:100,render:function(t,e){return t("span",{},e.row.transferAmount/100)}},{title:"转账前",align:"center",key:"beforeTransfer",width:100,render:function(t,e){return t("span",{},e.row.beforeTransfer/100)}},{title:"转账后",align:"center",key:"afterTransfer",width:100,render:function(t,e){return t("span",{},e.row.afterTransfer/100)}},{title:"完成状态",align:"center",key:"finalStateStr",width:100},{title:"游戏厅",align:"center",key:"gameName",width:100},{title:"本地状态",align:"center",key:"localStateStr",width:100},{title:"游戏厅状态",align:"center",key:"finalStateStr",width:100},{title:"时间",align:"center",key:"createTimeStr",width:200}],initData:{actionTypes:[],finalStatesp:[],total:0},searchVM:{finalState:"",transType:"",startTime:"",endTime:"",orderBy:"id desc",rows:10},dataList:[],agnetLevel:""}},mounted:function(){var t=this;this.mLoading(!0),this.$http.get("/memberUser/memberinfo.json").then(function(e){0==e.code&&(t.agnetLevel=e.data.agnetLevel)})},methods:{select:function(t){this.searchVM.startTime=t[0],this.searchVM.endTime=t[1]},mInit:function(){var t=this;this.$http.get("/memberCoin/coinTransfer.json").then(function(e){0==e.code&&(t.initData.actionTypes=e.data.transTypeList,t.initData.finalStates=e.data.stateList,t.mSearch(1))})},mPullData:function(){var t=this;this.mLoading(!0);var e=s()({},this.searchVM);this.$http.post("/memberCoin/queryTransfer.json",e).then(function(e){0==e.code&&(t.initData.total=e.total,t.dataList=e.rows?e.rows:[])})}},created:function(){this.mInit()}},c=l,h=(a("b361"),a("2877")),u=Object(h["a"])(c,n,r,!1,null,"3471b9cc",null);u.options.__file="ReportTransfer.vue";e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-0af0a905.eb287639.js.map