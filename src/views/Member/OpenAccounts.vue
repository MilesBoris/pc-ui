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
        <router-link
          :to="{name:'OpenAccounts'}"
          class="active"
        >下级开户</router-link>
        <router-link :to="{name:'OpenInvitation'}">推广链接</router-link>
        <router-link :to="{name:'LinkManagement'}">链接管理</router-link>
        <router-link :to="{name:'AgentDrawing'}">分红提现</router-link>
      </div>
      <div class="titles">
        <Col
          span="24"
          style="font-size: 18px;margin-left: 50px;width: 400px;border-bottom: 1px dashed #999; padding-top: 16px; height: 80px;"
        >开户类型：
        <Select
          v-model="vm.memberType"
          style="width:200px"
        >
          <Option
            v-for="(item, index) in memberTypes"
            :key="index"
            :value="item.id"
            v-text="item.value"
          ></Option>
        </Select>
        </Col>
        <div class="info-panel">
          <Row style="    margin-top: 55px;     height: 150px;">
            <Col
              span="24"
              style=" margin: 15px 50px; "
            >登陆账号：
            <Input
              v-model="vm.username"
              placeholder="请输入登陆账号..."
              style="width:300px;"
            ></Input>
            </Col>
            <Col
              span="24"
              style=" margin: 5px 50px;  "
            >登陆密码：
            <Input
              v-model="vm.password"
              placeholder="请输入登陆密码..."
              style="width:300px;"
            ></Input>
            </Col>
          </Row>
          <Row v-if="vm.memberType==2">
            <Col
              span="24"
              style=" margin: 5px 50px;  "
            >分红比例：
            <Input
              v-model="vm.profitRebate"
              type="number"
              :placeholder="'分润比例不能大于'+profitRebate+'%'"
              style="width: 300px"
            />%
            </Col>
            <Col
              span="24"
              style=" margin: 5px 50px;  "
            >返水扣除：
            <Input
              v-model="vm.rakebackRebate"
              type="number"
              placeholder="返点扣除百分比不能小于0"
              style="width: 300px"
            />%
            </Col>
          </Row>
          <Row
            v-if="vm.memberType==2"
            style="height:100px;"
          >
            <Col
              span="24"
              style=" margin: 5px 50px;  "
            >优惠扣除：
            <Input
              v-model="vm.benefitAmountRebate"
              type="number"
              placeholder="'优惠金额扣除百分比不能小于0"
              style="width: 300px"
            />%
            </Col>
            <!-- <Col span="24" style=" margin: 5px 50px;  ">活动扣除：
                    <Input v-model="vm.activeAmountRebate" placeholder="活动扣除金额百分比不能小于0" style="width: 300px" />%
            </Col>-->
          </Row>
          <Row>
            <button
              style="margin: 25px 181px;"
              type="button"
              class="ajax-submit-without-confirm-btn account_save"
              @click="mSave"
            >提交</button>
          </Row>
        </div>
      </div>
      <div style="color:red;">
        <h2>温馨提示：</h2>
        <p>代理获得分红比例=自身分红比例-下级分红比例，如自身分红比例5%，下级分红比例3%，你将能获得2%的分红比例</p>
      </div>
    </div>
  </div>
</template>
<script>
import { isPoneNumber } from "@/utils/util";
export default {
  data: () => ({
    memberTypes: [{ id: 1, value: "会员" }, { id: 2, value: "代理" }],
    profitRebate: "",
    vm: {
      memberType: "",
      username: "",
      password: "",
      profitRebate: "",
      rakebackRebate: "",
      benefitAmountRebate: "",
      activeAmountRebate: ""
    }
  }),
  mounted() {
    this.mInit();
  },
  methods: {
    mInit() {
      this.$http.get("/agentUser/getprofitRebate.json").then(result => {
        if (result.code == 0) {
          this.profitRebate = result.data;
        } else {
          this.mAlert("加载分红比例失败");
        }
      });
    },
    mSave() {
      if (this.vm.memberType <= 0) {
        this.mAlert("请选择开户类型", null, "warning");
        return;
      }
      if (this.vm.username.trim() == "") {
        this.mAlert("请填写登陆账号", null, "warning");
        return;
      }
      if (this.vm.password.trim() == "") {
        this.mAlert("请填写登陆密码", null, "warning");
        return;
      }
      if (this.vm.memberType == 2 && this.vm.profitRebate > this.profitRebate) {
        this.mAlert(
          "下级分红比例不能高于" + this.profitRebate + "%",
          null,
          "warning"
        );
        return;
      }
      console.log(this.vm);
      this.$http.post("/agentUser/addMemberUser.json", this.vm).then(result => {
        this.mLoading(false);
        if (result.code == 0) {
          this.mAlert("操作成功", () => {}, "success");
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
<style scoped>
.userbasic_head a {
  padding: 0 37px;
}
.titles {
  width: 500px;
  padding: 18px 0;
  border: 1px solid #dcdcdc;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  position: relative;
  margin: 50px auto;
  height: 500px;
}
.info-panel input {
  font-size: 14px;
  height: 0px;
}
.ivu-row {
  height: 100px;
}
</style>
