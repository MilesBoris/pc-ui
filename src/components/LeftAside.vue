<template>
  <!-- <div class="fixed-btm">
    <div class="btm-tool">
        <div class="btn-download" @click="mOpenCService">
            在线客服
            <i class="icon-contact"></i>
        </div>
        <div class="btn-min"><i class="icon-contact"></i></div>
    </div>
    <div class="btm-tool">
      <router-link :to="{name:'DownLoad'}">
        <div class="btn-download">
            全新手机APP下载
            <i class="icon-download"></i>
        </div>
        <div class="btn-min"><i class="icon-qr"></i></div>
      </router-link>
    </div>
  </div> -->
<div class="jdc-side" style="display: block;">
  <div class="mod_hang_qrcode jdc_feedback_qrcode">
    <div class="mod_hang_qrcode_btn"><i class="jdcfont"><img src="../../public/static/images/leftAside/wechat.png" style="height:30px;width:30px;margin-top:10px"></i><span>微信客服</span></div>
    <div class="mod_hang_qrcode_show">
      <div class="mod-qr-tips"></div>
      <div class="mod_hang_qrcode_show_bg">
        <div id="canvas" style="height: 123px; width: 123px;"><img :src="getweixinQrcode" width="123px"></div>
      </div>
      <p>扫一扫，添加好友</p>
    </div>
  </div>
  <div class="mod_hang_appeal"
       onmouseover="document.querySelector('.mod_hang_appeal_show').style.display='block'"
       onmouseout="document.querySelector('.mod_hang_appeal_show').style.display='none'"
  >
    <div class="mod_hang_appeal_btn"><i class="jdcfont"><img src="../../public/static/images/leftAside/kefu.png" style="height:30px;width:30px;margin-top:10px"></i> <span>咨询反馈</span></div>
    <div class="mod_hang_appeal_show">
      <ul style="list-style: none">
        <li><a @click="mOpenCService">
          <div class="icon_box"><i class="jdcfont"><img src="../../public/static/images/leftAside/online.png" style="height:30px;width:30px;margin-top:10px"></i></div>
          <div class="text_box">
            <h5>在线客服</h5>
            <p>7*12 专业客服，服务咨询</p>
          </div>
          </a>
        <li><a href="javascript:void(0)" target="_blank" class="f-cb"  @click="mOpenQQ(customQQ)">
          <div class="icon_box"><i class="jdcfont"><img src="../../public/static/images/leftAside/QQ.png" style="height:30px;width:30px;margin-top:10px"></i></div>
          <div class="text_box">
            <h5>QQ客服  <span v-text="customQQ" style="color:#000;font-size: 14px;font-weight: lighter;padding-left: 5px"></span></h5>
            <p>*24全时处理，技术支持</p>
          </div>
          </a>
        </li>
        <li v-if="agentQQ"><a href="javascript:void(0)" target="_blank" class="f-cb" @click="mOpenQQ(agentQQ)">
          <div class="icon_box"><i class="jdcfont"><img src="../../public/static/images/leftAside/QQ.png" style="height:30px;width:30px;margin-top:10px"></i></div>
          <div class="text_box">
            <h5>代理QQ客服 <span v-text="agentQQ" style="color:#000;font-size: 14px;font-weight: lighter;padding-left: 5px"></span></h5>
            <p>*24全时处理，技术支持</p>
          </div>
        </a>
        </li>
      </ul>
    </div>
    </div>
    <!--<div class="mod_hang_qrcode jdc_hang_qrcode"><a class="mod_hang_qrcode_btn"><i class="jdcfont"><img src="../../public/static/images/leftAside/app.png" style="height:30px;width:30px;margin-top:10px"></i><span>APP下载</span></a>-->
      <!--<div class="mod_hang_qrcode_show">-->
        <!--<div class="mod_hang_qrcode_show_bg"></div>-->
        <!--<p>手机投注更方便</p>-->
      <!--</div>-->
    <!--</div>-->
    <div class="mod_hang_qrcode mod_hang_top"><a href="#" class="mod_hang_qrcode_btn"><i class="jdcfont"><img src="../../public/static/images/leftAside/backtop.png" style="height:30px;width:30px;margin-top:10px"></i><span>返回顶部</span></a></div>
    <div class="el-dialog__wrapper" style="display: none;">
      <div class="el-dialog el-dialog--small" style="top: 15%;">
        <div class="el-dialog__header"><span class="el-dialog__title"></span>
          <div type="button" class="el-dialog__headerbtn"><i class="el-dialog__close el-icon el-icon-close"></i></div>
        </div>
        </div>
    </div>
</div>
</template>
<script>
import alert from "@/mixins/alert";
import types from "@/store/mutation-types";
export default {
  name: "LeftAside",
  mixins: [alert],
  data() {
    return {};
  },
  computed: {
    customQQ(){
      return this.$store.getters.getSysInfo.customQQ;
    },
    agentQQ(){
      return this.$store.getters.getSysInfo.agentQQ;
    },
    cSysInfo() {
      return this.$store.getters.getSysInfo;
    },
    getweixinQrcode() {
      return this.$store.getters.getSysPicObj.weixinQrcode;
    },
  },
  methods: {
    mOpenCService() {
      if (this.cSysInfo && this.cSysInfo.customUrl) {
        window.open(this.cSysInfo.customUrl, "", "width=1024,height=768");
      } else {
        this.mAlert("客服正赶来，客官别急...", () => {
          this.$store.dispatch(types.SYSTEM_SETTINGS, this);
        });
      }
    },
    mOpenQQ(qq) {
      if (qq) {
        window.open(
                "http://wpa.qq.com/msgrd?v=3&uin=" + qq + "&site=qq&menu=yes",
                "",
                "width=1024,height=768"
        );
      }
    }
  },
  created () {
  }
};
</script>
<style>
</style>


