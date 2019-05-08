<template>
    <div class="layout" id="lc_597512">
        <div class="home-channel-floor">
            <div class="h">
                <h2 class="channel-title fl">商品综合</h2>
                <!-- <ul class="channel-nav fl">
                        <li><a href="/list-41" target="_blank" onclick="pushFoolChildrenMsg('2','笔记本电脑','平板电脑','/list-41')">生活用品</a></li>
                        <li><a href="/list-41" target="_blank" onclick="pushFoolChildrenMsg('2','笔记本电脑','平板电脑','/list-41')">家具家电</a></li>
                        <li><a href="/list-41" target="_blank" onclick="pushFoolChildrenMsg('2','笔记本电脑','平板电脑','/list-41')">手机电脑</a></li>
                </ul> -->
            </div>
            <div class="b">
                <div class="goods-list">
                    <ul class="grid-list clearfix">
                        <li class="grid-items grid-items-md">
                            <div class="hr">
                                <div class="hrboxs">
                                    <div class="default_ava">
                                        <p>{{cLoginUser.username}}</p>
                                    </div>
                                    <div class="loginbtn">
                                        <p class="myintegral">当前积分余额：<span class="reds">{{this.integral}}</span></p>
                                        <router-link :to="{name:'UserCenter'}" class="login">个人中心</router-link>
                                        <router-link :to="{name:'ConversionRecord'}" class="register">兑换记录</router-link>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="grid-items" v-for="item in products" :key="item.id ">
                            <!-- <a class="thumb" >
                                <p class="grid-img">
                                    <img :src="item.img">
                                </p>
                                <div class="grid-title">{{item.title}}</div>
                                <p class="grid-desc">{{item.content}}&nbsp;</p>
                                <p class="grid-price">{{item.currentPrice}}</p>
                                <span class="button" @click="mOpen(item)">立即兑换</span>
                            </a> -->
                            <div class="product-grid" style="height:100%">
                                <div class="product-image" style="height:75%;">
                                    <a @click="mOpen(item)">
                                        <img class="pic-1" :src="item.img">
                                    </a>
                                </div>
                                <div class="product-content">
                                    <h3 class="title"><a href="#">{{item.title}}</a></h3>
                                    <div class="price">${{item.currentPrice}}
                                        <span>${{item.originalPrice}}</span>
                                    </div>
                                </div>
                                <ul class="social">
                                    <li><a @click="mOpen(item)" :data-tip="item.title"><i
                                            class="fa fa-search"></i>兑换</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!--<BackTop :height="10" :bottom="10">-->
        <!--<div class="ivu-back-top-inner">-->
        <!--<i class="ivu-icon ivu-icon-ios-arrow-up"></i>-->
        <!--</div>-->
        <!--</BackTop>-->
    </div>
</template>
<script>
  import listMixin from '@/mixins/list'
  import window from '../../mixins/window'

  export default {
    mixins: [window, listMixin],
    data () {
      return {
        integral: 0,
        searchVM: {
          typeId: '', //类型
          orderBy: 'id desc',
          rows: 20
        },
        products: []
      }
    },
    mounted () {
      this.mLoading(true)
      this.$http.get('/memberUser/memberinfo.json').then(result => {
        if (result.code == 0) {
          this.integral = result.data.integral / 100
        }
      })
      this.mPullData()
    },
    methods: {
      mPullData () {
        this.mLoading(true)
        var params = Object.assign({}, this.searchVM)
        this.$http.post('/imp/products.json', params).then(result => {
          if (result.code == 0) {
            this.products = !!result.data ? result.data : []
          }
        })
      },
      mOpen (rows) {
        this.mWinOpen(
          '确认订单',
          () => import('./Order'),
          {
            vmObj: {
              id: rows.id,
              integral: this.integral
            }
          },
          700
        )
      }
    }
  }
</script>

