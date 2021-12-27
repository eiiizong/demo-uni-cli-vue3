<template>
  <div class="login h5-page">
    <div class="container">
      <div class="top d-f ai-c jc-c fd-c">
        <img :src="imageLogin" mode="widthFix" />
        <div>请您进行人脸识别身份验证</div>
        <span>信息将与当前微信绑定（用于身份验证）</span>
      </div>
      <div class="form">
        <div class="input-wrapper">
          <label for="username" class="label">姓名</label>
          <div class="input">
            <input
              id="username"
              class="input"
              type="text"
              placeholder="请输入您的姓名"
              v-model="userName"
              maxlength="10"
            />
          </div>
        </div>
        <div class="input-wrapper">
          <label for="username" class="label">身份证</label>
          <div class="input">
            <input
              id="username"
              type="idcard"
              placeholder="请输入您的身份证号码"
              v-model="idCard"
              maxlength="18"
              @blur="handleCheckIdCard"
            />
          </div>
        </div>
        <div class="input-wrapper">
          <label for="tel" class="label">手机号</label>
          <div class="input d-f ai-c">
            <!-- #ifdef MP-WEIXIN -->
            <input
              class="f-1 disabled"
              id="tel"
              type="number"
              placeholder="请点击右侧按钮获取您的手机号"
              disabled
              v-model="tel"
              maxlength="11"
            />
            <!-- #endif -->
            <!-- #ifdef H5 -->
            <input
              class="f-1"
              id="tel"
              type="number"
              placeholder="请输入您的手机号"
              v-model="tel"
              maxlength="11"
            />
            <!-- #endif -->
            <!-- #ifdef MP-WEIXIN -->
            <div class="button-wrapper">
              <ComponentButton
                width="170rpx"
                type="primary"
                name="获取手机号"
                openType="getPhoneNumber"
                :showAnimation="false"
                @getphonenumber="getPhoneNumber"
              ></ComponentButton>
            </div>
            <!-- #endif -->
          </div>
        </div>
        <div class="input-wrapper checkbox">
          <label class="label" for="cb">
            <checkbox-group @change="handleCheckboxChange">
              <checkbox
                id="cb"
                class="checkbox"
                :checked="checkboxChecked"
                value="checkbox"
              />
            </checkbox-group>
            <div
              class="icon-checkbox"
              :class="[checkboxChecked ? 'checked' : '']"
            >
              <div class="icon"></div>
            </div>
            <div class="d-f">
              我同意惠农惠民一卡通平台收集、保存、使用/转交我所提交的信息用于快捷登录
            </div>
            <div class="d-f ai-c">
              查看
              <span
                @click.stop="handleJumpRoute('user-agreement', 'packageCommon')"
                >《用户服务协议》</span
              >
              及
              <span
                @click.stop="handleJumpRoute('privacy-policy', 'packageCommon')"
                >《隐私条款》</span
              >
            </div>
          </label>
        </div>
      </div>
      <div class="button-wrapper">
        <!-- #ifdef MP-WEIXIN -->
        <ComponentButton
          type="primary"
          name="开始人脸识别验证"
          :disabled="buttonDisabled"
          @click="handleFaceByMini"
        ></ComponentButton>
        <!-- #endif -->
        <!-- #ifdef H5 -->
        <ComponentButton
          type="primary"
          name="立即注册登录"
          :disabled="buttonDisabled"
          @click="handleFaceByMini"
        ></ComponentButton>
        <!-- #endif -->
      </div>
      <div class="footer">本服务由久远银海股份有限公司提供数据支持</div>
    </div>
  </div>
</template>
<script>
import imageLogin from './images/01.png'

import ComponentButton from '@/components/common/ez-button/ez-button.vue'

