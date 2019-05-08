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
        <router-link :to="{name:'AgentrEportforms'}">会员管理</router-link>
        <router-link :to="{name:'OpenAccounts'}">下级开户</router-link>
        <router-link :to="{name:'OpenInvitation'}">推广链接</router-link>
        <router-link
          :to="{name:'LinkManagement'}"
          class="active"
        >链接管理</router-link>
        <router-link :to="{name:'AgentDrawing'}">分红提现</router-link>
      </div>
      <div
        class="coin-list"
        style="margin-top: 20px;"
      >
        <Row>
          <Table
            :columns="columns"
            :data="dataList"
          ></Table>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
import window from "../../mixins/window";
export default {
  name: "LinkManagement",
  mixins: [window],
  data() {
    return {
      columns: [
        {
          title: "ID",
          key: "id"
        },

        {
          title: "注册链接",
          key: "linkUrl",
          align: "center",
          width: 300
        },
        {
          title: "链接类型",
          align: "center",
          key: "linkTypeStr"
        },
        {
          title: "注册人数",
          align: "center",
          key: "regNum"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            if (params.row.linkType == 2) {
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
                  "分红比例"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.mDelete(params.row);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            } else {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.mDelete(params.row);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        }
      ],
      dataList: []
    };
  },
  mounted() {
    this.mInit();
  },
  methods: {
    mInit() {
      this.mLoading(true);
      var params = Object.assign({}, this.searchVM);
      this.$http.post("/agentUser/agentliks.json", params).then(result => {
        if (result.code == 0) {
          this.dataList = !!result.rows ? result.rows : [];
        }
      });
    },
    mDelete(row) {
      this.mConfirm("确定要删除？", () => {
        this.mLoading(true);
        var params = Object.assign({}, row);
        this.$http
          .post("/agentUser/delAgentlinks.json", params)
          .then(result => {
            if (result.code == 0) {
              this.mAlert(result.message, "success");
              this.mInit(1);
            } else {
              this.mAlert(result.message, "error");
            }
          });
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
    }
  }
};
</script>

