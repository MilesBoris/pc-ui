<template>
    <!-- <div>
        <div class="banner" style="height: 352px;">
            <div class="bd">
            <ul>
                <li>
                <img src="/static/images/lottory/banner.jpg" alt="">
                </li>
            </ul>
            </div>
        </div>
        <div class="zhenrenPage">
            <div class="zhenren w">
                <ul>
                    <li v-for="(room,index) in gameRooms" :key="index" v-if="room.typeId==1 && room.state>=1" >
                        <div class="xx1"><img :src="room.img1"></div>
                        <div class="xx2">{{room.info}}<br>{{room.info1}}</div>
                        <div class="xx4">
                        <span>{{room.gameName}}</span>
                        <a href="javascript:void(0);" :title="room.gameName"
                            @click="mEnterGame(room.gameCompanyId)">进入游戏</a>
                        </div>
                        <div class="xx5"><img :src="room.imgUrl" style="height: 175px;width: 318px;"></div>
                    </li>
                    <li class="more"></li>
                </ul>
            <div class="clear"></div>
            </div>
        </div>

        <BackTop :height="10" :bottom="10">
            <div class="ivu-back-top-inner">
                <i class="ivu-icon ivu-icon-ios-arrow-up"></i>
            </div>
        </BackTop>
    </div> -->
    <div class="page" id="live">
        <div class="live-banner ">
            <div class="content container" style="overflow: initial;">
                <div class="banner-text-wrapper">
                    <div class="banner-title">AG极速厅</div>
                    <div class="redpink-line"></div>
                    <div class="banner-text"><br> 全球首创，6张牌先发<br>6大特点：好路提示，赢钱机会绝不错过</div>
                    <div class="banner-more"></div>
                    <div class="banner-button-wrapper">
                        <div class="white-button start-game" @click="mEnterGame(100)"> 开始游戏</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="content">
                <div class="row container livePerson">
                    <div style="margin-bottom: 30px" v-for="(room,index) in gameRooms" :key="index"
                         v-if="room.typeId==1 && room.state>=1"
                         @mouseover="mOver"
                         @mouseout="mOut"
                         class="animated pulse"
                    >
                        <div class="live-image relative animated" :style="{backgroundImage: 'url(' + room.imgUrl + ')'}">
                            <div class="hots cover-sprite"></div>
                        </div>
                        <div class="cell-text-wrapper">
                            <div class="cell-title">{{room.gameName}}</div>
                            <div class="cell-text"></div>
                            <div class="cell-more animated">
                                <a href="JavaScript:void(0);" class="start-game" @click="mEnterGame(room.gameCompanyId)">开始游戏</a>
                            </div>
                        </div>
                    </div>
                    <div style="margin-bottom: 30px">
                        <div class="live-image relative animated pulse" id="live-11">
                            <div class="hot cover-sprite"></div>
                            <div class="mask"></div>
                        </div>
                        <div class="cell-text-wrapper">
                            <div class="cell-title">敬请期待</div>
                            <div class="cell-text"></div>
                            <div class="cell-more"><a href="javascript:void(0);" class="start-game">敬请期待</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'LiveCasino',
    data () {
      return {
        gameRooms: []
      }
    },
    computed: {
      cSelectGameRoom: function () {
        return this.gameRooms.find(r => r.isSelect == true)
      },
      cGongGaos: function () {
        return this.$store.getters.getGonggaos
      }
    },
    mounted () {
      this.$http.post('/gamesbytypedisc.json', { sysId: 0 ,playType :1}).then(result => {
        if (result.code == 0) {
          this.gameRooms = !!result.data.companyCustomGames
            ? result.data.companyCustomGames
            : []
        }
      })
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
      },
      mOver(event){
        event.currentTarget.firstChild.classList.remove("pulse");
        event.currentTarget.firstChild.classList.add("pulse");
        event.currentTarget.lastChild.lastChild.classList.add("bounceIn");
      },
      mOut(event){
        event.currentTarget.firstChild.classList.remove("pulse");
        event.currentTarget.lastChild.lastChild.classList.remove("bounceIn");
      }
    },
    created () {
    }
  }


</script>

<style scoped>
    .cell-title {
        font-size: 16px;
    }

    .cell {
        width: 560px;
    }

    .livePerson {
        display: flex;
        justify-content: space-between;
        flex-flow: row wrap;
    }

    .cell-title {
        border-bottom: 2px solid #cc2944;
        text-align: left;
        padding-bottom: 3px;
        font-weight: bold;
        margin-left: 15px;
        width: 70%;
    }

    .start-game {
        width: 120px;
        height: 32px;
        float: left;
        background: #ffce4b;
        font-size: 16px;
        color: #272727;
        text-align: center;
        line-height: 32px;
        border-radius: 20px;
        font-weight: bold;
        margin-left: 15px;
    }

    .start-game:hover {
        text-decoration: none;
        background: #ffce4b;
    }
</style>
