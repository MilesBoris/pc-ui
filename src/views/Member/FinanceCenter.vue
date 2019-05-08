<template>
  <div
    class="container user_con"
    style="margin-top: 72px;"
  >
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
        <router-link
          :to="{name:'FinanceCenter'}"
          class="active"
        >会员存款</router-link>
        <router-link :to="{name:'FinanceOfflineDeposit'}">线下存款</router-link>
        <router-link :to="{name:'MemberDrawing'}">会员提款</router-link>
        <router-link :to="{name:'IndoorTransfer'}">户内转账</router-link>
      </div>
      <div class="userbasic_body">
        <div class="bank_tips">温馨提示: 如当前支付方式未能支付成功，请您尝试其他支付方式进行支付！</div>
        <div class="account_form">
          <form
            action="#"
            method="get"
          >
            <input
              type="hidden"
              id="type"
              name="type"
            >
            <div class="line">
              <div class="tit">
                选择存款方式
              </div>
              <div class="ways">
                <div class="account_index">
                  <span
                    @click="mSelectRechargeType(t.id)"
                    :class="['ways_box card_pay',{'active':t.selected}]"
                    v-for="t in rechargeTypes"
                    :key="t.id"
                    v-if="t.list.length>0"
                  >
                    <img
                      :src="'/static/images/pay/'+t.rechargeTypeIcon"
                      class="icon"
                    >{{t.rechargeTypeName}}
                    <em class="check"></em>
                  </span>
                  <span
                    @click="mSelectRechargeType(0)"
                    class="ways_box card_pay"
                    v-if="!!rechargeOther && rechargeOther.length>0"
                  >
                    <img
                      src="/static/images/pay/account-icon7.png"
                      class="icon"
                    >其他方式
                    <em class="check"></em>
                  </span>
                </div>
              </div>
            </div>
            <div class="line">
              <div class="tit"></div>
              <div
                class="ways"
                :style="{'border-bottom':(!!rechargeOther && rechargeOther.length>0 && !cSelectRechargeType.id)||(cSelectRechargeType.id===7)?'none':''}"
              >
                <!-- 微信、支付宝、网银 -->
                <div
                  v-for="t in rechargeTypes"
                  :key="t.id"
                  v-if="t.list.length>0&&t.selected"
                >
                  <div v-if="t.id!==7">
                    <RadioGroup v-model="sltApiid">
                      <Radio
                        v-for="(api,index) in t.list"
                        :key="index"
                        :label="api.apiid"
                        @click.stop.native="mApiOnChange(api)"
                        class="ways_box card_pay"
                      >
                        <Icon type="md-qr-scanner" />
                        <span v-text="t.rechargeTypeName+api.apiid"></span>
                      </Radio>
                    </RadioGroup>
                  </div>
                  <div v-else-if="t.id===7">
                    <div v-if="!!t.list && t.list.length>1">
                      <label
                        class="radio-inline"
                        for="inputRadio1"
                        v-for="(item,i) in t.list"
                        :key="i"
                      >
                        <a
                          href="#"
                          @click="mChangeBankPayOnline(item)"
                        >{{'网银支付通道'+(i+1)}}</a>
                      </label>
                    </div>
                    <component
                      :is="selectbankPayOnlines"
                      :paramData="bankPayOnlineParam"
                      v-if="!!selectbankPayOnlines"
                    ></component>
                  </div>
                </div>
                <!-- 其他 -->
                <div v-if="!!rechargeOther && rechargeOther.length>0 && !cSelectRechargeType.id" style="display: flex">
                  <a
                    v-for="(item,i) in rechargeOther"
                    :key="i"
                    :href="item.url+'?u='+(!!cLoginUser.username?cLoginUser.username:'')"
                    target="_blank"
                    :title="item.tile"
                    style="vertical-align: middle"
                  >
                    <span class="card_pay" >
                      <img
                        v-if="!!item.imgUrl"
                        :src="item.imgUrl"
                        style="vertical-align: middle;width: 150px;height:65px;box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); margin-left: 10px;float: left"
                      >
                      <span v-else>{{item.tile}}</span>
                      <em class="check"></em>
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div
              class="line"
              v-if="!!cSelectRechargeType.id&&cSelectRechargeType.id!=7"
            >
              <div class="tit">
                存款金额
              </div>
              <div
                class="ways"
                style="border-bottom:none;"
              >
                <p>
                  <input
                    v-model="amount"
                    type="text"
                    class="inp"
                    :placeholder="(!!checkedApiType.minMoney?'单笔存款限额（元）'+checkedApiType.minMoney:'请选择存款方式')+(!!checkedApiType.maxMoney?'-'+checkedApiType.maxMoney:'')"
                    style="width:200px"
                  > 元
                </p>
                <div v-if="quickmoneybtns.length > 0">
                  <div class="tit" style="margin-left: -100px; font-size: 15px">快捷金额</div>
                  <button v-for="(am,index) in quickmoneybtns" v-if="am != ''" class="quickmoneybtn" @click="chaconeybtn(am)"  type="button" style="width:55px;height:30px;margin-right:17px;margin-top: 10px;background: #d9d9d9; color: #000000; -webkit-border-radius: 3px;-moz-border-radius: 3px;border-radius: 3px;display: inline;">{{am}}</button>
                </div>
                <!--<p>-->
                  <!--<strong-->
                    <!--style="color: red;"-->
                    <!--id="strongMoneyRange"-->
                    <!--v-text="!!checkedApiType.verificationMoney?'充值金额须为:' + checkedApiType.verificationMoney+'中的某个数字':checkedApiType.verificationDot==0?'必须为整数':''"-->
                  <!--&gt;</strong>-->
                <!--</p>-->
                <button
                  type="button"
                  class="ajax-submit-without-confirm-btn account_save"
                  @click="mSubmit"
                >提交</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import win from "@/mixins/window";
