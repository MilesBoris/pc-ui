<template>
    <div class="container user_con" style="margin-top: 72px;">
    <div class="user_left fl">
        <ul>
            <li>
                <router-link :to="{name:'UserCenter'}">个人资料
                </router-link>
            </li>
            <li >
                <router-link :to="{name:'SafePassword'}">安全管理
                </router-link>
            </li>
            <li class="active">
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
    <router-link :to="{name:'FinanceCenter'}">会员存款</router-link>
    <router-link :to="{name:'FinanceOfflineDeposit'}">线下存款</router-link>
    <router-link :to="{name:'MemberDrawing'}" class="active">会员提款</router-link>
    <router-link :to="{name:'IndoorTransfer'}">户内转账</router-link>

</div>
<div class="userbasic_body">
    <div class="bank_tips">温馨提示：每天提款次数不限 (当天北京时间00:00:00-次日23:59:59)</div>
    <div class="line_form">
        <form action="#" method="post">
            <div class="line">
                <span class="tit">开户姓名</span>
                <span >{{vmCard.drawAccountName}}</span>
            </div>
            <div class="line">
                <span class="tit">收款银行</span>
                <Select v-model="vmCard.drawAccountType" style="width:250px" disabled>
                    <Option v-for="(item, index) in banktypes" :key="index" :value="item.id" >{{item.bankName}}</Option>
                </Select>
            </div>
            <div class="line">
                <span class="tit">银行账号</span>
                <span>{{vmCard.account}}</span>
            </div>
            <div class="line">
                <span class="tit">开户行网点</span>
                <span>{{vmCard.drawAddress}}</span>
            </div>
            <div class="line">
                <span class="tit">提款金额</span>
                <input type="text" class="inp" v-model="vm.dealcoin" placeholder="输入提款金额(最低100)">
                <span class="tips error-tips">提款金额不能少于100元</span>
            </div>
            <div class="line">
                <span class="tit">取款密码</span>
                <input type="password" class="inp" v-model="vm.coinpwd" placeholder="请输入支付密码" maxlength="6">

            </div>
            <div class="line">
                <span class="tit"></span>
                <button type="button" class="ajax-submit-without-confirm-btn account_save" @click="mSave">确定</button>
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
      banktypes: [],
      vmCard: {
        drawAccountName: "",
        drawAccountType: "",
        account: "",
        drawAddress: ""
      },
      vm: {
        dealcoin: "",
        coinpwd: ""
      },
      agnetLevel: ""
    };
  },
  mounted() {
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.agnetLevel = result.data.agnetLevel;
      }
    });
    this.mLoading(true);
    this.$http.get("/memberUser/getbindbank.json").then(result => {
      if (result.code == 0 && !!result.data) {
        this.vmCard.drawAccountType = result.data.drawAccountType;
        this.vmCard.drawAddress = result.data.drawAddress;
        this.vmCard.drawAccountName = result.data.drawAccountName;
        this.vmCard.account = result.data.account;
      }
    });
    this.mLoading(true);
    this.$http.get("/memberUser/membercoin.json?type=3").then(result => {
      console.log(result.data);
      if (result.data == -1) {
        this.data = result.data;
        this.mAlert("请先设置资金密码", () => {
          this.$router.push({ path: "./safe_psw" });
        });
      } else if (result.data == -2) {
        this.mAlert("请先绑定银行卡", () => {
          this.mWinOpen("新增银行卡", () => import("./AddBankCard"), {}, 600);
        });
      }
    });
    this.mInit();
  },
  methods: {
    mInit() {
      this.mLoading(true);
      this.$http.all([this.mGetBanks(), this.mGetBindBank()]).then(
        this.$http.spread((rbanks, rbindbank) => {
          console.log(rbanks.data, rbindbank.data);
          this.mLoading(false);
          if (rbanks.code == 0) {
            this.banktypes = rbanks.data.list;
          } else {
            this.mAlert(rbanks.message, () => {}, "error");
          }
          if (rbindbank.code == 0) {
            this.vmCard = Object.assign(this.vmCard, rbindbank.data);
          }
        })
      );
    },
    mGetBanks() {
      return this.$http.post("/banktypes.json",{lineCountry:this.sysInfo.lineCountry});
    },
    mGetBindBank() {
      return this.$http.get("/memberUser/getbindbank.json");
    },
    mCash() {
      this.mLoading(true);
      this.$http.post("/memberUser/membercash.json", this.vm).then(result => {
        this.mLoading(false);
        if (result.code == 0) {
          if (result.data == 0) {
            this.mAlert("操作成功", () => {
              console.log("1111111");
              this.$router.push({ name: "CashList" });
            });
          } else if (result.data == 1) {
            this.mAlert("请先设置资金密码", () => {
              this.$router.push({ path: "./safe_psw" });
            });
          } else if (result.data == 2) {
            this.mAlert("请先绑定银行卡", () => {
              this.mWinOpen(
                "绑定银行卡",
                () => import("./AddBankCard"),
                {},
                600,
                function(param) {
                  this.vmcard = Object.assign(this.vmcard, param);
                }
              );
            });
          } else {
            this.mAlert(result.message, () => {});
          }
        } else {
          this.mAlert(result.message, () => {});
        }
      });
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
      if (this.vm.dealCoin > this.coin) {
        this.mAlert("余额不足");
        return;
      }
      this.mLoading(true);
      //先检查是否给手续费
      this.$http
        .post("/memberUser/checkmembercash.json", this.vm)
        .then(result => {
          this.mLoading(false);
          if (result.code == 0) {
            console.log(result);
            let isCharge = false;
            if (
              result.data.bool &&
              result.data.washCodeState != 0 &&
              (result.data.countGame > result.data.gameAmount ||
                (result.data.countGame == 0 && result.data.gameAmount == 0))
            ) {
              isCharge = true;
            }
            if (isCharge) {
              let strConfirm =
                "当前打码量不足" +
                result.data.countGame / 100 +
                "，将收取" +
                result.data.washCodeCharge +
                "%的手续费，你确定要取现吗？";
              if (result.data.countGame <= 0) {
                strConfirm =
                  "当前没有打码量，将收取" +
                  result.data.washCodeCharge +
                  "%的手续费，你确定要取现吗？";
              }
              this.mConfirm(strConfirm, () => {
                this.mLoading(true);
                setTimeout(() => {
                  this.mCash();
                }, 300);
              });
            } else {
              this.mCash();
            }
          }
        });
    }
  }
};
</script>

<style>
</style>
