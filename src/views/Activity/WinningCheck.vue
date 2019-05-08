<template>
    <div>
        <div class="userlist">
            <table class="table_list">
                <tbody>
                <tr>
                    <th style="text-align:left">会员ID</th><!--会员ID-->
                    <th>奖项</th><!--奖项 -->
                    <th>获奖时间</th><!-- 获奖时间-->
                    <th>兑换状态</th><!--兑换状态 -->
                </tr>
                <tr v-for="(item,index) in activitiesList" :key="index">
                    <td>{{item.winningId}}</td>
                    <td>{{item.prizeName}}</td>
                    <td>{{item.luckyDrawTimeStr}}</td>
                    <td>{{item.exchangeStatus?'已兑换':'未兑换'}}</td><!--已兑换   未兑换 -->
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
  import window from '../../mixins/window'

  export default {
    name: 'WinningCheck',
    data () {
      return {
        activitiesList: []
      }
    },
    mounted () {
      this.mLoading(true)
      //初始化轮盘 加载奖品信息
      this.$http.get('/integralDrawC/getWinningListById.json').then(result => {
        if (result.code == 0) {
          this.activitiesList = !!result.data ? result.data : []
        } else {
          //获取中奖纪录失败，请稍后再试
          this.mAlert('获取中奖纪录失败，请稍后再试')
        }
      })
    },
    created () {
      //初始化轮盘 加载奖品信息
      this.$http.get('/integralDrawC/getWinningListById.json').then(result => {
        if (result.code == 0) {
          this.activitiesList = !!result.data ? result.data : []
        } else {
          //获取中奖纪录失败，请稍后再试
          this.mAlert('获取中奖纪录失败，请稍后再试')
        }
      })
    }
  }
</script>
<style scoped>
</style>
