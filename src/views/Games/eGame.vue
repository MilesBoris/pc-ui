<template>
    <div class="container slot " style="margin-top: 70px; position: relative">
        <div style="width: 100%; position: relative;overflow: hidden;">
            <div class="fullSlide">
                <div class="bd bd1">
                    <div id="homeSwiper" class="swiper-container eGameBanner">
                        <!--<img style="max-width:100%;" src="//image.beike188.com/KFY/images/slot/banner-game_1.jpg">-->
                    </div>
                </div>
            </div>
        </div>
        <div class="feature">
            <div class="content" style="display: flex;justify-content: space-between">
                <div class="col col1">
                    <div class="prize">
                        CNY
                        <span class="jackpot-count" id="prize1" data-provider="AG">￥
                            <IOdometer
                                    class="iOdometer"
                                    :value="ag"
                                    format="(,ddd).dd"
                                    animation="count"
                            />
                        </span>
                    </div>
                    <p>AG电游总奖池</p>
                </div>
                <div class="col col2">
                    <div class="prize">
                        CNY
                        <span class="jackpot-count" id="prize2" data-provider="PT">￥
                            <IOdometer
                                    class="iOdometer"
                                    :value="pt"
                                    format="(,ddd).dd"
                                    animation="count"
                            />
                    </span>
                    </div>
                    <p>TGP电游总奖池</p>
                </div>
                <div class="col col3">
                    <div class="prize">
                        CNY
                        <span class="jackpot-count" id="prize3" data-provider="MG">￥
                        <IOdometer
                                class="iOdometer"
                                :value="mg"
                                format="(,ddd).dd"
                                animation="count"
                        />
                    </span>
                    </div>
                    <p>DT电游总奖池</p>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="content">
                <div class="tab" id="providerGroup">
                    <div style="background: #1e1e1e;overflow: hidden;">
                        <ul>
                            <li v-for="(room,index) in gameRooms" :key="index" :class="{'on':room.isSelect}"
                                @click="mGameRoomSelect(room.gameCompanyId)"
                                style="width: 107px;height: 40px;background: #1e1e1e; text-align: center; position: relative; cursor: pointer; float: left;list-style: none;">
                                <p class="tit" v-text="room.gameName"
                                   style="font-size: 14px;line-height: 44px;font-weight: 200; color: #999;">
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="search" style="display:block;">
                        <input type="text" class="search-input" id="game_input" placeholder="搜索游戏"
                               @change="mSearchGameByKey" v-model="searchGameKey">
                        <!--  id="searchPart1"  -->
                        <button class="search-btn" id="game_searchdo"></button>
                    </div>
                </div>
                <div id="searchPart2" class="tab-content">
                    <div class="filter">
                        <div class="filter-group" id="game_nav_bar">
                            <a href="javascript:void(0);" class="active" id="partAll">{{gName}}</a>
                            <a href="javascript:void(0);" id="partAG" @click="mSearchGameByKey(0)">全部</a>
                        </div>
                    </div>
                </div>
                <div class="tab-content" id="the_content" style="display: block">
                    <div id="gamesTable">
                        <div class="content_listNumb_box">
                            <div class="game game2 animated pulse" v-for="(game,index) in games" :key="index">
                                <img :src="game.prcUrl" style="width: 100%; height: 100%">
                                <div class="game-details">
                                    <p class="game-title" v-text="game.value"></p>
                                    <div class="likes">
                                        <span class="icon-flame"></span>
                                    </div>
                                </div>
                                <span class="game-mask"></span>
                                <div class="game-hover games">
                                    <h5 v-text="game.value">108好汉</h5><a href="###" class="game-btn gamein"
                                                                         @click="mEnterGame(game.id)">立即游戏</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>

  import IOdometer from 'vue-odometer'
  import 'odometer/themes/odometer-theme-default.css'

  let agTimer, ptTimer, mgTimer
  export default {
    name: 'eGame',
    components: { IOdometer },
    data () {
      return {
        ag: 4206340,
        pt: 5706770,
        mg: 6502960,
        format: '',
        duration: 2000,
        animation: '',
        gameRooms: [
          // {
          //   roomId: 501,
          //   roomName: "KG厅",
          //   isSelect: true,
          //   img1: "/static/images/lottory/app-bg-pt1.png",
          //   img2: "/static/images/lottory/app-bg-pt2.png"
          // },
          // {
          //   roomId: 503,
          //   roomName: "DT厅",
          //   isSelect: false,
          //   img1: "/static/images/lottory/app-bg-dt1.png",
          //   img2: "/static/images/lottory/app-bg-dt2.png"
          // }
          // {
          //   roomId: 502,
          //   roomName: "TGP厅",
          //   isSelect: false,
          //   img1: "/static/images/lottory/app-bg-png1.png",
          //   img2: "/static/images/lottory/app-bg-png2.png"
          // }
        ],
        games: [], //{id,value,prcUrl}
        searchGameKey: '',
        sGames: [],
        gName:"",
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
      this.$http.post('/gamesbytypedisc.json', { sysId: 0 }).then(result => {
        if (result.code == 0) {
          let list = !!result.data.companyCustomGames
            ? result.data.companyCustomGames
            : []
          this.gameRooms = []
          list.forEach((ele, i) => {
            if (ele.typeId == 5) {
              ele.isSelect = false
              this.gameRooms.push(ele)
            }
          })
          this.gameRooms.length > 0 &&
          this.mGameRoomSelect(this.gameRooms[0].gameCompanyId)
        }
      })
    },
    methods: {
      mGameRoomSelect (gameCompanyId) {
        let room
        this.gameRooms.map(r => {
          r.isSelect == false
          if (r.gameCompanyId === gameCompanyId) {
            r.isSelect = true
            room = r
          } else {
            r.isSelect = false
            room = r
          }
        })

        this.gName=this.gameRooms.find(r => r.isSelect == true).gameName;

        if (!!room) {
          this.$http
            .get('/managerGame/gamePlays.json?id=' + gameCompanyId)
            .then(result => {
              if (result.code == 0) {
                this.games = result.data.playlist
                this.sGames = this.games
              }
            })
        }
      },
      mEnterGame (gameid) {
        if (this.cNeedLogin) {
          this.mAlert('请先登陆！')
          return
        }
        this.mLoading(true)
        this.$http
          .post('/managerGame/getMemberGameUrl.json', {
            username: this.cLoginUser.username,
            gameCompanyId: this.cSelectGameRoom.gameCompanyId,
            gameId: gameid
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
        }, randomNum(8000))
      },

      getPt () {
        if (ptTimer) {
          clearTimeout(ptTimer)
        }
        this.pt = this.pt + randomNum(2000)
        ptTimer = setTimeout(() => {
          this.getPt()
        }, randomNum(8000))
      },

      getMg () {
        if (mgTimer) {
          clearTimeout(mgTimer)
        }
        this.mg = this.mg + randomNum(2000)
        mgTimer = setTimeout(() => {
          this.getMg()
        }, randomNum(8000))
      },
      // mEnterCompanyGame(gameid) {
      //   if (this.cNeedLogin) {
      //     this.mAlert("请先登陆！");
      //     return;
      //   }
      //   this.mLoading(true);
      //   this.$http
      //     .post("/managerGame/getMemberGameUrl.json", {
      //       username: this.cLoginUser.username,
      //       gameCompanyId: gameid,
      //       gameId: ""
      //     })
      //     .then(result => {
      //       this.mLoading(false);
      //       if (result.code == 0) {
      //         setTimeout(() => {
      //           var winHandler = window.open("", "_blank");
      //           winHandler.location.href = result.data.dgUrl.pcUrl;
      //         }, 300);
      //       } else {
      //         this.mAlert(result.message);
      //       }
      //     })
      //     .catch(error => {
      //       this.mAlert("游戏正忙，请稍后再试...");
      //     });
      // },
      mSearchGameByKey (k) {
        this.games = []
        if (k === 0) {
          this.searchGameKey = ''
          this.games = Object.assign([], this.sGames)
        } else {
          this.games = this.sGames.filter(
            g => g.value.indexOf(this.searchGameKey) >= 0
          )
        }
      }
    },
    created () {
      //随机1-5秒内 增加1-3000数值
      this.getAg()
      this.getPt()
      this.getMg()
    }
  }

  function randomNum (max) {
    let random = Math.floor(Math.random() * max + 1)
    return random
  }
</script>
<style scoped>
    .search-btn {
        display: block;
        background: url(//image.beike188.com/KFY/images/slot/icon-search.png) no-repeat;
        border-bottom: 0;
        width: 18px;
        height: 18px;
        position: absolute;
        top: 8px;
        right: 16px;
        margin: 0;
        border: none;
    }

    .slot .main .tab ul li:hover {
        border-bottom: 2px solid #cc2944;
        color: #fff;
    }

    .slot .main .tab ul li:visited {
        border-bottom: 2px solid #cc2944;
        color: yellow;
    }
</style>


