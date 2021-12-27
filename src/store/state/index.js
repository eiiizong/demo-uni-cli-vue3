const state = {
  // 用户信息
  userInfo: {
    c03601: '51090219950723653443',
    chb0h1: '4',
    chb0h1Desc: '肢体',
    chb0h2: '3',
    chb0h2Desc: '三级',
    chb0hf: '肢体三级;',
    code: '1',
    idCard: '510902199507236534',
    loginId: '510902199507236534',
    openId: 'oOuBO5cDjEGbdjdKPZt2E-aq8Yuw',
    openid: 'oOuBO5cDjEGbdjdKPZt2E-aq8Yuw',
    registerTime: '2021-07-01 14:08:08',
    sessionId: 'B7B9D3A6C8A6C27E321BBEE1DF9B3F0F',
    session_key: 'sMPW8iZ72RTJzXte/6fhIw==',
    tel: '18482160080',
    userId: '570459776338788352',
    userName: '曾小明',
    user_id: 'oOuBO5cDjEGbdjdKPZt2E-aq8Yuw',
    chb015:'雁江区',
    chb017:'雁江镇',
    chb018:'响水村',
  }, 
  // 经办用户信息
  userList: {
    cpb10d: '未登录用户身份证号', // 经办用户身份证号码
    aae012: '未登录用户姓名', // 经办用户姓名
    aab301: '510000', // 地市编码
    che015: '1', // 经办层级 0 省 1 地市 2 区县 3 乡镇街道 4 村社区
    chb015: '9999', // 区县编码
    chb017: '9999', // 乡镇编码
    chb018: '9999', // 村编码
    aae018: '未登录用户经办部门', // 经办部门名称
  },
  // 其他申报信息
  othersDeclareInfo: {},
  // 申报信息
  declareInfo: {},
  // ocr 识别的身份证信息
  ocrInfo: {},
  familyMembers: [], // 家庭成员
  subsidyProjectInfo: {}, // 补贴项目信息
  editSubsidyInfo: {}, // 正在编辑的补贴项目信息
  refreshFile: false, // 进入材料上传页时是否重新加载
  shopInfo: {}, // 商铺信息
  goodInfo: {}, // 商品信息
  isMerchant: '', // 用户类型 用户是否是商户
}

export default state
