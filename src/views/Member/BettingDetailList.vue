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
        <router-link
          :to="{name:'BettingDetailList'}"
          class="active"
        >投注明细</router-link>
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
            style="margin-left:60px;"
          >
          <Input
            v-model="searchVM.memberName"
            placeholder="请输入用户名"
            style="width: 180px"
          />
          </Col>
          <Col span="4" style="margin-left:60px;">
          <Select
            v-model="searchVM.gameCompanyId"
            placeholder="游戏厅"
          >
            <Option value="-1">所有</Option>
            <Option
              v-for="(item,i) in initData.gamecompays"
              :key="i"
              :value="item.id"
              v-if="item.id>0"
            >{{item.value}}</Option>
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
          title: "用户名",
          key: "username"
        },
        {
          title: "游戏",
          align: "center",
          key: "gameCompanyName"
        },
        {
          title: "游戏类型",
          align: "center",
          key: "gameTypeStr"
        },
        {
          title: "下注时间",
          key: "createTimeStr",
          align: "center",
          width: 160
        },
        {
          title: "结算时间",
          key: "gameOverTimeStr",
          align: "center",
          width: 160
        },
        {
          title: "投注金额",
          align: "center",
          key: "validAmount",

          render: (h, params) => {
            return h("span", {}, params.row.validAmount / 100.0);
          }
        },

        {
          title: "输赢金额",
          align: "center",
          key: "bunkoAmount",

          render: (h, params) => {
            return h("span", {}, params.row.bunkoAmount / 100.0);
          }
        }
      ],
      initData: {
        gamecompays: [],
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
    mInit() {
      this.$http.get("/managerGame/gameCompanys.json").then(result => {
        if (result.code == 0) {
          this.initData.gamecompays = !!result.data.gamelist
            ? result.data.gamelist
            : [];
        }
      });
    },
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http
        .post("/agentUser/memberGameOrders.json", params)
        .then(result => {
          if (result.code == 0) {
            this.initData.total = result.total;
            this.dataList = !!result.rows ? result.rows : [];
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
