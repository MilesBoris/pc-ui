<template>
  <div
    class="container user_con"
    style="margin-top: 72px;"
  >
    <div class="user_left fl">
      <ul>
        <li>
          <router-link :to="{name:'UserCenter'}">个人资料</router-link>
        </li>
        <li>
          <router-link :to="{name:'SafePassword'}">安全管理</router-link>
        </li>
        <li>
          <router-link :to="{name:'FinanceCenter'}">财务中心</router-link>
        </li>
        <li>
          <router-link :to="{name:'ReportTransfer'}">客户报表</router-link>
        </li>
        <li>
          <router-link :to="{name:'AgentThat'}">代理管理</router-link>
        </li>
        <li class="active">
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
        <router-link :to="{name:'MembermanAgement'}">代理报表</router-link>
        <!--<router-link :to="{name:'SubordinaterEportforms'}">下级报表</router-link>-->
        <router-link :to="{name:'BettingDetailList'}">投注明细</router-link>
        <router-link :to="{name:'TransactionsDetaiLlist'}">交易明细</router-link>
        <router-link :to="{name:'RecordList'}">分红记录</router-link>
        <router-link :to="{name:'AgentCashList'}">分红提现记录</router-link>
        <router-link :to="{name:'AgentCoinList'}" class="active">分红钱包日志</router-link>
      </div>
      <div
        class="coin-list"
        style="margin-top: 20px;"
      >
        <Row>
          <Col span="5">
          <DatePicker
            @on-change="select"
            type="daterange"
            placement="bottom-start"
            placeholder="起止时间"
            style="width:200px;"
          ></DatePicker>
          </Col>
          <Col span="4" style="margin-left: 30px">
          <!-- <Select v-model="searchVM.actionType">
            <Option v-for="item in actionTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select> -->
          <Select v-model="searchVM.actionType" placeholder="资金类型">
            <Option value="-1">所有</Option>
            <Option  v-for="item in actionTypes" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
          </Col>
          <Col
            span="3"
            style="margin-left:30px;"
          >
          <Button
            type="warning"
            @click="mSearch(1)"
          >搜索</Button>
          </Col>
        </Row>
        <Row>
          <Table
            :columns="columns"
            :data="dataList"
            height="500"
          ></Table>
          <Page
            class-name="text-center"
            @on-page-size-change="mHandleSizeChange"
            @on-change="mHandleCurrentChange"
            :total="initData.total"
            :page-size="searchVM.rows"
            show-total
          ></Page>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
import listMixin from "@/mixins/list";
export default {
  name: "AgentCoinList",
  mixins: [listMixin],
  data() {
    return {
      columns: [
        {
          title: "会员姓名",
          key: "name",
          align: "center",
          width: 90
        },
        {
          title: "操作时间",
          key: "createTimeStr",
          align: "center",
          width: 160
        },
        {
          title: "操作前资金",
          key: "beforeAmount",
          align: "center",
          render: (h, params) => {
            return h("span", {}, params.row.beforeAmount / 100.0);
          }
        },
        {
          title: "操作资金",
          key: "amount",
          align: "center",
          render: (h, params) => {
            return h("span", {}, params.row.amount / 100.0);
          }
        },
        {
          title: "操作后资金",
          key: "afterAmount",
          align: "center",
          render: (h, params) => {
            return h("span", {}, params.row.afterAmount / 100.0);
          }
        },
        {
          title: "操作说明",
          key: "info",
          align: "center"
        },
        {
          title: "资金类型",
          key: "actionTypeStr",
          align: "center"
        }
      ],
      initData: {
        total: 0
      },
      searchVM: {
        actionType: 0, //操作类型：1充值，2提现，3管理员操作，4活动
        startDate: "", //查询起始时间
        endDate: "", //查询结束时间
        orderBy: "id desc",
        rows: 10
      },
      dataList: [],
      actionTypes: [
        { value: 0, label: "不限类型" },
        { value: 1, label: "充值" },
        { value: 2, label: "提现" },
        { value: 3, label: "管理员操作" },
        { value: 4, label: "活动" }
      ]
    };
  },
  mounted() {},
  methods: {
    select(v) {
      this.searchVM.startDate = v[0];
      this.searchVM.endDate = v[1];
    },
    mInit() {
      this.$http.get("/agentUser/queryagentcoinlogindex.json").then(result => {
        if (result.code == 0) {
          this.initData.actionTypes = result.data.actionTypes;
          this.mSearch(1);
        }
      });
    },
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/agentUser/agentcoinlist.json", params).then(result => {
        if (result.code == 0) {
          this.initData.total = result.total;
          this.dataList = !!result.rows ? result.rows : [];
        }
      });
    }
  },
  created() {
    this.mInit();
    this.mPullData();
  }
};
</script>
<style scoped>
.ivu-row {
  height: 50px;
}
</style>
