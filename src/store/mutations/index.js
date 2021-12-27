import { getIsDev } from '@/utils/get/index'
import {
  UPDATE_USER_INFO,
  UPDATE_USER_INFO_CLEAR,
  UPDATE_USER_LIST,
  UPDATE_DECLARE_INFO,
  UPDATE_OCR_INFO,
  UPDATE_REFRESH_FILE,
  UPDATE_FAMILY_MEMBERS,
  UPDATE_OTHERS_DECLARE_INFO,
  UPDATE_EDIT_SUBSIDY_INFO,
  UPDATE_SHOP_INFO,
  UPDATE_GOOD_INFO,
  UPDATE_IS_MERCHANT,
} from '../constants/index.js'
// 当前环境是否为开发环境
const isDev = getIsDev()
// #ifdef MP-ALIPAY
// #endif
const mutations = {
  // 更新用户信息
  [UPDATE_USER_INFO](state, data) {
    if (isDev) {
      // console.log('正在改变全局状态的 userInfo 追加的值: ', data)
    }
    state.userInfo = { ...state.userInfo, ...data }
    if (isDev) {
      console.log('正在改变全局状态的 userInfo 追加后的值: ', state.userInfo)
    }
  },
  // 清空用户信息 用于退出登录
  [UPDATE_USER_INFO_CLEAR](state) {
    state.userInfo = {}
  },
  // 更新经办人信息
  [UPDATE_USER_LIST](state, data) {
    if (isDev) {
      // console.log('正在改变全局状态的 userList 追加的值: ', data)
    }
    state.userList = { ...state.userList, ...data }
    if (isDev) {
      console.log('正在改变全局状态的 userList 追加后的值 : ', state.userList)
    }
  },
  // 更新申报信息
  [UPDATE_DECLARE_INFO](state, data) {
    state.declareInfo = { ...data }
    if (isDev) {
      console.log(
        `
        正在改变全局状态的 declareInfo ：
        改变后的值：
      `,
        state.declareInfo
      )
    }
  },
  // 更新其他申报信息
  [UPDATE_OTHERS_DECLARE_INFO](state, data) {
    state.othersDeclareInfo = { ...data }
    if (isDev) {
      console.log(
        `
        正在改变全局状态的 othersDeclareInfo ：
        改变后的值：
      `,
        state.othersDeclareInfo
      )
    }
  },
  // 更新正在编辑的补贴项目信息
  [UPDATE_EDIT_SUBSIDY_INFO](state, data) {
    state.editSubsidyInfo = { ...data }
    if (isDev) {
      console.log(
        `
        正在改变全局状态的 editSubsidyInfo ：
        改变后的值：
      `,
        state.editSubsidyInfo
      )
    }
  },
  // 更新ocr识别信息
  [UPDATE_OCR_INFO](state, data) {
    state.ocrInfo = { ...data }
    if (isDev) {
      console.log(
        `
        正在改变全局状态的 ocrInfo ：
        改变后的值：
      `,
        state.ocrInfo
      )
    }
  },
  // 更新
  [UPDATE_REFRESH_FILE](state, data) {
    state.refreshFile = data
    if (isDev) {
      console.log(
        `
        正在改变全局状态的 refreshFile ：
        改变后的值：
      `,
        state.refreshFile
      )
    }
  },
  // 更新家庭成员
  [UPDATE_FAMILY_MEMBERS](state, data) {
    state.familyMembers = [...data]
    if (isDev) {
      console.log(
        `
        正在改变全局状态的 familyMembers ：
        改变后的值：
      `,
        state.familyMembers
      )
    }
  },
  // 更新店铺信息
  [UPDATE_SHOP_INFO](state, data) {
    state.shopInfo = {
      ...state.shopInfo,
      ...data,
    }
    if (isDev) {
      console.log(
        `
        正在改变全局状态的 shopInfo ：
        改变后的值：
      `,
        state.shopInfo
      )
    }
  },
  // 更新商品信息
  [UPDATE_GOOD_INFO](state, data) {
    state.goodInfo = {
      ...data,
    }
    if (isDev) {
      console.log(
        `
        正在改变全局状态的 goodInfo ：
        改变后的值：
      `,
        state.goodInfo
      )
    }
  },
  // 更新用户是否是商户
  [UPDATE_IS_MERCHANT](state, data) {
    state.isMerchant = data
    if (isDev) {
      console.log(
        `
        正在改变全局状态的 isMerchant ：
        改变后的值：
      `,
        state.isMerchant
      )
    }
  },
}

export default mutations
