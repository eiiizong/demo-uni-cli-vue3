/**
 * 调起客户端小程序设置界面，返回用户设置的操作结果。设置界面只会出现小程序已经向用户请求过的权限。
 * @param {boolean} withSubscriptions 是否同时获取用户订阅消息的订阅状态，默认不获取。注意：withSubscriptions 只返回用户勾选过订阅面板中的“总是保持以上选择，不再询问”的订阅消息。
 * @support 
 * 微信小程序支持情况说明：https://developers.weixin.qq.com/miniprogram/dev/api/open-api/setting/wx.openSetting.html
 * 
 * uniapp支持情况说明：https://uniapp.dcloud.io

 * @returns {Promise}
 *
 * @example
  openSetting().then(res => {
    // 接口调用成功
  }).catch(err => {
    // 接口调用失败
  }).finally((res) => {
    // 接口调用完成
  })
 */
const openSetting = (withSubscriptions = false) => {
  return new Promise((resolve, reject) => {
    uni.openSetting({
      withSubscriptions,
      success(res) {
        resolve(res.authSetting)
      },
      fail(err) {
        console.log('openSetting 接口调用失败 => ', err)
        reject(err)
      },
    })
  })
}
export { openSetting }
