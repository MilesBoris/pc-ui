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
        <router-link :to="{name:'LinkManagement'}">链接管理</router-link>
        <router-link
          :to="{name:'AgentDrawing'}"
          class="active"
        >分红提现</router-link>
      </div>
      <div class="userbasic_body">
        <!-- <div class="bank_tips">温馨提示：每天提款次数不限 (当天北京时间00:00:00-次日23:59:59)</div> -->
        <div class="line_form">
          <form
            action="#"
            method="post"
          >
            <div class="line">
              <span class="tit">分红钱包余额</span>
              <span>
                <Tag type="border">{{cAgentCashBalance}}</Tag>
              </span>
            </div>
            <div class="line">
              <span class="tit">开户姓名</span>
              <span>{{vmCard.drawAccountName}}</span>
            </div>
            <div class="line">
              <span class="tit">收款银行</span>
              <span>{{vmCard.bankTypeName}}</span>
            </div>
            <div class="line">
              <span class="tit">银行账号</span>
              <span>{{vmCard.account}}</span>
            </div>
            <div class="line">
              <span class="tit">开户行网点</span>
              <span>{{vmCard.drawAddress}}</span>
            </div>
            <div
              class="line"
              v-if="cAgentCashBalance>0"
            >
              <span class="tit">提款金额</span>
              <input
                type="text"
                class="inp"
                :disabled="cAgentCashBalance<=0"
                v-model="vm.dealcoin"
                placeholder="输入提款金额(最低100)"
              >
              <span class="tips error-tips">提款金额不能少于100元</span>
            </div>
            <div
              class="line"
              v-if="cAgentCashBalance>0"
            >
              <span class="tit">取款密码</span>
              <input
                type="password"
                class="inp"
                :disabled="cAgentCashBalance<=0"
                v-model="vm.coinpwd"
                placeholder="请输入支付密码"
                maxlength="6"
              >
            </div>
            <div
              class="line"
              v-if="cAgentCashBalance>0"
            >
              <span class="tit"></span>
              <button
                type="button"
                :disabled="cAgentCashBalance<=0"
                class="ajax-submit-without-confirm-btn account_save"
                @click="mSave"
              >确定</button>
            </div>
            <div
              class="line"
              v-if="cAgentCashBalance<=0"
            >
              <span class="tit"></span>
              <span class="tips error-tips">分红钱包余额暂不支持取现</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import window from "../../mixins/window";
export default {
  name: "MemberDrawing",
  mixins: [window],
  data() {
    return {
      vmCard: {
        drawAccountName: "",
        drawAccountType: "",
        account: "",
        drawAddress: "",
        bankTypeName: "",
        agentCashBalance: 0
      },
      vm: {
        dealcoin: "",
        coinpwd: ""
      }
    };
  },
  computed: {
    cAgentCashBalance() {
      let cb = this.vmCard.agentCashBalance / 100;
      return cb ? cb : 0;
    }
  },
  mounted() {
    this.mInit();
  },
  methods: {
    mInit() {
      this.mLoading(true);
      this.$http.all([this.mGetAgentCashBalance(), this.mGetBindBank()]).then(
        this.$http.spread((resAgentCashBalance, rbindbank) => {
          if (resAgentCashBalance.data == -1) {
            this.mAlert("请先设置资金密码", () => {
              this.$router.push({ name: "SafePassword" });
            });
          } else if (resAgentCashBalance.data == -2) {
            this.mAlert("请先绑定银行卡", () => {
              this.mWinOpen(
                "新增银行卡",
                () => import("./AddBankCard"),
                {},
                600
              );
            });
          } else {
            this.vmCard.agentCashBalance = resAgentCashBalance.data;
          }
          if (rbindbank.code == 0) {
            this.vmCard = Object.assign(this.vmCard, rbindbank.data);
          }
          this.mLoading(false);
        })
      );
    },
    mGetAgentCashBalance() {
      return this.$http.get("/agentUser/agentCashBalance.json");
    },
    mGetBindBank() {
      return this.$http.get("/memberUser/getbindbank.json");
    },
    mSave() {
      if (this.vm.dealcoin == "") {
        this.mAlert("取现金额不能为空");
        return;
      }
      if (this.vm.dealcoin < 1) {
        this.mAlert("取现金额必须大于1元");
        return;
      }
      if (this.vm.coinpwd == "") {
        this.mAlert("请输入资金密码");
        return;
      }
      if (this.vm.dealcoin > this.cAgentCashBalance) {
        this.mAlert("余额不足");
        return;
      }
      this.mLoading(true);
      let params = Object.assign({}, this.vm);
      this.$http.post("/agentUser/agentcash.json", params).then(result => {
        this.mLoading(false);
        if (result.code == 0) {
          if (result.data == 0) {
            this.mAlert("提现成功");
          } else if (result.data == 1) {
            this.mAlert("请先设置资金密码", () => {
              this.$router.push({ name: "SafePassword" });
            });
          } else if (result.data == 2) {
            this.mAlert("请先绑定银行卡", () => {
              this.mWinOpen(
                "新增银行卡",
                () => import("./AddBankCard"),
                {},
                600
              );
            });
          }
        } else {
          this.mAlert(result.message);
        }
      });
    }
  }
};
</script>

<style>
</style>