<style>
    body {
        background-color: #f3f3f3;
    }

    .hr {
        margin: 20px;
        width: 250px;
        height: 300px;
    }

    .hr .hrboxs {
        width: 100%;
        float: right;
        height: 100%;
        padding: 25px 15px;
        /* background: url(source/plugin/keke_integralmall/template/images/loginboot.png)
          center bottom no-repeat #fff; */
    }

    .hr .default_ava {
        text-align: center;
    }

    a img {
        border: none;
    }

    .default_ava p {
        font-size: 22px;
        line-height: 60px;
    }

    .default_ava p a {
        color: #333;
    }

    .loginbtn {
        text-align: center;
        margin-top: 25px;
    }

    .loginbtn .myintegral {
        /* background: #f9f9f9; */
        padding: 3px 0px 10px 0px;
        margin-bottom: 10px;
        margin-top: -25px;
        border-bottom: 1px dashed #eaeaea;
        color: #787878;
        font-size: 16px;
    }

    .loginbtn a.login {
        margin-top: 30px;
        margin-bottom: 20px;
        background: #ffe100;
        padding: 3px 0px;
        font-size: 14px;
        line-height: 35px;
    }

    .loginbtn a {
        display: block;
        width: 100%;
        margin: 5px 0px;
        text-decoration: none;
    }

    .loginbtn a.register {
        color: #fff;
        background: #494949;
        padding: 3px 0px;
        font-size: 14px;
        line-height: 35px;
    }

    .loginbtn a {
        display: block;
        width: 100%;
        margin: 5px 0px;
        text-decoration: none;
    }

    .layout {
        width: 100%;
        background-color: whitesmoke;
        display: flex;
        justify-content: center;
        margin-top: 70px;
        padding-bottom: 20px;
    }

    .goods-list .grid-list {
        margin-left: -12px;
        margin-top: -12px;
    }

    .goods-list .grid-items {
        height: 400px;
        width: 291px;
        margin-top: 12px;
        margin-left: 12px;
        margin-bottom: 0;
    }

    .clearfix {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin: 0;
        flex-wrap:wrap;
    }

    .grid-items-md {
        width: 291px !important;
        height: 346px;
    }

    .grid-items {
        display: block;
        list-style: none;
        background: #fff;
        /*float: left;*/
        margin-bottom: 10px;
        margin-left: 10px;
        position: relative;
        -webkit-transition: all 0.2s linear 0s;
        -moz-transition: all 0.2s linear 0s;
        -ms-transition: all 0.2s linear 0s;
        -o-transition: all 0.2s linear 0s;
        transition: all 0.2s linear 0s;
        width: 232px;
        height: 290px;
        z-index: 1;
    }

    .grid-items .thumb {
        display: inline-block;
        width: 100%;
        height: 100%;
        text-align: center;
    }

    a {
        cursor: pointer;
    }

    .goods-list .grid-items .grid-img {
        margin: 36px auto 0;
        width: 178px;
        height: 178px;
    }

    .goods-list .grid-items .grid-img img {
        width: 100%;
        height: 100%;
    }

    .goods-list .grid-items .grid-title {
        height: 40px;
        display: table-cell;
        vertical-align: bottom;
        width: 259px;
        padding-left: 16px;
        padding-top: 5px;
        white-space: normal;
        line-height: 1.1;
    }

    .grid-items .grid-title {
        font-size: 14px;
        font-weight: 400;
        margin: 16px 20px 2px;
        overflow: hidden;
        color: #3a3a3a;
        height: 40px;
        display: table-cell;
        vertical-align: bottom;
        width: 259px;
        padding-left: 16px;
        padding-right: 16px;
        padding-top: 26px;
    }

    .goods-list .grid-items .grid-desc {
        margin: 4px 20px 10px;
    }

    .grid-items .grid-desc {
        font-size: 12px;
        font-weight: 400;
        margin: 2px 20px 6px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #a4a4a4;
    }

    .grid-items .grid-price {
        font-size: 14px;
        font-weight: 400;
        margin: 0 20px 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #cc0e11;
    }

    .goods-list .grid-items .grid-tips {
        top: 173px;
        right: 49px;
    }

    .grid-items .grid-tips {
        position: absolute;
        width: 48px;
        height: 48px;
        right: 35px;
        top: 135px;
        z-index: 2;
    }

    .grid-items .grid-tips img {
        height: 48px;
        width: 48px;
    }
    .home-channel-floor {
        width:1200px;
    }
    .home-channel-floor .h {
        overflow: hidden;
        margin: 22px 0 12px;
        line-height: 36px;
        position: relative;
    }

    .home-channel-floor .channel-title {
        color: #333;
        font-size: 24px;
    }

    .fl {
        float: left;
    }

    .home-channel-floor .channel-nav {
        margin-left: 28px;
    }

    .home-channel-floor .channel-nav li {
        float: left;
        font-size: 12px;
    }

    .home-channel-floor .channel-nav a {
        display: inline-block;
        font-size: 16px;
        margin: 0 10px;
        color: #a4a4a4;
        position: relative;
    }

    .b .goods-list ul li:hover a .button {
        display: block;
    }

    .button {
        position: absolute;
        left: 81px;
        top: 285px;
        display: inline-block;
        width: 110px;
        height: 36px;
        display: none;
        line-height: 36px;
        border-radius: 8px;
        background: #ff3a2b;
        box-shadow: 0 3px 0 #d82e21;
        color: #fff;
        text-align: center;
        margin: 20px 0 0 9px;
        cursor: pointer;
    }

    .ivu-modal-header {
        text-align: center;
        font-size: 16px;
        background-color: #c5c8ce;
    }

    .product-grid {
        font-family: "Open Sans", sans-serif;
        text-align: center;
        overflow: hidden;
        position: relative;
        transition: all 0.5s ease 0s;
        width: 291px;
    }

    .product-grid:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }

    .product-grid .product-image {
        overflow: hidden;
    }

    .product-grid .product-image a {
        display: block;
    }

    .product-grid .product-image img {
        width: 100%;
        height: auto;
        transition: all 0.5s ease 0s;
    }

    .product-grid:hover .product-image img {
        transform: scale(1.1);
    }

    .product-grid .product-content {
        padding: 12px 12px 15px 12px;
        transition: all 0.5s ease 0s;
    }

    .product-grid:hover .product-content {
        opacity: 0;
    }

    .product-grid .title {
        font-size: 20px;
        font-weight: 600;
        text-transform: capitalize;
        margin: 0 0 10px;
        transition: all 0.3s ease 0s;
    }

    .product-grid .title a {
        color: #000;
    }

    .product-grid .title a:hover {
        color: #2e86de;
    }

    .product-grid .price {
        font-size: 18px;
        font-weight: 600;
        color: #2e86de;
    }

    .product-grid .price span {
        color: #999;
        font-size: 15px;
        font-weight: 400;
        text-decoration: line-through;
        margin-left: 7px;
        display: inline-block;
    }

    .product-grid .social {
        background-color: #fff;
        width: 100%;
        padding: 0;
        margin: 0;
        list-style: none;
        opacity: 0;
        transform: translateX(-50%);
        position: absolute;
        bottom: -50%;
        left: 50%;
        z-index: 1;
        transition: all 0.5s ease 0s;
    }

    .product-grid:hover .social {
        opacity: 1;
        bottom: 20px;
    }

    .product-grid .social li {
        display: inline-block;
    }

    .product-grid .social li a {
        color: #909090;
        font-size: 16px;
        line-height: 45px;
        text-align: center;
        height: 45px;
        width: 45px;
        margin: 0 7px;
        border: 1px solid #909090;
        border-radius: 50px;
        display: block;
        position: relative;
        transition: all 0.3s ease-in-out;
    }

    .product-grid .social li a:hover {
        color: #fff;
        background-color: #2e86de;
        width: 80px;
    }

    .product-grid .social li a:before,
    .product-grid .social li a:after {
        content: attr(data-tip);
        color: #fff;
        background-color: #2e86de;
        font-size: 12px;
        letter-spacing: 1px;
        line-height: 20px;
        padding: 1px 5px;
        border-radius: 5px;
        white-space: nowrap;
        opacity: 0;
        transform: translateX(-50%);
        position: absolute;
        left: 50%;
        top: -30px;
    }

    .product-grid .social li a:after {
        content: "";
        height: 15px;
        width: 15px;
        border-radius: 0;
        transform: translateX(-50%) rotate(45deg);
        top: -20px;
        z-index: -1;
    }

    .product-grid .social li a:hover:before,
    .product-grid .social li a:hover:after {
        opacity: 1;
    }

    @media only screen and (max-width: 990px) {
        .product-grid {
            margin-bottom: 30px;
        }
    }

    .ivu-back-top-inner {
        background-color: #ccc;
        border-radius: 2px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease-in-out;
    }

    .ivu-back-top i {
        color: #999;
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
</style>
