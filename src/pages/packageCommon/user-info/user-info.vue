<template>
  <view class="user-info h5-page">
    <ComponentPanel title="完善个人信息">
      <div class="panel-content">
        <div class="input-wrapper">
          <label for="" class="label">姓名</label>
          <input
            type="text"
            maxlength="12"
            disabled
            placeholder="请输入姓名"
            v-model="personalInfo.userName"
          />
        </div>
        <div class="input-wrapper">
          <label for="" class="label">身份证号</label>
          <input
            type="idcard"
            maxlength="18"
            disabled
            placeholder="请输入身份证号"
            v-model="personalInfo.idCard"
          />
        </div>
        <div class="input-wrapper">
          <label for="" class="label">联系电话</label>
          <input
            type="number"
            maxlength="11"
            disabled
            placeholder="请输入联系电话"
            v-model="personalInfo.tel"
          />
        </div>
        <div class="input-wrapper">
          <label for="" class="label">户籍地址</label>
          <ComponentPicker
            idName="address"
            type="address"
            placeholder="请选择户籍地址"
            v-model="personalInfo.aac021"
            :address="personalInfo.aac021Arr"
            @change="handleChangePicker"
          ></ComponentPicker>
        </div>
        <div class="input-wrapper">
          <label for="" class="label">社会保障卡银行账号</label>
          <input
            type="number"
            disabled
            placeholder="请输入社会保障卡银行账号"
            v-model="personalInfo.aac203"
          />
        </div>
        <div class="input-wrapper">
          <label for="" class="label">银行卡类别</label>
          <input
            type="text"
            disabled
            placeholder="请输入银行卡类别"
            v-model="personalInfo.aaf002desc"
          />
        </div>
        <div class="input-wrapper">
          <label for="" class="label">社保卡卡号</label>
          <input
            type="number"
            disabled
            placeholder="请输入社保卡卡号"
            v-model="personalInfo.aaz500"
          />
        </div>
        <div class="input-wrapper">
          <label for="" class="label">社保卡状态</label>
          <input
            type="text"
            disabled
            placeholder="请输入社保卡状态"
            v-model="personalInfo.aaz502desc"
          />
        </div>
        <div class="button-wrapper">
          <ComponentButton
            name="保存"
            type="primary"
            @click="handleSave"
          ></ComponentButton>
        </div>
      </div>
    </ComponentPanel>
  </view>
</template>

<script>
import ComponentPanel from '@/components/common/ez-panel/ez-panel.vue'
import ComponentButton from '@/components/common/ez-button/ez-button.vue'
import ComponentPicker from '@/components/project/ez-picker/ez-picker.vue'

import {
  request,
  showModal,
  navigateBack,
  showLoading,
  hideLoading,
} from '@/utils/uni-api'
import { getCodeListByCodeName } from '@/utils/custom-api'
import { USER_INFO, UPDATE_USER_INFO } from '@/store/constants' // 常量
import { mapGetters } from 'vuex'
export default {
  name: 'pageUserInfo',
  data() {
    return {
      personalInfo: {
        aac203: '暂无',
        aaz500: '暂无',
        aaz502desc: '暂无',
        aaf002desc: '暂无',
      },
    }
  },
  components: {
    ComponentPanel,
    ComponentButton,
    ComponentPicker,
  },
  onLoad(e) {},
  onReady() {},
  onShow() {},
  onHide() {},
  methods: {
    // 获取用户信息
    getPersonalInfo(aac002) {
      const data = {
        methodName: 'getPersonalInfo',
        aac002,
      }
      return new Promise((resolve, reject) => {
        request(
          '/frontRestService/frontBcpDataRestService/getWebServiceData',
          data,
          {},
          false
        ).then((res) => {
          const { fieldData } = res
          if (fieldData) {
            resolve(fieldData)
          } else {
            reject(res)
          }
        })
      })
    },
    // 获取社保卡信息
    getSSCInfo(aac002, aac003) {
      const data = {
        methodName: 'getBankInfo',
        aac002,
        aac003,
      }
      return new Promise((resolve, reject) => {
        request(
          '/frontRestService/frontBcpDataRestService/getWebServiceDataTwo',
          data,
          {},
          false
        )
          .then((res) => {
            const { list } = res.lists.bankInfoList
            if (list) {
              resolve(list[0])
            } else {
              reject(res)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    // 获取数据
    async getData(idCard, userName) {
      showLoading()
      let personalInfo = {}
      let SSCInfo = {}
      let aaz502CodeArr = [] // 社保卡状态
      let aae008CodeArr = [] // 社保卡银行类别
      try {
        aaz502CodeArr = await getCodeListByCodeName('aaz502')
      } catch (err) {
        hideLoading()
      }
      try {
        aae008CodeArr = await getCodeListByCodeName('aae008')
      } catch (err) {
        hideLoading()
      }
      try {
        personalInfo = await this.getPersonalInfo(idCard)
        const { aac021 } = personalInfo
        this.personalInfo = {
          ...this.personalInfo,
          ...personalInfo,
          aac021Arr: aac021.split('-'),
        }
      } catch (err) {
        hideLoading()
      }

      try {
        SSCInfo = await this.getSSCInfo(idCard, userName)
        const { aaz502, aaf002, aac203, aaz500 } = SSCInfo
        let aaz502desc = ''
        let aaf002desc = ''
        for (let i = 0, len = aaz502CodeArr.length; i < len; i++) {
          const item = aaz502CodeArr[i]
          if (item.aaa102 === aaz502) {
            aaz502desc = item.aaa103
            break
          }
        }
        for (let i = 0, len = aae008CodeArr.length; i < len; i++) {
          const item = aae008CodeArr[i]
          if (item.aaa102 === aaf002) {
            aaf002desc = item.aaa103
            break
          }
        }
        this.personalInfo = {
          ...this.personalInfo,
          aac203,
          aaz500,
          aaz502,
          aaf002,
          aaz502desc,
          aaf002desc,
        }
      } catch (err) {
        hideLoading()
      }

      hideLoading()
      console.log(this.personalInfo)
    },

    // 户籍地址改变
    handleChangePicker(id, value) {
      if (id === 'address') {
        this.personalInfo = {
          ...this.personalInfo,
          chb015: value[0].orgid,
          chb017: value[1].orgid,
          chb018: value[2].orgid,
        }
      }
    },
    // 保存
    handleSave() {
      const {
        aac021,
        chb015,
        chb017,
        chb018,
        tel,
        idCard,
        userName,
      } = this.personalInfo
      if (!aac021) {
        showModal('请选择户籍地址')
        return
      }

      const param = {
        methodName: 'savePersonalInfo',
        aac003: userName,
        aac002: idCard,
        aae005: tel,
        chb015: chb015,
        chb017: chb017,
        chb018: chb018,
        aac021: aac021,
        operationType: 2,
      }

      request(
        '/frontRestService/frontBcpDataRestService/getWebServiceData',
        param
      ).then((res) => {
        showModal('保存成功').then((res) => {
          this.$store.commit(UPDATE_USER_INFO, {
            ...this.personalInfo,
          })
          navigateBack(1)
        })
      })
    },
  },
  computed: { ...mapGetters([USER_INFO]) },
  watch: {
    'userInfo.user_id': {
      handler(val) {
        if (val) {
          const { idCard, userName, tel } = this.userInfo
          this.personalInfo = {
            tel,
            idCard,
            userName,
          }
          this.getData(idCard, userName)
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.user-info {
  padding: $spacing;
  .button-wrapper {
    padding: $spacing;
  }
}
</style>
