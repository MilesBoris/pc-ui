<template>
    <div class="page" id="sportcolumns_index" style="position: relative">
        <div class="sport-banner"></div>
        <div class="page-body">
            <div class="content list_sport">
                <div class="sports" v-for="(room,index) in gameRooms" :title="room.gameName" :key="index"
                     v-if="room.typeId==4">
                    <h4>{{ room.gameName }}</h4>
                    <div class="sport-img" :style="{backgroundImage:'url('+room.imgUrl+')'}">
                        <div class="trans" onclick="loadgame('HG','','PC');">
                            <a href="javascript:void(0);" target="_blank" class="gold-button"
                               @click="mEnterGame(room.gameCompanyId,room.typeId)">进入游戏</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'Esports',
    data () {
      return {
        gameRooms: [
          // {
          //   roomId: 401,
          //   roomName: "IBC体育",
          //   isSelect: true,
          //   img1: "/static/images/lottory/sport3.png",
          //   info: ""
          // },
          // {
          //   roomId: 402,
          //   roomName: "利鑫体育",
          //   isSelect: true,
          //   img1: "/static/images/lottory/sport2.png",
          //   info: ""
          // }
        ]
      }
    },
    mounted () {
      this.$http.post('/gamesbytypedisc.json', { sysId: 0 }).then(result => {
        if (result.code == 0) {
          this.gameRooms = !!result.data.companyCustomGames
            ? result.data.companyCustomGames
            : []
        }
      })
    },
    computed: {
      cGongGaos: function () {
        return this.$store.getters.getGonggaos
      }
    },
    methods: {
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
      }
    },
    created () {
    }
  }
</script>

<style scoped>
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

    .sport-img {
        background-repeat: no-repeat;
        background-size: 100% auto;
    }

    .list_sport {
        display: flex;
        margin-top: 20px;
        justify-content: space-between;
        flex-flow: row wrap;
    }
</style>
