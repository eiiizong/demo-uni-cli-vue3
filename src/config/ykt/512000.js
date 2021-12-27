/*
  配置文件
  文件中保存的是一些常用配置 请谨慎更改 更改前请确认是否存在使用
*/

import { testRequestUrl, formalRequestUrl } from '@/config/city'
import { getIsDevEnv } from '~/plugins/big/utils/get/index'

let requestUrl = ''
const isDev = getIsDevEnv()
if (isDev) {
  requestUrl = testRequestUrl
} else {
  requestUrl = formalRequestUrl
}

const config512000 = {
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
  areaCode: '512000', // 行政区域编码 资阳 512000
  areaName_zh: '资阳', // 行政区域中文名称/简称 资阳
  declarePackageName: 'packageDeclare512000', // 补贴项目存放包名
  // 控制政策文件的请求地址 true 请求发放系统 false 请求审批审批
  isRequestYGFF: true,
  // 是否开启阳光发放请求 true 开启 兼容甘孜
  isOpenYGFF: true,
  // 特殊页面 不同地市的不同页面配置
  specialPages: {},
  // 智能客服 猜你想问 配置
  customerServiceGuess: [
    '我的补贴到账了吗？',
    '如何申报公租房租赁补贴？',
    '如何申事实无人抚养儿童基本生活补贴？',
  ],
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
	declare_20007: {
		closeAuth: [],
		unableDeclareTip: '此项目暂未开始申报受理',
		isShowSSCSInfo:true,
	 },
	declare_20055: {
		closeAuth: [],
		unableDeclareTip: '此项目暂未开始申报受理',
	 },
	declare_20447: {
		unableDeclareTip: '请将此项目相关信息报给乡镇工作人员进行受理',
	 },
	declare_20833: {
		unableDeclareTip: '请将此项目相关信息报给乡镇工作人员进行受理',
	 },
	declare_20836: {
		unableDeclareTip: '请将此项目相关信息报给乡镇工作人员进行受理',
	 },
		declare_20022: { isCheckDisability: true },
		declare_20640: { isCheckDisability: true },
		declare_20638: { isCheckDisability: true },
		declare_20705: { isCheckDisability: true },
		declare_20021: { isCheckDisability: true },
  },
  qqMapKey: '5RCBZ-I2B3J-WQDFA-FTWIW-266I6-EGFAH', // 腾讯地图密钥
  bMapKey: 'O8rMjq1w3HGy5q7d56BEbuFbWcZWiQ2a', // 百度地图密钥
  aMapKey: '2183beb7255d9ebd9593b4701c8677f3', // 高德地图密钥
  loginPath: '/pages/packageCommon/login/login?type=error', // 认证失效时返回登录页的路径
}

export default config512000
