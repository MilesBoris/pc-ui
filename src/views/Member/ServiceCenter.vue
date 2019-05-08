<template>
    <div class="container user_con" style="margin-top: 72px;">
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
            <li >
                <router-link :to="{name:'ReportTransfer'}">客户报表</router-link>
            </li>
            <li v-if="agnetLevel>0">
                <router-link :to="{name:'AgentThat'}">代理管理</router-link>
            </li>
            <li v-if="agnetLevel>0">
                <router-link :to="{name:'MembermanAgement'}">代理报表</router-link>
            </li>
            <li class="active">
                <router-link :to="{name:'ServiceCenter'}">服务中心</router-link>
            </li>
            <li>
                <router-link :to="{name:'ConversionRecord'}">商城中心</router-link>
            </li>
        </ul>
    </div>
    <div class="user_right ">
        <div class="userbasic_head">
        <router-link :to="{name:'ServiceCenter'}" class="active">公告信息</router-link>
        <router-link :to="{name:'ComplaintProposal'}">投诉建议</router-link>
        </div>
        <div class="userbasic_body">
            <ul class="noticeList">
                <li class="active" v-for="(item,index) in cGongGaos" :key="index">
                    <h5 v-text="item.title"></h5>
                    <p v-text="item.content"> </p>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name: "ServiceCenter",
  data() {
    return { agnetLevel: "" };
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
    cGongGaos: function() {
      return this.$store.getters.getGonggaos;
    }
  }
};
</script>

<style>
</style>
