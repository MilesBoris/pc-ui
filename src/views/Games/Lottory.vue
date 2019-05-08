<template>
    <div class="page" id="poker" style="position: relative">
        <div class="fullSlide lotteryBanner"></div>

        <div class="page-body" style="padding-top: 20px">
            <div class="content">
                <div class="row">
                    <div class="title-wrapper">
                        <span class="title">彩票游戏</span>
                    </div>
                    <div class="promo-c promo-lottery">

                        <div class="lottery"
                             v-for="(room,index) in gameRooms"
                             :title="room.gameName"
                             :key="index"
                             v-if="room.typeId==3"
                             :style="{backgroundImage:'url('+room.imgUrl+')'}"
                             @click="mEnterGame(room.gameCompanyId,room.typeId)"
                        >
                            <h2>{{room.gameName}}</h2>
                            <div class="trans">
                                <div class="promo-info">
                                    <h2>{{room.gameName}}</h2>
                                    <span class="red-line"></span>
                                    <a href="javascript:void(0);"
                                       class="trial-game  free-trial poker-button poker-sprite" data-game-id="A02004"
                                       data-game-credit="200"
                                    >开始游戏</a>
                                    <p>北京、斯洛伐克、加拿大西部</p>
                                    <p>俄勒冈、加拿大...</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div><!-- end div.content -->
            <div class="clear"></div>
        </div><!-- end div.page-body -->
    </div>
</template>
<script>
  export default {
    name: 'Lottory',
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
    mounted () {
      this.$http.post('/gamesbytypedisc.json', { sysId: 0, playType: 3 }).then(result => {
        if (result.code == 0) {
          this.gameRooms = !!result.data.companyCustomGames
            ? result.data.companyCustomGames
            : []
        }
      })
    },
    methods: {
      mEnterGame (roomId, typeId) {
        if (this.cNeedLogin) {
          this.mAlert('请先登陆！')
          return
        }
        this.mLoading(true)
        this.$http
          .post('/managerGame/getMemberGameUrl.json', {
            username: this.cLoginUser.username,
            gameCompanyId: roomId,
            comGameType: typeId
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
    }
  }
</script>

<style scoped>
    .lotteryPage .lottery li p {
        font-size: 14px;
        color: #816d806b;
        line-height: 30px;
        margin-left: 5px;
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

    .lottery {
        background-repeat: no-repeat;
        border: solid 1px #ccc;
        height: 300px;
    }
</style>
