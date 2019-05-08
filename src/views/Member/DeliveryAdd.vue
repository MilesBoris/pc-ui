<template>
    <div class="container user_con" style="margin-top: 72px;">
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
            <router-link :to="{name:'DeliveryAdd'}" class="active">收货信息</router-link>
            <router-link :to="{name:'BankLoad'}">银行资料</router-link>
            <router-link :to="{name:'MessageList'}" >站内消息</router-link>
        </div>
        <div class="userbasic_body">
            <div class="line_form">
                <form>
                    <div class="line">
                        <span class="tit">收货人姓名</span>
                        <input v-model="vm.memberName" ref="oldPass" class="inp" placeholder="请输入收货人姓名">
                        <span class="tips"><span class="themeCr">*</span></span>
                    </div>
                    <div class="line">
                        <span class="tit">手机号码</span>
                        <input v-model="vm.phone" ref="newPass" class="inp" placeholder="请输入手机号码">
                        <span class="tips"><span class="themeCr">*</span></span>
                    </div>
                    <div class="line">
                        <span class="tit">收货地址</span>
                        <input v-model="vm.address" ref="truePass" class="inp" placeholder="请输入收货地址">
                        <span class="tips"><span class="themeCr">*</span></span>
                    </div>
                    <div class="line">
                      <span class="tit"></span>
                      <Button type="error" class="ajax-submit-btn account_save" @click="mSaveAdd">保 存</Button>
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
  name: "BankLoad",
  mixins: [window],
  data() {
    return {
      vm: {},
      agnetLevel: ""
    };
  },
  mounted() {
    this.mInit();
    this.mLoading(true);
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.agnetLevel = result.data.agnetLevel;
      }
    });
  },
  methods: {
    mInit() {
      this.$http.get("/memberUser/getMemberAddress.json").then(result => {
        if (result.code == 0) {
          this.vm = !!result.data ? result.data : {};
          if (!!this.vm.id) {
            this.isDoing = true;
          } else {
            this.isDoing = false;
          }
        }
      });
    },
    mSaveAdd() {
      if (this.isDoing) {
        this.mAlert("如需修改，请联系客服！", () => {});
        return this.mInit();
      }
      if (!this.vm.memberName) {
        this.mAlert("收货人姓名 必填！", () => {});
        return;
      }
      if (!this.vm.phone) {
        this.mAlert("收货人电话 必填！", () => {});
        return;
      }
      if (!this.vm.address) {
        this.mAlert("收货地址 必填！", () => {});
        return;
      }
      this.isDoing = true;
      this.mLoading(true);
      this.$http
        .post("/memberUser/saveMemberAddress.json", this.vm)
        .then(result => {
          this.isDoing = false;
          this.mLoading(false);
          if (result.code == 0) {
            this.mAlert("恭喜，设置成功！", () => {});
            this.mInit();
          } else {
            this.mAlert(result.message, () => {});
          }
        });
    }
  }
};
</script>

<style>
</style>
