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
            <router-link :to="{name:'CashList'}" >取款记录</router-link>
            <router-link :to="{name:'GameBetRecord'}" class="active">游戏记录</router-link>
            <router-link :to="{name:'CoinList'}">资金明细</router-link>
            <router-link :to="{name:'RakebackRecord'}">
                反水记录
            </router-link>
        </div>
        <div class="game-record" style="margin-top:20px;position: relative">
            <div class="total-damaliang">
                打码量统计: <span v-text="totalDama"></span>
            </div>
            <Row>
            <Col span="4">
            <DatePicker @on-change="select" type="daterange" placement="bottom-start" placeholder="游戏时间" style="width:200px"></DatePicker>
            </Col>
            <Col span="4" style="margin-left:60px">
            <Select v-model="searchVM.gameCompanyId" placeholder="游戏厅">
                <Option value="-2">所有</Option>
                <Option v-for="(item,i) in initData.gamecompays" :key="i" :value="item.gameCompanyId" :selected="item.gameCompanyId==searchVM.finalState" v-if="item.gameCompanyId != 0 && item.gameCompanyId != -1">
                    {{item.gameCompanyName}}
                </Option>
            </Select>
            </Col>
            <Col span="4" style="margin-left:15px">
            <Select v-model="searchVM.gameType" placeholder="游戏类型">
                <Option value="-1">所有</Option>
                <Option v-for="(item,i) in initData.gametypes" :key="i" :value="item.id">{{item.value}}</Option>
            </Select>
            </Col>
            <Col span="4" style="margin-left:15px">
            <Select v-model="searchVM.gameId" placeholder="游戏">
                <Option value="-1">所有</Option>
                <Option v-for="(item,i) in initData.games" :key="i" :value="item.id">{{item.value}}</Option>
            </Select>
            </Col>
            <Col span="4" style="margin-left:15px">
            <Button type="warning" @click="mSearch(1)">搜索</Button>
            </Col>
            </Row>
            <Row>
            <Table height="500" :columns="columns" :data="dataList"></Table>
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
  mixins: [listMixin],
  data() {
    return {
      columns: [
        {
          title: "ID",
          key: "id",
          width: 50,
          align: "center"
        },
        {
          title: "游戏厅",
          key: "gameCompanyName",
          align: "center"
        },
        {
          title: "游戏",
          key: "gameName",
          width: 100,
          align: "center"
        },
        {
          title: "游戏类型",
          key: "gameTypeStr",
          align: "center"
        },
        {
          title: "下注时间",
          key: "gameStartTimeStr",
          width: 160,
          align: "center"
        },
        {
          title: "结算时间",
          key: "gameOverTimeStr",
          width: 160,
          align: "center"
        },

        {
          title: "下注金额",
          key: "investAmount",
          render: (h, params) => {
            return h("span", {}, params.row.investAmount / 100.0);
          },
          align: "center"
        },
        {
          title: "有效金额",
          key: "validAmount",
          render: (h, params) => {
            return h("span", {}, params.row.validAmount / 100.0);
          },
          align: "center"
        },
        {
          title: "打码量",
          key: "validAmount",
          render: (h, params) => {
            return h("span", {}, params.row.validAmount / 100.0);
          },
          align: "center"
        },
        {
          title: "输赢金额",
          key: "bunkoAmount",
          render: (h, params) => {
            return h("span", {}, params.row.bunkoAmount / 100.0);
          },
          align: "center"
        }
      ],
      initData: {
        gamecompays: [],
        gametypes: [],
        games: [],
        total: 0
      },
      searchVM: {
        gameCompanyId: "",
        gameType: "",
        gameId: "",
        startTime: "", //查询起始时间
        endTime: "", //查询结束时间
        orderBy: "id desc",
        rows: 10
      },
      dataList: [],
      totalDama:0,
      agnetLevel: ""
    };
  },
  mounted() {
    /* setTimeout(() => {
      // 初始化日期选择控件
      $("#datepicker").datepicker({
        todayBtn: "linked", //显示今天按钮
        clearBtn: true, //显示清除按钮
        language: "zh-CN", //语言本地化
        orientation: "bottom auto", //显示位置
        autoclose: true, //自动关闭
        todayHighlight: true, //高亮今天
        format: "yyyy-mm-dd", //格式
        weekStart: 0 //星期的开始：周末
      });
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
      this.$http.get("/managerGame/gameBetInit.json").then(result => {
        if (result.code == 0) {
          // this.initData.gamecompays = result.data.gamecompays;
          this.initData.gametypes = result.data.gametypes;
          this.mSearch(1);
        }
      });

      this.$http.get("/managerGame/getWalletList.json").then(result => {
        if (result.code == 0) {
          this.initData.gamecompays = !!result.data ? result.data:[];
          this.mSearch(1);
        }
      });

    },
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http
        .post("/managerGame/memberGameOrders.json", params)
        .then(result => {
          if (result.code == 0) {
            this.initData.total = result.total;
            this.dataList = !!result.rows ? result.rows : [];
            this.totalDama= this.dataList.reduce((sum,current)=>{
               return sum+current.validAmount/100;
            },0)
          }
        });
    },
    mGameTypeChange() {
      if (!!this.searchVM.gameType) {
        this.mLoading(true);
        this.$http
          .get("/managerGame/games.json?type=" + this.searchVM.gameType)
          .then(result => {
            if (result.code == 0) {
              this.initData.games = !!result.data.games
                ? result.data.games
                : [];
            }
          });
      } else {
        this.initData.games = [];
        this.searchVM.gameId = "";
      }
    }
  },
  created() {
    this.mInit();
  }
};
</script>

<style>
.ivu-row {
  height: 50px;
}
    .total-damaliang{
        position: absolute;
        right:0;
        width:120px;
        height:30px;
        /*border:solid 1px red;*/
        line-height: 30px;
    }
</style>
