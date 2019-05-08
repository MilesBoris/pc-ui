<template>
    <div class="container user_con" style="margin-top: 50px;">
    <div class="user_left fl">
        <ul>
            <li>
                <router-link :to="{name:'UserCenter'}">个人资料
                </router-link><!--个人资料 -->
            </li>
            <li>
                <router-link :to="{name:'SafePassword'}">安全管理
                </router-link><!--安全管理 -->
            </li>
            <li>
                <router-link :to="{name:'FinanceCenter'}">财务中心
                </router-link><!--财务中心 -->
            </li>
            <li class="active">
                <router-link :to="{name:'ReportTransfer'}">客户报表</router-link><!--客户报表 -->
            </li>
            <li v-if="agnetLevel>0">
                <router-link :to="{name:'AgentThat'}">代理管理</router-link><!--代理管理 -->
            </li>
            <li v-if="agnetLevel>0">
                <router-link :to="{name:'MembermanAgement'}">代理报表</router-link><!--代理报表 -->
            </li>
            <li>
                <router-link :to="{name:'ServiceCenter'}">服务中心</router-link><!--服务中心 -->
            </li>
            <li>
                <router-link :to="{name:'ConversionRecord'}">商城中心</router-link><!--商城中心 -->
            </li>
        </ul>
    </div>
    <div class="user_right ">
        <div class="userbasic_head">
            <router-link :to="{name:'ReportTransfer'}">转账记录</router-link><!-- -->
            <router-link :to="{name:'RechargeList'}">存款记录</router-link><!-- -->
            <router-link :to="{name:'CashList'}" >取款记录</router-link><!-- -->
            <router-link :to="{name:'GameBetRecord'}">游戏记录</router-link><!-- -->
            <router-link :to="{name:'CoinList'}">资金明细</router-link><!-- -->
            <router-link :to="{name:'RakebackRecord'}" class="active">返水记录</router-link><!-- -->
            <!--<router-link :to="{name:'MemberWash'}">打码记录</router-link>-->
        </div>
        <div class="game-record" style="margin-top:20px">
            <Row>
            <Col span="5">
            <DatePicker @on-change="select" type="daterange" placement="bottom-start" placeholder="游戏时间" style="width:200px"></DatePicker><!-- -->
            </Col>
            <Col span="4" style="margin-left:15px">
            <Button type="warning" @click="mSearch(1)">搜索</Button><!-- -->
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

      ],
      initData: {
          gameCompanys: [],
          gameCompanyTypes: [],
          total: 0,
          sumBetAmount:0,
          sumValidBetAmount:0,
          sumBets:0,
          sumValidBets:0,
          sumRakebackAmount:0,
          sumRakebackAmountTotal:0
      },
      searchVM: {
        startTime: "", //查询起始时间
        endTime: "", //查询结束时间
        orderBy: "id desc",
        rows: 10
      },
      dataList: [],
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
        this.mSearch(1);
    },
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http
        .post("/memberCoin/rakebacklist.json", params)
        .then(result => {
          if (result.code == 0) {
            this.initData.total = result.total;
            this.dataList = !!result.rows ? result.rows : [];
          }
        });
    },
  },
  created() {
    this.mInit();
    this.columns=[
        {
            title: "ID",
            key: "id",
            width: 80,
            align: "center"
        },
        {
            title:'返水时间',
            key: "createTimeStr",
            width: 170,
            align: "center"
        },
        {
            title: '游戏类型',
            key: "gameTypeName",
            align: "center"
        },
        {
            title: '游戏厅',
            key: "gameCompanyName",
            align: "center"
        },
        {
            title: '投注金额',
            key: "betAmount",
            render: (h, params) => {
                return h("span", {}, params.row.betAmount / 100.0);
            },
            align: "center"
        },
        {
            title:'有效投注',
            key: "validBetAmount",
            render: (h, params) => {
                return h("span", {}, params.row.validBetAmount / 100.0);
            },
            align: "center"
        },
        {
            title: '有效注单数',
            key: "validBets",
            align: "center"
        },
        {
            title: '返水比例',
            key: "rakebackRate",
            render: (h, params) => {
                return h("span", {}, params.row.rakebackRate+"%");
            },
            align: "center"
        },
        {
            title:'返水金额',
            key: "rakebackAmount",
            render: (h, params) => {
                return h("span", {}, params.row.rakebackAmount / 100.0);
            },
            align: "center"
        }
    ]
  }
};
</script>

<style>
.ivu-row {
  height: 50px;
}
</style>
