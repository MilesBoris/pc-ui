import types from '../mutation-types'

export default {
  state: {
    gongGaos: [],
    sessionToken: '',
    baseUrl: '',
    baseUrlList: [],
    systemSettings: {},
    sysPicObj: {},
  },
  getters: {
    getGonggaos: state => {
      return state.gongGaos
    },
    getSessionToken (state) {
      if (state.sessionToken == '' || state.sessionToken == null) {
        let token = sessionStorage.getItem(types.SESSION_TOKEN)
        if (!token) {
          let d = new Date()
          token = d.getMonth() + 1 + '_' + d.getDate() + '_' + d.getTime()
          sessionStorage.setItem(types.SESSION_TOKEN, token)
        }
        state.sessionToken = token
      }
      return state.sessionToken
    },
    getBaseUrl (state) {
      if (state.baseUrl == '' || state.baseUrl == undefined) {
        return process.env.VUE_APP_BASE_API
      }
      return state.baseUrl
    },
    getSysInfo (state) {
      return state.systemSettings
    },
    getSysPicObj (state) {
      return state.sysPicObj
    },
  },
  mutations: {
    [types.COMMON_GONGGAO] (state, payload) {
      state.gongGaos = payload
    },
    [types.SESSION_TOKEN] (state) {
      let token = sessionStorage.getItem(types.SESSION_TOKEN)
      if (!token) {
        let d = new Date()
        token = d.getMonth() + 1 + '_' + d.getDate() + '_' + d.getTime()
        sessionStorage.setItem(types.SESSION_TOKEN, token)
      }
      state.sessionToken = token
    },
    [types.BASE_URL] (state) {
      if (state.baseUrl == '' || state.baseUrl == null) {
        let url = sessionStorage.getItem(types.BASE_URL)
        if (!url || url == 'undefined') {
          var listStr = localStorage.getItem(types.BASE_URL_LIST)
          if (!listStr || listStr == '[]') {
            this.commit(types.CHANGE_URL)
          } else {
            var list = JSON.parse(listStr)
            // state.baseUrlList = list
            url = list[0]
          }
          // url = state.baseUrlList[0];
          sessionStorage.setItem(types.BASE_URL, url)
        }
        state.baseUrl = url
      }
    },
    [types.CHANGE_URL] (state, url) {
      var listStr = localStorage.getItem(types.BASE_URL_LIST)
      if (!listStr || listStr == '[]') {
        if (state.apigetnum >= 3) {
          var list = []
          list.push(process.env.VUE_APP_BASE_API)
          localStorage.setItem(types.BASE_URL_LIST, JSON.stringify(list))
          state.baseUrl = process.env.VUE_APP_BASE_API
          return
        }
        apiGet(process.env.VUE_APP_API_GET, this.commit, this.dispatch)
        state.apigetnum = state.apigetnum + 1
      } else {
        // listStr.split();
        var list = JSON.parse(listStr)
        state.baseUrlList = list.filter(i => {
          return i != url
        })
        localStorage.setItem(types.BASE_URL_LIST, JSON.stringify(state.baseUrlList))
      }
//     var user = JSON.parse(localStorage.getItem("userInfo"))
//     localStorage.remove("userInfo");
//     localStorage.clear();
      state.baseUrl = state.baseUrlList[0]
    },
    [types.SYSTEM_SETTINGS] (state, payload) {
      state.systemSettings = payload
    },
    [types.SYS_PIC] (state, payload) {
      state.sysPicObj = payload
    },
  },
  actions: {
    [types.COMMON_GONGGAO] ({ commit }, vueContext) {
      if (!!vueContext) {
        let sysId = !!vueContext.cLoginUser.sysId ? vueContext.cLoginUser.sysId : null
        let params = !sysId ? {} : { sysId: sysId }

        vueContext.$http.post('/announcements.json', params).then(result => {
          if (result.code === 0) {
            commit(types.COMMON_GONGGAO, !!result.data ? result.data : [])
          }
        })
      }
    },
    [types.SYSTEM_SETTINGS] ({ commit }, vueContext) {
      if (vueContext) {
        vueContext.$http.post('/getsys.json').then(res => {
          if (res.code === 0) {
            document.title = res.data.name
            commit(types.SYSTEM_SETTINGS, res.data)
            commit(types.SYS_PIC, !!res.data ? res.data : {});
            var obj = document.getElementById("iconlink")
            obj.href = res.data.webIcon;
            obj.type = '';
            obj.type = 'image/x-icon';
          }
        })
      }
    }
  }
}
