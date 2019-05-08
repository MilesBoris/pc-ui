<template>
    <div class="header_bgbox" style="height: 42px;">
        <div class="header view view-slideup off">
            <div class="top">
                <div>
                    <a href="/index.html">
                        <img :src="getpclongLogo" style="margin-top: 0px;" height="45px">
                    </a>
                </div>

                <div class="right-nav">
                    <div v-if="cNeedLogin" class="need-login">
                        <span onclick="$('#mobile_login_before').toggle();$('#index_login_before').hide()" v-show="apiKey">手机登录</span>
                        <span onclick="$('#index_login_before').toggle();$('#mobile_login_before').hide()">账号登录</span>
                        <span><router-link :to="{name:'Reg'}"  onclick="$('#index_login_before').hide();$('#mobile_login_before').hide()" style="color:#fff">注册</router-link></span>
                        <router-link :to="{name:'FreeDemo'}" class="free-demo" style="background-color: #c0c09ecf;">
                            免费试玩
                        </router-link>
                    </div>

                    <!--登录后-->
                    <div id="login_after" class="top-right" v-else>
                        <div class="tools">
                            <div class="notifications tool">
                                <i class="tool-icon tool-icon1"></i>

                                <div class="subnav msg-subnav">
                                    <i class="up"></i>
                                    <div class="messages havemsg">
                                        <div class="sub-t">查看消息
                                            <router-link :to="{name:'MessageList'}" class="more">立即查看</router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="user" style="display: block">
                            <div class="user-info">
                                <h5 class="username" v-text="cLoginUser.username"></h5>
                                <h5 class="username">用户ID：{{cLoginUser.id}}</h5>
                                <h5 class="user-balance">¥ <span id="login_user_money" v-text="realAmount / 100"></span>
                                </h5>
                            </div>

                            <div class="user-img user-img1">
                                <div class="user-nav">
                                    <i class="up el-icon-caret-top"></i>
                                    <router-link :to="{name:'UserCenter'}" class="router-link">
                                        <i class="router-icon vipCenter"></i>会员中心
                                    </router-link>
                                    <router-link :to="{name:'FinanceCenter'}" class="goto_deposit_money">
                                        <i class="router-icon deposit"></i>存款
                                    </router-link>
                                    <router-link :to="{name:'MemberDrawing'}">
                                        <i class="router-icon tikuan"></i>取款
                                    </router-link>
                                    <router-link :to="{name:'IndoorTransfer'}">
                                        <i class="router-icon edu"></i>额度转换
                                    </router-link>
                                    <router-link :to="{name:'ReportTransfer'}">
                                        <i class="router-icon report"></i>账户记录
                                    </router-link>
                                    <router-link :to="{name:'IntegralDraw'}">
                                        <i class="router-icon lotteryDraw"></i>幸运大转盘
                                    </router-link>
                                    <router-link :to="{name:'Exchange'}">
                                        <i class="router-icon score"></i>积分商城
                                    </router-link>
                                    <a href="###" id="su-logout" @click="mLoginOut">
                                        <i class="router-icon loginout"></i>登出
                                    </a>
                                </div>
                            </div>
                            <i class="icon"></i>
                        </div>
                    </div>
                </div>
                <!-- before login 登录前-->
                <div class="login-right animated flipInY" id="index_login_before" v-if="cNeedLogin">
                    <div class="user-login">
                        <div class="login-title">账号登录</div>
                        <div style="display: flex;justify-content: flex-start;flex-direction: column;width:80%;">
                            <div class="login-panel">
                                <i class="userIcon"></i>
                                <input ref="username" v-model="username" placeholder="请输入用户名" clearable
                                       class="login-input"/>
                            </div>
                            <div class="login-panel">
                                <i class="userPwd"></i>
                                <input ref="password" v-model="password" type="password" placeholder="请输入密码" clearable
                                       class="login-input"/>
                            </div>
                            <div class="login-panel">
                                <i class="userCheck"></i>
                                <input v-model="checkcode" @keyup.enter="mLogin" maxlength="4" placeholder="验证码"
                                       clearable class="login-input" style=" width: 100px;"/>
                                <img :src="vcodeurl" @click="mVCode()" class="vertifyCode"/>
                            </div>
                        </div>
                        <el-button type="primary"
                                   @click="mLogin"
                                   style="width:80%;margin-top: 20px;font-size: 16px;height: 40px;"
                        >
                            登 录
                        </el-button>
                    </div>

                </div>
                <div class="login-right animated flipInY" id="mobile_login_before" v-if="cNeedLogin">
                    <div class="user-login">
                        <div class="login-title">手机登录</div>
                        <div style="display: flex;justify-content: flex-start;flex-direction: column;width:80%;">
                            <div class="login-panel">
                                <i class="userGlobal"></i>
                                <el-select v-model="areaCode" filterable placeholder="请选择" class="area">
                                    <el-option v-for="(item,index) in phoneAreaCode"
                                               :key="index"
                                               :label="item.value+'  '+item.code"
                                               :value="item.code"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="login-panel">
                                <i class="userPhone"></i>
                                <input ref="username" v-model="phone" placeholder="请输入手机号" clearable
                                       class="login-input"/>
                            </div>
                            <div class="login-panel" style="position: relative">
                                <i class="userCheck"></i>
                                <input v-model="verifyCode" @keyup.enter="mLogin" maxlength="4" placeholder="验证码"
                                       clearable class="login-input"/>
                                <div class="bg-code" @click="getCode">获取验证码</div>
                            </div>
                        </div>
                        <el-button type="primary"
                                   @click="mPhoneLogin"
                                   style="width:80%;margin-top: 20px;font-size: 16px;height: 40px;"
                        >
                            登 录
                        </el-button>
                    </div>

                </div>
            </div>
        </div>
        <div class="navigation">
            <div class="content view view-slideup on" style="display: flex;justify-content: flex-start">
                <div class="top-logo animated tada">
                    <a href="/index.html">
                        <img :src="getpclongLogo" style="margin-top: 6px;" height="45px">
                    </a>
                </div>
                <ul>
                    <li class="first">
                        <router-link :to="{name:'Home'}">首页</router-link>
                        <span class="dot-line"></span>
                    </li>
                    <li v-for="(web,index) in webnav" :key="index" v-if=" web.typeId!=2 &&web.typeId!=7">
                        <router-link :to="mNameUrl(web)">{{web.typeName}}</router-link>
                        <span class="dot-line"></span>
                    </li>
                    <!--<li class="">-->
                        <!--<router-link :to="{name:'LiveCasino'}">真人视讯</router-link>-->
                        <!--<span class="dot-line"></span></li>-->
                    <!--<li class="">-->
                        <!--<router-link :to="{name:'eGames'}">电子游戏</router-link>-->
                        <!--<span class="dot-line"></span></li>-->
                    <!--<li class="">-->
                        <!--<router-link :to="{name:'CatchFish'}">捕鱼游戏</router-link>-->
                        <!--<span class="dot-line"></span></li>-->
                    <!--<li class="">-->
                        <!--<router-link :to="{name:'Esports'}">体育竞猜</router-link>-->
                        <!--<span class="dot-line"></span></li>-->
                    <!--<li class="">-->
                        <!--<router-link :to="{name:'Lottory'}">传统彩票</router-link>-->
                        <!--<span class="dot-line"></span></li>-->
                    <!--<li class="">-->
                        <!--<router-link :to="{name:'Poket'}">棋牌游戏</router-link>-->
                        <!--<span class="dot-line"></span></li>-->
                    <li class="" v-if="webnav.filter(item=>item.typeId==7).length>0">
                        <a @click="mEnterGame(700)" target="_blank">电竞游戏</a> <span class="dot-line"></span>
                    </li>
                    <li class="last">
                        <router-link :to="{name:'Activities'}">最新优惠</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
  import types from '@/store/mutation-types'
  import message from '@/mixins/message'
  import {mapState} from 'vuex';

  let timer;
  export default {
    name: 'PageHeader',
    mixins: [message],
    data () {
      return {
        vcodeurl: '',
        username: '',
        password: '',
        checkcode: '',
        amount: 0,
        webnav: [],
        nameurl: '',
        heartTimer: null,
        phoneAreaCode: [],
        getCodes: true,
        areaCode: '+86',
        phone: '',
        verifyCode: '',
      }
    },
    computed: {
      ...mapState({
        apiKey: state => state.common.systemSettings.apiKey,
      }),
      cNeedLogin () {
        return this.$store.getters.getNeedLogin
      },
      getpclongLogo () {
        return this.$store.getters.getSysPicObj.pclongLogo
      },
    },
    mounted () {
      this.mMemberAmount()
      this.$http.post('/webnav.json', { sysId: 0 }).then(result => {
        if (result.code == 0) {
          this.webnav = !!result.data.companyCustomGametypes
            ? result.data.companyCustomGametypes
            : []
        }
      })

      this.mHeart()
      this.$watch('cNeedLogin', function (n, o) {
        if (!n) {
          this.mHeart()
        }
      })

      if(this.apiKey){
        $('#mobile_login_before').show()
      }
      else{
        $('#index_login_before').show()
      }

    },
    methods: {
      mNameUrl (webnav) {
        if (webnav.typeId == 1) {
          return 'LiveCasino'
        } else if (webnav.typeId == 50) {
          return 'CatchFish'
        } else if (webnav.typeId == 5) {
          return 'eGames'
        } else if (webnav.typeId == 4) {
          return 'Esports'
        } else if (webnav.typeId == 3) {
          return 'Lottory'
        } else if (webnav.typeId == 6) {
          return 'egames-poket'
        }
      },
      mEnName (webnav) {
        if (webnav.typeId == 1) {
          return 'Live Casino'
        } else if (webnav.typeId == 50) {
          return 'Catch Fish'
        } else if (webnav.typeId == 5) {
          return 'Slots'
        } else if (webnav.typeId == 4) {
          return 'Sports'
        } else if (webnav.typeId == 3) {
          return 'Lottory'
        } else if (webnav.typeId == 6) {
          return 'Poket'
        }
      },
      mEnter301Game () {
        if (this.cNeedLogin) {
          this.mAlert('请先登陆！')
          return
        }
        this.mLoading(true)
        this.$http
          .post('/managerGame/getMemberGameUrl.json', {
            username: this.cLoginUser.username,
            gameCompanyId: 301,
            gameId: 'ws00'
            // comGameType: "50"
          })
          .then(result => {
            this.mLoading(false)
            if (result.code == 0) {
              setTimeout(() => {
                var winHandler = window.open('', '_blank')
                winHandler.location.href = result.data.dgUrl.pcUrl
              }, 300)
            } else {
              this.mAlert(result.message)
            }
          })
          .catch(error => {
            this.mAlert('游戏正忙，请稍后再试...')
          })
      },
      mEnterGame (roomId) {
        if (this.cNeedLogin) {
          this.mAlert('请先登陆！')
          return
        }
        this.mLoading(true)
        this.$http
          .post('/managerGame/getMemberGameUrl.json', {
            username: this.cLoginUser.username,
            gameCompanyId: roomId,
            gameId: 0
          })
          .then(result => {
            this.mLoading(false)
            if (result.code == 0) {
              setTimeout(() => {
                var winHandler = window.open('', '_blank')
                winHandler.location.href = result.data.dgUrl.pcUrl
              }, 300)
            } else {
              this.mAlert(result.message)
            }
          })
          .catch(error => {
            this.mAlert('游戏正忙，请稍后再试...')
          })
      },
      mVCode () {
        this.checkcode = ''
        this.vcodeurl = `${this.cApi}/checkCode.json?t=${Math.random()}&token=${
          this.$store.getters.getSessionToken
          }`
      },
      toggleState () {
        this.$store.commit('toggleLoginState')
      },
      mLogin () {
        if (!this.username) {
          this.mAlert('请输入用户名和密码！', () => {
            this.$refs.username.focus()
          })
          return
        }
        if (!this.password) {
          this.mAlert('请输入用户名和密码！', () => {
            this.$refs.password.focus()
          })
          return
        }
        if (!this.checkcode) {
          this.mAlert('请输入验证码', () => {
            this.$refs.checkcode.focus()
          })
          return
        }
        this.mLoading(true, '登陆中...')
        this.$http
          .post('/login.json', {
            username: this.username,
            password: this.password,
            checkcode: this.checkcode
          })
          .then(result => {
            if (result.code === 0) {
              this.$store.dispatch(types.SAVE_LOGIN_USER, result.data)
              this.mLoading(false)
              this.mMessage(
                '登陆成功！',
                () => {
                  this.$store.dispatch(types.COMMON_GONGGAO, this)
                  this.toggleState()
                  this.mMemberAmount()
                },
                'success',
                0.5
              )
            } else {
              this.mAlert(
                result.message,
                () => {
                  this.isLogining = false
                  this.mVCode()
                },
                'error',
                null,
                null,
                1
              )
            }
          })
      },
      mPhoneLogin(){
        if (this.phone.trim() == "") {
          this.mAlert('请输入手机号码！'); //请输入手机号码
          return;
        }
        if (this.verifyCode.trim() == "") {
          this.mAlert('请输入手机验证码！') ; //
          return;
        }
        this.mLoading(true);
        this.$http.post("/memberUser/quickLogin.json", {phoneNo:this.phone,areaCode:this.areaCode,verifyCode:this.verifyCode}).then(result => {
          this.mLoading(false);
          if (result.code == 0) {
            this.$store.dispatch(types.SAVE_LOGIN_USER, result.data);
            this.mLoading(false);
            this.mMessage(
              "登陆成功！",
              () => {
                if(result.data.isNewMember==1){
                  this.mConfirm('您的初始密码是123456, 是否前去修改?', () => {
                    this.$router.push({name: 'LoginPassword'})
                  })
                }
                this.$store.dispatch(types.COMMON_GONGGAO, this);
                this.$router.push({ name: "Home" });
              },
              "success",
              0.5
            );
          } else {
            this.mVCode();
            this.verifyCode='';
            // this.$Message.error(result.message);
          }
        });
      },
      mLoginOut () {
        this.mConfirm('确定要退出吗？', () => {
          this.mLoading(true, '请稍等...')
          this.$http.post('/logout.json').then(result => {
            if (result.code === 0) {
              sessionStorage.removeItem(types.SESSION_TOKEN)
              this.$store.commit(types.SESSION_TOKEN)
              this.$store.dispatch(types.LOGINOUT_USER)
              this.mLoading(false)
              this.mReLogin()
            }
          })
        })
      },
      mEnter601Game () {
        if (this.cNeedLogin) {
          this.mAlert('请先登陆！')
          return
        }
        this.mLoading(true)
        this.$http
          .post('/managerGame/getMemberGameUrl.json', {
            username: this.cLoginUser.username,
            gameCompanyId: 601,
            gameId: 0
          })
          .then(result => {
            this.mLoading(false)
            if (result.code == 0) {
              setTimeout(() => {
                var winHandler = window.open('', '_blank')
                winHandler.location.href = result.data.dgUrl.pcUrl
              }, 300)
            } else {
              this.mAlert(result.message)
            }
          })
          .catch(error => {
            this.mAlert('游戏正忙，请稍后再试...')
          })
      },
      mHeart () {
        if (!this.cNeedLogin) {
          if (this.heartTimer) {
            clearTimeout(this.heartTimer)
          }
          this.$http.post('/checkOnline.json').then(res => {
            if (res.code == 0) {
              this.heartTimer = setTimeout(() => {
                this.mHeart()
              }, 3 * 1000)
            }
          })
        } else {
          if (this.heartTimer) {
            clearTimeout(this.heartTimer)
          }
        }
      },
      getCode() {
        if (this.getCodes) {
          if (this.phone.trim() == "") {
            this.mAlert('请输入手机号码!'); //请输入手机号码
            return;
          }
          let time = 60;
          this.getCodes = false;
          timer = setInterval(() => {
            if (time >= 1) {
              time--;
              $('.bg-code').text(time + ' 秒')
            } else {
              this.getCodes = true;
              clearInterval(timer);
              $('.bg-code').text('获取验证码');
              console.log(1)
            }
          }, 1000)

          this.$http.post("/memberUser/sendVerifyCode.json", {
            mobile: this.phone,
            areaCode: this.areaCode
          }).then(result => {
            if (result.code == 0) {
              this.$Message.success('验证码已发送!');
            } else {
              this.$Message.error(result.message);
            }
          })
        }
      }
    },
    created () {
      this.mVCode()
      this.mCheckLoginState()
      this.$http.post('/phoneAreaCode.json').then(result => {
        if (result.code == 0) {
          this.phoneAreaCode = result.data.codes
        } else {
          this.$Message.error(result.message)
        }
      })
      window.onscroll = function () {
        let scrollheight = document.body.scrollTop == 0 ? document.documentElement.scrollTop
          : document.body.scrollTop
        if (scrollheight >= 45) {
          document.querySelector('.navigation').classList.add('fixed')
        } else {
          document.querySelector('.navigation').classList.remove('fixed')
        }

      }
    }
  }
