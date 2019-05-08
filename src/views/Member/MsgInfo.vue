<template>
<div style="height:400px;">
  <h2 style="text-align:center;font-size:14px;" v-text="vm.msgTitle"></h2>
    <div style="padding:10px; font-size:12px; line-height:24px;" v-html="vm.msgInfo">

    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      vm: {
        id: 0,
        createTimeStr: "",
        msgTypeStr: "",
        msgTitle:'',
        msgInfo:'',
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

  },
  methods: {
    mInit(){
      let params={};
      params.sysId=this.vm.sysId;
      params.id=this.vm.id;
      console.log(params);
      this.$http.post("/memberUser/membermsginfo.json",params).then(result => {
      if (result.code == 0) {
          this.agnetLevel = result.data.agnetLevel;
        }
      });
    },
    mClose() {
      this.$emit("closecallback");
    }
  }
  ,
  created() {
    this.vm = Object.assign({}, this.paramData);
    this.mInit();
  }
};
</script>
