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
        <!--<router-link :to="{name:'SubordinaterEportforms'}" class="active">下级报表</router-link>-->
        <router-link :to="{name:'BettingDetailList'}">投注明细</router-link>
        <router-link :to="{name:'TransactionsDetaiLlist'}">交易明细</router-link>
        <router-link :to="{name:'RecordList'}">分红记录</router-link>
        <router-link :to="{name:'AgentCashList'}">分红提现记录</router-link>
        <router-link :to="{name:'AgentCoinList'}">分红钱包日志</router-link>
      </div>
      <div
        class="coin-list"
        style="margin-top: 20px;"
      >
        <Row>
          <Col span="4">
          <DatePicker
            @on-change="select"
            type="daterange"
            placement="bottom-start"
            placeholder="起止时间"
            style="width:200px;"
          ></DatePicker>
          </Col>
          <Col
            span="4"
            style="margin-left:15px;"
          >
          <Select
            v-model="searchVM.timeType"
            placeholder="时间段"
          >
            <Option value="1">今天</Option>
            <Option value="2">昨天</Option>
            <Option value="3">本月</Option>
            <Option value="4">上个月</Option>
          </Select>
          </Col>
          <Col
            span="8"
            style="margin-left:15px;"
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
  mixins: [listMixin],
  data() {
    return {
      columns: [
        {
          title: "用户名",
          key: "username"
        },
        {
          title: "用户类型",
          key: "memberTypeStr"
        },
        {
          title: "团队分红金额",
          align: "center",
          key: "allrakebackAmount",
          render: (h, params) => {
            return h("span", {}, params.row.allrakebackAmount / 100.0);
          }
        },
        {
          title: "个人分红金额",
          align: "center",
          key: "rakebackAmount",
          render: (h, params) => {
            return h("span", {}, params.row.rakebackAmount / 100.0);
          }
        },
        {
          title: "投注人数",
          align: "center",
          key: "betMembers"
        },
        {
          title: "投注金额",
          align: "center",
          key: "allBetAmount",

          render: (h, params) => {
            return h("span", {}, params.row.allBetAmount / 100.0);
          }
        },
        {
          title: "输赢金额",
          align: "center",
          key: "allProfitAmount",

          render: (h, params) => {
            return h("span", {}, params.row.allProfitAmount / 100.0);
          }
        }
      ],
      initData: {
        total: 0
      },
      searchVM: {
        timeType: "",
        startTime: "", //查询起始时间
        endTime: "", //查询结束时间
        orderBy: "id desc",
        rows: 10
      },
      dataList: []
    };
  },
  mounted() {},
  methods: {
    select(v) {
      this.searchVM.startTime = v[0];
      this.searchVM.endTime = v[1];
    },
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/agentUser/rakeback.json", params).then(result => {
        if (result.code == 0) {
          this.initData.total = result.data.total;
          this.dataList = !!result.data.list ? result.data.list : [];
        }
      });
    }
  },
  created() {
    this.mPullData();
  }
};
</script>
<style scoped>
.ivu-row {
  height: 50px;
}
</style>
