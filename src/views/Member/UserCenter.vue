<template>
  <div
    class="container user_con"
    style="margin-top: 72px;"
  >
    <div class="user_left fl">
      <ul>
        <li class="active">
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
        <li>
          <router-link :to="{name:'ReportTransfer'}">客户报表</router-link>
        </li>
        <li v-if="this.agnetLevel>0">
          <router-link :to="{name:'AgentThat'}">代理管理</router-link>
        </li>
        <li v-if="this.agnetLevel>0">
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
        <router-link
          :to="{name:'UserCenter'}"
          class="active"
        >基本信息</router-link>
        <router-link :to="{name:'DeliveryAdd'}">收货信息</router-link>
        <router-link :to="{name:'BankLoad'}">银行资料</router-link>
        <router-link :to="{name:'MessageList'}">站内消息</router-link>
      </div>
      <div
        class="userbasic_con"
        style="padding-top:0"
      >
        <div class="bank_tips">温馨提示：开户姓名无法修改;绑定的银行卡必须和注册绑定姓名一致，否则无法提款!</div>
        <div class="basic_module">
          <div class="basic_left">
            <p class="tips">您好，
              <span class="name" v-text="cLoginUser.username"></span>
              <span class="level-ico level_img_vip0" v-if="this.memberLevel==0"></span>
              <span class="level-ico level_img_vip1" v-else-if="this.memberLevel==1"></span>
              <span class="level-ico level_img_vip2" v-else-if="this.memberLevel==2"></span>
              <span class="level-ico level_img_vip3" v-else-if="this.memberLevel==3"></span>
              <span class="level-ico level_img_vip4" v-else-if="this.memberLevel==4"></span>
              <span class="level-ico level_img_vip5" v-else-if="this.memberLevel==5"></span>
              <span class="level-ico level_img_vip6" v-else-if="this.memberLevel==6"></span>
              <span class="level-ico level_img_vip7" v-else-if="this.memberLevel==7"></span>
              <span class="level-ico level_img_vip8" v-else-if="this.memberLevel==8"></span>
              <span v-text="vm.memberLevelName" class="level-name"></span>
            </p>
            <p class="level_tips">您的账户安全等级：
              <span class="level_line">
                <span class="level" levelnum="30%" style="width: 30%;"></span>
              </span>低
              <router-link :to="{name:'LoginPassword'}" class="change_psw">更换密码</router-link>

              <div class="basic_modify" v-if="bindBank.drawAccountType < 1">
                <a class="after" @click="mAddBankCard">
                  <i class="iconfont " style="color:#000;">👉</i>绑定银行卡</a>
              </div>
              <div class="basic_modify" v-else>
                <i class="iconfont " style="color:green;">✔</i>绑定银行卡
              </div>
          </div>
          <div class="basic_right">
          </div>
        </div>
      </div>
      <ul class="gameroom_list" v-if="walletlist.length>0">
        <li
          v-for="item in walletlist"
          :key="item.gameCompanyId"
          v-if="item.gameCompanyId>1"
          style="list-style: none;"
        >
          <p class="name api_name">{{item.gameCompanyName}} <span class="pos" v-if="item.coin!=-1">{{item.coin / 100}}</span>
            <a
              class="refresh"
              @click="mGetCoin(item)"
            ></a></p>
          <!--<p class="account" style="padding-left:none;">游戏账号：<span-->
              <!--class="viceColor"-->
              <!--data-username="已开通"-->
            <!--&gt; 未开通 </span></p>-->
        </li>
      </ul>
      <div
        style="width:100%;height:150px;"
        class="demo-spin-container"
        v-if="walletlist.length==0"
        relative
      >
        <Spin fix></Spin>
      </div>
      <div class="basic_info">
        <h3 class="head_line">
          <span class="tit">个人资料</span>
        </h3>
        <ul class="list" style="margin-top: 15px">
          <li>
            <span class="user_title">姓名</span>
            <Input
              style="width: 300px"
              ref="realName"
              v-model="vm.realName"
            />
          </li>
          <li>
            <span class="user_title">联系电话</span>
            <Input
              style="width: 300px"
              ref="mobile"
              v-model="vm.mobile"
            />
          </li>
          <li>
            <span class="user_title">联系QQ</span>
            <Input
              style="width: 300px"
              v-model="vm.qq"
            />
          </li>
          <li>
            <span class="user_title">微信</span>
            <Input
              style="width: 300px"
              v-model="vm.weixin"
            />
          </li>
        </ul>
        <div>
          <Button
            style="margin:0 auto; display:block"
            type="warning"
            @click="mSave"
          >提交</Button>
        </div>
      </div>
      <!-- <div class="basic_info">
            <h3 class="head_line">
                <span class="tit">收货信息</span>
            </h3>
            <ul class="list">
                <li>
                    <span class="title">收货人姓名</span>
                    <Input style="width: 300px" ref="realName" v-model="vm.memberName" />
                </li>
                <li>
                    <span class="title">收货人电话</span>
                    <Input style="width: 300px" ref="phone" v-model="vm.phone" />
                </li>
                <li>
                    <span class="title">收货地址</span>
                    <Input style="width: 300px" ref="address" v-model="vm.address"/>
                </li>
            </ul>
            <div >
                <Button style="margin:0 auto; display:block" type="warning" @click="mSaveAdd">提交</Button>
            </div>
        </div> -->
    </div>
    <remote-script src="/static/js/refresh.js"></remote-script>
  </div>
