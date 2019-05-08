<template>
    <div class="container user_con" style="margin-top: 50px;">
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
            <li>
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
            <li  class="active">
                <router-link :to="{name:'ConversionRecord'}">商城中心</router-link>
            </li>
        </ul>
    </div>
    <div class="user_right ">
        <div class="userbasic_head">
            <router-link :to="{name:'ConversionRecord'}"  class="active">兑换记录</router-link>
        </div>
        <div class="coin-list" style="margin-top: 20px;">
            <!-- <Row>
            <Col span="5">
            <DatePicker @on-change="select" type="daterange" placement="bottom-start" placeholder="起止时间" style="width:200px;"></DatePicker>
            </Col>
            <Col span="4" style="margin-left:15px;">
            <Select v-model="searchVM.state" placeholder="完成状态">
                <Option value="-1">所有</Option>
                <Option value="0">待支付</Option>
                <Option value="1">已支付</Option>
                <Option value="2">已兑换</Option>
            </Select>
            </Col>
            <Col span="8" style="margin-left:15px;">
            <Button type="warning" @click="mSearch(1)">搜索</Button>
            </Col>
            </Row> -->
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
import window from "../../mixins/window";
export default {
  name: "Coinlist",
  mixins: [listMixin, window],
  data() {
    return {
      columns: [
        // {
        //   title: "用户名",
        //   key: "userName",
        //   align: "center",
        //   width: 100
        // },
        {
          title: "订单号",
          key: "orderCode",
          align: "center",
          width: 250
        },
        {
          title: "兑换时间",
          key: "payTimeStr",
          align: "center",
          width: 160
        },
        {
          title: "收货地址",
          key: "address",
          align: "center",
          width: 200
        },
        {
          title: "状态",
          key: "stateStr",
          align: "center"
        },{
          title: "发货状态",
          key: "shipStateStr",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.mShow(params.row);
                    }
                  }
                },
                "订单详情"
              )
            ]);
          }
        }
      ],
      searchVM: {
        state: "", //订单状态
        startTime: "", //查询起始时间
        endTime: "", //查询结束时间
        orderBy: "id desc",
        rows: 10
      },
      dataList: [],
      initData: {
        total: 0
      },
      agnetLevel: 0
    };
  },
  mounted() {
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
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/imo/myOrders.json", params).then(result => {
        if (result.code == 0) {
          this.initData.total = result.total;
          this.dataList = !!result.rows ? result.rows : [];
        }
      });
    },
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/imo/myOrders.json", params).then(result => {
        if (result.code == 0) {
          this.initData.total = result.total;
          this.dataList = !!result.rows ? result.rows : [];
        }
      });
    },
    mShow(row) {
      this.mWinOpen(
        "订单详情信息",
        () => import("./Detailed"),
        {
          vmObj: {
            id: row.id,
            phone: row.phone,
            address: row.address
          }
        },
        670
      );
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
.ivu-input-icon-normal + .ivu-input {
  width: 200px;
}
.ivu-modal-header {
  font-size: 14px;
  text-align: center;
  background-color: #c5ccd9;
  font-weight: 700;
}
</style>
