<template>
    <div class="container user_con" style="margin-top: 70px;">
        <div class="user_left fl">
            <ul>
                <li>
                    <router-link :to="{name:'UserCenter'}">个人资料
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'SafePassword'}">安全管理
                    </router-link>
                </li>
                <li class="active">
                    <router-link :to="{name:'FinanceCenter'}">财务中心
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name:'ReportTransfer'}">客户报表</router-link>
                </li>
                <li v-if="agnetLevel>0">
                    <router-link :to="{name:'AgentThat'}">代理管理</router-link>
                </li>
                <li v-if="agnetLevel>0">
                    <router-link :to="{name:'MembermanAgement'}">代理报表</router-link>
                </li>
                <li>
                    <router-link :to="{name:'ServiceCenter'}">服务中心</router-link>
                </li>
                <li>
                    <router-link :to="{name:'ConversionRecord'}">商城中心</router-link>
                </li>
            </ul>
        </div>

        <div class="user_right ">
            <div class="userbasic_head">
                <router-link :to="{name:'FinanceCenter'}">会员存款</router-link>
                <router-link :to="{name:'FinanceOfflineDeposit'}" class="active">线下存款</router-link>
                <router-link :to="{name:'MemberDrawing'}">会员提款</router-link>
                <router-link :to="{name:'IndoorTransfer'}">户内转账</router-link>
            </div>
            <!--内容行-->
            <div>
                <!--充值流程标题-->
                <div class="all-title">
                    <strong>线下充值流程</strong>
                </div>

                <!--充值流程图片-->
                <!--<img src="/static/images/home/deponsit_off_line_flow_path.png" id="flowPath"/>-->

                <el-steps :active="active" align-center finish-status="success"
                          style="margin-top: 50px; margin-bottom: 50px">
                    <el-step title="选择充值银行"></el-step>
                    <el-step title="填写转账信息"></el-step>
                    <el-step title="线下充值打款"></el-step>
                    <el-step title="审核通过到账"></el-step>
                </el-steps>

                <div v-if="active==0" style="margin-bottom: 30px">
                    <div class="all-title" style="margin-bottom: 20px">
                        <strong>1、请勾选充值银行</strong>
                    </div>
                    <div v-for="(item,i) in companyAccounts" :key="i" v-if="item.accountType==1 || item.accountType==2"
                         :class="['bank-info-list',{'bank-info-list-bord':item.isActive}]" @click="mSelected(item)"
                         style="height:100px;margin-bottom: 10px">

                        <dl style="height:100px">
                            <dd class="banks" style="margin-left: 50px;margin-top: 5px">
                                <img :src="item.logo" alt="">
                            </dd>
                            <dd style="float: right;"><input name="bankInfoId" type="radio" value=""
                                                             style="display: none;"></dd>
                        </dl>
                        <div :class="{'bank-info-list-sel-badage':item.isActive}"></div>
                    </div>
                    <div v-for="(item,i) in companyAccounts" :key="i"
                         v-if="item.accountType!==1 && item.accountType!==2"
                         :class="['bank-info-list',{'bank-info-list-bord':item.isActive}]" @click="mSelected(item)"
                         style="height:100px;margin-bottom: 10px">

                        <dl style="height:100px">
                            <dd class="banks" style="margin-left: 50px;margin-top: 5px">
                                <img :src="item.logo" alt="">
                            </dd>
                            <dd style="float: right;"><input name="bankInfoId" type="radio" value=""
                                                             style="display: none;"></dd>
                        </dl>

                        <div :class="{'bank-info-list-sel-badage':item.isActive}"></div>
                    </div>

                    <!--<div class="info-submit-container">-->
                    <!--<el-button type="primary"  @click="checkOne">下一步</el-button>-->
                    <!--</div>-->
                </div>

                <div v-if="active==1">
                    <div class="all-title" style="margin-bottom: 40px">
                        <strong>2、提交转账信息</strong>
                    </div>
                    <div class="input-info-group">
                        <span class="input-title">转账人姓名：</span>
                        <Input prefix="ios-contact" placeholder="请输入转账人姓名" style="width: auto"
                               v-model="vmunderline.underlineAccountName"/>
                        <span class="input-title" style="margin-left: 200px">转账方式：</span>
                        <span v-if="selectedBank.accountType==1 || selectedBank.accountType==2" v-text="payName"
                              style="width:200px;display: inline-block"></span>
                        <Select v-model="vmunderline.underlineType" style="width:200px;" v-else>
                            <Option v-for="(item, index) in underlineTypes"
                                    :key="index" :value="item.id"
                                    v-text="item.value" aria-selected="true"
                            >
                            </Option>
                        </Select>
                    </div>

                    <div class="input-info-group">
                        <span class="input-title" style="margin-left: 42px">附言：</span>
                        <Input prefix="ios-brush" placeholder="请输入内容" style="width: auto" v-model="vmunderline.remark"/>
                        <span class="input-title" style="margin-left: 187px">转账人银行：</span>
                        <span v-if="selectedBank.accountType==1 || selectedBank.accountType==2"
                              style="width:200px;display: inline-block"
                              v-text="banktypes.filter(item=>item.id==selectedBank.drawAccountType)[0].bankName"
                        >
                        </span>
                        <Select v-model="vmunderline.underlineBankType" style="width:200px" v-else>
                            <Option v-for="(item, index) in banktypes" :key="index" :value="item.id"
                                    v-text="item.bankName"></Option>
                        </Select>
                    </div>
                    <div class="input-info-group">
                        <span class="input-title" style="margin-left: 14px">充值金额：</span>
                        <Input prefix="logo-yen"
                               :placeholder="'额度：'+selectedBank.minMoney/100+' ~ '+ selectedBank.maxMoney/100+' 元'"
                               style="width: auto"
                               v-model="vmunderline.orderAmount"/>
                    </div>

                    <div class="info-submit-container">
                        <el-button type="primary" @click="checkFrom">下一步</el-button>
                    </div>

                </div>

                <div v-if="active==2" style="position: relative">
                    <div class="all-title" style="margin-bottom: 30px">
                        <strong>3、线下充值打款</strong>
                    </div>
                    <div class="input-info-group">
                        <div class="pay-right" v-if="selectedBank.accountType==1 || selectedBank.accountType==2">
                            <div style="font-size: 14px;margin-top: 10px;color: red;">转账金额 (须包含小数位)</div>
                            <div v-if="selectedBank.accountType==1">请用支付宝扫描下方二维码完成支付</div>
                            <div v-if="selectedBank.accountType==2">请用微信扫描下方二维码完成支付</div>
                            <img :src="selectedBank.payAddress" style="width:220px;height:220px;margin-top: 25px;"/>
                        </div>
                        <div class="pay-info">
                            <span>充值金额:</span>
                            <span style="font-weight: bold">
                                {{realAmount}}
                                <span style="color: red;" v-if="minAmount">.{{minAmount}}</span>
                            </span>
                        </div>
                        <div class="pay-info">
                            <span>收款人姓名:</span>
                            <span v-text="selectedBank.bankAccountName"></span>
                            <el-button class="clipboard"
                                       type="info"
                                       size="mini"
                                       icon="el-icon-edit-outline"
                                       @click="copy"
                                       :data-clipboard-text="selectedBank.bankAccountName"
                            >
                                复制
                            </el-button>

                        </div>
                        <div class="pay-info">
                            <span>收款人卡号:</span>
                            <span v-text="selectedBank.account" style="font-weight: bold"></span>
                            <el-button class="clipboard"
                                       type="info"
                                       size="mini"
                                       icon="el-icon-edit-outline"
                                       @click="copy"
                                       :data-clipboard-text="selectedBank.account"
                            >
                                复制
                            </el-button>
                        </div>
                        <div class="pay-info">
                            <span>账户类型:</span>
                            <span v-text="selectedBank.drawAccountTypeStr"></span>
                        </div>
                        <div class="pay-info">
                            <span>开户行网点:</span>
                            <span v-text="selectedBank.bankAddress"></span>
                            <el-button class="clipboard"
                                       type="info"
                                       size="mini"
                                       icon="el-icon-edit-outline"
                                       @click="copy"
                                       :data-clipboard-text="selectedBank.bankAddress"
                            >
                                复制
                            </el-button>
                        </div>
                        <div class="pay-info">
                            <span>转账方式:</span>
                            <span>{{ vmunderline.underlineType | payWay }}</span>
                        </div>
                        <div class="pay-info">
                            <span>附言:</span>
                            <span v-text="vmunderline.remark"></span>
                        </div>
                    </div>

                    <div class="info-submit-container">
                        <el-button type="success" icon="el-icon-success" @click="infoSubmit">我已打款</el-button>
                    </div>
                </div>

                <div v-if="active==3" style="position: relative">
                    <div class="all-title" style="margin-bottom: 30px">
                        <strong>4、审核通过到账</strong>
                    </div>
                    <div style="text-align: center;margin-top: 30px;font-size: 16px">
                        订单已提交, 请您耐心等待！如出现到账问题,请及时联系客服！
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
  import Clipboard from 'clipboard'

  var _this
  export default {
    data: () => ({
      active: 0,
      agnetLevel: '',
      amount: '',
      checkedApiType: [],
      rechargeTypes: [],
      rechargeOther: [],
      companyAccounts: [],
      underlineTypes: [],
      bankPayOnlines: [], //网银在线支付集合
      banktypes: [],
      isShowTip: false,
      vmunderline: {
        orderAmount: '',
        underlineType: '',
        underlineBankType: '',
        underlineAccountName: '',
        companyAccountId: '',
        remark: ''
      },
      realAmount: 0,
      minAmount: 0,
      payName: '',
      selectedBank: {},
      selectedBankPayOnlinePath: '', //选择的网银支付渠道对应的VUE组件路径
      bankPayOnlineParam: {} //网银支付渠道 动态组件 要传到子组件的参数
    }),
    props: {
      paramData: Object,
      defult: {}
    },
    filters: {
      payWay (v) {
        if (v) {
          return _this.underlineTypes.filter(item => item.id == v)[0].value
        }
      }
    },

    watch: {
      selectedBank () {
        if (this.selectedBank.accountType == 1) {
          this.vmunderline.underlineType = '-104'
          this.payName = this.underlineTypes.filter(item => item.id == '-104')[0].value
          this.vmunderline.underlineBankType = this.selectedBank.drawAccountType
        }
        if (this.selectedBank.accountType == 2) {
          this.vmunderline.underlineType = '-105'
          this.payName = this.underlineTypes.filter(item => item.id == '-105')[0].value
          this.vmunderline.underlineBankType = this.selectedBank.drawAccountType
        }
      },
    },
    mounted () {
      this.mLoading(true)
      this.$http.get('/memberUser/memberinfo.json').then(result => {
        if (result.code == 0) {
          this.agnetLevel = result.data.agnetLevel
        }
      })
    },
    methods: {
      //线下充值方式
      mUnderlineTypes () {
        return this.$http.post('/recharge/underline.json')
      },
      //获取充值银行信息
      mCompanyAccount () {
        return this.$http.post('/recharge/companyAccount.json')
      },
      //银行大分类信息
      mBanktypes () {
        return this.$http.post('/banktypes.json',{lineCountry:this.sysInfo.lineCountry})
      },
      mInit () {
        //线下支付方式
        this.$http
          .all([
            this.mUnderlineTypes(),
            this.mCompanyAccount(),
            this.mBanktypes()
          ])
          .then(
            this.$http.spread((rUnderlineTypes, rCompanyAccount, rBanktypes) => {
              this.mLoading(false)
              if (rUnderlineTypes.code == 0) {
                this.underlineTypes = rUnderlineTypes.data.typelist
              } else {
                // this.mAlert(rUnderlineTypes.message, () => { },"error");
              }
              if (rCompanyAccount.code == 0) {
                rCompanyAccount.data.forEach(ele => {
                  ele.isActive = false
                })
                this.companyAccounts = rCompanyAccount.data
              }
              if (rBanktypes.code == 0) {
                this.banktypes = rBanktypes.data.list
              }
            })
          )
      },
      //充值银行选择
      mSelected (item) {
        this.companyAccounts.forEach(ele => {
          ele.isActive = false
          if (ele.id == item.id) {
            ele.isActive = true
            _this.selectedBank = ele
          }
        })
        this.active = 1
        this.vmunderline.companyAccountId = item.id
        this.vmunderline.minMoney = item.minMoney
      },
      //复制功能
      copy () {
        var clipboard = new ClipboardJS('.clipboard')
        //成功回调
        clipboard.on('success', function (e) {
          _this.$message({
            message: '内容已复制到剪贴板',
            type: 'success'
          })
        })
        //失败回调
        clipboard.on('error', function (e) {
          // _this.$message.error('错了哦，这是一条错误消息');
        })
      },
      checkFrom () {
        if (this.vmunderline.underlineAccountName == '') {
          this.mAlert('请输入打款人姓名')
          return
        }
        if (this.vmunderline.companyAccountId == '') {
          this.mAlert('请选择要打款到哪个银行')
          return
        }

        if (this.vmunderline.companyAccountId < 1) {
          this.mAlert('请选择要打款到哪个银行')
          return
        }
        if (this.vmunderline.underlineType == '') {
          this.mAlert('请选择打款方式')
          return
        }
        this.vmunderline.underlineType = parseInt(this.vmunderline.underlineType)

        if (isNaN(this.vmunderline.underlineType)) {
          this.mAlert('请选择打款方式')
          return
        }
        if (this.vmunderline.underlineBankType == '') {
          this.mAlert('请选择打款所在银行')
          return
        }
        if (this.vmunderline.underlineBankType < 1) {
          this.mAlert('请选择打款所在银行')
          return
        }
        if (this.vmunderline.orderAmount.includes('.')) {
          //请输入整数金额
          this.mAlert('请输入整数金额')
          return
        }
        if (this.vmunderline.orderAmount == '') {
          this.mAlert('充值金额不能为空')
          return
        }
        if (this.vmunderline.orderAmount < this.vmunderline.minMoney / 100) {
          this.mAlert('充值金额必须大于' + this.vmunderline.minMoney / 100 + '元')
          return
        }
        this.active = 2;
        this.realAmount = this.vmunderline.orderAmount;
        if (this.selectedBank.accountType == 1 || this.selectedBank.accountType == 2) {
          this.minAmount = parseInt(Math.random() * (99 - 10 + 1) + 10, 10);
        }
      },
      infoSubmit () {

        this.mLoading(true)
        this.vmunderline.orderAmount = parseFloat(this.vmunderline.orderAmount) + parseFloat(this.minAmount / 100)
        //先检查是否给手续费
        let params = Object.assign({}, this.vmunderline)
        this.$http.post('/recharge/underlineorder.json', params).then(result => {
          this.mLoading(false)
          if (result.code == 0) {
            this.active = 3
            // this.mAlert("恭喜提交成功，赶快去打款吧！", () => {}, "success");
          } else {
            this.mAlert(result.message, () => {}, 'error')
          }
        })
      }
    },
    created () {
      _this = this
      this.mInit()
    }
    // destroyed() {
    //   !!timer && clearTimeout(timer);
    //   _this = undefined;
    // }
  }
