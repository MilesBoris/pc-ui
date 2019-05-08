<template>
  <div class="page">
        <div class="content container">
            <div class="register-title-wrapper container">
                <div class="register-title">极速开户</div>
                <div class="title-info">如开户遇到问题，请联系<a class="open-online-chat" @click="mOpenCService">在线客服</a></div>
            </div><!-- end div.register-title-wrapper -->
            <div class="fast-register-wrapper container" style="margin-top: 0!important;">
                <div class="fast-register-panel container fast-register-panel3">
                    <div class="register-tab" style="">
                        普通开户
                    </div>

                    <div class="account-type" style="margin-top: 56px;">
                        <div class="register-content">
                            <!--<div class="content-header">-->
                            <!--<span class="item quick_re active">快速注册</span>-->
                            <!--</div>-->
                            <!-- <div class="item mt10 quick_referral">
                                <div class="icon-input-div" style="position: relative;">
                                    <span class="icon icon-user"></span>
                                    <input onblur="register.rulesCheck(this)" id="referralCode" autocomplete="off" name="referral" placeholder="推荐码（非必填）" type="text" class="icon-input input_y input_referral">
                                </div>
                                <div class="openError" style="display: none;"></div>
                            </div> -->

                            <div class="item mt10 quick_num" style="margin-bottom: 20px;">
                                <div class="icon-input-div" style="position: relative;">
                                    <span class="icon icon-user"></span>
                                    <input id="username" ref="username" maxlength="16" minlength="6" v-model="vm.username" name="username" placeholder="用户名（请输入6-16个数字或字母）" type="text" class="icon-input input_y input_userid">
                                </div>
                                <div class="openError" style="display: none;"></div>
                            </div>
                            <div class="item quick_pwd" style="margin-bottom: 20px;">
                                <div class="icon-input-div">
                                    <span class="icon icon-pass"></span>
                                    <!-- <input type="text" class="demo" id="demo" style="display: none";> -->
                                    <input id="registerPwd" ref="password" v-model="vm.password" style="margin-top: 1px;" autocomplete="off" maxlength="12" placeholder="密码（请输入6-12位数字或字母）" type="password" class="icon-input input_y password1">
                                </div>
                                <div class="openError" style="display: none;">请输入6-12位数字或字母</div>
                            </div>
                            <div class="item quick_pwd" style="margin-bottom: 20px;">
                                <div class="icon-input-div">
                                    <span class="icon icon-pass"></span>
                                    <!-- <input type="text" class="demo" id="demo" style="display: none";> -->
                                    <input id="confirmPwd" ref="truePassword" v-model="vm.truePassword" style="margin-top: 1px;" autocomplete="off" maxlength="12" placeholder="再次输入密码" type="password" class="icon-input input_y password1">
                                </div>
                                <div class="openError" style="display: none;">再次输入密码</div>
                            </div>
                            <div class="item quick_pwd" style="margin-bottom: 20px;">
                                <div class="icon-input-div">
                                    <span class="icon icon-phone"></span>
                                    <input id="phone" ref="phone" v-model="vm.mobile" style="margin-top: 1px;" autocomplete="off" maxlength="12" placeholder="请输入手机号码" type="text" class="icon-input input_y password1">
                                </div>
                                <div class="openError" style="display: none;">输入手机号码</div>
                            </div>
                            <div class="item quick_code" style="margin-bottom: 20px;">
                                <div class="icon-input-div inline mobile-captcha">
                                    <span class="f-left icon icon-phone-captcha"></span>
                                    <input onblur="register.rulesCheck(this)" placeholder="请输入验证码" type="text"
                                           class="icon-input input_y code_zc"
                                           name="code"
                                           id="imgCode" maxlength="4" style="width:140px;"
                                           ref="checkcode" v-model="vm.checkcode">
                                </div>
                                <span class="btn ca disabled" style="width: 100px;">
                                    <img :src="vcodeurl" @click="mVCode()" style="width:90px;height: 36px">
                                </span>
                                <div class="openError" style="display: none;"></div>
                            </div>
                        </div>

                        <div class="txt1 cursor rel mb20 mt20" style="padding-left: 52px; padding-top: 10px;">
                            <input id="ph_agree" class="radio" v-model="vm.check" value="None" name="check" checked="" type="checkbox" style="position: absolute;width: 15px;margin: -7px 0px;">
                            <label for="ph_agree" class="txt2" style="margin-left: 20px">
                                我已经届满合法博彩年龄,且同意各项
                            </label>
                            <a @click="mShow">开户条约。</a>
                            <div class="openError" style="display: none;line-height: 30px;text-indent: 14px;"></div>
                        </div>

                        <input id="btnSubmit_zh" type="button" value="立即开户" @click="mSave" class="btn btn-full submitBtn disabled" style="">
                    </div>
                </div>
                <div class="register-info">&nbsp;</div>
            </div>
        </div>
    </div>
