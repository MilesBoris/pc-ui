<template>
  <div
    class="container user_con"
    style="margin-top: 72px;"
  >
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
        <li>
          <router-link :to="{name:'ReportTransfer'}">客户报表</router-link>
        </li>
        <li class="active">
          <router-link :to="{name:'AgentThat'}">代理管理</router-link>
        </li>
        <li>
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
    <div class="user_right">
      <div class="userbasic_head">
        <router-link
          :to="{name:'AgentThat'}"
          class="active"
        >代理说明</router-link>
        <router-link :to="{name:'AgentrEportforms'}">会员管理</router-link>
        <router-link :to="{name:'OpenAccounts'}">下级开户</router-link>
        <router-link :to="{name:'OpenInvitation'}">推广链接</router-link>
        <router-link :to="{name:'LinkManagement'}">链接管理</router-link>
        <router-link :to="{name:'AgentDrawing'}">分红提现</router-link>
      </div>
      <div style="background-color: white">
        <!--顶部图片-->
        <!-- <img class="top-img" src="../../../static/images/pay_icon.png"/> -->
        <!--内容部分-->
        <div class="content-parent">
          <!--内容-->
          <div class="content">
            <!--内容标题1-->
            <div class="title-type-1 big-title1">如何计算团队分红金额？</div>
            <!--内容1-->
            <div class="content-text content-text-top">1、团队分红金额 = 分红总额 - 优惠总额*扣除比例- 返水总额* 扣除比例</div>
            <div class="content-text">2、分红总额=有效下注或输赢总额*分红比例</div>
            <div class="content-text">如：</div>
            <div class="content-text">(1)、代理获得分红比例=自身分红比例-下级分红比例，如自身分红比例5%，下级分红比例3%，你将能获得2%的分红比例</div>
            <div class="content-text">(2)、优惠总额为：代理的所有下级参加活动赠送的金额</div>
            <div class="content-text">(3)、返水总额为：根据下级的下注流水，按一定比例返给下级的金额</div>

            <!--中间匡,内容解释-->
            <div class="content-explain">
              <div class="content-explain1">团队分红金额=分红金额-优惠*扣除比例-返水*扣除比例</div>
              <div class="content-explain2">例：240=500-200*50%-100*60%</div>
            </div>

            <!--内容标题2-->
            <div class="title-type-1 big-title2">如何计算个人分红金额？</div>
            <!--内容2-->
            <div class="content-text content-text-top">1、个人分红金额=个人代理的团队分红金额-他所发展下级代理的分红金额</div>
            <div class="content-text">如：</div>
            <div class="content-text">(1)、1级代理分红金额=团队分红金额-所有2级代理的分红金额</div>
            <div class="content-text">(2)、2级代理分红金额=该2级代理的团队分红金额-他所发展3级代理的分红金额</div>

            <!--内容标题3-->
            <div class="title-type-1 big-title3">如何为下级开户？</div>
            <!--内容1-->
            <div class="content-text content-text-top">1、点击下级开户，先为您的下级设置分红比例，设置成功后会生成注册链接，将注册链接发送给下级注册，注册后他就是您的下级，点击下级报表，就能查看他注册的账号</div>
            <div class="content-text">2、如果您为下级设置的是代理类型的账号，那么您的下级就能继续发展下级，如果设置的是玩家类型，那么您的下级只能投注，不能再发展下级，也看不到代理中心；</div>

            <!--内容标题1-->
            <div class="title-type-1 big-title4">温馨提示</div>
            <div class="content-text">建议开设的下级也是代理类型，无论发展了几级，您都能获得分红。</div>
          </div>
          <!--内容图片-->
          <!-- <img class="content-img" src="../../../static/images/agent/agent_that.png"/> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
.title-type-1 {
  min-width: 279px;
  height: auto;
  min-height: 66px;
  padding-left: 50px;
  font-size: 36px;
  bottom: 0;
  padding-top: 5px;
  margin-left: -5px;
  background-size: 100%;
  margin-top: 20px;
}
.content-text {
  font-size: 18px;
  color: #323232;
  width: 100%;
  padding-left: 40px;
  padding-right: 100px;
}
.content-text a {
  font-size: 18px;
  width: 100%;
}
.content-explain {
  width: 870px;
  height: 160px;
  border: 2px solid #eda6b9;
  border-radius: 40px;
  margin-top: 20px;
  margin-left: 50px;
}
.content-explain1 {
  font-size: 30px;
  margin-left: 20px;
  color: #0d02e6;
  padding-top: 30px;
}
.content-explain2 {
  font-size: 30px;
  margin-left: 20px;
  color: #535664;
  padding-top: 5px;
}
</style>
