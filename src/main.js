import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import types from './store/mutation-types'
import mixin from './mixins/mixin'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'animate.css'
import axios from 'axios'
import { dateFormat } from './utils/util';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(iView)
Vue.mixin(mixin)

require('./style/base.less');

//ajax携带cookie数据，保证session可用
axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_BASE_API
process.env.NODE_ENV !== 'development' && (axios.defaults.timeout = 10 * 1000)

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    if (!!config.data) {
      var data = config.data
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          var value = data[key]
          data[key] = value + ''
        }
      }
      config.data = data
    }
    config.headers.sessionToken = store.getters.getSessionToken
    return config
  },
  function(error) {
    vue.mLoading(false)
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    vue.mLoading(false)
    let data = response.data
    if (data.code == -100) {
      setTimeout(() => {
        vue.mAlert(data.message, () => {
          vue.mReLogin()
        })
      }, 100)
    } else {
      if (data.code != 0 && !!data.message) {
        vue.mAlert(data.message)
      }
    }
    return data
  },
  function(error) {
    console.log('Server', error)
    vue.mLoading(false)
    vue.mAlert('抱歉，网络开小差了！<br/>原因：' + error)
    return Promise.reject(error)
  }
)
Vue.prototype.$http = axios

Vue.config.productionTip = false
var vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

router.afterEach(function(to, from) {
  iView.LoadingBar.finish()
})

// formatString:yyyy-MM-dd HH:mm:ss
Vue.filter('fFormatDate', (value, fmt) => {
  return dateFormat(value, fmt)
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

Vue.component('remote-script', {
  render: function(createElement) {
    var self = this
    return createElement('script', {
      attrs: {
        type: 'text/javascript',
        src: this.src
      },
      on: {
        load: function(event) {
          self.$emit('load', event)
        },
        error: function(event) {
          self.$emit('error', event)
        },
        readystatechange: function(event) {
          if (this.readyState == 'complete') {
            self.$emit('load', event)
          }
        }
      }
    })
  },
  props: {
    src: {
      type: String,
      required: true
    }
  }
})