</template>
<script>
import windows from "../mixins/window";
var _this;
export default {
  mixins: [windows],
  name: "Reg",
  data: () => ({
    vm: {
      sysId: 1306,
      username: "",
      password: "",
      truePassword: "",
      coinPassword: "",
      mobile: "",
      checkcode: "",
      check: ""
    },
    vcodeurl: ""
  }),
  computed: {
    cSysInfo() {
      return this.$store.getters.getSysInfo;
    },
  },
  mounted() {
    this.mVCode();
  },
  methods: {
    mShow() {
      this.mWinOpen("开户条约", () => import("./Agreement"), {}, 1000);
    },
    mVCode() {
      this.vm.checkcode = "";
      this.vcodeurl = `${this.cApi}/checkCode.json?t=${Math.random()}&token=${
        this.$store.getters.getSessionToken
      }`;
    },
    mSave() {
      if (this.isLogining) return;
      if (!this.vm.username) {
        this.mAlert("账号必须！", () => {
          this.$refs.username.focus();
        });
        return;
      }
      if (this.vm.username.trim().length < 4 || this.vm.username.trim().length > 14) {
        this.mAlert("账号长度为4-14位", () => {
          this.$refs.username.focus();
        });
        return;
      }
      if (!this.vm.password.trim()) {
        this.mAlert("密码必须！", () => {
          this.$refs.password.focus();
        });
        return;
      }
      if (this.vm.password.trim() != this.vm.truePassword.trim()) {
        this.mAlert("两次输入密码不一致！", () => {
          this.$refs.truePassword.focus();
        });
        return;
      }
      if (this.vm.mobile.trim() == "") {
        this.mAlert("手机号码不可为空", () => {
          this.$refs.phone.focus();
        });
        return
      }
      if (!this.vm.checkcode) {
        this.mAlert("验证码必须", () => {
          this.vm.checkcode = "";
          this.$refs.checkcode.focus();
        });
        return;
      }
      if (this.vm.check == 0) {
        this.mAlert("请选择已阅读！", () => {
          this.$refs.username.focus();
        });
        return;
      }
      this.isLogining = true;
      var params = {};
      params.sysId = this.vm.sysId;
      params.username = this.vm.username;
      params.password = this.vm.password;
      params.checkcode = this.vm.checkcode;
      params.coinPassword = this.vm.coinPassword;
      params.mobile = this.vm.mobile;
      if (this.$route.query && this.$route.query.registerCode) {
        params.registerCode = this.$route.query.registerCode;
        sessionStorage.setItem("registerCode", params.registerCode);
      } else {
        let rc = sessionStorage.getItem("registerCode");
        if (rc) {
          params.registerCode = rc;
        }
      }
      if (this.$route.query && this.$route.query.lid) {
        params.lid = this.$route.query.lid;
        sessionStorage.setItem("lid", params.lid);
      } else {
        let rc = sessionStorage.getItem("lid");
        if (rc) {
          params.lid = rc;
        }
      }
      this.mLoading(true);
      this.$http.post("/memberUser/registerUser.json", params).then(result => {
        this.isLogining = false;
        this.mLoading(false);
        if (result.code == 0) {
          this.mAlert("恭喜，注册成功！", () => {
            this.mmLogin(params.username, params.password, params.checkcode)
              .then(result => {})
              .catch(result => {
                this.$router.push({
                  name: "Login"
                });
              });
          });
        } else {
          this.mVCode();
          this.mAlert(result.message, () => {});
        }
      });
    },
    mOpenCService() {
      if (this.cSysInfo && this.cSysInfo.customUrl) {
        window.open(this.cSysInfo.customUrl, "", "width=1024,height=768");
      } else {
        this.mAlert("客服正赶来，客官别急...", () => {
          this.$store.dispatch(types.SYSTEM_SETTINGS, this);
        });
      }
    },
  },
  created() {}
};
</script>


