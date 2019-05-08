<template>
    <div class="container slot fish-bg" style="margin-top: 70px;">
        <!--<div class="banner">-->
        <!--<div class="banner-cycle">-->
        <!--<img style="width:100%;height:100%;" src="//image.beike188.com/KFY/images/fish/fishbanner.jpg" alt="">-->
        <!--</div>-->
        <!--<div class="content">-->
        <!--<div class="previous cover-sprite" id="prev"></div>-->
        <!--<div class="next cover-sprite" id="next"></div>-->
        <!--</div>-->
        <!--</div>-->
        <div class="feature">
            <div class="content">
                <div class="col col1">
                    <div class="prize">
                        CNY
                        <span class="jackpot-count" id="prize1" data-provider="AG">
                            ￥<IOdometer
                                class="iOdometer"
                                :value="ag"
                                format="(,ddd).dd"
                                animation="count"
                        />
                        </span>
                    </div>
                    <p>JDB电游总奖池</p>
                </div>
                <div class="col col2">
                    <div class="prize">
                        CNY <span class="jackpot-count" id="prize2" data-provider="PT">
                        ￥<IOdometer
                            class="iOdometer"
                            :value="pt"
                            format="(,ddd).dd"
                            animation="count"
                    />
                    </span>
                    </div>
                    <p>无双电游总奖池</p>
                </div>
                <div class="col col3">
                    <div class="prize">
                        CNY <span class="jackpot-count" id="prize3" data-provider="MG">
                        ￥<IOdometer
                            class="iOdometer"
                            :value="mg"
                            format="(,ddd).dd"
                            animation="count"
                    />
                    </span>
                    </div>
                    <p>QG电游总奖池</p>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="content">
                <div class="startCatch" @click="mEnterGame">
                    <span class="smallFish animated zoomInLeft"></span>
                    <span class="startGame animated swing"> 开始捕鱼</span>
                    <span class="catching">开始捕鱼</span>
                </div>
                <!--<div class="tab-content" id="the_content" style="display: block">-->
                <!--<div id="gamesTable">-->
                <!--<div class="content_listNumb_box" style="padding-top: 85px;">-->
                <!--<div class="game game1">-->
                <!--<span class="jackpot">22,131,968.00</span>-->
                <!--<img src="//image.beike188.com/KFY/images/fish/01.jpg">-->
                <!--<div class="game-details"><p class="game-title"><span-->
                <!--class="game-name">BG 捕鱼王</span><span class="game-dec">花式捕鱼 爽快捞金</span></p>-->
                <!--<div class="likes">人气 89,566<span class="icon-flame"></span></div>-->
                <!--</div>-->
                <!--<span class="game-mask"></span>-->
                <!--<div class="game-hover games" onclick="loadgame('AGBY');">-->
                <!--<h5>BG 捕鱼王</h5>-->
                <!--<a href="###" class="game-btn gamein" @click="mEnterGame">立即游戏</a>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <!--<div class="clear"></div>-->
                <!--</div>-->
            </div>
        </div>
    </div>
</template>
<script>

  import IOdometer from 'vue-odometer'
  import 'odometer/themes/odometer-theme-default.css'

  let agTimer, ptTimer, mgTimer
  export default {
    name: 'CatchFish',
    components: { IOdometer },
    data () {
      return {
        ag: 2506340,
        pt: 3506770,
        mg: 5502960,
        format: '',
        duration: 2000,
        animation: '',
      }
    },
    computed: {
      cGongGaos: function () {
        return this.$store.getters.getGonggaos
      }
    },
    methods: {
      mEnterGame () {
        if (this.cNeedLogin) {
          this.mAlert('请先登陆！')
          return
        }
        this.mLoading(true)
        this.$http
          .post('/managerGame/getMemberGameUrl.json', {
            username: this.cLoginUser.username,
            gameCompanyId: 102,
            gameId: '',
            comGameType: '50'
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
      getAg () {
        if (agTimer) {
          clearTimeout(agTimer)
        }
        agTimer = setTimeout(() => {
          this.ag = this.ag + randomNum(2000)
          this.getAg()
        }, randomNum(5000))
      },

      getPt () {
        if (ptTimer) {
          clearTimeout(ptTimer)
        }
        this.pt = this.pt + randomNum(2000)
        ptTimer = setTimeout(() => {
          this.getPt()
        }, randomNum(5000))
      },

      getMg () {
        if (mgTimer) {
          clearTimeout(mgTimer)
        }
        this.mg = this.mg + randomNum(2000)
        mgTimer = setTimeout(() => {
          this.getMg()
        }, randomNum(5000))
      }
    },
    mounted () {
      let startCatch = document.querySelector('.startCatch')
      let catching = document.querySelector('.catching')
      let smallFish = document.querySelector('.smallFish')
      let startGame = document.querySelector('.startGame')
      startCatch.onmousemove = function () {
        catching.style.display = 'none'
        smallFish.style.display = 'block'
        startGame.style.display = 'block'
      }
      startCatch.onmouseleave = function () {
        catching.style.display = 'block'
        smallFish.style.display = 'none'
        startGame.style.display = 'none'
      }
    },
    created () {
      //随机1-5秒内 增加1-3000数值
      this.getAg()
      this.getPt()
      this.getMg()
    },
  }

  function randomNum (max) {
    let random = Math.floor(Math.random() * max + 1)
    return random
  }
</script>

<style scoped>
    .slot .game .game-hover {
        height: 250px;
    }

    .slot .game {
        height: 250px;
    }

    .slot .game1 .game-hover {
        width: 596px;
    }

    .slot .feature {
        background: transparent;
        margin-top: -330px;
    }

    .slot .feature .content {
        display: flex;
        justify-content: space-between;
    }

    .slot .feature .content .col {
        margin-left: 0;
    }

    .slot .main {
        background: transparent;
        margin-top: 240px;
    }

    .slot .feature .col {
        height: 100px;
        background-color: rgba(33, 31, 31, 0.6);
    }

    .startCatch {
        width: 340px;
        height: 70px;
        border-radius: 10px;
        border: solid 1px #fff;
        float: right;
        margin-right: 200px;
        line-height: 70px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        margin-top: 50px;
        font-weight: 600;
        letter-spacing: 10px;
        box-shadow: 1px 1px 10px #c7bfbf;
        cursor: pointer;
        display: flex;
        justify-content: center;
    }
</style>

