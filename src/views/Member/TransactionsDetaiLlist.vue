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
        <router-link
          :to="{name:'TransactionsDetaiLlist'}"
          class="active"
        >交易明细</router-link>
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
            style="margin-left:60px;"
          >
          <Input
            v-model="searchVM.merberName"
            placeholder="请输入用户名"
            style="width: 180px"
          />
          </Col>
          <Col
            span="4"
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
            height="500"
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
  name: "Coinlist",
  mixins: [listMixin],
  data() {
    return {
      columns: [
        {
          title: "用户名",
          key: "username",
          width: 150
        },
        {
          title: "操作时间",
          align: "center",
          key: "createTimeStr",
          width: 150
        },
        {
          title: "资金类型",
          key: "actionTypeStr",
          width: 150
        },
        {
          title: "钱包类型",
          key: "walletTypeStr",
          width: 150
        },
        {
          title: "操作前资金",
          align: "center",
          key: "beforeAmount",
          width: 100,
          render: (h, params) => {
            return h("span", {}, params.row.beforeAmount / 100.0);
          }
        },
        {
          title: "操作资金",
          align: "center",
          key: "amount",
          width: 100,
          render: (h, params) => {
            return h("span", {}, params.row.amount / 100.0);
          }
        },

        {
          title: "操作后资金",
          align: "center",
          key: "afterAmount",
          width: 100,
          render: (h, params) => {
            return h("span", {}, params.row.afterAmount / 100.0);
          }
        },
        {
          title: "备注信息",
          align: "center",
          key: "info"
        }
      ],
      initData: {
        actionTypes: [],
        total: 0
      },
      searchVM: {
        merberName: "",
        startTime: "", //查询起始时间
        endTime: "", //查询结束时间
        orderBy: "id desc",
        rows: 20
      },
      dataList: []
    };
  },
  mounted() {
    this.$http.get("/memberCoin/coinindex.json").then(result => {
      if (result.code == 0) {
        this.initData.actionTypes = result.data.actionTypes;
      }
    });
  },
  methods: {
    select(v) {
      this.searchVM.startTime = v[0];
      this.searchVM.endTime = v[1];
    },
    mInit() {
      if (!!this.$route.query.username) {
        this.searchVM.memberName = this.$route.query.username;
      }
    },
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/agentUser/coinlist.json", params).then(result => {
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
.ivu-input-icon-normal + .ivu-input {
  width: 200px;
}
</style>
