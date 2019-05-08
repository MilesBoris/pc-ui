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
                <router-link :to="{name:'MemberDrawing'}">会员提款</router-link>
                <router-link :to="{name:'IndoorTransfer'}" class="active">户内转账</router-link>
            </div>
            <div class="userbasic_body">
                <form>
                <div class="bank_tips">温馨提示：查询时，请点击游戏厅刷新额度</div>

                <div class="indoor_line">
                    <h3><span class="tit">选择账户</span><span class="themeCr"> </span></h3>
                    <ul class="gameroom_list indoor_toplist">
                        <li>
                            <p class="transfer_tit"> 主账户额度</p>
                            <p class="name">￥<span class="pos" v-text="amount / 100"></span>&nbsp;元</p>
                            <em></em>
                        </li>
                        <input type="hidden" name="account1" value="1">
                    </ul>
                </div>
                <div class="indoor_line">
                    <h3><span class="tit">选择游戏平台</span><span class="themeCr"></span></h3>
                    <ul class="gameroom_list game_platform">
                        <li v-for="item in walletlist" :key="item.gameCompanyId" v-if="item.gameCompanyId>0" class="hasnotinfo" @click="gameCompanyId=item.gameCompanyId" style="list-style: none">
                            <p class="name api_name">{{item.gameCompanyName}} <span class="pos" v-if="item.coin!=-1">{{item.coin / 100}}</span>
                            <a class="refresh" @click="mGetCoin(item)"></a></p>
                            <em></em>
                        </li>
                        <input type="hidden" name="account1" value="1">
                    </ul>
                    <div style="width:100%;height:150px;" class="demo-spin-container" v-if="walletlist.length==0" relative>
                          <Spin fix></Spin>
                    </div>
                </div>
                <!-- <div class="indoor_line " >
                    <h3><span class="tit">选择游戏平台</span></h3>
                    <ul class="gameroom_list game_platform" v-if="walletlist.length>0">
                        <li v-for="item in walletlist" :key="item.gameCompanyId" v-if="item.gameCompanyId>0" class="hasnotinfo" @click="gameCompanyId=item.gameCompanyId">
                            <p class="name api_name">{{item.gameCompanyName}} <span class="pos">{{item.coin / 100}}</span>
                            <a class="refresh" @click="mGetCoin(item)"></a></p>
                            <em></em>
                        </li>
                    </ul>
                    <div style="width:100%;height:150px;" class="demo-spin-container" v-if="walletlist.length==0" relative>
                          <Spin fix></Spin>
                    </div>
                </div> -->
                <div class="indoor_line">
                    <h3><span class="tit">转账额度</span></h3>
                    <div class="line_form">
                        <div class="line">
                            <input type="number" step="1" min="1" class="inp" v-model="vm.dealCoin">
                            <span class="tips"><span class="themeCr"></span>元</span>
                        </div>
                        <div class="line">
                            <button type="button" class="account_save" @click="mSave">转入游戏平台</button>
                            <button class="indoor_main" type="button" style="margin-left:15px;" @click="mSaveOut">转出游戏平台</button>
                            <input type="hidden" name="transfer_type" value="0">
                        </div>
                    </div>
                </div>
                </form>
            </div>
        </div>
        <remote-script src="/static/js/indoortransfer.js"></remote-script>
</div>
</template>
<script>
export default {
  name: "IndoorTransfer",
  data() {
    return {
      walletlist: [],
      amount: 0,
      wallet: "",
      gameCompanyId: "",
      vm: {
        walletIn: "",
        walletOut: "",
        dealCoin: ""
      },
      agnetLevel: "",
      loading:false
    };
  },
  mounted() {
    this.mLoading(true);
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.agnetLevel = result.data.agnetLevel;
      }
    });
    this.mGetCoins();
    this.mMemberAmount();
  },
  methods: {
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
    mMemberAmount() {
      if (!this.cNeedLogin) {
        this.$http.post("/memberUser/memberamount.json").then(result => {
          if (result.code == 0) {
            this.amount = result.data;
          }
        });
      }
    },
    mSave() {
      if (this.loading) {
        return;
      }
      if (this.gameCompanyId == "" || this.gameCompanyId <= 0) {
        this.mAlert("请选择要操作的钱包");
        return;
      }
      if (this.vm.dealCoin < 1) {
        this.mAlert("转账金额必须大于1元");
        return;
      }
      if (this.vm.dealCoin%1!=0) {
        //请输入整数
        this.mAlert("请输入整数");
        return;
      }
      if (this.gameCompanyId > 0) {
        //转入
        this.vm.walletIn = this.gameCompanyId;
        this.vm.walletOut = 0;
      }
      this.mLoading(true);
      this.loading = true;
      this.$http
        .post("/managerGame/wallettransfer.json", this.vm)
        .then(result => {
          this.mLoading(false);
          this.loading = false;
          if (result.code == 0) {
            if (result.data == 1) {
              this.mRefreshAccountInfo();
              this.mAlert("操作成功", () => {});
            } else if (result.data < 0) {
              this.mAlert("记录转账记录失败", () => {});
            } else if (result.data == 2) {
              this.mAlert("操作中心账户失败", () => {});
            } else if (result.data == 3) {
              this.mAlert("游戏厅操作失败", () => {});
            } else if (result.data == 4) {
              this.mAlert("游戏厅未返回，请联系客服", () => {});
            }
            this.mGetCoins();
            this.mMemberAmount();
          } else {
            this.mAlert(result.message, () => {});
          }
        });
    },
    mSaveOut() {
      if (this.loading) {
        return;
      }
      if (this.gameCompanyId == "" || this.gameCompanyId <= 0) {
        this.mAlert("请选择要操作的钱包");
        return;
      }
      if (this.vm.dealCoin < 1) {
        this.mAlert("转账金额必须大于1元");
        return;
      }
      if (this.gameCompanyId > 0) {
        //转出
        this.vm.walletIn = 0;
        this.vm.walletOut = this.gameCompanyId;
      }
      this.mLoading(true);
      this.loading = true;
      this.$http
        .post("/managerGame/wallettransfer.json", this.vm)
        .then(result => {
          this.loading = false;
          this.mLoading(false);
          if (result.code == 0) {
            if (result.data == 1) {
              this.mRefreshAccountInfo();
              this.mAlert("操作成功", () => {});
            } else if (result.data < 0) {
              this.mAlert("记录转账记录失败", () => {});
            } else if (result.data == 1) {
              this.mAlert("操作成功", () => {
                this.mGetCoins();
              });
            } else if (result.data == 2) {
              this.mAlert("操作中心账户失败", () => {});
            } else if (result.data == 3) {
              this.mAlert("游戏厅操作失败", () => {});
            } else if (result.data == 4) {
              this.mAlert("游戏厅未返回，请联系客服", () => {});
            }
            this.mGetCoins();
            this.mMemberAmount();
          } else {
            this.mAlert(result.message, () => {});
          }
        });
    }
  }
};
</script>

<style>
.demo-spin-container {
  display: inline-block;
  width: 200px;
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
</style>
