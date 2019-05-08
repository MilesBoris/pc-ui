<template>
    <div class="page" id="live">
        <div class="live-banners "></div>
        <div class="page-body">
            <div class="content">

                <div class="row" style="display: flex;justify-content: space-between;flex-flow: row wrap">
                    <div class="cell container" onclick="try_lottery('2')" v-for="(room,index) in gameRooms" :key="index" v-if="room.useTest">
                        <div class="live-image relative" :style="'background-image:Url('+room.imgUrl+')'" >
                            <div class="hot cover-sprite"></div>
                            <div class="mask"></div>
                        </div>
                        <div class="cell-text-wrapper">
                            <div class="cell-title" v-text="room.gameName"></div>
                            <div class="redpink-line"></div>
                            <div class="cell-text">大小单双<br> 生肖四季<br> 多种玩法应有尽有</div>
                            <div class="cell-more"><a href="JavaScript:void(0);" class="start-game" @click="mEnterGame(room.gameCompanyId)">开始游戏 &gt;</a></div>
                        </div>
                    </div>
                </div>


            </div><!-- end div.content -->
        </div><!-- end div.page-body -->
    </div>
</template>
<script>
export default {
  name: "Lottory",
  data() {
    return {
      gameRooms: []
    };
  },
  computed: {
    cGongGaos: function() {
      return this.$store.getters.getGonggaos;
    }
  },
  mounted() {
    this.$http.post("/gamesbytype.json", { sysId: 0 }).then(result => {
      if (result.code == 0) {
        this.gameRooms = !!result.data.companyCustomGames
          ? result.data.companyCustomGames
          : [];
      }
      console.log(this.gameRooms);
    });
  },
  methods: {
    mEnterGame(roomId, gameId) {
      if (gameId == undefined) {
        gameId == "";
      }
      this.$http
        .post("/managerGame/getTestGameUrl.json", {
          gameCompanyId: roomId,
          comGameType: gameId
        })
        .then(result => {
          this.mLoading(false);
          if (result.code == 0) {
            setTimeout(() => {
              var winHandler = window.open("", "_blank");
              winHandler.location.href = result.data.dgUrl.pcUrl;
            }, 300);
          } else {
            this.mAlert(result.message);
          }
        })
        .catch(error => {
          this.mAlert("游戏正忙，请稍后再试...");
        });
    }
  }
};
</script>

<style scoped>
.lotteryPage .lottery li p {
  font-size: 14px;
  color: #816d806b;
  line-height: 30px;
  margin-left: 5px;
}
.free_top {
  width: 978px;
  height: 62px;
  margin: 0 auto;
  padding-top: 30px;
}
.tai_game-box li {
  width: 368px;
  height: 196px;
  border: none;
}
.tai_game-box li.notLast:hover {
  border: none;
  border-radius: 8px;
}
.tai_game-box li.live {
  /* background: url("/static/images/freedemo/free_ag.png") no-repeat; */
  margin-left: 90px;
}
.tai_game-box li.live a {
  background: url("/static/images/freedemo/free_ag_h.png") no-repeat;
}
.notLast {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
