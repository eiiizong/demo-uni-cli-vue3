/*
  配置文件
  文件中保存的是一些常用配置 请谨慎更改 更改前请确认是否存在使用
*/

import { testRequestUrl, formalRequestUrl } from '@/config/city'
import { getIsDevEnv } from '@/utils/get'

let requestUrl = ''
const isDev = getIsDevEnv()
if (isDev) {
  requestUrl = testRequestUrl
} else {
  requestUrl = formalRequestUrl
}

const config513300 = {
  requestUrl, // api 请求地址
  // 网络请求默认请求体  注意：每次请求都会携带
  requestData: {},
  // 网络请求默认请求头 注意：每次请求都会携带
  requestHeader: {
    'content-type': 'application/json;charset=UTF-8',
  },
  // 变量 用于storage
  constants: {
    SESSION_ID: 'SESSION_ID',
  },
  areaCode: '513300', // 行政区域编码 甘孜藏族自治州 513300
  areaName_zh: '甘孜', // 行政区域中文名称/简称 甘孜藏族自治州
  declarePackageName: 'packageDeclare513300', // 补贴项目存放包名
  // 控制政策文件的请求地址 true 请求发放系统 false 请求审批审批
  isRequestYGFF: false,
  // 是否开启阳光发放请求 true 开启 兼容甘孜
  isOpenYGFF: false,
  // 是否开启数据加密，配合后台使用 true 开启
  isOpenDataEncrypt: false,
  // 特殊页面 不同地市的不同页面配置
  specialPages: {},
  // 智能客服
  customerServiceGuess: ['我的补贴到账了吗？', '如何申报高龄津贴？'],
  closePages: [
    // 'packageQuery/subsidy-payment', // 补贴发放查询
    //'packageDetails/complaint-progress', // 投诉进度
    // 'packageQuery/publicity', // 阳光申报公示
    'tabbar/sunshine', // 阳光发放
    'packageDetails/my-message', // 我的消息
    'packageCommon/user-info', // 个人信息编辑
  ],
  //用户协议单位
  userAgreementUnit:'甘孜州人社局',
  // 关闭页面内某些模块 true 则关闭 目前根据甘孜州需求只更改了个别页面配置
  configClosePageModule: {
    pageTabbarHome: {
      hotService: false, // 热门服务
      news: true, // 惠民快讯
      swiper: false, // 轮播图
      policyDocument: false, // 政策文件
      leaveMessage: true, // 我要留言
      convenientService: false, // 便捷服务
    },
    pageTabbarMy: {
      myHome: true, // 我的家
      myService: false, // 我的服务
      myDeclarationProject: false, // 我的申报项目
      myAgencyProject: false, // 我的代办项目
      myOneCard: true, // 我的一卡通
      myCardBag: true, // 我的卡包
    },
  },
  // 配置各申报页面的申报配置
  configDeclarePages: {
    // closeAuth: 关闭对申报人进行生存认证 例如 ['507'] 关闭该人员类别的人脸识别 为空则关闭全部
    // isFixedDeclareType: 是否固定申报类型 [true|false] 默认 false
    // isJumpDeclareTypeSelect: 是否跳过申报类型选择 isFixedDeclareType 为true时有效  [true|false] 默认 false
    // fixedDeclareType: 固定的申报类型 isFixedDeclareType 为true时有效 01 自主申报 02 代为申报
    // unableDeclareTip: 自定义无法申报提示
    // isShowSSCSInfo: 是否显示社保卡信息 [true|false] 默认 false
    // isOpenSSCStateDisabledTip: 是否开启社保卡状态不正常提示 [true|false] 默认 false
    // isCheckDisability: 申报是否进行残疾人校验 [true|false] 默认 false
    // isCheckFileAndRegister: 申报是否进行建档立卡校验 [true|false] 默认 false
    // isCheckDeclare:  是否开启申报校验 [true|false] 默认 false
    declare_20061: {
      isFixedDeclareType: false, // 是否固定申报类型 true 为固定申报模式 默认 false
      fixedDeclareType: '01', // 默认的申报类型 isFixedDeclareType 为true时有效 01 自主申报 02 代为申报
      unableDeclareTip:
        '该补贴项目暂未在微信小程序平台开放,请联系乡镇、街道工作人员进行办理!', // 自定义无法申报提示
      isCheckDisability: false, // 申报是否进行残疾人校验
      isCheckFileAndRegister: false, // 申报是否进行建档立卡校验
      isCheckDeclare: false, // 是否开启申报校验
    },
    declare_20295: {
      isFixedDeclareType: false, // 是否固定申报类型 true 为固定申报模式 默认 false
      fixedDeclareType: '01', // 默认的申报类型 isFixedDeclareType 为true时有效 01 自主申报 02 代为申报
      unableDeclareTip:
        '该补贴项目暂未在微信小程序平台开放,请联系乡镇、街道工作人员进行办理!', // 自定义无法申报提示
      isCheckDisability: false, // 申报是否进行残疾人校验
      isCheckFileAndRegister: false, // 申报是否进行建档立卡校验
      isCheckDeclare: false, // 是否开启申报校验
    },
    declare_99999: { unableDeclareTip: '自定义无法申报提示' },
    declare_20300: {
      isFixedDeclareType: true,
      fixedDeclareType: '01',
    },
    declare_20633: {
      isFixedDeclareType: true,
      fixedDeclareType: '01',
    },
  },
  qqMapKey: '5RCBZ-I2B3J-WQDFA-FTWIW-266I6-EGFAH', // 腾讯地图密钥
  bMapKey: 'O8rMjq1w3HGy5q7d56BEbuFbWcZWiQ2a', // 百度地图密钥
  aMapKey: '2183beb7255d9ebd9593b4701c8677f3', // 高德地图密钥
  loginPath: '/pages/packageCommon/login/login?type=error', // 认证失效时返回登录页的路径
}

export default config513300
