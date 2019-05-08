<template>
<div style="height:450px;">
    <div style="height:400px;width:290px; float:left;">
            <div style=" height:325px;margin: 15px;">
                <p class="grid-img">
                    <img style="" :src="info.img    ">
                </p>
                <!-- <p style="border-bottom: 1px dotted #cccccc;padding-right: 10px;padding: 10px 0px;color: #666;">
                <strong>商品名称 :  </strong>{{info.title}}</p>
                <p style="border-bottom: 1px dotted #cccccc;padding-right: 10px;padding: 10px 0px;color: #666;">
                    <strong>购买数量 : </strong>  
                    {{info.buyNum}}
                </p> -->
            </div>
    </div>
    <div class="c tjbd" style="float:right;">
        <div class="usinfo">
            <p class="yuer">
                <strong>商品名称 :  </strong>{{info.title}}</p>
            <p class="fulladdr">
                <strong>收货人 : </strong>  
                {{vm.memberName}}
            </p>
            <p class="fulladdr"  style="border-top: none">
                <strong>联系电话 : </strong>  
                {{vm.phone}}
            </p>
            <p class="fulladdr"  style="border-top: none">
                <strong>收货地址 : </strong>  
                {{vm.address}}
            </p>
            <p class="yuer" style="border-bottom: 1px dotted #cccccc; margin-bottom:15px;">
                <strong>购买数量 :  </strong>
                {{info.buyNum}}
            </p>
        </div>
        <strong>详细信息 :  </strong>
        <textarea readonly v-model="info.content" name="keke_integralmall_hf" class="keke_integralmall_hf" style=" margin-top: 5px;height:100px; max-height:100px;min-height:100px;"></textarea>
        <p class="submits" style="text-align:center;">
        <button type="submit" class="qrgm"  >
            <strong style="font-weight:normal;" @click="mClose">关闭</strong>
        </button>
        </p>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      vm: {
        id: 0,
        address: "",
        phone: "",
        memberName: ""
      },
      info: {
        title: "",
        buyNum: 0,
        img: "",
        content: ""
      }
    };
  },
  props: {
    paramData: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    this.vm = Object.assign({}, this.paramData.vmObj);
    this.mLoading(true);
    this.$http
      .post("/imo/queryOrderProducts.json", { orderId: this.vm.id })
      .then(result => {
        if (result.code == 0) {
          this.info.title = result.data[0].title;
          this.info.buyNum = result.data[0].buyNum;
          this.info.img = result.data[0].img;
          this.info.content = result.data[0].content;
        }
      });
  },
  methods: {
    mClose() {
      this.$emit("closecallback");
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
  width: 100%;
  height: 260px;
}
.grid-img img {
  width: 100%;
  height: 100%;
}
</style>

