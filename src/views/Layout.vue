<template>
    <div class="body-panel">
        <!--半透明遮罩层-->
        <div class="backdrop"></div>
        <page-header></page-header>
        <router-view></router-view>
        <left-aside></left-aside>
        <page-footer></page-footer>
    </div>
</template>
<script>
  import types from '@/store/mutation-types'
  import PageHeader from '@/components/PageHeader.vue'
  import PageFooter from '@/components/PageFooter.vue'
  import LeftAside from '@/components/LeftAside.vue'

  export default {
    name: 'Layout',
    components: {
      PageHeader,
      PageFooter,
      LeftAside
    },
    data: () => ({}),
    created () {
      this.$store.dispatch(types.COMMON_GONGGAO, this)
    }
  }
</script>
<style scoped>
    .body-panel {
        height: auto;
        background-color: #ffffff
    }
</style>