export default {
  name: "FinanceCenter",
  mixins: [win],
  data() {
    return {
      agnetLevel: "",
      amount: "",
      quickmoneybtns:[],
      rechargeTypes: [],
      rechargeOther: [],
      sltApiid: "",
      sltApiTimer: undefined,
      checkedApiType: {},

      selectedBank: {},
      selectedBankPayOnlinePath: "", //选择的网银支付渠道对应的VUE组件路径
      bankPayOnlineParam: {} //网银支付渠道 动态组件 要传到子组件的参数
    };
  },
  mounted() {
    this.mLoading(true);
    this.$http.get("/memberUser/memberinfo.json").then(result => {
      if (result.code == 0) {
        this.agnetLevel = result.data.agnetLevel;
      }
    });
  },
  computed: {
    //获取选中的网银支付的VUE组件地址
    selectbankPayOnlines() {
      if (!!this.bankPayOnlineParam) {
        let url = this.bankPayOnlineParam.doPage;
        if (!!url) {
          var index = url.indexOf("recharge/") + 9;
          if (index < url.length) {
            url = url.substring(index, url.length);
            let name = url.substring(0, url.indexOf("/"));
            return () => import("../pay/bank/" + name + "/index");
          }
        }
        return null;
      } else {
        return null;
      }
    },
    cSelectRechargeType() {
      let a = this.rechargeTypes.find(item => item.selected === true);
      return a == undefined ? {} : a;
    }
  },
  methods: {
    mInit() {
      //线上支付方式
      this.$http
        .post("/recharge/rechargeType.json?showType=1")
        .then(result => {
          if (result.code == 0) {
            result.data.apis.forEach((ele, i) => {
              ele.selected = i === 0;
              ele.list.forEach(item => (item.checked = false));
              if (ele.list.length > 0 && ele.list[0].typeid == 7) {
                this.bankPayOnlines = ele.list;
                this.mChangeBankPayOnline(this.bankPayOnlines[0]);
                return;
              }
            });
            this.rechargeTypes = result.data.apis;
            this.rechargeOther = result.data.others;
            this.mSelectRechargeType(this.cSelectRechargeType.id);
          } else {
            this.mAlert(result.message);
          }
        })
        .catch(error => {
          console.log(error);
          this.mAlert("请求出错...");
        });
    },
    // 存款方式 选择
    mSelectRechargeType(id) {
      this.rechargeTypes.forEach(item => {
        item.selected = item.id === id;
        if (item.selected) {
          this.mApiOnChange(item.list[0]);
        }
      });
    },
    chaconeybtn(amount){
      this.amount = amount;
    },
    //支付宝、微信支付渠道切换
    mApiOnChange(api) {
      if (this.sltApiTimer) {
        clearTimeout(this.sltApiTimer);
      }
      // this.mLoading(true);
      this.sltApiTimer = setTimeout(() => {
        this.checkedApiType = api;
        this.amount = "";
        var sltType = this.rechargeTypes.find(item => item.selected === true);
        if (sltType.list) {

          if (api.verificationMoney.indexOf(',')>0){
            let moneystr_arr = api.verificationMoney.split(",");
            this.quickmoneybtns = moneystr_arr;
          }else{
            this.quickmoneybtns=[];
          }

          sltType.list.forEach(item => {
            item.checked = api.id === item.id
          })
        }
        // this.mLoading(false)
      }, 100)
    },
    //网银支付渠道切换
    mChangeBankPayOnline(item) {
      this.bankPayOnlineParam = item;
    },
    mSubmit() {
      //支付方式
      if (!this.checkedApiType) {
        this.mAlert("请选择充值方式");
        return;
      }
      if (this.amount < 0) {
        this.mAlert("请输入充值金额");
        return;
      }
      let Amount = parseFloat(this.amount);
      if (isNaN(Amount)) {
        this.mAlert("您输入的充值金额不正确");
        return;
      }
      if (
        Amount < this.checkedApiType.minMoney ||
        Amount > this.checkedApiType.maxMoney
      ) {
        this.mAlert(
          "充值金额必须在" +
            this.checkedApiType.minMoney +
            "~" +
            this.checkedApiType.maxMoney +
            "元内"
        );
        return;
      }
      if (this.checkedApiType.verificationMoney.indexOf(",") > 0) {
        let arr_money = this.checkedApiType.verificationMoney.split(",");
        if ($.inArray(this.amount.toString(), arr_money) < 0) {
          this.mAlert(
            "充值金额必须为【" +
              this.checkedApiType.verificationMoney +
              "】中的某一个数字"
          );
          return;
        }
      } else {
        if (this.checkedApiType.verificationDot > 0) {
          if (this.amount.toString().indexOf(".") > -1) {
            var arrodt = this.amount.toString().split(".");
            if (this.amount == parseInt(this.amount)) {
              this.mAlert(
                "充值金额必须携带非0小数，如12.6或100.08，请重新调整充值金额"
              );
              return;
            }
          } else {
            this.mAlert(
              "充值金额必须携带非0小数，如12.6或100.08，请重新调整充值金额"
            );
            return;
          }
        }
      }
      let dopage = this.checkedApiType.doPage;
      if (this.checkedApiType.isAjax == 1) {
        this.mWinOpen(
          "二维码扫描",
          () => import("./CreateQrCode"),
          {
            url: dopage,
            apiid: this.checkedApiType.apiid,
            serviceType: this.checkedApiType.serviceType,
            apitypeid: this.checkedApiType.id,
            orderAmount: this.amount
          },
          600,
          null,
          () => {
            this.mWinClose();
          }
        );
      } else {
        let paramOrder = {
          apiid: this.checkedApiType.apiid,
          serviceType: this.checkedApiType.serviceType,
          apitypeid: this.checkedApiType.id,
          orderAmount: this.amount
        };
        this.mLoading(true);
        this.$http
          .post(dopage, paramOrder)
          .then(result => {
            this.mLoading(false);
            if (result.code == "0") {
              let openUrl = decodeURIComponent(result.data.qrcoDepath);
              window.open(openUrl);
            } else {
              this.mAlert(result.message);
            }
          })
          .catch(error => {
            this.mAlert("请求付款地址失败2");
          });
      }
    }
  },
  created() {
    this.mInit();
  }
};
</script>

<style>
  .bank-list-item input{
    width:20px;
  }
</style>