</template>
<script>
import window from "../../mixins/window";
export default {
  mixins: [window],
  name: "UserCenter",
  data() {
    return {
      vm: {},
      agnetLevel: "",
      memberLevel: 0,
      walletlist: [],
      bindBank: {
        drawAccountType: ""
      }
    };
  },
  mounted() {
    this.mLoading(true);
    this.mGetBindBank();
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.agnetLevel = result.data.agnetLevel;
        this.memberLevel = result.data.memberLevel;
      }
    });
    this.mInit();
    this.mGetCoins();
  },
  methods: {
    mInit() {
      this.mLoading(true);
      this.$http.get("/memberUser/memberinfo.json").then(result => {
        if (result.code == 0) {
          this.vm = !!result.data ? result.data : {};
          if (!!this.vm.realName && !!this.vm.mobile) {
            this.isDoing = true;
          } else {
            this.isDoing = false;
          }
        }
      });
    },
    mGetBindBank() {
      this.$http.get("/memberUser/getbindbank.json").then(result => {
        if (result.code == 0 && !!result.data) {
          this.bindBank.drawAccountType = result.data.drawAccountType;
        }
      });
    },
    mAddBankCard() {
      this.mWinOpen(
        "新增银行卡",
        () => import("./AddBankCard"),
        {},
        600,
        () => {
          this.mGetBindBank();
        }
      );
    },
    mGetCoins() {
      this.$http
        .post("/managerGame/getWalletCoins.json")
        .then(result => {
          this.walletlist = result.data.walletlist;
        })
        .catch(err => {
          this.mAlert("获取余额失败");
        });
    },
    mGetCoin(item) {
      this.mLoading(true);
      this.$http
        .get("/managerGame/getWalletCoin.json?id=" + item.gameCompanyId)
        .then(result => {
          if (result.code == 0 && result.data > 0) {
            this.walletlist.forEach(wl => {
              if (wl.gameCompanyId == item.gameCompanyId) {
                wl.coin = result.data;
              }
            });
          }
          this.mLoading(false);
        })
        .catch(err => {
          this.mAlert("获取余额失败");
        });
    },
    mSave() {
      if (this.isDoing) {
        this.mAlert("如需修改，请联系客服！", () => {});
        return this.mInit();
      }
      if (!this.vm.realName) {
        this.mAlert("真实姓名必填！", () => {
          this.$refs.realName.focus();
        });
        return;
      }
      if (!this.vm.mobile) {
        this.mAlert("手机号必填！", () => {
          this.$refs.mobile.focus();
        });
        return;
      }
      if (
        !/^((1[3,4,5,6,7,8,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
          this.vm.mobile
        )
      ) {
        this.mAlert("请输入正确的手机号码格式", () => {
          this.$refs.mobile.focus();
        });
        return;
      }
      this.isDoing = true;
      this.mLoading(true);
      this.$http.post("/memberUser/updateinfo.json", this.vm).then(result => {
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

<style scoped>
.demo-spin-container {
  display: inline-block;
  width: 200px;
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
.level-ico{
  display: inline-block;
  height: 25px;
  overflow: hidden;
  width: 22px;
}

.level_img_vip0 {background: url("/static/images/home/live-ico.png") no-repeat 0 -5px;  background-size: 22px auto;}

.level_img_vip1 {background: url("/static/images/home/live-ico.png") no-repeat 0px -33px;  background-size: 22px auto;}

.level_img_vip2 {background: url("/static/images/home/live-ico.png") no-repeat 0px -60px;  background-size: 22px auto;}

.level_img_vip3 {background: url("/static/images/home/live-ico.png") no-repeat 0px -88px;  background-size: 22px auto;}

.level_img_vip4 {background: url("/static/images/home/live-ico.png") no-repeat 0px -115px;  background-size: 22px auto;}

.level_img_vip5 {background: url("/static/images/home/live-ico.png") no-repeat 0px -143px;  background-size: 22px auto;}

.level_img_vip6 {background: url("/static/images/home/live-ico.png") no-repeat 0px -170px;  background-size: 22px auto;}

.level_img_vip7 {background: url("/static/images/home/live-ico.png") no-repeat 0px -198px;  background-size: 22px auto;}

.level_img_vip8 {background: url("/static/images/home/live-ico.png") no-repeat 0px -226px;  background-size: 22px auto;}

.level-name {
  font-size: 12px;
  margin-left: 5px;
  color: #000;
}
.tips {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
  .user_title{
    width: 70px;
    display: inline-block;;
  }
</style>

