<template>
<div style="height:460px;">
    <div style="height:460px;width:290px; float:left;margin:15px;">
            <div style=" height:250px;">
                <p class="grid-img">
                    <img :src="vm.img">
                </p>
            </div>
            <div style=" height:100px; border-top: 1px dotted #cccccc; width: 100%; margin-top:15px;" >
                <textarea readonly name="keke_integralmall_hf" class="keke_integralmall_hf" style="max-height: 130px;color:#000; margin-top: 5px; width:290px; height:125px;" v-model="vm.content"></textarea>
            </div>
    </div>
    <div class="c tjbd" style="float:right;">
        <div class="usinfo">
            <p class="bc">本次购买应付
                <span class="col">{{vm.currentPrice}}</span>   积分
            </p>
            <p class="yuer">
                <strong>当前账户余额  </strong>
                <span class="col">{{this.integral}}</span> 积分</p>
            <p class="fulladdr">
                    <strong>收货地址 : </strong>
                    {{user.address}}
            </p>
            <p class="fulladdr">
                    <strong>联系号码 : </strong>
                    {{user.phone}}
            </p>
            <p class="yuer" style="border-bottom: 1px dotted #cccccc; margin-bottom:15px;">
                <strong>请选择数量  </strong>
                &nbsp;
                <InputNumber :max="10" :min="1" v-model="buyNum" value="1"></InputNumber>
                &nbsp;
                <strong>当前库存:  </strong>
                <span style="color:red;"> {{vm.stockquantity}} </span>
            </p>
        </div>
        <textarea readonly name="keke_integralmall_hf" class="keke_integralmall_hf" style=" margin-top: 5px;height:100px; max-height:100px;min-height:100px;" v-model="vm.title"></textarea>
        <p class="submits" style="text-align:center;">
        <button type="submit" class="qrgm"  @click="mSave">
            <strong style="font-weight:normal;">确认购买</strong>
        </button>
        <button type="submit" name="sub" id="sub" class="qrgma" value="true" fwin="keke_integralmall"  @click="mClose">
            <strong style="font-weight:normal; color: #fff;">再逛逛</strong>
        </button>
        </p>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      vm: {},
      user: {},
      buyNum: 1,
      id: 0,
      integral: 0
    };
  },
  props: {
    paramData: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    this.id = this.paramData.vmObj.id;
    this.integral = this.paramData.vmObj.integral;
    this.$http.get("/memberUser/getMemberAddress.json").then(result => {
      if (result.code == 0) {
        this.user = !!result.data ? result.data : {};
        if (!!this.user.id) {
          this.isDoing = true;
        } else {
          this.isDoing = false;
        }
      }
    });
    this.mInit();
    console.log(this.integral);
  },
  methods: {
    mInit() {
      this.$http.get("/imp/product.json?id=" + this.id).then(result => {
        if (result.code == 0) {
          this.vm = !!result.data ? result.data : {};
        }
      });
    },
    mClose() {
      this.$emit("closecallback");
    },
    mSave() {
      this.mLoading(true);
      this.$http
        .post("/imo/exchange.json", { id: this.vm.id, buyNum: this.buyNum })
        .then(result => {
          this.mLoading(false);
          if (result.code == 0) {
            this.mAlert("兑换成功！", () => {}, "success");
          } else {
            this.mAlert(result.message, () => {}, "error");
          }
        });
    }
  }
};
</script>
<style scoped>
/* .ivu-modal-header {
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  background-color: #adadc3;
} */
.tjbd {
  font-size: 14px;
  line-height: 28px;
  font-family: Microsoft Yahei;
  width: 300px;
  margin: 10px;
}
.m_c .c {
  padding: 10px 15px;
}
.tjbd .usinfo p.bc {
  margin-top: 15px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 3px;
  background: url(/static/images/Order/pricebg.png) left bottom #fffef7;
}
.tjbd span.col {
  color: #f60;
}
.tjbd .usinfo p {
  padding: 10px 0px;
  color: #666;
}
.czurl {
  float: right;
  /* background: url(source/plugin/keke_integralmall/template/images/ico9.png)
    no-repeat right center; */
  padding-right: 15px;
}
.tjbd strong {
  color: #333;
}
.tjbd .usinfo p.fulladdr {
  border-bottom: 1px dotted #cccccc;
  border-top: 1px dotted #cccccc;
  padding-right: 10px;
}
.tjbd .usinfo p {
  padding: 10px 0px;
  color: #666;
}
a {
  color: #444;
  text-decoration: none;
}
.keke_integralmall_hf {
  width: 300px;
  height: 70px;
  background: #fcfcfc;
  border: 1px solid #eee;
  color: #999;
  font-size: 13px;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
}
img {
  width: 12px;
  height: 13px;
}
.submits {
  margin-bottom: 20px;
  margin-top: 20px;
}
.qrgm,
.qrgma {
  width: 120px;
  height: 30px;
  text-align: center;
  border: 0;
  margin: 0px 7px;
  font-size: 16px;
  font-family: Microsoft Yahei;
  border-radius: 5px;
  cursor: pointer;
}
.qrgm {
  background: #ffe100;
}
.qrgma {
  background: #111;
}
.grid-img {
  margin: 35px auto 0;
  width: 250px;
  height: auto;
}
.grid-img img {
  width: 100%;
  height: 100%;
}
</style>

