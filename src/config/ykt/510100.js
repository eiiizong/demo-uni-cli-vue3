/*
  配置文件
  文件中保存的是一些常用配置 请谨慎更改 更改前请确认是否存在使用
*/

import { testRequestUrl, formalRequestUrl } from '@/config/city'
import { getIsDevEnv } from '@/utils/get/index'

let requestUrl = ''
const isDev = getIsDevEnv()
if (isDev) {
  requestUrl = testRequestUrl
} else {
  requestUrl = formalRequestUrl
}

const config510100 = {
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
  areaCode: '510100', // 行政区域编码 成都 510100
  areaName_zh: '成都', // 行政区域中文名称/简称 成都
  declarePackageName: 'packageDeclare510100', // 补贴项目存放包名
  // 控制政策文件的请求地址 true 请求发放系统 false 请求审批审批
  isRequestYGFF: false,
  // 是否开启阳光发放请求 true 开启 兼容甘孜
  isOpenYGFF: true,
  // 是否开启数据加密，配合后台使用 true 开启
  isOpenDataEncrypt: false,
  // 特殊页面 不同地市的不同页面配置
  specialPages: {},
  // 智能客服 猜你想问 配置
  customerServiceGuess: [
    '我的补贴到账了吗？',
    '如何申报普通高中国家助学金？',
    '如何申报高龄津贴？',
  ],
  // 用户协议单位
  userAgreementUnit:'成都市财政局',
  // 配置分享内容
  configSharePages: {
    pageTabbarHome: {
      title: '成都一卡通', // 转发标题
      path: '/pages/tabbar/home/home?type=share', // 转发路径
      query: 'type=share', // 自定义页面路径中携带的参数，如 path?a=1&b=2 的 “?” 后面部分
      imageUrl: '', // 自定义图片路径
    },
    pageTabbarSunshineDeclare: {
      title: '成都一卡通，阳光申报',
      path: '/pages/tabbar/sunshine-declare/sunshine-declare?type=share',
      query: 'type=share',
      imageUrl: '',
    },
    pageTabbarSunshine: {
      title: '成都一卡通村村响，让补贴晒一晒',
      path: '/pages/tabbar/sunshine/sunshine?type=share',
      query: 'type=share',
      imageUrl: '',
    },
    pageTabbarMy: {
      title: '成都一卡通',
      path: '/pages/tabbar/my/my?type=share',
      query: 'type=share',
      imageUrl: '',
    },
  },
  // 配置各申报页面的申报配置 配置前请确认
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

    // #ifdef MP-WEIXIN
    declare_20201: {
      isCheckDisability: true,
    },
    declare_20021: {
      isCheckDisability: true,
    },
    declare_20285: {
      isCheckDisability: true,
    },
    // #endif
    // #ifdef H5
    declare_20201: {
      closeAuth: [],
    },
    declare_20061: {
      closeAuth: [],
    },
    // #endif
  },
  qqMapKey: '5RCBZ-I2B3J-WQDFA-FTWIW-266I6-EGFAH', // 腾讯地图密钥
  bMapKey: 'O8rMjq1w3HGy5q7d56BEbuFbWcZWiQ2a', // 百度地图密钥
  aMapKey: '2183beb7255d9ebd9593b4701c8677f3', // 高德地图密钥
  loginPath: '/pages/packageCommon/login/login?type=error', // 认证失效时返回登录页的路径
}

export default config510100
