<template>
    <div>
        <div class="page" id="poker" style="position: relative">
            <div class="fullSlide">
                <ul class="swiper-wrapper swiper-wrapper1">
                    <li>
                        <img style="max-width:100%;"
                             src="//image.beike188.com/KFY/images/lottery_chess/chessbanner.jpg">
                    </li>
                </ul>
            </div>
        </div>
        <div class="page-body">
            <div class="content">
                <div class="row">
                    <div class="title-wrapper">
                        <span class="title">棋牌游戏</span>
                    </div>
                    <div class="promo-c promo-c1" style="display: flex;justify-content: space-around;transform-style: preserve-3d;perspective: 500px;">
                        <div v-for="(room,index) in gameRooms" :key="index"
                             v-if="room.imgUrl"
                             :style="{backgroundImage:'url('+room.imgUrl+')'}"
                             :class="'item img3d'+index"
                        >
                            <div class="trans">
                                <a href="JavaScript:void(0);" class="img-btn start-game" @click="mEnterGame(room.gameCompanyId)">
                                    <span>开始游戏</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>

            </div><!-- end div.content -->
            <div class="clear"></div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'Pocket',
    data () {
      return {
        gameRooms: []
      }
    },
    computed: {
      cGongGaos: function () {
        return this.$store.getters.getGonggaos
      }
    },
    methods: {
      mEnterGame (roomId, gameId) {
        if (this.cNeedLogin) {
          this.mAlert('请先登陆！')
          return
        }
        if (roomId == 601) {
          roomId = 301
        }
        var curgameid = gameId
        if (roomId == 301) {
          curgameid = 'ws00'
        }
        this.mLoading(true)
        this.$http
          .post('/managerGame/getMemberGameUrl.json', {
            username: this.cLoginUser.username,
            gameCompanyId: roomId,
            gameId: curgameid
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
      }
    },
    created () {
    },
    mounted () {
      this.$http.post('/gamesbytypedisc.json', { sysId: 0, playType: 6 }).then(result => {
        if (result.code == 0) {
          this.gameRooms = !!result.data.companyCustomGames
            ? result.data.companyCustomGames
            : [];

          this.$nextTick(()=>{
            transForm(".img3d0");
            transForm(".img3d1");
          })
        }
      })
    },
  }

  function transForm (el) {
    let content = document.querySelector(el)
    if(content){
      content.onmousemove = function (e) {
        let evt = e || window.event
        let rotateY = -(content.clientWidth / 2 - evt.offsetX) /40
        let rotateX = (content.clientHeight / 2 - evt.offsetY) /40
        content.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }
      content.onmouseout = function (e) {
        content.style.transform = `rotateX(0deg) rotateY(0deg)`
      }
    }
  }
</script>

<style scoped>
    .banner_fish {
        width: 100%;
        height: auto;
    }

    .fish_container {
        width: 100%;
        height: 1100px;
        background: #ab7201;
        margin: 0 auto;
        position: relative;
    }

    .fish_box {
        position: relative;
        top: 93px;
        width: 1000px;
        margin: 0 auto;
        height: 500px;
    }

    .fish_container .fish_ag {
        float: left;
    }

    .fish_container .fish_gg {
        float: right;
    }

    .ivu-back-top-inner {
        background-color: #ccc;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease-in-out;
    }

    .ivu-back-top i {
        color: #000;
        font-size: 24px;
        padding: 8px 12px;
    }

    .ivu-icon {
        display: inline-block;
        font-family: Ionicons;
        speak: none;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        text-rendering: auto;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        vertical-align: middle;
    }

    .fish_ag img {
        -webkit-box-shadow: 0 28px 16px -26px black;
        -moz-box-shadow: 0 28px 16px -26px black;
        box-shadow: 0 28px 16px -26px black;
        width: 100%;
        cursor: pointer;
        transition: all 0.6s; /*图片放大过程的时间*/
    }

    .fish_ag :hover {
        transform: scale(1.1);
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -ms-transform: scale(1.1);
        -o-transform: scale(1.1);

        -webkit-box-shadow: 0 58px 36px -56px black;
        -moz-box-shadow: 0 58px 36px -56px black;
        box-shadow: 0 58px 36px -56px black;
    }

    .item {
        background-repeat: no-repeat;
        margin-top: 20px;
        box-shadow: 4px 5px 10px #484040;
        cursor: pointer;
    }

    .item:hover{
        box-shadow: 1px 1px 10px #c7bfbf;
    }

    .img-btn {
        display: block;
        width: 134px;
        height: 36px;
        border: 1px solid #8e703b;
        background: #c2994e;
        color: #fff;
        font-size: 16px;
        line-height: 36px;
        text-align: center;
        -moz-transition: ease .2s;
        -o-transition: ease .2s;
        -webkit-transition: ease .2s;
        transition: ease .2s;
        position: absolute;
        bottom: 30px;
        left: 27px;
        cursor: pointer;
    }
</style>
