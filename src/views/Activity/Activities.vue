<template>
    <div class="activityTab" style="position: relative">
        <div class="page" id="poker">
            <div class="fullSlide">
                <img style="max-width:100%;" src="//image.beike188.com/KFY/images/lottery_chess/chessbanner.jpg">
            </div>
        </div>
        <div class="tab_content">
            <div class="content_box active" v-for="(item,index) in activities" :key="index">
                <ul>
                    <li :class="{'active':item.selected}">
                        <img :src="item.activityImg" :alt="item.activityTitle" @click="mOnClick(item)" style="border-radius: 10px;"/>
                        <div :class="['more_info promo',{'animated fadeInUp active':item.selected}]">
                            <h3 class="more_title t1">{{item.activityTitle}}
                                <a style="float:right;margin-right:30px;"
                                   v-if="!!item.extensionUrl"
                                   target="_blank"
                                   v-bind:href="item.extensionUrl">活动专题
                                    <Icon type="ios-arrow-forward"/>
                                </a></h3>
                            <div>
                                <div class="sign" @click="signed(item)"
                                     v-if="item.activityType==6 || item.activityType==7 || item.activityType==8 || item.activityType==9">
                                    <span v-if="item.signed"><b>已参加</b></span>
                                    <span v-else><b>参加</b></span>
                                </div>
                                <div class="sign" @click="signed(item)" v-if="item.activityType==10">
                                    <span v-if="item.signed"><b>已签到</b></span>
                                    <span v-else><b>签到</b></span>
                                </div>
                                <p>&nbsp;</p>
                                <div><img :src="item.infoImgUrl" width="960px"></div>
                                <p>&nbsp;</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'Activities',
    data () {
      return {
        activities: []
      }
    },
    computed: {
      cGongGaos: function () {
        return this.$store.getters.getGonggaos
      }
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

      mOnClick (item) {
        this.activities.map(x => {
          if (item.id == x.id) {
            x.selected = x.selected ? false : true;
          }
        });
        if ([6, 7, 8, 9, 10].includes(item.activityType)) {
          this.$http
            .post("/activity/isJoin.json", {
              activityId: item.id,
              memberId: this.cLoginUser.id,
              joinCycle:item.joinCycle,
              activityType:item.activityType
            })
            .then(result => {
              if (result.code == 0) {
                this.activities.map(x => {
                  if (item.id == x.id) {
                    x.signed = result.data;
                  }
                });

                this.activities=[...[],...this.activities]
              }
            })
        }
      },

      signed(item) {
        if (item.signed) {
          return;
        }
        this.$http
          .post("/activity/joinActivity.json", {
            activityId: item.id,
            memberId: this.cLoginUser.id,
            joinCycle:item.joinCycle,
            activityType:item.activityType
          })
          .then(result => {
            if (result.code == 0) {
              if (result.data) {
                this.activities.map(x => {
                  if (item.id == x.id) {
                    x.signed = true;
                  }
                });
                this.vm.activityType == 10 ? this.$Message.success('签到成功！') : this.$Message.success('参加成功！');
              }
            } else {
              // this.$Message.error(result.message);
            }
          })
      },
    },
    created () {
      this.mInit()
    }
  }
</script>

<style scoped>
     html {
      height: auto;
    }
     .content_box{
         position: relative;
     }
     .sign {
         position: absolute;
         top: 200px;
         right: 40px;
         width: 60px;
         height: 60px;
         border-radius: 50px;
         background-color: #d0af3a;
         color: #fff;
         justify-content: center;
         align-items: center;
         display: flex;
         font-size: 14px;
         box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
         cursor: pointer;
         z-index: 99;
     }
     .activityTab {
         width: 100%;
         /* margin: 0 auto 100px; */
         /* border: 1px solid #dedede; */
         background: #1e1e1e;
         margin-bottom: -25px;
         /*padding-top: 60px;*/
         /*padding-bottom: 50px;*/
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
    .promo-c1 div {
        margin-bottom: 12px;
    }

    .content_box {
        width: 1000px;
        margin: 0 auto;
        text-align: center;
        margin-top: 10px;
    }

     .content_box > img {
      width: 1000px;
      height: 172px;
      display: block;
      margin-top: 20px;
    }
    .page-body .row {
        background: #282828;
        padding-top: 15px;
    }

    .promo {
        display: none;
    }

    .promo.active {
        display: block;
    }

    .tab_content {
        padding-top: 25px;
        width: 1020px;
        background-image: linear-gradient(90deg, #222325, #3b3c3f, #222325);
        margin: 0 auto;
        padding-bottom: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
     .more_info .more_title {
         color: #369be3;
         height: 40px;
         border: 1px solid #e4e4e4;
         border-radius: 20px;
         line-height: 40px;
         padding-left: 45px;
         background-repeat: no-repeat;
         box-shadow: 0 2px 4px rgba(0,0,0,.1);
         font-size: 20px;
         font-weight: normal;
         margin-bottom: 5px;
         margin-top: 30px;
         background-color: #eaeaea;
     }
</style>
