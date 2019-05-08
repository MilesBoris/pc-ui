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
    <div class="user_right">
      <div class="userbasic_head">
        <router-link :to="{name:'MembermanAgement'}" class="active">代理报表</router-link>
        <!--<router-link :to="{name:'SubordinaterEportforms'}">下级报表</router-link>-->
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
          <Col span="4" style="width:180px;">
          <DatePicker
            @on-change="select"
            type="daterange"
            placement="bottom-start"
            placeholder="起止时间"
          ></DatePicker>
          </Col>
          <Col
            span="4"
            style="margin-left:30px;"
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
        <ul class="gameroom_list game_platform">
          <li class="hasnotinfo">
            <p class="name api_name">
              投注金额(元)
              <span class="pos">{{vm.totalBetAmount}}</span>
            </p>
            <em></em>
          </li>
          <li class="hasnotinfo">
            <p class="name api_name">
              团队分红金额(元)
              <span class="pos">{{vm.totalTeamRakebackAmount}}</span>
            </p>
            <em></em>
          </li>
          <li class="hasnotinfo">
            <p class="name api_name">
              个人分红金额(元)
              <span class="pos">{{vm.totalRakebackAmount}}</span>
            </p>
            <em></em>
          </li>
          <li class="hasnotinfo">
            <p class="name api_name">
              输赢金额(元)
              <span class="pos">{{vm.totalTeamProfitAmount}}</span>
            </p>
            <em></em>
          </li>
          <li class="hasnotinfo">
            <p class="name api_name">
              下级总人数
              <span class="pos">{{vm.totalNum}}</span>
            </p>
            <em></em>
          </li>
          <li class="hasnotinfo">
            <p class="name api_name">
              投注人数
              <span class="pos">{{vm.betMembers}}</span>
            </p>
            <em></em>
          </li>
          <li class="hasnotinfo">
            <p class="name api_name">
              首充人数
              <span class="pos">{{vm.firstMembers}}</span>
            </p>
            <em></em>
          </li>
          <li class="hasnotinfo">
            <p class="name api_name">
              注册人数
              <span class="pos">{{vm.regNum}}</span>
            </p>
            <em></em>
          </li>
          <li class="hasnotinfo">
            <p class="name api_name">
              下级代理总人数
              <span class="pos">{{vm.agentNum}}</span>
            </p>
            <em></em>
          </li>
          <li class="hasnotinfo">
            <p class="name api_name">
              下级玩家总人数
              <span class="pos">{{vm.memberNum}}</span>
            </p>
            <em></em>
          </li>
          <li class="hasnotinfo">
            <p class="name api_name">
              存款金额(元)
              <span class="pos">{{vm.totalTeamRechargeTotal}}</span>
            </p>
            <em></em>
          </li>
          <li class="hasnotinfo">
            <p class="name api_name">
              提款金额(元)
              <span class="pos">{{vm.totalTeamCashTotal}}</span>
            </p>
            <em></em>
          </li>
          <li class="hasnotinfo">
            <p class="name api_name">
              分红钱包余额(元)
              <span class="pos">{{vm.agentBalance}}</span>
              <!-- <a
                class="refresh"
                @click="mAgentBalance"
              ></a> -->
            </p>
          </li>
        </ul>
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
      searchVM: {
        timeType: "",
        startTime: "", //查询起始时间
        endTime: "", //查询结束时间
        orderBy: "id desc",
        rows: 10
      },
      vm: {
        totalBetAmount: 0, //投注金额
        totalTeamRakebackAmount: 0, //团队分红金额
        totalRakebackAmount: 0, //个人分红金额
        totalTeamProfitAmount: 0, //输赢金额
        totalTeamRechargeTotal: 0, //存款金额
        totalTeamCashTotal: 0, //提款金额
        totalNum: 0, //总会员数
        agentNum: 0, //下级代理人数
        memberNum: 0, //下级会员人数
        regNum: 0, //注册人数
        betMembers: 0, //投注人数
        firstMembers: 0, //首冲人数
        agentBalance: 0 //分红钱包余额
      }
    };
  },
  mounted() {
    this.mPullData();
    // this.mAgentBalance();
  },
  methods: {
    select(v) {
      this.searchVM.startTime = v[0];
      this.searchVM.endTime = v[1];
    },
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      params.sysId = 0;
      this.$http.post("/agentUser/sumagent.json", params).then(result => {
        if (result.code == 0) {
          this.vm.totalBetAmount = result.data.totalBetAmount / 100;
          this.vm.totalTeamRakebackAmount =
            result.data.totalTeamRakebackAmount / 100;
          this.vm.totalRakebackAmount = result.data.totalRakebackAmount / 100;
          this.vm.totalTeamProfitAmount =
            result.data.totalTeamProfitAmount / 100;
          this.vm.totalTeamRechargeTotal =
            result.data.totalTeamRechargeTotal / 100;
          this.vm.totalTeamCashTotal = result.data.totalTeamCashTotal / 100;
          this.vm.totalNum = result.data.totalNum;
          this.vm.agentNum = result.data.agentNum;
          this.vm.regNum = result.data.regNum;
          this.vm.betMembers = result.data.betMembers;
          this.vm.firstMembers = result.data.firstMembers;
          this.vm.agentBalance = result.data.agentBalance / 100;
        }
      });
    }
    // mAgentBalance(){
    //     this.mLoading(true);
    //     this.$http.post("/agentUser/agentBalance.json").then(result => {
    //         if (result.code == 0) {
    //             this.agentBalance = result.data/100;
    //         }else{
    //             this.mAlert(result.message);
    //         }
    //         this.mLoading(false);
    //     });
    // }
  }
};
</script>
<style>
.ivu-row {
  height: 50px;
}
.coin-list .ivu-input{
  width: 200px!important;
}
</style>

