<template>
  <div :style="{height:'100%'}">
    <transition
      name="custom-classes-transition"
      mode="out-in"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <router-view></router-view>
    </transition>
    <Modal
      v-model="winVisible"
      @on-visible-change="mWinVisibleChange"
      :width="cWinDialog.width"
      class-name="vertical-center-modal"
      :closable="true"
      :mask-closable="false"
    >
      <div
        slot="header"
        v-text="cWinDialog.title"
      ></div>
      <component
        :is="cWinDialog.view"
        v-if="cWinDialog.view!=''"
        @callback="cWinDialog.callback"
        @closecallback="cWinDialog.onclose"
        :param-data="cWinDialog.paramData"
      ></component>
      <div slot="footer"></div>
    </Modal>
    <Modal
      v-model="cLoadingDialog.visible"
      width="300"
      class-name="vertical-center-modal"
      :closable="false"
      :mask-closable="false"
    >
      <Spin fix>
        <Icon
          type="load-b"
          size="18"
          class="demo-spin-icon-load"
        ></Icon>
        <div
          class="text-center"
          v-html="cLoadingDialog.content"
        ></div>
      </Spin>
    </Modal>
  </div>
</template>
<script>
import types from '@/store/mutation-types'
import win from "@/mixins/window";
// import MyGameTransfer from "./pages/membercenter/MyGameTransfer";
// import MemberTransfer from "./pages/membercenter/memberTransfer";
// import LoginModal from "./components/common/LoginModal";
var timer;
export default {
  name: "App",
  components: {
    // MyGameTransfer,
    // MemberTransfer,
    // LoginModal
  },
  mixins: [win],
  data: () => ({
    winVisible: false
  }),
  computed: {
    GameTransferState: function() {
      return this.$store.state.app.GameTransferState;
    },
    loginState: function() {
      return this.$store.state.app.loginState;
    },
    /*  spinState: function() {
      return this.$store.state.app.spinState;
    }, */
    cLoadingDialog: function() {
      return this.$store.getters.getLoadingModel;
    },
    cWinDialog: function() {
      this.winVisible = this.$store.getters.getWinModel.visible;
      return this.$store.getters.getWinModel;
    }
  },
  methods: {
    mWinVisibleChange(v) {
      if (!v) {
        this.mWinClose();
      }
    }
  },
  created(){
    this.$store.commit(types.SESSION_TOKEN);
    this.$store.dispatch(types.SYSTEM_SETTINGS, this);
  }
};
</script>

<style lang="less">
html,
body {
  height: 100%;
}
.info-panel input,
.info-panel .ivu-select-single .ivu-select-selection {
  // height: 48px;
  font-size: 14px;
}
.info-panel .ivu-select-single .ivu-select-selection .ivu-select-placeholder {
  line-height: 48px;
  font-size: 20px;
  height: 48px;
}
.info-panel button {
  width: 120px;
  height: 40px;
  border-radius: 40px;
  font-size: 20px;
  line-height: 20px;
}
.info-panel
  .ivu-select-single
  .ivu-select-selection
  .ivu-select-selected-value {
  height: 48px;
  line-height: 48px;
  font-size: 20px;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: -10%;
  }
}
.spin-container {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  position: fixed;
  width: 300px;
  height: 100px;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
</style>
