/**
 * 登录
 * @param {String} provider 登录服务提供商，通过 uni.getProvider 获取，如果不设置则弹出登录列表选择界面
 * @param {String|Array} scopes [auth_base] 授权类型。支持 auth_base（静默授权）/ auth_user（主动授权） / auth_zhima（芝麻信用。支付宝小程序支持
 * @param {Number} timeout 超时时间，单位ms。微信小程序、百度小程序支持
 * @param {Object} univerifyStyle 一键登录页面样式。App 3.0.0+ 支持
 * @support
 * 微信小程序支持情况说明：https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html
 * 
 * uniapp支持情况说明：https://uniapp.dcloud.io/api/plugins/login?id=login
 * 
 * @returns {Promise}
 *
 * @example
  login().then(res => {
    // 登录成功
  }).catch(err => {
    // 登录失败
  }).finally((res) => {
    // 接口调用完成
  })
 */
const login = (provider, scopes, timeout, univerifyStyle) => {
   // 当前环境是否为开发环境
   const isDev = process.env.NODE_ENV === 'development'
   // #ifdef MP-ALIPAY
   // #endif
  return new Promise((resolve, reject) => {
    uni.login({
      provider,
      scopes,
      timeout,
      univerifyStyle,
      success(res) {
        resolve(res)
      },
      fail(err) {
        if (isDev) {
          console.log('login 接口调用失败 => ', err)
        }
        reject(err)
      },
    })
  })
}
export { login }
