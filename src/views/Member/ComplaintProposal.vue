<template>
    <div class="container user_con" style="margin-top: 72px;">
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
            <li >
                <router-link :to="{name:'ReportTransfer'}">客户报表</router-link>
            </li>
            <li v-if="agnetLevel>0">
                <router-link :to="{name:'AgentThat'}">代理管理</router-link>
            </li>
            <li v-if="agnetLevel>0">
                <router-link :to="{name:'MembermanAgement'}">代理报表</router-link>
            </li>
            <li  class="active">
                <router-link :to="{name:'ServiceCenter'}">服务中心</router-link>
            </li>
            <li>
                <router-link :to="{name:'ConversionRecord'}">商城中心</router-link>
            </li>
        </ul>
    </div>
    <div class="user_right ">
        <div class="userbasic_head">
            <router-link :to="{name:'ServiceCenter'}">公告信息</router-link>
            <router-link :to="{name:'ComplaintProposal'}" class="active">投诉建议</router-link>
        </div>
        <div class="userbasic_body">
            <div class="bank_tips">温馨提示：您的参与将帮助我们改进产品及服务</div>
            <div class="line_form complaint_form">
                <form action="#" method="post">
                <!-- <div class="line">
                    <span class="tit">反馈类型</span>
                    <select class="select" name="type">
                        <option value="">--请选择--</option>
                        <option value="1">平台问题</option>
                        <option value="2">财务问题</option>
                        <option value="3">提供建议</option>
                    </select>
                </div> -->
                <div class="line">
                    <span class="tit">意见反馈</span>
                    <textarea name="content" placeholder="投诉建议" v-model="content" ref="content"></textarea>
                </div>
                <div class="line">
                    <span class="tit">联系电话</span>
                    <input type="text" class="inp" placeholder="联系电话" name="phone" v-model="contact" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11">
                </div>
                <div class="line">
                    <span class="tit"></span>
                    <button type="button" class="ajax-submit-btn account_save" @click="mSave">提交</button>
                </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: "ComplainProposal",
  data() {
    return {
      agnetLevel: "",
      content: "",
      contact: ""
    };
  },
  methods: {
    mSave() {
      if (this.content == "") {
        this.mAlert("请输入投诉内容！", () => {
          this.$refs.content.focus();
        });
        return;
      }
      if (this.contace == "") {
        this.mAlert("请输入联系方式！", () => {
          this.$refs.contact.focus();
        });
        return;
      }
      if (
        !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
          this.contact
        )
      ) {
        this.mAlert("请输入正确的手机号码格式", () => {
          this.$refs.contact.focus();
        });
        return;
      }
      this.mLoading(true);
      this.$http
        .post("/memberUser/saveMemberAdvise.json", {
          content: this.content,
          contact: this.contact
        })
        .then(result => {
          this.mLoading(false);
          if (result.code == 0) {
            this.mAlert(
              "投诉成功!",
              () => {
                this.$router.push({
                  name: "UserCenter"
                });
              },
              "success"
            );
          } else {
            this.mAlert(result.message, () => {}, "error");
          }
        });
    }
  },
  mounted() {
    this.mLoading(true);
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.agnetLevel = result.data.agnetLevel;
      }
    });
  },
};
</script>

<style>
</style>
