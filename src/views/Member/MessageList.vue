<template>
    <div class="container user_con" style="margin-top: 72px;">
    <div class="user_left fl">
        <ul>
            <li class="active">
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
            <li >
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
        <router-link :to="{name:'UserCenter'}">基本信息</router-link>
        <router-link :to="{name:'DeliveryAdd'}" >收货信息</router-link>
            <router-link :to="{name:'BankLoad'}">银行资料</router-link>
            <router-link :to="{name:'MessageList'}" class="active">站内消息</router-link>
    </div>
    <div class="coin-list" style="margin-top: 20px;">
            <Row>
            <Table :columns="columns" :data="dataList"></Table>
            <Page class-name="text-center" @on-page-size-change="mHandleSizeChange" @on-change="mHandleCurrentChange" :total="initData.total"
                    :page-size="searchVM.rows" show-total></Page>
            </Row>
        </div>
    </div>
</div>
</template>
<script>
import listMixin from "@/mixins/list";
import win from "@/mixins/window";
export default {
  name: "MessageList",
  mixins: [listMixin, win],
  data() {
    return {
      columns: [
        {
          title: "时间",
          key: "createTimeStr",
          align: "center",
          columnAlign: "center",
          isResize: true
        },
        {
          title: "消息类型",
          key: "msgTypeStr",
          align: "center",
          isResize: true
        },
        {
          title: "标题",
          key: "msgTitle",
          align: "center",
          isResize: true,
          width: 450
        },

        {
          title: "状态",
          key: "isRead",
          align: "center",
          render: (h, params) => {
            return h("span", {}, this.mIsReadLabel(params.row.isRead));
          }
        },
        {
          title: "查看",
          key: "id",
          isResize: true,
          align: "center",
          render: (h, params) => {
            return h(
              "i-button",
              {
                props: {
                  type: "warning"
                },
                on: {
                  click: () => {
                    this.mOpenInfo(params.row);
                  }
                }
              },
              "查看"
            );
          }
        }
      ],
      initData: {
        total: 0
      },
      searchVM: {
        msgType: 0, //消息类型
        startTime: "", //查询起始时间
        endTime: "", //查询结束时间
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
    this.mPullData();
  },
  methods: {
    select(v) {
      this.searchVM.startTime = v[0];
      this.searchVM.endTime = v[1];
    },
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/memberUser/getmessages.json", params).then(result => {
        if (result.code == 0) {
          this.initData.total = result.data.total;
          this.dataList = !!result.data.list ? result.data.list : [];
        }
      });
    },
    mOpenInfo(row) {
      this.mWinOpen("站内消息", () => import("./MsgInfo"), row, 500);
    },
    mIsReadLabel(state) {
      if (state == false) {
        return "未读";
      } else {
        return "已读";
      }
    }
  },
  created() {}
};
</script>
