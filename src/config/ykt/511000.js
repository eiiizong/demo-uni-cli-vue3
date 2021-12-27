/* 
  配置文件
  文件中保存的是一些常用配置 请谨慎更改 更改前请确认是否存在使用
*/

import { testRequestUrl, formalRequestUrl } from '@/config/city'
import { getIsDev } from '@/utils/get/index'

let requestUrl = ''
const isDev = getIsDev()
if (isDev) {
  requestUrl = testRequestUrl
} else {
  requestUrl = formalRequestUrl
}

const config511000 = {
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
  areaCode: '511000', // 行政区域编码 内江 511000
  areaName_zh: '内江', // 行政区域中文名称/简称 内江
  declarePackageName: 'packageDeclare511000', // 补贴项目存放包名
  // 控制政策文件的请求地址 true 请求发放系统 false 请求审批审批
  isRequestYGFF: true,
  // 是否开启阳光发放请求 true 开启 兼容甘孜
  isOpenYGFF: true,
  // 是否开启数据加密，配合后台使用 true 开启
  isOpenDataEncrypt: false,
  isOpenThreeFundedVersion: true, // 是否开启三资版本 h5打包编译有效
  
  // #ifdef H5
  isCompileToTianfuCitizenCloud: true, // 是否h5打包编译时编译到天府市民云 兼容文件上传 不编译至天府市民云请手动关闭
  // #endif

  // 服务网点是否使用百度地图
  isUseBMap: false,
  // 特殊页面 不同地市的不同页面配置
  specialPages: {},
  // 智能客服 猜你想问 配置
  customerServiceGuess: [
    '我的补贴到账了吗？',
    '如何申报普通高中国家助学金？',
    '如何申报高龄津贴？',
  ],
  // 用户协议单位
  userAgreementUnit: '内江市信息中心',
  // 关闭页面内某些模块 true 则关闭 目前根据甘孜州需求只更改了个别页面配置
  configClosePageModule: {
    pageTabbarHome: {
      convenientService: true, // 便捷服务
    },
    pageTabbarMy: {},
  },
  // 配置分享内容
  configSharePages: {
    pageTabbarHome: {
      title: '内江一卡通', // 转发标题
      path: '/pages/tabbar/home/home?type=share', // 转发路径
      query: 'type=share', // 自定义页面路径中携带的参数，如 path?a=1&b=2 的 “?” 后面部分
      imageUrl: '', // 自定义图片路径
    },
    pageTabbarSunshineDeclare: {
      title: '内江一卡通，阳光申报',
      path: '/pages/tabbar/sunshine-declare/sunshine-declare?type=share',
      query: 'type=share',
      imageUrl: '',
    },
    pageTabbarSunshine: {
      title: '内江一卡通村村响，让补贴晒一晒',
      path: '/pages/tabbar/sunshine/sunshine?type=share',
      query: 'type=share',
      imageUrl: '',
    },
    pageTabbarMy: {
      title: '内江一卡通',
      path: '/pages/tabbar/my/my?type=share',
      query: 'type=share',
      imageUrl: '',
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
    declare_20002: {
      isOpenSSCStateDisabledTip: true,
    },
    declare_20011: {
      closeAuth: [],
    },
    declare_20012: {
      closeAuth: [],
    },
    declare_20013: {
      closeAuth: [],
    },
    declare_20014: {
      closeAuth: [],
    },
    declare_20015: {
      closeAuth: [],
    },
    declare_20016: {
      closeAuth: [],
    },
    declare_20017: {
      closeAuth: [],
    },
    declare_20018: {
      closeAuth: [],
    },
    declare_20019: {
      closeAuth: [],
    },
    declare_20020: {
      closeAuth: [],
    },
    declare_20080: {
      closeAuth: [],
    },
    declare_20374: {
      closeAuth: [],
    },
    declare_20375: {
      closeAuth: [],
    },
    declare_20376: {
      closeAuth: [],
    },
    declare_20379: {
      closeAuth: [],
    },
    declare_20380: {
      closeAuth: [],
    },
    declare_20054: {
      unableDeclareTip:
        '高龄津贴项目已纳入省政府“一网通办”百日攻坚行动，全省已建成了统一的高龄津贴审批系统，现暂停在内江一卡通阳光审批微信申报。目前可通过四川政务网和线下纸质申报，详细办理情况请咨询各乡镇人民政府、街道办事处。', // 自定义无法申报提示
    },
  },
  qqMapKey: '5RCBZ-I2B3J-WQDFA-FTWIW-266I6-EGFAH', // 腾讯地图密钥
  bMapKey: 'O8rMjq1w3HGy5q7d56BEbuFbWcZWiQ2a', // 百度地图密钥
  aMapKey: '2183beb7255d9ebd9593b4701c8677f3', // 高德地图密钥 微信小程序
  aMapKeyH5: 'b91b7c6ff9fa2a0250d109e586f9be0a', // 高德地图密钥 Web服务
  loginPath: '/pages/packageCommon/login/login?type=error', // 认证失效时返回登录页的路径
}

export default config511000
