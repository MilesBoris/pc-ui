<template>
 <div class="bank-list">
        <label class="bank-list-item" for="inputRadio1">
          <input id="inputRadio1" name="inputBank" v-model="defaultbank" value="CMB" type="radio">
          <img class="img"  src="/static/images/pay/bank/xipay/CMB.jpg">
        </label>
        <label class="bank-list-item" for="inputRadio2">
          <input id="inputRadio2" name="inputBank" v-model="defaultbank" value="ICBC" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/ICBC.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio3">
          <input id="inputRadio3" name="inputBank" v-model="defaultbank" value="CCB" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/CCB.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio4">
          <input id="inputRadio4" name="inputBank" v-model="defaultbank" value="BOCM" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/BOCM.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio5">
          <input id="inputRadio5" name="inputBank" v-model="defaultbank" value="BOC" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/BOC.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio6">
          <input id="inputRadio6" name="inputBank" v-model="defaultbank" value="ABC" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/ABC.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio7">
          <input id="inputRadio7" name="inputBank" v-model="defaultbank" value="SPDB" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/SPDB.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio8">
          <input id="inputRadio8" name="inputBank" v-model="defaultbank" value="BEA" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/BEA.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio9">
          <input id="inputRadio9" name="inputBank" v-model="defaultbank" value="SRCB" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/SRCB.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio10">
          <input id="inputRadio10" name="inputBank" v-model="defaultbank" value="CITIC" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/CITIC.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio11">
          <input id="inputRadio11" name="inputBank" v-model="defaultbank" value="CGB" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/CGB.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio12">
          <input id="inputRadio12" name="inputBank" v-model="defaultbank" value="CIB" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/CIB.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio13">
          <input id="inputRadio13" name="inputBank" v-model="defaultbank" value="CMBC" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/CMBC.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio14">
          <input id="inputRadio14" name="inputBank" v-model="defaultbank" value="HXB" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/HXB.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio15">
          <input id="inputRadio15" name="inputBank" v-model="defaultbank" value="CEB" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/CEB.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio17">
          <input id="inputRadio17" name="inputBank" v-model="defaultbank" value="BCCB" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/BCCB.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio18">
          <input id="inputRadio18" name="inputBank" v-model="defaultbank" value="SHBANK" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/SHBANK.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio19">
          <input id="inputRadio19" name="inputBank" v-model="defaultbank" value="PSBC" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/PSBC.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio20">
          <input id="inputRadio20" name="inputBank" v-model="defaultbank" value="BJRCB" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/BJRCB.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio21">
          <input id="inputRadio21" name="inputBank" v-model="defaultbank" value="PAYH" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/PAYH.jpg"/>
        </label>
        <label class="bank-list-item" for="inputRadio22">
          <input id="inputRadio22" name="inputBank" v-model="defaultbank" value="CZB" type="radio">
          <img class="img" src="/static/images/pay/bank/xipay/CZB.jpg"/>
        </label>

        <!--输入金额部分-->
        <div style="margin-top: 10px;padding-top:20px;border-top:1px solid #dcdcdc;">
          <form action="javascript:;" method="post">
            <div class="bank-list-input">
              <label for="inputMoneyBank" class="bank-list-input-title">输入金额：</label>
              <input type="text" id="inputMoneyBank" v-model="amount" class="bank-list-input-input"
                     placeholder="单笔存款限额（元）100-5000">
              <label class="bank-list-input-title" style="margin-left: 10px">元</label>
            </div>
            <!--支付部分-->
            <div style="text-align: center;">
              <button type="button" class="ajax-submit-without-confirm-btn account_save" @click="mBankPay">提交</button>
            </div>
          </form>
        </div>

        <div style="display:none;">
          <form ref="actform" id="actform" name="actform" method="post" :action="bankPayUrl"
                target="_blank">
            <input v-for="(item,key) in bankPostParam " v-if="key!='url'" :key="key" :name="key"
                   type="text" :value="item">
          </form>
        </div>
      </div>
