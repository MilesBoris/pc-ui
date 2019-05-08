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
            <router-link :to="{name:'RechargeList'}">存款记录</router-link>
            <router-link :to="{name:'CashList'}" class="active">取款记录</router-link>
            <router-link :to="{name:'GameBetRecord'}">游戏记录</router-link>
            <router-link :to="{name:'CoinList'}">资金明细</router-link>
            <router-link :to="{name:'RakebackRecord'}">
                反水记录
            </router-link>
        </div>
        <div class="cash-list" style="margin-top:20px;">
            <Row>
            <Col span="4">
            <DatePicker @on-change="select" type="daterange" placement="bottom-start" placeholder="起止时间" style="width:200px;"></DatePicker>
            </Col>
            <Col span="4" style="margin-left:60px">
            <Select v-model="searchVM.state" placeholder="提款状态">
                <Option value="-1">所有</Option>
                <Option v-for="(item,i) in initData.drawStates" :key="i" :value="item.id" :selected="item.id==searchVM.finalState">{{item.value}}</Option>
            </Select>
            </Col>
            <Col span="4" style="margin-left:10px">
            <Select v-model="searchVM.bankType" placeholder="提款银行">
                <Option value="-1">所有</Option>
                <Option v-for="(item,i) in initData.bankTypes" :key="i" :value="item.id">{{item.bankName}}</Option>
            </Select>
            </Col>
            <Col span="4" style="margin-left:10px">
            <Select v-model="searchVM.drawType" placeholder="提款类型">
                <Option value="-1">所有</Option>
                <Option v-for="(item,i) in initData.drawTypes" :key="i" :value="item.id">{{item.value}}</Option>
            </Select>
            </Col>
            <Col span="4" style="margin-left:10px">
            <Select v-model="searchVM.remitType" placeholder="汇款类型">
                <Option value="-1">所有</Option>
                <Option v-for="(item,i) in initData.remitTypes" :key="i" :value="item.id">{{item.value}}</Option>
            </Select>
            </Col>
            <Col span="1" style="margin-left:10px">
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
  name: "CashList",
  mixins: [listMixin],
  data() {
    return {
      columns: [
        {
          title: "ID",
          align: "center",
          key: "id",
          width: 100
        },
        {
          title: "提款状态",
          align: "center",
          key: "state",
          width: 100,
          render: (h, params) => {
            let tmpStr = "";
            if (params.row.state == 0) {
              tmpStr = "申请中";
            } else if (params.row.state == 1) {
              tmpStr = "已通过";
            } else if (params.row.state == 2) {
              tmpStr = "不通过";
            } else if (params.row.state == 3) {
              tmpStr = "已打款";
            } else if (params.row.state == 4) {
              tmpStr = "拒绝打款";
            } else {
              tmpStr = "自动汇款中";
            }
            return h(
              "span",
              {
                style: {
                  color:
                    params.row.state == 0
                      ? "#545454"
                      : params.row.state == 1
                        ? "#green"
                        : params.row.state == 2
                          ? "red"
                          : params.row.state == 3 ? "#545454" : "#ccc"
                }
              },
              tmpStr
            );
          }
        },
        {
          title: "提款银行",
          align: "center",
          key: "memberAccountTypeStr",
          width: 100
        },
        {
          title: "取款类型",
          align: "center",
          key: "drawTypeStr",
          width: 100
        },
        {
          title: "汇款类型",
          align: "center",
          key: "remitTypeStr",
          width: 100
        },
        {
          title: "提现金额",
          align: "center",
          key: "drawAmount",
          width: 100,
          render: (h, params) => {
            return h("span", {}, params.row.drawAmount / 100.0);
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
          title: "实际金额",
          align: "center",
          key: "realAmount",
          width: 100,
          render: (h, params) => {
            return h("span", {}, params.row.realAmount / 100.0);
          }
        },
        {
          title: "打码量",
          align: "center",
          key: "gameAmount",
          width: 100,
          render: (h, params) => {
            return h("span", {}, params.row.gameAmount / 100.0);
          }
        },
        {
          title: "充值总额",
          align: "center",
          key: "rechargeAmount",
          width: 100,
          render: (h, params) => {
            return h("span", {}, params.row.rechargeAmount / 100.0);
          }
        },
        {
          title: "提款账号",
          align: "center",
          key: "memberAccount",
          width: 200
        },
        {
          title: "提款时间",
          align: "center",
          key: "createTimeStr",
          width: 200
        },
        {
          title: "备注",
          align: "center",
          key: "remark",
          width: 200
        }
      ],
      initData: {
        drawStates: [],
        drawTypes: [],
        remitTypes: [],
        bankTypes: [],
        total: 0
      },
      searchVM: {
        drawType: "", //汇款类型
        remitType: "", //提款类型
        bankType: "", //提款银行
        startTime: "", //查询起始时间
        endTime: "", //查询结束时间
        state: "", //状态
        orderBy: "id desc",
        rows: 10
      },
      dataList: [],
      agnetLevel: ""
    };
  },
  mounted() {
    // setTimeout(() => {
    //   // 初始化日期选择控件
    //   $("#datepicker").datepicker({
    //     todayBtn: "linked", //显示今天按钮
    //     clearBtn: true, //显示清除按钮
    //     language: "zh-CN", //语言本地化
    //     orientation: "bottom auto", //显示位置
    //     autoclose: true, //自动关闭
    //     todayHighlight: true, //高亮今天
    //     format: "yyyy-mm-dd", //格式
    //     weekStart: 0 //星期的开始：周末
    //   });
    // }, 500);
    this.mLoading(true);
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.agnetLevel = result.data.agnetLevel;
      }
    });
  },
  mounted(){
    this.mInit();
  },
  methods: {
    select(v) {
      this.searchVM.startTime = v[0];
      this.searchVM.endTime = v[1];
    },
    mInit() {
      this.$http.post("/memberCoin/cashindex.json",{lineCountry:this.sysInfo.lineCountry}).then(result => {
        if (result.code == 0) {
          this.initData.drawStates = result.data.drawStates;
          this.initData.drawTypes = result.data.drawTypes;
          this.initData.remitTypes = result.data.remitTypes;
          this.initData.bankTypes = result.data.bankTypes;
          this.mSearch(1);
        }
      });
    },
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/memberCoin/cashlist.json", params).then(result => {
        console.log(result);
        if (result.code == 0) {
          this.initData.total = result.total;
          this.dataList = !!result.rows ? result.rows : [];
        }
      });
    }
    // mStateLabel(state) {
    //   if (state == 0) {
    //     return "<span>申请中</span>";
    //   } else if (state == 1) {
    //     return '<span style="color: green;">已通过</span>';
    //   } else if (state == 2) {
    //     return '<span style="color: red;">不通过</span>';
    //   } else if (state == 3) {
    //     return "<span>待汇款</span>";
    //   } else if (state == 4) {
    //     return '<span style="color: #ccc;">自动汇款中</span>';
    //   }
    // }
  },
  created() {
    // this.mInit();
  }
};
</script>
<style>
.ivu-row {
  height: 50px;
}
</style>
