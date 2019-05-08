<template>
  <div class="userbasic_body ">
    <div class="bank_tips">温馨提示：一个手机只能绑定一个账号，请用真实资料，提款需要验证</div>
    <div
      class="line_form complaint_form "
      style="padding-left:20px;"
    >
      <form ref="addForm">
        <div class="line">
          <span class="tit">收款银行</span>
          <Select
            v-model="vm.drawAccountType"
            style="width:250px"
          >
            <Option
              v-for="(item, index) in banktypes"
              :key="index"
              :value="item.id"
              v-text="item.bankName"
            >{{ item.label }}</Option>
          </Select>
          <span class="tips"><span class="themeCr">*</span><span class="red">请输入收款银行</span></span>
        </div>
        <div class="line">
          <span class="tit">所在省份</span>
          <Select
            v-model="vm.bankProvinceid"
            style="width:250px"
          >
            <Option
              v-for="(item, index) in provinces"
              :key="index"
              :value="item.id"
            >{{ item.province }}</Option>
          </Select>
          <span class="tips"><span class="themeCr">*</span><span class="red">请选择开户行所在省份</span></span>
        </div>
        <div class="line">
          <span class="tit">所在城市</span>
          <Select
            v-model="vm.bankCityid"
            style="width:250px"
          >
            <Option
              v-for="(item, index) in cCities"
              :key="index"
              :value="item.id"
            >{{ item.city }}</Option>
          </Select>
          <span class="tips"><span class="themeCr">*</span><span class="red">请选择开户行所在城市</span></span>
        </div>
        <div class="line">
          <span class="tit">所在区县</span>
          <Select
            v-model="vm.bankAreaid"
            style="width:250px"
          >
            <Option
              v-for="(item, index) in cAreas"
              :key="index"
              :value="item.id"
            >{{ item.area }}</Option>
          </Select>
          <span class="tips"><span class="themeCr">*</span><span class="red">请选择开户行所在区县</span></span>
        </div>
        <div class="line">
          <span class="tit">开户行网点</span>
          <Input
            v-model="vm.drawAddress"
            ref="drawAddress"
            placeholder="请输入开户行..."
            style="width: 250px"
          />
          <span class="tips"><span class="themeCr">*</span><span class="red">XX分行XX支行</span></span>
        </div>
        <div class="line">
          <span class="tit">银行账号</span>
          <Input
            v-model="vm.account"
            ref="account"
            placeholder="请输入银行卡号..."
            style="width: 250px"
          />
          <span class="tips"><span class="themeCr">*</span><span class="red">收款银行卡号</span></span>
        </div>
        <div class="line">
          <span class="tit">开户姓名</span>
          <Input
            v-model="vm.drawAccountName"
            ref="drawAccountName"
            placeholder="请输入银行卡开户人姓名..."
            style="width: 250px"
          />
          <span class="tips"><span class="themeCr">*</span><span class="red">收款姓名</span></span>
        </div>
        <div class="line">
          <span class="tit">手机号</span>
          <Input
            v-model="vm.mobile"
            ref="mobile"
            placeholder="请输入银行卡绑定手机号..."
            style="width: 250px"
          />
          <span class="tips"><span class="themeCr">*</span><span class="red">银行登记手机号码</span></span>
        </div>
        <div class="line">
          <span class="tit"></span>
          <button
            @click="mSave"
            type="success"
            style="margin:0 auto; display: block;"
            class="ajax-submit-without-confirm-btn account_save"
          >确定</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { isPoneNumber } from "@/utils/util";
export default {
  data: () => ({
    banktypes: [],
      provinces: [],
    vmVild: {
      requiredRule: [
        v => (v != undefined && v != null && v != "") || "必填项！"
      ]
    },
    vm: {
      drawAccountType: "",
      drawAddress: "",
      account: "",
      drawAccountName: "",
      mobile: "",
      remark: "",
      bankProvinceid:0,
      bankCityid:0,
      bankAreaid:0
    }
  }),
  created() {
    this.mInit();
  },
  computed: {
    bindBank() {
      return this.vm.drawAccountType
        ? this.banktypes[this.vm.drawAccountType].bankName
        : "未绑定银行";
    },
    cCities() {
      let pro = this.provinces.find(ele => ele.id === this.vm.bankProvinceid);
      let cities = pro?pro.citieVos:[];
      if (!cities) {
        cities = [];
      }
      cities.unshift({ id: 0, city: "城市", cityid: "" });
      return cities;
    },
    cAreas() {
        let city = this.cCities.find(ele=>ele.id===this.vm.bankCityid);
        let areas = city?city.areas:[];
        if(!areas){
            areas = [];
        }
        areas.unshift({id:0,area:'区县',areaid:""});
        return areas;
    }
  },
  methods: {
    mInit() {
      this.mLoading(true);
      this.$http.all([this.mGetBanks(), this.mGetBindBank(), this.mGetProvinces()]).then(
        this.$http.spread((rbanks, rbindbank,provincesRes) => {
          if (provincesRes.code === 0) {
            this.provinces = provincesRes.data.list ? provincesRes.data.list : [];
            this.provinces.unshift({ id: 0, province: "省份", provinceid: "" });
          }
          if (rbanks.code == 0) {
            this.banktypes = rbanks.data.list;
          } else {
            this.mAlert(rbanks.message, () => {}, "error");
          }
          if (rbindbank.code == 0) {
            this.vm = Object.assign(this.vm, rbindbank.data);
          }
          this.mLoading(false);
        })
      );
    },
    mGetBanks() {
      return this.$http.post("/banktypes.json",{lineCountry:this.sysInfo.lineCountry});
    },
    mGetBindBank() {
      return this.$http.get("/memberUser/getbindbank.json");
    },
    mGetProvinces() {
      return this.$http.post("/provinces.json");
    },
    mSave() {
      if (this.vm.drawAccountType <= 0) {
        this.mAlert("请选择银行类型", null, "warning");
        return;
      }
      if (this.vm.bankProvinceid <= 0) {
        this.mAlert("请选择开户行所在省份", null, "warning");
        return;
      }
      if (this.vm.bankCityid <= 0) {
        this.mAlert("请选择开户行所在城市", null, "warning");
        return;
      }
      if (this.vm.bankAreaid <= 0) {
        this.mAlert("请选择开户行所在区县", null, "warning");
        return;
      }
      if (this.vm.drawAddress == "") {
        this.mAlert("请填写开户行", null, "warning");
        return;
      }
      if (this.vm.account == "") {
        this.mAlert("请填写银行账号", null, "warning");
        return;
      }
      if (this.vm.drawAccountName == "") {
        this.mAlert("请填写开户人姓名", null, "warning");
        return;
      }
      if (this.vm.mobile == "") {
        this.mAlert("请填写开户人手机号", null, "warning");
        return;
      } else {
        if (!this.mVildPhoneNumber(this.vm.mobile)) {
          this.mAlert("输入的手机号格式不正确", null, "warning");
          return;
        }
      }
      this.mLoading(true);
      this.$http.post("/memberUser/bindbank.json", this.vm).then(result => {
        this.mLoading(false);
        if (result.code == 0) {
          this.mAlert("操作成功", () => {}, "success");
          this.mCallBack();
          this.mClose();
        } else {
          this.mAlert(result.message, () => {}, "error");
        }
      });
    },
    mVildPhoneNumber(v) {
      return isPoneNumber(v);
    },
    mCallBack() {
      this.$emit("callback", Object.assign({}, this.vm));
    },
    mClose() {
      this.$emit("closecallback");
    }
  }
};
</script>