</template>
<script>
var _this;
let timerCheck=null;
export default {
    data(){
        return {
            amount: "",
            bankPayUrl:'',
            bankPostParam:{},
            defaultbank:'',
            orderNo:'',
        };
    },
    props:{
        paramData:Object,
        defult:{}
    },
    methods: {
         mBankPay(){
            if (!this.defaultbank) {
                this.mAlert("请选择银行");
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
            if(Amount>50000)
            {
                this.mAlert("充值金额不能大于50000");
                return;
            }
            this.isLoading = true;
            let param={};
            param.apiid=this.paramData.apiid;
            param.serviceType=this.defaultbank;
            //param.serviceType='';
            param.apitypeid=this.paramData.id;
            param.orderAmount=Amount;
            param.isApp='web';
            this.$http.post("/recharge/xipay/order.json",param).then((result) => {
                this.mLoading(false);
                if(result.code=='0')
                {
                    this.bankPayUrl=result.data.postData.url;
                    this.bankPostParam=result.data.postData;
                    this.orderNo=result.data.postData.orderNo;
                    setTimeout(()=>{
                        this.$refs.actform.submit();
                        this.timerCheck= setTimeout(()=>{this.checkorder()}, 10000);
                    },300);
                }
                this.isLoading = false;
            });
        },
        checkorder()
        {
             this.$http.post("/recharge/rechargeState.json?id="+this.orderNo,{}).then((result) => {
                 if(result.code==0)
                 {
                     if(result.data==1 || result.data==3)
                     {
                        this.mAlert("恭喜，充值成功！",()=>{this.mClose()},"success");
                        if (this.timerCheck != null) {
                            clearTimeout(this.timerCheck);
                        }
                     }
                     else if(result.data==2)
                     {
                        this.mAlert("抱歉，充值失败请联系客服！",()=>{this.mClose()},"error");
                        if (this.timerCheck != null) {
                            clearTimeout(this.timerCheck);
                        }
                     }
                     else {
                        this.timerCheck=setTimeout(()=>{this.checkorder()}, 2000);
                    }
                 }
                 else {
                    this.timerCheck=setTimeout(()=>{this.checkorder()}, 2000);
                }
             });
        },
    },
    created() {
        _this = this;
    },
    destroyed() {
        _this = undefined;
        if (this.timerCheck != null) {
            clearTimeout(this.timerCheck);
        }
    }
}
</script>
<style scoped>

/*在线支付样式*/
.bank-list-item {
  cursor: pointer;
  width: auto;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-left: 5px;
  display: inline-table;
}
/*支付宝支付图标样式*/
.ali-pay{
  margin-left: 90px;
  margin-top: 10px;
  margin-bottom: 10px;
}
/*在线支付单元框样式*/
.bank-list-item > input {
  vertical-align: middle;
}

/*在线支付图片样式*/
.bank-list-item > img {
  vertical-align: middle;
  width: 196px;
  height: 50px;
  border: 1px solid rgb(204, 204, 204);
  margin-left: 12px;
  display: inline-table;
}

/*在线支付滑动焦点变化样式*/
.bank-list-item > img:hover,
.bank-list-item > img:focus {
  border: 1px solid rgb(64, 158, 255);;
}

/*在线支付输入金额*/
.bank-list-input {
  margin: 0 auto;
  text-align: center;
}

/*在线输入金额标题*/
.bank-list-input-title {
  color: #323232;
  font-size: 24px;
}

/*在线输入金额输入框*/
.bank-list-input-input {
  color: #989898;
  font-size: 20px;
  min-width: 360px;
  height: 48px;
}

/*在线输入金额立即支付按钮*/
.bank-list-input-btn {
  color: #ffffff;
  background-color: #dc4d74;
  font-size: 30px;
  width: 200px;
  height: 60px;
  margin-left: 80px;
}

/*在线输入金额无法支付*/
.bank-list-input-not-pay {
  padding-top: 100px;
  margin-left: 20px;
  font-size: 20px;
  text-align: center;
}

</style>

