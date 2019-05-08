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
        <li class="active">
          <router-link :to="{name:'AgentThat'}">代理管理</router-link>
        </li>
        <li>
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
        <router-link :to="{name:'AgentThat'}">代理说明</router-link>
        <router-link
          :to="{name:'AgentrEportforms'}"
          class="active"
        >会员管理</router-link>
        <router-link :to="{name:'OpenAccounts'}">下级开户</router-link>
        <router-link :to="{name:'OpenInvitation'}">推广链接</router-link>
        <router-link :to="{name:'LinkManagement'}">链接管理</router-link>
        <router-link :to="{name:'AgentDrawing'}">分红提现</router-link>
      </div>
      <div
        class="coin-list"
        style="margin-top: 20px;"
      >
        <Row>
          <Col
            span="4"
            style="margin-left:15px;"
          >
          <Input
            v-model="searchVM.username"
            placeholder="请输入用户名"
            style="width: 180px"
          />
          </Col>
          <Col span="4" style="margin-left: 60px">
          <Select
            v-model="searchVM.memberType"
            placeholder="用户类型"
          >
            <Option value="-1">所有</Option>
            <Option value="1">会员</Option>
            <Option value="2">代理</Option>
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
            max-height="800"
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
import window from "../../mixins/window";
export default {
  mixins: [window, listMixin],

  data() {
    return {
      columns: [
        {
          title: "用户名",
          key: "username",
          align: "center"
        },
        {
          title: "用户类型",
          key: "memberTypeStr",
          align: "center"
        },
        {
          title: "团队人数",
          key: "teamNum",
          align: "center"
        },
        {
          title: "中心钱包",
          key: "centerAmount",
          render: (h, params) => {
            return h("span", {}, params.row.centerAmount / 100.0);
          },
          align: "center"
        },
        {
          title: "最后登陆",
          key: "createTimeStr",
          width: 200,
          align: "center"
        },
        {
          title: "操作",
          key: "transfer",
          width: 240,
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
                      // this.mOpen(params.rows.username);
                      this.$router.push({
                        path: "./bettingdetail_list",
                        query: { username: params.row.username }
                      });
                    }
                  }
                },
                "投注明细"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      // this.remove(params.rows.username);
                      this.$router.push({
                        path: "./transactionsdetail_list",
                        query: { username: params.row.username }
                      });
                    }
                  }
                },
                "交易明细"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.mShow(params.row);
                    }
                  }
                },
                "分红比例"
              )
            ]);
          }
        }
      ],
      initData: {
        total: 0
      },
      searchVM: {
        memberType: "",
        username: "", //用户名查询
        orderBy: "id desc",
        rows: 20
      },
      dataList: []
    };
  },
  mounted() {
    this.mPullData();
  },
  methods: {
    mPullData() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/agentUser/teams.json", params).then(result => {
        if (result.code == 0) {
          this.dataList = !!result.rows ? result.rows : [];
          this.initData.total = result.total;
        }
      });
    },
    mShow(row) {
      this.mWinOpen(
        "分红比例详情",
        () => import("./Commission"),
        {
          vmObj: {
            benefitAmountRebate: row.benefitAmountRebate,
            profitRebate: row.profitRebate,
            rakebackRebate: row.rakebackRebate
          }
        },
        300
      );
    },
    mOpen(username) {
      this.$router.push({ path: "./bettingdetail_list" });
    }
  },
  created() {
    // this.mInit();
  }
};
</script>
<style>
.userbasic_head a {
  padding: 0 37px;
}
.ivu-row {
  height: 50px;
}
</style>
