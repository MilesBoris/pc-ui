<template>
    <div class="container user_con" style="margin-top: 72px;">
    <div class="user_left fl">
        <ul>
            <li>
                <router-link :to="{name:'UserCenter'}">个人资料
                </router-link>
            </li>
            <li class="active">
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
            <li  v-if="agnetLevel>0">
                <router-link :to="{name:'AgentThat'}">代理管理</router-link>
            </li>
            <li  v-if="agnetLevel>0">
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
        <router-link :to="{name:'SafePassword'}">取款密码</router-link>
     <router-link :to="{name:'LoginPassword'}" class="active">登陆密码</router-link>
</div>
<div class="userbasic_body">
    <div class="bank_tips">温馨提示：修改后请牢记您的登录密码</div>
    <div class="line_form">
        <form>
            <div class="line">
                <span class="tit">原密码</span>
                <input class="inp" v-model="vm.oldPass" ref="oldPass" placeholder="请输入原始密码">
                <span class="tips"><span class="themeCr">*</span></span>
            </div>
            <div class="line">
                <span class="tit">新密码</span>
                <input class="inp" v-model="vm.newPass" ref="newPass" placeholder="请输入6-12位数字密码">
                <span class="tips"><span class="themeCr">*</span></span>
            </div>
            <div class="line">
                <span class="tit">确认密码</span>
                <input class="inp" v-model="vm.truePass" ref="truePass" placeholder="请输入6-12位数字密码">
                <span class="tips"><span class="themeCr">*</span></span>
            </div>
            <div class="line">
                <span class="tit"></span>
                <button type="button" class="ajax-submit-btn account_save" @click="mSave">确定</button>
            </div>
        </form>
    </div>

</div>
        </div>
</div>
</template>
<script>
export default {
  data: () => ({
    vm: {
      oldPass: "",
      newPass: "",
      truePass: ""
    },
    agnetLevel: ""
  }),
  mounted() {
    this.mLoading(true);
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.agnetLevel = result.data.agnetLevel;
      }
    });
  },
  methods: {
    mSave() {
      if (this.vm.oldPass == "") {
        this.mAlert("请输入原登陆密码", null, "warning");
        return;
      }
      if (this.vm.newPass == "") {
        this.mAlert("请输入新的登陆密码", null, "warning");
        return;
      }
      if (this.vm.truePass != this.vm.newPass) {
        this.mAlert("两次输入的密码不一致", null, "warning");
        return;
      }
      if (this.vm.newPass.length < 6) {
        this.mAlert("密码不可少于6位数，请重新输入！", null, "warning");
        return;
      }
      this.mLoading(true);
      this.$http
        .post("/memberUser/updateloginpass.json", this.vm)
        .then(result => {
          this.mLoading(false);
          if (result.code == 0) {
            this.mAlert(
              "修改成功！",
              () => {
                this.vm = {};
                this.mReLogin();
              },
              "success"
            );
          } else {
            this.mAlert(result.message, () => {}, "error");
          }
        });
    }
  },
  created() {},
  destroyed() {}
};
</script>

<style>
</style>
