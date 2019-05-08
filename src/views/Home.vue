<template>
    <div class="container index" style="margin-top:42px;">
        <div class="banner-wrap view view-slideup on">
            <div class="fullSlide">
                <div class="bd bd1">
                    <Carousel autoplay loop :autoplay-speed="5000">
                        <CarouselItem v-for="(item, index) in getpcBanner" :key="index">
                            <div class="demo-carousel"><a><img :src="item" style="width:100%"/></a></div>
                        </CarouselItem>
                    </Carousel>
                </div>
                <!--<div class="banner-button" style="z-index:30;">-->
                <!--<div class="swiper-button-prev prev"></div>-->
                <!--<div class="swiper-button-next next"></div>-->
                <!--</div>-->
            </div>
        </div>
        <div class="main">
            <div class="section section1" style="margin-top: 40px;margin-bottom: 40px;">
                <div class="content">
                    <div class="row last">
                        <div class="t view view-slideup on">
                            <span class="line line1"></span> 顶级推荐
                            <span class="line line2"></span>
                        </div>
                    </div>
                    <div class="casino view view-slideup on" style="transform-style: preserve-3d;perspective: 500px;">
                        <div class="img img1 img-3d1 animated pulse">
                            <img src="//image.beike188.com/KFY/images/index2/img1.jpg">
                            <div class="img-info">
                                <h3>AG极速厅</h3>
                                <p>百家乐客户力荐平台<br> 单注最高200万，豪客首选
                                </p>

                                <div class="img-balance">
                                    <i class="icon-bal"></i>
                                </div>
                                <a href="JavaScript:void(0);" onclick="loadgame('AG');" class="img-btn start-game"
                                   @click="mEnterGame(100)"><span>开始游戏</span></a>
                            </div>
                            <div class="img-mask img-mask-hover"></div>
                        </div>
                        <div class="img img2 img-3d2 animated pulse">
                            <img src="//image.beike188.com/KFY/images/index2/img2.jpg">
                            <div class="img-info">
                                <h3>DG国际厅</h3>
                                <p>2万在线玩家同场竞技<br> 唯一百家乐比赛平台
                                </p>
                                <a href="JavaScript:void(0);" onclick="loadgame('AGIN');" class="img-btn start-game"
                                   @click="mEnterGame(101)"><span>开始游戏</span></a>
                            </div>
                            <div class="img-mask img-mask-hover"></div>
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>

            <div class="section section3">
                <div class="content">
                    <div class="row last">
                        <div class="t view view-slideup on">
                            <span class="line line1"></span> 优惠活动
                            <span class="line line2"></span>
                        </div>
                        <div class="c view view-slideup on" style="display: flex;justify-content: flex-start;flex-flow: row wrap;">
                            <div class="img img1" v-for="(item,index) in activities" :key="index" v-if="index<4">
                                <router-link :to="{name:'Activities'}" class="router-link">
                                <div class="img-name" :style="{backgroundImage:'url('+item.activityImg+')'}"></div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="clear"></div>
            </div>

            <div class="section section2">
                <div class="content">
                    <div class="br"></div>
                    <div class="c view view-slideup on">
                        <iframe :src="cGoodRoad" style="width:100%; height:100%; border: none;">
                        </iframe>
                        <div class="pager2"></div>
                    </div>
                </div>
                <div class="clear"></div>
            </div>

        </div>
        <div class="marquee">
            <div class="marquee-content content">
                <div class="marquee-icon left"></div>
                <div style="width:1116px;height:30px;margin:0 auto;overflow:hidden">
                    <div id="NoticeBoard_Direction_Left_Container_E759m3e3wb" class="Hscrolltxt">
                        <marquee id="mar0"
                                 behavior="scroll"
                                 direction="left"
                                 onMouseOut="this.start()"
                                 onMouseOver="this.stop()"
                        >
                            <div class="module">
                                <span style="cursor: pointer;margin-right:100px;font-size:16px;color:#fff"
                                      v-for="(item,index) in cGongGaos" :key="index">{{item.content}}</span>
                            </div>
                        </marquee>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  var _this

  function StartGameForIframe (gameId) {
    if (_this.cNeedLogin) {
      _this.mAlert('请先登陆！')
      return
    }
    _this.mLoading(true)
    _this.$http
      .post('/managerGame/getMemberGameUrl.json', {
        username: _this.cLoginUser.username,
        gameCompanyId: gameId,
        gameId: 0
      })
      .then(result => {
        _this.mLoading(false)
        if (result.code == 0) {
          setTimeout(() => {
            var winHandler = window.open('', '_blank')
            winHandler.location.href = result.data.dgUrl.pcUrl
          }, 300)
        } else {
          _this.mAlert(result.message)
        }
      })
      .catch(error => {
        _this.mAlert('游戏正忙，请稍后再试...')
      })
  }

  window.addEventListener('message', receiveMessage, false)

  function receiveMessage (event) {
    if (event.data == 'StartGameForIframe101') {
      StartGameForIframe(101)
    }
  }

  export default {
    name: 'Home',
    components: {},
    data () {
      return {
        activities: []
      }
    },
    computed: {
      cGongGaos: function () {
        return this.$store.getters.getGonggaos
      },
      cGoodRoad () {
        return process.env.VUE_APP_GOOD_ROAD_RECOMMENDATION
      },
      getpcBanner: function () {
        var pcBanner = this.$store.getters.getSysPicObj.pcBanner
        var banner = []
        if (pcBanner != undefined && pcBanner != '') {
          banner = pcBanner.split(',')
        }
        return banner
      },
    },
    methods: {
      mInit () {
        this.$http
          .post('/activities.json', { param: { limit: 20, start: 0 } })
          .then(result => {
            if (result.code == 0) {
              let list = result.data.activityVoList
                ? result.data.activityVoList
                : []
              list.forEach(element => {
                element.selected = false
              })
              this.activities = list
            }
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
      alertDownloadApp() {
        if (!this.cNeedLogin) {
          this.$http.post('/memberUser/isPopups.json',{isPopups: true}).then(result => {
            if (result.code == 0) {
              if(result.data.list.length>0){
                this.alert = result.data.list[0];
                this.$alert(this.alert.msgInfo, this.alert.msgTitle, {
                  dangerouslyUseHTMLString: true,
                });
              }
            }
          })
        }
      }
    },
    mounted () {
      this.mInit();
      this.alertDownloadApp();
      transForm(".img-3d1")
      transForm(".img-3d2")
    },
    created () {
      _this = this
    },
    destroyed () {
      _this = undefined
    }
  }

  function transForm (el) {
    let content = document.querySelector(el)
    content.onmousemove = function (e) {
      content.classList.remove("pulse")
      let evt = e || window.event
      let rotateY = -(content.clientWidth / 2 - evt.offsetX) /35
      let rotateX = (content.clientHeight / 2 - evt.offsetY) /35
      content.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }
    content.onmouseout = function (e) {
      content.style.transform = `rotateX(0deg) rotateY(0deg)`
    }
  }
</script>

<style scoped>
    .img{
        box-shadow: 4px 5px 10px #484040;
        cursor: pointer;
    }
    .img:hover{
        box-shadow: 1px 1px 10px #c7bfbf;
    }
    .img-name {
        width: 588px;
        height: 166px;
        background-repeat: no-repeat;
        background-size: 100% auto;
    }

    .img-name:hover {
        background-repeat: no-repeat;
        background-size: 120% auto;
        background-position: center center;
    }
</style>

