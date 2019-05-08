<template>
    <div class="container user_con" style="margin-top: 72px;">
    <div class="user_left fl">
        <ul>
            <li>
                <router-link :to="{name:'UserCenter'}">个人资料
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'SafePassword'}">安全管理
                </router-link>
            </li>
            <li>
                <router-link :to="{name:'FinanceCenter'}">财务中心
                </router-link>
            </li>
            <li class="active">
                <router-link :to="{name:'ReportTransfer'}">客户报表</router-link>
            </li>
            <li v-if="agnetLevel>0">
                <router-link :to="{name:'AgentThat'}">代理管理</router-link>
            </li>
            <li v-if="agnetLevel>0">
                <router-link :to="{name:'MembermanAgement'}">代理报表</router-link>
            </li>
            <li>
                <router-link :to="{name:'ServiceCenter'}">服务中心</router-link>
            </li>
            <li>
                <router-link :to="{name:'ConversionRecord'}">商城中心</router-link>
            </li>
        </ul>
    </div>
    <div class="user_right ">
        <div class="userbasic_head">
            <router-link :to="{name:'ReportTransfer'}">转账记录</router-link>
            <router-link :to="{name:'RechargeList'}" class="active">存款记录</router-link>
            <router-link :to="{name:'CashList'}">取款记录</router-link>
            <router-link :to="{name:'GameBetRecord'}">游戏记录</router-link>
            <router-link :to="{name:'CoinList'}">资金明细</router-link>
            <router-link :to="{name:'RakebackRecord'}">
                反水记录
            </router-link>
        </div>
        <div class="recharge-list"  style="margin-top: 20px;">
            <Row>
            <Col span="4">
            <DatePicker @on-change="select" type="daterange" placement="bottom-start" placeholder="起止时间" style="width:200px;"></DatePicker>
            </Col>
            <Col span="4"  style="margin-left:60px;">
            <Select v-model="searchVM.state" placeholder="完成状态">
                <Option value="">所有</Option>
                <Option v-for="(item,i) in initData.depositStates" :key="i" :value="item.id" :selected="item.id==searchVM.finalState">{{item.value}}</Option>
            </Select>
            </Col>
            <Col span="4"  style="margin-left:15px;">
            <Select v-model="searchVM.depositType" placeholder="充值方式">
                <Option value="">所有</Option>
                <Option v-for="(item,i) in initData.depositTypes" :key="i" :value="item.id">{{item.value}}</Option>
            </Select>
            </Col>
            <Col span="4"  style="margin-left:15px;">
            <Select v-model="searchVM.activeType" placeholder="活动类型">
                <Option value="">所有</Option>
                <Option v-for="(item,i) in initData.activeTypes" :key="i" :value="item.id">{{item.value}}</Option>
            </Select>
            </Col>
            <Col span="4"  style="margin-left:15px;">
            <Button type="warning" @click="mSearch(1)">搜索</Button>
            </Col>

            </Row>
            <Row>
            <Table :columns="columns" :data="dataList"></Table>
            <Page class-name="text-center" @on-page-size-change="mHandleSizeChange" @on-change="mHandleCurrentChange" :total="initData.total"
                    :page-size="searchVM.rows" show-total></Page>
            </Row>
        </div>
    </div>
