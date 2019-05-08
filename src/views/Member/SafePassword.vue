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
            <router-link :to="{name:'SafePassword'}" class="active">取款密码</router-link>
            <router-link :to="{name:'LoginPassword'}" >登陆密码</router-link>
        </div>
        <div class="userbasic_body" v-if="coinPassword == ''" >
            <div class="bank_tips">温馨提示：请牢记您设置的取款密码。</div>
            <div class="line_form">
                <form>
                    <div class="line">
                        <span class="tit">新密码</span>
                        <input class="inp" v-model="vm.password">
                        <span class="tips"><span class="themeCr">*</span></span>
                    </div>
                    <div class="line">
                        <span class="tit">确认密码</span>
                        <input class="inp" v-model="vm.truePassword">
                        <span class="tips"><span class="themeCr">*</span></span>
                    </div>
                    <div class="line">
                        <span class="tit"></span>
                        <button type="button" class="ajax-submit-btn account_save" @click="mNewPswSave">确定</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="userbasic_body" v-else>
            <div class="bank_tips">温馨提示：修改后请牢记您的取款密码。</div>
            <div class="line_form">
                <form>
                    <div class="line">
                        <span class="tit">原密码</span>
                        <input v-model="vm.oldPass" ref="oldPass" class="inp" placeholder="请输入原始密码">
                        <span class="tips"><span class="themeCr">*</span></span>
                    </div>
                    <div class="line">
                        <span class="tit">新密码</span>
                        <input v-model="vm.newPass" ref="newPass" class="inp" placeholder="请输入新的资金密码">
                        <span class="tips"><span class="themeCr">*</span></span>
                    </div>
                    <div class="line">
                        <span class="tit">确认密码</span>
                        <input v-model="vm.truePass" ref="truePass" class="inp" placeholder="请再次输入新的资金密码">
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
  name: "SafePassword",
  data() {
    return {
      data: "",
      vm: {
        password: "",
        truePassword: ""
      },
      edit: {
        oldPass: "",
        newPass: "",
        truePass: ""
      },
      agnetLevel: "",
      coinPassword: ""
    };
  },
  mounted() {
    this.mLoading(true);
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.agnetLevel = result.data.agnetLevel;
        this.coinPassword = result.data.coinPassword;
      }
    });
    this.mInit();
  },
  methods: {
    mInit() {
      this.mLoading(true);
      this.$http.get("/memberUser/membercoin.json").then(result => {
        console.log(result.data);
        if (result.data == -1) {
          this.data = result.data;
          this.mAlert("请先设置资金密码", () => {});
        }
      });
    },
    mNewPswSave() {
      if (this.vm.password == "") {
        this.mAlert("请输入资金密码！");
        return;
      }
      if (this.vm.truePassword == "") {
        this.mAlert("请再次输入资金密码！");
        return;
      }
      if (this.vm.truePassword != this.vm.password) {
        this.mAlert("两次输入的密码不一致！");
        return;
      }
      if (this.vm.password.length != 6) {
        this.mAlert("请输入正确的6位数资金密码！");
        return;
      }
      this.mLoading(true);
      this.$http
        .post("/memberUser/setcoinpass.json", { newPass: this.vm.password })
        .then(result => {
          this.mLoading(false);
          console.log(result);
          if (result.code == 0) {
            this.mAlert("操作成功", () => {});
            this.mInit();
          }
        });
    },
    mSave() {
      if (this.vm.oldPass == "") {
        this.mAlert("请输入原资金密码", null, "warning");
        return;
      }
      if (this.vm.newPass == "") {
        this.mAlert("请输入新的资金密码", null, "warning");
        return;
      }
      if (this.vm.truePass != this.vm.newPass) {
        this.mAlert("两次输入的密码不一致", null, "warning");
        return;
      }
      if (this.vm.newPass.length != 6) {
        this.mAlert("请输入正确的6位数资金密码！");
        return;
      }
      this.mLoading(true);
      this.$http
        .post("/memberUser/updatecoinpass.json", this.vm)
        .then(result => {
          this.mLoading(false);
          if (result.code == 0) {
            this.mAlert(
              "修改成功！",
              () => {
                this.vm = {};
              },
              "success"
            );
          } else {
            this.mAlert(result.message, () => {}, "error");
          }
        });
    }
  }
};
</script>

<style>
</style>
