import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/Layout.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'current',
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        { path: 'reg', name: 'Reg', component: () => import('../views/Reg.vue') },
        { path: 'home', name: 'Home', component: () => import('../views/Home.vue') },
        { path: 'egames', name: 'eGames', component: () => import('../views/Games/eGame.vue') },
        { path: 'egames-Mg', name: 'eGameMg', component: () => import('../views/Games/eGameMg.vue') },
        { path: 'egames-BB', name: 'eGameBb', component: () => import('../views/Games/eGameBb.vue') },
        { path: 'catchfish', name: 'CatchFish', component: () => import('../views/Games/CatchFish.vue') },
        { path: 'livecasino', name: 'LiveCasino', component: () => import('../views/Games/LiveCasino.vue') },
        { path: 'lottory', name: 'Lottory', component: () => import('../views/Games/Lottory.vue') },
        { path: 'esports', name: 'Esports', component: () => import('../views/Games/Esports.vue') },
        { path: 'activity', name: 'Activities', component: () => import('../views/Activity/Activities.vue') },
        { path: 'userCenter', name: 'UserCenter', component: () => import('../views/Member/UserCenter.vue') },
        { path: 'bankload', name: 'BankLoad', component: () => import('../views/Member/BankLoad.vue') },
        { path: 'message_list', name: 'MessageList', component: () => import('../views/Member/MessageList.vue') },
        { path: 'safe_psw', name: 'SafePassword', component: () => import('../views/Member/SafePassword.vue') },
        { path: 'login_psw', name: 'LoginPassword', component: () => import('../views/Member/LoginPassword.vue') },
        { path: 'finance_center', name: 'FinanceCenter', component: () => import('../views/Member/FinanceCenter.vue') },
        { path: 'member_drawing', name: 'MemberDrawing', component: () => import('../views/Member/MemberDrawing.vue') },
        { path: 'indoor_transfer', name: 'IndoorTransfer', component: () => import('../views/Member/IndoorTransfer.vue') },
        { path: 'customer_report', name: 'ReportTransfer', component: () => import('../views/Member/ReportTransfer.vue') },
        { path: 'rakeback_list', name: 'RakebackRecord', component: () => import('../views/Member/RakebackRecord.vue') },
        { path: 'service_center', name: 'ServiceCenter', component: () => import('../views/Member/ServiceCenter.vue') },
        { path: 'complaint_proposal', name: 'ComplaintProposal', component: () => import('../views/Member/ComplaintProposal.vue') },
        { path: 'finance_Deposit', name: 'FinanceOfflineDeposit', component: () => import('../views/Member/FinanceOfflineDeposit.vue') },
        { path: 'recharge_list', name: 'RechargeList', component: () => import('../views/Member/RechargeList.vue') },
        { path: 'cash_list', name: 'CashList', component: () => import('../views/Member/CashList.vue') },
        { path: 'game_list', name: 'GameBetRecord', component: () => import('../views/Member/GameBetRecord.vue') },
        { path: 'coin_list', name: 'CoinList', component: () => import('../views/Member/CoinList.vue') },
        { path: 'agent_that', name: 'AgentThat', component: () => import('../views/Member/AgentThat.vue') },
        { path: 'agentr_eportforms', name: 'AgentrEportforms', component: () => import('../views/Member/AgentrEportforms.vue') },
        { path: 'open_accounts', name: 'OpenAccounts', component: () => import('../views/Member/OpenAccounts.vue') },
        { path: 'aubordinater_eportforms', name: 'SubordinaterEportforms', component: () => import('../views/Member/SubordinaterEportforms.vue') },
        { path: 'memberman_agement', name: 'MembermanAgement', component: () => import('../views/Member/MembermanAgement.vue') },
        { path: 'bettingdetail_list', name: 'BettingDetailList', component: () => import('../views/Member/BettingDetailList.vue') },
        { path: 'transactionsdetail_list', name: 'TransactionsDetaiLlist', component: () => import('../views/Member/TransactionsDetaiLlist.vue') },
        { path: 'egames-poket', name: 'Poket', component: () => import('../views/Games/Poket.vue') },
        { path: 'openinvitation', name: 'OpenInvitation', component: () => import('../views/Member/OpenInvitation.vue') },
        { path: 'linkmanagement', name: 'LinkManagement', component: () => import('../views/Member/LinkManagement.vue') },
        { path: 'free_demo', name: 'FreeDemo', component: () => import('../views/Games/FreeDemo.vue') },
        { path: 'exchange', name: 'Exchange', component: () => import('../views/Store/Exchange.vue') },
        { path: 'conversionrecord', name: 'ConversionRecord', component: () => import('../views/Store/ConversionRecord.vue') },
        { path: 'delivery', name: 'DeliveryAdd', component: () => import('../views/Member/DeliveryAdd.vue') },
        { path: 'record', name: 'RecordList', component: () => import('../views/Member/RecordList.vue') },
        { path: 'download', name: 'DownLoad', component: () => import('../views/DownLoad.vue') },
        { path: 'agentdrawing', name: 'AgentDrawing', component: () => import('../views/Member/AgentDrawing.vue') },
        { path: 'integralDraw', name: 'IntegralDraw', component: () => import('../views/Activity/IntegralDraw.vue') },
        { path: 'agentcashlist', name: 'AgentCashList', component: () => import('../views/Member/AgentCashList.vue') },
        { path: 'agentcoinlist', name: 'AgentCoinList', component: () => import('../views/Member/AgentCoinList.vue') }
      ]
    }
  ]
})
