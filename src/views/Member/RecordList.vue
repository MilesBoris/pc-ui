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
        <router-link
          :to="{name:'RecordList'}"
          class="active"
        >分红记录</router-link>
        <router-link :to="{name:'AgentCashList'}">分红提现记录</router-link>
        <router-link :to="{name:'AgentCoinList'}">分红钱包日志</router-link>
      </div>
      <div
        class="coin-list"
        style="margin-top: 20px;"
      >
        <Row>
          <Col span="4">
          <DatePicker @on-change="select" type="daterange" placement="bottom-start" placeholder="起止时间" style="width:200px;"></DatePicker>
          </Col>
          <Col span="8" style="margin-left:60px;">
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
  name: "Coinlist",
  mixins: [listMixin],
  data() {
    return {
      columns: [
        {
          title: "分红时间",
          key: "createTimeStr",
          align: "center",
          width: 160
        },
        {
          title: "分红金额",
          key: "rakebackAmount",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("span", {}, params.row.rakebackAmount / 100.0);
          }
        },
        {
          title: "输赢总额",
          key: "betAmount",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("span", {}, params.row.betAmount / 100.0);
          }
        },
        {
          title: "统计开始时间",
          key: "startTimeStr",
          align: "center",
          width: 160
        },
        {
          title: "统计截止时间",
          key: "endTimeStr",
          align: "center",
          width: 160
        },
        {
          title: "状态",
          key: "stateStr",
          align: "center"
        }
      ],
      initData: {
        total: 0
      },
      searchVM: {
        gameCompanyId: "", //资金类型
        memberName: "",
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
    },
    mUsername() {
      if (!!this.$route.query.username) {
        this.searchVM.memberName = this.$route.query.username;
      }
    }
  },
  created() {
    this.mUsername();
    this.mPullData();
  }
};
</script>
<style scoped>
.ivu-row {
  height: 50px;
}
</style>
