/**
 * 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
 * @param {string} withSubscriptions 是否同时获取用户订阅消息的订阅状态，默认不获取。注意：withSubscriptions 只返回用户勾选过订阅面板中的“总是保持以上选择，不再询问”的订阅消息。
 * @support 
 * 微信小程序支持情况说明：https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/wx.getSetting.html
 * 
 * uniapp支持情况说明：https://uniapp.dcloud.io

 * @returns {Promise}
 *
 * @example
  getSetting().then(res => {
    // 接口调用成功
  }).catch(err => {
    // 接口调用失败
  }).finally((res) => {
    // 接口调用完成
  })
 */
const getSetting = (withSubscriptions = false) => {
  return new Promise((resolve, reject) => {
    uni.getSetting({
      withSubscriptions,
      success(res) {
        resolve(res.authSetting)
      },
      fail(err) {
        console.log('getSetting 接口调用失败 => ', err)
        reject(err)
      },
    })
  })
}
export { getSetting }
