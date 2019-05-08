<template>
  <div
    class="container user_con"
    style="margin-top: 72px;"
  >
    <div class="user_left fl">
      <ul>
        <li class="active">
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
        <router-link :to="{name:'DeliveryAdd'}">收货信息</router-link>
        <router-link
          :to="{name:'BankLoad'}"
          class="active"
        >银行资料</router-link>
        <router-link :to="{name:'MessageList'}">站内消息</router-link>
      </div>
      <div class="userbasic_body">
        <div class="bank_tips">温馨提示：如需修改银行卡资料，请联系客服！（开户姓名无法修改;绑定的银行卡必须和注册绑定姓名一致，否则无法提款!）</div>
        <ul class="bank_list">
          <li>
            <span class="tit">收款银行</span>
            <span>{{vm.bankTypeName}}</span>
          </li>
          <li>
            <span class="tit">银行账号</span>
            <span>{{vm.account}}</span>
          </li>
          <li>
            <span class="tit">开户行网点</span>
            <span>{{(this.vm.provinceStr?this.vm.provinceStr+" ":"")+(this.vm.cityStr?this.vm.cityStr+" ":"")+(this.vm.areaStr?this.vm.areaStr+" ":"")}}{{vm.drawAddress}}</span>
          </li>
          <li>
            <span class="tit">开户姓名</span>
            <span>{{vm.drawAccountName}}</span></li>
          <li>
            <span class="tit">手机号</span>
            <span>{{vm.mobile}}</span>
          </li>
          <li>
            <span class="tit">备注</span>
            <span>{{vm.remark}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import window from "../../mixins/window";
export default {
  name: "BankLoad",
  mixins: [window],
  data() {
    return {
      banktypes: [],
      vm: {
        drawAccountType: "",
        drawAddress: "",
        drawAccountName: "",
        mobile: "",
        remark: "",
        account: "",
        bankTypeName: ""
      },
      agnetLevel: ""
    };
  },
  mounted() {
    this.mLoading(true);
    this.$http.get("/memberUser/membercoin.json").then(result => {
      if (result.data == -1) {
        this.data = result.data;
        this.mAlert("请先设置资金密码", () => {
          this.$router.push({ path: "./safe_psw" });
        });
      } else if (result.data == -2) {
        this.mAlert("请先绑定银行卡", () => {
          this.mWinOpen("新增银行卡", () => import("./AddBankCard"), {}, 600);
        });
      } else {
        this.mInit();
      }
    });
  },
  methods: {
    mInit() {
      this.mLoading(true);
      this.$http.all([this.mGetMemberinfo(), this.mGetBindBank()]).then(
        this.$http.spread((resMemberinfo, rbindbank) => {
          this.mLoading(false);
          if (resMemberinfo.code == 0) {
            this.agnetLevel = resMemberinfo.data.agnetLevel;
          } else {
            this.mAlert(resMemberinfo.message, () => {}, "error");
          }
          if (rbindbank.code == 0) {
            this.vm = Object.assign(this.vm, rbindbank.data);
          }
        })
      );
    },
    mGetMemberinfo() {
      return this.$http.get("/memberUser/memberinfo.json");
    },
    mGetBindBank() {
      return this.$http.get("/memberUser/getbindbank.json");
    }
  }
};
</script>

<style>
</style>
