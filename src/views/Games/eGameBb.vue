<template>
    <div class="body" style="background: url('/static/images/lottory/egame-banner.jpg') no-repeat;">
        <div class="container tbbg-margin">
            <div class="notice clear" style="margin-top:-220px">
                <div class="notice-bg"></div>
                <div class="notice-title pullLeft">
                    <div class="notice-title_bg"></div>
                    <span class="bg-icon pullLeft"></span>
                    系统公告
                </div>
                <marquee id="mar0" scrollAmount="4" direction="left" onmouseout="this.start()" onmouseover="this.stop()">
                    <span>~~</span>
                    <span>和讯娱乐为您服务：）官方网址：www.doc886.com</span>
                </marquee>
            </div>
            <div class="egameslide">
                <div class="hd">
                    <ul>
                        <li>
                            <router-link :to="{name:'eGames'}">
                            <p class="pic">
                                <img src="/static/images/lottory/app-bg-pt1.png" class="default">
                                <img src="/static/images/lottory/app-bg-pt2.png" class="activepic">
                            </p>
                            <p class="tit">PT厅</p>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name:'eGameMg'}">
                            <p class="pic">
                                <img src="/static/images/lottory/app-bg-mg1.png" class="default">
                                <img src="/static/images/lottory/app-bg-mg2.png" class="activepic">
                            </p>
                            <p class="tit">MG厅</p>
                            </router-link>
                        </li>
                        <li class="on" >
                            <router-link :to="{name:'eGameBb'}">
                            <p class="pic">
                                <img src="/static/images/lottory/app-bg-by1.png" class="default">
                                <img src="/static/images/lottory/app-bg-bb2.png" class="activepic">
                            </p>
                            <p class="tit">BB厅</p>
                            </router-link>
                        </li>
                        <li >
                            <a href="eGame-api_name=SA.htm">
                            <p class="pic">
                                <img src="/static/images/lottory/app-bg-sa1.png"  class="default">
                                <img src="/static/images/lottory/app-bg-sa2.png"  class="activepic">
                            </p>
                            <p class="tit">SA厅</p>
                            </a>
                        </li>
                        <li >
                            <a href="eGame-api_name=DT.htm" >
                            <p class="pic">
                                <img src="/static/images/lottory/app-bg-dt1.png" class="default">
                                <img src="/static/images/lottory/app-bg-dt2.png" class="activepic">
                            </p>
                            <p class="tit">DT厅</p>
                            </a>
                        </li>
                        <li >
                            <a href="eGame-api_name=TTG.htm" >
                            <p class="pic">
                                <img src="/static/images/lottory/app-bg-ttg1.png" class="default">
                                <img src="/static/images/lottory/app-bg-ttg2.png" class="activepic">
                            </p>
                            <p class="tit">TTG厅</p>
                            </a>
                        </li>
                        <li >
                            <a href="eGame-api_name=SW.htm">
                            <p class="pic">
                                <img src="/static/images/lottory/app-bg-sw1.png" class="default">
                                <img src="/static/images/lottory/app-bg-sw2.png" class="activepic">
                            </p>
                            <p class="tit">SW厅</p>
                            </a>
                        </li>
                        <li >
                            <a href="eGame-api_name=PNG.htm" >
                            <p class="pic">
                                <img src="/static/images/lottory/app-bg-png1.png" class="default">
                                <img src="/static/images/lottory/app-bg-png2.png" class="activepic">
                            </p>
                            <p class="tit">PNG厅</p>
                            </a>
                        </li>
                        <li >
                            <a href="eGame-api_name=PP.htm">
                            <p class="pic">
                                <img src="/static/images/lottory/app-bg-pp1.png" class="default">
                                <img src="/static/images/lottory/app-bg-pp2.png" class="activepic">
                            </p>
                            <p class="tit">PP厅</p>
                            </a>
                        </li>
                        <li >
                            <a href="eGame-api_name=BS.htm" >
                            <p class="pic">
                                <img src="/static/images/lottory/app-bg-bs1.png" class="default">
                                <img src="/static/images/lottory/app-bg-bs2.png" class="activepic">
                            </p>
                            <p class="tit">BS厅</p>
                            </a>
                        </li>
                            <div class="last">
                                <a href="javascript:;"
                                    onclick="return layer.msg('请先登录!',{icon:6})" >
                                    <p class="pic">
                                        <img src="/static/images/lottory/app-bg-ag1.png" style="display: inline;">
                                    </p>
                                    <p class="tit">AG电子游戏</p>
                                </a>
                            </div>
                    </ul>
                </div>
                <div class="bd">                   
                    <div class="module" style="display: block;">
                        <div class="top">
                            <div class="egameTit"></div>
                            <div class="egame_filter_top">
                                <span class="title"><img src="/static/images/lottory/pt-pic-bz.png">BB厅</span>
                                <span class="list_wrap active"><a href="javascript:void(0)" class="list ">全部</a></span>
                                <div class="search_inp">
                                    <form method="GET">
                                        <input type="hidden" name="api_name" value="PT">
                                        <input type="text" class="inp" placeholder="请输入游戏名称" name="name" value="" required>
                                        <button type="submit"></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="bodylist">
                            <div class="egame_list">
                                <ul>
                                    <li class="scrollLoading" style="width: 180px;height: 180px">
                                        <a href="javascript:;" onclick="return alert('请先登录！')" >
                                            <div class="pic">
                                                <img src="/static/images/lottory/game_5095.png" class="lazy">
                                            </div>
                                            <p class="collect">金钱豹</p>
                                            <span class="button">开始游戏</span>
                                        </a>
                                    </li>
                                    <li class="scrollLoading" style="width: 180px;height: 180px">
                                        <a href="javascript:;" onclick="return alert('请先登录！')" >
                                            <div class="pic">
                                                <img src="/static/images/lottory/Game_5106.png" class="lazy">
                                            </div>
                                            <p class="collect">三国</p>
                                            <span class="button">开始游戏</span>
                                        </a>
                                    </li>
                                    <li class="scrollLoading" style="width: 180px;height: 180px">
                                        <a href="javascript:;" onclick="return alert('请先登录！')" >
                                            <div class="pic">
                                                <img src="/static/images/lottory/Game_5706.png" class="lazy">
                                            </div>
                                            <p class="collect">浓情巧克力</p>
                                            <span class="button">开始游戏</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "eGameBb",
  data() {
    return {};
  }
};
</script>
<style>
.egame_list ul li img {
  width: auto;
  height: auto;
  position: relative;
  max-width: none;
  margin: 0 auto;
}
.egame_list ul li .button {
  left: 23px;
  top: 37px;
}
.egame_list ul li .pic {
  width: 180px;
  height: 144px;
  overflow: hidden;
}
.egame_list ul li .collect {
  color: black;
}
</style>


