<template>
    <div style="margin-top: 60px">
        <div class="banner">
            <div class="banner-box">
                <div class="banner-text" v-for="(item,index) in roulette" :key="index">
                    <p>活动开始时间:{{item.activityStrartTimeStr}}</p><!-- 活动开始时间-->
                    <p>活动结束时间:{{item.activityEndTimeStr}}</p><!-- 活动结束时间-->

                </div>
                <!-- <div class="zp">
                  <img src="/Public/Home/Mobile/images/zhuanpan_c.png" />
                </div> -->
             <!--   <div class="zp">
                    <img src="/static/images/activity/zhuanpan.png" id="zhuanpan_bg" style="transform: rotate(0deg);">
                    <a @click="zhuan">
                    <img src="/static/images/activity/zhuanpan_c.png" id="startbtn">
                    </a>
                </div>-->
                <div class="zp">
                    <div class="wheel-pointer-box">
                        <div class="wheel-pointer" @click="zhuan()" :style="{transform:rotate_angle_pointer,transition:rotate_transition_pointer}"></div>
                    </div>
                    <div class="wheel-bg" :style="{transform:rotate_angle,transition:rotate_transition}">
                        <div class="prize-list">
                            <div class="prize-item" v-for="(item,index) in prize_list" :key="index">
                                <div class="prize-pic">
                                    <!--<div :style="{backgroundImage:'url('+item.prizePictureAddress+')'}"></div>-->
                                    <img :src="item.prizePictureAddress">
                                </div>
                                <div class="prize-type">
                                    {{item.prizeName}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hot" style="width: auto;">
            <div class="hot-box">
                <ul class="list">
                    <li v-show="switch1=='true'">剩余抽奖次数：{{drawTimes}}</li><!-- 剩余抽奖次数：-->
                    <li v-show="switch2=='true'">当前积分: {{integral}}<span id="number"></span></li><!--当前积分： -->
                    <li> <a @click="mOpen(cLoginUser.id)" class="winner-record" >中奖纪录</a>&nbsp;&nbsp;&nbsp;</li><!--中奖纪录 -->
                </ul>
                <div class="gdbf">
                    <p>最新消息</p><!--最新消息 -->
                    <div class="txtMarquee-left">
                        <div class="hd">
                            <a class="next"></a>
                            <a class="prev"></a>
                        </div>

                        <div class="bd">
                            <ul class="infoList">
                                <li v-for="(item,index) in roulette" :key="index">
                                <marquee  width="880px" direction="left"  behavior="scroll"  scrollamount="8"  loop="1"  hspace="90"   vspace="50">
                                     {{item.advert}}
                                </marquee>
                                </li>
                               <!-- <li>&nbsp;&nbsp;&nbsp;&nbsp; </li>-->

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cont">
            <div class="cont-box">
                <div class="cont-title">
                    获奖名单
                </div><!-- 获奖名单-->
                <div class="name-list">
                    <div class="txtMarquee-top fl">

                        <div class="bd">
                            <div class="tempWrap" style="overflow:hidden; position:relative; height:172px">
                                <ul class="infoList" style="height: 300px; position: relative; padding: 0px; margin: 0px;">
                                    <marquee behavior="scroll" direction="up" height="160">
                                        <li class="clone" style="height: 24px;"  v-for="(item,index) in luckDraw" :key="index" v-if='index<20'><!--恭喜  中奖 -->
                                                <span class="span4">恭喜&nbsp;&nbsp;{{item.winningUser}}</span>&nbsp;&nbsp;&nbsp;&nbsp;中奖
                                                <span class="span5">{{item.prizeName}}</span>&nbsp;&nbsp;
                                                <span class="span6">{{item.luckyDrawTimeStr}}</span>
                                        </li>
                                    </marquee>
                            </ul>
                            </div>
                        </div>
                    </div>
                    <div class="txtMarquee-top fr">
                        <div class="bd">
                            <div class="tempWrap" style="overflow:hidden; position:relative; height:172px">
                                <ul class="infoList" style="height: 300px; position: relative; padding: 0px; margin: 0px;" >
                                    <marquee behavior="scroll" direction="up" height="160">
                                        <li class="clone" style="height: 24px;"  v-for="(item,index) in luckDraw " :key="index" v-if='index>20'><!--恭喜 中奖-->
                                                <span class="span4">恭喜&nbsp;&nbsp;{{item.winningUser }}</span>&nbsp;&nbsp;&nbsp;&nbsp;中奖
                                                <span class="span5">{{item.prizeName}}</span>&nbsp;&nbsp;
                                                <span class="span6">{{item.luckyDrawTimeStr}}</span>
                                        </li>
                                    </marquee>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!--活动条件 -->
                <div class="cont-title">
                    活动条件
                </div>
                <div class="introduce"  v-for="(item,index) in roulette" :key="'ac'+index">
                    <p v-html="item.activityConditions"></p>
                </div>
                <div class="cation">

                </div>
                <!-- 奖品说明-->
                <div class="cont-title">
                    奖品说明
                </div>
                <div class="introduce" v-for="(item,index) in roulette" :key="'pd'+index">
                    <p v-html="item.prizeDescription"></p>
                </div>
                <!-- 活动说明-->
                <div class="cont-title">
                    活动说明
                </div>
                <div class="introduce"  v-for="(item,index) in roulette" :key="'ad'+index">
                    <p v-html="item.activityDescription"></p>
                </div>
            </div>
        </div>

        <div class="toast" v-show="toast_control=='true'">
            <div class="toast-container">
                <img :src="toast_pictrue" class="toast-picture">
                <div class="close" @click="close_toast()"></div>
                <div class="toast-title">
                    {{toast_title}}
                </div>
                <div class="toast-btn">
                                                                <!-- 关闭-->
                    <div class="toast-cancel"  @click="close_toast">关闭</div>
                </div>
            </div>
        </div>
        <div class="toast-mask" v-show="toast_control=='true'"></div>
    </div>
</template>

<script>
    import window from "../../mixins/window";
    export default {
        name: "IntegralDraw",
        mixins: [window],
        data() {

            return {
                easejoy_bean: 0, //金豆
                integral: 0, //积分
                drawTimes:0,//剩余抽奖次数
                luckDraw:[],//中奖名单
                roulette:[],//轮盘设置
                switch1:'false',//剩余次数开关 false关闭 true 开启
                switch2:'false',//抽奖积分开关 false关闭 true 开启
                prize_list: [{
                    icon:"",// 奖品图片
                    count: "", // 奖品数量
                    name: "", // 奖品名称
                    isPrize: "" // 该奖项是否为奖品
                }],
                toast_control: 'false', //抽奖结果弹出框控制器
                hasPrize: 'false', //是否中奖
                start_rotating_degree: 0, //初始旋转角度
                rotate_angle: 0, //将要旋转的角度
                start_rotating_degree_pointer: 0, //指针初始旋转角度
                rotate_angle_pointer: 0, //指针将要旋转的度数
                rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
                rotate_transition_pointer: "transform 12s ease-in-out", //初始化指针过度属性控制
                click_flag: true, //是否可以旋转抽奖
                index: 0
            };
        },  computed: {
            toast_title() {
                //恭喜您，活的
                return this.hasPrize
                    ? "恭喜您，获得" +/*this.prize_list[this.index].count + ' ' + */this.prize_list[this.index].prizeName
                    : this.prize_list[this.index].prizeName;
            },
            toast_pictrue() {
                return this.hasPrize
                    ? "/static/images/activity/congratulation.png"
                    : "/static/images/activity/sorry.png";
            }
        },
        mounted(){
            this.mLoading(true);
          //初始化轮盘 加载奖品信息
          this.$http.get("/integralDrawC/roulettePrize.json").then(result =>{
              if(result.code == 0){
                    //this.prize_list = !!result.data?result.data : [];
                    this.prize_list = !!result.data?result.data : [];

              }else{
                  //轮盘活动界面初始化失败，请刷新界面
                  this.mAlert("轮盘活动界面初始化失败，请刷新界面");
              }
          }),
         //获取中奖名单
          this.$http.get("/integralDrawC/getWinningList.json").then(result =>{
              if(result.code == 0){
                  this.luckDraw = !!result.data?result.data : [];
                  if(result.message<0){
                      this.drawTimes = 0;
                  }else{
                      this.drawTimes = result.message;
                  }
              }else{
                  //获取中奖名单失效，请刷新界面
                  this.mAlert("获取中奖名单失败，请刷新界面");
              }
          }),
          //获取轮盘设置信息
          this.$http.get("/integralDrawC/queryRouletteSettingList.json").then(result =>{
              if(result.code == 0){
                  this.roulette = !!result.data?result.data : [];
                  if(this.roulette[0].isDrawTimes){
                      this.switch1='true';
                  }
                  if(this.roulette[0].isIntegral){
                      this.switch2='true';
                  }
              }else{
                  //获取轮盘设置失败，请刷新界面
                  this.mAlert("获取轮盘设置失败，请刷新界面");
              }
          }),
          this.$http.post("/memberUser/memberinfo.json").then(result => {
              if (result.code == 0) {
                  this.integral = result.data.integral/100;
                  if(this.integral<0){
                      this.integral=0;
                  }
              }
          });
            //字体滚动方法
           /* $(".txtMarquee-top").slide({mainCell:".bd ul",autoPlay:true,effect:"topMarquee",vis:9,interTime:50,pnLoop:false,mouseOverStop:false});*/
            //公告滚动方法
            /*$(".txtMarquee-left").slide({mainCell:".bd ul",autoPlay:true,effect:"leftMarquee",vis:1,interTime:50});*/
        },
        methods: {
            zhuan() {
                if (!this.click_flag) return;
                this.mLoading(true);
                this.$http
                    .post("/integralDrawC/lotteryDraw.json", {
                        username: this.cLoginUser.username
                    })
                    .then(result => {
                     if (result.code == 0) {
                    //从后台获取奖项id
                    this.index = result.message; //指定每次旋转到的奖品下标
                    var type = 0; // 默认为 0  转盘转动 1 箭头和转盘都转动(暂且遗留)
                    var during_time = 5; // 默认为1s
                    var random = Math.floor(Math.random() * 7);
                    var result_index = this.index ; // 最终要旋转到哪一块，对应prize_list的下标
                    var result_angle = [337.5, 292.5, 247.5, 202.5, 157.5, 112.5, 67.5, 22.5]; //最终会旋转到下标的位置所需要的度数
                    var rand_circle = 6; // 附加多转几圈，2-3
                    this.click_flag = false; // 旋转结束前，不允许再次触发
                    if (type == 0) {
                        // 转动盘子
                        var rotate_angle =
                            this.start_rotating_degree +
                            rand_circle * 360 +
                            result_angle[result_index] -
                            this.start_rotating_degree % 360;
                        this.start_rotating_degree = rotate_angle;
                        this.rotate_angle = "rotate(" + rotate_angle + "deg)";
                        // // //转动指针
                      /*  this.rotate_angle_pointer = "rotate("+this.start_rotating_degree_pointer + 360*rand_circle+"deg)";
                        this.start_rotating_degree_pointer =360*rand_circle;*/
                        var that = this;
                        // 旋转结束后，允许再次触发
                        setTimeout(function() {
                            that.click_flag = true;
                             that.game_over();
                        }, during_time * 1000 + 1500); // 延时，保证转盘转完
                    }
                        } else {
                            this.mAlert(result.message, () => {}, "error");
                        }
            })
            .catch(error => {
                //请稍后再试...
                    this.mAlert("请稍后再试...");
            });
            },
            sortKey(array,key){//排序
                return array.sort(function(a,b){
                        var x = a[key];
                        var y = b[key];
                        return ((x<y)?-1:(x>y)?1:0)
                })},
                game_over() {
            this.getIntegral();//弹窗后重新刷新积分
            this.getDrawTimes();//刷新次数
            this.toast_control = 'true';
            this.hasPrize = this.prize_list[this.index].isPrize;
        },
        //关闭弹窗
        close_toast() {
            this.toast_control = 'false';
        },
        getIntegral(){
            this.$http.post("/memberUser/memberinfo.json").then(result => {
                if (result.code == 0) {
                    this.integral = result.data.integral/100;
                    if(this.integral<0){
                        this.integral=0;
                    }
                }
            })},
        getDrawTimes(){
        //获取中奖名单
        this.$http.get("/integralDrawC/getWinningList.json").then(result =>{
        if(result.code == 0){
            this.luckDraw = !!result.data?result.data : [];
            if(result.message<0){
                this.drawTimes = 0;
            }else{
                this.drawTimes = result.message;
            }
        }else{
            //获取中奖名单失败，请刷新界面
            this.mAlert("获取中奖名单失败，请刷新界面");
        }
    })},
        mOpen() {
                //中奖纪录页面
            this.mWinOpen("中奖纪录页面",() => import("./WinningCheck"), {},700);
        }
        },
        created() {
        }
    };
</script>

<style scoped>
    @import "/static/css/css.css";
    @import "/static/css/style2.css";
    .header{
        background:#000;
    }
    .wheel-main {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .wheel-bg {
        width: 500px; height: 500px; float: right;
        background: url("/static/images/activity/draw_wheel.png") no-repeat center top;
        background-size: 100%;
        color: #fff;
        font-weight: 500;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        transition: transform 3s ease;
    }
    .wheel-pointer-box {
        position: absolute;
        top: 48%;
        left: 58%;
        z-index: 100;
        transform: translate(-50%, -60%);
        width: 300px;
        height: 300px;
    }
    .wheel-pointer {
        width: 100%;
        height: 100%;
        background: url("/static/images/activity/zhuanpan_c.png") no-repeat center top;
        background-size: 100%;
        transform-origin: center 60%;
    }
    .wheel-bg div {
        text-align: center;
    }
    .prize-list {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .prize-list .prize-item {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
    }
    .prize-list .prize-item:first-child {
        top: 20px;
        left: 232px;
        transform: rotate(20deg);
        color: yellow;
    }
    .prize-list .prize-item:nth-child(2) {
        top: 42px;
        left: 254px;
        -webkit-transform: rotate(70deg);
        transform: rotate(70deg);
        color: yellow;
    }
    .prize-list .prize-item:nth-child(3) {
        top: 80px;
        left: 252px;
        -webkit-transform: rotate(-250deg);
        transform: rotate(-250deg);
        color: yellow;
    }
    .prize-list .prize-item:nth-child(4) {
        top: 97px;
        left: 238px;
        -webkit-transform: rotate(-210deg);
        transform: rotate(-201deg);
        color: yellow;
    }
    .prize-list .prize-item:nth-child(5) {
        top: 91px;
        left: 200px;
        transform: rotate(-160deg);
        color: yellow;
    }
    .prize-list .prize-item:nth-child(6) {
        top: 73px;
        left: 180px;
        transform: rotate(-111deg);
        color: yellow;
    }
    .prize-list .prize-item:nth-child(7) {
        top: 44px;
        left: 180px;
        transform: rotate(-69deg);
        color: yellow;
    }
    .prize-list .prize-item:nth-child(8) {
        top: 24px;
        left: 203px;
        -webkit-transform: rotate(-20deg);
        transform: rotate(-24deg);
        color: yellow;
    }
    .prize-item {
        width: 4.5rem;
        height: 24rem;
    }

    .prize-pic img {
        width: 100%;
        margin-top: 1.5625rem;
    }
    .prize-count {
        font-size: 20px;
    }
    .prize-type {
        font-size: 16px;
    }
    .toast-mask {
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 10000;
        width: 100%;
        height: 100%;
    }
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 20000;
        transform: translate(-50%, -50%);
        width: 350px;
        background: #fff;
        border-radius: 1px;
        padding: 1;
        background-color: rgb(252, 244, 224);
    }
    .toast-container {
        position: relative;
        width: 100%;
        height: 100%;
        border: 1px dotted #fccc6e;
    }
    .toast-picture {
        position: absolute;
        top: -6.5rem;
        left: -1.5rem;
        width: 18.75rem;
        height: 8.5625rem;
    }
    .toast-pictrue-change {
        position: absolute;
        top: -1.5rem;
        left: -1.375rem;
        width: 17.5rem;
        height: 3.125rem;
    }
    .toast-title {
        padding: 2.8125rem 0;
        font-size: 18px;
        color: #fc7939;
        text-align: center;
    }
    .toast-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.9375rem;
    }
    .toast-btn div {
        background-image: -moz-linear-gradient(
                -18deg,
                rgb(242, 148, 85) 0%,
                rgb(252, 124, 88) 51%,
                rgb(252, 124, 88) 99%
        );

        background-image: -ms-linear-gradient(
                -18deg,
                rgb(242, 148, 85) 0%,
                rgb(252, 124, 88) 51%,
                rgb(252, 124, 88) 99%
        );
        background-image: -webkit-linear-gradient(
                -18deg,
                rgb(242, 148, 85) 0%,
                rgb(252, 124, 88) 51%,
                rgb(252, 124, 88) 99%
        );
        box-shadow: 0px 4px 0px 0px rgba(174, 34, 5, 0.7);
        width: 4.6875rem;
        height: 1.875rem;
        border-radius: 1.875rem;
        text-align: center;
        line-height: 1.875rem;
        color: #fff;
    }
    .close {
        position: absolute;
        top: -0.9375rem;
        right: -0.9375rem;
        width: 2rem;
        height: 2rem;
        background: url("/static/images/activity/close_store.png") no-repeat center top;
        background-size: 100%;
    }
</style>