</div>
</template>
<script>
import listMixin from "@/mixins/list";
export default {
  name: "rechargeList",
  mixins: [listMixin],
  data() {
    return {
      columns: [
        {
          title: "ID",
          align: "center",
          key: "id",
          fixed: "left",
          width: 100
        },
        {
          title: "交易号",
          align: "center",
          key: "transTypeStr",
          width: 200
        },
        {
          title: "充值状态",
          align: "center",
          key: "depositStateStr",
          width: 100
          // render: (h, params) => {
          //   let tmpStr = "";
          //   if (params.row.depositStateStr == "上分成功") {
          //     tmpStr = "成功";
          //   } else {
          //     tmpStr = "失败";
          //   }
          //   return h(
          //     "span",
          //     {
          //       style: {
          //         color:
          //           params.row.depositStateStr == "上分成功"
          //             ? "green"
          //             : "#ed3f14"
          //       }
          //     },
          //     tmpStr
          //   );
          // }
        },
        {
          title: "充值类型",
          align: "center",
          key: "depositTypeStr",
          width: 100
        },
        {
          title: "充值金额",
          align: "center",
          key: "depositAmount",
          width: 100,
          render: (h, params) => {
            return h("span", {}, params.row.depositAmount / 100.0);
          }
        },
        {
          title: "手续费",
          align: "center",
          key: "commissionAmount",
          width: 100,
          render: (h, params) => {
            return h("span", {}, params.row.commissionAmount / 100.0);
          }
        },
        {
          title: "赠送金额",
          align: "center",
          key: "benefitAmount",
          width: 100,
          render: (h, params) => {
            return h("span", {}, params.row.benefitAmount / 100.0);
          }
        },
        {
          title: "实际金额",
          align: "center",
          key: "realAmount",
          width: 100,
          render: (h, params) => {
            return h("span", {}, params.row.realAmount / 100.0);
          }
        },
        {
          title: "充值时间",
          align: "center",
          key: "createTimeStr",
          width: 150
        },
        {
          title: "支付时间",
          align: "center",
          key: "payTimeStr",
          width: 150
        },
        {
          title: "备注",
          align: "center",
          key: "remark",
          width: 150
        }
        // {
        //   title: "解锁状态",
        //   key: "benefitState",
        //   width: 100,
        //   render: (h, params) => {
        //     let tmpStr = "";
        //     if (params.row.benefitState == 0) {
        //       tmpStr = "无活动";
        //     } else if (params.row.benefitState == 1) {
        //       tmpStr = "打码中";
        //     } else if (params.row.benefitState == 2) {
        //       tmpStr = "可解锁";
        //     } else if (params.row.benefitState == 3) {
        //       tmpStr = "已结算";
        //     } else {
        //       tmpStr = "已过期";
        //     }
        //     return h(
        //       "span",
        //       {
        //         style: {
        //           color:
        //             params.row.benefitState == 0
        //               ? "#545454"
        //               : params.row.benefitState == 1
        //                 ? "#19be6b"
        //                 : params.row.benefitState == 2
        //                   ? "green"
        //                   : params.row.benefitState == 3 ? "#19be6b" : "#f00"
        //         }
        //       },
        //       tmpStr
        //     );
        //   }
        // },
        // {
        //   title: "操作",
        //   key: "benefitState",
        //   fixed: "right",
        //   width: 100,
        //   render: (h, params) => {
        //     let tmpStr = "";
        //     if (params.row.benefitState == 0) {
        //       tmpStr = "无活动";
        //     } else if (params.row.benefitState == 1) {
        //       tmpStr = "打码中";
        //     } else if (params.row.benefitState == 2) {
        //       tmpStr = "可解锁";
        //     } else if (params.row.benefitState == 3) {
        //       tmpStr = "已结算";
        //     } else {
        //       tmpStr = "已过期";
        //     }
        //     return h(
        //       "span",
        //       {
        //         on: {
        //           click: () => {
        //             mUnLock(params.row);
        //           }
        //         },
        //         style: {
        //           color:
        //             params.row.benefitState == 0
        //               ? "#545454"
        //               : params.row.benefitState == 1
        //                 ? "#19be6b"
        //                 : params.row.benefitState == 2
        //                   ? "green"
        //                   : params.row.benefitState == 3 ? "#19be6b" : "#f00"
        //         }
        //       },
        //       tmpStr
        //     );
        //   }
        //}
      ],
      initData: {
        depositStates: [],
        depositTypes: [],
        activeTypes: [],
        total: 0
      },
      searchVM: {
        depositType: "", //充值类型
        activeType: "", //活动类型
        startTime: "", //查询起始时间
        endTime: "", //查询结束时间
        state: "", //状态
        tradeNo: "", //交易单号
        orderBy: "id desc",
        rows: 10
      },
      dataList: [],
      agnetLevel: ""
    };
  },
  mounted() {
    /*  setTimeout(() => {
      // 初始化日期选择控件
      $("#datepicker").datetimepicker({
        todayBtn: "linked", //显示今天按钮
        clearBtn: true, //显示清除按钮
        language: "zh-CN", //语言本地化
        orientation: "bottom auto", //显示位置
        autoclose: true, //自动关闭
        todayHighlight: true, //高亮今天
        format: "yyyy-mm-dd hh:ii:ss", //格式
        weekStart: 0 //星期的开始：周末
      });
      $(".form_datetime").datetimepicker({ format: "yyyy-mm-dd hh:ii" });
    }, 500); */
    this.mLoading(true);
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.agnetLevel = result.data.agnetLevel;
      }
    });
  },
  methods: {
    select(v) {
      this.searchVM.startTime = v[0];
      this.searchVM.endTime = v[1];
    },
    mInit() {
      this.$http.get("/memberCoin/rechargeindex.json").then(result => {
        console.log(result);
        if (result.code == 0) {
          this.initData.depositStates = result.data.depositStates;
          this.initData.depositTypes = result.data.depositTypes;
          this.initData.activeTypes = result.data.activeTypes;
          this.mSearch(1);
        }
      });
    },
    mPullData() {
      this.mLoading(true);
      var params = {};
      for (const key in this.searchVM) {
        if (this.searchVM.hasOwnProperty(key)) {
          var value = this.searchVM[key];
          if (key == "stime" && value != "") {
            value += " 00:00:00";
          }
          if (key == "etime" && value != "") {
            value += " 23:59:59";
          }
          if (value != null) params[key] = value.toString();
        }
      }
      this.$http.post("/memberCoin/rechargelist.json", params).then(result => {
        if (result) {
          this.initData.total = result.total;
          this.dataList = !!result.rows ? result.rows : [];
        } else {
          this.mAlert("数据检索错误！");
        }
        this.mLoading(false);
      });
    },
    mUnLock(obj) {
      this.mLoading(true);
      this.$http
        .post("/memberCoin/unlockAmount.json?id=" + obj.id, {})
        .then(result => {
          this.mLoading(false);
          if (result.code == 0) {
            this.mAlert("操作成功", () => {
              this.mSearch(this.pagination.page);
            });
          } else {
            this.mAlert(result.message, () => {});
          }
        });
    },
    mFirstDepositLabel(state) {
      if (state == 0) {
        return "否";
      } else if (state == 1) {
        return '<span style="color: green;">是</span>';
      }
    }
    // mBenefitStateLabel(state) {
    //   if (state == 0) {
    //     return "无活动";
    //   } else if (state == 1) {
    //     return "打码中";
    //   } else if (state == 2) {
    //     return '<span style="color: green;">可解锁</span>';
    //   } else if (state == 3) {
    //     return "<span>已结算</span>";
    //   } else if (state == 4) {
    //     return '<span style="color: #f00;">已过期</span>';
    //   }
    // }
  },
  created() {
    this.mInit();
  }
};
</script>

<style scoped>
.ivu-table-cell {
  padding-right: 0px;
}
.ivu-row {
  height: 50px;
}
</style>
