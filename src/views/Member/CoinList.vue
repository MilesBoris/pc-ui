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
            <router-link :to="{name:'CashList'}">取款记录</router-link>
            <router-link :to="{name:'GameBetRecord'}">游戏记录</router-link>
            <router-link :to="{name:'CoinList'}" class="active">资金明细</router-link>
            <router-link :to="{name:'RakebackRecord'}">
                反水记录
            </router-link>
        </div>
        <div class="coin-list" style="margin-top: 20px;">
            <Row>
            <Col span="4">
            <DatePicker @on-change="select" type="daterange" placement="bottom-start" placeholder="起止时间" style="width:200px;"></DatePicker>
            </Col>
            <Col span="4" style="margin-left:60px;">
            <Select v-model="searchVM.actionType" placeholder="资金类型">
                <Option value="-1">所有</Option>
                <Option v-for="(item,i) in initData.actionTypes" :key="i" :value="item.id">{{item.value}}</Option>
            </Select>
            </Col>
            <Col span="8" style="margin-left:15px;">
            <Button type="warning" @click="mSearch(1)">搜索</Button>
            </Col>
            </Row>
            <Row>
            <Table height="550" :columns="columns" :data="dataList"></Table>
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
  name: "Coinlist",
  mixins: [listMixin],
  data() {
    return {
      columns: [
        {
          title: "ID",
          key: "id",
          // width: 100
        },
        {
          title: "变更时间",
          key: "createTimeStr",
          // width: 200
        },
        {
          title: "资金类型",
          key: "actionTypeStr",
          // width: 150
        },
        {
          title: "钱包类型",
          key: "walletTypeStr",
          // width: 150
        },
        {
          title: "操作前资金",
          align: "center",
          key: "beforeAmount",
          // width: 100,
          render: (h, params) => {
            return h("span", {}, params.row.beforeAmount / 100.0);
          }
        },
        {
          title: "操作资金",
          align: "center",
          key: "amount",
          // width: 100,
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
          align: "center",
          title: "备注信息",
          key: "info"
        }
      ],
      initData: {
        actionTypes: [],
        total: 0
      },
      searchVM: {
        actionType: "", //资金类型
        startTime: "", //查询起始时间
        endTime: "", //查询结束时间
        orderBy: "createTime",
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
      this.$http.get("/memberCoin/coinindex.json").then(result => {
        if (result.code == 0) {
          this.initData.actionTypes = result.data.actionTypes;
          this.mSearch(1);
        }
      });
    },
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/memberCoin/coinlist.json", params).then(result => {
        if (result.code == 0) {
          this.initData.total = result.total;
          this.dataList = !!result.rows ? result.rows : [];
        }
      });
    }
  },
  created() {
    this.mInit();
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
