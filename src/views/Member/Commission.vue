<template>
    <div class="userbasic_body">
        <ul class="bank_list">
            <li>
                <span class="tit">分红比例：</span>
                <span>{{vm.profitRebate}}%</span>
                </li>
            <li>
                <span class="tit">优惠扣除比例：</span>
                <span>{{vm.benefitAmountRebate}}%</span></li>
            <li>
                <span class="tit">返水扣除比例：</span>
                <span>{{vm.rakebackRebate}}%</span>
            </li>
        </ul>
        <br><br>
        <div>
          <Button type="error" long style="height:50px; font-size:20px" @click="mClose">关闭</Button>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      vm: {
        benefitAmountRebate: "",
        profitRebate: "",
        rakebackRebate: ""
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
  },
  methods: {
    mClose() {
      this.$emit("closecallback");
    }
  }
};
</script>
<style>
.ivu-modal-header {
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  background-color: #adadc3;
}
</style>