</script>
<style>
    .navigation li a {
        font-size: 16px;
        line-height: 60px;
        height: 60px;
        color: #fff;
        display: block;
        position: relative;
        text-align: center;
    }

    .top .login-right{
        display: none;
    }
    input {
        display: inline-block;
        width: 100%;
        height: 32px;
        line-height: 1.5;
        padding: 4px 7px;
        font-size: 12px;
        border: 1px solid #dcdee2;
        border-radius: 4px;
        color: #515a6e;
        background-color: #fff;
        background-image: none;
        position: relative;
        cursor: text;
        transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
        box-shadow 0.2s ease-in-out;
    }

    .login-panel {
        display: flex;
        justify-content: flex-start;
        margin-top: 10px;
    }

    .login-input {
        width: 180px;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        padding-left: 10px;
        color: #000000;
        border-radius: 0;
        background-color: #ffffff;
        outline: none;
    }

    .vertifyCode {
        height: 35px;
        margin-left: 10px;
        width: 70px;
    }

    #login_after {
        display: flex;
        justify-content: flex-end;
    }

    .login-title {
        font-size: 17px;
        -webkit-font-smoothing: subpixel-antialiased;
        padding-bottom: 14px;
        width: 80%;
        text-align: center;
        border-bottom: solid 1px #fff;
        margin-bottom: 10px;
    }

    .right-nav {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 45px;
        color: #ffffff;
        font-size: 14px;
        font-weight: 600;
    }

    .need-login {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .need-login span {
        margin-right: 20px;
        cursor: pointer;
    }

    .need-login span:hover {
        text-decoration: underline;
    }


    .top-logo {
        display: none;
    }

    .fixed .top-logo {
        display: block
    }

    .fixed li.first {
        padding-left: 15px;
    }

    .area  .el-input__inner {
        height: 36px;
        border-left: 0;
        border-radius: 0;
        margin-left: 1px;
        width: 180px;
        outline: none;
    }

    .el-select .el-input.is-focus .el-input__inner{
        border-color: #dcdee2 !important;
    }

    .bg-code{
        position: absolute;
        right:3px;
        top: 5px;
        width: auto;
        height: 25px;
        line-height: 25px;
        min-width: 70px;
        background-color: #aaaaaa;
        border-radius: 4px;
        color: #f3f3f3;
        padding: 0px;
        display: flex;
        font-size: 12px;
        white-space: nowrap;
        align-items: center;
        text-align: center;
        justify-content: center;
    }
</style>