import config from '@/config'
import { checkIDCard } from '@/utils/check'
import { getIsDevEnv } from '@/utils/get'
import {
  navigateTo,
  request,
  showModal,
  navigateBack,
  setStorage,
  startFacialRecognitionVerify,
  hideLoading,
  showLoading,
  showToast,
} from '@/utils/uni-api/index'
import { getCodeListByCodeName } from '@/utils/custom-api/index'
import {
  requestGetPersonalInfo,
  requestGetBankInfo,
  requestGetYGFFUserInfo,
} from '@/utils/request-api/index'

import {
  USER_INFO,
  M_UPDATE_USER_INFO,
  UPDATE_USER_LIST,
} from '@/store/constants' // 常量
import { mapGetters } from 'vuex'
export default {
  name: 'pageLogin',
  data() {
    return {
      imageLogin,
      userName: '',
      idCard: '',
      tel: '',
      checkboxChecked: false, // 用户是否是否同意协议
    }
  },
  components: {
    ComponentButton,
  },
  onLoad(e) {},
  methods: {
    // 跳转路由
    handleJumpRoute(name, packageName, params) {
      navigateTo(name, packageName, params)
    },
    // checkbox change
    handleCheckboxChange(e) {
      const { value } = e.target
      if (value.length > 0) {
        this.checkboxChecked = true
      } else {
        this.checkboxChecked = false
      }
    },
    // 输入框失去焦点校验身份证号
    handleCheckIdCard(e) {
      let { value } = e.target
      value = value.trim().toUpperCase()
      const checkResult = checkIDCard(value)
      // 校验身份证失败
      if (checkResult.status === '0') {
        showModal(checkResult.msg).then((res) => {
          this.idCard = ''
        })
      } else {
        // 校验身份证成功
        this.requestCheckIdCard(value)
      }
      console.log(value, 12345)
    },
    // 验证身份证号是否已经被其他用户绑定
    requestCheckIdCard(idCard) {
      const data = {
        idCard,
        userType: '1',
      }
      request('/frontRestService/frontLoginRestService/checkIdCard', data)
        .then((res) => {})
        .catch((err) => {
          this.idCard = ''
        })
    },
    // 获取手机号
    getPhoneNumber(e) {
      const { encryptedData, iv, errMsg } = e.target
      const { session_key } = this.userInfo
      if (errMsg === 'getPhoneNumber:ok') {
        const data = {
          encryptedData,
          iv,
          session_key: decodeURIComponent(session_key),
        }
        request(
          '/frontRestService/frontLoginRestService/getRealPhone',
          data
        ).then((res) => {
          const { data } = res
          if (data) {
            this.tel = data
          } else {
            this.tel = ''
          }
        })
      } else {
        showModal('请点击允许按钮，才能获取您的电话号码！')
      }
    },
    // 人脸核身验证开始
    handleFaceByMini() {
      const userName = this.userName
      const idCard = this.idCard
      const tel = this.tel
      if (!userName) {
        showModal('请输入您的姓名')
        return false
      }
      if (!idCard) {
        showModal('请输入您的身份证号')
        return false
      } else {
        const checkResult = checkIDCard(idCard)
        // 校验身份证失败
        if (checkResult.status === '0') {
          showModal(checkResult.msg)
          return false
        }
      }
      if (!tel) {
        showModal('请点击获取手机号按钮')
        return false
      }
      // 开发环境关闭人脸识别
      const isDev = getIsDevEnv()
      if (isDev) {
        this.handleLogin()
        return false
      }
      // #ifdef MP-WEIXIN
      startFacialRecognitionVerify(userName, idCard).then((res) => {
        // 发送请求获取人脸信息
        this.handleLogin()
      })
      // #endif
      // #ifdef H5
      this.handleLogin()
      // #endif
    },
    // 绑定用户信息/请求登录
    handleLogin() {
      showLoading()
      const { openid } = this.userInfo
      const idCard = this.idCard
      const userName = this.userName
      const tel = this.tel
      // 绑定用户信息
      const data = {
        openid,
        loginId: idCard,
        idCard,
        userName,
        tel,
      }
      request('/frontRestService/frontLoginRestService/login', data, {}, false)
        .then((res) => {
          const { userId, sessionId } = res.data
          // 缓存 sessionId 至本地
          setStorage(config.constants.SESSION_ID, sessionId)
          this.getUserBasicInfo({
            userId,
            sessionId,
            user_id: sessionId,
            idCard,
            userName,
            tel,
          })
        })
        .catch(() => {
          hideLoading()
        })
    },
    // 获取用户基本信息
    async getUserBasicInfo(data) {
      const { isOpenYGFF, constants } = config
      const { PROGRAM_TYPE } = constants
      const { userName, idCard } = data

      let codeMapAAZ502 = [] // 社保卡状态码表
      let codeMapAAE008 = [] // 银行类别码表
      let aaz502Desc = '' // 社保卡状态
      let aaf002Desc = '' // 社保卡银行类别
      let personalInfo = {} // 用户村庄信息
      let SSCInfo = {} // 用户社保卡信息

      // 移动监督小程序登录
      if (PROGRAM_TYPE == '1') {
        if (isOpenYGFF) {
          requestGetYGFFUserInfo(idCard, false)
            .then((res) => {
              const { positionName, orgnamepath } = res
              this.$store.commit(M_UPDATE_USER_INFO, {
                ...data,
                positionName,
                orgnamepath,
              })
              this.$store.commit(UPDATE_USER_LIST, {
                cpb10d: idCard, // 经办用户身份证号码
                aae012: userName, // 经办用户姓名
                aab301: config.areaCode, // 地市编码
                che015: '1', // 经办层级 0 省 1 地市 2 区县 3 乡镇街道 4 村社区
              })
            })
            .catch((err) => {
              this.$store.commit(M_UPDATE_USER_INFO, {
                ...data,
                positionName: '',
                orgnamepath: '',
              })
            })
            .finally(() => {
              hideLoading()
              showToast('登录成功', 'success').then(() => {
                setTimeout(() => {
                  navigateBack(1)
                }, 1000)
              })
            })
        } else {
          let param = {
            loginid: idCard,
            methodName: 'B070',
          }
          request(
            '/frontRestService/frontBcpDataRestService/getWebServiceDataYgsp',
            param,
            {},
            false
          )
            .then((res) => {
              const { orgidpath, orgname, orgnamepath, lists } = res
              const { positionList } = lists

              let positionNameArr = []

              positionList.list.map((item) => {
                positionNameArr.push(item.positionname)
              })

              const orgidpathArr = orgidpath.split('/')

              this.$store.commit(UPDATE_USER_LIST, {
                cpb10d: idCard, // 经办用户身份证号码
                aae012: userName, // 经办用户姓名
                aab301: config.areaCode, // 地市编码
                che015: '1', // 经办层级 0 省 1 地市 2 区县 3 乡镇街道 4 村社区
                chb015: orgidpathArr[2] || '9999',
                chb017: orgidpathArr[3] || '9999',
                chb018: orgidpathArr[4] || '9999',
              })

              this.$store.commit(M_UPDATE_USER_INFO, {
                ...data,
                positionName: positionNameArr.join(','),
                orgnamepath: orgnamepath.split('/').join(''),
              })
              hideLoading()
              showToast('登录成功', 'success').then(() => {
                setTimeout(() => {
                  navigateBack(1)
                }, 1000)
              })
            })
            .catch((err) => {
              hideLoading()
              this.$store.commit(M_UPDATE_USER_INFO, {
                ...data,
                positionName: '',
                orgnamepath: '',
              })
              showModal(
                '您当前还不是惠民惠农阳光监督的经办人员，暂无权限进行操作，请及时联系管理员！'
              ).then(() => {
                navigateBack(1)
              })
            })
        }
      }
      // 移动审核小程序登录
      else if (PROGRAM_TYPE == '2') {
        const param = {
          loginid: idCard,
          methodName: 'B070',
        }
        request(
          '/frontRestService/frontBcpDataRestService/getWebServiceDataYgsp',
          param,
          {},
          false
        )
          .then((res) => {
            const { orgidpath, orgname, orgnamepath, lists } = res
            const { chi031List, positionList } = lists

            let positionNameArr = []
            let orgNamePathArr = []
            let orgIdPathArr = []
            let chi031Arr = []

            positionList.list.map((item) => {
              positionNameArr.push(item.positionname)
              orgNamePathArr.push(item.orgnamepath)
              orgIdPathArr.push(item.orgidpath)
            })
            chi031List.list.map((item) => {
              chi031Arr.push({
                chi031: item.chi031,
              })
            })

            const orgidpathArr = orgidpath.split('/')

            this.$store.commit(UPDATE_USER_LIST, {
              aae012: userName,
              aae018: userName,
              cpb10d: idCard,
              aab301: config.areaCode,
              chb015: orgidpathArr[2] || '',
              chb017: orgidpathArr[3] || '',
              chb018: orgidpathArr[4] || '',
            })

            this.$store.commit(M_UPDATE_USER_INFO, {
              ...data,
              positionList: positionList.list,
              chi031List: chi031List.list,
              orgname,
              orgnamepath,
              positionName: positionNameArr.join(','),
              positionNameArr,
              orgNamePath: orgNamePathArr.join(','),
              orgNamePathArr,
              orgIdPathArr,
            })
            // 根据chi031获取补贴在微信端的经办配置
            request(
              '/frontRestService/frontBcpDataRestService/getWebServiceDataYgsp',
              {
                methodName: 'B075',
                chi031List: JSON.stringify(chi031Arr),
              },
              {},
              false
            )
              .then((res) => {
                const { list } = res.lists.hi51List
                const arr = []
                if (list && list.length > 0) {
                  list.map((item) => {
                    if (item.chi511 === '1') {
                      arr.push(item.chi031)
                    }
                  })
                }
                this.$store.commit(M_UPDATE_USER_INFO, {
                  ...this.userInfo,
                  chi031SetList: list,
                  chi031CanHandleList: arr,
                })
              })
              .finally(() => {
                hideLoading()
                showToast('登录成功', 'success').then(() => {
                  setTimeout(() => {
                    navigateBack(1)
                  }, 1000)
                })
              })
          })
          .catch((err) => {
            hideLoading()
            showModal(
              '您当前还不是惠民惠农阳光审批的经办人员，暂无权限进行操作，请及时联系管理员！'
            ).then(() => {
              navigateBack(1)
            })
          })
      }
      // 一卡通小程序登录
      else {
        try {
          if (isOpenYGFF) {
            personalInfo = await requestGetPersonalInfo(idCard, false, false)
          }
        } catch (err) {
          hideLoading()
        }

        try {
          if (isOpenYGFF) {
            SSCInfo = await requestGetBankInfo(idCard, userName, false, false)
          }
        } catch (err) {
          hideLoading()
        }
        const { aaz502: aaz502_p, aac080 } = personalInfo || {}
        // 社保卡银行和状态无法从getPersonalInfo接口获取
        const { aaz502, aaf002 } = SSCInfo || {}

        try {
          codeMapAAZ502 = await getCodeListByCodeName('aaz502')
          for (let i = 0, len = codeMapAAZ502.length; i < len; i++) {
            const item = codeMapAAZ502[i]
            if (item.aaa102 === aaz502) {
              aaz502Desc = item.aaa103
              break
            }
          }
        } catch (err) {
          hideLoading()
        }

        try {
          codeMapAAE008 = await getCodeListByCodeName('aae008')
          for (let i = 0, len = codeMapAAE008.length; i < len; i++) {
            const item = codeMapAAE008[i]
            if (item.aaa102 === aaf002) {
              aaf002Desc = item.aaa103
              break
            }
          }
        } catch (err) {
          hideLoading()
        }

        this.$store.commit(M_UPDATE_USER_INFO, {
          ...data,
          ...personalInfo,
          ...SSCInfo,
          aaz502Desc: aaz502Desc || aaz502_p,
          aaf002Desc: aaf002Desc || aac080,
        })

        this.$store.commit(UPDATE_USER_LIST, {
          aae012: userName,
          aae018: userName,
          cpb10d: idCard,
          chb015: personalInfo.chb015 || '9999',
          chb017: personalInfo.chb017 || '9999',
          chb018: personalInfo.chb018 || '9999',
        })

        hideLoading()
        showToast('登录成功', 'success').then(() => {
          setTimeout(() => {
            navigateBack(1)
          }, 1000)
        })
      }
    },
  },
  computed: {
    ...mapGetters([USER_INFO]),
    // 是否可以开始人脸识别
    buttonDisabled() {
      const userName = this.userName
      const idCard = this.idCard
      const tel = this.tel
      const checkboxChecked = this.checkboxChecked

      let result = false
      if (!userName) {
        return true
      }
      if (!idCard) {
        return true
      }
      if (!tel) {
        return true
      }
      if (!checkboxChecked) {
        return true
      }
      return result
    },
  },
  watch: {},
}
</script>
<style lang="scss" scoped>
.login {
  padding: 30rpx;
  background-color: $primary;
  .container {
    flex: 1;
    width: 100%;
    background-color: #fff;
    position: relative;
    padding: 36rpx 32rpx 40rpx;
    border-radius: 8rpx;
  }
  .top {
    img {
      width: 174rpx;
      height: 156rpx;
    }
    div {
      font-size: 32rpx;
      font-weight: 700;
      line-height: 1;
      color: #3d424d;
      padding-top: 30rpx;
    }
    span {
      font-size: 26rpx;
      font-weight: 500;
      line-height: 1;
      padding-top: 32rpx;
      color: #abaeb3;
    }
  }
  .form {
    padding-top: 40rpx;
    .input-wrapper {
      margin-bottom: 26rpx;
      .label {
        display: block;
        font-size: 24rpx;
        font-weight: 700;
        line-height: 34rpx;
        color: #777a82;
        font-weight: 700;
        margin-bottom: 6rpx;
      }
      .input {
        input {
          display: block;
          width: 100%;
          height: 78rpx;
          background-color: #f5f6f9;
          border-radius: 12rpx;
          font-size: 28rpx;
          line-height: 1.4;
          padding: 0 16rpx;
          font-weight: 500;
          color: #333;
          &.disabled {
            color: rgba(0, 0, 0, 0.25);
            background-color: #ddd;
            opacity: $opacity-disabled;
          }
        }
        .button-wrapper {
          margin-left: 30rpx;
        }
      }
      &.checkbox {
        position: relative;
        margin-top: 60rpx;
        margin-bottom: 60rpx;
        padding-left: 32rpx;
        .label {
          color: #8d8f94;
          font-weight: 400;
          .checkbox {
            display: none;
          }
          span {
            color: $primary;
          }
          .icon-checkbox {
            $size: 24rpx;
            position: absolute;
            top: 4rpx;
            left: 0;
            width: $size;
            height: $size;
            border: 1px solid #8d8f94;
            border-radius: 2px;
            display: flex;
            transition: all 0.3s;
            .icon {
              margin: auto;
              width: 0;
              height: 10rpx;
              border: 2px solid #fff;
              border-radius: 1px;
              border-top: none;
              border-right: none;
              background: transparent;
              transform: rotate(-45deg);
              position: relative;
              top: -2rpx;
              opacity: 0;
              transition: all 0.3s;
            }
            &.checked {
              background-image: linear-gradient(
                135deg,
                #6ba5fc 0%,
                #3a86fb 100%
              );
              border: 0;
              .icon {
                opacity: 1;
                width: 20rpx;
              }
            }
          }
        }
      }
    }
  }
  .footer {
    padding-top: 60rpx;
    width: 100%;
    text-align: center;
    font-weight: 500;
    font-size: 24rpx;
    line-height: 1;
    color: #c8c9cc;
  }
}
</style>