</script>

<style scoped>
    /*所有的文字父布局*/
    .all-title {
        margin-left: 50px;
        margin-top: 30px;
        font-size: 30px;
        color: #535664;
    }

    .imaginary-line {
        height: 1px;
        border: 1px dashed grey;
        margin-left: 30px;
        margin-right: 30px;
        margin-top: 20px;
    }

    /*充值流程样式*/
    #flowPath {
        margin-left: 50px;
        margin-top: 10px;
        width: 800px;
        height: 130px;
    }

    /*银行信息列表item*/
    .bank-info-list {
        margin-top: 20px;
        margin-left: 50px;
        width: 250px;
        height: 150px;
        position: relative;
        display: inline-grid;
    }

    /*银行信息显示内容父布局*/
    .bank-info-list dl {
        /* cursor: pointer;
        background: #fff;
        padding: 10px; */
        width: 250px;
        padding: 15px 0;
        border: 1px solid #dcdcdc;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.12);
        margin-right: 1%;
        border-radius: 8px;
        position: relative;
        float: left;
        height: 150px;
    }

    /*银行图标logo父级布局*/
    .bank-info-list dd.banks {
        display: inline-block;
        width: 139px;
        height: 58px;
    }

    /*银行图标logo布局*/
    .bank-info-list dd.banks img {
        width: 100%;
        height: 100%;
    }

    /*银行卡信息列表标题*/
    .bank-info-list dd {
        margin-left: 20px;
        font-size: 14px;
        width: auto;
        line-height: 20px;
    }

    /*银行卡信心列表内容*/
    .bank-info-list dd em {
        font-family: "Microsoft YaHei,微软雅黑";
        font-style: normal;
    }

    /*银行卡信息选中状态变更边框改变*/
    .bank-info-list-bord {
        background: #fffaf8;
        box-shadow: 0 0 5px #ff7469;
        border-color: #ff7469;
        border-radius: 8px;
    }

    /*银行卡信息选中主观题变更图片改变*/
    .bank-info-list-sel-badage {
        width: 21px;
        height: 21px;
        position: absolute;
        background: url(/static/images/sel_badage.png);
        border-bottom-right-radius: 8px;
        bottom: 0;
        right: 0;
    }

    /*输入容器样式*/
    .input-info-group {
        margin-left: 50px;
        margin-top: 20px;
    }

    /*输入框标题样式*/
    .input-title {
        font-size: 14px;
        color: #323232;
    }

    /*输入框输入样式*/
    .input-content {
        color: #989898;
        background-color: rgb(240, 240, 240);
        border: 1px grey;
        border-radius: 5px;
        padding-left: 10px;
    }

    /*提交按钮容器*/
    .info-submit-container {
        width: 100%;
        height: auto;
        text-align: center;
        padding-top: 40px;
    }

    /*在线输入金额立即支付按钮*/
    .info-submit {
        color: #ffffff;
        background-color: #dc4d74;
        font-size: 30px;
        width: 200px;
        height: 60px;
    }

    .cardNo {
        display: inline-block;
        width: 72%;
    }

    .btn-copy {
        cursor: pointer;
        height: 23px;
        font-size: 13px;
        line-height: 14px;
    }

    .pay-info {
        margin-left: 28px;
        font-size: 16px;
    }

    .pay-info span {
        height: 41px;
        line-height: 41px;
        display: inline-block;
        text-align: left;
        font-size: 15px;
    }

    .pay-info span:first-child {
        width: 130px;
        font-weight: bold;
    }

    .pay-info span:nth-child(2) {
        min-width: 165px;
        margin-right: 15px;
    }

    .bank-info-list:hover {
        cursor: pointer;
        background: #fffaf8;
        -webkit-box-shadow: 0 0 5px #ff7469;
        box-shadow: 0 0 5px #ff7469;
        border-color: #ff7469;
        border-radius: 8px;
    }

    .pay-right {
        position: absolute;
        top: 70px;
        right: 0;
        width: 500px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        font-size: 15px;
        font-weight: bold;
    }

    strong {
        font-size: 18px;
    }
</style>
